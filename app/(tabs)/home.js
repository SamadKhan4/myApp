import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { dashboardData } from '../../src/constants/loanData';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Responsive scaling functions
const scaleSize = (size) => {
  // Base size for iPhone 14 Pro (393 x 852)
  const baseWidth = 393;
  const scale = SCREEN_WIDTH / baseWidth;
  return Math.round(size * scale);
};

const scaleVertical = (size) => {
  const baseHeight = 852;
  const scale = SCREEN_HEIGHT / baseHeight;
  return Math.round(size * scale);
};

const moderateScale = (size, factor = 0.5) => {
  return size + (scaleSize(size) - size) * factor;
};

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
              <View style={styles.logoContainer}>
                <Image 
                  source={require('../../src/assets/Images/logo.png')}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>
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
          }, { marginTop: scaleVertical(24) }]}
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
          }, { marginTop: scaleVertical(20) }]}
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
          }, { marginTop: scaleVertical(20) }]}
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
          }, { marginTop: scaleVertical(28) }]}
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
                  style={[styles.actionCard, { width: `${100 / dashboardData.quickActions.length - 4}%` }]}
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
          }, { marginTop: scaleVertical(28) }]}
        >
          <View style={styles.loanTypesContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Popular Loan Types</Text>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.loanTypesScroll}>
              <TouchableOpacity style={[styles.loanTypeCard, { backgroundColor: '#EEF2FF', width: SCREEN_WIDTH > 400 ? scaleSize(160) : scaleSize(140) }]}>
                <View style={styles.loanTypeIcon}>
                  <Text style={styles.loanTypeEmoji}>🏠</Text>
                </View>
                <Text style={styles.loanTypeName}>Home Loan</Text>
                <Text style={styles.loanTypeRate}>From 8.5% p.a.</Text>
                <Text style={styles.loanTypeAmount}>Up to ₹50L</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.loanTypeCard, { backgroundColor: '#FEF3C7', width: SCREEN_WIDTH > 400 ? scaleSize(160) : scaleSize(140) }]}>
                <View style={styles.loanTypeIcon}>
                  <Text style={styles.loanTypeEmoji}>💼</Text>
                </View>
                <Text style={styles.loanTypeName}>Business Loan</Text>
                <Text style={styles.loanTypeRate}>From 11.5% p.a.</Text>
                <Text style={styles.loanTypeAmount}>Up to ₹25L</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.loanTypeCard, { backgroundColor: '#ECFDF5', width: SCREEN_WIDTH > 400 ? scaleSize(160) : scaleSize(140) }]}>
                <View style={styles.loanTypeIcon}>
                  <Text style={styles.loanTypeEmoji}>👤</Text>
                </View>
                <Text style={styles.loanTypeName}>Personal Loan</Text>
                <Text style={styles.loanTypeRate}>From 10.5% p.a.</Text>
                <Text style={styles.loanTypeAmount}>Up to ₹15L</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.loanTypeCard, { backgroundColor: '#FEE2E2', width: SCREEN_WIDTH > 400 ? scaleSize(160) : scaleSize(140) }]}>
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
          }, { marginTop: scaleVertical(28) }]}
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
          }, { marginTop: scaleVertical(28) }]}
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
          }, { marginTop: scaleVertical(28) }]}
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
          }, { marginTop: scaleVertical(32), marginBottom: scaleVertical(100) }]}
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
    height: Math.min(scaleVertical(280), SCREEN_HEIGHT * 0.4),
    backgroundColor: '#1E40AF',
    overflow: 'hidden',
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Math.min(scaleVertical(280), SCREEN_HEIGHT * 0.4),
    backgroundColor: '#2563EB',
    opacity: 0.8,
  },
  scrollContent: {
    paddingHorizontal: scaleSize(20),
    paddingTop: scaleVertical(20),
    paddingBottom: scaleVertical(40),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: scaleVertical(20),
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
    fontSize: moderateScale(28),
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  brandTagline: {
    fontSize: moderateScale(13),
    color: '#BFDBFE',
    marginTop: scaleVertical(2),
    fontWeight: '500',
  },
  profileIconContainer: {
    width: scaleSize(48),
    height: scaleSize(48),
    borderRadius: scaleSize(24),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  profileIcon: {
    fontSize: scaleSize(22),
  },
  notificationBadge: {
    position: 'absolute',
    top: -scaleSize(2),
    right: -scaleSize(2),
    backgroundColor: '#EF4444',
    width: scaleSize(20),
    height: scaleSize(20),
    borderRadius: scaleSize(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: scaleSize(2),
    borderColor: '#1E40AF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: moderateScale(11),
    fontWeight: '700',
  },
  greetingContainer: {
    marginTop: scaleVertical(8),
  },
  greeting: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: '#BFDBFE',
    marginBottom: scaleVertical(4),
  },
  subGreeting: {
    fontSize: moderateScale(24),
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  eligibilityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: scaleSize(20),
    padding: scaleSize(20),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scaleSize(2) },
    shadowOpacity: 0.08,
    shadowRadius: scaleSize(8),
  },
  eligibilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaleVertical(12),
  },
  eligibilityTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#6B7280',
  },
  eligibilityScore: {
    fontSize: moderateScale(24),
    fontWeight: '900',
    color: '#10B981',
  },
  eligibilityMessage: {
    fontSize: moderateScale(15),
    color: '#111827',
    fontWeight: '600',
    marginBottom: scaleVertical(12),
  },
  eligibilityBarContainer: {
    marginTop: scaleVertical(12),
  },
  eligibilityBar: {
    height: scaleSize(8),
    backgroundColor: '#E5E7EB',
    borderRadius: scaleSize(4),
    overflow: 'hidden',
    marginBottom: scaleVertical(8),
  },
  eligibilityFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: scaleSize(4),
  },
  eligibilityLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eligibilityLabel: {
    fontSize: moderateScale(12),
    color: '#6B7280',
    fontWeight: '500',
  },
  userName: {
    fontSize: moderateScale(32),
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  loanCardContainer: {
    marginBottom: 0,
  },
  loanCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: scaleSize(24),
    padding: SCREEN_WIDTH < 380 ? scaleSize(16) : scaleSize(24),
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scaleSize(4) },
    shadowOpacity: 0.1,
    shadowRadius: scaleSize(12),
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
    top: -scaleSize(40),
    right: -scaleSize(40),
    width: scaleSize(150),
    height: scaleSize(150),
    borderRadius: scaleSize(75),
    backgroundColor: '#EEF2FF',
  },
  patternCircle2: {
    position: 'absolute',
    bottom: -scaleSize(60),
    left: -scaleSize(30),
    width: scaleSize(120),
    height: scaleSize(120),
    borderRadius: scaleSize(60),
    backgroundColor: '#DBEAFE',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaleVertical(8),
  },
  loanLabel: {
    fontSize: moderateScale(15),
    color: '#6B7280',
    fontWeight: '600',
  },
  creditBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: scaleSize(10),
    paddingVertical: scaleSize(4),
    borderRadius: scaleSize(12),
  },
  creditBadgeText: {
    color: '#FFFFFF',
    fontSize: moderateScale(11),
    fontWeight: '700',
  },
  loanAmount: {
    fontSize: SCREEN_WIDTH < 380 ? moderateScale(36) : moderateScale(42),
    fontWeight: '900',
    color: '#111827',
    marginBottom: scaleVertical(16),
    letterSpacing: -0.5,
  },
  progressContainer: {
    marginBottom: scaleVertical(20),
  },
  progressBar: {
    height: scaleSize(8),
    backgroundColor: '#E5E7EB',
    borderRadius: scaleSize(4),
    overflow: 'hidden',
    marginBottom: scaleVertical(8),
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: scaleSize(4),
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    fontSize: moderateScale(13),
    color: '#6B7280',
    fontWeight: '600',
  },
  divider: {
    height: scaleSize(1),
    backgroundColor: '#E5E7EB',
    marginVertical: scaleVertical(20),
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
    width: scaleSize(1),
    height: scaleSize(40),
    backgroundColor: '#E5E7EB',
  },
  statValue: {
    fontSize: moderateScale(20),
    fontWeight: '800',
    color: '#111827',
    marginBottom: scaleVertical(4),
  },
  statLabel: {
    fontSize: moderateScale(12),
    color: '#6B7280',
    fontWeight: '600',
  },
  viewDetailsButton: {
    marginTop: scaleVertical(16),
    alignItems: 'center',
  },
  viewDetailsText: {
    color: '#2563EB',
    fontSize: moderateScale(15),
    fontWeight: '700',
  },
  offerBanner: {
    backgroundColor: '#FEF3C7',
    borderRadius: scaleSize(16),
    padding: scaleSize(20),
    borderLeftWidth: scaleSize(4),
    borderLeftColor: '#F59E0B',
  },
  offerContent: {
    marginBottom: scaleVertical(12),
  },
  offerBadge: {
    fontSize: moderateScale(13),
    fontWeight: '700',
    color: '#B45309',
    marginBottom: scaleVertical(6),
  },
  offerTitle: {
    fontSize: moderateScale(18),
    fontWeight: '800',
    color: '#78350F',
    marginBottom: scaleVertical(4),
  },
  offerSubtitle: {
    fontSize: moderateScale(13),
    color: '#92400E',
    fontWeight: '500',
  },
  offerButton: {
    backgroundColor: '#F59E0B',
    paddingVertical: scaleSize(12),
    borderRadius: scaleSize(12),
    alignItems: 'center',
  },
  offerButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(15),
    fontWeight: '700',
  },
  quickActionsContainer: {
    marginBottom: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaleVertical(16),
  },
  sectionTitle: {
    fontSize: moderateScale(22),
    fontWeight: '800',
    color: '#111827',
  },
  seeAllText: {
    fontSize: moderateScale(14),
    color: '#2563EB',
    fontWeight: '700',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: scaleSize(20),
    paddingVertical: scaleVertical(24),
    alignItems: 'center',
    width: '31%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scaleSize(2) },
    shadowOpacity: 0.08,
    shadowRadius: scaleSize(8),
  },
  actionIconContainer: {
    width: scaleSize(56),
    height: scaleSize(56),
    borderRadius: scaleSize(28),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaleVertical(12),
  },
  actionIcon: {
    fontSize: scaleSize(26),
  },
  actionLabel: {
    fontSize: moderateScale(13),
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  loanTypesContainer: {
    marginBottom: 0,
  },
  loanTypesScroll: {
    marginHorizontal: -scaleSize(20),
    paddingHorizontal: scaleSize(20),
  },
  loanTypeCard: {
    width: scaleSize(160),
    padding: scaleSize(20),
    borderRadius: scaleSize(20),
    marginRight: scaleSize(16),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scaleSize(2) },
    shadowOpacity: 0.05,
    shadowRadius: scaleSize(4),
  },
  loanTypeIcon: {
    width: scaleSize(52),
    height: scaleSize(52),
    borderRadius: scaleSize(26),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaleVertical(12),
  },
  loanTypeEmoji: {
    fontSize: scaleSize(24),
  },
  loanTypeName: {
    fontSize: moderateScale(16),
    fontWeight: '800',
    color: '#111827',
    marginBottom: scaleVertical(6),
  },
  loanTypeRate: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: '#059669',
    marginBottom: scaleVertical(4),
  },
  loanTypeAmount: {
    fontSize: moderateScale(12),
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
    padding: SCREEN_WIDTH < 380 ? scaleSize(12) : scaleSize(16),
    borderRadius: scaleSize(16),
    marginBottom: scaleVertical(12),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scaleSize(1) },
    shadowOpacity: 0.05,
    shadowRadius: scaleSize(3),
  },
  activityIconContainer: {
    width: scaleSize(48),
    height: scaleSize(48),
    borderRadius: scaleSize(24),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleSize(14),
  },
  activityIcon: {
    fontSize: scaleSize(22),
  },
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#111827',
    marginBottom: scaleVertical(4),
  },
  activitySubtitle: {
    fontSize: moderateScale(13),
    color: '#6B7280',
    fontWeight: '500',
  },
  activityRight: {
    alignItems: 'flex-end',
  },
  activityAmount: {
    fontSize: moderateScale(16),
    fontWeight: '800',
    color: '#111827',
    marginBottom: scaleVertical(2),
  },
  activityArrow: {
    fontSize: scaleSize(16),
    color: '#2563EB',
    fontWeight: '700',
  },
  benefitsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: scaleSize(20),
    padding: scaleSize(20),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scaleSize(2) },
    shadowOpacity: 0.05,
    shadowRadius: scaleSize(4),
  },
  benefitsList: {
    marginTop: scaleVertical(16),
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleVertical(20),
  },
  benefitIcon: {
    fontSize: scaleSize(32),
    marginRight: scaleSize(16),
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#111827',
    marginBottom: scaleVertical(2),
  },
  benefitDesc: {
    fontSize: moderateScale(14),
    color: '#6B7280',
    fontWeight: '500',
  },
  tipsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: scaleSize(20),
    padding: scaleSize(20),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scaleSize(2) },
    shadowOpacity: 0.05,
    shadowRadius: scaleSize(4),
  },
  tipsList: {
    gap: scaleSize(12),
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: SCREEN_WIDTH < 380 ? scaleSize(12) : scaleSize(16),
    borderRadius: scaleSize(16),
  },
  tipIcon: {
    fontSize: scaleSize(24),
    marginRight: scaleSize(12),
  },
  tipText: {
    fontSize: moderateScale(14),
    color: '#374151',
    fontWeight: '600',
    flex: 1,
  },
  applyButton: {
    backgroundColor: '#2563EB',
    height: SCREEN_WIDTH < 380 ? scaleVertical(50) : scaleVertical(60),
    borderRadius: scaleSize(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scaleVertical(12),
    elevation: 4,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: scaleSize(4) },
    shadowOpacity: 0.3,
    shadowRadius: scaleSize(8),
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(17),
    fontWeight: '800',
    marginRight: scaleSize(8),
  },
  applyButtonIcon: {
    color: '#FFFFFF',
    fontSize: scaleSize(20),
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    height: SCREEN_WIDTH < 380 ? scaleVertical(50) : scaleVertical(60),
    borderRadius: scaleSize(16),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: scaleSize(2),
    borderColor: '#2563EB',
  },
  secondaryButtonText: {
    color: '#2563EB',
    fontSize: moderateScale(17),
    fontWeight: '800',
  },
});