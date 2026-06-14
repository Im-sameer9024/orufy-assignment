import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import InputField from '@/shared/components/custom/InputField.jsx';
import CustomButton from '@/shared/components/custom/CustomButton.jsx';
import { SignupSchemaValidation } from '../validation/auth.validation.js';
import { useState } from 'react';
import { AuthApiOperations } from '../authApiOperations.js';
import { toast } from 'sonner';
import { GetApiErrorMessage, GetApiResponseMessage } from '@/shared/utils/apiMessage.js';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(SignupSchemaValidation),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await AuthApiOperations.SignupUser(data);

      if (response.success) {
        toast.success(GetApiResponseMessage(response));
        navigate('/login');
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
          label="Full Name"
          name="name"
          control={control}
          placeholder="Enter your full name"
          error={errors.name}
        />

        <InputField
          label="Email Address"
          name="email"
          control={control}
          placeholder="Enter your email"
          error={errors.email}
        />

        <InputField
          label="Phone Number"
          name="phone"
          control={control}
          placeholder="Enter your phone number"
          error={errors.phone}
        />

        <CustomButton
          type="submit"
          loading={isSubmitting || loading}
          fullWidth
          className="bg-btnBlue hover:bg-textBlue text-white"
        >
          {loading ? 'Creating...' : 'Create Account'}
        </CustomButton>
      </form>
    </div>
  );
};

export default SignupForm;
