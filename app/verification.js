import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
            onPress={() => router.replace('/(tabs)/home')}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>Continue to Dashboard</Text>
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
    padding: 24,
    paddingBottom: 100,
  },
  header: {
    marginTop: 20,
    alignItems: 'flex-start',
  },
  brandName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2563EB',
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginTop: 20,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginTop: 8,
    fontWeight: '400',
  },
  verificationContainer: {
    marginTop: 24,
  },
  verificationCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  verificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verificationIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  verificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  verificationSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  verificationDescription: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
    fontWeight: '400',
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  stepContainer: {
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  activeStep: {
    backgroundColor: '#2563EB',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  stepLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  activeStepLabel: {
    color: '#2563EB',
  },
  stepConnector: {
    flex: 1,
    height: 2,
    backgroundColor: '#E5E7EB',
    position: 'absolute',
    top: 16,
    left: 30,
    right: 30,
    zIndex: -1,
  },
  infoSection: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  infoList: {
    gap: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoBullet: {
    fontSize: 14,
    color: '#2563EB',
    marginRight: 8,
    marginTop: 2,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    flex: 1,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
    marginRight: 8,
  },
  statusIcon: {
    fontSize: 20,
  },
  uploadCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  uploadSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imagePlaceholder: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  imageIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  imageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  uploadButton: {
    backgroundColor: '#2563EB',
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: '#111827',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});