import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Image, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { forgotPassword, resendOtp, resetPassword, verifyOtp } from '../../src/utils/auth';

export default function ForgotPassword() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const otpInputRefs = useRef([]);
  
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // 1: Enter email, 2: Enter OTP, 3: Reset password
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

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
      })
    ]).start();
  }, []);

  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            setCanResend(true);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendOtp = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      const result = await forgotPassword(email.trim());
      if (result.success) {
        setStep(2);
        setTimer(30);
        setCanResend(false);
        Alert.alert('Success', result.message || 'OTP sent to your email address');
      } else {
        Alert.alert('Error', result.error || 'Failed to send OTP');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const result = await verifyOtp(email.trim(), otpString);
      if (result.success) {
        setStep(3);
        Alert.alert('Success', result.message || 'OTP verified successfully');
      } else {
        Alert.alert('Error', result.error || 'Invalid OTP');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword.trim() || newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const otpString = otp.join('');
    setLoading(true);
    try {
      const result = await resetPassword(email.trim(), otpString, newPassword.trim(), confirmPassword.trim());
      if (result.success) {
        Alert.alert('Success', result.message || 'Password reset successfully', [
          { text: 'OK', onPress: () => router.replace('/(auth)/login') }
        ]);
      } else {
        Alert.alert('Error', result.error || 'Failed to reset password');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const result = await resendOtp(email.trim());
      if (result.success) {
        setTimer(30);
        setCanResend(false);
        Alert.alert('Success', result.message || 'OTP resent to your email address');
      } else {
        Alert.alert('Error', result.message || 'Failed to resend OTP');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value && !/^[0-9]$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = otpInputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    } else if (value && index === 5) {
      // If filling the last input, blur to close keyboard
      const currentInput = otpInputRefs.current[index];
      if (currentInput) {
        currentInput.blur();
      }
    }
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Forgot Password?</Text>
      <Text style={styles.stepSubtitle}>Enter your email address to receive OTP</Text>
      
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Email Address</Text>
        <TextInput 
          placeholder="your.email@example.com" 
          style={styles.input} 
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSendOtp}
        activeOpacity={0.8}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Sending OTP...' : 'Send OTP'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Verify OTP</Text>
      <Text style={styles.stepSubtitle}>Enter the 6-digit code sent to {email}</Text>
      
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            maxLength={1}
            keyboardType="numeric"
            value={digit}
            onChangeText={(value) => handleOtpChange(index, value)}
            ref={(ref) => otpInputRefs.current[index] = ref}
          />
        ))}
      </View>

      <View style={styles.timerContainer}>
        {canResend ? (
          <TouchableOpacity onPress={handleResendOtp} disabled={loading}>
            <Text style={styles.resendText}>Resend OTP</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.timerText}>Resend in {timer}s</Text>
        )}
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleVerifyOtp}
        activeOpacity={0.8}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Verifying...' : 'Verify OTP'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Reset Password</Text>
      <Text style={styles.stepSubtitle}>Create a new password for your account</Text>
      
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>New Password</Text>
        <TextInput 
          placeholder="Enter new password" 
          secureTextEntry 
          style={styles.input} 
          placeholderTextColor="#9CA3AF"
          value={newPassword}
          onChangeText={setNewPassword}
        />
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Confirm Password</Text>
        <TextInput 
          placeholder="Confirm new password" 
          secureTextEntry 
          style={styles.input} 
          placeholderTextColor="#9CA3AF"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleResetPassword}
        activeOpacity={0.8}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.container}>
        <Animated.View 
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.headerSection}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <View style={styles.logoContainer}>
              <Image 
                source={require('../../src/assets/Images/logo.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.brandName}>ElitePaisa</Text>
          </View>

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Remember your password? </Text>
            <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
              <Text style={styles.signinLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logoImage: {
    width: 40,
    height: 40,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  backIcon: {
    fontSize: 24,
    color: '#374151',
  },
  brandName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2563EB',
    letterSpacing: -0.5,
  },
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  stepSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    fontWeight: '400',
    marginBottom: 32,
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  otpInput: {
    width: 45,
    height: 55,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    backgroundColor: '#F9FAFB',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  timerText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  resendText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#2563EB',
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  buttonDisabled: {
    backgroundColor: '#9CA3AF',
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '400',
  },
  signinLink: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '600',
  },
});