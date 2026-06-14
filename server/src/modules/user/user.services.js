import twilio from 'twilio';
import { sendSMS } from '../../shared/utils/smsSender.js';
import { mailSender } from '../../shared/utils/mailSender.js';
import { OTPEmail } from '../../shared/templates/otp-template.js';
import Otp from './otp.schema.js';
import bcrypt from 'bcryptjs';

export const sendOtp = async ({ email, phone, otp, otpType }) => {
  const hashedOtp = await bcrypt.hash(otp, 10);

  await Otp.create({
    email,
    phone,
    otp: hashedOtp,
    otpType,
  });

  if (otpType === 'email') {
    await mailSender(email, 'Verification Email', OTPEmail(email, otp));
  }

  if (otpType === 'phone') {
    await sendSMS(phone, otp);
  }
};
