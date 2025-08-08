// Mock user data for testing
const testUsers = {
  client: {
    id: 'client-1',
    email: 'client@carnect.ro',
    password: 'client123',
    name: 'Ion Popescu',
    type: 'client' as const,
    phone: '+40721234567',
    city: 'București'
  },
  service: {
    id: 'service-1',
    email: 'service@carnect.ro',
    password: 'service123',
    companyName: 'AutoService Pro SRL',
    contactName: 'Maria Ionescu',
    type: 'service' as const,
    phone: '+40721234568',
    city: 'București',
    rating: 4.8,
    completedJobs: 127,
    verified: true,
    premiumPlan: 'standard' as 'standard' | 'premium' | 'exclusiv',
    premiumFeatures: {
      priorityInSearch: false,
      reducedCommission: false,
      advancedAnalytics: false,
      dedicatedSupport: false,
      weeklyReports: false,
      betaAccess: false,
      accountManager: null as string | null
    }
  }
}

export type User = typeof testUsers.client | typeof testUsers.service

// Test orders data
export const testOrders = [
  {
    id: 'order-1',
    clientId: 'client-1',
    serviceId: 'service-1',
    vehicle: 'Dacia Logan 2019',
    mileage: 85000,
    serviceType: 'service_complet',
    description: 'Service complet cu schimb ulei, filtre și verificare generală',
    urgency: 'normal' as 'low' | 'normal' | 'urgent',
    location: 'București, Sector 3',
    budget: '300-400 RON',
    status: 'completed' as 'new' | 'pending' | 'in_progress' | 'completed' | 'cancelled',
    createdAt: '2024-01-15',
    completedAt: '2024-01-16',
    finalCost: 350,
    clientRating: 5,
    clientReview: 'Service excelent, foarte profesionali!',
    serviceNotes: 'Schimbat ulei, filtru aer, filtru ulei. Verificat frâne - OK.',
    offers: [
      {
        id: 'offer-1',
        serviceId: 'service-1',
        serviceName: 'AutoService Pro SRL',
        price: { min: 320, max: 380 },
        estimatedTime: '2-3 ore',
        description: 'Service complet cu piese originale',
        warranty: '6 luni',
        status: 'accepted' as 'pending' | 'accepted' | 'rejected'
      }
    ]
  }
]

// Authentication functions
export function authenticateUser(email: string, password: string, type: 'client' | 'service'): User | null {
  if (typeof window === 'undefined') return null
  
  const user = testUsers[type]
  
  if (user.email === email && user.password === password) {
    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(user))
    return user
  }
  
  return null
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  
  try {
    const userData = localStorage.getItem('user')
    return userData ? JSON.parse(userData) : null
  } catch {
    return null
  }
}

export function logout(): void {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem('user')
}

// Premium features functions
export function isPremiumUser(): boolean {
  const user = getCurrentUser()
  if (!user || user.type !== 'service') return false
  
  return user.premiumPlan === 'premium' || user.premiumPlan === 'exclusiv'
}

export function isExclusivUser(): boolean {
  const user = getCurrentUser()
  if (!user || user.type !== 'service') return false
  
  return user.premiumPlan === 'exclusiv'
}

export function hasFeature(feature: keyof typeof testUsers.service.premiumFeatures): boolean {
  const user = getCurrentUser()
  if (!user || user.type !== 'service') return false
  
  return user.premiumFeatures[feature] as boolean
}

export function getCommissionRate(): number {
  const user = getCurrentUser()
  if (!user || user.type !== 'service') return 8
  
  switch (user.premiumPlan) {
    case 'premium': return 5
    case 'exclusiv': return 3
    default: return 8
  }
}

export function upgradeUserToPremium(plan: 'premium' | 'exclusiv'): boolean {
  const user = getCurrentUser()
  if (!user || user.type !== 'service') return false
  
  const updatedUser = {
    ...user,
    premiumPlan: plan,
    premiumFeatures: {
      priorityInSearch: true,
      reducedCommission: true,
      advancedAnalytics: plan === 'premium' || plan === 'exclusiv',
      dedicatedSupport: plan === 'exclusiv',
      weeklyReports: plan === 'exclusiv',
      betaAccess: plan === 'exclusiv',
      accountManager: plan === 'exclusiv' ? 'Ana Popescu - ana@carnect.ro' : null
    }
  }
  
  localStorage.setItem('user', JSON.stringify(updatedUser))
  return true
}

export function downgradeUserToStandard(): boolean {
  const user = getCurrentUser()
  if (!user || user.type !== 'service') return false
  
  const updatedUser = {
    ...user,
    premiumPlan: 'standard' as const,
    premiumFeatures: {
      priorityInSearch: false,
      reducedCommission: false,
      advancedAnalytics: false,
      dedicatedSupport: false,
      weeklyReports: false,
      betaAccess: false,
      accountManager: null
    }
  }
  
  localStorage.setItem('user', JSON.stringify(updatedUser))
  return true
}
