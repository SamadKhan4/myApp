import { router } from 'expo-router';
import { useEffect } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { hp, isIOS, scaleFont } from '../src/utils/responsive';

export default function Splash() {
  const scaleValue = new Animated.Value(0.8);
  const opacityValue = new Animated.Value(0);

  useEffect(() => {
    // Animation sequence
    Animated.sequence([
      // Fade in and scale up
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ]),
      // Wait for 2 seconds
      Animated.delay(2000),
      // Navigate to overview screen
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start(() => {
      router.replace('/(auth)/login');
    });

    // Cleanup function to prevent memory leaks
    return () => {};
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.logoContainer,
          {
            transform: [{ scale: scaleValue }],
            opacity: opacityValue
          }
        ]}
      >
        <Text style={styles.logo}>ElitePaisa</Text>
        <Text style={styles.tagline}>Smart Loans. Simple Life.</Text>
        
        <Animated.View style={{ opacity: opacityValue }}>
          <Text style={styles.loadingText}>Preparing your financial experience…</Text>
          <Text style={styles.progressText}>Loading assets</Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: isIOS ? hp(5) : hp(3),
    paddingBottom: isIOS ? hp(5) : hp(3),
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: scaleFont(36),
    fontWeight: '800',
    color: '#2563EB',
    marginBottom: hp(1.5),
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: scaleFont(16),
    color: '#6B7280',
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: hp(2.5),
  },
  loadingText: {
    fontSize: scaleFont(16),
    color: '#6B7280',
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: hp(1),
  },
  progressText: {
    fontSize: scaleFont(14),
    color: '#9CA3AF',
    fontWeight: '300',
    textAlign: 'center',
  },
});