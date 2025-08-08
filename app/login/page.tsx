"use client";

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wrench, User, Building, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { authenticateUser } from '@/lib/auth'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showClientPassword, setShowClientPassword] = useState(false)
  const [showServicePassword, setShowServicePassword] = useState(false)
  const router = useRouter()

  const handleClientLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')
    
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    console.log('🔐 Client login attempt:', { email })
    
    try {
      // Validare reală cu contul de test
      const user = authenticateUser(email, password, 'client')
      
      if (user) {
        console.log('✅ Client login successful:', user)
        setSuccess('Login reușit! Te redirectez...')
        
        setTimeout(() => {
          router.push('/client-dashboard')
        }, 1000)
      } else {
        console.log('❌ Client login failed')
        setError('Email sau parolă incorectă!')
      }
    } catch (error) {
      console.error('❌ Login error:', error)
      setError('Eroare la conectare. Încearcă din nou.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleServiceLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')
    
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    console.log('🔐 Service login attempt:', { email })
    
    try {
      // Validare reală cu contul de test
      const user = authenticateUser(email, password, 'service')
      
      if (user) {
        console.log('✅ Service login successful:', user)
        setSuccess('Login reușit! Te redirectez...')
        
        setTimeout(() => {
          router.push('/service-dashboard')
        }, 1000)
      } else {
        console.log('❌ Service login failed')
        setError('Email sau parolă incorectă!')
      }
    } catch (error) {
      console.error('❌ Login error:', error)
      setError('Eroare la conectare. Încearcă din nou.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-4 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8">
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-4 sm:mb-6">
            <Wrench className="h-8 w-8 sm:h-10 sm:w-10 text-orange-600" />
            <span className="text-2xl sm:text-3xl font-bold text-gray-900">CarNect</span>
          </Link>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Conectează-te la contul tău
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Alege tipul de cont pentru a te conecta
          </p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700 text-sm">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700 text-sm">
              {success}
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="client" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-12 sm:h-10">
            <TabsTrigger value="client" className="flex items-center space-x-1 sm:space-x-2 text-sm">
              <User className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Client</span>
            </TabsTrigger>
            <TabsTrigger value="service" className="flex items-center space-x-1 sm:space-x-2 text-sm">
              <Building className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Service</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="client" className="mt-4 sm:mt-6">
            <Card>
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl">Conectare Client</CardTitle>
                <CardDescription className="text-sm">
                  Conectează-te pentru a găsi service-uri auto în zona ta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleClientLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="client-email" className="text-sm font-medium">Email</Label>
                    <Input
                      id="client-email"
                      type="email"
                      placeholder="client@carnect.ro"
                      required
                      name="email"
                      defaultValue="client@carnect.ro"
                      className="h-11 sm:h-10 text-base sm:text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-password" className="text-sm font-medium">Parolă</Label>
                    <div className="relative">
                      <Input
                        id="client-password"
                        type={showClientPassword ? "text" : "password"}
                        placeholder="client123"
                        required
                        name="password"
                        defaultValue="client123"
                        className="h-11 sm:h-10 text-base sm:text-sm pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowClientPassword(!showClientPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showClientPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link href="/forgot-password" className="text-xs sm:text-sm text-orange-600 hover:text-orange-500">
                      Ai uitat parola?
                    </Link>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-orange-600 hover:bg-orange-700 h-11 sm:h-10 text-base sm:text-sm"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Se conectează...' : 'Conectare'}
                  </Button>
                </form>
                <div className="mt-4 text-center">
                  <p className="text-xs sm:text-sm text-gray-600">
                    Nu ai cont?{' '}
                    <Link href="/register" className="text-orange-600 hover:text-orange-500 font-medium">
                      Înregistrează-te aici
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="service" className="mt-4 sm:mt-6">
            <Card>
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl">Conectare Service</CardTitle>
                <CardDescription className="text-sm">
                  Conectează-te la panoul tău de partener CarNect
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleServiceLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="service-email" className="text-sm font-medium">Email</Label>
                    <Input
                      id="service-email"
                      type="email"
                      placeholder="service@carnect.ro"
                      required
                      name="email"
                      defaultValue="service@carnect.ro"
                      className="h-11 sm:h-10 text-base sm:text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service-password" className="text-sm font-medium">Parolă</Label>
                    <div className="relative">
                      <Input
                        id="service-password"
                        type={showServicePassword ? "text" : "password"}
                        placeholder="service123"
                        required
                        name="password"
                        defaultValue="service123"
                        className="h-11 sm:h-10 text-base sm:text-sm pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowServicePassword(!showServicePassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showServicePassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link href="/forgot-password" className="text-xs sm:text-sm text-orange-600 hover:text-orange-500">
                      Ai uitat parola?
                    </Link>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-orange-600 hover:bg-orange-700 h-11 sm:h-10 text-base sm:text-sm"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Se conectează...' : 'Conectare'}
                  </Button>
                </form>
                <div className="mt-4 text-center">
                  <p className="text-xs sm:text-sm text-gray-600">
                    Nu ești încă partener?{' '}
                    <Link href="/register" className="text-orange-600 hover:text-orange-500 font-medium">
                      Devino partener CarNect
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Test Accounts Info - Mobile Optimized */}
        <div className="p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2 text-sm sm:text-base">Conturi de testare:</h4>
          <div className="text-xs sm:text-sm text-blue-700 space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              <p className="font-medium">Client:</p>
              <p className="break-all">client@carnect.ro / client123</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              <p className="font-medium">Service:</p>
              <p className="break-all">service@carnect.ro / service123</p>
            </div>
          </div>
          <p className="text-xs text-blue-600 mt-2">
            💡 Credențialele sunt pre-completate pentru testare rapidă
          </p>
        </div>

        <div className="text-center">
          <Link href="/" className="text-xs sm:text-sm text-gray-600 hover:text-gray-500">
            ← Înapoi la pagina principală
          </Link>
        </div>
      </div>
    </div>
  )
}
