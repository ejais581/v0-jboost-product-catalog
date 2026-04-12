import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Truck, Shield, Zap } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-12%20at%2013.35.21-cC7acYI1ql3dOh4VnxjkDuQRS1fqjc.jpeg"
          alt="JBoost productos de suplementos"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Main Title */}
          <h1 className="font-sans text-5xl sm:text-7xl lg:text-8xl tracking-wide text-foreground mb-6">
            <span className="block font-bold">IMPULSA TU</span>
            <span className="block text-primary font-bold">RENDIMIENTO</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed">
            Suplementos deportivos de alta calidad para atletas que buscan
            superar sus límites. Potencia tu entrenamiento con JBoost.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6"
            >
              Ver Catálogo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-border text-foreground hover:bg-secondary text-lg px-8 py-6"
            >
              Ofertas Especiales
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 bg-card/50 rounded-xl px-4 py-3 border border-border">
              <Truck className="h-5 w-5 text-primary" />
              <span className="text-sm text-foreground">Envío Express</span>
            </div>
            <div className="flex items-center justify-center gap-3 bg-card/50 rounded-xl px-4 py-3 border border-border">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm text-foreground">100% Original</span>
            </div>
            <div className="flex items-center justify-center gap-3 bg-card/50 rounded-xl px-4 py-3 border border-border">
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-sm text-foreground">Pago Seguro</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
