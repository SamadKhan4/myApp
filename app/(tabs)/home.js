import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Animated, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useRef } from 'react';

export default function Home() {
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
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }]}
        >
          <View style={styles.headerContainer}>
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>Good Morning,</Text>
              <Text style={styles.userName}>Dhruv</Text>
            </View>
            <TouchableOpacity style={styles.profileIconContainer}>
              <Text style={styles.profileIcon}>👤</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, {transform: [{translateY: slideAnim}], opacity: fadeAnim, marginTop: 16}]}
        >
          <View style={styles.loanCardContainer}>
            <View style={styles.loanCard}>
              <Text style={styles.loanLabel}>Available Credit Limit</Text>
              <Text style={styles.loanAmount}>₹ 50,000</Text>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={styles.progressFill} />
                </View>
                <Text style={styles.progressText}>Used: ₹ 0 of ₹ 50,000</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>₹ 0</Text>
                  <Text style={styles.statLabel}>Pending</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>₹ 0</Text>
                  <Text style={styles.statLabel}>Paid</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>₹ 0</Text>
                  <Text style={styles.statLabel}>Due</Text>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>

        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, {marginTop: 24}]}
        >
          <View style={styles.quickActionsContainer}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
                <View style={styles.actionIconContainer}>
                  <Text style={styles.actionIcon}>💳</Text>
                </View>
                <Text style={styles.actionLabel}>Apply Loan</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
                <View style={styles.actionIconContainer}>
                  <Text style={styles.actionIcon}>📊</Text>
                </View>
                <Text style={styles.actionLabel}>EMI Calculator</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
                <View style={styles.actionIconContainer}>
                  <Text style={styles.actionIcon}>📱</Text>
                </View>
                <Text style={styles.actionLabel}>Track Status</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, {marginTop: 24}]}
        >
          <View style={styles.recentActivityContainer}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <View style={styles.activityItem}>
              <View style={styles.activityIconContainer}>
                <Text style={styles.activityIcon}>✅</Text>
              </View>
              <View style={styles.activityDetails}>
                <Text style={styles.activityTitle}>Loan Application Submitted</Text>
                <Text style={styles.activitySubtitle}>2 days ago • Approved</Text>
              </View>
              <Text style={styles.activityAmount}>+₹ 25,000</Text>
            </View>
            <View style={styles.activityItem}>
              <View style={styles.activityIconContainer}>
                <Text style={styles.activityIcon}>📅</Text>
              </View>
              <View style={styles.activityDetails}>
                <Text style={styles.activityTitle}>EMI Due</Text>
                <Text style={styles.activitySubtitle}>Tomorrow • ₹ 2,500</Text>
              </View>
              <Text style={styles.activityAmount}>-₹ 2,500</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, {marginTop: 32}]}
        >
          <TouchableOpacity style={styles.applyButton} activeOpacity={0.8}>
            <Text style={styles.applyButtonText}>Apply for Loan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => router.replace('/(auth)/login')}>
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
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  profileIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E0E7FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 20,
  },
  loanCardContainer: {
    marginBottom: 24,
  },
  loanCard: {
    backgroundColor: '#2563EB',
    borderRadius: 20,
    padding: 24,
    elevation: 8,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  loanAmount: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  loanLabel: {
    fontSize: 16,
    color: '#E0E7FF',
    marginBottom: 12,
    fontWeight: '500',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: '0%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#E0E7FF',
  },
  quickActionsContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    width: '30%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  actionIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionIcon: {
    fontSize: 24,
    color: '#2563EB',
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  recentActivityContainer: {
    marginBottom: 24,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityIcon: {
    fontSize: 18,
  },
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  activitySubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  applyButton: {
    backgroundColor: '#111827',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  logoutText: {
    fontSize: 16,
    color: '#EF4444',
    fontWeight: '600',
  },
});