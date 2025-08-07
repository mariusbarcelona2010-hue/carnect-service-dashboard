// Mock authentication and data types for the service dashboard

export interface User {
  id: string
  type: 'client' | 'service'
  email: string
  phone: string
  companyName?: string
  cui?: string
  cif?: string
  contactPerson?: string
  address?: string
  services?: string[]
  rating?: number
  completedJobs?: number
  name?: string
  city?: string
  joinDate?: string
  totalRequests?: number
  completedServices?: number
  savedMoney?: number
  favoriteServices?: number
  // Premium features
  subscriptionPlan?: 'standard' | 'premium' | 'exclusiv'
  subscriptionStartDate?: string
  subscriptionEndDate?: string
  isPremium?: boolean
  isExclusiv?: boolean
  premiumFeatures?: {
    priorityInSearch: boolean
    premiumBadge: boolean
    sidebarRotation: boolean
    reducedCommission: number
    advancedAnalytics: boolean
    dedicatedSupport: boolean
    weeklyReports: boolean
    betaAccess: boolean
    fixedTopPosition: boolean
    homepagePromotion: boolean
    accountManager?: string
  }
}

export interface Order {
  id: string
  clientId: string
  serviceId?: string
  serviceType: string
  description: string
  mileage: number
  location?: {
    address: string
    lat: number
    lng: number
  }
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled'
  createdAt: string
  completedAt?: string
  finalCost?: number
  clientRating?: number
  clientReview?: string
  serviceNotes?: string
  offers: Array<{
    serviceId: string
    price: number
    estimatedTime: string
    notes?: string
  }>
}

// Conturi de testare cu planuri premium
const TEST_ACCOUNTS = {
  client: {
    email: 'client@carnect.ro',
    password: 'client123',
    userData: {
      id: 'client-test-1',
      type: 'client' as const,
      email: 'client@carnect.ro',
      phone: '+40721111111',
      name: 'Maria Popescu',
      city: 'București',
      joinDate: '2024-03-15',
      totalRequests: 12,
      completedServices: 8,
      savedMoney: 1250,
      favoriteServices: 3
    }
  },
  service: {
    email: 'service@carnect.ro', 
    password: 'service123',
    userData: {
      id: 'service-test-1',
      type: 'service' as const,
      email: 'service@carnect.ro',
      phone: '+40722222222',
      companyName: 'AutoService Test SRL',
      cui: 'RO12345678',
      cif: 'J40/1234/2020',
      contactPerson: 'Ion Popescu',
      address: 'Str. Industriei nr. 15, Sector 3, București',
      services: ['service_complet', 'reparatii_motor', 'schimb_ulei'],
      rating: 4.8,
      completedJobs: 127,
      // Premium subscription
      subscriptionPlan: 'premium',
      subscriptionStartDate: '2024-12-01',
      subscriptionEndDate: '2025-12-01',
      isPremium: true,
      isExclusiv: false,
      premiumFeatures: {
        priorityInSearch: true,
        premiumBadge: true,
        sidebarRotation: true,
        reducedCommission: 5, // 5% instead of 8%
        advancedAnalytics: true,
        dedicatedSupport: true,
        weeklyReports: true,
        betaAccess: false,
        fixedTopPosition: false,
        homepagePromotion: false
      }
    }
  }
}

// Service premium pentru testare
export const premiumService = {
  id: 'premium-service-1',
  type: 'service' as const,
  email: 'premium@carnect.ro',
  phone: '+40722333333',
  companyName: 'Premium AutoService SRL',
  cui: 'RO87654321',
  cif: 'J40/5678/2020',
  contactPerson: 'Maria Ionescu',
  address: 'Str. Premium nr. 25, Sector 1, București',
  services: ['service_complet', 'reparatii_motor', 'diagnosticare'],
  rating: 4.9,
  completedJobs: 234,
  subscriptionPlan: 'exclusiv' as const,
  subscriptionStartDate: '2024-11-01',
  subscriptionEndDate: '2025-11-01',
  isPremium: true,
  isExclusiv: true,
  premiumFeatures: {
    priorityInSearch: true,
    premiumBadge: true,
    sidebarRotation: true,
    reducedCommission: 3, // 3% instead of 8%
    advancedAnalytics: true,
    dedicatedSupport: true,
    weeklyReports: true,
    betaAccess: true,
    fixedTopPosition: true,
    homepagePromotion: true,
    accountManager: 'Ana Popescu - ana.popescu@carnect.ro'
  }
}

// Mock user data
const mockServiceUser: User = {
  id: 'service-1',
  type: 'service',
  email: 'contact@autoservice-pro.ro',
  phone: '+40721234567',
  companyName: 'AutoService Pro SRL',
  cui: 'RO12345678',
  cif: 'J40/1234/2020',
  contactPerson: 'Ion Popescu',
  address: 'Str. Industriei nr. 15, Sector 3, București',
  services: ['service_complet', 'reparatii_motor', 'schimb_ulei'],
  rating: 4.8,
  completedJobs: 127
}

