import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const loanTypes = [
  { 
    id: 1, 
    name: 'Personal Loan', 
    icon: '💳', 
    description: 'Flexible personal loans for any purpose with quick approval',
    maxAmount: '₹ 5,00,000', 
    interest: '12% p.a.',
    color: '#8B5CF6',
    features: ['No collateral', 'Quick approval', 'Flexible tenure'],
    tenure: '12-60 months',
    processing: '24 hours',
    for: 'Individuals seeking quick funds for personal expenses, medical bills, travel, or other immediate needs',
    benefits: ['Instant approval', 'Minimal documentation', 'Competitive rates']
  },
  { 
    id: 2, 
    name: 'Home Loan', 
    icon: '🏠', 
    description: 'Affordable home loans with attractive rates for your dream home',
    maxAmount: '₹ 1 Cr', 
    interest: '7.5% p.a.',
    color: '#3B82F6',
    features: ['Low interest', 'Long tenure', 'Tax benefits'],
    tenure: '5-30 years',
    processing: '3-5 days',
    for: 'Individuals looking to purchase, construct, or renovate their dream home',
    benefits: ['Tax deductions', 'Long repayment tenure', 'Flexible EMI options']
  },
  { 
    id: 3, 
    name: 'Auto Loan', 
    icon: '🚗', 
    description: 'Quick car loans with easy approval and competitive rates',
    maxAmount: '₹ 50,00,000', 
    interest: '9% p.a.',
    color: '#10B981',
    features: ['90% financing', 'Easy EMIs', 'Fast processing'],
    tenure: '12-84 months',
    processing: '48 hours',
    for: 'Individuals wanting to purchase new or used vehicles',
    benefits: ['Up to 90% financing', 'Quick disbursal', 'Insurance included']
  },
  { 
    id: 4, 
    name: 'Business Loan', 
    icon: '💼', 
    description: 'Funding for your business growth and expansion needs',
    maxAmount: '₹ 50,00,000', 
    interest: '11% p.a.',
    color: '#F59E0B',
    features: ['Minimal documentation', 'Working capital', 'Flexible repayment'],
    tenure: '12-60 months',
    processing: '2-3 days',
    for: 'Small and medium enterprises needing working capital or expansion funds',
    benefits: ['No collateral for small amounts', 'Quick disbursal', 'Flexible repayment']
  },
  { 
    id: 5, 
    name: 'Education Loan', 
    icon: '🎓', 
    description: 'Finance your education dreams with affordable interest rates',
    maxAmount: '₹ 25,00,000', 
    interest: '8% p.a.',
    color: '#06B6D4',
    features: ['Study abroad', 'Moratorium period', 'Parent co-borrower'],
    tenure: '5-15 years',
    processing: '3-4 days',
    for: 'Students pursuing higher education in India or abroad',
    benefits: ['Moratorium period', 'Tax benefits', 'Co-applicant option']
  },
  { 
    id: 6, 
    name: 'Gold Loan', 
    icon: '🥇', 
    description: 'Secure loans against gold with instant approval',
    maxAmount: '₹ 5,00,000', 
    interest: '10% p.a.',
    color: '#EF4444',
    features: ['Instant approval', 'Safe custody', 'Prepayment option'],
    tenure: '3-36 months',
    processing: 'Instant',
    for: 'Individuals with gold jewelry who need quick funds',
    benefits: ['Instant disbursal', 'Low documentation', 'Flexible tenure']
  },
];

