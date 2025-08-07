'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Wrench, User, Building, Phone, Mail, MapPin, FileText, Shield } from 'lucide-react'
import Link from "next/link"

export default function RegisterPage() {
  const [clientData, setClientData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    acceptTerms: false
  })

  const [serviceData, setServiceData] = useState({
    companyName: '',
    cui: '',
    cif: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    services: [] as string[],
    acceptTerms: false
  })

  const serviceTypes = [
    { id: 'service_complet', label: 'Service complet' },
    { id: 'reparatii_motor', label: 'Reparații motor' },
    { id: 'schimb_ulei', label: 'Schimb ulei și filtre' },
    { id: 'diagnosticare', label: 'Diagnosticare auto' },
    { id: 'reparatii_caroserie', label: 'Reparații caroserie' },
    { id: 'instalatii_electrice', label: 'Instalații electrice' }
  ]

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Client registration:', clientData)
    alert('Înregistrarea ca client a fost trimisă! Vei primi un email de confirmare.')
  }

  const handleServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Service registration:', serviceData)
    alert('Înregistrarea ca service a fost trimisă! Vei fi contactat pentru verificare în maxim 48 de ore.')
  }

  const handleServiceToggle = (serviceId: string) => {
    setServiceData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId]
    }))
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
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Înregistrează-te pe CarNect</h1>
            <p className="text-xl text-gray-600">Alege tipul de cont potrivit pentru tine</p>
          </div>

          <Tabs defaultValue="client" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="client" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Proprietar auto</span>
              </TabsTrigger>
              <TabsTrigger value="service" className="flex items-center space-x-2">
                <Building className="h-4 w-4" />
                <span>Service auto</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="client">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-6 w-6 text-orange-600" />
                    <span>Înregistrare proprietar auto</span>
                  </CardTitle>
                  <CardDescription>
                    Creează un cont pentru a găsi și rezerva servicii auto de încredere
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleClientSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="client-name">Nume complet *</Label>
                        <Input
                          id="client-name"
                          type="text"
                          placeholder="ex: Ion Popescu"
                          value={clientData.name}
                          onChange={(e) => setClientData(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="client-email">Email *</Label>
                        <Input
                          id="client-email"
                          type="email"
                          placeholder="ex: ion.popescu@email.com"
                          value={clientData.email}
                          onChange={(e) => setClientData(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="client-phone">Telefon *</Label>
                        <Input
                          id="client-phone"
                          type="tel"
                          placeholder="ex: 0721234567"
                          value={clientData.phone}
                          onChange={(e) => setClientData(prev => ({ ...prev, phone: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="client-city">Orașul *</Label>
                        <Input
                          id="client-city"
                          type="text"
                          placeholder="ex: București"
                          value={clientData.city}
                          onChange={(e) => setClientData(prev => ({ ...prev, city: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="client-terms"
                        checked={clientData.acceptTerms}
                        onCheckedChange={(checked) => 
                          setClientData(prev => ({ ...prev, acceptTerms: checked as boolean }))
                        }
                      />
                      <Label htmlFor="client-terms" className="text-sm">
                        Accept <Link href="/terms" className="text-orange-600 hover:underline">termenii și condițiile</Link> și <Link href="/privacy" className="text-orange-600 hover:underline">politica de confidențialitate</Link>
                      </Label>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      disabled={!clientData.acceptTerms}
                    >
                      Înregistrează-te ca proprietar auto
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="service">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-6 w-6 text-orange-600" />
                    <span>Înregistrare service auto</span>
                  </CardTitle>
                  <CardDescription>
                    Înregistrează-ți service-ul pentru a primi cereri de la clienți
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleServiceSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company-name">Numele companiei *</Label>
                        <Input
                          id="company-name"
                          type="text"
                          placeholder="ex: AutoService Pro SRL"
                          value={serviceData.companyName}
                          onChange={(e) => setServiceData(prev => ({ ...prev, companyName: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-person">Persoana de contact *</Label>
                        <Input
                          id="contact-person"
                          type="text"
                          placeholder="ex: Ion Popescu"
                          value={serviceData.contactPerson}
                          onChange={(e) => setServiceData(prev => ({ ...prev, contactPerson: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="cui">CUI *</Label>
                        <Input
                          id="cui"
                          type="text"
                          placeholder="ex: RO12345678"
                          value={serviceData.cui}
                          onChange={(e) => setServiceData(prev => ({ ...prev, cui: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cif">Nr. reg. com. (CIF) *</Label>
                        <Input
                          id="cif"
                          type="text"
                          placeholder="ex: J40/1234/2020"
                          value={serviceData.cif}
                          onChange={(e) => setServiceData(prev => ({ ...prev, cif: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="service-email">Email *</Label>
                        <Input
                          id="service-email"
                          type="email"
                          placeholder="ex: contact@autoservice.ro"
                          value={serviceData.email}
                          onChange={(e) => setServiceData(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service-phone">Telefon *</Label>
                        <Input
                          id="service-phone"
                          type="tel"
                          placeholder="ex: 0721234567"
                          value={serviceData.phone}
                          onChange={(e) => setServiceData(prev => ({ ...prev, phone: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Adresa completă *</Label>
                      <Input
                        id="address"
                        type="text"
                        placeholder="ex: Str. Industriei nr. 15, Sector 3, București"
                        value={serviceData.address}
                        onChange={(e) => setServiceData(prev => ({ ...prev, address: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-4">
                      <Label>Servicii oferite * (selectează cel puțin unul)</Label>
                      <div className="grid md:grid-cols-2 gap-3">
                        {serviceTypes.map((service) => (
                          <div key={service.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={service.id}
                              checked={serviceData.services.includes(service.id)}
                              onCheckedChange={() => handleServiceToggle(service.id)}
                            />
                            <Label htmlFor={service.id} className="text-sm">
                              {service.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-900">Proces de verificare</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            Toate service-urile sunt verificate de echipa noastră înainte de a fi activate. 
                            Vei fi contactat în maxim 48 de ore pentru confirmarea datelor.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="service-terms"
                        checked={serviceData.acceptTerms}
                        onCheckedChange={(checked) => 
                          setServiceData(prev => ({ ...prev, acceptTerms: checked as boolean }))
                        }
                      />
                      <Label htmlFor="service-terms" className="text-sm">
                        Accept <Link href="/terms" className="text-orange-600 hover:underline">termenii și condițiile</Link> și <Link href="/privacy" className="text-orange-600 hover:underline">politica de confidențialitate</Link>
                      </Label>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      disabled={!serviceData.acceptTerms || serviceData.services.length === 0}
                    >
                      Înregistrează service-ul
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
