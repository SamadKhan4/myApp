import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

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
          }, { marginTop: 24 }]}
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
          }, { marginTop: 28 }]}
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
            }, { marginTop: 24 }]}
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
            }, { marginTop: 24 }]}
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
          }, { marginTop: 28, marginBottom: 100 }]}
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
  historyButton: {
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
  historyIcon: {
    fontSize: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 6,
    gap: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  activeTab: {
    backgroundColor: '#EEF2FF',
  },
  tabIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  activeTabIconContainer: {
    backgroundColor: '#DBEAFE',
  },
  tabIcon: {
    fontSize: 20,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#2563EB',
  },
  calculatorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  calculatorHeader: {
    marginBottom: 24,
  },
  calculatorTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 6,
  },
  calculatorDesc: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 10,
  },
  helperText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 6,
    fontWeight: '400',
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 56,
  },
  inputPrefix: {
    fontSize: 18,
    fontWeight: '700',
    color: '#9CA3AF',
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
  },
  calculateButton: {
    backgroundColor: '#2563EB',
    height: 56,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    elevation: 4,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  calculateButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    marginRight: 8,
  },
  calculateButtonIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#6B7280',
  },
  resultBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  resultBadgeText: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '700',
  },
  resultValue: {
    fontSize: 44,
    fontWeight: '900',
    color: '#2563EB',
    marginBottom: 20,
    letterSpacing: -1,
  },
  resultDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 20,
  },
  breakdownContainer: {
    marginBottom: 20,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breakdownItem: {
    flex: 1,
  },
  breakdownLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 6,
    fontWeight: '600',
  },
  breakdownValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  breakdownDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  breakdownSeparator: {
    height: 16,
  },
  noteContainer: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  noteText: {
    fontSize: 13,
    color: '#92400E',
    fontWeight: '500',
    textAlign: 'center',
  },
  chartContainer: {
    marginBottom: 20,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '600',
  },
  applyButton: {
    backgroundColor: '#111827',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 48,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  emptyDesc: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  presetsSection: {
    marginBottom: 0,
  },
  presetsTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 16,
  },
  presetsScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  presetCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginRight: 12,
    minWidth: 140,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  presetAmount: {
    fontSize: 24,
    fontWeight: '900',
    color: '#2563EB',
    marginBottom: 6,
  },
  presetLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  presetDetail: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
});