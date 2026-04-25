"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/context/cart-context"
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"

export default function CarritoPage() {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Tu carrito esta vacio</h1>
            <p className="text-muted-foreground mb-6">
              Agrega productos para comenzar tu pedido
            </p>
            <Link href="/#productos">
              <Button size="lg">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Ver productos
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Mi Carrito</h1>
            <Button variant="ghost" size="sm" onClick={clearCart} className="text-destructive hover:text-destructive w-fit">
              <Trash2 className="mr-2 h-4 w-4" />
              Vaciar carrito
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex gap-3 sm:gap-4">
                      {/* Product Image */}
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 flex flex-col min-w-0">
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">
                            {item.brand}
                          </p>
                          <h3 className="font-semibold text-foreground text-sm sm:text-lg line-clamp-2">
                            {item.name}
                          </h3>
                          {item.weight && (
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              {item.weight}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mt-2 sm:mt-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 sm:h-8 sm:w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <span className="w-6 sm:w-8 text-center font-semibold text-foreground text-sm sm:text-base">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 sm:h-8 sm:w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </div>

                          {/* Price */}
                          <div className="text-left sm:text-right">
                            {item.originalPrice && (
                              <p className="text-xs text-muted-foreground line-through">
                                ${(item.originalPrice * item.quantity).toLocaleString('es-AR')}
                              </p>
                            )}
                            <p className="text-base sm:text-lg font-bold text-primary">
                              ${(item.price * item.quantity).toLocaleString('es-AR')}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground hover:text-destructive flex-shrink-0"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="lg:sticky lg:top-24">
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-xl font-bold text-foreground mb-6">
                    Resumen del pedido
                  </h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} productos)
                      </span>
                      <span className="text-foreground">
                        ${totalPrice.toLocaleString('es-AR')}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Envio</span>
                      <span className="text-foreground">A coordinar</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-foreground">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        ${totalPrice.toLocaleString('es-AR')}
                      </span>
                    </div>
                  </div>

                  <Link href="/checkout">
                    <Button className="w-full font-semibold" size="lg">
                      Realizar pedido
                    </Button>
                  </Link>

                  <Link href="/#productos" className="block mt-4">
                    <Button variant="outline" className="w-full" size="lg">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Seguir comprando
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
