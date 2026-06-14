import { z } from 'zod';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{10}$/;

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, 'Email or phone number is required')
    .refine((value) => emailRegex.test(value) || phoneRegex.test(value), {
      message: 'Enter a valid email or 10-digit phone number',
    }),
});

export const SignupSchemaValidation = z.object({
  name: z
    .string()
    .trim()
    .min(3, {
      message: 'Name should be at least 3 characters',
    })
    .max(50, {
      message: 'Name should not exceed 50 characters',
    }),

  email: z.string().trim().email({
    message: 'Invalid email address',
  }),

  phone: z.string().regex(/^[6-9]\d{9}$/, {
    message: 'Invalid phone number',
  }),
});

export const otpSchema = z.object({
  identifier: z.string().trim(),
  otp: z.string().length(6, 'Please enter a valid OTP').regex(/^\d+$/, 'Please enter a valid OTP'),
});
