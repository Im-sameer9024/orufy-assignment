import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import InputField from '@/shared/components/custom/InputField.jsx';
import CustomButton from '@/shared/components/custom/CustomButton.jsx';
import { loginSchema } from '../validation/auth.validation.js';
import { useState } from 'react';
import { AuthApiOperations } from '../authApiOperations.js';
import { toast } from 'sonner';
import { GetApiErrorMessage, GetApiResponseMessage } from '@/shared/utils/apiMessage.js';
import { useAuthStore } from '@/app/store/authStore.js';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const { setIdentifier, setExpiry } = useAuthStore();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const identifier = data.identifier.trim();

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

    let payload = isEmail
      ? {
          email: identifier,
        }
      : {
          phone: identifier,
        };

    try {
      const response = await AuthApiOperations.SendOtp(payload);

      if (response.success) {
        setIdentifier(payload.email || payload.phone);
        setExpiry(response.data?.otpExpiry);
        navigate('/verify-otp');
        toast.success(GetApiResponseMessage(response));
      }
    } catch (error) {
      toast.error(GetApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          label="Email or Phone number"
          name="identifier"
          control={control}
          placeholder="Enter email or phone number"
          error={errors.identifier}
        />

        <CustomButton
          type="submit"
          loading={isSubmitting || loading}
          fullWidth
          className="bg-btnBlue hover:bg-textBlue text-white"
        >
          {loading ? 'Logging...' : 'Login'}
        </CustomButton>
      </form>
    </div>
  );
};

export default LoginForm;
