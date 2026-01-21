import ApiService from '../services/ApiService';

// Profile utility functions

export const createOrUpdateProfile = async (profileData) => {
  try {
    const response = await ApiService.createOrUpdateProfile(profileData);
    return {
      success: true,
      data: response.data,
      message: response.data?.message || 'Profile created or updated successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to create or update profile'
    };
  }
};

export const getMyProfile = async () => {
  try {
    const response = await ApiService.getMyProfile();
    return {
      success: true,
      data: response.data?.profile,
      message: response.data?.message || 'Profile retrieved successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to retrieve profile'
    };
  }
};

export const uploadProfilePicture = async (imageUri) => {
  try {
    const response = await ApiService.uploadProfilePicture(imageUri);
    console.log('Raw upload response:', response); // Debug log
    
    // Handle different response structures
    let profilePicUrl = '';
    
    if (response.data?.data?.profilePic) {
      // If response.data.data.profilePic exists
      profilePicUrl = response.data.data.profilePic;
    } else if (response.data?.data?.url) {
      // If response.data.data.url exists
      profilePicUrl = response.data.data.url;
    } else if (typeof response.data?.data === 'string') {
      // If response.data.data is directly the URL string
      profilePicUrl = response.data.data;
    } else if (response.data?.profilePic) {
      // If response.data.profilePic exists (one level up)
      profilePicUrl = response.data.profilePic;
    } else if (response.data?.url) {
      // If response.data.url exists (one level up)
      profilePicUrl = response.data.url;
    }
    
    console.log('Extracted profile pic URL:', profilePicUrl); // Debug log
    
    return {
      success: true,
      data: profilePicUrl, // Return just the URL string
      message: response.data?.message || 'Profile picture uploaded successfully'
    };
  } catch (error) {
    console.error('Upload profile picture error:', error); // Debug log
    return {
      success: false,
      message: error.message || 'Failed to upload profile picture'
    };
  }
};

export const getAllProfiles = async () => {
  try {
    const response = await ApiService.getAllProfiles();
    return {
      success: true,
      data: response.data?.profiles,
      message: response.data?.message || 'Profiles retrieved successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to retrieve profiles'
    };
  }
};

export const getProfileById = async (id) => {
  try {
    const response = await ApiService.getProfileById(id);
    return {
      success: true,
      data: response.data?.profile,
      message: response.data?.message || 'Profile retrieved successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Failed to retrieve profile'
    };
  }
};