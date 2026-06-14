import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import CustomButton from '@/shared/components/custom/CustomButton.jsx';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/components/ui/input-otp.jsx';

import { otpSchema } from '../validation/auth.validation.js';
import { useAuthStore } from '@/app/store/authStore.js';
import { AuthApiOperations } from '../authApiOperations.js';
import { GetApiErrorMessage, GetApiResponseMessage } from '@/shared/utils/apiMessage.js';

const OtpForm = () => {
  const navigate = useNavigate();

  const { identifier, expiry, setExpiry, setToken, setUser } = useAuthStore();

  const [timeLeft, setTimeLeft] = useState(0);
  const [resendLoading, setResendLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      identifier: '',
      otp: '',
    },
  });

  useEffect(() => {
    if (!identifier) {
      navigate('/login');
    }
  }, [identifier, navigate]);

  useEffect(() => {
    if (!expiry) return;

    const updateTimer = () => {
      const remaining = Math.max(0, Math.floor((expiry - Date.now()) / 1000));

      setTimeLeft(remaining);
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [expiry]);

  const canResend = timeLeft === 0;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const onSubmit = async (data) => {
    try {
      const response = await AuthApiOperations.LoginUser({
        identifier,
        otp: data.otp,
      });

      console.log(response);

      if (response.success) {
        setToken(response.data?.accessToken);
        setUser(response.data?.user);
        toast.success(GetApiResponseMessage(response));

        navigate('/');
      }
    } catch (error) {
      toast.error(GetApiErrorMessage(error));
    }
  };

  const handleResendOtp = async () => {
    if (!canResend || resendLoading) return;

    setResendLoading(true);

    try {
      const trimmedIdentifier = identifier.trim();

      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedIdentifier);

      const payload = isEmail ? { email: trimmedIdentifier } : { phone: trimmedIdentifier };

      const response = await AuthApiOperations.SendOtp(payload);

      if (response.success) {
        setExpiry(response.data?.otpExpiry);

        toast.success(response.message || 'OTP resent successfully');
      }
    } catch (error) {
      toast.error(GetApiErrorMessage(error));
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="w-full max-w-125">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* OTP Input */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-[#344054]">Enter OTP</label>

          <Controller
            name="otp"
            control={control}
            render={({ field }) => (
              <InputOTP maxLength={6} value={field.value} onChange={field.onChange}>
                <InputOTPGroup className="gap-4">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className={`data-[active=true]:border-btnBlue/40 h-10 w-12 rounded-lg border-2! bg-white text-xl transition-all data-[active=true]:ring-0 ${errors.otp ? 'border-red-500! text-red-500' : 'border-[#D4D4D4]'} `}
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            )}
          />

          {errors.otp && <p className="text-base font-medium text-red-500">{errors.otp.message}</p>}
        </div>

        {/* Verify Button */}
        <CustomButton
          type="submit"
          loading={isSubmitting}
          fullWidth
          className="bg-btnBlue hover:bg-textBlue h-12 text-lg text-white"
        >
          {isSubmitting ? 'Verifying...' : 'Verify OTP'}
        </CustomButton>

        {/* Resend OTP */}
        <div className="text-center">
          {canResend ? (
            <p className="text-sm text-[#98A2B3]">
              Didn't receive OTP?{' '}
              <button
                type="button"
                disabled={resendLoading}
                onClick={handleResendOtp}
                className="text-btnBlue font-semibold hover:underline disabled:cursor-not-allowed disabled:opacity-50"
              >
                {resendLoading ? 'Sending...' : 'Resend OTP'}
              </button>
            </p>
          ) : (
            <p className="text-sm text-[#98A2B3]">
              Didn't receive OTP? <span className="text-btnBlue font-semibold">Resend in {formatTime(timeLeft)}</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default OtpForm;
