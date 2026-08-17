import Link from "next/link";
import { Globe, Mail, MessageCircle } from "lucide-react";

import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";

const FOOTER_LINKS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Producto",
    links: [
      { label: "Ventajas", href: "#features" },
      { label: "Financiación", href: "#financing" },
      { label: "Novedades", href: "#" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Nosotros", href: "#about" },
      { label: "Trabaja con nosotros", href: "#" },
      { label: "Contacto", href: "#contact" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Documentación", href: "#" },
      { label: "Soporte", href: "#" },
      { label: "Política de privacidad", href: "#" },
    ],
  },
];

const SOCIAL_LINKS = [
  { label: "Sitio web", href: "#", icon: Globe },
  { label: "Comunidad", href: "#", icon: MessageCircle },
  { label: "Correo", href: "mailto:hello@dealio.app", icon: Mail },
];

export function SiteFooter() {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-xs text-sm text-muted-foreground">
              Compra, venta y financiación de vehículos, todo en un mismo
              lugar.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_LINKS.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-foreground">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Dealio. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-foreground">
              Términos
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Privacidad
            </a>
            <Link href="/login" className="transition-colors hover:text-foreground">
              Ingreso al panel
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
