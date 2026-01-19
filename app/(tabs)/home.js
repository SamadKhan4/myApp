import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Dimensions, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { dashboardData } from '../../src/constants/loanData';

const { width } = Dimensions.get('window');

export default function Home() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E40AF" />
      
      {/* Gradient Header Background */}
      <View style={styles.headerBackground}>
        <View style={styles.headerGradient} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }]}
        >
          <View style={styles.headerContainer}>
            <View style={styles.headerLeft}>
              <Text style={styles.brandName}>ElitePaisa</Text>
              <Text style={styles.brandTagline}>Smart Lending Solutions</Text>
            </View>
            <TouchableOpacity style={styles.profileIconContainer}>
              <Text style={styles.profileIcon}>👤</Text>
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>Good Morning, User 👋</Text>
            <Text style={styles.subGreeting}>Here&apos;s a snapshot of your loan options</Text>
          </View>
        </Animated.View>

        {/* Main Credit Card */}
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }, { marginTop: 24 }]}
        >
          <View style={styles.loanCardContainer}>
            <View style={styles.loanCard}>
              <View style={styles.cardPattern}>
                <View style={styles.patternCircle1} />
                <View style={styles.patternCircle2} />
              </View>
              
              <View style={styles.cardHeader}>
                <Text style={styles.loanLabel}>Available Credit Limit</Text>
                <View style={styles.creditBadge}>
                  <Text style={styles.creditBadgeText}>Pre-Approved</Text>
                </View>
              </View>
              
              <Text style={styles.loanAmount}>₹ {dashboardData.totalCredit}</Text>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '35%' }]} />
                </View>
                <View style={styles.progressLabels}>
                  <Text style={styles.progressText}>Used: ₹ {dashboardData.utilizedCredit}</Text>
                  <Text style={styles.progressText}>Available: ₹ {Number(dashboardData.totalCredit.replace(/,/g, '')) - Number(dashboardData.utilizedCredit.replace(/,/g, ''))}</Text>
                </View>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>₹ {dashboardData.pendingEMI}</Text>
                  <Text style={styles.statLabel}>Pending EMI</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>₹ {dashboardData.paidEMI}</Text>
                  <Text style={styles.statLabel}>Paid Total</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>₹ {dashboardData.dueEMI}</Text>
                  <Text style={styles.statLabel}>Next Due</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.viewDetailsButton}>
                <Text style={styles.viewDetailsText}>View Full Details →</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Loan Eligibility Preview */}
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 20 }]}
        >
          <View style={styles.eligibilityCard}>
            <View style={styles.eligibilityHeader}>
              <Text style={styles.eligibilityTitle}>Your Eligibility</Text>
              <Text style={styles.eligibilityScore}>780</Text>
            </View>
            <Text style={styles.eligibilityMessage}>You are eligible for loans up to ₹50,000</Text>
            <View style={styles.eligibilityBarContainer}>
              <View style={styles.eligibilityBar}>
                <View style={[styles.eligibilityFill, { width: '78%' }]} />
              </View>
              <View style={styles.eligibilityLabels}>
                <Text style={styles.eligibilityLabel}>Low</Text>
                <Text style={styles.eligibilityLabel}>High</Text>
              </View>
            </View>
          </View>
        </Animated.View>
        
        {/* Loan Offers Banner */}
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 20 }]}
        >
          <View style={styles.offerBanner}>
            <View style={styles.offerContent}>
              <Text style={styles.offerBadge}>🎉 Special Offer</Text>
              <Text style={styles.offerTitle}>Get up to 2% off on interest rates</Text>
              <Text style={styles.offerSubtitle}>Limited time offer for pre-approved customers</Text>
            </View>
            <TouchableOpacity style={styles.offerButton}>
              <Text style={styles.offerButtonText}>Claim Now</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 28 }]}
        >
          <View style={styles.quickActionsContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All →</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.actionsRow}>
              {dashboardData.quickActions.map((action, index) => (
                <TouchableOpacity 
                  key={action.id} 
                  style={styles.actionCard}
                  activeOpacity={0.7}
                  onPress={() => {
                    if (action.name === 'Apply Loan') {
                      router.push('/(tabs)/loans');
                    } else if (action.name === 'EMI Calculator') {
                      router.push('/(tabs)/calculator');
                    }
                  }}
                >
                  <View style={[styles.actionIconContainer, { backgroundColor: `${action.color}15` }]}>  
                    <Text style={[styles.actionIcon, { color: action.color }]}>{action.icon}</Text>
                  </View>
                  <Text style={styles.actionLabel}>{action.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Animated.View>

        {/* Loan Types */}
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 28 }]}
        >
          <View style={styles.loanTypesContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Popular Loan Types</Text>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.loanTypesScroll}>
              <TouchableOpacity style={[styles.loanTypeCard, { backgroundColor: '#EEF2FF' }]}>
                <View style={styles.loanTypeIcon}>
                  <Text style={styles.loanTypeEmoji}>🏠</Text>
                </View>
                <Text style={styles.loanTypeName}>Home Loan</Text>
                <Text style={styles.loanTypeRate}>From 8.5% p.a.</Text>
                <Text style={styles.loanTypeAmount}>Up to ₹50L</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.loanTypeCard, { backgroundColor: '#FEF3C7' }]}>
                <View style={styles.loanTypeIcon}>
                  <Text style={styles.loanTypeEmoji}>💼</Text>
                </View>
                <Text style={styles.loanTypeName}>Business Loan</Text>
                <Text style={styles.loanTypeRate}>From 11.5% p.a.</Text>
                <Text style={styles.loanTypeAmount}>Up to ₹25L</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.loanTypeCard, { backgroundColor: '#ECFDF5' }]}>
                <View style={styles.loanTypeIcon}>
                  <Text style={styles.loanTypeEmoji}>👤</Text>
                </View>
                <Text style={styles.loanTypeName}>Personal Loan</Text>
                <Text style={styles.loanTypeRate}>From 10.5% p.a.</Text>
                <Text style={styles.loanTypeAmount}>Up to ₹15L</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.loanTypeCard, { backgroundColor: '#FEE2E2' }]}>
                <View style={styles.loanTypeIcon}>
                  <Text style={styles.loanTypeEmoji}>🎓</Text>
                </View>
                <Text style={styles.loanTypeName}>Education Loan</Text>
                <Text style={styles.loanTypeRate}>From 9.5% p.a.</Text>
                <Text style={styles.loanTypeAmount}>Up to ₹20L</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Animated.View>

        {/* Recent Activity */}
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 28 }]}
        >
          <View style={styles.recentActivityContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>View All →</Text>
              </TouchableOpacity>
            </View>
            
            {dashboardData.recentActivities.map((activity, index) => (
              <TouchableOpacity key={activity.id} style={styles.activityItem}>
                <View style={[styles.activityIconContainer, { backgroundColor: index % 2 === 0 ? '#EEF2FF' : '#FEF3C7' }]}>
                  <Text style={styles.activityIcon}>{activity.icon}</Text>
                </View>
                <View style={styles.activityDetails}>
                  <Text style={styles.activityTitle}>{activity.type}</Text>
                  <Text style={styles.activitySubtitle}>{activity.date} • {activity.status}</Text>
                </View>
                <View style={styles.activityRight}>
                  <Text style={styles.activityAmount}>{activity.amount}</Text>
                  <Text style={styles.activityArrow}>→</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Benefits Section */}
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 28 }]}
        >
          <View style={styles.benefitsContainer}>
            <Text style={styles.sectionTitle}>Why Choose ElitePaisa?</Text>
            <View style={styles.benefitsList}>
              <View style={styles.benefitItem}>
                <Text style={styles.benefitIcon}>⚡</Text>
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>Instant Approval</Text>
                  <Text style={styles.benefitDesc}>Get approved in minutes</Text>
                </View>
              </View>
              
              <View style={styles.benefitItem}>
                <Text style={styles.benefitIcon}>🔒</Text>
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>Secure & Safe</Text>
                  <Text style={styles.benefitDesc}>Bank-level security</Text>
                </View>
              </View>
              
              <View style={styles.benefitItem}>
                <Text style={styles.benefitIcon}>💰</Text>
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>Low Interest Rates</Text>
                  <Text style={styles.benefitDesc}>Starting from 8.5% p.a.</Text>
                </View>
              </View>
              
              <View style={styles.benefitItem}>
                <Text style={styles.benefitIcon}>📱</Text>
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>100% Digital</Text>
                  <Text style={styles.benefitDesc}>Paperless process</Text>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Tips & Insights */}
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 28 }]}
        >
          <View style={styles.tipsContainer}>
            <Text style={styles.sectionTitle}>Tips & Insights</Text>
            <View style={styles.tipsList}>
              <View style={styles.tipCard}>
                <Text style={styles.tipIcon}>💡</Text>
                <Text style={styles.tipText}>Borrow responsibly and only what you can repay</Text>
              </View>
              <View style={styles.tipCard}>
                <Text style={styles.tipIcon}>📊</Text>
                <Text style={styles.tipText}>Choose EMI wisely based on your income</Text>
              </View>
              <View style={styles.tipCard}>
                <Text style={styles.tipIcon}>⏰</Text>
                <Text style={styles.tipText}>Avoid late payments to maintain good credit score</Text>
              </View>
            </View>
          </View>
        </Animated.View>
        
        {/* CTA Buttons */}
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 32, marginBottom: 100 }]}
        >
          <TouchableOpacity 
            style={styles.applyButton} 
            activeOpacity={0.8}
            onPress={() => router.push('/(tabs)/loans')}
          >
            <Text style={styles.applyButtonText}>Apply for New Loan</Text>
            <Text style={styles.applyButtonIcon}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Check Eligibility</Text>
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
    height: 280,
    backgroundColor: '#1E40AF',
    overflow: 'hidden',
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 280,
    backgroundColor: '#2563EB',
    opacity: 0.8,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  brandName: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  brandTagline: {
    fontSize: 13,
    color: '#BFDBFE',
    marginTop: 2,
    fontWeight: '500',
  },
  profileIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  profileIcon: {
    fontSize: 22,
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#EF4444',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1E40AF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  greetingContainer: {
    marginTop: 8,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '500',
    color: '#BFDBFE',
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  eligibilityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  eligibilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  eligibilityTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6B7280',
  },
  eligibilityScore: {
    fontSize: 24,
    fontWeight: '900',
    color: '#10B981',
  },
  eligibilityMessage: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '600',
    marginBottom: 12,
  },
  eligibilityBarContainer: {
    marginTop: 12,
  },
  eligibilityBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  eligibilityFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  eligibilityLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eligibilityLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  userName: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  loanCardContainer: {
    marginBottom: 0,
  },
  loanCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  cardPattern: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
  patternCircle1: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#EEF2FF',
  },
  patternCircle2: {
    position: 'absolute',
    bottom: -60,
    left: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#DBEAFE',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  loanLabel: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '600',
  },
  creditBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  creditBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  loanAmount: {
    fontSize: 42,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 16,
    letterSpacing: -1,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  viewDetailsButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  viewDetailsText: {
    color: '#2563EB',
    fontSize: 15,
    fontWeight: '700',
  },
  offerBanner: {
    backgroundColor: '#FEF3C7',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  offerContent: {
    marginBottom: 12,
  },
  offerBadge: {
    fontSize: 13,
    fontWeight: '700',
    color: '#B45309',
    marginBottom: 6,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#78350F',
    marginBottom: 4,
  },
  offerSubtitle: {
    fontSize: 13,
    color: '#92400E',
    fontWeight: '500',
  },
  offerButton: {
    backgroundColor: '#F59E0B',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  offerButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  quickActionsContainer: {
    marginBottom: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },
  seeAllText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '700',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 24,
    alignItems: 'center',
    width: '31%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  actionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionIcon: {
    fontSize: 26,
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  loanTypesContainer: {
    marginBottom: 0,
  },
  loanTypesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  loanTypeCard: {
    width: 160,
    padding: 20,
    borderRadius: 20,
    marginRight: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  loanTypeIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  loanTypeEmoji: {
    fontSize: 24,
  },
  loanTypeName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 6,
  },
  loanTypeRate: {
    fontSize: 13,
    fontWeight: '600',
    color: '#059669',
    marginBottom: 4,
  },
  loanTypeAmount: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  recentActivityContainer: {
    marginBottom: 0,
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
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  activityIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  activityIcon: {
    fontSize: 22,
  },
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  activitySubtitle: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  activityRight: {
    alignItems: 'flex-end',
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 2,
  },
  activityArrow: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '700',
  },
  benefitsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  benefitsList: {
    marginTop: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  benefitIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  benefitDesc: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  tipsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tipsList: {
    gap: 12,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 16,
  },
  tipIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
    flex: 1,
  },
  applyButton: {
    backgroundColor: '#2563EB',
    height: 60,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    elevation: 4,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    marginRight: 8,
  },
  applyButtonIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#2563EB',
  },
  secondaryButtonText: {
    color: '#2563EB',
    fontSize: 17,
    fontWeight: '800',
  },
});