"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ShoppingCart, Info, Plus, Minus, Check } from "lucide-react"
import { useCart } from "@/context/cart-context"

interface ProductCardProps {
  id: string
  name: string
  brand: string
  category: string
  description: string
  image: string
  servings?: string
  weight?: string
  price: number
  offerPrice?: number | null
  inStock: boolean
  whatIs: string
  benefits: string
  bestTime: string
  flavors?: string[]
}

export function ProductCard({
  id,
  name,
  brand,
  category,
  description,
  image,
  servings,
  weight,
  price,
  offerPrice,
  inStock,
  whatIs,
  benefits,
  bestTime,
  flavors = [],
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedFlavor, setSelectedFlavor] = useState(flavors.length > 0 ? flavors[0] : "")
  const [showAdded, setShowAdded] = useState(false)
  const { addToCart } = useCart()

  const increaseQuantity = () => setQuantity(prev => prev + 1)
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1))

  const finalPrice = offerPrice ?? price
  
  const handleAddToCart = () => {
    addToCart(
      {
        id,
        name: selectedFlavor ? `${name} - ${selectedFlavor}` : name,
        brand,
        image,
        price: finalPrice,
        weight,
        flavor: selectedFlavor || undefined,
      },
      quantity
    )
    setShowAdded(true)
    setTimeout(() => setShowAdded(false), 2000)
    setQuantity(1)
  }

  return (
    <Card className="group overflow-hidden border-border bg-card hover:border-primary/50 transition-all duration-300 h-full flex flex-col cursor-default">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
          {category}
        </Badge>
        {!inStock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <Badge variant="destructive" className="text-base px-4 py-2">
              Sin Stock
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-3 sm:p-4 flex flex-col">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {brand}
        </p>
        <h3 className="font-bold text-foreground text-base sm:text-lg mb-2 line-clamp-2">
          {name}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
          {weight && (
            <span className="px-2 py-1 bg-secondary rounded-md">
              {weight}
            </span>
          )}
          {servings && (
            <span className="px-2 py-1 bg-secondary rounded-md">
              {servings} serv.
            </span>
          )}
        </div>
        
        {/* Flavor Selector */}
        {flavors.length > 0 && (
          <div className="mb-3">
            <label className="text-sm text-muted-foreground mb-2 block">Sabor:</label>
            <select
              value={selectedFlavor}
              onChange={(e) => setSelectedFlavor(e.target.value)}
              className="w-full px-3 py-2 bg-secondary text-foreground rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm cursor-pointer"
              disabled={!inStock}
            >
              {flavors.map((flavor) => (
                <option key={flavor} value={flavor}>
                  {flavor}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Price */}
        <div className="mb-3 flex items-center gap-2">
          {offerPrice ? (
            <>
              <span className="text-sm text-muted-foreground line-through">
                ${price.toLocaleString('es-AR')}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-primary">
                ${offerPrice.toLocaleString('es-AR')}
              </span>
            </>
          ) : (
            <span className="text-xl sm:text-2xl font-bold text-primary">
              ${price.toLocaleString('es-AR')}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-3">
          {/* Info Modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1">
                <Info className="mr-2 h-4 w-4" />
                Info
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-md max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl">{name}</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {brand} - {category}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Que es?
                  </h4>
                  <p className="text-sm text-muted-foreground">{whatIs}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Para que sirve?
                  </h4>
                  <p className="text-sm text-muted-foreground">{benefits}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Mejor hora para consumir
                  </h4>
                  <p className="text-sm text-muted-foreground">{bestTime}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Quantity Selector - Always visible for consistent card height */}
        <div className={`flex items-center justify-between gap-2 mb-3 ${!inStock ? 'opacity-50' : ''}`}>
          <span className="text-sm text-muted-foreground">Cantidad:</span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={decreaseQuantity}
              disabled={!inStock}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-semibold text-foreground">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={increaseQuantity}
              disabled={!inStock}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button 
          className="w-full font-semibold" 
          size="sm"
          disabled={!inStock}
          onClick={handleAddToCart}
        >
          {showAdded ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Agregado
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              {inStock ? "Agregar al carrito" : "Sin Stock"}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
