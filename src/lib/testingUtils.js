// ClothingDrop Testing Utilities
// Real-time transaction simulation and back testing tools

export class TransactionSimulator {
  constructor() {
    this.isTestMode = process.env.NODE_ENV === 'development'
    this.testResults = []
  }

  // Simulate real-time transactions
  async simulateTransaction(orderData) {
    const startTime = Date.now()
    
    try {
      // Simulate payment processing delay (1-3 seconds)
      const processingTime = Math.random() * 2000 + 1000
      await new Promise(resolve => setTimeout(resolve, processingTime))
      
      // Simulate different transaction outcomes
      const outcome = this.generateTransactionOutcome(orderData)
      
      const endTime = Date.now()
      const result = {
        ...outcome,
        processingTime: endTime - startTime,
        timestamp: new Date().toISOString(),
        orderData
      }
      
      this.testResults.push(result)
      return result
      
    } catch (error) {
      return {
        success: false,
        error: error.message,
        processingTime: Date.now() - startTime,
        timestamp: new Date().toISOString()
      }
    }
  }

  // Generate realistic transaction outcomes
  generateTransactionOutcome(orderData) {
    const { total, paymentMethod, customerType } = orderData
    
    // Simulate different failure scenarios based on realistic conditions
    const scenarios = [
      {
        condition: total > 5000, // High value orders
        successRate: 0.85,
        failures: ['fraud_check', 'manual_review_required']
      },
      {
        condition: paymentMethod === 'card',
        successRate: 0.92,
        failures: ['card_declined', 'insufficient_funds', 'expired_card']
      },
      {
        condition: customerType === 'new',
        successRate: 0.88,
        failures: ['verification_required', 'address_mismatch']
      },
      {
        condition: true, // Default
        successRate: 0.95,
        failures: ['network_error', 'timeout']
      }
    ]
    
    const scenario = scenarios.find(s => s.condition) || scenarios[scenarios.length - 1]
    const isSuccess = Math.random() < scenario.successRate
    
    if (isSuccess) {
      return {
        success: true,
        transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        amount: total,
        currency: 'ZAR',
        status: 'completed',
        paymentMethod
      }
    } else {
      const randomFailure = scenario.failures[Math.floor(Math.random() * scenario.failures.length)]
      return {
        success: false,
        error: randomFailure,
        errorCode: this.getErrorCode(randomFailure),
        amount: total,
        currency: 'ZAR',
        status: 'failed'
      }
    }
  }

  // Map error types to codes
  getErrorCode(errorType) {
    const errorCodes = {
      'card_declined': 'CARD_DECLINED',
      'insufficient_funds': 'INSUFFICIENT_FUNDS',
      'expired_card': 'EXPIRED_CARD',
      'fraud_check': 'FRAUD_SUSPECTED',
      'manual_review_required': 'MANUAL_REVIEW',
      'verification_required': 'VERIFICATION_NEEDED',
      'address_mismatch': 'ADDRESS_MISMATCH',
      'network_error': 'NETWORK_ERROR',
      'timeout': 'TIMEOUT'
    }
    return errorCodes[errorType] || 'UNKNOWN_ERROR'
  }

  // Generate test customer data
  generateTestCustomer() {
    const firstNames = ['Thabo', 'Nomsa', 'Sipho', 'Zanele', 'Mandla', 'Precious', 'Bongani', 'Lindiwe']
    const lastNames = ['Mthembu', 'Dlamini', 'Nkomo', 'Mokoena', 'Khumalo', 'Mahlangu', 'Ndlovu', 'Zulu']
    const locations = ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth', 'Bloemfontein']
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const location = locations[Math.floor(Math.random() * locations.length)]
    
    return {
      id: `cust_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone: `+27${Math.floor(Math.random() * 900000000 + 100000000)}`,
      location,
      customerType: Math.random() > 0.3 ? 'returning' : 'new',
      registrationDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
    }
  }

  // Generate test order data
  generateTestOrder(customer = null) {
    if (!customer) {
      customer = this.generateTestCustomer()
    }
    
    const products = [
      { id: 1, name: 'Classic White T-Shirt', price: 549.99 },
      { id: 2, name: 'Vintage Denim Jacket', price: 1649.99 },
      { id: 3, name: 'Slim Fit Black Jeans', price: 1449.99 },
      { id: 4, name: 'Floral Summer Dress', price: 1099.99 },
      { id: 5, name: 'Cozy Pullover Hoodie', price: 899.99 },
      { id: 6, name: 'Running Sneakers', price: 2399.99 }
    ]
    
    // Generate 1-4 items per order
    const itemCount = Math.floor(Math.random() * 4) + 1
    const orderItems = []
    let total = 0
    
    for (let i = 0; i < itemCount; i++) {
      const product = products[Math.floor(Math.random() * products.length)]
      const quantity = Math.floor(Math.random() * 3) + 1
      const itemTotal = product.price * quantity
      
      orderItems.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        total: itemTotal
      })
      
      total += itemTotal
    }
    
    // Add shipping (free for orders over R1000)
    const shipping = total > 1000 ? 0 : 99.99
    const finalTotal = total + shipping
    
    return {
      orderId: `CD-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      customer,
      items: orderItems,
      subtotal: total,
      shipping,
      total: finalTotal,
      currency: 'ZAR',
      paymentMethod: Math.random() > 0.2 ? 'card' : 'eft',
      deliveryAddress: {
        street: `${Math.floor(Math.random() * 999) + 1} ${['Main', 'Church', 'Market', 'Oak', 'Pine'][Math.floor(Math.random() * 5)]} Street`,
        suburb: ['Sandton', 'Rosebank', 'Melville', 'Greenside', 'Parkhurst'][Math.floor(Math.random() * 5)],
        city: customer.location,
        postalCode: String(Math.floor(Math.random() * 9000) + 1000),
        country: 'South Africa'
      },
      timestamp: new Date().toISOString()
    }
  }