// Mock orders data
export const testOrders: Order[] = [
  {
    id: 'order-1',
    clientId: 'client-1',
    serviceId: 'service-1',
    serviceType: 'service_complet',
    description: 'Service complet pentru Dacia Logan 2018. Necesită schimb ulei, filtre și verificare generală.',
    mileage: 85000,
    location: {
      address: 'Piața Victoriei, București',
      lat: 44.4518,
      lng: 26.0854
    },
    status: 'completed',
    createdAt: '2025-01-05T10:00:00Z',
    completedAt: '2025-01-06T16:30:00Z',
    finalCost: 350,
    clientRating: 5,
    clientReview: 'Serviciu excelent, foarte profesionali și punctuali!',
    serviceNotes: 'S-au înlocuit uleiul, filtrul de ulei, filtrul de aer și s-a verificat sistemul de frânare.',
    offers: []
  },
  {
    id: 'order-2',
    clientId: 'client-2',
    serviceType: 'reparatii_motor',
    description: 'Probleme la pornire, motor care se oprește intermitent. Ford Focus 2015.',
    mileage: 120000,
    location: {
      address: 'Calea Victoriei 150, București',
      lat: 44.4378,
      lng: 26.0969
    },
    status: 'pending',
    createdAt: '2025-01-07T14:20:00Z',
    offers: []
  },
  {
    id: 'order-3',
    clientId: 'client-3',
    serviceId: 'service-1',
    serviceType: 'schimb_ulei',
    description: 'Schimb ulei și filtru pentru BMW X3 2019.',
    mileage: 45000,
    location: {
      address: 'Șoseaua Nordului 42, București',
      lat: 44.5126,
      lng: 26.0735
    },
    status: 'in_progress',
    createdAt: '2025-01-07T09:15:00Z',
    finalCost: 180,
    offers: []
  },
  {
    id: 'order-4',
    clientId: 'client-4',
    serviceType: 'service_complet',
    description: 'Service periodic pentru Volkswagen Golf 2020. Include toate verificările necesare.',
    mileage: 35000,
    location: {
      address: 'Bulevardul Unirii 25, București',
      lat: 44.4267,
      lng: 26.1025
    },
    status: 'pending',
    createdAt: '2025-01-07T16:45:00Z',
    offers: []
  }
]

// Funcție de login cu validare reală
export function authenticateUser(email: string, password: string, userType: 'client' | 'service'): User | null {
  const account = TEST_ACCOUNTS[userType]
  
  if (account.email === email && account.password === password) {
    // Salvez în localStorage pentru persistență
    if (typeof window !== 'undefined') {
      localStorage.setItem('carnect_user', JSON.stringify(account.userData))
      localStorage.setItem('carnect_user_type', userType)
    }
    return account.userData
  }
  
  return null
}

// Actualizez funcția getCurrentUser pentru a citi din localStorage
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  
  try {
    const userData = localStorage.getItem('carnect_user')
    if (userData) {
      return JSON.parse(userData)
    }
  } catch (error) {
    console.error('Error reading user data:', error)
  }
  
  return null
}

// Funcție pentru upgrade la premium
export function upgradeUserToPremium(plan: 'premium' | 'exclusiv'): boolean {
  if (typeof window === 'undefined') return false
  
  try {
    const userData = localStorage.getItem('carnect_user')
    if (userData) {
      const user = JSON.parse(userData)
      
      // Update user with premium features
      user.subscriptionPlan = plan
      user.subscriptionStartDate = new Date().toISOString()
      user.subscriptionEndDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year
      user.isPremium = true
      user.isExclusiv = plan === 'exclusiv'
      
      if (plan === 'premium') {
        user.premiumFeatures = {
          priorityInSearch: true,
          premiumBadge: true,
          sidebarRotation: true,
          reducedCommission: 5,
          advancedAnalytics: true,
          dedicatedSupport: true,
          weeklyReports: true,
          betaAccess: false,
          fixedTopPosition: false,
          homepagePromotion: false
        }
      } else if (plan === 'exclusiv') {
        user.premiumFeatures = {
          priorityInSearch: true,
          premiumBadge: true,
          sidebarRotation: true,
          reducedCommission: 3,
          advancedAnalytics: true,
          dedicatedSupport: true,
          weeklyReports: true,
          betaAccess: true,
          fixedTopPosition: true,
          homepagePromotion: true,
          accountManager: 'Ana Popescu - ana.popescu@carnect.ro'
        }
      }
      
      localStorage.setItem('carnect_user', JSON.stringify(user))
      return true
    }
  } catch (error) {
    console.error('Error upgrading user:', error)
  }
  
  return false
}

// Funcție pentru downgrade
export function downgradeUserToStandard(): boolean {
  if (typeof window === 'undefined') return false
  
  try {
    const userData = localStorage.getItem('carnect_user')
    if (userData) {
      const user = JSON.parse(userData)
      
      user.subscriptionPlan = 'standard'
      user.isPremium = false
      user.isExclusiv = false
      delete user.premiumFeatures
      delete user.subscriptionStartDate
      delete user.subscriptionEndDate
      
      localStorage.setItem('carnect_user', JSON.stringify(user))
      return true
    }
  } catch (error) {
    console.error('Error downgrading user:', error)
  }
  
  return false
}

// Actualizez funcția logout
export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('carnect_user')
    localStorage.removeItem('carnect_user_type')
  }
  console.log('User logged out')
}

// Funcție pentru a verifica dacă utilizatorul este logat
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}

// Funcție pentru a obține tipul utilizatorului
export function getUserType(): 'client' | 'service' | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('carnect_user_type') as 'client' | 'service' | null
}

// Funcții pentru premium features
export function hasFeature(feature: keyof User['premiumFeatures']): boolean {
  const user = getCurrentUser()
  return user?.premiumFeatures?.[feature] || false
}

export function getCommissionRate(): number {
  const user = getCurrentUser()
  return user?.premiumFeatures?.reducedCommission || 8 // Default 8%
}

export function isPremiumUser(): boolean {
  const user = getCurrentUser()
  return user?.isPremium || false
}

export function isExclusivUser(): boolean {
  const user = getCurrentUser()
  return user?.isExclusiv || false
}
