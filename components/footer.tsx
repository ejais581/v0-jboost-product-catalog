import Link from "next/link"
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer id="contacto" className="border-t border-border bg-card py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">J</span>
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-primary">BOOST</span>
            </Link>
            <p className="text-muted-foreground text-xs sm:text-sm max-w-md">
              Tu tienda de confianza para suplementos deportivos de calidad. Proteinas, creatina, vitaminas y todo lo que necesitas para tu entrenamiento.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-foreground text-sm sm:text-base mb-3 sm:mb-4">Categorias</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link href="#proteinas" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Proteínas
                </Link>
              </li>
              <li>
                <Link href="#creatina" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Creatina
                </Link>
              </li>
              <li>
                <Link href="#vitaminas" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Vitaminas
                </Link>
              </li>
              <li>
                <Link href="#pre-entreno" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Pre-entreno
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground text-sm sm:text-base mb-3 sm:mb-4">Contacto</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                <span className="truncate">jboostfit@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                +54 3835-500992
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Belen, Catamarca</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} JBoost. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
