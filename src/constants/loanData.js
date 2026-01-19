// Static loan data for ElitePaisa app

export const loanTypes = [
  {
    id: 1,
    name: 'Personal Loan',
    icon: '💳',
    description: 'Flexible personal loans for any purpose',
    maxAmount: '₹ 5,00,000',
    minAmount: '₹ 50,000',
    interestRate: '12% p.a.',
    processingTime: '24-48 hours',
    tenure: 'Up to 60 months',
    eligibility: 'Salary of ₹ 25,000+ per month',
    features: ['No collateral required', 'Quick approval', 'Flexible tenure']
  },
  {
    id: 2,
    name: 'Home Loan',
    icon: '🏠',
    description: 'Affordable home loans with attractive rates',
    maxAmount: '₹ 1 Cr',
    minAmount: '₹ 2,00,000',
    interestRate: '7.5% p.a.',
    processingTime: '7-15 days',
    tenure: 'Up to 30 years',
    eligibility: 'Stable income proof required',
    features: ['Tax benefits', 'Competitive rates', 'Flexible EMI options']
  },
  {
    id: 3,
    name: 'Auto Loan',
    icon: '🚗',
    description: 'Quick car loans with easy approval',
    maxAmount: '₹ 50,00,000',
    minAmount: '₹ 1,00,000',
    interestRate: '9% p.a.',
    processingTime: '3-7 days',
    tenure: 'Up to 84 months',
    eligibility: 'Valid driving license and income proof',
    features: ['Fast disbursal', 'Minimal documentation', 'Insurance included']
  },
  {
    id: 4,
    name: 'Business Loan',
    icon: '💼',
    description: 'Funding for your business growth',
    maxAmount: '₹ 50,00,000',
    minAmount: '₹ 1,00,000',
    interestRate: '11% p.a.',
    processingTime: '5-10 days',
    tenure: 'Up to 60 months',
    eligibility: 'Business registration and turnover proof',
    features: ['No collateral for small amounts', 'Flexible repayment', 'Quick approval']
  },
  {
    id: 5,
    name: 'Education Loan',
    icon: '🎓',
    description: 'Finance your education dreams',
    maxAmount: '₹ 25,00,000',
    minAmount: '₹ 50,000',
    interestRate: '8% p.a.',
    processingTime: '7-14 days',
    tenure: 'Up to 15 years',
    eligibility: 'Admission proof from recognized institution',
    features: ['Moratorium period', 'Tax benefits', 'Co-applicant option']
  },
  {
    id: 6,
    name: 'Gold Loan',
    icon: '🥇',
    description: 'Secure loans against gold',
    maxAmount: '₹ 5,00,000',
    minAmount: '₹ 10,000',
    interestRate: '10% p.a.',
    processingTime: 'Same day',
    tenure: 'Up to 36 months',
    eligibility: 'Pure gold ornaments (18k-24k)',
    features: ['Instant approval', 'Low interest rates', 'No income proof required']
  }
];

export const loanStatuses = [
  {
    id: 1,
    loanType: 'Personal Loan',
    amount: '₹ 2,00,000',
    status: 'Approved',
    date: '15 Jan 2026',
    nextEMI: '₹ 4,500 on 5th Feb'
  },
  {
    id: 2,
    loanType: 'Credit Card',
    amount: '₹ 50,000',
    status: 'Active',
    date: '10 Dec 2025',
    nextEMI: '₹ 3,000 on 15th Jan'
  }
];

export const userConstants = {
  name: 'Samad Khan',
  email: 'samad@example.com',
  mobile: '+91 9876543210',
  pan: 'ABCDP1234E',
  aadhaar: '1234 5678 9012',
  address: '123, Main Street, Mumbai, Maharashtra, 400001',
  bankAccount: 'XXXXXX1234',
  ifscCode: 'HDFC0000123',
  profilePic: null
};

export const dashboardData = {
  availableCredit: '₹ 50,000',
  utilizedCredit: '₹ 0',
  totalCredit: '₹ 50,000',
  pendingEMI: '₹ 0',
  paidEMI: '₹ 0',
  dueEMI: '₹ 0',
  quickActions: [
    { id: 1, name: 'Apply Loan', icon: '💳', color: '#2563EB' },
    { id: 2, name: 'EMI Calculator', icon: '📊', color: '#10B981' },
    { id: 3, name: 'Track Status', icon: '📱', color: '#F59E0B' },
    { id: 4, name: 'Documents', icon: '📄', color: '#8B5CF6' }
  ],
  recentActivities: [
    {
      id: 1,
      type: 'Loan Approved',
      amount: '+₹ 25,000',
      date: '2 days ago',
      status: 'Approved',
      icon: '✅'
    },
    {
      id: 2,
      type: 'EMI Due',
      amount: '-₹ 2,500',
      date: 'Tomorrow',
      status: 'Due',
      icon: '📅'
    },
    {
      id: 3,
      type: 'Document Uploaded',
      amount: '',
      date: '1 week ago',
      status: 'Completed',
      icon: '📁'
    }
  ]
};