import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ApiService from '../src/services/ApiService';
import { hp, scale, scaleFont, verticalScale, wp } from '../src/utils/responsive';

export default function LoanStatus() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchLoanApplications();
  }, []);

  const fetchLoanApplications = async () => {
    try {
      setLoading(true);
      console.log('Fetching loan applications...');
      const response = await ApiService.getMyLoanApplications();
      console.log('Loan applications response:', response);
      
      if (response.success) {
        let applicationsArray = [];
        
        // Handle different response structures
        if (Array.isArray(response.data)) {
          // Direct array response
          applicationsArray = response.data;
        } else if (response.data && typeof response.data === 'object') {
          // Object response - could be nested
          if (response.data.applications && Array.isArray(response.data.applications)) {
            applicationsArray = response.data.applications;
          } else if (response.data.data && Array.isArray(response.data.data)) {
            applicationsArray = response.data.data;
          } else if (response.data.loanApplications && Array.isArray(response.data.loanApplications)) {
            applicationsArray = response.data.loanApplications;
          } else if (response.data.loans && Array.isArray(response.data.loans)) {
            applicationsArray = response.data.loans;
          } else {
            // If it's a single application object, wrap it in an array
            applicationsArray = [response.data];
          }
        }
        
        // Transform the response to match our UI format
        const transformedApplications = applicationsArray.map(app => ({
          id: app._id || app.id,
          loanTypeId: app.loanTypeId,
          loanTypeName: app.loanTypeName || app.loanName || 'Loan Application',
          loanAmount: app.loanAmount || app.amount || 0,
          tenure: app.tenure || app.tenureMonths || 0,
          purpose: app.purpose || 'N/A',
          status: app.status || app.applicationStatus || 'Pending',
          createdAt: app.createdAt || app.created_at || app.dateApplied || new Date().toISOString(),
          updatedAt: app.updatedAt || app.updated_at || app.lastUpdated || new Date().toISOString(),
          monthlyIncome: app.monthlyIncome || app.income || 0,
          existingEMI: app.existingEMI || app.emi || 0,
          creditScore: app.creditScore || 0,
          remarks: app.remarks || app.comments || 'No remarks'
        }));
        
        setApplications(transformedApplications);
      } else {
        Alert.alert('Error', response.message || 'Failed to fetch loan applications');
      }
    } catch (error) {
      console.error('Error fetching loan applications:', error);
      Alert.alert('Error', error.message || 'An error occurred while fetching loan applications');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchLoanApplications();
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return '#28a745'; // Green
      case 'rejected':
        return '#dc3545'; // Red
      case 'pending':
        return '#ffc107'; // Yellow
      case 'under review':
        return '#17a2b8'; // Blue
      case 'disbursed':
        return '#20c997'; // Teal
      default:
        return '#6c757d'; // Gray
    }
  };

  const getStatusBackgroundColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return '#d4edda';
      case 'rejected':
        return '#f8d7da';
      case 'pending':
        return '#fff3cd';
      case 'under review':
        return '#d1ecf1';
      case 'disbursed':
        return '#d1f3ed';
      default:
        return '#e9ecef';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderApplicationItem = ({ item }) => (
    <View style={styles.applicationCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.loanType}>{item.loanTypeName}</Text>
        <View style={[styles.statusBadge, { 
          backgroundColor: getStatusBackgroundColor(item.status),
          borderColor: getStatusColor(item.status)
        }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status}
          </Text>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.row}>
          <Text style={styles.label}>Amount:</Text>
          <Text style={styles.value}>₹{item.loanAmount.toLocaleString()}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Tenure:</Text>
          <Text style={styles.value}>{item.tenure} months</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Purpose:</Text>
          <Text style={styles.value}>{item.purpose}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Monthly Income:</Text>
          <Text style={styles.value}>₹{item.monthlyIncome.toLocaleString()}</Text>
        </View>
        
        {item.existingEMI > 0 && (
          <View style={styles.row}>
            <Text style={styles.label}>Existing EMI:</Text>
            <Text style={styles.value}>₹{item.existingEMI.toLocaleString()}</Text>
          </View>
        )}
        
        {item.creditScore > 0 && (
          <View style={styles.row}>
            <Text style={styles.label}>Credit Score:</Text>
            <Text style={styles.value}>{item.creditScore}</Text>
          </View>
        )}
        
        <View style={styles.row}>
          <Text style={styles.label}>Applied on:</Text>
          <Text style={styles.value}>{formatDate(item.createdAt)}</Text>
        </View>
        
        {item.status.toLowerCase() !== 'pending' && (
          <View style={styles.row}>
            <Text style={styles.label}>Updated:</Text>
            <Text style={styles.value}>{formatDate(item.updatedAt)}</Text>
          </View>
        )}
        
        {item.remarks && item.remarks !== 'No remarks' && (
          <View style={styles.remarksSection}>
            <Text style={styles.label}>Remarks:</Text>
            <Text style={styles.remarksText}>{item.remarks}</Text>
          </View>
        )}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading loan applications...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>My Loan Applications</Text>
            <Text style={styles.subtitle}>
              Track the status of your loan applications
            </Text>
          </View>
        </View>
      </View>

      {applications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No loan applications found</Text>
          <Text style={styles.emptySubtext}>
            You have not applied for any loans yet. Apply for a loan to see it here.
          </Text>
          <View style={styles.buttonContainer}>
            <Text 
              style={styles.applyButton}
              onPress={() => router.push('/(tabs)/loans')}
            >
              Browse Loans
            </Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={applications}
          renderItem={renderApplicationItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007bff',
    padding: wp(5),
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  backButton: {
    position: 'absolute',
    left: wp(5),
    top: hp(2.5),
    zIndex: 1,
    padding: verticalScale(5),
  },
  backButtonText: {
    fontSize: scaleFont(20),
    fontWeight: 'bold',
    color: '#fff',
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: scaleFont(24),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: hp(1.2),
  },
  subtitle: {
    fontSize: scaleFont(14),
    color: '#e9ecef',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: hp(1.5),
    fontSize: scaleFont(16),
    color: '#666',
  },
  listContent: {
    padding: wp(4),
  },
  applicationCard: {
    backgroundColor: '#fff',
    borderRadius: scale(10),
    padding: wp(4),
    marginBottom: hp(2),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.5),
    paddingBottom: hp(1.2),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  loanType: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: wp(2.5),
    paddingVertical: verticalScale(1.2),
    borderRadius: scale(15),
    borderWidth: 1,
  },
  statusText: {
    fontSize: scaleFont(12),
    fontWeight: '600',
  },
  cardContent: {
    gap: hp(1),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: scaleFont(13),
    color: '#666',
    fontWeight: '500',
    flex: 1,
  },
  value: {
    fontSize: scaleFont(14),
    color: '#333',
    fontWeight: '500',
    textAlign: 'right',
    flex: 1,
  },
  remarksSection: {
    marginTop: hp(1.2),
    paddingTop: hp(1.2),
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  remarksText: {
    fontSize: scaleFont(13),
    color: '#555',
    fontStyle: 'italic',
    marginTop: hp(0.5),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(8),
  },
  emptyText: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    color: '#666',
    marginBottom: hp(1.5),
  },
  emptySubtext: {
    fontSize: scaleFont(14),
    color: '#888',
    textAlign: 'center',
    marginBottom: hp(2.5),
    lineHeight: verticalScale(20),
  },
  buttonContainer: {
    marginTop: hp(1.2),
  },
  applyButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    paddingVertical: verticalScale(12),
    paddingHorizontal: wp(6),
    borderRadius: scale(25),
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});