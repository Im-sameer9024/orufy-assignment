import { AsyncHandler } from '../../shared/utils/async_handler.js';
import Otp from './otp.schema.js';
import User from './user.schema.js';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { AccessTokenGenerator, RefreshTokenGenerator } from '../../shared/utils/token_generator.js';
import { clearCookieOptions, cookieOptions } from '../../shared/utils/helpers.js';
import JWT from 'jsonwebtoken';
import { sendOtp } from './user.services.js';

const SendOtp = AsyncHandler(async (req, res, next) => {
  const { email, phone } = req.body;

  const otpExpireTime = process.env.OTP_RESEND_IN;

  let otp = crypto.randomInt(100000, 1000000).toString();
  const otpExpiry = Date.now() + otpExpireTime * 1000;

  if (email) {
    await sendOtp({
      email,
      otp,
      otpType: 'email',
    });
  }

  if (phone) {
    await sendOtp({
      phone,
      otp,
      otpType: 'phone',
    });
  }
  return res.status(200).json({
    success: true,
    message: 'Otp send to your email',
    data: {
      otpExpiry,
    },
  });
});

const SignUp = AsyncHandler(async (req, res, next) => {
  const { name, email, phone } = req.validatedData;

  const user = await User.findOne({
    $or: [{ email: email }, { phone: phone }],
  });

  if (user) {
    return res.status(400).json({
      success: false,
      message: 'User exits Please Try to Login',
    });
  }

  const avatarUrl = `https://api.dicebear.com/9.x/initials/svg?seed=${name}`;

  const newUser = await User.create({
    name,
    email,
    phone,
    avatarUrl,
  });

  return res.status(200).json({
    success: true,
    message: 'User Created Successfully',
    data: newUser,
  });
});

const LogIn = AsyncHandler(async (req, res, next) => {
  const { identifier, otp } = req.validatedData;

  const user = await User.findOne({
    $or: [{ email: identifier }, { phone: identifier }],
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'User not found',
    });
  }

  const otpData = await Otp.findOne({
    $or: [
      {
        email: user.email,
      },
      {
        phone: user.phone,
      },
    ],
  })
    .sort({
      createdAt: -1,
    })
    .limit(1);

  if (!otpData) {
    return res.status(400).json({
      success: false,
      message: 'Otp expired',
    });
  }

  const isValidOtp = await bcrypt.compare(otp, otpData.otp);

  if (!isValidOtp) {
    return res.status(400).json({
      success: false,
      message: 'Invalid Otp',
    });
  }

  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl,
  };

  const accessToken = await AccessTokenGenerator(payload);
  const refreshToken = await RefreshTokenGenerator(payload);

  res.cookie('refreshToken', refreshToken, cookieOptions);

  return res.status(200).json({
    success: true,
    message: 'User Logged In Successfully',
    data: {
      accessToken,
      user,
    },
  });
});

const RefreshAccessToken = AsyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: 'UnAuthorized',
    });
  }

  const decoded = JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: 'UnAuthorized',
    });
  }

  const user = await User.findById(decoded.id).lean();

  if (!user) {
    res.clearCookie('refreshToken', clearCookieOptions);

    return res.status(401).json({
      success: false,
      message: 'UnAuthorized',
    });
  }

  const newAccessToken = await AccessTokenGenerator({
    id: user._id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl,
  });

  return res.status(200).json({
    success: true,
    message: 'Access Token Generated Successfully',
    data: {
      accessToken: newAccessToken,
      user,
    },
  });
});

const LogOut = AsyncHandler(async (req, res, next) => {
  res.clearCookie('refreshToken', clearCookieOptions);

  return res.status(200).json({
    success: true,
    message: 'User Logged Out Successfully',
  });
});

export { SendOtp, SignUp, LogIn, RefreshAccessToken, LogOut };
