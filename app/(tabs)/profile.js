import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createOrUpdateProfile, getMyProfile, uploadProfilePicture } from '../../src/utils/profile';

export default function Profile() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    fullName: '',
    panNo: '',
    adharNo: '',
    pincode: '',
    phoneNo: '',
    phoneNo2: '',
    email: '',
    address: '',
    age: '',
    bankDetails: [{
      bankName: '',
      accountNo: '',
      accountHolderName: '',
      bankBranch: '',
      ifscCode: ''
    }],
    profilePic: ''
  });

  // Add state for profile picture
  const [profilePicUri, setProfilePicUri] = useState(null);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();
    
    loadProfile();
    // Request permissions when the component mounts
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    // Request both camera and media library permissions
    await ImagePicker.requestCameraPermissionsAsync();
    await ImagePicker.requestMediaLibraryPermissionsAsync();
  };

  const loadProfile = async () => {
    try {
      const result = await getMyProfile();
      if (result.success) {
        setProfileData(result.data);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!validateProfileData()) {
      return;
    }

    setLoading(true);
    try {
      // If there's a new profile picture selected, upload it first
      let updatedProfileData = {...profileData};
      if (profilePicUri) {
        const uploadResult = await uploadProfilePicture(profilePicUri);
        console.log('Upload result:', uploadResult); // Debug log
        if (uploadResult.success) {
          // Extract the URL string from the response object
          let profilePicUrl;
          if (typeof uploadResult.data === 'string') {
            profilePicUrl = uploadResult.data;
          } else if (uploadResult.data && typeof uploadResult.data === 'object') {
            // Handle object response - extract the URL from profilePic property
            profilePicUrl = uploadResult.data.profilePic || uploadResult.data.url || '';
          } else {
            profilePicUrl = '';
          }
          
          if (profilePicUrl && typeof profilePicUrl === 'string') {
            updatedProfileData.profilePic = profilePicUrl;
            setProfileData(prev => ({
              ...prev,
              profilePic: profilePicUrl
            }));
          } else {
            console.error('Could not extract valid profile picture URL:', uploadResult.data);
            Alert.alert('Error', 'Could not extract profile picture URL. Please try again.');
            return;
          }
        } else {
          Alert.alert('Error', 'Failed to upload profile picture: ' + uploadResult.message);
          return; // Don't proceed if profile picture upload fails
        }
      }

      console.log('Sending profile data:', updatedProfileData); // Debug log
      const result = await createOrUpdateProfile(updatedProfileData);
      if (result.success) {
        Alert.alert('Success', result.message || 'Profile saved successfully');
        setIsEditing(false);
      } else {
        Alert.alert('Error', result.message || 'Failed to save profile');
      }
    } catch (error) {
      console.error('Save profile error:', error); // Debug log
      Alert.alert('Error', error.message || 'An error occurred while saving profile');
    } finally {
      setLoading(false);
    }
  };
  
  const validateProfileData = () => {
    if (!profileData.fullName.trim()) {
      Alert.alert('Validation Error', 'Please enter your full name');
      return false;
    }
    
    if (!profileData.panNo.trim()) {
      Alert.alert('Validation Error', 'Please enter your PAN number');
      return false;
    }
    
    if (!profileData.adharNo.trim()) {
      Alert.alert('Validation Error', 'Please enter your Aadhaar number');
      return false;
    }
    
    if (!profileData.phoneNo.trim()) {
      Alert.alert('Validation Error', 'Please enter your primary phone number');
      return false;
    }
    
    if (!profileData.email.trim()) {
      Alert.alert('Validation Error', 'Please enter your email address');
      return false;
    }
    
    if (!profileData.address.trim()) {
      Alert.alert('Validation Error', 'Please enter your address');
      return false;
    }
    
    return true;
  };
  
  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Add functions for profile picture
  const pickImage = async () => {
    // Ask the user whether to take a photo or choose from gallery
    Alert.alert(
      'Profile Picture',
      'Choose an option to select your profile picture',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Take Photo', onPress: takePhoto },
        { text: 'Choose from Gallery', onPress: chooseFromGallery }
      ]
    );
  };

  const takePhoto = async () => {
    // Request camera permission
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Camera permission is required to take a photo.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicUri(result.assets[0].uri);
    }
  };

  const chooseFromGallery = async () => {
    // Request media library permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Media library permission is required to access photos.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicUri(result.assets[0].uri);
    }
  };

  // Update the uploadProfilePic function to use the selected image
  const uploadProfilePic = async () => {
    if (!profilePicUri) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    try {
      setLoading(true);
      const result = await uploadProfilePicture(profilePicUri);
      if (result.success) {
        Alert.alert('Success', result.message || 'Profile picture uploaded successfully');
        // Update the profile data with the new profile picture URL
        setProfileData(prev => ({
          ...prev,
          profilePic: result.data?.profilePicUrl || result.data
        }));
      } else {
        Alert.alert('Error', result.message || 'Failed to upload profile picture');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'An error occurred while uploading profile picture');
    } finally {
      setLoading(false);
    }
  };

  const handleBankDetailChange = (index, field, value) => {
    const updatedBankDetails = [...profileData.bankDetails];
    updatedBankDetails[index][field] = value;
    setProfileData(prev => ({
      ...prev,
      bankDetails: updatedBankDetails
    }));
  };
  
  const addBankAccount = () => {
    setProfileData(prev => ({
      ...prev,
      bankDetails: [...prev.bankDetails, {
        bankName: '',
        accountNo: '',
        accountHolderName: '',
        bankBranch: '',
        ifscCode: ''
      }]
    }));
  };
  
  const handleEditProfile = () => {
    if (isEditing) {
      handleSaveProfile();
    } else {
      setIsEditing(true);
    }
  };

  const handleForgotPassword = () => {
    router.push('/(auth)/forgot-password');
  };

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => router.replace('/(auth)/login'), style: 'destructive' }
      ]
    );
  };
  
  const renderEditableField = (label, field, placeholder, keyboardType = 'default') => (
    <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={profileData[field]}
        onChangeText={(value) => handleInputChange(field, value)}
        keyboardType={keyboardType}
        editable={isEditing}
      />
    </View>
  );
  
  const renderReadOnlyField = (icon, label, value) => (
    <View style={styles.infoItem}>
      <View style={styles.infoIconContainer}>
        <Text style={styles.infoIcon}>{icon}</Text>
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E40AF" />
      
      {/* Header Background */}
      <View style={styles.headerBackground}>
        <View style={styles.headerGradient} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }]}
        >
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.logoContainer}>
                <Image 
                  source={require('../../src/assets/Images/logo.png')}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.brandName}>ElitePaisa</Text>
              <Text style={styles.title}>My Profile</Text>
            </View>
            <TouchableOpacity style={styles.settingsButton}>
              <Text style={styles.settingsIcon}>⚙️</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* User Profile Card */}
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }, { marginTop: 24 }]}
        >
          <View style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
                {profileData.profilePic ? (
                  <Image 
                    source={{ uri: profileData.profilePic }} 
                    style={styles.avatarImage}
                  />
                ) : (
                  <Text style={styles.avatarText}>{profileData.fullName ? profileData.fullName.charAt(0).toUpperCase() : 'U'}</Text>
                )}
                <View style={styles.cameraIconContainer}>
                  <Text style={styles.cameraIcon}>📷</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.profileInfo}>
                <Text style={styles.userName}>{profileData.fullName || 'N/A'}</Text>
                <Text style={styles.userEmail}>{profileData.email || 'N/A'}</Text>
                <View style={styles.membershipBadge}>
                  <Text style={styles.membershipText}>Member since Jan 2024</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
              <Text style={styles.editProfileText}>{isEditing ? 'Save Profile' : 'Edit Profile'}</Text>
              <Text style={styles.editProfileIcon}>→</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Credit Score Card */}
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 20 }]}
        >
          <View style={styles.creditScoreCard}>
            <View style={styles.creditScoreContent}>
              <Text style={styles.creditScoreLabel}>Your Credit Score</Text>
              <View style={styles.creditScoreValueContainer}>
                <Text style={styles.creditScoreValue}>750</Text>
                <View style={styles.creditScoreBadge}>
                  <Text style={styles.creditScoreBadgeText}>Excellent</Text>
                </View>
              </View>
              <View style={styles.creditScoreBar}>
                <View style={[styles.creditScoreFill, { width: '75%' }]} />
              </View>
            </View>
            <TouchableOpacity style={styles.viewReportButton}>
              <Text style={styles.viewReportText}>View Full Report →</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Quick Stats */}
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 20 }]}
        >
          <View style={styles.statsContainer}>
            <View style={[styles.statCard, { backgroundColor: '#EEF2FF' }]}>
              <Text style={styles.statIcon}>💰</Text>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Active Loans</Text>
            </View>
            
            <View style={[styles.statCard, { backgroundColor: '#FEF3C7' }]}>
              <Text style={styles.statIcon}>✓</Text>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Paid EMIs</Text>
            </View>
            
            <View style={[styles.statCard, { backgroundColor: '#ECFDF5' }]}>
              <Text style={styles.statIcon}>🎯</Text>
              <Text style={styles.statValue}>98%</Text>
              <Text style={styles.statLabel}>On-Time Rate</Text>
            </View>
          </View>
        </Animated.View>

        {/* Personal Information */}
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 28 }]}
        >
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Personal Information</Text>
            </View>
            
            <View style={styles.infoCard}>
              {isEditing ? (
                <View>
                  {renderEditableField('Full Name', 'fullName', 'Enter your full name')}
                  <View style={styles.infoDivider} />
                  {renderEditableField('Email Address', 'email', 'your.email@example.com', 'email-address')}
                  <View style={styles.infoDivider} />
                  {renderEditableField('Primary Phone', 'phoneNo', 'Enter primary phone number', 'phone-pad')}
                  <View style={styles.infoDivider} />
                  {renderEditableField('Secondary Phone', 'phoneNo2', 'Enter secondary phone number', 'phone-pad')}
                  <View style={styles.infoDivider} />
                  {renderEditableField('Address', 'address', 'Enter your address')}
                  <View style={styles.infoDivider} />
                  {renderEditableField('Pincode', 'pincode', 'Enter pincode', 'numeric')}
                  <View style={styles.infoDivider} />
                  {renderEditableField('Age', 'age', 'Enter your age', 'numeric')}
                  <View style={styles.infoDivider} />
                  <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>Profile Picture</Text>
                    <TouchableOpacity 
                      style={styles.profilePicButton} 
                      onPress={pickImage}
                    >
                      <Text style={styles.profilePicButtonText}>Upload Profile Picture</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View>
                  {renderReadOnlyField('👤', 'Full Name', profileData.fullName || 'N/A')}
                  <View style={styles.infoDivider} />
                  {renderReadOnlyField('📧', 'Email Address', profileData.email || 'N/A')}
                  <View style={styles.infoDivider} />
                  {renderReadOnlyField('📱', 'Primary Phone', profileData.phoneNo || 'N/A')}
                  <View style={styles.infoDivider} />
                  {renderReadOnlyField('📱', 'Secondary Phone', profileData.phoneNo2 || 'N/A')}
                  <View style={styles.infoDivider} />
                  {renderReadOnlyField('📍', 'Address', profileData.address || 'N/A')}
                  <View style={styles.infoDivider} />
                  {renderReadOnlyField('📮', 'Pincode', profileData.pincode || 'N/A')}
                  <View style={styles.infoDivider} />
                  {renderReadOnlyField('🎂', 'Age', profileData.age || 'N/A')}
                </View>
              )}
            </View>
          </View>
        </Animated.View>

        {/* KYC Details */}
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 28 }]}
        >
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>KYC Details</Text>
              <View style={styles.kycVerifiedBadge}>
                <Text style={styles.kycVerifiedText}>✓ Verified</Text>
              </View>
            </View>
            
            <View style={styles.infoCard}>
              {isEditing ? (
                <View>
                  {renderEditableField('PAN Number', 'panNo', 'Enter PAN number')}
                  <View style={styles.infoDivider} />
                  {renderEditableField('Aadhaar Number', 'adharNo', 'Enter Aadhaar number', 'numeric')}
                </View>
              ) : (
                <View>
                  {renderReadOnlyField('🆔', 'PAN Number', profileData.panNo || 'N/A')}
                  <View style={styles.infoDivider} />
                  {renderReadOnlyField('🔢', 'Aadhaar Number', profileData.adharNo || 'N/A')}
                  <View style={styles.infoDivider} />
                  {renderReadOnlyField('📷', 'Verification Status', 'Verified')}
                </View>
              )}
            </View>
          </View>
        </Animated.View>

        {/* Bank Information */}
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 28 }]}
        >
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Bank Information</Text>
              {isEditing && (
                <TouchableOpacity onPress={addBankAccount}>
                  <Text style={styles.sectionEditText}>Add New</Text>
                </TouchableOpacity>
              )}
            </View>
            
            <View style={styles.infoCard}>
              {profileData.bankDetails?.map((bank, index) => (
                <View key={index}>
                  {isEditing ? (
                    <View>
                      <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Bank Name</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Enter bank name"
                          value={bank.bankName}
                          onChangeText={(value) => handleBankDetailChange(index, 'bankName', value)}
                          editable={isEditing}
                        />
                      </View>
                      <View style={styles.infoDivider} />
                      <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Account Number</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Enter account number"
                          value={bank.accountNo}
                          onChangeText={(value) => handleBankDetailChange(index, 'accountNo', value)}
                          keyboardType="numeric"
                          editable={isEditing}
                        />
                      </View>
                      <View style={styles.infoDivider} />
                      <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Account Holder Name</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Enter account holder name"
                          value={bank.accountHolderName}
                          onChangeText={(value) => handleBankDetailChange(index, 'accountHolderName', value)}
                          editable={isEditing}
                        />
                      </View>
                      <View style={styles.infoDivider} />
                      <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Bank Branch</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Enter bank branch"
                          value={bank.bankBranch}
                          onChangeText={(value) => handleBankDetailChange(index, 'bankBranch', value)}
                          editable={isEditing}
                        />
                      </View>
                      <View style={styles.infoDivider} />
                      <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>IFSC Code</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Enter IFSC code"
                          value={bank.ifscCode}
                          onChangeText={(value) => handleBankDetailChange(index, 'ifscCode', value)}
                          editable={isEditing}
                        />
                      </View>
                    </View>
                  ) : (
                    <View>
                      {renderReadOnlyField('🏦', 'Bank Name', bank.bankName || 'N/A')}
                      <View style={styles.infoDivider} />
                      {renderReadOnlyField('💳', 'Account Number', bank.accountNo || 'N/A')}
                      <View style={styles.infoDivider} />
                      {renderReadOnlyField('👤', 'Account Holder Name', bank.accountHolderName || 'N/A')}
                      <View style={styles.infoDivider} />
                      {renderReadOnlyField('🏢', 'Bank Branch', bank.bankBranch || 'N/A')}
                      <View style={styles.infoDivider} />
                      {renderReadOnlyField('🔑', 'IFSC Code', bank.ifscCode || 'N/A')}
                    </View>
                  )}
                  {index < profileData.bankDetails.length - 1 && <View style={styles.infoDivider} />}
                </View>
              ))}
              {isEditing && (
                <View>
                  <View style={styles.infoDivider} />
                  <TouchableOpacity 
                    style={styles.addButton}
                    onPress={addBankAccount}
                  >
                    <Text style={styles.addButtonText}>+ Add Another Bank Account</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </Animated.View>




        

        
        {/* Action Buttons */}
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 28, marginBottom: 100 }]}
        >
          <TouchableOpacity 
            style={styles.forgotPasswordButton}
            onPress={handleForgotPassword}
          >
            <Text style={styles.forgotPasswordIcon}>🔐</Text>
            <Text style={styles.forgotPasswordText}>Change Password</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutIcon}>🚪</Text>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: '#1E40AF',
    overflow: 'hidden',
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: '#2563EB',
    opacity: 0.8,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  headerLeft: {
    flex: 1,
  },
  logoContainer: {
    marginBottom: 8,
  },
  logoImage: {
    width: 40,
    height: 40,
  },
  brandName: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 4,
    letterSpacing: -1,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    fontSize: 22,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
  },
  cameraIcon: {
    fontSize: 12,
    color: '#6B7280',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    fontWeight: '500',
  },
  membershipBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  membershipText: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '700',
  },
  editProfileButton: {
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
  },
  editProfileText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    marginRight: 8,
  },
  editProfileIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  creditScoreCard: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  creditScoreContent: {
    marginBottom: 16,
  },
  creditScoreLabel: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 12,
    fontWeight: '600',
  },
  creditScoreValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  creditScoreValue: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
    marginRight: 12,
  },
  creditScoreBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  creditScoreBadgeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  creditScoreBar: {
    height: 8,
    backgroundColor: '#334155',
    borderRadius: 4,
    overflow: 'hidden',
  },
  creditScoreFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  viewReportButton: {
    alignItems: 'center',
  },
  viewReportText: {
    color: '#60A5FA',
    fontSize: 15,
    fontWeight: '700',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '600',
    textAlign: 'center',
  },
  section: {
    marginBottom: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  sectionEditText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '700',
  },
  kycVerifiedBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  kycVerifiedText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '700',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  infoIcon: {
    fontSize: 20,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '700',
  },
  infoDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    height: 52,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#111827',
    fontWeight: '500',
  },
  profilePicButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
  },
  profilePicButtonText: {
    color: '#4B5563',
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  forgotPasswordButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#2563EB',
  },
  forgotPasswordIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  forgotPasswordText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2563EB',
  },
  logoutButton: {
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: '#FEE2E2',
  },
  logoutIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#DC2626',
  },
});
