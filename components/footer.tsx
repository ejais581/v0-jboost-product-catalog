import Link from "next/link"
import { Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer id="contacto" className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-10 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="text-center md:text-left">
            <Link href="/" className="inline-flex items-center mb-4">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">J</span>
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">BOOST</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
              Tu tienda de confianza para suplementos deportivos de calidad. Potencia tu entrenamiento con los mejores productos.
            </p>
          </div>

          {/* Contact Info */}
          <div className="text-center">
            <h3 className="font-semibold text-foreground text-lg mb-5">Contactanos</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="https://wa.me/543835500992" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-5 w-5 text-primary" />
                  +54 3835-500992
                </a>
              </li>
              <li>
                <a 
                  href="mailto:jboostfit@gmail.com"
                  className="inline-flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5 text-primary" />
                  jboostfit@gmail.com
                </a>
              </li>
              <li className="inline-flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                Belen, Catamarca
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="text-center md:text-right">
            <h3 className="font-semibold text-foreground text-lg mb-5">Seguinos</h3>
            <div className="flex justify-center md:justify-end gap-4">
              <a
                href="https://instagram.com/jboost.fit"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              @jboost.fit
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} JBoost. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
