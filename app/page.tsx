import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ProductCatalog } from "@/components/product-catalog"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ProductCatalog />
      </main>
      <Footer />
    </div>
  )
}
