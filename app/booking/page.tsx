"use client";

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Wrench, Star, MapPin, Clock, Calendar, ChevronLeft, ChevronRight, CheckCircle, User, Phone, Mail, MessageSquare } from 'lucide-react'
import Link from "next/link"
import { useRouter } from 'next/navigation'

export default function BookingPage() {
  const router = useRouter()
  const [selectedService, setSelectedService] = useState(null)
  const [formData, setFormData] = useState(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    selectedDate: '',
    selectedTime: '',
    contactInfo: {
      name: '',
      phone: '',
      email: '',
      notes: ''
    }
  })
  const [showConfirmation, setShowConfirmation] = useState(false)

  useEffect(() => {
    // Încarcă datele din localStorage
    const serviceData = localStorage.getItem('selectedService')
    const formDataStored = localStorage.getItem('bookingFormData')
    
    if (serviceData) {
      setSelectedService(JSON.parse(serviceData))
    }
    if (formDataStored) {
      setFormData(JSON.parse(formDataStored))
    }
  }, [])

  const availableDates = [
    { date: '2025-01-09', day: 'Joi', available: true },
    { date: '2025-01-10', day: 'Vineri', available: true },
    { date: '2025-01-11', day: 'Sâmbătă', available: false },
    { date: '2025-01-12', day: 'Duminică', available: false },
    { date: '2025-01-13', day: 'Luni', available: true },
    { date: '2025-01-14', day: 'Marți', available: true },
    { date: '2025-01-15', day: 'Miercuri', available: true }
  ]

  const timeSlots = [
    { time: '08:00', available: true },
    { time: '09:00', available: true },
    { time: '10:00', available: false },
    { time: '11:00', available: true },
    { time: '12:00', available: false },
    { time: '13:00', available: true },
    { time: '14:00', available: true },
    { time: '15:00', available: true },
    { time: '16:00', available: true },
    { time: '17:00', available: false }
  ]

  const handleDateSelect = (date) => {
    setBookingData(prev => ({ ...prev, selectedDate: date }))
  }

  const handleTimeSelect = (time) => {
    setBookingData(prev => ({ ...prev, selectedTime: time }))
  }

  const handleContactInfoChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, [field]: value }
    }))
  }

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return bookingData.selectedDate
      case 2:
        return bookingData.selectedTime
      case 3:
        return bookingData.contactInfo.name && bookingData.contactInfo.phone
      default:
        return false
    }
  }

  const handleSubmitBooking = () => {
    setShowConfirmation(true)
  }

  const handleConfirmBooking = () => {
    // Simulare trimitere rezervare
    alert('Rezervarea ta a fost confirmată! Vei fi contactat în curând.')
    router.push('/client-dashboard')
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Selectează data"
      case 2: return "Selectează ora"
      case 3: return "Confirmă rezervarea"
      default: return ""
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ro-RO', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  if (!selectedService || !formData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Se încarcă datele...</h2>
          <Link href="/estimate">
            <Button className="bg-orange-600 hover:bg-orange-700">
              Înapoi la estimare
            </Button>
          </Link>
        </div>
      </div>
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
          {/* Main Booking Content */}
          <div className="lg:col-span-2">
            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold">
                    Rezervă la {selectedService.serviceName}
                  </CardTitle>
                  <Link href="/estimate">
                    <Button variant="outline" size="sm">
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Înapoi
                    </Button>
                  </Link>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Pasul {currentStep} din 3: {getStepTitle()}
                    </span>
                    <span className="text-sm text-gray-500">
                      {Math.round((currentStep / 3) * 100)}% completat
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(currentStep / 3) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {/* Step 1: Select Date */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Alege data pentru programare
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {availableDates.map((dateOption) => (
                          <button
                            key={dateOption.date}
                            onClick={() => dateOption.available && handleDateSelect(dateOption.date)}
                            disabled={!dateOption.available}
                            className={`p-4 border rounded-lg text-center transition-all ${
                              bookingData.selectedDate === dateOption.date
                                ? 'border-orange-500 bg-orange-50 text-orange-700'
                                : dateOption.available
                                ? 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            <div className="font-medium">{dateOption.day}</div>
                            <div className="text-sm">
                              {new Date(dateOption.date).getDate()}/{new Date(dateOption.date).getMonth() + 1}
                            </div>
                            {!dateOption.available && (
                              <div className="text-xs text-red-500 mt-1">Indisponibil</div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Select Time */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Alege ora pentru {formatDate(bookingData.selectedDate)}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Selectează o oră disponibilă pentru programarea ta
                      </p>
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot.time}
                            onClick={() => slot.available && handleTimeSelect(slot.time)}
                            disabled={!slot.available}
                            className={`p-3 border rounded-lg text-center transition-all ${
                              bookingData.selectedTime === slot.time
                                ? 'border-orange-500 bg-orange-500 text-white'
                                : slot.available
                                ? 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            <div className="font-medium">{slot.time}</div>
                            {!slot.available && (
                              <div className="text-xs mt-1">Ocupat</div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Contact Info & Confirmation */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Informații de contact
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Numele complet *
                          </label>
                          <Input
                            placeholder="Introdu numele complet"
                            value={bookingData.contactInfo.name}
                            onChange={(e) => handleContactInfoChange('name', e.target.value)}
                            className="focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Numărul de telefon *
                          </label>
                          <Input
                            placeholder="07xxxxxxxx"
                            value={bookingData.contactInfo.phone}
                            onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                            className="focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email (opțional)
                        </label>
                        <Input
                          type="email"
                          placeholder="email@exemplu.ro"
                          value={bookingData.contactInfo.email}
                          onChange={(e) => handleContactInfoChange('email', e.target.value)}
                          className="focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Observații suplimentare
                        </label>
                        <Textarea
                          placeholder="Detalii suplimentare despre vehicul sau programare..."
                          value={bookingData.contactInfo.notes}
                          onChange={(e) => handleContactInfoChange('notes', e.target.value)}
                          className="min-h-[80px] resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                    </div>

                    {/* Booking Summary */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Rezumatul rezervării:</h4>
                      <div className="space-y-2 text-sm">
                        <div><strong>Service:</strong> {selectedService.serviceName}</div>
                        <div><strong>Vehicul:</strong> {formData.make} {formData.model} ({formData.year})</div>
                        <div><strong>Serviciu:</strong> {formData.service}</div>
                        <div><strong>Data:</strong> {formatDate(bookingData.selectedDate)}</div>
                        <div><strong>Ora:</strong> {bookingData.selectedTime}</div>
                        <div><strong>Preț estimat:</strong> {selectedService.estimatedPrice.min} - {selectedService.estimatedPrice.max} RON</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    className="flex items-center space-x-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Înapoi</span>
                  </Button>

                  {currentStep < 3 ? (
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
                      Confirmă rezervarea
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Service Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Detalii service</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{selectedService.rating}</span>
                    <span className="text-gray-500">({selectedService.reviews} recenzii)</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{selectedService.zone}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Timp estimat: {selectedService.timeEstimate}</span>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-sm text-gray-600 mb-2">Specializări:</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedService.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-lg font-bold text-orange-600">
                      {selectedService.estimatedPrice.min} - {selectedService.estimatedPrice.max} RON
                    </div>
                    <div className="text-sm text-gray-500">Preț estimat</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <span>Confirmă rezervarea</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              Ești sigur că vrei să confirmi această rezervare? Vei fi contactat de service pentru confirmare.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmation(false)}
                className="flex-1"
              >
                Anulează
              </Button>
              <Button
                onClick={handleConfirmBooking}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Confirmă
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
