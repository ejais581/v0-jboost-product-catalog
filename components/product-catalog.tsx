"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "./product-card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface Product {
  id: string
  name: string
  brand: string
  category: string
  weight: string
  servings: string
  description: string
  image: string
  price: number
  inStock: boolean
  whatIs: string
  benefits: string
  bestTime: string
}

// Productos por defecto para mostrar mientras no hay conexion a Google Sheets
const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Whey Protein Vainilla",
    brand: "Star Nutrition",
    category: "Proteína",
    description: "Proteína de suero de leche micro filtrada con 25g de proteína por porción.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-12%20at%2018.34.06-SnIXMD7kzQBWFmJiKYnsZL2RsSRr3S.jpeg",
    servings: "30",
    weight: "908g",
    price: 45000,
    inStock: true,
    whatIs: "La Whey Protein es una proteína de suero de leche de alta calidad, obtenida mediante un proceso de micro filtración que preserva los aminoácidos esenciales.",
    benefits: "Ayuda a la recuperación muscular después del entrenamiento, promueve el crecimiento de masa muscular magra y aporta 25g de proteína de alta biodisponibilidad por porción.",
    bestTime: "Ideal consumir dentro de los 30 minutos posteriores al entrenamiento para maximizar la síntesis proteica. También puede tomarse en el desayuno.",
  },
  {
    id: "2",
    name: "Creatina Monohydrate",
    brand: "Star Nutrition",
    category: "Creatina",
    description: "Creatina monohidrato ultramicronizada 100% pura. 5g de creatina por porción.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-12%20at%2018.34.06%20%282%29-SaY0s1jpVTWAmKC0ODVxty1A6eAbpX.jpeg",
    servings: "60",
    weight: "300g",
    price: 18000,
    inStock: true,
    whatIs: "La creatina monohidrato es uno de los suplementos más estudiados y efectivos para mejorar el rendimiento deportivo. Es una molécula que se encuentra naturalmente en el cuerpo.",
    benefits: "Aumenta la fuerza y potencia muscular, mejora el rendimiento en ejercicios de alta intensidad, y ayuda a ganar masa muscular magra.",
    bestTime: "Puede tomarse en cualquier momento del día. Muchos prefieren tomarla post-entrenamiento junto con carbohidratos para mejor absorción.",
  },
  {
    id: "3",
    name: "Creatina BSN",
    brand: "BSN",
    category: "Creatina",
    description: "Creatina monohidrato sin sabor para mezclar. Aumenta la fuerza y el rendimiento muscular.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-12%20at%2018.34.06%20%283%29-b98eE6MOOCgKPcXhhBSPi8f2Lkqfjp.jpeg",
    servings: "60",
    weight: "309g",
    price: 22000,
    inStock: true,
    whatIs: "Creatina monohidrato de grado farmacéutico de la reconocida marca BSN. Sin sabor para mezclar fácilmente con cualquier bebida.",
    benefits: "Incrementa los niveles de fosfocreatina muscular, mejora la recuperación entre series y aumenta la capacidad de trabajo en entrenamientos intensos.",
    bestTime: "Tomar 5g diarios, preferiblemente después del entrenamiento mezclada con tu batido de proteínas o jugo.",
  },
  {
    id: "4",
    name: "Creatine Micronized 200g",
    brand: "One Fit Nutrition",
    category: "Creatina",
    description: "Creatina micronizada con Vitamina C. Mejora el rendimiento y aumenta la fuerza.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-12%20at%2018.34.06%20%281%29-MGTbbvJgUM3pCstX3MnXElsgbFVBU6.jpeg",
    servings: "40",
    weight: "200g",
    price: 15000,
    inStock: false,
    whatIs: "Creatina micronizada de partículas ultra finas para mejor disolución y absorción, enriquecida con Vitamina C como antioxidante.",
    benefits: "La micronización permite una absorción más rápida. La Vitamina C añadida ayuda a combatir el estrés oxidativo del entrenamiento intenso.",
    bestTime: "Consumir una porción de 5g al día. Puede dividirse en 2.5g pre-entrenamiento y 2.5g post-entrenamiento.",
  },
  {
    id: "5",
    name: "Creatine Micronized 500g",
    brand: "One Fit Nutrition",
    category: "Creatina",
    description: "Creatina micronizada 100% pura. 5g de monohidrato de creatina por porción.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-12%20at%2018.34.07-yg9WvPowZxf4Zecx4SxwYMmsBJjKNK.jpeg",
    servings: "100",
    weight: "500g",
    price: 28000,
    inStock: true,
    whatIs: "Creatina monohidrato micronizada de máxima pureza. El tamaño de partícula reducido garantiza mejor mezcla y absorción.",
    benefits: "Aumenta los depósitos de ATP muscular para más energía durante el ejercicio, mejora la hidratación celular y acelera la recuperación.",
    bestTime: "Tomar 5g diarios de forma consistente. Los días de entrenamiento tomarla post-ejercicio, los días de descanso en cualquier momento con una comida.",
  },
  {
    id: "6",
    name: "Pump 3D Ripped",
    brand: "Star Nutrition",
    category: "Pre-entreno",
    description: "Pre-workout energizante con cafeína y taurina. Sabor Frutilla Lima. Libre de gluten.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-12%20at%2018.34.07%20%281%29-hKkv4tDEuuUdb5Ah5EIosQ7FDOvRzj.jpeg",
    servings: "45",
    weight: "315g",
    price: 32000,
    inStock: true,
    whatIs: "Pre-entreno de alta potencia formulado con cafeína, taurina, beta-alanina y extractos vegetales para máxima energía y pump muscular.",
    benefits: "Aumenta la energía y el enfoque mental, mejora el pump y la vascularización, retrasa la fatiga y aumenta el rendimiento en el entrenamiento.",
    bestTime: "Tomar 20-30 minutos antes del entrenamiento. No consumir cerca de la hora de dormir debido a su contenido de cafeína. Evitar en niños.",
  },
  {
    id: "7",
    name: "Collagen Plus",
    brand: "Star Nutrition",
    category: "Colágeno",
    description: "Colágeno hidrolizado con vitaminas y minerales. Mejora la salud de articulaciones y huesos. Sabor limón.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-12%20at%2018.34.07%20%282%29-WaTbS4KSDu4Z9M77utKSZHS6et2pqU.jpeg",
    servings: "30",
    weight: "360g",
    price: 25000,
    inStock: true,
    whatIs: "Colágeno hidrolizado de alta biodisponibilidad enriquecido con Vitamina C y minerales esenciales para la síntesis de colágeno.",
    benefits: "Fortalece articulaciones, tendones y ligamentos, mejora la elasticidad de la piel, fortalece uñas y cabello, y ayuda a prevenir lesiones.",
    bestTime: "Tomar una porción diaria en ayunas o antes de dormir para maximizar la absorción. Puede mezclarse con agua o jugo.",
  },
  {
    id: "8",
    name: "Multivitamin All in One",
    brand: "Star Nutrition",
    category: "Vitaminas",
    description: "Multivitamínico completo con 23 vitaminas y minerales. Libre de gluten, sin TACC.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-12%20at%2018.34.07%20%283%29-eqYNifrddiLDOGNvCUEkv4kNoE8Whh.jpeg",
    servings: "60",
    weight: "60 comp",
    price: 12000,
    inStock: true,
    whatIs: "Fórmula completa de vitaminas y minerales diseñada para cubrir las necesidades nutricionales de personas activas y deportistas.",
    benefits: "Cubre deficiencias nutricionales, fortalece el sistema inmune, mejora los niveles de energía y apoya la función metabólica óptima.",
    bestTime: "Tomar 1 comprimido al día con el desayuno o almuerzo, junto con alimentos para mejor absorción de las vitaminas liposolubles.",
  },
  {
    id: "9",
    name: "Omega 3 Fish Oil",
    brand: "Star Nutrition",
    category: "Vitaminas",
    description: "Aceite de pescado Omega 3 en cápsulas. Suplemento dietario libre de gluten.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-12%20at%2018.34.07%20%284%29-VMaEO1X3sZePd7EgFZYy4ABxcXYAFr.jpeg",
    servings: "60",
    weight: "60 caps",
    price: 14000,
    inStock: false,
    whatIs: "Cápsulas de aceite de pescado rico en ácidos grasos esenciales EPA y DHA, fundamentales para la salud cardiovascular y cerebral.",
    benefits: "Reduce la inflamación, mejora la salud cardiovascular, apoya la función cerebral y cognitiva, y ayuda en la recuperación muscular.",
    bestTime: "Tomar 1-2 cápsulas al día con las comidas principales. Puede tomarse junto con el desayuno y/o la cena.",
  },
]

export function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState("Todos")
  const [products, setProducts] = useState<Product[]>(defaultProducts)
  const [loading, setLoading] = useState(true)

  // Generar categorias dinamicamente de los productos
  const categories = ["Todos", ...Array.from(new Set(products.map(p => p.category))).sort()]

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products')
        if (response.ok) {
          const data = await response.json()
          if (data.length > 0) {
            setProducts(data)
          }
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = activeCategory === "Todos"
    ? products
    : products.filter(product => product.category === activeCategory)

  return (
    <section id="productos" className="py-8 sm:py-16 md:py-24 relative overflow-hidden">
      {/* Gradient fade from hero - connects smoothly */}
      <div className="absolute -top-32 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-transparent" />
      
      {/* Background design with subtle green accents */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/10" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl translate-x-1/2" />
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 sm:mb-12 px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Nuestros Productos
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Explora nuestra selección de suplementos deportivos de las mejores marcas
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-12 px-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="font-medium text-xs sm:text-sm px-2.5 sm:px-3"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Product Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay productos en esta categoría</p>
          </div>
        )}
      </div>
    </section>
  )
}
