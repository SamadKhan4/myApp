import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Image, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ApiService from '../../src/services/ApiService';
import { hp, scale, scaleFont, wp } from '../../src/utils/responsive';

export default function Loans() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loanTypes, setLoanTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const modalScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    fetchLoanTypes();
    
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
  
  const fetchLoanTypes = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getAllLoanTypes();
      console.log('Loan types API response:', response); // Debug log
      
      if (response.success) {
        let loansArray = [];
        
        // Check the structure of the response and extract loans appropriately
        if (Array.isArray(response.data)) {
          // If response.data is directly an array
          loansArray = response.data;
        } else if (response.data && typeof response.data === 'object') {
          // If response.data is an object that contains loans
          if (response.data.loans && Array.isArray(response.data.loans)) {
            loansArray = response.data.loans;
          } else if (response.data.data && Array.isArray(response.data.data)) {
            loansArray = response.data.data;
          } else if (response.data.loanTypes && Array.isArray(response.data.loanTypes)) {
            loansArray = response.data.loanTypes;
          } else if (response.data.loan_products && Array.isArray(response.data.loan_products)) {
            loansArray = response.data.loan_products;
          } else {
            // If it's a single object, wrap it in an array
            loansArray = [response.data];
          }
        }
        
        // Transform API response to match our UI format
        const transformedLoans = loansArray.map((loan, index) => ({
          id: loan._id || loan.id || index,
          name: loan.loanName || loan.name,
          icon: getLoanIconByCategory(loan.loanCategory || loan.category || loan.type),
          description: loan.loanDescription || loan.description || 'Flexible loan options for your financial needs',
          maxAmount: `₹ ${(loan.maxAmount / 100000 || loan.maximumAmount / 100000 || 50).toFixed(0)} Lakh`,
          minAmount: `₹ ${(loan.minAmount / 100000 || loan.minimumAmount / 100000 || 1).toFixed(0)} Lakh`,
          interest: `${loan.interestRate?.min || loan.interestRate || loan.interest || '12'}% p.a.`,
          processingTime: loan.processingTime || loan.processing_time || '24-48 hours',
          tenure: `Up to ${loan.tenure?.maxMonths || loan.tenure || loan.maxTenure || '60'} months`,
          eligibility: loan.eligibilityCriteria || loan.eligibility || 'Valid ID and income proof',
          features: loan.requiredDocuments || loan.requirements || ['No collateral required', 'Quick approval', 'Flexible tenure'],
          color: getLoanColorByCategory(loan.loanCategory || loan.category || loan.type),
          for: loan.purpose || loan.target_audience || 'Individuals seeking quick funds for various purposes',
          benefits: loan.benefits || loan.features || ['Quick approval', 'Minimal documentation', 'Competitive rates']
        }));
        
        setLoanTypes(transformedLoans);
      } else {
        setError(response.message || 'Failed to fetch loan types');
      }
    } catch (err) {
      console.error('Error fetching loan types:', err);
      setError(err.message || 'An error occurred while fetching loan types');
    } finally {
      setLoading(false);
    }
  };
  
  const getLoanIconByCategory = (category) => {
    const icons = {
      personal: '💳',
      home: '🏠',
      vehicle: '🚗',
      business: '💼',
      education: '🎓',
      gold: '🥇',
      default: '💰'
    };
    return icons[category] || icons.default;
  };
  
  const getLoanColorByCategory = (category) => {
    const colors = {
      personal: '#8B5CF6',
      home: '#3B82F6',
      vehicle: '#10B981',
      business: '#F59E0B',
      education: '#06B6D4',
      gold: '#EF4444',
      default: '#6366F1'
    };
    return colors[category] || colors.default;
  };

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
      
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>Loading loan options...</Text>
        </View>
      )}
      
      {!loading && error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchLoanTypes}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {!loading && !error && (
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
          }, { marginTop: hp(3) }]}
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
          }, { marginTop: hp(3.5) }]}
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
          }, { marginTop: hp(3) }]}
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
          }, { marginTop: hp(4) }]}
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
          }, { marginTop: hp(4), marginBottom: hp(12.5) }]}
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
      )}

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
                      // Navigate to loan application form with pre-filled loan details
                      router.push({
                        pathname: '/loan-application',
                        params: { loanTypeId: selectedLoan.id, loanName: selectedLoan.name }
                      });
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(5),
  },
  loadingText: {
    marginTop: hp(2),
    fontSize: scaleFont(16),
    color: '#6B7280',
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(5),
  },
  errorText: {
    fontSize: scaleFont(16),
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: hp(2.5),
    fontWeight: '500',
  },
  retryButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: wp(6),
    paddingVertical: hp(1.5),
    borderRadius: scale(8),
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: scaleFont(16),
    fontWeight: '600',
  },
  scrollContent: {
    padding: wp(5),
    paddingBottom: hp(5),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: hp(1),
  },
  headerLeft: {
    flex: 1,
  },
  logoContainer: {
    marginBottom: hp(1),
  },
  logoImage: {
    width: wp(10),
    height: wp(10),
  },
  brandName: {
    fontSize: scaleFont(24),
    fontWeight: '900',
    color: '#2563EB',
    letterSpacing: -0.5,
  },
  title: {
    fontSize: scaleFont(32),
    fontWeight: '900',
    color: '#111827',
    marginTop: hp(0.5),
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: scaleFont(16),
    color: '#6B7280',
    lineHeight: hp(3),
    marginTop: hp(1.5),
    fontWeight: '500',
  },
  filterButton: {
    width: wp(11),
    height: wp(11),
    borderRadius: scale(22),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp(0.25) },
    shadowOpacity: 0.05,
    shadowRadius: scale(4),
  },
  filterIcon: {
    fontSize: scaleFont(20),
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: -wp(5),
    paddingHorizontal: wp(5),
  },
  statCard: {
    paddingVertical: hp(2.5),
    paddingHorizontal: wp(6),
    borderRadius: scale(16),
    marginRight: wp(3),
    minWidth: wp(30),
    alignItems: 'center',
  },
  statIcon: {
    fontSize: scaleFont(28),
    marginBottom: hp(1),
  },
  statValue: {
    fontSize: scaleFont(24),
    fontWeight: '900',
    color: '#111827',
    marginBottom: hp(0.5),
  },
  statLabel: {
    fontSize: scaleFont(12),
    color: '#6B7280',
    fontWeight: '600',
  },
  filtersContainer: {
    flexDirection: 'row',
    marginHorizontal: -wp(5),
    paddingHorizontal: wp(5),
  },
  filterPill: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(1.25),
    borderRadius: scale(20),
    backgroundColor: '#FFFFFF',
    marginRight: wp(2.5),
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterPillActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  filterText: {
    fontSize: scaleFont(14),
    fontWeight: '600',
    color: '#6B7280',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  popularBanner: {
    backgroundColor: '#2563EB',
    borderRadius: scale(20),
    padding: wp(6),
    elevation: 4,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: hp(0.5) },
    shadowOpacity: 0.3,
    shadowRadius: scale(8),
  },
  popularContent: {
    marginBottom: hp(2.5),
  },
  popularBadge: {
    fontSize: scaleFont(13),
    fontWeight: '700',
    color: '#FEF3C7',
    marginBottom: hp(1),
  },
  popularTitle: {
    fontSize: scaleFont(28),
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: hp(1),
  },
  popularDesc: {
    fontSize: scaleFont(15),
    color: '#BFDBFE',
    marginBottom: hp(2),
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
    fontSize: scaleFont(20),
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: hp(0.25),
  },
  popularStatLabel: {
    fontSize: scaleFont(13),
    color: '#BFDBFE',
    fontWeight: '600',
  },
  popularStatDivider: {
    width: hp(0.125),
    height: hp(5),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: wp(4),
  },
  popularButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: hp(1.75),
    borderRadius: scale(12),
    alignItems: 'center',
  },
  popularButtonText: {
    color: '#2563EB',
    fontSize: scaleFont(16),
    fontWeight: '800',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  sectionTitle: {
    fontSize: scaleFont(22),
    fontWeight: '800',
    color: '#111827',
  },
  loanCount: {
    fontSize: scaleFont(14),
    color: '#6B7280',
    fontWeight: '600',
  },
  loansGrid: {
    gap: wp(4),
  },
  loanCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(20),
    padding: wp(5),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp(0.25) },
    shadowOpacity: 0.05,
    shadowRadius: scale(8),
  },
  loanCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  loanIconContainer: {
    width: wp(15),
    height: wp(15),
    borderRadius: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  loanIcon: {
    fontSize: scaleFont(32),
  },
  trendingBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.75),
    borderRadius: scale(12),
  },
  trendingText: {
    fontSize: scaleFont(16),
  },
  loanName: {
    fontSize: scaleFont(20),
    fontWeight: '800',
    color: '#111827',
    marginBottom: hp(1),
  },
  loanDescription: {
    fontSize: scaleFont(14),
    color: '#6B7280',
    lineHeight: hp(2.5),
    marginBottom: hp(2),
    fontWeight: '500',
  },
  loanFooter: {
    flexDirection: 'row',
    marginBottom: hp(2),
    paddingVertical: hp(2),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  loanDetail: {
    flex: 1,
  },
  loanDetailLabel: {
    fontSize: scaleFont(12),
    color: '#6B7280',
    marginBottom: hp(0.5),
    fontWeight: '600',
  },
  loanDetailValue: {
    fontSize: scaleFont(16),
    fontWeight: '800',
    color: '#111827',
  },
  loanDetailDivider: {
    width: hp(0.125),
    backgroundColor: '#E5E7EB',
    marginHorizontal: wp(4),
  },
  loanButton: {
    paddingVertical: hp(1.5),
    borderRadius: scale(12),
    alignItems: 'center',
    borderWidth: 1.5,
  },
  loanButtonText: {
    fontSize: scaleFont(15),
    fontWeight: '700',
  },
  helpSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(20),
    padding: wp(8),
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp(0.25) },
    shadowOpacity: 0.05,
    shadowRadius: scale(8),
  },
  helpIcon: {
    fontSize: scaleFont(48),
    marginBottom: hp(2),
  },
  helpTitle: {
    fontSize: scaleFont(22),
    fontWeight: '800',
    color: '#111827',
    marginBottom: hp(1),
  },
  helpDesc: {
    fontSize: scaleFont(15),
    color: '#6B7280',
    marginBottom: hp(2.5),
    fontWeight: '500',
  },
  helpButton: {
    backgroundColor: '#2563EB',
    paddingVertical: hp(1.75),
    paddingHorizontal: wp(8),
    borderRadius: scale(12),
  },
  helpButtonText: {
    color: '#FFFFFF',
    fontSize: scaleFont(16),
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
    borderTopLeftRadius: scale(32),
    borderTopRightRadius: scale(32),
    maxHeight: '90%',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    right: wp(5),
    top: wp(5),
    width: wp(9),
    height: wp(9),
    borderRadius: scale(18),
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: scaleFont(20),
    fontWeight: '600',
    color: '#6B7280',
  },
  modalHeader: {
    padding: wp(6),
    paddingTop: hp(4),
    alignItems: 'center',
    borderTopLeftRadius: scale(32),
    borderTopRightRadius: scale(32),
  },
  modalIconContainer: {
    width: wp(20),
    height: wp(20),
    borderRadius: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  modalIcon: {
    fontSize: scaleFont(40),
  },
  modalTitle: {
    fontSize: scaleFont(26),
    fontWeight: '900',
    color: '#111827',
    marginBottom: hp(1),
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: scaleFont(15),
    color: '#6B7280',
    lineHeight: hp(2.75),
    textAlign: 'center',
    fontWeight: '500',
  },
  modalBody: {
    paddingHorizontal: wp(6),
    paddingTop: hp(1),
  },
  modalSection: {
    marginBottom: hp(3.5),
  },
  modalSectionTitle: {
    fontSize: scaleFont(18),
    fontWeight: '800',
    color: '#111827',
    marginBottom: hp(2),
  },
  featuresList: {
    gap: wp(3),
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureDot: {
    width: hp(1),
    height: hp(1),
    borderRadius: scale(4),
    marginRight: wp(3),
  },
  featureText: {
    fontSize: scaleFont(15),
    color: '#374151',
    fontWeight: '600',
  },
  detailCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: scale(16),
    padding: wp(5),
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: scaleFont(14),
    color: '#6B7280',
    fontWeight: '600',
  },
  detailValue: {
    fontSize: scaleFont(15),
    color: '#111827',
    fontWeight: '800',
  },
  detailDivider: {
    height: hp(0.125),
    backgroundColor: '#E5E7EB',
    marginVertical: hp(2),
  },
  documentsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp(3),
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingVertical: hp(1.25),
    paddingHorizontal: wp(4),
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  documentIcon: {
    fontSize: scaleFont(18),
    marginRight: wp(2),
  },
  documentText: {
    fontSize: scaleFont(14),
    color: '#374151',
    fontWeight: '600',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: wp(6),
    paddingTop: hp(2),
    gap: wp(3),
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  calculateButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: hp(2),
    borderRadius: scale(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  calculateButtonText: {
    color: '#374151',
    fontSize: scaleFont(15),
    fontWeight: '700',
  },
  applyButton: {
    flex: 1,
    paddingVertical: hp(2),
    borderRadius: scale(14),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp(0.25) },
    shadowOpacity: 0.2,
    shadowRadius: scale(4),
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: scaleFont(15),
    fontWeight: '800',
  },
  disclaimerSection: {
    paddingHorizontal: wp(6),
    paddingTop: hp(2),
    paddingBottom: hp(3),
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    marginTop: hp(1),
  },
  disclaimerText: {
    fontSize: scaleFont(12),
    color: '#6B7280',
    fontWeight: '400',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: hp(1),
  },
});