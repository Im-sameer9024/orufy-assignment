import mongoose from 'mongoose';
import { mailSender } from '../../shared/utils/mailSender.js';
import { OTPEmail } from '../../shared/templates/otp-template.js';
import bcrypt from 'bcryptjs';

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  otp: {
    type: String,
    required: true,
    trim: true,
  },
  otpType: {
    type: String,
    enum: ['email', 'phone'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 120, // after 5 minutes auto delete
  },
});

const Otp = mongoose.model('Otp', otpSchema);

export default Otp;
