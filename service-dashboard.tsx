'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Wrench, LogOut, Star, MapPin, Clock, Phone, Mail, Building, TrendingUp, Users, CheckCircle, AlertCircle, User, FileText, Bell, Settings, Calendar, CreditCard, MessageSquare, Camera, Shield, Award, Calculator, DollarSign, Crown, BarChart3, Target, Zap, Download, Eye, Filter } from 'lucide-react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { getCurrentUser, logout, type User, testOrders, hasFeature, getCommissionRate, isPremiumUser, isExclusivUser } from '@/lib/auth'

export default function ServiceDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [activeOrderTab, setActiveOrderTab] = useState('new')
  const [analyticsDateRange, setAnalyticsDateRange] = useState('30')
  const router = useRouter()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || currentUser.type !== 'service') {
      router.push('/login/service')
      return
    }
    setUser(currentUser)
  }, [router])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Se încarcă...</div>
  }

  // Enhanced service data with premium features
  const enhancedUser = {
    ...user,
    totalEarnings: 24500,
    monthlyEarnings: 8450,
    avgResponseTime: '15 min',
    completionRate: 98,
    repeatCustomers: 67,
    certifications: ['ASE Certified', 'Bosch Partner', 'Dacia Specialist'],
    workingHours: 'L-V: 08:00-18:00, S: 09:00-15:00',
    emergencyService: true,
    mobileService: false
  }

  // Enhanced orders with premium priority
  const enhancedOrders = [
    {
      id: 'REQ-2025-001',
      clientName: 'Maria Ionescu',
      clientPhone: '+40721234567',
      vehicle: 'Dacia Logan 2019',
      mileage: 85000,
      serviceType: 'Service complet',
      description: 'Service complet cu schimb ulei, filtre și verificare generală. Mașina face un zgomot ciudat la pornire.',
      urgency: 'normal',
      location: {
        address: 'Piața Victoriei, București',
        distance: '1.2 km'
      },
      budget: '300-400 RON',
      preferredDate: '2025-01-08',
      status: 'new',
      createdAt: '2025-01-07T14:20:00Z',
      photos: ['/car-issue-photo1.png', '/car-issue-photo2.png'],
      clientRating: null,
      estimatedDuration: '2-3 ore',
      isPremiumClient: true // Premium clients for premium services
    },
    {
      id: 'REQ-2025-002',
      clientName: 'Alexandru Popescu',
      clientPhone: '+40721234568',
      vehicle: 'Renault Clio 2021',
      mileage: 35000,
      serviceType: 'Diagnosticare',
      description: 'Zgomot ciudat la frânare, mai ales dimineața când e rece. Pedalele vibrează.',
      urgency: 'urgent',
      location: {
        address: 'Calea Victoriei 150, București',
        distance: '2.1 km'
      },
      budget: '50-100 RON',
      preferredDate: '2025-01-08',
      status: 'quoted',
      createdAt: '2025-01-07T09:15:00Z',
      myQuote: {
        price: 85,
        estimatedTime: '45 min',
        description: 'Diagnosticare computerizată completă cu verificare sistem frânare',
        warranty: '6 luni'
      },
      competitorQuotes: 4,
      estimatedDuration: '45 min',
      isPremiumClient: false
    },
    {
      id: 'REQ-2025-003',
      clientName: 'Elena Dumitrescu',
      clientPhone: '+40721234569',
      vehicle: 'BMW X3 2019',
      mileage: 45000,
      serviceType: 'Schimb ulei',
      description: 'Schimb ulei și filtru pentru BMW X3 2019. Prefer ulei sintetic.',
      urgency: 'normal',
      location: {
        address: 'Șoseaua Nordului 42, București',
        distance: '3.5 km'
      },
      budget: '150-200 RON',
      preferredDate: '2025-01-09',
      status: 'accepted',
      createdAt: '2025-01-06T16:30:00Z',
      myQuote: {
        price: 180,
        estimatedTime: '1 oră',
        description: 'Schimb ulei sintetic premium și filtru original BMW',
        warranty: '6 luni'
      },
      progress: 25,
      estimatedCompletion: '2025-01-09T11:00:00Z',
      estimatedDuration: '1 oră',
      isPremiumClient: true
    }
  ]

  // Performance metrics with premium insights
  const performanceMetrics = {
    responseRate: 95,
    quoteAcceptanceRate: isPremiumUser() ? 85 : 78, // Premium users get better acceptance
    onTimeCompletion: 96,
    customerSatisfaction: 4.8,
    repeatCustomerRate: isPremiumUser() ? 75 : 67, // Premium users get more repeat customers
    premiumClientPercentage: isPremiumUser() ? 45 : 0
  }

  // Advanced analytics data (only for premium/exclusiv)
  const analyticsData = {
    monthlyRevenue: [
      { month: 'Ian', revenue: 8450, orders: 23 },
      { month: 'Dec', revenue: 7200, orders: 19 },
      { month: 'Nov', revenue: 6800, orders: 18 },
      { month: 'Oct', revenue: 7500, orders: 21 },
      { month: 'Sep', revenue: 6900, orders: 17 },
      { month: 'Aug', revenue: 8100, orders: 22 }
    ],
    clientTypes: {
      premium: 45,
      standard: 55
    },
    serviceTypes: {
      'Service complet': 35,
      'Reparații motor': 25,
      'Schimb ulei': 20,
      'Diagnosticare': 15,
      'Altele': 5
    },
    competitorAnalysis: {
      averagePrice: 320,
      yourAveragePrice: isPremiumUser() ? 340 : 310,
      winRate: isPremiumUser() ? 78 : 65
    }
  }

  const serviceOrders = testOrders.filter(order => order.serviceId === user.id || order.offers.some(offer => offer.serviceId === user.id))

  // Premium badge component
  const PremiumBadge = () => {
    if (!isPremiumUser()) return null
    
    return (
      <Badge className={`${
        isExclusivUser() 
          ? 'bg-gradient-to-r from-purple-500 to-purple-700 text-white' 
          : 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white'
      }`}>
        <Crown className="h-3 w-3 mr-1" />
        {isExclusivUser() ? 'EXCLUSIV' : 'PREMIUM'}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Wrench className="h-8 w-8 text-orange-600" />
            <span className="text-2xl font-bold text-gray-900">CarNect</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <Shield className="h-3 w-3 mr-1" />
              Service verificat
            </Badge>
            <PremiumBadge />
            {!isPremiumUser() && (
              <Link href="/premium-partner">
                <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                  <Crown className="h-4 w-4 mr-2" />
                  Devino Premium
                </Button>
              </Link>
            )}
            <span className="text-sm text-gray-600">Bun venit, {user.companyName}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Ieșire
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className={isPremiumUser() ? 'border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50' : ''}>
              <CardHeader className="text-center">
                <div className="mx-auto bg-orange-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mb-4">
                  <Building className="h-10 w-10 text-orange-600" />
                </div>
                <CardTitle className="text-xl">{user.companyName}</CardTitle>
                <CardDescription className="flex items-center justify-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span>{user.rating} ({user.completedJobs} lucrări)</span>
                </CardDescription>
                <div className="flex justify-center space-x-1 mt-2">
                  {enhancedUser.certifications.slice(0, 2).map((cert, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
                {isPremiumUser() && (
                  <div className="mt-3 p-2 bg-yellow-100 rounded-lg">
                    <p className="text-xs text-yellow-800 font-medium">
                      Plan {isExclusivUser() ? 'Exclusiv' : 'Premium'} activ
                    </p>
                    <p className="text-xs text-yellow-600">
                      Comision: {getCommissionRate()}%
                    </p>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      activeTab === 'overview' ? 'bg-orange-100 text-orange-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <TrendingUp className="h-4 w-4 inline mr-2" />
                    Prezentare generală
                  </button>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      activeTab === 'orders' ? 'bg-orange-100 text-orange-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <FileText className="h-4 w-4 inline mr-2" />
                    Cereri de service
                    {enhancedOrders.filter(o => o.status === 'new').length > 0 && (
                      <Badge className="ml-2 bg-orange-600 text-white text-xs">
                        {enhancedOrders.filter(o => o.status === 'new').length}
                      </Badge>
                    )}
                    {isPremiumUser() && (
                      <Badge className="ml-1 bg-yellow-500 text-white text-xs">
                        PRIORITATE
                      </Badge>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('my-jobs')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      activeTab === 'my-jobs' ? 'bg-orange-100 text-orange-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <Wrench className="h-4 w-4 inline mr-2" />
                    Lucrările mele
                  </button>
                  {hasFeature('advancedAnalytics') && (
                    <button
                      onClick={() => setActiveTab('analytics')}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeTab === 'analytics' ? 'bg-orange-100 text-orange-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <BarChart3 className="h-4 w-4 inline mr-2" />
                      Analize Avansate
                      <Badge className="ml-2 bg-purple-500 text-white text-xs">
                        PREMIUM
                      </Badge>
                    </button>
                  )}
                  <button
                    onClick={() => setActiveTab('customers')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      activeTab === 'customers' ? 'bg-orange-100 text-orange-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <Users className="h-4 w-4 inline mr-2" />
                    Clienții mei
                  </button>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      activeTab === 'profile' ? 'bg-orange-100 text-orange-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <User className="h-4 w-4 inline mr-2" />
                    Profilul meu
                  </button>
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      activeTab === 'notifications' ? 'bg-orange-100 text-orange-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <Bell className="h-4 w-4 inline mr-2" />
                    Notificări
                    {hasFeature('dedicatedSupport') && (
                      <Badge className="ml-2 bg-green-500 text-white text-xs">
                        PRIORITAR
                      </Badge>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      activeTab === 'settings' ? 'bg-orange-100 text-orange-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <Settings className="h-4 w-4 inline mr-2" />
                    Setări
                  </button>
                  {!isPremiumUser() && (
                    <button
                      onClick={() => window.open('/premium-partner', '_blank')}
                      className="w-full text-left px-3 py-2 rounded-lg transition-colors bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 hover:from-yellow-200 hover:to-orange-200 border border-yellow-300"
                    >
                      <Crown className="h-4 w-4 inline mr-2" />
                      Upgrade la Premium
                      <Badge className="ml-2 bg-yellow-600 text-white text-xs">
                        POPULAR
                      </Badge>
                    </button>
                  )}
                  {hasFeature('betaAccess') && (
                    <button
                      onClick={() => setActiveTab('beta')}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeTab === 'beta' ? 'bg-purple-100 text-purple-700' : 'hover:bg-purple-50'
                      } border border-purple-200`}
                    >
                      <Zap className="h-4 w-4 inline mr-2" />
                      Beta Features
                      <Badge className="ml-2 bg-purple-600 text-white text-xs">
                        EXCLUSIV
                      </Badge>
                    </button>
                  )}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Service</h1>
                    <p className="text-gray-600">Bun venit în panoul tău de partener CarNect!</p>
                  </div>
                  {isPremiumUser() && (
                    <div className="text-right">
                      <Badge className={`${
                        isExclusivUser() 
                          ? 'bg-gradient-to-r from-purple-500 to-purple-700' 
                          : 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                      } text-white text-lg px-4 py-2`}>
                        <Crown className="h-5 w-5 mr-2" />
                        {isExclusivUser() ? 'EXCLUSIV' : 'PREMIUM'} ACTIV
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Enhanced Stats Cards with Premium Features */}
                <div className="grid md:grid-cols-4 gap-6">
                  <Card className={isPremiumUser() ? 'border-2 border-green-200 bg-green-50' : ''}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Venit lunar</p>
                          <p className="text-2xl font-bold text-green-600">{enhancedUser.monthlyEarnings} RON</p>
                          <p className="text-xs text-green-500">
                            +{isPremiumUser() ? '18%' : '12%'} vs luna trecută
                          </p>
                          {isPremiumUser() && (
                            <p className="text-xs text-green-700 font-medium">
                              Comision: {getCommissionRate()}% (economii: {Math.round(enhancedUser.monthlyEarnings * (8 - getCommissionRate()) / 100)} RON)
                            </p>
                          )}
                        </div>
                        <DollarSign className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={isPremiumUser() ? 'border-2 border-orange-200 bg-orange-50' : ''}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Cereri noi</p>
                          <p className="text-2xl font-bold text-orange-600">
                            {enhancedOrders.filter(o => o.status === 'new').length}
                          </p>
                          <p className="text-xs text-orange-500">
                            {isPremiumUser() ? 'Prioritate în căutări' : 'Disponibile acum'}
                          </p>
                          {isPremiumUser() && (
                            <p className="text-xs text-orange-700 font-medium">
                              {enhancedOrders.filter(o => o.status === 'new' && o.isPremiumClient).length} clienți premium
                            </p>
                          )}
                        </div>
                        <AlertCircle className="h-8 w-8 text-orange-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Rating mediu</p>
                          <p className="text-2xl font-bold text-yellow-600 flex items-center">
                            {user.rating}
                            <Star className="h-5 w-5 text-yellow-500 fill-current ml-1" />
                          </p>
                          <p className="text-xs text-yellow-500">{performanceMetrics.customerSatisfaction}/5.0</p>
                        </div>
                        <Star className="h-8 w-8 text-yellow-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Rata acceptare</p>
                          <p className="text-2xl font-bold text-blue-600">{performanceMetrics.quoteAcceptanceRate}%</p>
                          <p className="text-xs text-blue-500">
                            {isPremiumUser() ? '+7% vs standard' : 'Ultimele 30 zile'}
                          </p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Premium Features Showcase */}
                {isPremiumUser() && (
                  <Card className="border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Crown className="h-6 w-6 text-yellow-600" />
                        <span>Beneficiile tale Premium</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                          <Target className="h-8 w-8 text-green-600" />
                          <div>
                            <p className="font-medium text-gray-900">Prioritate în căutări</p>
                            <p className="text-sm text-gray-600">Apari în top 3 rezultate</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                          <DollarSign className="h-8 w-8 text-blue-600" />
                          <div>
                            <p className="font-medium text-gray-900">Comision redus</p>
                            <p className="text-sm text-gray-600">Doar {getCommissionRate()}% în loc de 8%</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                          <Zap className="h-8 w-8 text-purple-600" />
                          <div>
                            <p className="font-medium text-gray-900">Rotație automată</p>
                            <p className="text-sm text-gray-600">În sidebar-ul premium</p>
                          </div>
                        </div>
                      </div>
                      {isExclusivUser() && (
                        <div className="mt-4 p-4 bg-purple-100 rounded-lg border border-purple-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <Crown className="h-5 w-5 text-purple-600" />
                            <span className="font-semibold text-purple-800">Beneficii Exclusive</span>
                          </div>
                          <div className="grid md:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-purple-600" />
                              <span>Poziție fixă în top 3</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-purple-600" />
                              <span>Promovare în homepage</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-purple-600" />
                              <span>Manager de cont dedicat</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-purple-600" />
                              <span>Acces la beta features</span>
                            </div>
                          </div>
                          {user.premiumFeatures?.accountManager && (
                            <div className="mt-3 p-2 bg-white rounded border">
                              <p className="text-sm font-medium text-purple-800">Manager de cont:</p>
                              <p className="text-sm text-purple-600">{user.premiumFeatures.accountManager}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Performance Metrics with Premium Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-orange-600" />
                      <span>Performanța ta</span>
                      {isPremiumUser() && (
                        <Badge className="bg-yellow-500 text-white">
                          Îmbunătățită cu Premium
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Rata de răspuns</span>
                            <span className="font-medium">{performanceMetrics.responseRate}%</span>
                          </div>
                          <Progress value={performanceMetrics.responseRate} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Oferte acceptate</span>
                            <span className="font-medium">{performanceMetrics.quoteAcceptanceRate}%</span>
                          </div>
                          <Progress value={performanceMetrics.quoteAcceptanceRate} className="h-2" />
                          {isPremiumUser() && (
                            <p className="text-xs text-green-600 mt-1">+7% față de utilizatorii standard</p>
                          )}
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Finalizare la timp</span>
                            <span className="font-medium">{performanceMetrics.onTimeCompletion}%</span>
                          </div>
                          <Progress value={performanceMetrics.onTimeCompletion} className="h-2" />
                        </div>
                        {isPremiumUser() && (
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Clienți premium</span>
                              <span className="font-medium">{performanceMetrics.premiumClientPercentage}%</span>
                            </div>
                            <Progress value={performanceMetrics.premiumClientPercentage} className="h-2 bg-yellow-200" />
                            <p className="text-xs text-yellow-600 mt-1">Clienți cu buget mai mare</p>
                          </div>
                        )}
                      </div>
                      <div className="space-y-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{enhancedUser.avgResponseTime}</div>
                          <div className="text-sm text-gray-600">Timp mediu de răspuns</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{performanceMetrics.repeatCustomerRate}%</div>
                          <div className="text-sm text-gray-600">Clienți care revin</div>
                          {isPremiumUser() && (
                            <div className="text-xs text-blue-600 mt-1">+8% vs standard</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Premium Service Requests with Priority */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AlertCircle className="h-5 w-5 text-purple-600" />
                      <span>Cereri de service</span>
                      {isPremiumUser() && (
                        <Badge className="bg-purple-500 text-white">
                          Cu prioritate
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {enhancedOrders.filter(o => o.status === 'new').length > 0 ? (
                      <div className="space-y-4">
                        {enhancedOrders.filter(o => o.status === 'new').slice(0, 2).map((order) => (
                          <div key={order.id} className={`p-4 border rounded-lg ${
                            order.isPremiumClient && isPremiumUser() 
                              ? 'border-yellow-300 bg-yellow-50' 
                              : 'border-purple-200 bg-purple-50'
                          }`}>
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <div className="flex items-center space-x-2 mb-1">
                                  <h4 className="font-semibold text-purple-800">{order.serviceType}</h4>
                                  {order.isPremiumClient && isPremiumUser() && (
                                    <Badge className="bg-yellow-500 text-white text-xs">
                                      CLIENT PREMIUM
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-purple-700">{order.vehicle} • {order.clientName}</p>
                                <p className="text-sm text-purple-600 mt-1">{order.description.substring(0, 100)}...</p>
                              </div>
                              <div className="text-right">
                                <Badge variant="outline" className="text-purple-600 border-purple-300 mb-2">
                                  {order.urgency === 'urgent' ? 'Urgent' : 'Normal'}
                                </Badge>
                                <p className="text-sm font-medium text-purple-800">{order.budget}</p>
                                {order.isPremiumClient && isPremiumUser() && (
                                  <p className="text-xs text-yellow-600 font-medium">Buget flexibil</p>
                                )}
                              </div>
                            </div>
                            
                            <div className="grid md:grid-cols-3 gap-4 text-xs text-purple-600 mb-3">
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-3 w-3" />
                                <span>{order.location.address} • {order.location.distance}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>Preferat: {order.preferredDate}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>Estimat: {order.estimatedDuration}</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="text-xs text-purple-500">
                                Creat: {new Date(order.createdAt).toLocaleDateString('ro-RO')}
                                {order.photos && <span> • {order.photos.length} foto(e)</span>}
                                {isPremiumUser() && (
                                  <span className="ml-2 text-yellow-600 font-medium">
                                    • Prioritate Premium
                                  </span>
                                )}
                              </div>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline" className="text-purple-600 border-purple-300">
                                  <Phone className="h-3 w-3 mr-1" />
                                  Sună client
                                </Button>
                                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                                  Trimite ofertă
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-4">Nu sunt cereri noi disponibile în acest moment.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Advanced Analytics Tab (Premium/Exclusiv only) */}
            {activeTab === 'analytics' && hasFeature('advancedAnalytics') && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Analize Avansate</h1>
                    <p className="text-gray-600">Statistici detaliate și insights pentru afacerea ta</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <select 
                      value={analyticsDateRange}
                      onChange={(e) => setAnalyticsDateRange(e.target.value)}
                      className="p-2 border rounded-lg"
                    >
                      <option value="7">Ultimele 7 zile</option>
                      <option value="30">Ultimele 30 zile</option>
                      <option value="90">Ultimele 90 zile</option>
                      <option value="365">Ultimul an</option>
                    </select>
                    {hasFeature('weeklyReports') && (
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        <Download className="h-4 w-4 mr-2" />
                        Export raport
                      </Button>
                    )}
                  </div>
                </div>

                {/* Revenue Analytics */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Evoluția veniturilor</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {analyticsData.monthlyRevenue.map((month, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{month.month}</span>
                            <div className="flex items-center space-x-4">
                              <span className="text-sm font-medium">{month.orders} comenzi</span>
                              <span className="text-lg font-bold text-green-600">{month.revenue} RON</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Tipuri de clienți</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Clienți Premium</span>
                            <span className="font-medium">{analyticsData.clientTypes.premium}%</span>
                          </div>
                          <Progress value={analyticsData.clientTypes.premium} className="h-3 bg-yellow-200" />
                          <p className="text-xs text-yellow-600 mt-1">Buget mediu cu 40% mai mare</p>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Clienți Standard</span>
                            <span className="font-medium">{analyticsData.clientTypes.standard}%</span>
                          </div>
                          <Progress value={analyticsData.clientTypes.standard} className="h-3" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Service Types Analytics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Distribuția serviciilor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-5 gap-4">
                      {Object.entries(analyticsData.serviceTypes).map(([service, percentage]) => (
                        <div key={service} className="text-center">
                          <div className="text-2xl font-bold text-orange-600">{percentage}%</div>
                          <div className="text-sm text-gray-600">{service}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Competitor Analysis (Exclusiv only) */}
                {isExclusivUser() && (
                  <Card className="border-2 border-purple-200 bg-purple-50">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Target className="h-5 w-5 text-purple-600" />
                        <span>Analiza competiției</span>
                        <Badge className="bg-purple-600 text-white">EXCLUSIV</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-white rounded-lg">
                          <div className="text-2xl font-bold text-gray-900">{analyticsData.competitorAnalysis.averagePrice} RON</div>
                          <div className="text-sm text-gray-600">Preț mediu piață</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">{analyticsData.competitorAnalysis.yourAveragePrice} RON</div>
                          <div className="text-sm text-gray-600">Prețul tău mediu</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{analyticsData.competitorAnalysis.winRate}%</div>
                          <div className="text-sm text-gray-600">Rata de câștig</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Beta Features Tab (Exclusiv only) */}
            {activeTab === 'beta' && hasFeature('betaAccess') && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Beta Features</h1>
                  <p className="text-gray-600">Funcționalități experimentale disponibile doar pentru membrii Exclusiv</p>
                </div>

                <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="h-6 w-6 text-purple-600" />
                      <span>AI Assistant pentru Oferte</span>
                      <Badge className="bg-purple-600 text-white">BETA</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">
                      Asistentul nostru AI analizează cererea clientului și îți sugerează automat prețul optim și timpul de lucru.
                    </p>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Zap className="h-4 w-4 mr-2" />
                      Activează AI Assistant
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Eye className="h-6 w-6 text-purple-600" />
                      <span>Predictive Analytics</span>
                      <Badge className="bg-purple-600 text-white">BETA</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">
                      Previziuni despre cererea de servicii în zona ta bazate pe date istorice și tendințe sezoniere.
                    </p>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Eye className="h-4 w-4 mr-2" />
                      Vezi previziuni
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Filter className="h-6 w-6 text-purple-600" />
                      <span>Smart Filtering</span>
                      <Badge className="bg-purple-600 text-white">BETA</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">
                      Filtrare inteligentă a cererilor bazată pe profilul tău de serviciu și rata de succes istorică.
                    </p>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Filter className="h-4 w-4 mr-2" />
                      Configurează filtre
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Continue with other existing tabs... */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-gray-900">Cereri de service</h1>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">
                      {enhancedOrders.filter(o => o.status === 'new').length} cereri noi
                    </Badge>
                    {isPremiumUser() && (
                      <Badge className="bg-yellow-500 text-white">
                        PRIORITATE PREMIUM
                      </Badge>
                    )}
                  </div>
                </div>

                <Tabs value={activeOrderTab} onValueChange={setActiveOrderTab}>
                  <TabsList>
                    <TabsTrigger value="new">
                      Noi ({enhancedOrders.filter(o => o.status === 'new').length})
                      {isPremiumUser() && <Crown className="h-3 w-3 ml-1 text-yellow-500" />}
                    </TabsTrigger>
                    <TabsTrigger value="quoted">
                      Ofertat ({enhancedOrders.filter(o => o.status === 'quoted').length})
                    </TabsTrigger>
                    <TabsTrigger value="accepted">
                      Acceptate ({enhancedOrders.filter(o => o.status === 'accepted').length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="new" className="space-y-4">
                    {enhancedOrders.filter(o => o.status === 'new').map((order) => (
                      <Card key={order.id} className={`hover:shadow-lg transition-shadow ${
                        order.isPremiumClient && isPremiumUser() ? 'border-2 border-yellow-300 bg-yellow-50' : ''
                      }`}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="text-xl font-semibold">{order.serviceType}</h3>
                                {order.urgency === 'urgent' && (
                                  <Badge variant="destructive">Urgent</Badge>
                                )}
                                {order.isPremiumClient && isPremiumUser() && (
                                  <Badge className="bg-yellow-500 text-white">
                                    <Crown className="h-3 w-3 mr-1" />
                                    CLIENT PREMIUM
                                  </Badge>
                                )}
                                {isPremiumUser() && (
                                  <Badge className="bg-green-500 text-white">
                                    PRIORITATE
                                  </Badge>
                                )}
                              </div>
                              <p className="text-gray-600 mb-1">{order.vehicle} • {order.mileage.toLocaleString()} km</p>
                              <p className="text-sm text-gray-500">Client: {order.clientName}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-orange-600">{order.budget}</p>
                              <p className="text-sm text-gray-500">buget client</p>
                              {order.isPremiumClient && isPremiumUser() && (
                                <p className="text-xs text-yellow-600 font-medium">Buget flexibil</p>
                              )}
                            </div>
                          </div>

                          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">{order.description}</p>
                          </div>

                          <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <div>
                                <p className="font-medium">{order.location.address}</p>
                                <p className="text-gray-500">{order.location.distance} de la tine</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <div>
                                <p className="font-medium">Data preferată</p>
                                <p className="text-gray-500">{order.preferredDate}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <div>
                                <p className="font-medium">Durată estimată</p>
                                <p className="text-gray-500">{order.estimatedDuration}</p>
                              </div>
                            </div>
                          </div>

                          {order.photos && order.photos.length > 0 && (
                            <div className="mb-4">
                              <p className="text-sm font-medium text-gray-600 mb-2">Fotografii atașate:</p>
                              <div className="flex space-x-2">
                                {order.photos.map((photo, index) => (
                                  <div key={index} className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <Camera className="h-6 w-6 text-gray-400" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="text-sm text-gray-500">
                              <span>Cerere #{order.id}</span>
                              <span className="mx-2">•</span>
                              <span>{new Date(order.createdAt).toLocaleDateString('ro-RO')}</span>
                              {isPremiumUser() && (
                                <>
                                  <span className="mx-2">•</span>
                                  <span className="text-yellow-600 font-medium">Prioritate Premium</span>
                                </>
                              )}
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Phone className="h-4 w-4 mr-1" />
                                Sună: {order.clientPhone}
                              </Button>
                              <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                                Trimite ofertă
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="quoted" className="space-y-4">
                    {enhancedOrders.filter(o => o.status === 'quoted').map((order) => (
                      <Card key={order.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-semibold">{order.serviceType}</h3>
                              <p className="text-gray-600">{order.vehicle} • {order.clientName}</p>
                            </div>
                            <div className="text-right">
                              <Badge variant="secondary">Ofertă trimisă</Badge>
                              <p className="text-sm text-gray-500 mt-1">
                                Concurezi cu {order.competitorQuotes} alte oferte
                              </p>
                              {isPremiumUser() && (
                                <p className="text-xs text-green-600 font-medium">
                                  Avantaj premium în competiție
                                </p>
                              )}
                            </div>
                          </div>

                          {order.myQuote && (
                            <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-orange-800">Oferta ta</span>
                                <span className="text-2xl font-bold text-orange-600">{order.myQuote.price} RON</span>
                              </div>
                              <p className="text-sm text-orange-700 mb-2">{order.myQuote.description}</p>
                              <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-orange-600">Timp estimat:</span>
                                  <span className="ml-2 font-medium">{order.myQuote.estimatedTime}</span>
                                </div>
                                <div>
                                  <span className="text-orange-600">Garanție:</span>
                                  <span className="ml-2 font-medium">{order.myQuote.warranty}</span>
                                </div>
                              </div>
                              {isPremiumUser() && (
                                <div className="mt-2 p-2 bg-yellow-100 rounded border">
                                  <p className="text-xs text-yellow-800">
                                    <Crown className="h-3 w-3 inline mr-1" />
                                    Comision redus: {getCommissionRate()}% (economii: {Math.round(order.myQuote.price * (8 - getCommissionRate()) / 100)} RON)
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                              Trimisă: {new Date(order.createdAt).toLocaleDateString('ro-RO')}
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Mesaj client
                              </Button>
                              <Button size="sm" variant="outline">
                                Modifică oferta
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="accepted" className="space-y-4">
                    {enhancedOrders.filter(o => o.status === 'accepted').map((order) => (
                      <Card key={order.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-semibold">{order.serviceType}</h3>
                              <p className="text-gray-600">{order.vehicle} • {order.clientName}</p>
                            </div>
                            <div className="text-right">
                              <Badge className="bg-green-600">Acceptată</Badge>
                              <p className="text-lg font-bold text-green-600 mt-1">{order.myQuote?.price} RON</p>
                              {isPremiumUser() && (
                                <p className="text-xs text-green-700">
                                  Venit net: {Math.round((order.myQuote?.price || 0) * (100 - getCommissionRate()) / 100)} RON
                                </p>
                              )}
                            </div>
                          </div>

                          {order.progress !== undefined && (
                            <div className="mb-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">Progres lucrare</span>
                                <span className="text-blue-600 font-semibold">{order.progress}%</span>
                              </div>
                              <Progress value={order.progress} className="h-3" />
                              <p className="text-sm text-gray-500 mt-2">
                                Finalizare estimată: {new Date(order.estimatedCompletion!).toLocaleDateString('ro-RO')}
                              </p>
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                              Acceptată: {new Date(order.createdAt).toLocaleDateString('ro-RO')}
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Phone className="h-4 w-4 mr-1" />
                                Sună client
                              </Button>
                              <Button size="sm" variant="outline">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Mesaje
                              </Button>
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                Actualizează progres
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {/* My Jobs Tab with Premium Features */}
            {activeTab === 'my-jobs' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wrench className="h-5 w-5 text-orange-600" />
                    <span>Lucrările mele</span>
                    {isPremiumUser() && (
                      <Badge className="bg-yellow-500 text-white">
                        Comision {getCommissionRate()}%
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {serviceOrders.filter(o => o.serviceId === user.id).length > 0 ? (
                    <div className="space-y-4">
                      {serviceOrders.filter(o => o.serviceId === user.id).map((order) => (
                        <div key={order.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-lg">{order.serviceType.replace('_', ' ').toUpperCase()}</h4>
                              <p className="text-sm text-gray-600">{order.description}</p>
                            </div>
                            <div className="text-right">
                              <Badge variant={
                                order.status === 'completed' ? 'default' :
                                order.status === 'in_progress' ? 'secondary' :
                                order.status === 'accepted' ? 'outline' : 'destructive'
                              }>
                                {order.status === 'accepted' && 'Acceptată'}
                                {order.status === 'in_progress' && 'În progres'}
                                {order.status === 'completed' && 'Finalizată'}
                              </Badge>
                              {order.finalCost && (
                                <p className="text-lg font-bold text-green-600 mt-1">{order.finalCost} RON</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>{new Date(order.createdAt).toLocaleDateString('ro-RO')}</span>
                              {order.completedAt && (
                                <span className="text-green-600">→ {new Date(order.completedAt).toLocaleDateString('ro-RO')}</span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Wrench className="h-4 w-4" />
                              <span>{order.mileage.toLocaleString()} km</span>
                            </div>
                            {order.clientRating && (
                              <div className="flex items-center space-x-2">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span>{order.clientRating} stele de la client</span>
                              </div>
                            )}
                          </div>

                          {order.status === 'completed' && (
                            <div className="border-t pt-3">
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <h5 className="font-medium mb-2">Feedback client</h5>
                                  {order.clientRating && (
                                    <div className="flex items-center space-x-2 mb-2">
                                      <span className="text-sm text-gray-600">Rating:</span>
                                      <div className="flex items-center space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                          <Star
                                            key={i}
                                            className={`h-4 w-4 ${
                                              i < order.clientRating! ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                            }`}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  {order.clientReview && (
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                      <p className="text-sm text-gray-700 italic">"{order.clientReview}"</p>
                                    </div>
                                  )}
                                </div>
                                
                                <div>
                                  <h5 className="font-medium mb-2">Notele mele</h5>
                                  {order.serviceNotes ? (
                                    <div className="bg-blue-50 p-3 rounded-lg">
                                      <p className="text-sm text-blue-700">{order.serviceNotes}</p>
                                    </div>
                                  ) : (
                                    <p className="text-sm text-gray-500 italic">Nu ai adăugat note pentru această lucrare.</p>
                                  )}
                                </div>
                              </div>
                              
                              <div className={`mt-4 pt-3 border-t rounded-lg p-3 ${
                                isPremiumUser() ? 'bg-yellow-50' : 'bg-green-50'
                              }`}>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-600">Venit din această lucrare:</span>
                                  <div className="text-right">
                                    <p className="text-sm text-gray-600">Brut: {order.finalCost} RON</p>
                                    <p className={`text-sm ${isPremiumUser() ? 'text-yellow-600' : 'text-red-600'}`}>
                                      Comision: -{Math.round((order.finalCost || 0) * getCommissionRate() / 100)} RON ({getCommissionRate()}%)
                                    </p>
                                    <p className={`font-semibold ${isPremiumUser() ? 'text-yellow-700' : 'text-green-600'}`}>
                                      Net: {Math.round((order.finalCost || 0) * (100 - getCommissionRate()) / 100)} RON
                                    </p>
                                    {isPremiumUser() && (
                                      <p className="text-xs text-yellow-600 mt-1">
                                        Economii vs standard: +{Math.round((order.finalCost || 0) * (8 - getCommissionRate()) / 100)} RON
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">Nu ai încă lucrări.</p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
