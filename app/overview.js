import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { getCurrentUser, isAuthenticated, logout } from '../src/utils/auth';

export default function Overview() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const authStatus = await isAuthenticated();
      if (authStatus) {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } else {
        // Not authenticated, redirect to login
        router.replace('/(auth)/login');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      router.replace('/(auth)/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/(auth)/login');
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
    }
  };

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
            {user && (
              <View style={styles.userHeader}>
                <View>
                  <Text style={styles.welcomeText}>Welcome back,</Text>
                  <Text style={styles.userName}>{user.fullName || user.email}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.logoutButton}
                  onPress={handleLogout}
                >
                  <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Animated.View>

        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 24 }]}
        >
          <Text style={styles.title}>Your Trusted Digital Loan Partner</Text>
          <Text style={styles.subtitle}>Experience seamless loan services with instant approval and flexible repayment options. We&apos;re here to help you achieve your financial goals with our reliable and secure platform.</Text>
        </Animated.View>

        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 32 }]}
        >
          <Text style={styles.sectionTitle}>Why Choose ElitePaisa?</Text>
          <View style={styles.featureCardsContainer}>
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>⚡</Text>
              <Text style={styles.featureTitle}>Fast Approval</Text>
              <Text style={styles.featureDescription}>Get approved in minutes with our streamlined process</Text>
            </View>
            
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>💰</Text>
              <Text style={styles.featureTitle}>Transparent Charges</Text>
              <Text style={styles.featureDescription}>No hidden fees, clear cost breakdown upfront</Text>
            </View>
            
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>🔄</Text>
              <Text style={styles.featureTitle}>Flexible EMI Options</Text>
              <Text style={styles.featureDescription}>Customize repayment to match your budget</Text>
            </View>
            
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>🛡️</Text>
              <Text style={styles.featureTitle}>Secure Data</Text>
              <Text style={styles.featureDescription}>Bank-grade security to protect your financial data</Text>
            </View>
            
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>🌐</Text>
              <Text style={styles.featureTitle}>100% Online Process</Text>
              <Text style={styles.featureDescription}>Complete application without visiting any branch</Text>
            </View>
            
            <View style={styles.featureCard}>
              <Text style={styles.featureIcon}>🏆</Text>
              <Text style={styles.featureTitle}>Trusted Platform</Text>
              <Text style={styles.featureDescription}>Serving thousands of satisfied customers</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 32 }]}
        >
          <Text style={styles.sectionTitle}>Our Services Overview</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.servicesScroll}>
            <View style={styles.serviceCard}>
              <Text style={styles.serviceIcon}>💳</Text>
              <Text style={styles.serviceTitle}>Instant Loan Access</Text>
              <Text style={styles.serviceDesc}>Quick approval and disbursal in minutes</Text>
            </View>
            
            <View style={styles.serviceCard}>
              <Text style={styles.serviceIcon}>📊</Text>
              <Text style={styles.serviceTitle}>EMI Management</Text>
              <Text style={styles.serviceDesc}>Easy EMI tracking and management</Text>
            </View>
            
            <View style={styles.serviceCard}>
              <Text style={styles.serviceIcon}>🔍</Text>
              <Text style={styles.serviceTitle}>Loan Tracking</Text>
              <Text style={styles.serviceDesc}>Real-time status of your loan application</Text>
            </View>
            
            <View style={styles.serviceCard}>
              <Text style={styles.serviceIcon}>💬</Text>
              <Text style={styles.serviceTitle}>Customer Support</Text>
              <Text style={styles.serviceDesc}>24/7 assistance for all your queries</Text>
            </View>
          </ScrollView>
        </Animated.View>

        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 32 }]}
        >
          <Text style={styles.sectionTitle}>Types of Loans</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.loanTypesScroll}>
            <View style={styles.loanTypeCard}>
              <Text style={styles.loanTypeIcon}>👤</Text>
              <View style={styles.loanTypeInfo}>
                <Text style={styles.loanTypeName}>Personal Loan</Text>
                <Text style={styles.loanTypeDesc}>Flexible loan for personal needs up to ₹15L</Text>
              </View>
              <View style={styles.loanTypeDetails}>
                <Text style={styles.loanTypeAmount}>Max: ₹15L</Text>
                <Text style={styles.loanTypeRate}>From 10.5% p.a.</Text>
              </View>
            </View>
            
            <View style={styles.loanTypeCard}>
              <Text style={styles.loanTypeIcon}>💼</Text>
              <View style={styles.loanTypeInfo}>
                <Text style={styles.loanTypeName}>Business Loan</Text>
                <Text style={styles.loanTypeDesc}>Funding for business growth up to ₹50L</Text>
              </View>
              <View style={styles.loanTypeDetails}>
                <Text style={styles.loanTypeAmount}>Max: ₹50L</Text>
                <Text style={styles.loanTypeRate}>From 11.5% p.a.</Text>
              </View>
            </View>
            
            <View style={styles.loanTypeCard}>
              <Text style={styles.loanTypeIcon}>🎓</Text>
              <View style={styles.loanTypeInfo}>
                <Text style={styles.loanTypeName}>Education Loan</Text>
                <Text style={styles.loanTypeDesc}>Finance your education dreams up to ₹20L</Text>
              </View>
              <View style={styles.loanTypeDetails}>
                <Text style={styles.loanTypeAmount}>Max: ₹20L</Text>
                <Text style={styles.loanTypeRate}>From 9.5% p.a.</Text>
              </View>
            </View>
            
            <View style={styles.loanTypeCard}>
              <Text style={styles.loanTypeIcon}>🆘</Text>
              <View style={styles.loanTypeInfo}>
                <Text style={styles.loanTypeName}>Emergency Loan</Text>
                <Text style={styles.loanTypeDesc}>Quick funds for emergencies up to ₹5L</Text>
              </View>
              <View style={styles.loanTypeDetails}>
                <Text style={styles.loanTypeAmount}>Max: ₹5L</Text>
                <Text style={styles.loanTypeRate}>From 12% p.a.</Text>
              </View>
            </View>
          </ScrollView>
        </Animated.View>

        {/* Trust & Credibility Section */}
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 32 }]}
        >
          <View style={styles.trustSection}>
            <View style={styles.trustStatsContainer}>
              <View style={styles.trustStatItem}>
                <Text style={styles.trustStatValue}>50,000+</Text>
                <Text style={styles.trustStatLabel}>Happy Users</Text>
              </View>
              <View style={styles.trustStatItem}>
                <Text style={styles.trustStatValue}>₹10 Cr+</Text>
                <Text style={styles.trustStatLabel}>Loans Processed</Text>
              </View>
            </View>
            <Text style={styles.trustStatement}>Trusted by thousands of customers nationwide with a commitment to transparency and security.</Text>
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
            onPress={() => router.push('/(auth)/login')}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>Start Your Loan Journey</Text>
          </TouchableOpacity>
          <Text style={styles.ctaSubtext}>Start your loan journey in just a few steps</Text>
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
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 16,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  welcomeText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '400',
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
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
  servicesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  serviceCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    marginRight: 16,
    width: 250,
  },
  serviceIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  serviceDesc: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  loanTypesContainer: {
    marginTop: 24,
  },
  trustSection: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  trustStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 16,
  },
  trustStatItem: {
    alignItems: 'center',
  },
  trustStatValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2563EB',
    marginBottom: 4,
  },
  trustStatLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  trustStatement: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 20,
  },
  ctaSubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 12,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  loanTypesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  loanTypeCard: {
    flexDirection: 'column',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    width: 280,
  },
  loanTypeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  loanTypeAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  loanTypeRate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
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