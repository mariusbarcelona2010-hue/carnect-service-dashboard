"use client";

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Wrench, Star, MapPin, Clock, Shield, CheckCircle, Search, Calendar, Car, AlertCircle, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from "next/link"

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('bucuresti')
  const [selectedService, setSelectedService] = useState('toate')
  const [sortBy, setSortBy] = useState('rating')
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    vehicle: '',
    serviceType: '',
    description: '',
    urgency: '',
    date: '',
    time: '',
    contactInfo: {
      name: '',
      phone: '',
      email: ''
    }
  })

  const services = [
    {
      id: 1,
      name: "AutoService Pro SRL",
      rating: 4.8,
      reviews: 127,
      distance: "1.2 km",
      area: "Sector 3, București",
      specialties: ["Service complet", "Reparații motor", "Diagnosticare"],
      priceRange: "250-400 RON",
      certified: true,
      warranty: "6 luni",
      workingHours: "L-V: 08:00-18:00, S: 09:00-15:00",
      nextAvailable: "Mâine, 09:00",
      image: "/auto-service-garage.png"
    },
    {
      id: 2,
      name: "QuickService Auto",
      rating: 4.6,
      reviews: 89,
      distance: "2.1 km",
      area: "Sector 4, București",
      specialties: ["Service rapid", "Schimb ulei", "Verificări"],
      priceRange: "180-320 RON",
      certified: true,
      warranty: "3 luni",
      workingHours: "L-V: 07:00-19:00, S: 08:00-16:00",
      nextAvailable: "Astăzi, 14:00",
      image: "/quick-auto-service.png"
    },
    {
      id: 3,
      name: "MasterAuto Expert",
      rating: 4.9,
      reviews: 156,
      distance: "3.5 km",
      area: "Sector 1, București",
      specialties: ["Service premium", "Reparații complexe", "Piese originale"],
      priceRange: "300-500 RON",
      certified: true,
      warranty: "12 luni",
      workingHours: "L-V: 08:00-17:00",
      nextAvailable: "Poimâine, 08:00",
      image: "/premium-auto-service.png"
    },
    {
      id: 4,
      name: "EcoService Verde",
      rating: 4.7,
      reviews: 94,
      distance: "4.2 km",
      area: "Sector 2, București",
      specialties: ["Service eco", "Mașini hibride", "Consultanță verde"],
      priceRange: "220-380 RON",
      certified: true,
      warranty: "6 luni",
      workingHours: "L-V: 09:00-18:00, S: 10:00-14:00",
      nextAvailable: "Joi, 10:00",
      image: "/eco-auto-service-green.png"
    }
  ]

  const vehicles = [
    { id: 1, name: "Dacia Logan 2019", plate: "B123ABC" },
    { id: 2, name: "Renault Clio 2021", plate: "B456DEF" }
  ]

  const serviceTypes = [
    "Service complet",
    "Schimb ulei și filtre",
    "Reparații motor",
    "Sistem de frânare",
    "Suspensie",
    "Sistem electric",
    "Aer condiționat",
    "Diagnosticare",
    "ITP",
    "Altele"
  ]

  const urgencyLevels = [
    {
      value: "low",
      label: "Nu este urgent",
      description: "Pot aștepta până la 1-2 săptămâni",
      color: "text-green-600"
    },
    {
      value: "medium",
      label: "Moderat urgent",
      description: "Aș prefera în următoarele 3-5 zile",
      color: "text-yellow-600"
    },
    {
      value: "high",
      label: "Urgent",
      description: "Am nevoie cât mai repede posibil",
      color: "text-red-600"
    }
  ]

  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00", 
    "13:00", "14:00", "15:00", "16:00", "17:00"
  ]

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesSearch
  })

  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating
      case 'distance':
        return parseFloat(a.distance) - parseFloat(b.distance)
      case 'price':
        return parseInt(a.priceRange.split('-')[0]) - parseInt(b.priceRange.split('-')[0])
      default:
        return 0
    }
  })

  const handleBookingClick = (service) => {
    setSelectedServiceForBooking(service)
    setShowBookingModal(true)
    setCurrentStep(1)
    setBookingData({
      vehicle: '',
      serviceType: '',
      description: '',
      urgency: '',
      date: '',
      time: '',
      contactInfo: {
        name: '',
        phone: '',
        email: ''
      }
    })
  }

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmitBooking = () => {
    // Simulare trimitere programare
    alert(`Programarea ta la ${selectedServiceForBooking?.name} a fost trimisă cu succes! Vei fi contactat în curând pentru confirmare.`)
    setShowBookingModal(false)
  }

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return bookingData.vehicle && bookingData.serviceType
      case 2:
        return bookingData.description && bookingData.urgency
      case 3:
        return bookingData.date && bookingData.time
      case 4:
        return bookingData.contactInfo.name && bookingData.contactInfo.phone
      default:
        return false
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Vehicul și serviciu"
      case 2: return "Descrierea problemei"
      case 3: return "Data și ora"
      case 4: return "Informații de contact"
      default: return ""
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selectează vehiculul *
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={bookingData.vehicle}
                onChange={(e) => setBookingData({...bookingData, vehicle: e.target.value})}
              >
                <option value="">Alege vehiculul</option>
                {vehicles.map(vehicle => (
                  <option key={vehicle.id} value={vehicle.name}>
                    {vehicle.name} - {vehicle.plate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipul de serviciu *
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={bookingData.serviceType}
                onChange={(e) => setBookingData({...bookingData, serviceType: e.target.value})}
              >
                <option value="">Alege serviciul</option>
                {serviceTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrie problema în detaliu *
              </label>
              <Textarea
                placeholder="Explică ce probleme ai observat la vehicul, când au apărut, în ce condiții se manifestă..."
                className="min-h-[120px] resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={bookingData.description}
                onChange={(e) => setBookingData({...bookingData, description: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Cât de urgent este? *
              </label>
              <div className="space-y-3">
                {urgencyLevels.map(level => (
                  <div
                    key={level.value}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      bookingData.urgency === level.value
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setBookingData({...bookingData, urgency: level.value})}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        bookingData.urgency === level.value
                          ? 'border-orange-500 bg-orange-500'
                          : 'border-gray-300'
                      }`}>
                        {bookingData.urgency === level.value && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <div>
                        <div className={`font-medium ${level.color}`}>{level.label}</div>
                        <div className="text-sm text-gray-500">{level.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selectează data *
              </label>
              <Input
                type="date"
                className="focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={bookingData.date}
                onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Selectează ora *
              </label>
              <div className="grid grid-cols-5 gap-2">
                {timeSlots.map(time => (
                  <button
                    key={time}
                    type="button"
                    className={`p-2 text-sm border rounded-lg transition-all ${
                      bookingData.time === time
                        ? 'border-orange-500 bg-orange-500 text-white'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setBookingData({...bookingData, time})}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <strong>Notă:</strong> Programarea este în așteptarea confirmării de către service. 
                  Vei fi contactat pentru a confirma disponibilitatea.
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Numele complet *
              </label>
              <Input
                placeholder="Introdu numele complet"
                className="focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={bookingData.contactInfo.name}
                onChange={(e) => setBookingData({
                  ...bookingData,
                  contactInfo: {...bookingData.contactInfo, name: e.target.value}
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Numărul de telefon *
              </label>
              <Input
                placeholder="07xxxxxxxx"
                className="focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={bookingData.contactInfo.phone}
                onChange={(e) => setBookingData({
                  ...bookingData,
                  contactInfo: {...bookingData.contactInfo, phone: e.target.value}
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email (opțional)
              </label>
              <Input
                type="email"
                placeholder="email@exemplu.ro"
                className="focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={bookingData.contactInfo.email}
                onChange={(e) => setBookingData({
                  ...bookingData,
                  contactInfo: {...bookingData.contactInfo, email: e.target.value}
                })}
              />
            </div>

            {/* Rezumat programare */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Rezumatul programării:</h4>
              <div className="space-y-2 text-sm">
                <div><strong>Service:</strong> {selectedServiceForBooking?.name}</div>
                <div><strong>Vehicul:</strong> {bookingData.vehicle}</div>
                <div><strong>Serviciu:</strong> {bookingData.serviceType}</div>
                <div><strong>Data:</strong> {bookingData.date}</div>
                <div><strong>Ora:</strong> {bookingData.time}</div>
                <div><strong>Urgență:</strong> {urgencyLevels.find(u => u.value === bookingData.urgency)?.label}</div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
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
            <Link href="/login">
              <Button variant="ghost">Conectare</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-orange-600 hover:bg-orange-700">Înregistrare</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Caută service-uri sau servicii..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <select 
                className="w-full p-2 border rounded-lg"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="bucuresti">București</option>
                <option value="cluj">Cluj-Napoca</option>
                <option value="timisoara">Timișoara</option>
                <option value="iasi">Iași</option>
              </select>
            </div>
            <div>
              <select 
                className="w-full p-2 border rounded-lg"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="rating">Sortează după rating</option>
                <option value="distance">Sortează după distanță</option>
                <option value="price">Sortează după preț</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Service-uri auto în {selectedCity === 'bucuresti' ? 'București' : selectedCity}
          </h1>
          <div className="text-gray-600">
            {sortedServices.length} service-uri găsite
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {sortedServices.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <div className="flex">
                <div className="w-1/3">
                  <img 
                    src={service.image || "/placeholder.svg"} 
                    alt={service.name}
                    className="w-full h-full object-cover rounded-l-lg"
                  />
                </div>
                <div className="w-2/3">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{service.rating}</span>
                            <span className="text-gray-500">({service.reviews})</span>
                          </div>
                          {service.certified && (
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              <Shield className="h-3 w-3 mr-1" />
                              Verificat
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-orange-600">{service.priceRange}</div>
                        <div className="text-sm text-gray-500">preț estimat</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{service.area}</span>
                        <span className="text-orange-600 font-medium">• {service.distance}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{service.workingHours}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-green-600 font-medium">Disponibil: {service.nextAvailable}</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="flex flex-wrap gap-1">
                        {service.specialties.slice(0, 3).map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button 
                        size="sm" 
                        className="w-full bg-orange-600 hover:bg-orange-700"
                        onClick={() => handleBookingClick(service)}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Programează online
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {sortedServices.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Search className="h-12 w-12 mx-auto mb-4" />
              <p className="text-lg">Nu am găsit service-uri pentru căutarea ta</p>
              <p>Încearcă să modifici filtrele sau să cauți altceva</p>
            </div>
          </div>
        )}

        {/* Trust Section */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-orange-50 to-orange-100">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  De ce să alegi CarNect?
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Shield className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Service-uri verificate</h3>
                  <p className="text-gray-600 text-sm">
                    Toate service-urile din rețeaua noastră sunt verificate și licențiate conform legii românești
                  </p>
                </div>
                <div className="text-center">
                  <CheckCircle className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Prețuri transparente</h3>
                  <p className="text-gray-600 text-sm">
                    Estimări de preț clare, fără costuri ascunse. Știi exact ce plătești înainte să începi
                  </p>
                </div>
                <div className="text-center">
                  <Star className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Recenzii reale</h3>
                  <p className="text-gray-600 text-sm">
                    Citește recenzii de la clienți reali pentru a lua cea mai bună decizie
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Booking Modal */}
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold">
                Programează la {selectedServiceForBooking?.name}
              </DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBookingModal(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Pasul {currentStep} din 4: {getStepTitle()}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round((currentStep / 4) * 100)}% completat
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4 border-t">
            <Button
              variant="outline"
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Înapoi</span>
            </Button>

            {currentStep < 4 ? (
              <Button
                onClick={handleNextStep}
                disabled={!canProceedToNextStep()}
                className="bg-orange-600 hover:bg-orange-700 flex items-center space-x-2"
              >
                <span>Continuă</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmitBooking}
                disabled={!canProceedToNextStep()}
                className="bg-green-600 hover:bg-green-700"
              >
                Trimite programarea
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
