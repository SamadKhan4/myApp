import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { wp, hp, scale, verticalScale, scaleFont } from '../src/utils/responsive';

export default function Verification() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.stagger(200, [
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }]}
        >
          <View style={styles.header}>
            <Text style={styles.brandName}>ElitePaisa</Text>
            <Text style={styles.title}>Complete Your KYC</Text>
            <Text style={styles.subtitle}>Verify your identity to unlock higher loan limits</Text>
            
            {/* Step Progress Indicator */}
            <View style={styles.stepIndicatorContainer}>
              <View style={styles.stepContainer}>
                <View style={[styles.stepCircle, styles.activeStep]}>
                  <Text style={styles.stepNumber}>1</Text>
                </View>
                <Text style={[styles.stepLabel, styles.activeStepLabel]}>PAN</Text>
              </View>
              <View style={styles.stepConnector} />
              <View style={styles.stepContainer}>
                <View style={styles.stepCircle}>
                  <Text style={styles.stepNumber}>2</Text>
                </View>
                <Text style={styles.stepLabel}>Aadhaar</Text>
              </View>
              <View style={styles.stepConnector} />
              <View style={styles.stepContainer}>
                <View style={styles.stepCircle}>
                  <Text style={styles.stepNumber}>3</Text>
                </View>
                <Text style={styles.stepLabel}>Photo</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 32 }]}
        >
          <View style={styles.verificationContainer}>
            {/* PAN Card Verification */}
            <View style={styles.verificationCard}>
              <View style={styles.verificationHeader}>
                <Text style={styles.verificationIcon}>📋</Text>
                <View>
                  <Text style={styles.verificationTitle}>PAN Card</Text>
                  <Text style={styles.verificationSubtitle}>Verify your PAN for identity</Text>
                  <Text style={styles.verificationDescription}>PAN card is mandatory for loan verification and tax compliance</Text>
                </View>
              </View>
              
              <View style={styles.statusContainer}>
                <Text style={styles.statusText}>Verified</Text>
                <Text style={styles.statusIcon}>✅</Text>
              </View>
            </View>

            {/* Aadhaar Verification */}
            <View style={styles.verificationCard}>
              <View style={styles.verificationHeader}>
                <Text style={styles.verificationIcon}>🆔</Text>
                <View>
                  <Text style={styles.verificationTitle}>Aadhaar</Text>
                  <Text style={styles.verificationSubtitle}>Verify your Aadhaar for address</Text>
                  <Text style={styles.verificationDescription}>Aadhaar verification confirms your identity and address</Text>
                </View>
              </View>
              
              <View style={styles.statusContainer}>
                <Text style={styles.statusText}>Pending</Text>
                <Text style={styles.statusIcon}>⏳</Text>
              </View>
            </View>

            {/* Selfie Verification */}
            <View style={styles.verificationCard}>
              <View style={styles.verificationHeader}>
                <Text style={styles.verificationIcon}>📸</Text>
                <View>
                  <Text style={styles.verificationTitle}>Selfie Verification</Text>
                  <Text style={styles.verificationSubtitle}>Take a selfie with your document</Text>
                  <Text style={styles.verificationDescription}>Face verification ensures authenticity of the applicant</Text>
                </View>
              </View>
              
              <View style={styles.statusContainer}>
                <Text style={styles.statusText}>Pending</Text>
                <Text style={styles.statusIcon}>⏳</Text>
              </View>
            </View>

            {/* Info Section */}
            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>Why verification matters?</Text>
              <View style={styles.infoList}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoBullet}>•</Text>
                  <Text style={styles.infoText}>Prevents fraud and identity theft</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoBullet}>•</Text>
                  <Text style={styles.infoText}>Enables faster loan approval</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoBullet}>•</Text>
                  <Text style={styles.infoText}>Complies with regulatory requirements</Text>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>

        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 40, marginBottom: 40 }]}
        >
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={() => router.replace('/(auth)/login')}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>Continue to Login</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: wp(6),
    paddingBottom: hp(12),
  },
  header: {
    marginTop: hp(2.5),
    alignItems: 'flex-start',
  },
  brandName: {
    fontSize: scaleFont(24),
    fontWeight: '800',
    color: '#2563EB',
    letterSpacing: -0.5,
  },
  title: {
    fontSize: scaleFont(28),
    fontWeight: '800',
    color: '#111827',
    marginTop: hp(2.5),
    lineHeight: verticalScale(36),
  },
  subtitle: {
    fontSize: scaleFont(16),
    color: '#6B7280',
    lineHeight: verticalScale(24),
    marginTop: hp(1),
    fontWeight: '400',
  },
  verificationContainer: {
    marginTop: hp(3),
  },
  verificationCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: scale(16),
    padding: wp(5),
    marginBottom: hp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  verificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verificationIcon: {
    fontSize: scaleFont(24),
    marginRight: wp(4),
  },
  verificationTitle: {
    fontSize: scaleFont(16),
    fontWeight: '600',
    color: '#111827',
  },
  verificationSubtitle: {
    fontSize: scaleFont(14),
    color: '#6B7280',
    marginTop: hp(0.5),
  },
  verificationDescription: {
    fontSize: scaleFont(12),
    color: '#9CA3AF',
    marginTop: hp(0.5),
    fontWeight: '400',
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(2.5),
    marginBottom: hp(2.5),
  },
  stepContainer: {
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(0.75),
  },
  activeStep: {
    backgroundColor: '#2563EB',
  },
  stepNumber: {
    fontSize: scaleFont(14),
    fontWeight: '600',
    color: '#FFFFFF',
  },
  stepLabel: {
    fontSize: scaleFont(12),
    color: '#9CA3AF',
    fontWeight: '500',
  },
  activeStepLabel: {
    color: '#2563EB',
  },
  stepConnector: {
    flex: 1,
    height: verticalScale(2),
    backgroundColor: '#E5E7EB',
    position: 'absolute',
    top: verticalScale(16),
    left: wp(7.5),
    right: wp(7.5),
    zIndex: -1,
  },
  infoSection: {
    backgroundColor: '#F9FAFB',
    borderRadius: scale(16),
    padding: wp(5),
    marginTop: hp(2.5),
  },
  infoTitle: {
    fontSize: scaleFont(16),
    fontWeight: '700',
    color: '#111827',
    marginBottom: hp(1.5),
  },
  infoList: {
    gap: hp(1),
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoBullet: {
    fontSize: scaleFont(14),
    color: '#2563EB',
    marginRight: wp(2),
    marginTop: hp(0.25),
  },
  infoText: {
    fontSize: scaleFont(14),
    color: '#6B7280',
    lineHeight: verticalScale(20),
    flex: 1,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: scaleFont(14),
    fontWeight: '600',
    color: '#10B981',
    marginRight: wp(2),
  },
  statusIcon: {
    fontSize: scaleFont(20),
  },
  uploadCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: scale(16),
    padding: wp(5),
  },
  uploadTitle: {
    fontSize: scaleFont(18),
    fontWeight: '700',
    color: '#111827',
    marginBottom: hp(1),
  },
  uploadSubtitle: {
    fontSize: scaleFont(14),
    color: '#6B7280',
    marginBottom: hp(2),
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(2.5),
  },
  imagePlaceholder: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(12),
    padding: wp(4),
    alignItems: 'center',
    width: '48%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  imageIcon: {
    fontSize: scaleFont(32),
    marginBottom: hp(1),
  },
  imageText: {
    fontSize: scaleFont(14),
    fontWeight: '600',
    color: '#6B7280',
  },
  uploadButton: {
    backgroundColor: '#2563EB',
    height: verticalScale(52),
    borderRadius: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: scaleFont(16),
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: '#111827',
    height: verticalScale(56),
    borderRadius: scale(16),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: scale(8),
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: scaleFont(16),
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});