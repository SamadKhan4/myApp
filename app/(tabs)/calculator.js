import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { wp, hp, scale, moderateScale, scaleFont, SCREEN_WIDTH, SCREEN_HEIGHT, isIOS, isAndroid } from '../../src/utils/responsive';

export default function Calculator() {
  const [activeTab, setActiveTab] = useState('emi'); // 'emi' or 'loan'
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [emiAmount, setEmiAmount] = useState('');
  const [result, setResult] = useState(null);
  const [breakdown, setBreakdown] = useState(null);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
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

  const calculateEMI = () => {
    if (!loanAmount || !interestRate || !loanTenure) {
      alert('Please enter all values');
      return;
    }

    const principal = parseFloat(loanAmount);
    const monthlyRate = parseFloat(interestRate) / 12 / 100;
    const tenureMonths = parseInt(loanTenure) * 12;

    if (isNaN(principal) || isNaN(monthlyRate) || isNaN(tenureMonths) || principal <= 0 || monthlyRate < 0 || tenureMonths <= 0) {
      alert('Please enter valid numbers');
      return;
    }

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
                (Math.pow(1 + monthlyRate, tenureMonths) - 1);

    const totalAmount = emi * tenureMonths;
    const totalInterest = totalAmount - principal;

    setResult(emi.toFixed(0));
    setBreakdown({
      principal: principal.toFixed(0),
      totalInterest: totalInterest.toFixed(0),
      totalAmount: totalAmount.toFixed(0),
      monthlyEMI: emi.toFixed(0),
      tenureMonths: tenureMonths
    });
  };

  const calculateLoanAmount = () => {
    if (!emiAmount || !interestRate || !loanTenure) {
      alert('Please enter all values');
      return;
    }

    const emi = parseFloat(emiAmount);
    const monthlyRate = parseFloat(interestRate) / 12 / 100;
    const tenureMonths = parseInt(loanTenure) * 12;

    if (isNaN(emi) || isNaN(monthlyRate) || isNaN(tenureMonths) || emi <= 0 || monthlyRate < 0 || tenureMonths <= 0) {
      alert('Please enter valid numbers');
      return;
    }

    const numerator = emi * (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    const denominator = monthlyRate * Math.pow(1 + monthlyRate, tenureMonths);
    const loan = numerator / denominator;

    const totalAmount = emi * tenureMonths;
    const totalInterest = totalAmount - loan;

    setResult(loan.toFixed(0));
    setBreakdown({
      principal: loan.toFixed(0),
      totalInterest: totalInterest.toFixed(0),
      totalAmount: totalAmount.toFixed(0),
      monthlyEMI: emi.toFixed(0),
      tenureMonths: tenureMonths
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN').format(value);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setResult(null);
    setBreakdown(null);
    setLoanAmount('');
    setEmiAmount('');
    setInterestRate('');
    setLoanTenure('');
  };

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
              <Text style={styles.title}>Loan Calculator</Text>
            </View>
            <TouchableOpacity style={styles.historyButton}>
              <Text style={styles.historyIcon}>📊</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>Calculate your loan details instantly</Text>
        </Animated.View>

        {/* Tab Selector */}
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: hp(3) }]}
        >
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'emi' && styles.activeTab]}
              onPress={() => handleTabChange('emi')}
              activeOpacity={0.7}
            >
              <View style={[styles.tabIconContainer, activeTab === 'emi' && styles.activeTabIconContainer]}>
                <Text style={styles.tabIcon}>💰</Text>
              </View>
              <Text style={[styles.tabText, activeTab === 'emi' && styles.activeTabText]}>EMI Calculator</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.tab, activeTab === 'loan' && styles.activeTab]}
              onPress={() => handleTabChange('loan')}
              activeOpacity={0.7}
            >
              <View style={[styles.tabIconContainer, activeTab === 'loan' && styles.activeTabIconContainer]}>
                <Text style={styles.tabIcon}>🏦</Text>
              </View>
              <Text style={[styles.tabText, activeTab === 'loan' && styles.activeTabText]}>Loan Amount</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Calculator Form */}
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }, { marginTop: hp(3.5) }]}
        >
          <View style={styles.calculatorCard}>
            <View style={styles.calculatorHeader}>
              <Text style={styles.calculatorTitle}>
                {activeTab === 'emi' ? 'Calculate Monthly EMI' : 'Calculate Loan Amount'}
              </Text>
              <Text style={styles.calculatorDesc}>
                {activeTab === 'emi' 
                  ? 'Enter loan details to get your monthly EMI' 
                  : 'Enter EMI details to find eligible loan amount'}
              </Text>
            </View>

            {activeTab === 'emi' ? (
              // EMI Calculator Form
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Loan Amount (₹)</Text>
                  <Text style={styles.helperText}>Enter the desired loan amount you wish to borrow</Text>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.inputPrefix}>₹</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter loan amount"
                      placeholderTextColor="#9CA3AF"
                      value={loanAmount}
                      onChangeText={setLoanAmount}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Interest Rate (% p.a.)</Text>
                  <Text style={styles.helperText}>Annual interest rate charged by the lender</Text>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.inputPrefix}>%</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter interest rate"
                      placeholderTextColor="#9CA3AF"
                      value={interestRate}
                      onChangeText={setInterestRate}
                      keyboardType="decimal-pad"
                    />
                  </View>
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Loan Tenure (Years)</Text>
                  <Text style={styles.helperText}>Duration for which you will repay the loan</Text>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.inputPrefix}>📅</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter tenure"
                      placeholderTextColor="#9CA3AF"
                      value={loanTenure}
                      onChangeText={setLoanTenure}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                
                <TouchableOpacity 
                  style={styles.calculateButton}
                  onPress={calculateEMI}
                  activeOpacity={0.8}
                >
                  <Text style={styles.calculateButtonText}>Calculate EMI</Text>
                  <Text style={styles.calculateButtonIcon}>→</Text>
                </TouchableOpacity>
              </>
            ) : (
              // Loan Calculator Form
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Monthly EMI (₹)</Text>
                  <Text style={styles.helperText}>Enter the EMI amount you can afford to pay</Text>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.inputPrefix}>₹</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter monthly EMI"
                      placeholderTextColor="#9CA3AF"
                      value={emiAmount}
                      onChangeText={setEmiAmount}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Interest Rate (% p.a.)</Text>
                  <Text style={styles.helperText}>Annual interest rate charged by the lender</Text>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.inputPrefix}>%</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter interest rate"
                      placeholderTextColor="#9CA3AF"
                      value={interestRate}
                      onChangeText={setInterestRate}
                      keyboardType="decimal-pad"
                    />
                  </View>
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Loan Tenure (Years)</Text>
                  <Text style={styles.helperText}>Duration for which you will repay the loan</Text>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.inputPrefix}>📅</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter tenure"
                      placeholderTextColor="#9CA3AF"
                      value={loanTenure}
                      onChangeText={setLoanTenure}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                
                <TouchableOpacity 
                  style={styles.calculateButton}
                  onPress={calculateLoanAmount}
                  activeOpacity={0.8}
                >
                  <Text style={styles.calculateButtonText}>Calculate Loan</Text>
                  <Text style={styles.calculateButtonIcon}>→</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </Animated.View>

        {/* Result Display */}
        {result && breakdown && (
          <Animated.View 
            style={[{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }, { marginTop: hp(3) }]}
          >
            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <Text style={styles.resultLabel}>
                  {activeTab === 'emi' ? 'Your Monthly EMI' : 'Eligible Loan Amount'}
                </Text>
                <View style={styles.resultBadge}>
                  <Text style={styles.resultBadgeText}>Calculated</Text>
                </View>
              </View>
                          
              <Text style={styles.resultValue}>₹ {formatCurrency(result)}</Text>
                          
              <Text style={styles.helperText}>This is an estimated {activeTab === 'emi' ? 'monthly EMI' : 'loan amount'} based on your inputs</Text>
              
              <View style={styles.resultDivider} />

              <View style={styles.breakdownContainer}>
                <View style={styles.breakdownRow}>
                  <View style={styles.breakdownItem}>
                    <Text style={styles.breakdownLabel}>Principal Amount</Text>
                    <Text style={styles.breakdownValue}>₹ {formatCurrency(breakdown.principal)}</Text>
                  </View>
                  <View style={styles.breakdownDivider} />
                  <View style={styles.breakdownItem}>
                    <Text style={styles.breakdownLabel}>Total Interest</Text>
                    <Text style={[styles.breakdownValue, { color: '#EF4444' }]}>₹ {formatCurrency(breakdown.totalInterest)}</Text>
                  </View>
                </View>

                <View style={styles.breakdownSeparator} />

                <View style={styles.breakdownRow}>
                  <View style={styles.breakdownItem}>
                    <Text style={styles.breakdownLabel}>Total Amount</Text>
                    <Text style={[styles.breakdownValue, { color: '#2563EB' }]}>₹ {formatCurrency(breakdown.totalAmount)}</Text>
                  </View>
                  <View style={styles.breakdownDivider} />
                  <View style={styles.breakdownItem}>
                    <Text style={styles.breakdownLabel}>Tenure</Text>
                    <Text style={styles.breakdownValue}>{breakdown.tenureMonths} months</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.noteContainer}>
                <Text style={styles.noteText}>Note: Actual EMI may vary based on verification and final approval</Text>
              </View>
              
              {/* Pie Chart Representation */}
              <View style={styles.chartContainer}>
                <View style={styles.chartLegend}>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#2563EB' }]} />
                    <Text style={styles.legendText}>Principal ({((breakdown.principal / breakdown.totalAmount) * 100).toFixed(1)}%)</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
                    <Text style={styles.legendText}>Interest ({((breakdown.totalInterest / breakdown.totalAmount) * 100).toFixed(1)}%)</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity 
                style={styles.applyButton}
                onPress={() => router.push('/(tabs)/loans')}
              >
                <Text style={styles.applyButtonText}>Apply for Loan</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}

        {/* Empty State */}
        {!result && (
          <Animated.View 
            style={[{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }, { marginTop: hp(3) }]}
          >
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📊</Text>
              <Text style={styles.emptyTitle}>No Results Yet</Text>
              <Text style={styles.emptyDesc}>Fill in the details above and calculate to see your results</Text>
            </View>
          </Animated.View>
        )}

        {/* Quick Presets */}
        <Animated.View 
          style={[{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }, { marginTop: hp(3.5), marginBottom: hp(12.5) }]}
        >
          <View style={styles.presetsSection}>
            <Text style={styles.presetsTitle}>Quick Presets</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.presetsScroll}>
              <TouchableOpacity 
                style={styles.presetCard}
                onPress={() => {
                  if (activeTab === 'emi') {
                    setLoanAmount('500000');
                    setInterestRate('12');
                    setLoanTenure('3');
                  }
                }}
              >
                <Text style={styles.presetAmount}>₹5L</Text>
                <Text style={styles.presetLabel}>Personal Loan</Text>
                <Text style={styles.presetDetail}>12% • 3 years</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.presetCard}
                onPress={() => {
                  if (activeTab === 'emi') {
                    setLoanAmount('5000000');
                    setInterestRate('8.5');
                    setLoanTenure('20');
                  }
                }}
              >
                <Text style={styles.presetAmount}>₹50L</Text>
                <Text style={styles.presetLabel}>Home Loan</Text>
                <Text style={styles.presetDetail}>8.5% • 20 years</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.presetCard}
                onPress={() => {
                  if (activeTab === 'emi') {
                    setLoanAmount('1000000');
                    setInterestRate('9');
                    setLoanTenure('5');
                  }
                }}
              >
                <Text style={styles.presetAmount}>₹10L</Text>
                <Text style={styles.presetLabel}>Car Loan</Text>
                <Text style={styles.presetDetail}>9% • 5 years</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.presetCard}
                onPress={() => {
                  if (activeTab === 'emi') {
                    setLoanAmount('2000000');
                    setInterestRate('8');
                    setLoanTenure('10');
                  }
                }}
              >
                <Text style={styles.presetAmount}>₹20L</Text>
                <Text style={styles.presetLabel}>Education</Text>
                <Text style={styles.presetDetail}>8% • 10 years</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
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
  historyButton: {
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
  historyIcon: {
    fontSize: scaleFont(20),
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: scale(16),
    padding: wp(1.5),
    gap: wp(2),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp(0.125) },
    shadowOpacity: 0.05,
    shadowRadius: scale(4),
  },
  tab: {
    flex: 1,
    paddingVertical: hp(2),
    alignItems: 'center',
    borderRadius: scale(12),
    backgroundColor: 'transparent',
  },
  activeTab: {
    backgroundColor: '#EEF2FF',
  },
  tabIconContainer: {
    width: wp(10),
    height: wp(10),
    borderRadius: scale(20),
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  activeTabIconContainer: {
    backgroundColor: '#DBEAFE',
  },
  tabIcon: {
    fontSize: scaleFont(20),
  },
  tabText: {
    fontSize: scaleFont(13),
    fontWeight: '700',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#2563EB',
  },
  calculatorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(20),
    padding: wp(6),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp(0.25) },
    shadowOpacity: 0.08,
    shadowRadius: scale(8),
  },
  calculatorHeader: {
    marginBottom: hp(3),
  },
  calculatorTitle: {
    fontSize: scaleFont(20),
    fontWeight: '800',
    color: '#111827',
    marginBottom: hp(0.75),
  },
  calculatorDesc: {
    fontSize: scaleFont(14),
    color: '#6B7280',
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: hp(2.5),
  },
  inputLabel: {
    fontSize: scaleFont(14),
    fontWeight: '700',
    color: '#374151',
    marginBottom: hp(1.25),
  },
  helperText: {
    fontSize: scaleFont(12),
    color: '#6B7280',
    marginTop: hp(0.75),
    fontWeight: '400',
    marginLeft: wp(1),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: scale(14),
    paddingHorizontal: wp(4),
    height: hp(7),
  },
  inputPrefix: {
    fontSize: scaleFont(18),
    fontWeight: '700',
    color: '#9CA3AF',
    marginRight: wp(3),
  },
  input: {
    flex: 1,
    fontSize: scaleFont(16),
    color: '#111827',
    fontWeight: '600',
  },
  calculateButton: {
    backgroundColor: '#2563EB',
    height: hp(7),
    borderRadius: scale(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(1.25),
    elevation: 4,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: hp(0.5) },
    shadowOpacity: 0.3,
    shadowRadius: scale(8),
  },
  calculateButtonText: {
    color: '#FFFFFF',
    fontSize: scaleFont(17),
    fontWeight: '800',
    marginRight: wp(2),
  },
  calculateButtonIcon: {
    color: '#FFFFFF',
    fontSize: scaleFont(20),
    fontWeight: '700',
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(20),
    padding: wp(6),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp(0.25) },
    shadowOpacity: 0.08,
    shadowRadius: scale(8),
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  resultLabel: {
    fontSize: scaleFont(15),
    fontWeight: '700',
    color: '#6B7280',
  },
  resultBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.75),
    borderRadius: scale(12),
  },
  resultBadgeText: {
    fontSize: scaleFont(11),
    color: '#059669',
    fontWeight: '700',
  },
  resultValue: {
    fontSize: scaleFont(44),
    fontWeight: '900',
    color: '#2563EB',
    marginBottom: hp(2.5),
    letterSpacing: -1,
  },
  resultDivider: {
    height: hp(0.125),
    backgroundColor: '#E5E7EB',
    marginBottom: hp(2.5),
  },
  breakdownContainer: {
    marginBottom: hp(2.5),
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breakdownItem: {
    flex: 1,
  },
  breakdownLabel: {
    fontSize: scaleFont(13),
    color: '#6B7280',
    marginBottom: hp(0.75),
    fontWeight: '600',
  },
  breakdownValue: {
    fontSize: scaleFont(18),
    fontWeight: '800',
    color: '#111827',
  },
  breakdownDivider: {
    width: hp(0.125),
    height: hp(5),
    backgroundColor: '#E5E7EB',
    marginHorizontal: wp(4),
  },
  breakdownSeparator: {
    height: hp(2),
  },
  noteContainer: {
    backgroundColor: '#FEF3C7',
    borderRadius: scale(12),
    padding: wp(4),
    marginTop: hp(2),
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  noteText: {
    fontSize: scaleFont(13),
    color: '#92400E',
    fontWeight: '500',
    textAlign: 'center',
  },
  chartContainer: {
    marginBottom: hp(2.5),
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: hp(2),
    backgroundColor: '#F9FAFB',
    borderRadius: scale(12),
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: hp(1.5),
    height: hp(1.5),
    borderRadius: scale(3),
    marginRight: wp(2),
  },
  legendText: {
    fontSize: scaleFont(13),
    color: '#374151',
    fontWeight: '600',
  },
  applyButton: {
    backgroundColor: '#111827',
    paddingVertical: hp(2),
    borderRadius: scale(14),
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: scaleFont(16),
    fontWeight: '800',
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(20),
    padding: wp(12),
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp(0.125) },
    shadowOpacity: 0.05,
    shadowRadius: scale(4),
  },
  emptyIcon: {
    fontSize: scaleFont(64),
    marginBottom: hp(2),
  },
  emptyTitle: {
    fontSize: scaleFont(20),
    fontWeight: '800',
    color: '#111827',
    marginBottom: hp(1),
  },
  emptyDesc: {
    fontSize: scaleFont(15),
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  presetsSection: {
    marginBottom: 0,
  },
  presetsTitle: {
    fontSize: scaleFont(20),
    fontWeight: '800',
    color: '#111827',
    marginBottom: hp(2),
  },
  presetsScroll: {
    marginHorizontal: -wp(5),
    paddingHorizontal: wp(5),
  },
  presetCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(16),
    padding: wp(5),
    marginRight: wp(3),
    minWidth: wp(35),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp(0.125) },
    shadowOpacity: 0.05,
    shadowRadius: scale(4),
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  presetAmount: {
    fontSize: scaleFont(24),
    fontWeight: '900',
    color: '#2563EB',
    marginBottom: hp(0.75),
  },
  presetLabel: {
    fontSize: scaleFont(14),
    fontWeight: '700',
    color: '#111827',
    marginBottom: hp(0.5),
  },
  presetDetail: {
    fontSize: scaleFont(12),
    color: '#6B7280',
    fontWeight: '600',
  },
});