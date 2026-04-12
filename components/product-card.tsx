"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"

interface ProductCardProps {
  name: string
  brand: string
  category: string
  description: string
  image: string
  servings?: string
  weight?: string
}

export function ProductCard({
  name,
  brand,
  category,
  description,
  image,
  servings,
  weight,
}: ProductCardProps) {
  return (
    <Card className="group overflow-hidden border-border bg-card hover:border-primary/50 transition-all duration-300">
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
      </div>
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {brand}
        </p>
        <h3 className="font-bold text-foreground text-lg mb-2 line-clamp-1">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground">
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
        <Button className="w-full font-semibold" size="sm">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Consultar
        </Button>
      </CardContent>
    </Card>
  )
}
