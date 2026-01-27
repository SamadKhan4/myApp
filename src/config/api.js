// API Configuration
const API_BASE_URL = 'https://elite-paisa-backend-production.up.railway.app/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    SIGNUP: `${API_BASE_URL}/auth/register`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: (resetToken) => `${API_BASE_URL}/auth/reset-password/${resetToken}`,
  },
  
  // Profile
  PROFILE: {
    CREATE_UPDATE: `${API_BASE_URL}/profile`,
    GET_MY_PROFILE: `${API_BASE_URL}/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/profile`,
    DELETE_PROFILE: `${API_BASE_URL}/profile`,
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
  },
  
  // Loan Types
  LOAN_TYPES: {
    CREATE: `${API_BASE_URL}/loan-types`,
    GET_ALL: `${API_BASE_URL}/loan-types`,
    GET_BY_ID: (id) => `${API_BASE_URL}/loan-types/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/loan-types/${id}`,
    DELETE: (id) => `${API_BASE_URL}/loan-types/${id}`,
  },
  
  // Loan Applications
  LOAN_APPLICATIONS: {
    APPLY: `${API_BASE_URL}/loan-applications/apply`,
    GET_MY_APPLICATIONS: `${API_BASE_URL}/loan-applications/my`,
    GET_ALL_APPLICATIONS: `${API_BASE_URL}/loan-applications`,
    GET_APPLICATION_BY_ID: (id) => `${API_BASE_URL}/loan-applications/${id}`,
    UPDATE_STATUS: (id) => `${API_BASE_URL}/loan-applications/${id}/status`,
    UPLOAD_PAN: `${API_BASE_URL}/loan-applications/upload/pan`,
    UPLOAD_AADHAAR: `${API_BASE_URL}/loan-applications/upload/aadhaar`,
    UPLOAD_BANK_STATEMENT: `${API_BASE_URL}/loan-applications/upload/bank-statement`,
    UPLOAD_SALARY_SLIP: `${API_BASE_URL}/loan-applications/upload/salary-slip`,
    UPLOAD_PROPERTY_DOCUMENT: `${API_BASE_URL}/loan-applications/upload/property-document`,
    UPLOAD_BUSINESS_DOCUMENT: `${API_BASE_URL}/loan-applications/upload/business-document`,
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