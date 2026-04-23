import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap } from "lucide-react"

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-[70vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-20">
        <div className="text-center">
          {/* Main Title */}
          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-wide text-foreground mb-4 sm:mb-6">
            <span className="block">IMPULSA TU</span>
            <span className="block text-primary">RENDIMIENTO</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-10 leading-relaxed px-4 sm:px-0">
            Suplementos deportivos de alta calidad para atletas que buscan
            superar sus límites. Potencia tu entrenamiento con JBoost.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-4 sm:px-0">
            <a href="#productos" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6"
              >
                Ver Catalogo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <a href="#contacto" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-border text-foreground hover:bg-secondary text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6"
              >
                Contactanos
              </Button>
            </a>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-md sm:max-w-2xl mx-auto px-4 sm:px-0">
            <div className="flex items-center justify-center gap-2 sm:gap-3 bg-card/50 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border border-border">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
              <span className="text-xs sm:text-sm text-foreground">100% Original</span>
            </div>
            <div className="flex items-center justify-center gap-2 sm:gap-3 bg-card/50 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border border-border">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
              <span className="text-xs sm:text-sm text-foreground">Pago Seguro</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
