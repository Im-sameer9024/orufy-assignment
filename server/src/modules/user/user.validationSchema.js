import z from 'zod';

export const EmailSchemaValidation = z.object({
  email: z.string().trim().email({
    message: 'Invalid email address',
  }),
});

export const PhoneSchemaValidation = z.object({
  phone: z.string().regex(/^[6-9]\d{9}$/, {
    message: 'Invalid phone number',
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

export const LoginSchemaValidation = z
  .object({
    identifier: z.string().trim().min(1, {
      message: 'Email or phone number is required',
    }),

    otp: z
      .string()
      .length(6, {
        message: 'OTP must be 6 digits',
      })
      .regex(/^\d+$/, {
        message: 'OTP must contain only numbers',
      }),
  })
  .refine((data) => z.string().email().safeParse(data.identifier).success || /^[6-9]\d{9}$/.test(data.identifier), {
    message: 'Enter a valid email or 10-digit phone number',
    path: ['identifier'],
  });
