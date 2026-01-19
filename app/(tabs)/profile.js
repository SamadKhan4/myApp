import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Alert, Animated, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const userData = {
  name: 'Samad Khan',
  email: 'samad@example.com',
  mobile: '+91 9876543210',
  pan: 'ABCDP1234E',
  aadhaar: '1234 5678 9012',
  address: '123, Main Street, Mumbai, Maharashtra, 400001',
  bankAccount: 'XXXXXX1234',
  ifscCode: 'HDFC0000123',
  memberSince: 'January 2024',
  kycStatus: 'Verified',
  creditScore: 750,
};

export default function Profile() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

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
  }, []);

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing functionality would be available in the full version.');
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Forgot Password',
      'Password recovery instructions will be sent to your registered email/mobile.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Send Link', onPress: () => alert('Recovery link sent to your email!') }
      ]
    );
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

  const menuItems = [
    { icon: '🔔', title: 'Notifications', subtitle: 'Manage alerts & updates', onPress: () => alert('Notifications') },
    { icon: '🔒', title: 'Security', subtitle: 'Password & privacy settings', onPress: () => alert('Security') },
    { icon: '📄', title: 'Documents', subtitle: 'View uploaded documents', onPress: () => alert('Documents') },
    { icon: '💬', title: 'Support', subtitle: 'Get help & contact us', onPress: () => alert('Support') },
    { icon: '⚙️', title: 'Settings', subtitle: 'App preferences', onPress: () => alert('Settings') },
  ];
  
  const securityOptions = [
    { icon: '🔐', title: 'Change Password', subtitle: 'Update your account password', onPress: () => alert('Change Password') },
    { icon: '❓', title: 'Forgot Password', subtitle: 'Recover your account', onPress: () => alert('Forgot Password') },
  ];
  
  const appInfoOptions = [
    { icon: '📋', title: 'App Version', subtitle: 'v1.2.0', onPress: () => {} },
    { icon: '📜', title: 'Terms & Conditions', subtitle: 'Legal terms and conditions', onPress: () => alert('Terms & Conditions') },
    { icon: '📋', title: 'Privacy Policy', subtitle: 'Learn how we protect your data', onPress: () => alert('Privacy Policy') },
  ];

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
            <View>
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
              <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>SK</Text>
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedIcon}>✓</Text>
                </View>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.userName}>{userData.name}</Text>
                <Text style={styles.userEmail}>{userData.email}</Text>
                <View style={styles.membershipBadge}>
                  <Text style={styles.membershipText}>Member since {userData.memberSince}</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
              <Text style={styles.editProfileText}>Edit Profile</Text>
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
                <Text style={styles.creditScoreValue}>{userData.creditScore}</Text>
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
              <TouchableOpacity onPress={handleEditProfile}>
                <Text style={styles.sectionEditText}>Edit</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.infoCard}>
              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <Text style={styles.infoIcon}>👤</Text>
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Full Name</Text>
                  <Text style={styles.infoValue}>{userData.name}</Text>
                </View>
              </View>

              <View style={styles.infoDivider} />

              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <Text style={styles.infoIcon}>📧</Text>
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Email Address</Text>
                  <Text style={styles.infoValue}>{userData.email}</Text>
                </View>
              </View>

              <View style={styles.infoDivider} />

              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <Text style={styles.infoIcon}>📱</Text>
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Mobile Number</Text>
                  <Text style={styles.infoValue}>{userData.mobile}</Text>
                </View>
              </View>

              <View style={styles.infoDivider} />

              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <Text style={styles.infoIcon}>📍</Text>
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Address</Text>
                  <Text style={styles.infoValue}>{userData.address}</Text>
                </View>
              </View>

              <View style={styles.infoDivider} />

              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <Text style={styles.infoIcon}>📮</Text>
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Pincode</Text>
                  <Text style={styles.infoValue}>400001</Text>
                </View>
              </View>
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
              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <Text style={styles.infoIcon}>🆔</Text>
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>PAN Number</Text>
                  <Text style={styles.infoValue}>{userData.pan}</Text>
                </View>
              </View>

              <View style={styles.infoDivider} />

              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <Text style={styles.infoIcon}>🔢</Text>
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Aadhaar Number</Text>
                  <Text style={styles.infoValue}>{userData.aadhaar}</Text>
                </View>
              </View>

              <View style={styles.infoDivider} />

              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <Text style={styles.infoIcon}>📷</Text>
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Verification Status</Text>
                  <Text style={styles.infoValue}>Verified</Text>
                </View>
              </View>
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
              <TouchableOpacity>
                <Text style={styles.sectionEditText}>Add New</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.infoCard}>
              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <Text style={styles.infoIcon}>🏦</Text>
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Account Number</Text>
                  <Text style={styles.infoValue}>{userData.bankAccount}</Text>
                </View>
              </View>

              <View style={styles.infoDivider} />

              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <Text style={styles.infoIcon}>🔑</Text>
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>IFSC Code</Text>
                  <Text style={styles.infoValue}>{userData.ifscCode}</Text>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Menu Items */}
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 28 }]}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>More Options</Text>
            
            <View style={styles.menuCard}>
              {menuItems.map((item, index) => (
                <View key={index}>
                  <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={item.onPress}
                    activeOpacity={0.7}
                  >
                    <View style={styles.menuIconContainer}>
                      <Text style={styles.menuIcon}>{item.icon}</Text>
                    </View>
                    <View style={styles.menuContent}>
                      <Text style={styles.menuTitle}>{item.title}</Text>
                      <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                    </View>
                    <Text style={styles.menuArrow}>→</Text>
                  </TouchableOpacity>
                  {index < menuItems.length - 1 && <View style={styles.menuDivider} />}
                </View>
              ))}
            </View>
          </View>
        </Animated.View>

        {/* Security Section */}
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 28 }]}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Security</Text>
            
            <View style={styles.menuCard}>
              {securityOptions.map((item, index) => (
                <View key={index}>
                  <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={item.onPress}
                    activeOpacity={0.7}
                  >
                    <View style={styles.menuIconContainer}>
                      <Text style={styles.menuIcon}>{item.icon}</Text>
                    </View>
                    <View style={styles.menuContent}>
                      <Text style={styles.menuTitle}>{item.title}</Text>
                      <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                    </View>
                    <Text style={styles.menuArrow}>→</Text>
                  </TouchableOpacity>
                  {index < securityOptions.length - 1 && <View style={styles.menuDivider} />}
                </View>
              ))}
            </View>
          </View>
        </Animated.View>
        
        {/* App Info */}
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 28 }]}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>App Info</Text>
            
            <View style={styles.menuCard}>
              {appInfoOptions.map((item, index) => (
                <View key={index}>
                  <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={item.onPress}
                    activeOpacity={0.7}
                  >
                    <View style={styles.menuIconContainer}>
                      <Text style={styles.menuIcon}>{item.icon}</Text>
                    </View>
                    <View style={styles.menuContent}>
                      <Text style={styles.menuTitle}>{item.title}</Text>
                      <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                    </View>
                    <Text style={styles.menuArrow}>→</Text>
                  </TouchableOpacity>
                  {index < appInfoOptions.length - 1 && <View style={styles.menuDivider} />}
                </View>
              ))}
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
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#10B981',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedIcon: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '900',
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
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  menuIcon: {
    fontSize: 22,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  menuArrow: {
    fontSize: 18,
    color: '#9CA3AF',
    fontWeight: '700',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginLeft: 74,
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