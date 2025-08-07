"use client";

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Wrench, Star, MapPin, Clock, Calendar, Car, Crown, Zap, Award, Shield, Navigation } from 'lucide-react'
import Link from "next/link"

export default function EstimatePage() {
  const [formData, setFormData] = useState({
    carMake: '',
    carModel: '',
    year: '',
    mileage: '',
    serviceType: '',
    description: '',
    urgency: 'normal'
  })

  const [userLocation, setUserLocation] = useState(null)
  const [locationError, setLocationError] = useState('')
  const [filteredPremiumServices, setFilteredPremiumServices] = useState([])
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0)

  // Toate service-urile premium cu locațiile lor GPS
  const allPremiumServices = [
    {
      id: 1,
      name: "AutoElite Premium",
      rating: 4.9,
      reviews: 234,
      area: "Sector 1, București",
      coordinates: { lat: 44.4518, lng: 26.0854 },
      specialties: ["Service Premium", "Piese Originale"],
      priceRange: "300-500 RON",
      badge: "PREMIUM",
      badgeColor: "bg-gradient-to-r from-yellow-400 to-yellow-600",
      image: "/premium-auto-service.png",
      features: ["Garanție 12 luni", "Piese originale", "Service rapid"],
      radius: 5
    },
    {
      id: 2,
      name: "MasterService Pro",
      rating: 4.8,
      reviews: 189,
      area: "Sector 2, București", 
      coordinates: { lat: 44.4378, lng: 26.0969 },
      specialties: ["Diagnosticare Avansată", "Reparații Complexe"],
      priceRange: "280-450 RON",
      badge: "EXCLUSIV",
      badgeColor: "bg-gradient-to-r from-purple-500 to-purple-700",
      image: "/auto-service-garage.png",
      features: ["Echipamente moderne", "Tehnicienii certificați", "Preturi fixe"],
      radius: 7
    },
    {
      id: 3,
      name: "TurboService Express",
      rating: 4.7,
      reviews: 156,
      area: "Sector 3, București",
      coordinates: { lat: 44.4267, lng: 26.1025 },
      specialties: ["Service Rapid", "Disponibil 24/7"],
      priceRange: "200-380 RON",
      badge: "RAPID",
      badgeColor: "bg-gradient-to-r from-red-500 to-red-700",
      image: "/quick-auto-service.png",
      features: ["Service în 2 ore", "Disponibil weekend", "Ridicare auto"],
      radius: 6
    },
    {
      id: 4,
      name: "ProAuto Sector 4",
      rating: 4.6,
      reviews: 98,
      area: "Sector 4, București",
      coordinates: { lat: 44.3947, lng: 26.1203 },
      specialties: ["Service Complet", "Reparații Caroserie"],
      priceRange: "250-400 RON",
      badge: "PREMIUM",
      badgeColor: "bg-gradient-to-r from-yellow-400 to-yellow-600",
      image: "/eco-auto-service-green.png",
      features: ["Garanție 8 luni", "Preturi competitive", "Parcare gratuită"],
      radius: 4
    },
    {
      id: 5,
      name: "SpeedFix Cluj",
      rating: 4.8,
      reviews: 167,
      area: "Centru, Cluj-Napoca",
      coordinates: { lat: 46.7712, lng: 23.6236 },
      specialties: ["Service Express", "Diagnosticare"],
      priceRange: "220-380 RON",
      badge: "RAPID",
      badgeColor: "bg-gradient-to-r from-red-500 to-red-700",
      image: "/quick-auto-service.png",
      features: ["Service în 1 oră", "Echipamente noi", "Personal calificat"],
      radius: 8
    },
    {
      id: 6,
      name: "AutoLux Timișoara",
      rating: 4.9,
      reviews: 203,
      area: "Centru, Timișoara",
      coordinates: { lat: 45.7489, lng: 21.2087 },
      specialties: ["Service Luxury", "Mașini Premium"],
      priceRange: "350-600 RON",
      badge: "EXCLUSIV",
      badgeColor: "bg-gradient-to-r from-purple-500 to-purple-700",
      image: "/premium-auto-service.png",
      features: ["Piese premium", "Garanție 18 luni", "Service VIP"],
      radius: 10
    }
  ]

  // Rotația automată a service-urilor premium la fiecare 5 secunde
  useEffect(() => {
    if (filteredPremiumServices.length > 1) {
      const interval = setInterval(() => {
        setCurrentServiceIndex(prev => 
          prev === filteredPremiumServices.length - 1 ? 0 : prev + 1
        )
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [filteredPremiumServices.length])

  // Funcție pentru calcularea distanței între două puncte GPS
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    const distance = R * c
    return distance
  }

  // Obținerea locației GPS a utilizatorului
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          setUserLocation(location)
          
          const nearbyServices = allPremiumServices.filter(service => {
            const distance = calculateDistance(
              location.lat,
              location.lng,
              service.coordinates.lat,
              service.coordinates.lng
            )
            return distance <= service.radius
          }).map(service => ({
            ...service,
            distance: calculateDistance(
              location.lat,
              location.lng,
              service.coordinates.lat,
              service.coordinates.lng
            ).toFixed(1)
          })).sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))

          setFilteredPremiumServices(nearbyServices)
        },
        (error) => {
          console.error('Eroare la obținerea locației:', error)
          setLocationError('Nu s-a putut obține locația. Se afișează service-uri din București.')
          
          const bucharestServices = allPremiumServices.filter(service => 
            service.area.includes('București')
          ).map(service => ({
            ...service,
            distance: '~'
          }))
          setFilteredPremiumServices(bucharestServices)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      )
    } else {
      setLocationError('Geolocation nu este suportat de browser.')
      const bucharestServices = allPremiumServices.filter(service => 
        service.area.includes('București')
      ).map(service => ({
        ...service,
        distance: '~'
      }))
      setFilteredPremiumServices(bucharestServices)
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Estimarea ta a fost trimisă! Vei primi oferte în curând.')
  }

  const currentService = filteredPremiumServices[currentServiceIndex]

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
            <Link href="/premium-partner">
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                <Crown className="h-4 w-4 mr-2" />
                Devino Partener Premium
              </Button>
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
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Estimare Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Obține o estimare de preț
                </h1>
                <p className="text-gray-600">
                  Completează formularul pentru a primi oferte personalizate de la service-uri verificate
                </p>
                {userLocation && (
                  <div className="flex items-center space-x-2 mt-2 text-sm text-green-600">
                    <Navigation className="h-4 w-4" />
                    <span>Locația ta a fost detectată - se afișează service-uri din zona ta</span>
                  </div>
                )}
                {locationError && (
                  <div className="flex items-center space-x-2 mt-2 text-sm text-amber-600">
                    <MapPin className="h-4 w-4" />
                    <span>{locationError}</span>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Marca vehiculului *
                    </label>
                    <select
                      name="carMake"
                      value={formData.carMake}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    >
                      <option value="">Selectează marca</option>
                      <option value="Dacia">Dacia</option>
                      <option value="Renault">Renault</option>
                      <option value="Volkswagen">Volkswagen</option>
                      <option value="BMW">BMW</option>
                      <option value="Mercedes">Mercedes</option>
                      <option value="Audi">Audi</option>
                      <option value="Ford">Ford</option>
                      <option value="Opel">Opel</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Modelul vehiculului *
                    </label>
                    <Input
                      name="carModel"
                      value={formData.carModel}
                      onChange={handleInputChange}
                      placeholder="ex: Logan, Golf, Clio"
                      className="focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Anul fabricației *
                    </label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    >
                      <option value="">Selectează anul</option>
                      {Array.from({ length: 25 }, (_, i) => 2024 - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kilometraj
                    </label>
                    <Input
                      name="mileage"
                      value={formData.mileage}
                      onChange={handleInputChange}
                      placeholder="ex: 150000"
                      className="focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipul de serviciu necesar *
                  </label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  >
                    <option value="">Selectează serviciul</option>
                    <option value="service-complet">Service complet</option>
                    <option value="schimb-ulei">Schimb ulei și filtre</option>
                    <option value="reparatii-motor">Reparații motor</option>
                    <option value="sistem-franare">Sistem de frânare</option>
                    <option value="suspensie">Suspensie</option>
                    <option value="sistem-electric">Sistem electric</option>
                    <option value="aer-conditionat">Aer condiționat</option>
                    <option value="diagnosticare">Diagnosticare</option>
                    <option value="itp">ITP</option>
                    <option value="altele">Altele</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrierea problemei
                  </label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Descrie în detaliu problema vehiculului tău..."
                    className="min-h-[100px] resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Urgența reparației
                  </label>
                  <div className="grid md:grid-cols-3 gap-3">
                    {[
                      { value: 'low', label: 'Nu este urgent', desc: 'Pot aștepta 1-2 săptămâni' },
                      { value: 'normal', label: 'Normal', desc: 'În următoarele zile' },
                      { value: 'high', label: 'Urgent', desc: 'Cât mai repede posibil' }
                    ].map(urgency => (
                      <div
                        key={urgency.value}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          formData.urgency === urgency.value
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, urgency: urgency.value }))}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            formData.urgency === urgency.value
                              ? 'border-orange-500 bg-orange-500'
                              : 'border-gray-300'
                          }`}>
                            {formData.urgency === urgency.value && (
                              <div className="w-full h-full rounded-full bg-white scale-50"></div>
                            )}
                          </div>
                          <span className="font-medium">{urgency.label}</span>
                        </div>
                        <p className="text-sm text-gray-500 ml-6">{urgency.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 text-lg font-medium"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Rezervă
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar - Premium Services with Auto-Rotation */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Premium Services Section with Auto-Rotation */}
              <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Crown className="h-6 w-6 text-yellow-600" />
                      <CardTitle className="text-lg text-gray-900">
                        Service Premium
                      </CardTitle>
                    </div>
                    {filteredPremiumServices.length > 1 && (
                      <div className="flex space-x-1">
                        {filteredPremiumServices.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all ${
                              index === currentServiceIndex ? 'bg-yellow-600' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <CardDescription className="text-gray-600">
                    {filteredPremiumServices.length > 0 
                      ? `Service premium în zona ta`
                      : 'Se caută service-uri în zona ta...'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {currentService ? (
                    <Card className="bg-white border-2 border-yellow-200 hover:border-yellow-300 transition-all hover:shadow-md">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <img 
                            src={currentService.image || "/placeholder.svg"} 
                            alt={currentService.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-semibold text-sm text-gray-900 truncate">
                                {currentService.name}
                              </h4>
                              <Badge className={`${currentService.badgeColor} text-white text-xs px-2 py-0.5`}>
                                {currentService.badge}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center space-x-1 mb-2">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs font-medium">{currentService.rating}</span>
                              <span className="text-xs text-gray-500">({currentService.reviews})</span>
                            </div>

                            <div className="flex items-center space-x-1 mb-2">
                              <MapPin className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-600">{currentService.area}</span>
                              <span className="text-xs text-orange-600 font-medium">
                                • {currentService.distance}km
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-1 mb-2">
                              {currentService.specialties.slice(0, 2).map((specialty, index) => (
                                <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>

                            <div className="text-xs font-bold text-orange-600 mb-2">
                              {currentService.priceRange}
                            </div>

                            <div className="space-y-1 mb-3">
                              {currentService.features.map((feature, index) => (
                                <div key={index} className="flex items-center space-x-1">
                                  <Zap className="h-3 w-3 text-green-500" />
                                  <span className="text-xs text-gray-600">{feature}</span>
                                </div>
                              ))}
                            </div>

                            <Link href="/booking">
                              <Button size="sm" className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white text-xs">
                                <Calendar className="h-3 w-3 mr-1" />
                                Rezervă Premium
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="text-center py-8">
                      <Navigation className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-600 mb-2">
                        Se detectează locația ta...
                      </p>
                      <p className="text-xs text-gray-500">
                        Permite accesul la locație pentru service-uri din zona ta
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Why Choose Premium */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-base text-gray-900">
                      De ce Premium?
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Garanție extinsă</p>
                      <p className="text-xs text-gray-600">Până la 18 luni garanție</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Piese originale</p>
                      <p className="text-xs text-gray-600">Doar piese certificate</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Prioritate</p>
                      <p className="text-xs text-gray-600">Programare în zona ta</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Indicators */}
              <Card>
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <div className="flex justify-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span>500+ Service-uri</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>50k+ Recenzii</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      Service-uri verificate în zona ta
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
