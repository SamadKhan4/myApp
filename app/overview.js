import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Animated } from 'react-native';
import { router } from 'expo-router';

export default function Overview() {
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
          </View>
        </Animated.View>

        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 24 }]}
        >
          <Text style={styles.title}>Your Financial Journey Starts Here</Text>
          <Text style={styles.subtitle}>Experience seamless loan services with instant approval and flexible repayment options.</Text>
        </Animated.View>

        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 32 }]}
        >
          <View style={styles.featureCardsContainer}>
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>⚡</Text>
              <Text style={styles.featureTitle}>Instant Loans</Text>
              <Text style={styles.featureDescription}>Get approved in minutes with our streamlined process</Text>
            </View>
            
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>💰</Text>
              <Text style={styles.featureTitle}>Easy EMI</Text>
              <Text style={styles.featureDescription}>Flexible repayment options tailored to your needs</Text>
            </View>
            
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>🔒</Text>
              <Text style={styles.featureTitle}>Secure Process</Text>
              <Text style={styles.featureDescription}>Bank-grade security to protect your financial data</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 32 }]}
        >
          <View style={styles.loanTypesContainer}>
            <Text style={styles.sectionTitle}>Popular Loan Types</Text>
            <View style={styles.loanTypeCard}>
              <Text style={styles.loanTypeIcon}>💳</Text>
              <View style={styles.loanTypeInfo}>
                <Text style={styles.loanTypeName}>Personal Loan</Text>
                <Text style={styles.loanTypeDesc}>Up to ₹ 5,00,000 with competitive rates</Text>
              </View>
            </View>
            <View style={styles.loanTypeCard}>
              <Text style={styles.loanTypeIcon}>🏠</Text>
              <View style={styles.loanTypeInfo}>
                <Text style={styles.loanTypeName}>Home Loan</Text>
                <Text style={styles.loanTypeDesc}>Special rates starting from 7.5% p.a.</Text>
              </View>
            </View>
            <View style={styles.loanTypeCard}>
              <Text style={styles.loanTypeIcon}>🚗</Text>
              <View style={styles.loanTypeInfo}>
                <Text style={styles.loanTypeName}>Auto Loan</Text>
                <Text style={styles.loanTypeDesc}>Quick disbursal for vehicle purchases</Text>
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
            onPress={() => router.push('/(auth)/signup')}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>Continue to Sign Up</Text>
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
    marginTop: 12,
    fontWeight: '400',
  },
  featureCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  featureCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  loanTypesContainer: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  loanTypeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  loanTypeIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  loanTypeInfo: {
    flex: 1,
  },
  loanTypeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  loanTypeDesc: {
    fontSize: 14,
    color: '#6B7280',
  },
  continueButton: {
    backgroundColor: '#2563EB',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});