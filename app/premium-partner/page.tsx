"use client";

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Wrench, Crown, Star, TrendingUp, Users, MapPin, Clock, Shield, CheckCircle, X, Zap, Award, Target, BarChart3, Calendar, Phone, Mail, ArrowRight, DollarSign } from 'lucide-react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { upgradeUserToPremium, downgradeUserToStandard } from '@/lib/auth'

export default function PremiumPartnerPage() {
  const [selectedPlan, setSelectedPlan] = useState('premium')
  const [showContactForm, setShowContactForm] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    phone: '',
    email: '',
    city: '',
    currentClients: '',
    message: ''
  })
  const router = useRouter()

  const plans = [
    {
      id: 'standard',
      name: 'Standard',
      price: 'Gratuit',
      color: 'border-gray-200',
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      features: [
        'Profil de bază în platformă',
        'Primești cereri de la clienți',
        'Comision 8% per tranzacție',
        'Suport email',
        'Afișare în rezultatele de căutare'
      ],
      limitations: [
        'Fără prioritate în căutări',
        'Fără badge special',
        'Fără promovare în sidebar',
        'Comision mai mare'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '299 RON/lună',
      color: 'border-yellow-400',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-orange-50',
      textColor: 'text-yellow-800',
      badge: 'PREMIUM',
      badgeColor: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
      features: [
        'Toate beneficiile Standard',
        'Badge PREMIUM vizibil',
        'Prioritate în rezultatele de căutare',
        'Afișare în sidebar-ul premium',
        'Comision redus la 5%',
        'Rotație automată în anunțuri',
        'Statistici avansate',
        'Suport telefonic prioritar'
      ],
      benefits: [
        'Vizibilitate cu 300% mai mare',
        'Clienți premium cu buget mai mare',
        'Creștere medie de 40% în rezervări'
      ]
    },
    {
      id: 'exclusiv',
      name: 'Exclusiv',
      price: '499 RON/lună',
      color: 'border-purple-400',
      bgColor: 'bg-gradient-to-br from-purple-50 to-indigo-50',
      textColor: 'text-purple-800',
      badge: 'EXCLUSIV',
      badgeColor: 'bg-gradient-to-r from-purple-500 to-purple-700',
      features: [
        'Toate beneficiile Premium',
        'Badge EXCLUSIV',
        'Poziție fixă în top 3 rezultate',
        'Promovare dedicată în homepage',
        'Comision redus la 3%',
        'Manager de cont dedicat',
        'Rapoarte personalizate săptămânale',
        'Acces la beta features'
      ],
      benefits: [
        'Vizibilitate maximă garantată',
        'Clienți exclusivi cu cerințe premium',
        'Creștere medie de 70% în venituri'
      ]
    }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleUpgrade = async (planId) => {
    if (planId === 'standard') {
      const success = downgradeUserToStandard()
      if (success) {
        alert('Ai fost downgradeat la planul Standard.')
        router.push('/service-dashboard')
      }
      return
    }

    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      const success = upgradeUserToPremium(planId as 'premium' | 'exclusiv')
      setIsProcessing(false)
      
      if (success) {
        alert(`Felicitări! Ai fost upgradeat la planul ${plans.find(p => p.id === planId)?.name}. Toate beneficiile sunt acum active!`)
        router.push('/service-dashboard')
      } else {
        alert('A apărut o eroare. Te rugăm să încerci din nou.')
      }
    }, 2000)
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()
    alert(`Mulțumim pentru interesul tău, ${formData.contactName}! Te vom contacta în maxim 24 de ore pentru a discuta despre planul ${plans.find(p => p.id === selectedPlan)?.name}.`)
    setShowContactForm(false)
    setFormData({
      companyName: '',
      contactName: '',
      phone: '',
      email: '',
      city: '',
      currentClients: '',
      message: ''
    })
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
            <Link href="/service-dashboard">
              <Button variant="ghost">Dashboard</Button>
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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Crown className="h-12 w-12 text-yellow-600" />
              <h1 className="text-5xl font-bold text-gray-900">
                Devino Partener <span className="text-yellow-600">Premium</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Crește-ți vizibilitatea, primește mai mulți clienți și câștigă mai mult cu planurile noastre premium. 
              Service-urile premium au în medie cu 40-70% mai multe rezervări.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white text-lg px-8"
                onClick={() => setShowContactForm(true)}
              >
                <Crown className="h-5 w-5 mr-2" />
                Începe acum
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Vezi demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">+300%</div>
              <div className="text-gray-600">Vizibilitate crescută</div>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">+40%</div>
              <div className="text-gray-600">Mai mulți clienți</div>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">-60%</div>
              <div className="text-gray-600">Comision redus</div>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600">Suport premium</div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Alege planul potrivit pentru tine
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Compară beneficiile și alege planul care îți maximizează profitul
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative hover:shadow-xl transition-all cursor-pointer ${
                  selectedPlan === plan.id ? `${plan.color} border-2` : 'border border-gray-200'
                } ${plan.bgColor}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className={`${plan.badgeColor} text-white px-4 py-1`}>
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className={`text-2xl font-bold ${plan.textColor}`}>
                    {plan.name}
                  </CardTitle>
                  <div className="text-3xl font-bold text-gray-900 mt-2">
                    {plan.price}
                  </div>
                  {plan.id !== 'standard' && (
                    <p className="text-sm text-gray-600">+ TVA</p>
                  )}
                </CardHeader>

                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Caracteristici incluse:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.benefits && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Beneficii dovedite:</h4>
                      <ul className="space-y-2">
                        {plan.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Zap className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700 font-medium">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {plan.limitations && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Limitări:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-4">
                    <Button 
                      className={`w-full ${
                        plan.id === 'standard' 
                          ? 'bg-gray-600 hover:bg-gray-700' 
                          : plan.id === 'premium'
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600'
                          : 'bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800'
                      } text-white`}
                      onClick={() => handleUpgrade(plan.id)}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        'Se procesează...'
                      ) : (
                        <>
                          {plan.id === 'standard' ? 'Downgrade la Standard' : `Upgrade la ${plan.name}`}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ce obții cu planurile Premium
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Crown className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Badge Premium</h3>
                <p className="text-gray-600">
                  Badge-ul tău premium va fi vizibil în toate căutările, inspirând încredere clienților.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Prioritate în căutări</h3>
                <p className="text-gray-600">
                  Apari în top 3 rezultate pentru toate căutările relevante din zona ta.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Rotație automată</h3>
                <p className="text-gray-600">
                  Service-ul tău apare în sidebar-ul premium cu rotație automată la fiecare 5 secunde.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Statistici avansate</h3>
                <p className="text-gray-600">
                  Rapoarte detaliate despre performanța ta, clienți și venituri.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Comision redus</h3>
                <p className="text-gray-600">
                  Plătești doar 3-5% comision în loc de 8% pentru fiecare tranzacție.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Suport prioritar</h3>
                <p className="text-gray-600">
                  Suport telefonic dedicat și manager de cont pentru planurile premium.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Gata să îți crești afacerea?
          </h2>
          <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
            Alătură-te celor peste 200 de service-uri premium care și-au crescut veniturile cu CarNect.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8"
            onClick={() => handleUpgrade('premium')}
            disabled={isProcessing}
          >
            <Crown className="h-5 w-5 mr-2" />
            {isProcessing ? 'Se procesează...' : 'Începe perioada de probă gratuită'}
          </Button>
        </div>
      </section>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">
                  Devino Partener Premium
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowContactForm(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                Completează formularul și te vom contacta în maxim 24 de ore pentru a discuta despre planul {plans.find(p => p.id === selectedPlan)?.name}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitForm} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Numele companiei *
                    </label>
                    <Input
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="ex: AutoService Pro SRL"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Persoana de contact *
                    </label>
                    <Input
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      placeholder="ex: Ion Popescu"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon *
                    </label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="ex: 0721234567"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ex: contact@autoservice.ro"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Orașul *
                    </label>
                    <Input
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="ex: București"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Clienți actuali pe lună
                    </label>
                    <select
                      name="currentClients"
                      value={formData.currentClients}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">Selectează</option>
                      <option value="0-10">0-10 clienți</option>
                      <option value="10-50">10-50 clienți</option>
                      <option value="50-100">50-100 clienți</option>
                      <option value="100+">Peste 100 clienți</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mesaj suplimentar
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Spune-ne mai multe despre service-ul tău și obiectivele tale..."
                    rows={4}
                  />
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">
                    Planul selectat: {plans.find(p => p.id === selectedPlan)?.name}
                  </h4>
                  <p className="text-sm text-yellow-700">
                    Preț: {plans.find(p => p.id === selectedPlan)?.price}
                  </p>
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowContactForm(false)}
                    className="flex-1"
                  >
                    Anulează
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                  >
                    Trimite cererea
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
