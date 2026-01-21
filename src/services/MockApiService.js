// Mock API Service for testing when backend is unavailable
class MockApiService {
  static async signup(userData) {
    console.log('Mock Signup:', userData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock success response
    return {
      success: true,
      data: {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: 'mock-user-id-' + Date.now(),
          fullName: userData.fullName,
          email: userData.email,
          phoneNo: userData.phoneNo,
          role: userData.role
        },
        message: 'User registered successfully (mock)'
      }
    };
  }

  static async login(credentials) {
    console.log('Mock Login:', credentials);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock success response
    return {
      success: true,
      data: {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: 'mock-user-id-' + Date.now(),
          fullName: 'Test User',
          email: credentials.email,
          phoneNo: '1234567890',
          role: 'client'
        },
        message: 'Login successful (mock)'
      }
    };
  }

  static async forgotPassword(email) {
    console.log('Mock Forgot Password:', email);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      data: {
        message: 'OTP sent to your email address (mock)'
      }
    };
  }

  static async verifyOtp(email, otp) {
    console.log('Mock Verify OTP:', { email, otp });
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      data: {
        message: 'OTP verified successfully (mock)'
      }
    };
  }

  static async resetPassword(email, otp, newPassword) {
    console.log('Mock Reset Password:', { email, otp });
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      data: {
        message: 'Password reset successfully (mock)'
      }
    };
  }

  static async resendOtp(email) {
    console.log('Mock Resend OTP:', email);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      data: {
        message: 'OTP resent to your email address (mock)'
      }
    };
  }

  // Profile methods
  static async createOrUpdateProfile(profileData) {
    console.log('Mock Create/Update Profile:', profileData);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      data: {
        message: 'Profile created successfully (mock)',
        profile: {
          _id: 'mock-profile-id-' + Date.now(),
          ...profileData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      }
    };
  }

  static async getMyProfile() {
    console.log('Mock Get My Profile');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      data: {
        profile: {
          _id: 'mock-profile-id-' + Date.now(),
          authId: 'mock-user-id-' + Date.now(),
          fullName: 'Test User',
          panNo: 'ABCD1234E',
          adharNo: '123456789012',
          pincode: '123456',
          phoneNo: '9876543210',
          phoneNo2: '9876543211',
          email: 'test@example.com',
          address: '123 Main St, City',
          age: 30,
          bankDetails: [],
          profilePic: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      }
    };
  }

  static async uploadProfilePicture(imageUri) {
    console.log('Mock Upload Profile Picture:', imageUri);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      data: {
        message: 'Profile picture uploaded successfully (mock)',
        data: {
          profilePic: 'https://example.com/mock-profile-pic.jpg'
        }
      }
    };
  }

  static async getAllProfiles() {
    console.log('Mock Get All Profiles');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      data: {
        message: 'Profiles retrieved successfully (mock)',
        profiles: [{
          _id: 'mock-profile-id-' + Date.now(),
          authId: 'mock-user-id-' + Date.now(),
          fullName: 'Test User',
          panNo: 'ABCD1234E',
          adharNo: '123456789012',
          pincode: '123456',
          phoneNo: '9876543210',
          phoneNo2: '9876543211',
          email: 'test@example.com',
          address: '123 Main St, City',
          age: 30,
          bankDetails: [],
          profilePic: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }]
      }
    };
  }

  static async getProfileById(id) {
    console.log('Mock Get Profile By ID:', id);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      data: {
        message: 'Profile retrieved successfully (mock)',
        profile: {
          _id: id,
          authId: 'mock-user-id-' + Date.now(),
          fullName: 'Test User',
          panNo: 'ABCD1234E',
          adharNo: '123456789012',
          pincode: '123456',
          phoneNo: '9876543210',
          phoneNo2: '9876543211',
          email: 'test@example.com',
          address: '123 Main St, City',
          age: 30,
          bankDetails: [],
          profilePic: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      }
    };
  }

  // Authentication state methods
  static async isAuthenticated() {
    // Mock implementation - check if we have a token
    const token = await this.getToken();
    const user = await this.getUser();
    return !!(token && user);
  }

  static async logout() {
    // Mock implementation - clear auth data
    await this.clearAuthData();
    return { success: true };
  }

  // Storage methods (mock implementations)
  static async storeToken(token) {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('mock_user_token', token);
    }
  }

  static async getToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem('mock_user_token');
    }
    return null;
  }

  static async removeToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem('mock_user_token');
    }
  }

  static async storeUser(user) {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('mock_user_data', JSON.stringify(user));
    }
  }

  static async getUser() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userData = window.localStorage.getItem('mock_user_data');
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  static async removeUser() {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem('mock_user_data');
    }
  }

  static async clearAuthData() {
    await Promise.all([
      this.removeToken(),
      this.removeUser()
    ]);
  }
}

export default MockApiService;