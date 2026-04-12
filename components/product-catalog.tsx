"use client"

import { useState } from "react"
import { ProductCard } from "./product-card"
import { Button } from "@/components/ui/button"

const products = [
  {
    id: 1,
    name: "Whey Protein Vainilla",
    brand: "Star Nutrition",
    category: "Proteína",
    description: "Proteína de suero de leche micro filtrada con 25g de proteína por porción. Sabor Vainilla Ice Cream.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-12%20at%2018.34.06-SnIXMD7kzQBWFmJiKYnsZL2RsSRr3S.jpeg",
    servings: "30",
    weight: "908g",
  },
  {
    id: 2,
    name: "Creatina Monohydrate",
    brand: "Star Nutrition",
    category: "Creatina",
    description: "Creatina monohidrato ultramicronizada 100% pura. 5g de creatina por porción.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-12%20at%2018.34.06%20%282%29-SaY0s1jpVTWAmKC0ODVxty1A6eAbpX.jpeg",
    servings: "60",
    weight: "300g",
  },
  {
    id: 3,
    name: "Creatina BSN",
    brand: "BSN",
    category: "Creatina",
    description: "Creatina monohidrato sin sabor para mezclar. Aumenta la fuerza y el rendimiento muscular.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-12%20at%2018.34.06%20%283%29-b98eE6MOOCgKPcXhhBSPi8f2Lkqfjp.jpeg",
    servings: "60",
    weight: "309g",
  },
  {
    id: 4,
    name: "Creatine Micronized 200g",
    brand: "One Fit Nutrition",
    category: "Creatina",
    description: "Creatina micronizada con Vitamina C. Mejora el rendimiento y aumenta la fuerza.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-12%20at%2018.34.06%20%281%29-MGTbbvJgUM3pCstX3MnXElsgbFVBU6.jpeg",
    servings: "40",
    weight: "200g",
  },
  {
    id: 5,
    name: "Creatine Micronized 500g",
    brand: "One Fit Nutrition",
    category: "Creatina",
    description: "Creatina micronizada 100% pura. 5g de monohidrato de creatina por porción.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-12%20at%2018.34.07-yg9WvPowZxf4Zecx4SxwYMmsBJjKNK.jpeg",
    servings: "100",
    weight: "500g",
  },
  {
    id: 6,
    name: "Pump 3D Ripped",
    brand: "Star Nutrition",
    category: "Pre-entreno",
    description: "Pre-workout energizante con cafeína y taurina. Sabor Frutilla Lima. Libre de gluten.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-12%20at%2018.34.07%20%281%29-hKkv4tDEuuUdb5Ah5EIosQ7FDOvRzj.jpeg",
    servings: "45",
    weight: "315g",
  },
  {
    id: 7,
    name: "Collagen Plus",
    brand: "Star Nutrition",
    category: "Colágeno",
    description: "Colágeno hidrolizado con vitaminas y minerales. Mejora la salud de articulaciones y huesos. Sabor limón.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-12%20at%2018.34.07%20%282%29-WaTbS4KSDu4Z9M77utKSZHS6et2pqU.jpeg",
    servings: "30",
    weight: "360g",
  },
  {
    id: 8,
    name: "Multivitamin All in One",
    brand: "Star Nutrition",
    category: "Vitaminas",
    description: "Multivitamínico completo con 23 vitaminas y minerales. Libre de gluten, sin TACC.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-12%20at%2018.34.07%20%283%29-eqYNifrddiLDOGNvCUEkv4kNoE8Whh.jpeg",
    servings: "60",
    weight: "60 comp",
  },
  {
    id: 9,
    name: "Omega 3 Fish Oil",
    brand: "Star Nutrition",
    category: "Vitaminas",
    description: "Aceite de pescado Omega 3 en cápsulas. Suplemento dietario libre de gluten.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-12%20at%2018.34.07%20%284%29-VMaEO1X3sZePd7EgFZYy4ABxcXYAFr.jpeg",
    servings: "60",
    weight: "60 caps",
  },
]

const categories = ["Todos", "Proteína", "Creatina", "Pre-entreno", "Vitaminas", "Colágeno"]

export function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState("Todos")

  const filteredProducts = activeCategory === "Todos"
    ? products
    : products.filter(product => product.category === activeCategory)

  return (
    <section id="productos" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nuestros Productos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explora nuestra selección de suplementos deportivos de las mejores marcas
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="font-medium"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  )
}
