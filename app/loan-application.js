import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ApiService from '../src/services/ApiService';
import { hp, scale, scaleFont, verticalScale, wp } from '../src/utils/responsive';

export default function LoanApplication() {
  const { loanTypeId, loanName } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState({
    pan: null,
    aadhaar: null,
    bankStatement: null,
    salarySlip: null,
    propertyDocument: null,
    businessDocument: null
  });

  const [formData, setFormData] = useState({
    loanTypeId: loanTypeId || '',
    loanAmount: '',
    tenure: '',
    purpose: '',
    monthlyIncome: '',
    existingEMI: '',
    creditScore: '',
    city: '',
    state: ''
  });

  useEffect(() => {
    // Pre-fill loanTypeId if passed from previous screen
    if (loanTypeId) {
      setFormData(prev => ({
        ...prev,
        loanTypeId
      }));
    }
  }, [loanTypeId]);

  const validateForm = () => {
    if (!formData.loanTypeId) {
      Alert.alert('Validation Error', 'Loan type is required');
      return false;
    }
    
    if (!formData.loanAmount || isNaN(formData.loanAmount) || parseFloat(formData.loanAmount) <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid loan amount');
      return false;
    }
    
    if (!formData.tenure || isNaN(formData.tenure) || parseInt(formData.tenure) <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid tenure (in months)');
      return false;
    }
    
    if (!formData.purpose.trim()) {
      Alert.alert('Validation Error', 'Please enter the purpose of the loan');
      return false;
    }
    
    if (!formData.monthlyIncome || isNaN(formData.monthlyIncome) || parseFloat(formData.monthlyIncome) <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid monthly income');
      return false;
    }
    
    if (!formData.city.trim()) {
      Alert.alert('Validation Error', 'Please enter your city');
      return false;
    }
    
    if (!formData.state.trim()) {
      Alert.alert('Validation Error', 'Please enter your state');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    // Check if required documents are uploaded
    const requiredDocs = ['pan', 'aadhaar']; // At minimum, PAN and Aadhaar are typically required
    const missingDocs = requiredDocs.filter(doc => !documents[doc]);
    
    if (missingDocs.length > 0) {
      Alert.alert(
        'Missing Documents',
        `Please upload the following required documents: ${missingDocs.join(', ')}.`,
        [{ text: 'OK' }]
      );
      return;
    }

    setLoading(true);
    try {
      // Prepare the application payload
      const applicationData = {
        ...formData,
        loanAmount: parseFloat(formData.loanAmount),
        tenure: parseInt(formData.tenure),
        monthlyIncome: parseFloat(formData.monthlyIncome),
        existingEMI: parseFloat(formData.existingEMI) || 0,
        creditScore: parseInt(formData.creditScore) || 0,
        address: {
          city: formData.city,
          state: formData.state
        },
        documents: {
          pan: documents.pan || '',
          aadhaar: documents.aadhaar || '',
          bankStatement: documents.bankStatement || '',
          salarySlip: documents.salarySlip || '',
          propertyDocument: documents.propertyDocument || '',
          businessDocument: documents.businessDocument || ''
        }
      };

      console.log('Submitting application:', applicationData);
      console.log('Address data being sent:', { city: formData.city, state: formData.state });
      console.log('Full address object:', applicationData.address);

      const response = await ApiService.applyForLoan(applicationData);
      
      if (response.success) {
        Alert.alert(
          'Success', 
          'Your loan application has been submitted successfully! Reference ID: ' + (response.data?.id || 'N/A'), 
          [
            { text: 'OK', onPress: () => {
              router.back();
              router.push('/loan-status'); // Navigate to loan status page to see application status
            }}
          ]
        );
      } else {
        Alert.alert('Error', response.message || 'Failed to submit loan application');
      }
    } catch (error) {
      console.error('Loan application error:', error);
      Alert.alert('Error', error.message || 'An error occurred while submitting your application');
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentUpload = async (docType) => {
    // Show options for document upload
    Alert.alert(
      'Document Upload',
      `Upload your ${docType} document`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Select File', onPress: async () => {
          try {
            // In a real app, this would use ImagePicker or DocumentPicker
            // For now, we'll simulate the selection process
            Alert.alert(
              'File Selection',
              `In a real application, you would select your ${docType} document from your device.

This would involve: 
1. Opening the file picker 
2. Selecting the file 
3. Uploading to server`,
              [
                { text: 'Simulate Upload', onPress: async () => {
                  setLoading(true);
                  try {
                    // In a real app, we would upload the actual file using the API service
                    // For simulation, we'll call the appropriate API method
                    let uploadResult;
                    switch(docType) {
                      case 'pan':
                        // uploadResult = await ApiService.uploadPanDocument(selectedFileUri);
                        break;
                      case 'aadhaar':
                        // uploadResult = await ApiService.uploadAadhaarDocument(selectedFileUri);
                        break;
                      case 'bankStatement':
                        // uploadResult = await ApiService.uploadBankStatement(selectedFileUri);
                        break;
                      case 'salarySlip':
                        // uploadResult = await ApiService.uploadSalarySlip(selectedFileUri);
                        break;
                      case 'propertyDocument':
                        // uploadResult = await ApiService.uploadPropertyDocument(selectedFileUri);
                        break;
                      case 'businessDocument':
                        // uploadResult = await ApiService.uploadBusinessDocument(selectedFileUri);
                        break;
                      default:
                        break;
                    }
                    
                    // For simulation purposes, we'll just mark as uploaded
                    setDocuments(prev => ({
                      ...prev,
                      [docType]: `https://example.com/documents/${docType}_uploaded.pdf`
                    }));
                    
                    Alert.alert('Success', `${docType} document uploaded successfully!`);
                  } catch (error) {
                    console.error(`Error uploading ${docType}:`, error);
                    Alert.alert('Error', `Failed to upload ${docType} document: ${error.message}`);
                  } finally {
                    setLoading(false);
                  }
                }},
                { text: 'Cancel' }
              ]
            );
          } catch (error) {
            console.error('Document upload error:', error);
            Alert.alert('Error', `Document upload failed: ${error.message}`);
          }
        }}
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Loan Application Form</Text>
      {loanName && <Text style={styles.loanType}>For: {loanName}</Text>}
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Loan Amount (₹)</Text>
        <TextInput
          style={styles.input}
          value={formData.loanAmount}
          onChangeText={(value) => setFormData(prev => ({ ...prev, loanAmount: value }))}
          placeholder="Enter loan amount"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Tenure (months)</Text>
        <TextInput
          style={styles.input}
          value={formData.tenure}
          onChangeText={(value) => setFormData(prev => ({ ...prev, tenure: value }))}
          placeholder="Enter tenure in months"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Purpose of Loan</Text>
        <TextInput
          style={styles.textArea}
          value={formData.purpose}
          onChangeText={(value) => setFormData(prev => ({ ...prev, purpose: value }))}
          placeholder="Describe the purpose of your loan"
          multiline
          numberOfLines={3}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Monthly Income (₹)</Text>
        <TextInput
          style={styles.input}
          value={formData.monthlyIncome}
          onChangeText={(value) => setFormData(prev => ({ ...prev, monthlyIncome: value }))}
          placeholder="Enter your monthly income"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Existing EMI (₹) (Optional)</Text>
        <TextInput
          style={styles.input}
          value={formData.existingEMI}
          onChangeText={(value) => setFormData(prev => ({ ...prev, existingEMI: value }))}
          placeholder="Enter existing EMI amount if any"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Credit Score (Optional)</Text>
        <TextInput
          style={styles.input}
          value={formData.creditScore}
          onChangeText={(value) => setFormData(prev => ({ ...prev, creditScore: value }))}
          placeholder="Enter your credit score if known"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          value={formData.city}
          onChangeText={(value) => setFormData(prev => ({ ...prev, city: value }))}
          placeholder="Enter your city"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>State</Text>
        <TextInput
          style={styles.input}
          value={formData.state}
          onChangeText={(value) => setFormData(prev => ({ ...prev, state: value }))}
          placeholder="Enter your state"
        />
      </View>

      {/* Document Upload Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Required Documents</Text>
        
        <TouchableOpacity 
          style={[styles.docUploadButton, documents.pan && styles.docUploadedButton]}
          onPress={() => handleDocumentUpload('pan')}
        >
          <View style={styles.docRow}>
            <Text style={styles.docUploadText}>Upload PAN Card *</Text>
            {documents.pan ? <Text style={styles.uploadedText}>✓ Uploaded</Text> : <Text style={styles.notUploadedText}>Not uploaded</Text>}
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.docUploadButton, documents.aadhaar && styles.docUploadedButton]}
          onPress={() => handleDocumentUpload('aadhaar')}
        >
          <View style={styles.docRow}>
            <Text style={styles.docUploadText}>Upload Aadhaar Card *</Text>
            {documents.aadhaar ? <Text style={styles.uploadedText}>✓ Uploaded</Text> : <Text style={styles.notUploadedText}>Not uploaded</Text>}
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.docUploadButton, documents.bankStatement && styles.docUploadedButton]}
          onPress={() => handleDocumentUpload('bankStatement')}
        >
          <View style={styles.docRow}>
            <Text style={styles.docUploadText}>Upload Bank Statement</Text>
            {documents.bankStatement ? <Text style={styles.uploadedText}>✓ Uploaded</Text> : <Text style={styles.notUploadedText}>Not uploaded</Text>}
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.docUploadButton, documents.salarySlip && styles.docUploadedButton]}
          onPress={() => handleDocumentUpload('salarySlip')}
        >
          <View style={styles.docRow}>
            <Text style={styles.docUploadText}>Upload Salary Slip</Text>
            {documents.salarySlip ? <Text style={styles.uploadedText}>✓ Uploaded</Text> : <Text style={styles.notUploadedText}>Not uploaded</Text>}
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.submitButton} 
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.submitButtonText}>Submit Application</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.cancelButton} 
        onPress={() => router.back()}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: wp(5),
  },
  header: {
    fontSize: scaleFont(24),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: hp(2),
    textAlign: 'center',
  },
  loanType: {
    fontSize: scaleFont(16),
    color: '#666',
    marginBottom: hp(2),
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: hp(3),
  },
  label: {
    fontSize: scaleFont(16),
    fontWeight: '600',
    color: '#333',
    marginBottom: hp(1.2),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: scale(8),
    padding: verticalScale(12),
    fontSize: scaleFont(16),
    backgroundColor: '#fff',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: scale(8),
    padding: verticalScale(12),
    fontSize: scaleFont(16),
    backgroundColor: '#fff',
    height: verticalScale(80),
    textAlignVertical: 'top',
  },
  section: {
    marginBottom: hp(3),
    padding: wp(4),
    backgroundColor: '#fff',
    borderRadius: scale(8),
  },
  sectionTitle: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: hp(2),
  },
  docUploadButton: {
    padding: verticalScale(12),
    marginBottom: hp(1.5),
    backgroundColor: '#f8f9fa',
    borderRadius: scale(6),
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  docUploadedButton: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
  },
  docRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  docUploadText: {
    fontSize: scaleFont(14),
    color: '#495057',
    flex: 1,
  },
  uploadedText: {
    fontSize: scaleFont(12),
    color: '#28a745',
    fontWeight: '600',
  },
  notUploadedText: {
    fontSize: scaleFont(12),
    color: '#dc3545',
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: verticalScale(15),
    borderRadius: scale(8),
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  submitButtonText: {
    color: '#fff',
    fontSize: scaleFont(16),
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    padding: verticalScale(15),
    borderRadius: scale(8),
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: scaleFont(16),
    fontWeight: 'bold',
  }
});