export default function Loans() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const modalScale = useRef(new Animated.Value(0.8)).current;

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

  const openLoanModal = (loan) => {
    setSelectedLoan(loan);
    setModalVisible(true);
    Animated.spring(modalScale, {
      toValue: 1,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const closeLoanModal = () => {
    Animated.timing(modalScale, {
      toValue: 0.8,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      setTimeout(() => setSelectedLoan(null), 100);
    });
  };

  const filters = ['All', 'Personal', 'Property', 'Business'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
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
            <View style={styles.headerLeft}>
              <View style={styles.logoContainer}>
                <Image 
                  source={require('../../src/assets/Images/logo.png')}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.brandName}>ElitePaisa</Text>
              <Text style={styles.title}>Explore Loan Options</Text>
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterIcon}>⚙️</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>Choose the loan that fits your needs</Text>
        </Animated.View>

        {/* Stats Cards */}
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 24 }]}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsContainer}>
            <View style={[styles.statCard, { backgroundColor: '#EEF2FF' }]}>
              <Text style={styles.statIcon}>⚡</Text>
              <Text style={styles.statValue}>24hr</Text>
              <Text style={styles.statLabel}>Quick Approval</Text>
            </View>
            
            <View style={[styles.statCard, { backgroundColor: '#FEF3C7' }]}>
              <Text style={styles.statIcon}>💰</Text>
              <Text style={styles.statValue}>7.5%</Text>
              <Text style={styles.statLabel}>Starting Rate</Text>
            </View>
            
            <View style={[styles.statCard, { backgroundColor: '#ECFDF5' }]}>
              <Text style={styles.statIcon}>📊</Text>
              <Text style={styles.statValue}>₹1Cr</Text>
              <Text style={styles.statLabel}>Max Amount</Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: '#FEE2E2' }]}>
              <Text style={styles.statIcon}>🎯</Text>
              <Text style={styles.statValue}>100%</Text>
              <Text style={styles.statLabel}>Digital Process</Text>
            </View>
          </ScrollView>
        </Animated.View>

        {/* Filter Pills */}
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 28 }]}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterPill,
                  activeFilter === filter && styles.filterPillActive
                ]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text style={[
                  styles.filterText,
                  activeFilter === filter && styles.filterTextActive
                ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Popular Loan Banner */}
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 24 }]}
        >
          <View style={styles.popularBanner}>
            <View style={styles.popularContent}>
              <Text style={styles.popularBadge}>🔥 Most Popular</Text>
              <Text style={styles.popularTitle}>Personal Loan</Text>
              <Text style={styles.popularDesc}>Get instant approval up to ₹5 Lakhs</Text>
              <View style={styles.popularStats}>
                <View style={styles.popularStatItem}>
                  <Text style={styles.popularStatValue}>12%</Text>
                  <Text style={styles.popularStatLabel}>Interest</Text>
                </View>
                <View style={styles.popularStatDivider} />
                <View style={styles.popularStatItem}>
                  <Text style={styles.popularStatValue}>24hrs</Text>
                  <Text style={styles.popularStatLabel}>Approval</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.popularButton}
              onPress={() => openLoanModal(loanTypes[0])}
            >
              <Text style={styles.popularButtonText}>Apply Now →</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Loan Types Grid */}
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 32 }]}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>All Loan Products</Text>
            <Text style={styles.loanCount}>{loanTypes.length} Options</Text>
          </View>

          <View style={styles.loansGrid}>
            {loanTypes.map((loan, index) => (
              <TouchableOpacity
                key={loan.id}
                style={styles.loanCard}
                onPress={() => openLoanModal(loan)}
                activeOpacity={0.7}
              >
                <View style={styles.loanCardHeader}>
                  <View style={[styles.loanIconContainer, { backgroundColor: `${loan.color}15` }]}>
                    <Text style={styles.loanIcon}>{loan.icon}</Text>
                  </View>
                  {index === 0 && (
                    <View style={styles.trendingBadge}>
                      <Text style={styles.trendingText}>🔥</Text>
                    </View>
                  )}
                </View>
                
                <Text style={styles.loanName}>{loan.name}</Text>
                <Text style={styles.loanDescription} numberOfLines={2}>{loan.description}</Text>
                
                <View style={styles.loanFooter}>
                  <View style={styles.loanDetail}>
                    <Text style={styles.loanDetailLabel}>Max Amount</Text>
                    <Text style={[styles.loanDetailValue, { color: loan.color }]}>{loan.maxAmount}</Text>
                  </View>
                  <View style={styles.loanDetailDivider} />
                  <View style={styles.loanDetail}>
                    <Text style={styles.loanDetailLabel}>Interest</Text>
                    <Text style={styles.loanDetailValue}>{loan.interest}</Text>
                  </View>
                </View>

                <TouchableOpacity style={[styles.loanButton, { backgroundColor: `${loan.color}10`, borderColor: loan.color }]}>
                  <Text style={[styles.loanButtonText, { color: loan.color }]}>View Details</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Help Section */}
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: 32, marginBottom: 100 }]}
        >
          <View style={styles.helpSection}>
            <Text style={styles.helpIcon}>💬</Text>
            <Text style={styles.helpTitle}>Need Help Choosing?</Text>
            <Text style={styles.helpDesc}>Our loan experts are here to guide you</Text>
            <TouchableOpacity style={styles.helpButton}>
              <Text style={styles.helpButtonText}>Talk to Expert</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Enhanced Loan Detail Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeLoanModal}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.modalBackdrop} 
            activeOpacity={1} 
            onPress={closeLoanModal}
          />
          
          <Animated.View 
            style={[
              styles.modalContent,
              {
                transform: [{ scale: modalScale }]
              }
            ]}
          >
            {selectedLoan && (
              <>
                <TouchableOpacity style={styles.closeButton} onPress={closeLoanModal}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>

                {/* Modal Header */}
                <View style={[styles.modalHeader, { backgroundColor: `${selectedLoan.color}10` }]}>
                  <View style={[styles.modalIconContainer, { backgroundColor: `${selectedLoan.color}20` }]}>
                    <Text style={styles.modalIcon}>{selectedLoan.icon}</Text>
                  </View>
                  <Text style={styles.modalTitle}>{selectedLoan.name}</Text>
                  <Text style={styles.modalDescription}>{selectedLoan.description}</Text>
                </View>
                
                <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                  {/* Key Features */}
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Key Features</Text>
                    <View style={styles.featuresList}>
                      {selectedLoan.features.map((feature, index) => (
                        <View key={index} style={styles.featureItem}>
                          <View style={[styles.featureDot, { backgroundColor: selectedLoan.color }]} />
                          <Text style={styles.featureText}>{feature}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* Loan Details */}
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Loan Details</Text>
                    
                    <View style={styles.detailCard}>
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Maximum Amount</Text>
                        <Text style={[styles.detailValue, { color: selectedLoan.color }]}>{selectedLoan.maxAmount}</Text>
                      </View>
                      
                      <View style={styles.detailDivider} />
                      
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Interest Rate</Text>
                        <Text style={styles.detailValue}>{selectedLoan.interest}</Text>
                      </View>
                      
                      <View style={styles.detailDivider} />
                      
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Processing Time</Text>
                        <Text style={styles.detailValue}>{selectedLoan.processing}</Text>
                      </View>
                      
                      <View style={styles.detailDivider} />
                      
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Loan Tenure</Text>
                        <Text style={styles.detailValue}>{selectedLoan.tenure}</Text>
                      </View>
                    </View>
                  </View>

                  {/* Who It&apos;s For */}
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Who It&apos;s For</Text>
                    <Text style={styles.modalDescription}>{selectedLoan.for}</Text>
                  </View>
                  
                  {/* Key Benefits */}
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Key Benefits</Text>
                    <View style={styles.featuresList}>
                      {selectedLoan.benefits.map((benefit, index) => (
                        <View key={index} style={styles.featureItem}>
                          <View style={[styles.featureDot, { backgroundColor: selectedLoan.color }]} />
                          <Text style={styles.featureText}>{benefit}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                  
                  {/* Required Documents */}
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Required Documents</Text>
                    <View style={styles.documentsList}>
                      <View style={styles.documentItem}>
                        <Text style={styles.documentIcon}>📄</Text>
                        <Text style={styles.documentText}>PAN Card</Text>
                      </View>
                      <View style={styles.documentItem}>
                        <Text style={styles.documentIcon}>🆔</Text>
                        <Text style={styles.documentText}>Aadhaar Card</Text>
                      </View>
                      <View style={styles.documentItem}>
                        <Text style={styles.documentIcon}>💰</Text>
                        <Text style={styles.documentText}>Income Proof</Text>
                      </View>
                      <View style={styles.documentItem}>
                        <Text style={styles.documentIcon}>🏦</Text>
                        <Text style={styles.documentText}>Bank Statement</Text>
                      </View>
                    </View>
                  </View>
                  
                  {/* Disclaimer */}
                  <View style={styles.disclaimerSection}>
                    <Text style={styles.disclaimerText}>* Actual terms and conditions may vary based on your credit profile and final verification</Text>
                  </View>
                </ScrollView>
                
                {/* Action Buttons */}
                <View style={styles.modalFooter}>
                  <TouchableOpacity 
                    style={styles.calculateButton}
                    onPress={() => {
                      closeLoanModal();
                      router.push('/(tabs)/calculator');
                    }}
                  >
                    <Text style={styles.calculateButtonText}>Calculate EMI</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.applyButton, { backgroundColor: selectedLoan.color }]}
                    onPress={() => {
                      alert(`Application for ${selectedLoan.name} submitted successfully!`);
                      closeLoanModal();
                    }}
                  >
                    <Text style={styles.applyButtonText}>Apply Now →</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 8,
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
    fontSize: 24,
    fontWeight: '900',
    color: '#2563EB',
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#111827',
    marginTop: 4,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginTop: 12,
    fontWeight: '500',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  filterIcon: {
    fontSize: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  statCard: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginRight: 12,
    minWidth: 120,
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
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  filtersContainer: {
    flexDirection: 'row',
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  filterPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterPillActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  popularBanner: {
    backgroundColor: '#2563EB',
    borderRadius: 20,
    padding: 24,
    elevation: 4,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  popularContent: {
    marginBottom: 20,
  },
  popularBadge: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FEF3C7',
    marginBottom: 8,
  },
  popularTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  popularDesc: {
    fontSize: 15,
    color: '#BFDBFE',
    marginBottom: 16,
    fontWeight: '500',
  },
  popularStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularStatItem: {
    flex: 1,
  },
  popularStatValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  popularStatLabel: {
    fontSize: 13,
    color: '#BFDBFE',
    fontWeight: '600',
  },
  popularStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 16,
  },
  popularButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  popularButtonText: {
    color: '#2563EB',
    fontSize: 16,
    fontWeight: '800',
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
  loanCount: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  loansGrid: {
    gap: 16,
  },
  loanCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  loanCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  loanIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loanIcon: {
    fontSize: 32,
  },
  trendingBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  trendingText: {
    fontSize: 16,
  },
  loanName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  loanDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
    fontWeight: '500',
  },
  loanFooter: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  loanDetail: {
    flex: 1,
  },
  loanDetailLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: '600',
  },
  loanDetailValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },
  loanDetailDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  loanButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1.5,
  },
  loanButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
  helpSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  helpIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  helpTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  helpDesc: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 20,
    fontWeight: '500',
  },
  helpButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  helpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    maxHeight: '90%',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6B7280',
  },
  modalHeader: {
    padding: 24,
    paddingTop: 32,
    alignItems: 'center',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  modalIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalIcon: {
    fontSize: 40,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
    textAlign: 'center',
    fontWeight: '500',
  },
  modalBody: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  modalSection: {
    marginBottom: 28,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 16,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  featureText: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '600',
  },
  detailCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '800',
  },
  detailDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  documentsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  documentIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  documentText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 24,
    paddingTop: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  calculateButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calculateButtonText: {
    color: '#374151',
    fontSize: 15,
    fontWeight: '700',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  disclaimerSection: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    marginTop: 8,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '400',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
  },
});