// API Configuration
const API_BASE_URL = 'https://elite-paisa-backend-production.up.railway.app/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    SIGNUP: `${API_BASE_URL}/auth/signup`,
    LOGIN: `${API_BASE_URL}/auth/login`,
  },
  
  // Profile
  PROFILE: {
    CREATE_UPDATE: `${API_BASE_URL}/profile`,
    GET_MY_PROFILE: `${API_BASE_URL}/profile`,
    UPLOAD_PROFILE_PIC: `${API_BASE_URL}/profile/upload/profile-pic`,
    GET_ALL_PROFILES: `${API_BASE_URL}/profile/all`,
    GET_PROFILE_BY_ID: (id) => `${API_BASE_URL}/profile/${id}`,
  },
  
  // Password Reset
  PASSWORD: {
    FORGOT_PASSWORD: `${API_BASE_URL}/password/forgot-password`,
    VERIFY_OTP: `${API_BASE_URL}/password/verify-otp`,
    RESET_PASSWORD: `${API_BASE_URL}/password/reset-password`,
    RESEND_OTP: `${API_BASE_URL}/password/resend-otp`,
  }
};

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
};

// Default headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

// Response status codes
export const STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500
};