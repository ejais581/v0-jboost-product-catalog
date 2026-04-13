import Link from "next/link"
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold tracking-tight text-foreground">J</span>
              <span className="text-2xl font-bold tracking-tight text-primary">BOOST</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              Tu tienda de confianza para suplementos deportivos de calidad. Proteínas, creatina, vitaminas y todo lo que necesitas para tu entrenamiento.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Categorías</h3>
            <ul className="space-y-2">
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
            <h3 className="font-semibold text-foreground mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                jboostfit@gmail.com
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                +54 3835-500992
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span>Belen, Catamarca</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} JBoost. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
