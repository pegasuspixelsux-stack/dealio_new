"use client";

import { motion } from "motion/react";
import { ArrowRight, PlayCircle, Car, Star, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useWhatsApp } from "@/components/whatsapp-context";

const HEADLINE = "Encuentra tu próximo vehículo sin complicaciones";

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1560958089-b8a63dd53c12?w=800&h=800&fit=crop",
    title: "Encuentra tu próximo vehículo",
    subtitle: "sin complicaciones",
    rating: 4.8,
    reviews: 1250,
    lines: [
      "✓ Búsqueda inteligente y filtros avanzados",
      "✓ Comparativas de precios en tiempo real",
      "✓ Información completa de cada vehículo",
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=800&fit=crop",
    title: "Calidad garantizada",
    subtitle: "vehículos revisados",
    rating: 4.9,
    reviews: 980,
    lines: [
      "✓ Inspección mecánica profesional",
      "✓ Historial vehicular verificado",
      "✓ Garantía de satisfacción incluida",
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&h=800&fit=crop",
    title: "Financiación flexible",
    subtitle: "ajustado a tu presupuesto",
    rating: 4.7,
    reviews: 1120,
    lines: [
      "✓ Plazos de 36 a 84 meses disponibles",
      "✓ Tasas competitivas y transparentes",
      "✓ Aprobación rápida sin papeleos",
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=800&fit=crop",
    title: "Stock actualizado",
    subtitle: "nuevos vehículos cada semana",
    rating: 4.8,
    reviews: 870,
    lines: [
      "✓ Inventario renovado constantemente",
      "✓ Todas las marcas y modelos disponibles",
      "✓ Notificaciones de nuevas llegadas",
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=800&fit=crop",
    title: "Precio transparente",
    subtitle: "sin sorpresas ni cargos ocultos",
    rating: 4.9,
    reviews: 2100,
    lines: [
      "✓ Precio final visible desde el inicio",
      "✓ Desglose detallado de costos",
      "✓ Garantía de mejor precio del mercado",
    ],
  },
];

const scrollerStyle = `
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  .ticker-scroll {
    animation: scroll 20s linear infinite;
  }
  .ticker-scroll:hover {
    animation-play-state: paused;
  }
  @keyframes fadeInOut {
    0%, 100% { opacity: 0; }
    10%, 90% { opacity: 1; }
  }
  .slide-bg {
    animation: fadeInOut 15s infinite;
  }
`;

const MOCKUP_VEHICLES = [
  {
    id: "1",
    year: 2024,
    make: "Tesla",
    model: "Model 3",
    photos: [{ url: "https://images.unsplash.com/photo-1560958089-b8a63dd53c12?w=400&h=300&fit=crop" }],
    specs: { mileage: 5000 },
    priceDisplay: 45000,
  },
  {
    id: "2",
    year: 2023,
    make: "BMW",
    model: "X5",
    photos: [{ url: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=300&fit=crop" }],
    specs: { mileage: 15000 },
    priceDisplay: 65000,
  },
  {
    id: "3",
    year: 2023,
    make: "Honda",
    model: "Civic",
    photos: [{ url: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop" }],
    specs: { mileage: 8000 },
    priceDisplay: 32000,
  },
  {
    id: "4",
    year: 2024,
    make: "Toyota",
    model: "Camry",
    photos: [{ url: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop" }],
    specs: { mileage: 3000 },
    priceDisplay: 38000,
  },
];

export function HeroSection() {
  const { openModal } = useWhatsApp();
  const [vehicles, setVehicles] = useState<any[]>(MOCKUP_VEHICLES);
  const [blur, setBlur] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("/api/vehicles?limit=4");
        if (response.ok) {
          const data = await response.json();
          setVehicles(data);
        }
      } catch (error) {
        console.error("Failed to fetch vehicles:", error);
        setVehicles(MOCKUP_VEHICLES);
      }
    };
    fetchVehicles();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(0, -rect.top / rect.height);
      const blurAmount = Math.min(15, scrollProgress * 15);
      setBlur(blurAmount);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <style>{scrollerStyle}</style>
      <section
        ref={sectionRef}
        id="top"
        className="relative isolate flex h-full items-center justify-center overflow-hidden border-b border-border/60 py-8 sm:py-12 aspect-square md:aspect-auto md:h-[calc(100vh-44px)]"
      >
      {/* Background image with scroll blur - Desktop version */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 hidden md:block" style={{ filter: `blur(${blur}px)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/modern car dealership.png"
          alt=""
          className="size-full object-cover object-center"
        />
      </div>

      {/* Mobile Slideshow Background */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 md:hidden">
        {HERO_SLIDES.map((slide, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={index}
            src={slide.image}
            alt=""
            className="absolute inset-0 size-full object-cover object-center"
            style={{
              opacity: currentSlide === index ? 1 : 0,
              transition: "opacity 1s ease-in-out",
            }}
          />
        ))}
      </div>

      {/* Legibility overlay - left to right */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/50 to-black/10"
      />

      {/* Legibility overlay - top to bottom (dark bottom, transparent top, starts at 50%) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(0, 0, 0, 0.95) 100%)",
        }}
      />

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col justify-center mt-[10vh]">
        <div className="flex max-w-xl flex-col items-start text-left">
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/80"
          >
            Stock actualizado todas las semanas
          </motion.span>

          <h1 className="text-balance text-4xl font-semibold tracking-tight !text-white sm:text-6xl">
            <motion.div
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {HERO_SLIDES[currentSlide].title}
            </motion.div>
          </h1>

          {/* 3 Lines of Text - Bullets */}
          <motion.div
            key={`lines-${currentSlide}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 space-y-2 text-sm !text-white/80"
          >
            {HERO_SLIDES[currentSlide].lines.map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </motion.div>

          {/* Google Stars Rating - Social Proof */}
          <motion.div
            key={`rating-${currentSlide}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex items-center gap-3"
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`size-5 ${
                    i < Math.floor(HERO_SLIDES[currentSlide].rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-yellow-400/40 text-yellow-400/40"
                  }`}
                />
              ))}
            </div>
            <div className="text-sm">
              <span className="font-semibold !text-white">{HERO_SLIDES[currentSlide].rating}</span>
              <span className="!text-white/60"> ({HERO_SLIDES[currentSlide].reviews} reseñas)</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.9 }}
            className="mt-10 flex flex-col items-start gap-3 sm:flex-row w-full sm:w-auto"
          >
            <Button size="lg" className="hidden md:flex bg-green-500 hover:bg-green-600 text-white px-6 py-4" onClick={openModal}>
              <MessageCircle className="size-5 mr-2" />
              Contacto
            </Button>
            <Button size="lg" variant="outline" className="hidden">
              <PlayCircle />
              Cómo funciona
            </Button>
          </motion.div>
        </div>
      {/* Vertical slide indicator bar on the right */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1.5 md:right-6">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-white h-6 w-1.5"
                : "bg-white/40 h-1.5 w-1.5 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      </div>
    </section>
    </>
  );
}
