'use client'

import { useState, useEffect } from 'react'
import { Play, Square, BarChart3, Users, CreditCard, Clock, AlertCircle, CheckCircle } from 'lucide-react'
import { transactionSimulator } from '@/lib/testingUtils'

export default function TestingDashboard() {
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState(null)
  const [liveStats, setLiveStats] = useState({
    totalTransactions: 0,
    successfulTransactions: 0,
    failedTransactions: 0,
    avgProcessingTime: 0
  })
  const [testConfig, setTestConfig] = useState({
    duration: 60,
    concurrentUsers: 10,
    ordersPerUser: 3
  })

  // Update live stats
  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        const summary = transactionSimulator.getTestSummary()
        if (summary.totalTransactions > 0) {
          setLiveStats({
            totalTransactions: summary.totalTransactions,
            successfulTransactions: summary.successful,
            failedTransactions: summary.failed,
            avgProcessingTime: Math.round(summary.avgProcessingTime)
          })
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning])

  const startLoadTest = async () => {
    setIsRunning(true)
    transactionSimulator.clearResults()
    setLiveStats({ totalTransactions: 0, successfulTransactions: 0, failedTransactions: 0, avgProcessingTime: 0 })
    
    try {
      const results = await transactionSimulator.runLoadTest({
        duration: testConfig.duration * 1000,
        concurrentUsers: testConfig.concurrentUsers,
        ordersPerUser: testConfig.ordersPerUser
      })
      setTestResults(results)
    } catch (error) {
      console.error('Load test failed:', error)
    } finally {
      setIsRunning(false)
    }
  }

  const stopTest = () => {
    setIsRunning(false)
  }

  const runSingleTransaction = async () => {
    const order = transactionSimulator.generateTestOrder()
    const result = await transactionSimulator.simulateTransaction(order)
    
    // Update live stats
    const summary = transactionSimulator.getTestSummary()
    setLiveStats({
      totalTransactions: summary.totalTransactions,
      successfulTransactions: summary.successful,
      failedTransactions: summary.failed,
      avgProcessingTime: Math.round(summary.avgProcessingTime)
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🧪 ClothingDrop Testing Dashboard
          </h1>
          <p className="text-gray-600">
            Back test your e-commerce platform and simulate real-time transactions
          </p>
        </div>

        {/* Test Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (seconds)
              </label>
              <input
                type="number"
                value={testConfig.duration}
                onChange={(e) => setTestConfig(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isRunning}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Concurrent Users
              </label>
              <input
                type="number"
                value={testConfig.concurrentUsers}
                onChange={(e) => setTestConfig(prev => ({ ...prev, concurrentUsers: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isRunning}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Orders per User
              </label>
              <input
                type="number"
                value={testConfig.ordersPerUser}
                onChange={(e) => setTestConfig(prev => ({ ...prev, ordersPerUser: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isRunning}
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={startLoadTest}
              disabled={isRunning}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="h-4 w-4 mr-2" />
              Start Load Test
            </button>
            
            <button
              onClick={stopTest}
              disabled={!isRunning}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Square className="h-4 w-4 mr-2" />
              Stop Test
            </button>
            
            <button
              onClick={runSingleTransaction}
              disabled={isRunning}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Single Transaction
            </button>
          </div>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900">{liveStats.totalTransactions}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Successful</p>
                <p className="text-2xl font-bold text-green-600">{liveStats.successfulTransactions}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-red-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Failed</p>
                <p className="text-2xl font-bold text-red-600">{liveStats.failedTransactions}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Time (ms)</p>
                <p className="text-2xl font-bold text-purple-600">{liveStats.avgProcessingTime}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Test Results */}
        {testResults && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Test Results</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Performance Metrics</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Test Duration:</span>
                    <span>{Math.round(testResults.testDuration / 1000)}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Concurrent Users:</span>
                    <span>{testResults.concurrentUsers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transactions/sec:</span>
                    <span>{testResults.transactionsPerSecond.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Processing:</span>
                    <span>{Math.round(testResults.avgProcessingTime)}ms</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Transaction Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span>{testResults.totalTransactions}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Successful:</span>
                    <span>{testResults.successfulTransactions}</span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>Failed:</span>
                    <span>{testResults.failedTransactions}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Success Rate:</span>
                    <span>{testResults.successRate.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Status</h3>
                <div className="text-sm">
                  {testResults.successRate >= 95 ? (
                    <div className="text-green-600 font-medium">✅ Excellent Performance</div>
                  ) : testResults.successRate >= 90 ? (
                    <div className="text-yellow-600 font-medium">⚠️ Good Performance</div>
                  ) : (
                    <div className="text-red-600 font-medium">❌ Needs Improvement</div>
                  )}
                  <p className="text-gray-600 mt-2">
                    {testResults.successRate >= 95 
                      ? "Your app is performing excellently under load!"
                      : testResults.successRate >= 90
                      ? "Performance is good but could be optimized."
                      : "Consider optimizing for better performance."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Testing Status */}
        {isRunning && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"></div>
              <span className="text-blue-800 font-medium">
                Load test in progress... ({testConfig.concurrentUsers} users, {testConfig.duration}s duration)
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
