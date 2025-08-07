"use client";

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wrench, User, Building, CheckCircle, AlertCircle, TestTube } from 'lucide-react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { authenticateUser, getCurrentUser, logout, isAuthenticated, getUserType } from '@/lib/auth'

export default function TestLoginPage() {
  const [testResults, setTestResults] = useState<any[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const router = useRouter()

  const runTests = async () => {
    setIsRunning(true)
    const results = []

    // Test 1: Login Client
    console.log('🧪 Testing client login...')
    const clientUser = authenticateUser('client@carnect.ro', 'client123', 'client')
    results.push({
      test: 'Client Login',
      success: clientUser !== null,
      details: clientUser ? `Logat ca: ${clientUser.email}` : 'Login failed'
    })

    // Test 2: Verificare persistență
    const currentUser = getCurrentUser()
    results.push({
      test: 'User Persistence',
      success: currentUser !== null && currentUser.type === 'client',
      details: currentUser ? `User type: ${currentUser.type}` : 'No user found'
    })

    // Test 3: Logout
    logout()
    const afterLogout = getCurrentUser()
    results.push({
      test: 'Logout Function',
      success: afterLogout === null,
      details: afterLogout ? 'Logout failed' : 'Successfully logged out'
    })

    // Test 4: Login Service
    console.log('🧪 Testing service login...')
    const serviceUser = authenticateUser('service@carnect.ro', 'service123', 'service')
    results.push({
      test: 'Service Login',
      success: serviceUser !== null,
      details: serviceUser ? `Logat ca: ${serviceUser.companyName}` : 'Login failed'
    })

    // Test 5: Wrong credentials
    const wrongLogin = authenticateUser('wrong@email.com', 'wrongpass', 'client')
    results.push({
      test: 'Wrong Credentials',
      success: wrongLogin === null,
      details: wrongLogin ? 'Security issue!' : 'Correctly rejected wrong credentials'
    })

    setTestResults(results)
    setIsRunning(false)
  }

  const quickLoginClient = () => {
    const user = authenticateUser('client@carnect.ro', 'client123', 'client')
    if (user) {
      router.push('/client-dashboard')
    }
  }

  const quickLoginService = () => {
    const user = authenticateUser('service@carnect.ro', 'service123', 'service')
    if (user) {
      router.push('/service-dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-6">
            <Wrench className="h-10 w-10 text-orange-600" />
            <span className="text-3xl font-bold text-gray-900">CarNect</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🧪 Pagină de testare - Autentificare
          </h1>
          <p className="text-gray-600">
            Testează funcționalitatea de login cu conturile create
          </p>
        </div>

        {/* Test Accounts Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-blue-600" />
                <span>Cont Client de Test</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div><strong>Email:</strong> client@carnect.ro</div>
                <div><strong>Parolă:</strong> client123</div>
                <div><strong>Nume:</strong> Maria Popescu</div>
                <div><strong>Oraș:</strong> București</div>
              </div>
              <Button 
                onClick={quickLoginClient}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
              >
                <User className="h-4 w-4 mr-2" />
                Login rapid ca Client
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="h-5 w-5 text-orange-600" />
                <span>Cont Service de Test</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div><strong>Email:</strong> service@carnect.ro</div>
                <div><strong>Parolă:</strong> service123</div>
                <div><strong>Companie:</strong> AutoService Test SRL</div>
                <div><strong>Rating:</strong> 4.8 ⭐ (127 lucrări)</div>
              </div>
              <Button 
                onClick={quickLoginService}
                className="w-full mt-4 bg-orange-600 hover:bg-orange-700"
              >
                <Building className="h-4 w-4 mr-2" />
                Login rapid ca Service
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Test Runner */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TestTube className="h-5 w-5 text-purple-600" />
              <span>Rulează teste automate</span>
            </CardTitle>
            <CardDescription>
              Testează toate funcțiile de autentificare
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={runTests}
              disabled={isRunning}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {isRunning ? 'Se rulează testele...' : 'Rulează toate testele'}
            </Button>

            {testResults.length > 0 && (
              <div className="mt-6 space-y-3">
                <h4 className="font-semibold">Rezultate teste:</h4>
                {testResults.map((result, index) => (
                  <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg border ${
                    result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                  }`}>
                    {result.success ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    )}
                    <div>
                      <p className={`font-medium ${result.success ? 'text-green-800' : 'text-red-800'}`}>
                        {result.test}
                      </p>
                      <p className={`text-sm ${result.success ? 'text-green-600' : 'text-red-600'}`}>
                        {result.details}
                      </p>
                    </div>
                    <Badge variant={result.success ? 'default' : 'destructive'}>
                      {result.success ? 'PASS' : 'FAIL'}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-4">
            <Link href="/login">
              <Button variant="outline">
                Pagina de Login normală
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline">
                Pagina de Înregistrare
              </Button>
            </Link>
          </div>
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-500">
            ← Înapoi la pagina principală
          </Link>
        </div>
      </div>
    </div>
  )
}
