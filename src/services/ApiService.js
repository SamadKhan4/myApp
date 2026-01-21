import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ENDPOINTS, DEFAULT_HEADERS, HTTP_METHODS, STATUS_CODES } from '../config/api';

// Storage keys
const TOKEN_KEY = 'user_token';
const USER_KEY = 'user_data';

class ApiService {
  // Store token
  static async storeToken(token) {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error('Error storing token:', error);
    }
  }

  // Get stored token
  static async getToken() {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }

  // Remove token
  static async removeToken() {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  }

  // Store user data
  static async storeUser(user) {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error storing user:', error);
    }
  }

  // Get stored user
  static async getUser() {
    try {
      const userData = await AsyncStorage.getItem(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  // Remove user data
  static async removeUser() {
    try {
      await AsyncStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error('Error removing user:', error);
    }
  }

  // Clear all auth data
  static async clearAuthData() {
    await Promise.all([
      this.removeToken(),
      this.removeUser()
    ]);
  }

  // Make API request
  static async makeRequest(endpoint, method = HTTP_METHODS.GET, data = null, customHeaders = {}) {
    try {
      console.log('API Request:', { endpoint, method, data });
      
      // Get token for authenticated requests
      const token = await this.getToken();
      console.log('Token:', token ? 'Present' : 'Missing');
      
      // Prepare headers
      const headers = { ...DEFAULT_HEADERS, ...customHeaders };
      
      // Add authorization header if token exists
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      // Prepare request options
      const options = {
        method,
        headers,
      };

      // Add body for POST, PUT, PATCH requests
      if (data && (method === HTTP_METHODS.POST || method === HTTP_METHODS.PUT || method === HTTP_METHODS.PATCH)) {
        if (data instanceof FormData) {
          // For file uploads, let FormData handle the Content-Type
          delete headers['Content-Type'];
          options.body = data;
        } else {
          options.body = JSON.stringify(data);
        }
      }

      console.log('Final request options:', options);
      
      // Make the request with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(endpoint, {
        ...options,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      console.log('Response status:', response.status);
      
      // Parse response
      let responseData;
      const contentType = response.headers.get('content-type');
      console.log('Content type:', contentType);
      
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }
      
      console.log('Response data:', responseData);

      // Handle different status codes
      switch (response.status) {
        case STATUS_CODES.SUCCESS:
        case STATUS_CODES.CREATED:
          return {
            success: true,
            data: responseData,
            status: response.status
          };

        case STATUS_CODES.UNAUTHORIZED:
          // Token expired or invalid, clear auth data
          await this.clearAuthData();
          throw new Error('Unauthorized: Please login again');

        case STATUS_CODES.FORBIDDEN:
          throw new Error('Access forbidden');

        case STATUS_CODES.NOT_FOUND:
          throw new Error('Resource not found');

        case STATUS_CODES.BAD_REQUEST:
          throw new Error(responseData.message || 'Bad request');

        case STATUS_CODES.INTERNAL_ERROR:
          throw new Error('Internal server error');

        default:
          throw new Error(responseData.message || `HTTP Error: ${response.status}`);
      }

    } catch (error) {
      console.error('API Request Error:', error);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - server not responding');
      }
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error - check your internet connection or backend URL');
      }
      
      throw error;
    }
  }

  // Auth API calls
  static async signup(userData) {
    const response = await this.makeRequest(
      API_ENDPOINTS.AUTH.SIGNUP,
      HTTP_METHODS.POST,
      userData
    );
    
    if (response.success) {
      // Store token and user data
      await this.storeToken(response.data.token);
      await this.storeUser(response.data.user);
    }
    
    return response;
  }

  static async login(credentials) {
    const response = await this.makeRequest(
      API_ENDPOINTS.AUTH.LOGIN,
      HTTP_METHODS.POST,
      credentials
    );
    
    if (response.success) {
      // Store token and user data
      await this.storeToken(response.data.token);
      await this.storeUser(response.data.user);
    }
    
    return response;
  }

  // Profile API calls
  static async createOrUpdateProfile(profileData) {
    return await this.makeRequest(
      API_ENDPOINTS.PROFILE.CREATE_UPDATE,
      HTTP_METHODS.POST,
      profileData
    );
  }

  static async getMyProfile() {
    return await this.makeRequest(API_ENDPOINTS.PROFILE.GET_MY_PROFILE);
  }

  static async uploadProfilePicture(imageUri) {
    const formData = new FormData();
    formData.append('profilePic', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'profile-pic.jpg',
    });

    return await this.makeRequest(
      API_ENDPOINTS.PROFILE.UPLOAD_PROFILE_PIC,
      HTTP_METHODS.POST,
      formData
    );
  }

  static async getAllProfiles() {
    return await this.makeRequest(API_ENDPOINTS.PROFILE.GET_ALL_PROFILES);
  }

  static async getProfileById(id) {
    return await this.makeRequest(API_ENDPOINTS.PROFILE.GET_PROFILE_BY_ID(id));
  }

  // Password reset API calls
  static async forgotPassword(email) {
    return await this.makeRequest(
      API_ENDPOINTS.PASSWORD.FORGOT_PASSWORD,
      HTTP_METHODS.POST,
      { email }
    );
  }

  static async verifyOtp(email, otp) {
    return await this.makeRequest(
      API_ENDPOINTS.PASSWORD.VERIFY_OTP,
      HTTP_METHODS.POST,
      { email, otp }
    );
  }

  static async resetPassword(email, otp, newPassword, confirmPassword) {
    return await this.makeRequest(
      API_ENDPOINTS.PASSWORD.RESET_PASSWORD,
      HTTP_METHODS.POST,
      { email, otp, newPassword, confirmPassword }
    );
  }

  static async resendOtp(email) {
    return await this.makeRequest(
      API_ENDPOINTS.PASSWORD.RESEND_OTP,
      HTTP_METHODS.POST,
      { email }
    );
  }

  // Check if user is authenticated
  static async isAuthenticated() {
    const token = await this.getToken();
    const user = await this.getUser();
    return !!(token && user);
  }

  // Logout
  static async logout() {
    await this.clearAuthData();
  }
}

export default ApiService;