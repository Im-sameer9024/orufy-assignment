import { apiConnector } from '@/services/apiConnector.js';
import { userApiUrls } from '@/services/apiEndpoints.js';

const { SEND_OTP, SIGNUP_USER, LOGIN_USER, LOGOUT_USER } = userApiUrls;

export const AuthApiOperations = {
  //------------------- Send-Otp --------------------

  SendOtp: async (data) => {
    const response = await apiConnector({
      method: 'POST',
      url: SEND_OTP,
      bodyData: data,
    });
    return response.data;
  },

  //--------------------- user Login ---------------------

  LoginUser: async (data) => {
    const response = await apiConnector({
      method: 'POST',
      url: LOGIN_USER,
      bodyData: data,
    });
    return response.data;
  },

  //------------------ user register --------------
  SignupUser: async (data) => {
    const response = await apiConnector({
      method: 'POST',
      url: SIGNUP_USER,
      bodyData: data,
    });
    return response.data;
  },

  //------------------ user logout --------------
  LogoutUser: async () => {
    const response = await apiConnector({
      method: 'POST',
      url: LOGOUT_USER,
    });
    return response.data;
  },
};
