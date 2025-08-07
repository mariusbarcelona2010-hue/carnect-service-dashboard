'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Wrench, Search, MapPin, Star, Clock, Phone, Shield, TrendingUp, Users, Award, CheckCircle, Crown } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const [currentPremiumIndex, setCurrentPremiumIndex] = useState(0)

  // Premium services for rotation
  const premiumServices = [
    {
      id: 'premium-1',
      name: 'AutoService Premium SRL',
      rating: 4.9,
      completedJobs: 234,
      specialization: 'Service complet BMW/Audi',
      image: '/premium-auto-service.png',
      badge: 'PREMIUM',
      badgeColor: 'bg-gradient-to-r from-yellow-400 to-yellow-600'
    },
    {
      id: 'premium-2', 
      name: 'Eco AutoService Green',
      rating: 4.8,
      completedJobs: 189,
      specialization: 'Servicii eco-friendly',
      image: '/eco-auto-service-green.png',
      badge: 'EXCLUSIV',
      badgeColor: 'bg-gradient-to-r from-purple-500 to-purple-700'
    },
    {
      id: 'premium-3',
      name: 'Quick Auto Service',
      rating: 4.7,
      completedJobs: 156,
      specialization: 'Reparații rapide',
      image: '/quick-auto-service.png',
      badge: 'PREMIUM',
      badgeColor: 'bg-gradient-to-r from-yellow-400 to-yellow-600'
    }
  ]

  // Auto-rotate premium services every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPremiumIndex((prev) => (prev + 1) % premiumServices.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [premiumServices.length])

  const currentPremiumService = premiumServices[currentPremiumIndex]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wrench className="h-8 w-8 text-orange-600" />
            <span className="text-2xl font-bold text-gray-900">CarNect</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/services" className="text-gray-600 hover:text-gray-900">Servicii</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">Despre noi</Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/test-login">
              <Button variant="ghost">Conturi Test</Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost">Conectare</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-orange-600 hover:bg-orange-700">Înregistrare</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-2xl p-8 mb-8">
              <div className="max-w-2xl">
                <h1 className="text-4xl font-bold mb-4">
                  Găsește service-ul auto perfect pentru mașina ta
                </h1>
                <p className="text-xl mb-6 text-orange-100">
                  Conectează-te cu service-urile auto de încredere din România. 
                  Compară prețuri, citește recenzii și rezervă online.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/services">
                    <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                      <Search className="h-5 w-5 mr-2" />
                      Caută servicii
                    </Button>
                  </Link>
                  <Link href="/estimate">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                      Estimare preț
                    </Button>
                  </Link>
                </div>
              </div>
            </section>

            {/* Quick Search */}
            <section className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Search className="h-5 w-5 text-orange-600" />
                    <span>Căutare rapidă</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipul serviciului
                      </label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                        <option>Service complet</option>
                        <option>Schimb ulei</option>
                        <option>Reparații motor</option>
                        <option>Diagnosticare</option>
                        <option>Reparații caroserie</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Localitatea
                      </label>
                      <Input 
                        placeholder="ex: București" 
                        className="focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div className="flex items-end">
                      <Link href="/services" className="w-full">
                        <Button className="w-full bg-orange-600 hover:bg-orange-700">
                          <Search className="h-4 w-4 mr-2" />
                          Caută
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Featured Services */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Service-uri recomandate</h2>
                <Link href="/services">
                  <Button variant="outline">Vezi toate</Button>
                </Link>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Image 
                            src="/auto-service-garage.png" 
                            alt="AutoService Garage" 
                            width={32} 
                            height={32}
                            className="rounded"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">AutoService Garage SRL</h3>
                          <p className="text-sm text-gray-600">Service complet și reparații</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        <Shield className="h-3 w-3 mr-1" />
                        Verificat
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>4.8 (127 recenzii)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>Sector 3, București</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>L-V: 8-18</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium text-orange-600">De la 150 RON</span> - Service complet
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4 mr-1" />
                          Sună
                        </Button>
                        <Link href="/booking">
                          <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                            Rezervă
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Wrench className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">TechAuto Service</h3>
                          <p className="text-sm text-gray-600">Diagnosticare și reparații</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        <Shield className="h-3 w-3 mr-1" />
                        Verificat
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>4.9 (89 recenzii)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>Sector 1, București</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>L-S: 9-17</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium text-orange-600">De la 80 RON</span> - Diagnosticare
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4 mr-1" />
                          Sună
                        </Button>
                        <Link href="/booking">
                          <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                            Rezervă
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* How it works */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cum funcționează CarNect</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">1. Caută</h3>
                    <p className="text-gray-600">
                      Găsește service-uri auto în zona ta și compară prețurile și recenziile.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Phone className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">2. Contactează</h3>
                    <p className="text-gray-600">
                      Sună direct service-ul sau rezervă online pentru a programa o întâlnire.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">3. Finalizează</h3>
                    <p className="text-gray-600">
                      Primește serviciul de calitate și lasă o recenzie pentru alți utilizatori.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Premium Service Rotation */}
            <Card className="mb-6 border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Crown className="h-5 w-5 text-yellow-600" />
                    <span>Service Premium</span>
                  </CardTitle>
                  <Badge className={`${currentPremiumService.badgeColor} text-white text-xs`}>
                    {currentPremiumService.badge}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-3 shadow-sm">
                    <Image 
                      src={currentPremiumService.image || "/placeholder.svg"} 
                      alt={currentPremiumService.name} 
                      width={40} 
                      height={40}
                      className="rounded"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{currentPremiumService.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{currentPremiumService.specialization}</p>
                  
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{currentPremiumService.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{currentPremiumService.completedJobs} lucrări</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      <Phone className="h-3 w-3 mr-1" />
                      Sună
                    </Button>
                    <Button size="sm" className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-xs">
                      Vezi profil
                    </Button>
                  </div>
                </div>
                
                {/* Rotation indicator */}
                <div className="flex justify-center space-x-1 mt-4">
                  {premiumServices.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentPremiumIndex ? 'bg-yellow-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Become Premium Partner */}
            <Card className="mb-6 border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
              <CardContent className="p-6 text-center">
                <Crown className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Ești proprietar de service?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Alătură-te rețelei noastre premium și primește mai mulți clienți!
                </p>
                <Link href="/premium-partner">
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                    <Crown className="h-4 w-4 mr-2" />
                    Devino Partener Premium
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">De ce CarNect?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <Shield className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Service-uri verificate</div>
                    <div className="text-sm text-gray-600">Toate service-urile sunt verificate</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 rounded-full p-2">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold">500+ service-uri</div>
                    <div className="text-sm text-gray-600">În toată România</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-100 rounded-full p-2">
                    <Star className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <div className="font-semibold">10,000+ recenzii</div>
                    <div className="text-sm text-gray-600">De la clienți reali</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 rounded-full p-2">
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Economii până la 30%</div>
                    <div className="text-sm text-gray-600">Față de prețurile standard</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
