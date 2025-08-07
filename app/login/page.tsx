"use client";

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wrench, User, Building } from 'lucide-react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { authenticateUser } from '@/lib/auth'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleClientLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    // Validare reală cu contul de test
    const user = authenticateUser(email, password, 'client')
    
    setTimeout(() => {
      setIsLoading(false)
      if (user) {
        router.push('/client-dashboard')
      } else {
        alert('Email sau parolă incorectă!\n\nCont de test:\nEmail: client@carnect.ro\nParolă: client123')
      }
    }, 1000)
  }

  const handleServiceLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    // Validare reală cu contul de test
    const user = authenticateUser(email, password, 'service')
    
    setTimeout(() => {
      setIsLoading(false)
      if (user) {
        router.push('/service-dashboard')
      } else {
        alert('Email sau parolă incorectă!\n\nCont de test:\nEmail: service@carnect.ro\nParolă: service123')
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-6">
            <Wrench className="h-10 w-10 text-orange-600" />
            <span className="text-3xl font-bold text-gray-900">CarNect</span>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">
            Conectează-te la contul tău
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Alege tipul de cont pentru a te conecta
          </p>
        </div>

        <Tabs defaultValue="client" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="client" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Client</span>
            </TabsTrigger>
            <TabsTrigger value="service" className="flex items-center space-x-2">
              <Building className="h-4 w-4" />
              <span>Service</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="client">
            <Card>
              <CardHeader>
                <CardTitle>Conectare Client</CardTitle>
                <CardDescription>
                  Conectează-te pentru a găsi service-uri auto în zona ta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleClientLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="client-email">Email</Label>
                    <Input
                      id="client-email"
                      type="email"
                      placeholder="exemplu@email.com"
                      required
                      name="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-password">Parolă</Label>
                    <Input
                      id="client-password"
                      type="password"
                      placeholder="Introdu parola"
                      required
                      name="password"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Link href="/forgot-password" className="text-sm text-orange-600 hover:text-orange-500">
                      Ai uitat parola?
                    </Link>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Se conectează...' : 'Conectare'}
                  </Button>
                </form>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Nu ai cont?{' '}
                    <Link href="/register" className="text-orange-600 hover:text-orange-500 font-medium">
                      Înregistrează-te aici
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="service">
            <Card>
              <CardHeader>
                <CardTitle>Conectare Service</CardTitle>
                <CardDescription>
                  Conectează-te la panoul tău de partener CarNect
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleServiceLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="service-email">Email</Label>
                    <Input
                      id="service-email"
                      type="email"
                      placeholder="contact@service.ro"
                      required
                      name="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service-password">Parolă</Label>
                    <Input
                      id="service-password"
                      type="password"
                      placeholder="Introdu parola"
                      required
                      name="password"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Link href="/forgot-password" className="text-sm text-orange-600 hover:text-orange-500">
                      Ai uitat parola?
                    </Link>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Se conectează...' : 'Conectare'}
                  </Button>
                </form>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Nu ești încă partener?{' '}
                    <Link href="/register" className="text-orange-600 hover:text-orange-500 font-medium">
                      Devino partener CarNect
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Conturi de testare:</h4>
          <div className="text-sm text-blue-700">
            <p><strong>Client:</strong> client@carnect.ro / client123</p>
            <p><strong>Service:</strong> service@carnect.ro / service123</p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-500">
            ← Înapoi la pagina principală
          </Link>
        </div>
      </div>
    </div>
  )
}
