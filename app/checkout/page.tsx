"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2, CheckCircle, ShoppingBag, User, Phone, Mail, MapPin } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")
  const [whatsappUrl, setWhatsappUrl] = useState("")
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  })
  
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  })

  const validateForm = () => {
    const newErrors = {
      name: "",
      phone: "",
      email: "",
      address: "",
    }
    
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido"
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }
    
    if (!formData.address.trim()) {
      newErrors.address = "La dirección es requerida"
    }
    
    setErrors(newErrors)
    return !Object.values(newErrors).some(error => error)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    if (items.length === 0) return
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: formData.name,
          customerPhone: formData.phone,
          customerEmail: formData.email,
          customerAddress: formData.address,
          items: items.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          total: totalPrice,
        }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setOrderNumber(data.orderNumber)
        setWhatsappUrl(data.whatsappUrl)
        setOrderComplete(true)
        clearCart()
      }
    } catch (error) {
      console.error("Error submitting order:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Order complete screen
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-lg">
          <Card className="border-border bg-card">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Pedido Realizado
              </h1>
              
              <p className="text-muted-foreground mb-4">
                Tu numero de pedido es:
              </p>
              
              <p className="text-3xl font-bold text-primary mb-6">
                {orderNumber}
              </p>
              
              <p className="text-sm text-muted-foreground mb-8">
                Para completar tu pedido, envía los detalles por WhatsApp haciendo click en el botón de abajo.
              </p>
              
              <div className="space-y-4">
                <Button 
                  className="w-full font-semibold"
                  size="lg"
                  onClick={() => window.open(whatsappUrl, "_blank")}
                >
                  Enviar pedido por WhatsApp
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => router.push("/")}
                >
                  Volver al inicio
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Empty cart redirect
  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-lg">
          <Card className="border-border bg-card">
            <CardContent className="p-8 text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h1 className="text-xl font-semibold text-foreground mb-2">
                Tu carrito esta vacio
              </h1>
              <p className="text-muted-foreground mb-6">
                Agrega productos para continuar con la compra
              </p>
              <Button onClick={() => router.push("/#productos")}>
                Ver productos
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/carrito" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al carrito
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Finalizar Compra</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Form */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">Datos del Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    Nombre completo
                  </Label>
                  <Input
                    id="name"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    Telefono
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+54 3835 123456"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Direccion de entrega
                  </Label>
                  <Input
                    id="address"
                    placeholder="Calle, numero, ciudad"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={errors.address ? "border-destructive" : ""}
                  />
                  {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
                </div>

                <Button 
                  type="submit" 
                  className="w-full font-semibold" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    `Realizar Pedido - $${totalPrice.toLocaleString("es-AR")}`
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="border-border bg-card h-fit">
            <CardHeader>
              <CardTitle className="text-foreground">Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 py-3 border-b border-border last:border-0">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground text-sm truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{item.brand}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-muted-foreground">
                        Cantidad: {item.quantity}
                      </span>
                      <span className="text-sm font-semibold text-primary">
                        ${(item.price * item.quantity).toLocaleString("es-AR")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="border-t border-border pt-4 mt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">${totalPrice.toLocaleString("es-AR")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
