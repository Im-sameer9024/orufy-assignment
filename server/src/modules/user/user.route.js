import express from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import { LogIn, LogOut, RefreshAccessToken, SendOtp, SignUp } from './user.controller.js';
import { LoginSchemaValidation, SignupSchemaValidation } from './user.validationSchema.js';

const route = express.Router();

route.post('/send-otp', SendOtp);
route.post('/login', validate(LoginSchemaValidation), LogIn);
route.post('/signup', validate(SignupSchemaValidation), SignUp);
route.get('/refresh-token', RefreshAccessToken);
route.post('/logout', LogOut);

export default route;