  // Run load testing simulation
  async runLoadTest(options = {}) {
    const {
      duration = 60000, // 1 minute
      concurrentUsers = 10,
      ordersPerUser = 3
    } = options
    
    console.log(`🧪 Starting load test: ${concurrentUsers} users, ${duration/1000}s duration`)
    
    const startTime = Date.now()
    const promises = []
    
    // Create concurrent user sessions
    for (let i = 0; i < concurrentUsers; i++) {
      promises.push(this.simulateUserSession(ordersPerUser, duration))
    }
    
    const results = await Promise.all(promises)
    const endTime = Date.now()
    
    // Compile results
    const totalTransactions = results.reduce((sum, user) => sum + user.transactions.length, 0)
    const successfulTransactions = results.reduce((sum, user) => 
      sum + user.transactions.filter(t => t.success).length, 0)
    const failedTransactions = totalTransactions - successfulTransactions
    
    const avgProcessingTime = results.reduce((sum, user) => 
      sum + user.transactions.reduce((userSum, t) => userSum + t.processingTime, 0), 0) / totalTransactions
    
    return {
      testDuration: endTime - startTime,
      concurrentUsers,
      totalTransactions,
      successfulTransactions,
      failedTransactions,
      successRate: (successfulTransactions / totalTransactions) * 100,
      avgProcessingTime,
      transactionsPerSecond: totalTransactions / ((endTime - startTime) / 1000),
      results
    }
  }

  // Simulate individual user session
  async simulateUserSession(orderCount, maxDuration) {
    const customer = this.generateTestCustomer()
    const transactions = []
    const startTime = Date.now()
    
    for (let i = 0; i < orderCount; i++) {
      // Check if we've exceeded max duration
      if (Date.now() - startTime > maxDuration) break
      
      // Simulate user browsing time (1-10 seconds)
      const browsingTime = Math.random() * 9000 + 1000
      await new Promise(resolve => setTimeout(resolve, browsingTime))
      
      // Generate and process order
      const order = this.generateTestOrder(customer)
      const transaction = await this.simulateTransaction(order)
      transactions.push(transaction)
      
      // Simulate time between orders (5-30 seconds)
      if (i < orderCount - 1) {
        const waitTime = Math.random() * 25000 + 5000
        await new Promise(resolve => setTimeout(resolve, waitTime))
      }
    }
    
    return {
      customer,
      transactions,
      sessionDuration: Date.now() - startTime
    }
  }

  // Get test results summary
  getTestSummary() {
    if (this.testResults.length === 0) {
      return { message: 'No test results available' }
    }
    
    const successful = this.testResults.filter(r => r.success).length
    const failed = this.testResults.length - successful
    const avgProcessingTime = this.testResults.reduce((sum, r) => sum + r.processingTime, 0) / this.testResults.length
    
    const errorTypes = this.testResults
      .filter(r => !r.success)
      .reduce((acc, r) => {
        acc[r.error] = (acc[r.error] || 0) + 1
        return acc
      }, {})
    
    return {
      totalTransactions: this.testResults.length,
      successful,
      failed,
      successRate: (successful / this.testResults.length) * 100,
      avgProcessingTime,
      errorTypes,
      testPeriod: {
        start: this.testResults[0]?.timestamp,
        end: this.testResults[this.testResults.length - 1]?.timestamp
      }
    }
  }

  // Clear test results
  clearResults() {
    this.testResults = []
  }
}

// Export singleton instance
export const transactionSimulator = new TransactionSimulator()

// Utility functions for testing
export const testUtils = {
  // Generate South African test data
  generateSATestData: () => ({
    provinces: ['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape', 'Limpopo', 'Mpumalanga', 'North West', 'Free State', 'Northern Cape'],
    cities: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth', 'Bloemfontein', 'East London', 'Pietermaritzburg', 'Kimberley'],
    postalCodes: ['2000', '8000', '4000', '0001', '6000', '9300', '5200', '3200', '8300'],
    phoneNumbers: () => `+27${Math.floor(Math.random() * 900000000 + 100000000)}`
  }),
  
  // Validate ZAR currency formatting
  validateZARFormat: (amount) => {
    const zarRegex = /^R\s?\d{1,3}(,\d{3})*(\.\d{2})?$/
    return zarRegex.test(amount)
  },
  
  // Generate realistic order timing
  generateOrderTiming: () => {
    const hour = Math.floor(Math.random() * 24)
    const peakHours = [12, 13, 18, 19, 20] // Lunch and evening
    const isPeakTime = peakHours.includes(hour)
    
    return {
      hour,
      isPeakTime,
      expectedVolume: isPeakTime ? 'high' : hour < 6 || hour > 22 ? 'low' : 'medium'
    }
  }
}
