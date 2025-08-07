"use client";

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { User, Car, Calendar, Clock, MapPin, Phone, Mail, Star, Plus, Settings, Bell, LogOut, Wrench, CheckCircle, AlertCircle, XCircle, Eye, MessageSquare, Euro, Camera, ArrowRight, ArrowLeft, Send } from 'lucide-react'
import Link from "next/link"
import { useRouter } from 'next/navigation'

interface Vehicle {
  id: number
  make: string
  model: string
  year: number
  licensePlate: string
  mileage: number
}

interface ServiceRequest {
  id: number
  vehicleId: number
  vehicle: Vehicle
  serviceType: string
  description: string
  urgency: 'low' | 'normal' | 'urgent'
  location: string
  budget?: string
  status: 'new' | 'pending' | 'in_progress' | 'completed' | 'cancelled'
  createdAt: string
  offers: ServiceOffer[]
}

interface ServiceOffer {
  id: number
  serviceName: string
  rating: number
  price: { min: number; max: number }
  timeEstimate: string
  warranty: string
  phone: string
  status: 'pending' | 'accepted' | 'rejected'
}

export default function ClientDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [showNewRequestModal, setShowNewRequestModal] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: 1,
      make: "Dacia",
      model: "Logan",
      year: 2019,
      licensePlate: "B123ABC",
      mileage: 85000
    },
    {
      id: 2,
      make: "Renault",
      model: "Clio",
      year: 2021,
      licensePlate: "B456DEF",
      mileage: 45000
    }
  ])

  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([
    {
      id: 1,
      vehicleId: 1,
      vehicle: vehicles[0],
      serviceType: "Service complet",
      description: "Service complet cu schimb ulei, filtre și verificări generale",
      urgency: 'normal',
      location: "București, Sector 3",
      budget: "300-400 RON",
      status: 'pending',
      createdAt: "2024-01-15",
      offers: [
        {
          id: 1,
          serviceName: "AutoService Pro SRL",
          rating: 4.8,
          price: { min: 320, max: 380 },
          timeEstimate: "2-3 ore",
          warranty: "6 luni",
          phone: "+40721234567",
          status: 'pending'
        },
        {
          id: 2,
          serviceName: "QuickService Auto",
          rating: 4.6,
          price: { min: 300, max: 350 },
          timeEstimate: "1.5-2 ore",
          warranty: "3 luni",
          phone: "+40721234568",
          status: 'pending'
        }
      ]
    }
  ])

  const [newRequest, setNewRequest] = useState({
    vehicleId: '',
    serviceType: '',
    description: '',
    urgency: 'normal' as 'low' | 'normal' | 'urgent',
    location: '',
    budget: ''
  })

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }
    
    const parsedUser = JSON.parse(userData)
    if (parsedUser.type !== 'client') {
      router.push('/login')
      return
    }
    
    setUser(parsedUser)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  const handleNewRequestSubmit = () => {
    const selectedVehicle = vehicles.find(v => v.id === parseInt(newRequest.vehicleId))
    if (!selectedVehicle) return

    const request: ServiceRequest = {
      id: Date.now(),
      vehicleId: parseInt(newRequest.vehicleId),
      vehicle: selectedVehicle,
      serviceType: newRequest.serviceType,
      description: newRequest.description,
      urgency: newRequest.urgency,
      location: newRequest.location,
      budget: newRequest.budget,
      status: 'new',
      createdAt: new Date().toISOString().split('T')[0],
      offers: []
    }

    setServiceRequests(prev => [request, ...prev])
    setShowNewRequestModal(false)
    setCurrentStep(1)
    setNewRequest({
      vehicleId: '',
      serviceType: '',
      description: '',
      urgency: 'normal',
      location: '',
      budget: ''
    })

    // Simulate receiving offers after 2 seconds
    setTimeout(() => {
      const mockOffers: ServiceOffer[] = [
        {
          id: Date.now() + 1,
          serviceName: "AutoService Pro SRL",
          rating: 4.8,
          price: { min: 280, max: 350 },
          timeEstimate: "2-3 ore",
          warranty: "6 luni",
          phone: "+40721234567",
          status: 'pending'
        },
        {
          id: Date.now() + 2,
          serviceName: "MasterAuto Expert",
          rating: 4.9,
          price: { min: 320, max: 400 },
          timeEstimate: "3-4 ore",
          warranty: "12 luni",
          phone: "+40721234569",
          status: 'pending'
        }
      ]

      setServiceRequests(prev => 
        prev.map(req => 
          req.id === request.id 
            ? { ...req, status: 'pending', offers: mockOffers }
            : req
        )
      )
    }, 2000)
  }

  const acceptOffer = (requestId: number, offerId: number) => {
    setServiceRequests(prev =>
      prev.map(req =>
        req.id === requestId
          ? {
              ...req,
              status: 'in_progress',
              offers: req.offers.map(offer =>
                offer.id === offerId
                  ? { ...offer, status: 'accepted' }
                  : { ...offer, status: 'rejected' }
              )
            }
          : req
      )
    )
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { color: 'bg-blue-100 text-blue-700', text: 'Nouă' },
      pending: { color: 'bg-yellow-100 text-yellow-700', text: 'În așteptare' },
      in_progress: { color: 'bg-orange-100 text-orange-700', text: 'În progres' },
      completed: { color: 'bg-green-100 text-green-700', text: 'Finalizată' },
      cancelled: { color: 'bg-red-100 text-red-700', text: 'Anulată' }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig]
    return (
      <Badge className={config.color}>
        {config.text}
      </Badge>
    )
  }

  const getUrgencyBadge = (urgency: string) => {
    const urgencyConfig = {
      low: { color: 'bg-gray-100 text-gray-700', text: 'Nu e urgent' },
      normal: { color: 'bg-blue-100 text-blue-700', text: 'Normal' },
      urgent: { color: 'bg-red-100 text-red-700', text: 'Urgent' }
    }
    
    const config = urgencyConfig[urgency as keyof typeof urgencyConfig]
    return (
      <Badge className={config.color}>
        {config.text}
      </Badge>
    )
  }

  const canContinueStep = () => {
    switch (currentStep) {
      case 1:
        return newRequest.vehicleId && newRequest.serviceType
      case 2:
        return newRequest.description.trim().length > 10
      case 3:
        return true // All fields in step 3 are optional
      default:
        return false
    }
  }

  if (!user) {
    return <div>Loading...</div>
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
            <Bell className="h-5 w-5 text-gray-600 cursor-pointer" />
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700">{user.name}</span>
            </div>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Ieșire
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bună ziua, {user.name}!</h1>
            <p className="text-gray-600 mt-2">Gestionează-ți cererile de service auto</p>
          </div>
          
          <Dialog open={showNewRequestModal} onOpenChange={setShowNewRequestModal}>
            <DialogTrigger asChild>
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Plus className="h-4 w-4 mr-2" />
                Cerere nouă
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Creează o cerere nouă de service</DialogTitle>
                <DialogDescription>
                  Completează detaliile pentru a primi oferte de la service-uri verificate
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Pasul {currentStep} din 3</span>
                    <span>{Math.round((currentStep / 3) * 100)}% completat</span>
                  </div>
                  <Progress value={(currentStep / 3) * 100} className="h-2" />
                </div>

                {/* Step 1: Vehicle and Service Type */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Selectează vehiculul și tipul de service</h3>
                    
                    <div>
                      <Label htmlFor="vehicle">Vehiculul *</Label>
                      <select 
                        className="w-full p-3 border rounded-lg mt-1"
                        value={newRequest.vehicleId}
                        onChange={(e) => setNewRequest(prev => ({ ...prev, vehicleId: e.target.value }))}
                        required
                      >
                        <option value="">Selectează vehiculul</option>
                        {vehicles.map(vehicle => (
                          <option key={vehicle.id} value={vehicle.id}>
                            {vehicle.make} {vehicle.model} ({vehicle.year}) - {vehicle.licensePlate}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="serviceType">Tipul de service *</Label>
                      <select 
                        className="w-full p-3 border rounded-lg mt-1"
                        value={newRequest.serviceType}
                        onChange={(e) => setNewRequest(prev => ({ ...prev, serviceType: e.target.value }))}
                        required
                      >
                        <option value="">Selectează tipul de service</option>
                        <option value="service_complet">Service complet (ulei, filtre, verificări)</option>
                        <option value="schimb_ulei">Schimb ulei și filtru</option>
                        <option value="reparatii_motor">Reparații motor</option>
                        <option value="probleme_frane">Probleme frâne</option>
                        <option value="probleme_suspensie">Probleme suspensie</option>
                        <option value="probleme_transmisie">Probleme transmisie</option>
                        <option value="diagnosticare">Diagnosticare computerizată</option>
                        <option value="intretinere_ac">Întreținere AC</option>
                        <option value="reparatii_caroserie">Reparații caroserie</option>
                        <option value="altele">Altele</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 2: Description and Urgency */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Descrie problema în detaliu</h3>
                    
                    <div>
                      <Label htmlFor="description">Descrierea problemei *</Label>
                      <Textarea
                        id="description"
                        placeholder="Descrie cât mai detaliat problema vehiculului tău. Include simptome, zgomote, când apar problemele, etc."
                        rows={5}
                        value={newRequest.description}
                        onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Minim 10 caractere ({newRequest.description.length}/10)
                      </p>
                    </div>

                    <div>
                      <Label>Cât de urgent este? *</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                        <label className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${newRequest.urgency === 'low' ? 'border-orange-500 bg-orange-50' : ''}`}>
                          <input
                            type="radio"
                            name="urgency"
                            value="low"
                            checked={newRequest.urgency === 'low'}
                            onChange={(e) => setNewRequest(prev => ({ ...prev, urgency: e.target.value as any }))}
                          />
                          <div>
                            <div className="font-medium">Nu e urgent</div>
                            <div className="text-sm text-gray-500">Săptămâna viitoare</div>
                          </div>
                        </label>
                        <label className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${newRequest.urgency === 'normal' ? 'border-orange-500 bg-orange-50' : ''}`}>
                          <input
                            type="radio"
                            name="urgency"
                            value="normal"
                            checked={newRequest.urgency === 'normal'}
                            onChange={(e) => setNewRequest(prev => ({ ...prev, urgency: e.target.value as any }))}
                          />
                          <div>
                            <div className="font-medium">Normal</div>
                            <div className="text-sm text-gray-500">În 2-3 zile</div>
                          </div>
                        </label>
                        <label className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${newRequest.urgency === 'urgent' ? 'border-orange-500 bg-orange-50' : ''}`}>
                          <input
                            type="radio"
                            name="urgency"
                            value="urgent"
                            checked={newRequest.urgency === 'urgent'}
                            onChange={(e) => setNewRequest(prev => ({ ...prev, urgency: e.target.value as any }))}
                          />
                          <div>
                            <div className="font-medium">Urgent</div>
                            <div className="text-sm text-gray-500">Astăzi/mâine</div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Location and Budget */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Detalii finale</h3>
                    
                    <div>
                      <Label htmlFor="location">Locația preferată</Label>
                      <Input
                        id="location"
                        placeholder="ex: București, Sector 3"
                        value={newRequest.location}
                        onChange={(e) => setNewRequest(prev => ({ ...prev, location: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="budget">Bugetul preferat</Label>
                      <select 
                        className="w-full p-3 border rounded-lg mt-1"
                        value={newRequest.budget}
                        onChange={(e) => setNewRequest(prev => ({ ...prev, budget: e.target.value }))}
                      >
                        <option value="">Nu am o preferință</option>
                        <option value="sub_200">Sub 200 RON</option>
                        <option value="200_400">200-400 RON</option>
                        <option value="400_600">400-600 RON</option>
                        <option value="600_1000">600-1000 RON</option>
                        <option value="peste_1000">Peste 1000 RON</option>
                      </select>
                    </div>

                    {/* Summary */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Rezumatul cererii:</h4>
                      <div className="space-y-1 text-sm">
                        <p><strong>Vehicul:</strong> {vehicles.find(v => v.id === parseInt(newRequest.vehicleId))?.make} {vehicles.find(v => v.id === parseInt(newRequest.vehicleId))?.model}</p>
                        <p><strong>Service:</strong> {newRequest.serviceType.replace('_', ' ')}</p>
                        <p><strong>Urgență:</strong> {newRequest.urgency === 'low' ? 'Nu e urgent' : newRequest.urgency === 'normal' ? 'Normal' : 'Urgent'}</p>
                        {newRequest.location && <p><strong>Locație:</strong> {newRequest.location}</p>}
                        {newRequest.budget && <p><strong>Buget:</strong> {newRequest.budget.replace('_', ' ')}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Înapoi
                  </Button>
                  
                  {currentStep < 3 ? (
                    <Button
                      onClick={() => setCurrentStep(prev => prev + 1)}
                      disabled={!canContinueStep()}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      Continuă
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNewRequestSubmit}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Trimite cererea
                    </Button>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Cereri active</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {serviceRequests.filter(req => ['new', 'pending', 'in_progress'].includes(req.status)).length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Cereri finalizate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {serviceRequests.filter(req => req.status === 'completed').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Vehicule înregistrate</p>
                  <p className="text-2xl font-bold text-gray-900">{vehicles.length}</p>
                </div>
                <Car className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Oferte primite</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {serviceRequests.reduce((total, req) => total + req.offers.length, 0)}
                  </p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Service Requests */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Cererile tale de service</h2>
          
          {serviceRequests.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Wrench className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nu ai cereri de service</h3>
                <p className="text-gray-600 mb-4">Creează prima ta cerere pentru a primi oferte de la service-uri verificate</p>
                <Button 
                  className="bg-orange-600 hover:bg-orange-700"
                  onClick={() => setShowNewRequestModal(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Creează prima cerere
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {serviceRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {request.vehicle.make} {request.vehicle.model} ({request.vehicle.year})
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {request.serviceType.replace('_', ' ')} • Creată pe {request.createdAt}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(request.status)}
                        {getUrgencyBadge(request.urgency)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-700">{request.description}</p>
                      
                      {request.location && (
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          {request.location}
                        </div>
                      )}

                      {request.budget && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Euro className="h-4 w-4 mr-1" />
                          Buget: {request.budget.replace('_', ' ')}
                        </div>
                      )}

                      {/* Offers */}
                      {request.offers.length > 0 && (
                        <div className="space-y-3">
                          <Separator />
                          <h4 className="font-semibold">Oferte primite ({request.offers.length})</h4>
                          <div className="grid gap-3">
                            {request.offers.map((offer) => (
                              <div key={offer.id} className="border rounded-lg p-4 bg-gray-50">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <h5 className="font-semibold">{offer.serviceName}</h5>
                                      <div className="flex items-center space-x-1">
                                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                        <span className="text-sm">{offer.rating}</span>
                                      </div>
                                      {offer.status === 'accepted' && (
                                        <Badge className="bg-green-100 text-green-700">Acceptată</Badge>
                                      )}
                                      {offer.status === 'rejected' && (
                                        <Badge className="bg-gray-100 text-gray-700">Respinsă</Badge>
                                      )}
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                                      <div>Preț: {offer.price.min}-{offer.price.max} RON</div>
                                      <div>Timp: {offer.timeEstimate}</div>
                                      <div>Garanție: {offer.warranty}</div>
                                    </div>
                                  </div>
                                  {offer.status === 'pending' && (
                                    <div className="flex space-x-2 ml-4">
                                      <Button
                                        size="sm"
                                        className="bg-orange-600 hover:bg-orange-700"
                                        onClick={() => acceptOffer(request.id, offer.id)}
                                      >
                                        <CheckCircle className="h-4 w-4 mr-1" />
                                        Acceptă
                                      </Button>
                                      <Button size="sm" variant="outline">
                                        <Phone className="h-4 w-4 mr-1" />
                                        Sună
                                      </Button>
                                      <Button size="sm" variant="outline">
                                        <MessageSquare className="h-4 w-4 mr-1" />
                                        Mesaj
                                      </Button>
                                    </div>
                                  )}
                                  {offer.status === 'accepted' && (
                                    <div className="flex space-x-2 ml-4">
                                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                        <Phone className="h-4 w-4 mr-1" />
                                        Sună: {offer.phone}
                                      </Button>
                                      <Button size="sm" variant="outline">
                                        <MessageSquare className="h-4 w-4 mr-1" />
                                        Chat
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {request.status === 'new' && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="flex items-center text-blue-700">
                            <Clock className="h-4 w-4 mr-2" />
                            <span className="text-sm">Cererea ta a fost trimisă. Vei primi oferte în curând!</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Vehicles Section */}
        <div className="mt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Vehiculele tale</h2>
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Adaugă vehicul
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vehicles.map((vehicle) => (
              <Card key={vehicle.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Car className="h-8 w-8 text-orange-600" />
                    <div>
                      <h3 className="font-semibold">{vehicle.make} {vehicle.model}</h3>
                      <p className="text-sm text-gray-600">{vehicle.year} • {vehicle.licensePlate}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Kilometraj: {vehicle.mileage.toLocaleString()} km</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    <Settings className="h-4 w-4 mr-2" />
                    Gestionează
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
