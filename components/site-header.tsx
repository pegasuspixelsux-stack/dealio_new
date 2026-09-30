"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { label: "Inventario", href: "/inventory" },
  { label: "Ventajas", href: "#features" },
  { label: "Financiación", href: "#financing" },
  { label: "Nosotros", href: "#about" },
  { label: "Contacto", href: "#contact" },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-black/50 backdrop-blur-md" : "bg-transparent"
    }`} style={{ top: "40px" }}>
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0 [&_svg]:!text-white [&_*]:!text-white">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium !text-white transition-colors hover:!text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/login" />} className="!text-white">
            Iniciar sesión
          </Button>
          <Button size="sm">Comenzar</Button>
        </div>

        <Sheet>
          <SheetTrigger
            render={<Button variant="ghost" size="icon" className="md:hidden !text-white" />}
          >
            <Menu />
            <span className="sr-only">Abrir menú</span>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {NAV_LINKS.map((link) => (
                <SheetClose
                  key={link.href}
                  render={
                    <a
                      href={link.href}
                      className="rounded-md px-2 py-2.5 text-sm font-medium !text-white hover:bg-muted"
                    />
                  }
                >
                  {link.label}
                </SheetClose>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-2 p-4">
              <SheetClose
                render={
                  <Link href="/login" className={buttonVariants({ variant: "outline" })} />
                }
              >
                Iniciar sesión
              </SheetClose>
              <Button>Comenzar</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
