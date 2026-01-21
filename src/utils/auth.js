import ApiService from '../services/ApiService';

// Authentication utility functions

// Authentication utility functions

export const login = async (email, password) => {
  try {
    const response = await ApiService.login({ email, password });
    return {
      success: true,
      data: response.data,
      message: response.data?.message || 'Login successful'
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Login failed'
    };
  }
};

export const signup = async (userData) => {
  try {
    const response = await ApiService.signup(userData);
    return {
      success: true,
      data: response.data,
      message: response.data?.message || 'Signup successful'
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Signup failed'
    };
  }
};

export const logout = async () => {
  try {
    await ApiService.logout();
    return { 
      success: true,
      message: 'Logout successful'
    };
  } catch (error) {
    return { 
      success: false, 
      message: error.message || 'Logout failed'
    };
  }
};

export const isAuthenticated = async () => {
  return await ApiService.isAuthenticated();
};

export const getCurrentUser = async () => {
  return await ApiService.getUser();
};

export const forgotPassword = async (email) => {
  try {
    const response = await ApiService.forgotPassword(email);
    return {
      success: true,
      message: response.data?.message || 'OTP sent successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to send OTP'
    };
  }
};

export const verifyOtp = async (email, otp) => {
  try {
    const response = await ApiService.verifyOtp(email, otp);
    return {
      success: true,
      message: response.data?.message || 'OTP verified successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to verify OTP'
    };
  }
};

export const resetPassword = async (email, otp, newPassword, confirmPassword) => {
  try {
    const response = await ApiService.resetPassword(email, otp, newPassword, confirmPassword);
    return {
      success: true,
      message: response.data?.message || 'Password reset successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to reset password'
    };
  }
};

export const resendOtp = async (email) => {
  try {
    const response = await ApiService.resendOtp(email);
    return {
      success: true,
      message: response.data?.message || 'OTP resent successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to resend OTP'
    };
  }
};