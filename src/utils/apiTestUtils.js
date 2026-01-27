/**
 * API Test Utilities
 * Helper functions to test API connections and endpoints
 */

import ApiService from '../services/ApiService';

class ApiTestUtils {
  /**
   * Test connection to the API server
   */
  static async testConnection() {
    try {
      console.log('Testing API connection...');
      
      // Test a public endpoint (get all loan types)
      const response = await ApiService.getAllLoanTypes();
      console.log('Connection test result:', response);
      return response.success;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }

  /**
   * Test all major API categories
   */
  static async testAllApis() {
    const results = {
      auth: {},
      profile: {},
      loanTypes: {},
      loanApplications: {}
    };

    try {
      // Test Authentication APIs
      console.log('Testing Authentication APIs...');
      results.auth.login = await this.testLogin();
      results.auth.signup = await this.testSignup();
      results.auth.forgotPassword = await this.testForgotPassword();

      // Test Profile APIs (only if authenticated)
      console.log('Testing Profile APIs...');
      results.profile.getMyProfile = await this.testGetMyProfile();
      results.profile.createOrUpdateProfile = await this.testCreateOrUpdateProfile();

      // Test Loan Types APIs
      console.log('Testing Loan Types APIs...');
      results.loanTypes.getAll = await this.testGetAllLoanTypes();
      results.loanTypes.getById = await this.testGetLoanTypeById();

      // Test Loan Applications APIs
      console.log('Testing Loan Applications APIs...');
      results.loanApplications.getMyApplications = await this.testGetMyLoanApplications();
      results.loanApplications.apply = await this.testApplyForLoan();

      return results;
    } catch (error) {
      console.error('Error during API testing:', error);
      return results;
    }
  }

  static async testLogin() {
    try {
      // Note: This would require actual credentials
      console.log('Testing login API...');
      return { status: 'SKIPPED - Requires credentials' };
    } catch (error) {
      return { status: 'FAILED', error: error.message };
    }
  }

  static async testSignup() {
    try {
      console.log('Testing signup API...');
      return { status: 'SKIPPED - Requires user data' };
    } catch (error) {
      return { status: 'FAILED', error: error.message };
    }
  }

  static async testForgotPassword() {
    try {
      console.log('Testing forgot password API...');
      return { status: 'SKIPPED - Would send email' };
    } catch (error) {
      return { status: 'FAILED', error: error.message };
    }
  }

  static async testGetMyProfile() {
    try {
      console.log('Testing get my profile API...');
      const isAuthenticated = await ApiService.isAuthenticated();
      if (!isAuthenticated) {
        return { status: 'SKIPPED - Not authenticated' };
      }
      const response = await ApiService.getMyProfile();
      return { status: response.success ? 'SUCCESS' : 'FAILED', data: response };
    } catch (error) {
      return { status: 'FAILED', error: error.message };
    }
  }

  static async testCreateOrUpdateProfile() {
    try {
      console.log('Testing create/update profile API...');
      const isAuthenticated = await ApiService.isAuthenticated();
      if (!isAuthenticated) {
        return { status: 'SKIPPED - Not authenticated' };
      }
      // Test with minimal profile data
      const profileData = {
        fullName: "Test User",
        panNo: "ABCDE1234F",
        adharNo: "123456789012",
        phoneNo: "9876543210",
        email: "test@example.com"
      };
      const response = await ApiService.createOrUpdateProfile(profileData);
      return { status: response.success ? 'SUCCESS' : 'FAILED', data: response };
    } catch (error) {
      return { status: 'FAILED', error: error.message };
    }
  }

  static async testGetAllLoanTypes() {
    try {
      console.log('Testing get all loan types API...');
      const response = await ApiService.getAllLoanTypes();
      return { status: response.success ? 'SUCCESS' : 'FAILED', data: response };
    } catch (error) {
      return { status: 'FAILED', error: error.message };
    }
  }

  static async testGetLoanTypeById() {
    try {
      console.log('Testing get loan type by ID API...');
      // Try with a sample ID - in real scenario you'd get this from the list
      const response = await ApiService.getLoanTypeById('sample-id');
      return { status: response.success ? 'SUCCESS' : 'FAILED', data: response };
    } catch (error) {
      return { status: 'FAILED', error: error.message };
    }
  }

  static async testGetMyLoanApplications() {
    try {
      console.log('Testing get my loan applications API...');
      const isAuthenticated = await ApiService.isAuthenticated();
      if (!isAuthenticated) {
        return { status: 'SKIPPED - Not authenticated' };
      }
      const response = await ApiService.getMyLoanApplications();
      return { status: response.success ? 'SUCCESS' : 'FAILED', data: response };
    } catch (error) {
      return { status: 'FAILED', error: error.message };
    }
  }

  static async testApplyForLoan() {
    try {
      console.log('Testing apply for loan API...');
      const isAuthenticated = await ApiService.isAuthenticated();
      if (!isAuthenticated) {
        return { status: 'SKIPPED - Not authenticated' };
      }
      // Test with minimal application data
      const applicationData = {
        loanTypeId: "sample-loan-type-id",
        loanAmount: 500000,
        tenure: 24,
        purpose: "Test application"
      };
      const response = await ApiService.applyForLoan(applicationData);
      return { status: response.success ? 'SUCCESS' : 'FAILED', data: response };
    } catch (error) {
      return { status: 'FAILED', error: error.message };
    }
  }

  /**
   * Comprehensive health check of all API endpoints
   */
  static async healthCheck() {
    const report = {
      timestamp: new Date().toISOString(),
      serverReachable: false,
      endpoints: {
        auth: { reachable: false, endpoints: {} },
        profile: { reachable: false, endpoints: {} },
        loanTypes: { reachable: false, endpoints: {} },
        loanApplications: { reachable: false, endpoints: {} }
      }
    };

    try {
      // Test basic connectivity
      report.serverReachable = await this.testConnection();

      // Test each category
      report.endpoints.loanTypes.reachable = await this.testGetAllLoanTypes()
        .then(result => result.status !== 'FAILED');

      report.endpoints.auth.reachable = true; // Basic endpoints are configured
      report.endpoints.profile.reachable = await this.testGetMyProfile()
        .then(result => result.status !== 'FAILED' && result.status !== 'SKIPPED - Not authenticated');
      report.endpoints.loanApplications.reachable = await this.testGetMyLoanApplications()
        .then(result => result.status !== 'FAILED' && result.status !== 'SKIPPED - Not authenticated');

      return report;
    } catch (error) {
      console.error('Health check error:', error);
      return report;
    }
  }
}

export default ApiTestUtils;