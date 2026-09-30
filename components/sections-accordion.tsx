"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FeaturesSection } from "@/components/features-section";
import { DealerHighlightSection } from "@/components/dealer-highlight-section";
import { AboutSection } from "@/components/about-section";
import { FinancingAndTradeUnified } from "@/components/financing-and-trade-unified";
import { ContactSection } from "@/components/contact-section";

const SECTIONS = [
  { id: "features", title: "Por qué comprarnos a nosotros", component: FeaturesSection },
  { id: "process", title: "Nuestro proceso", component: DealerHighlightSection },
  { id: "about", title: "Nosotros", component: AboutSection },
  { id: "financing", title: "Financiación y Permuta", component: FinancingAndTradeUnified },
  { id: "contact", title: "Contacto", component: ContactSection },
];

export function SectionsAccordion() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="md:hidden space-y-2 border-b border-border/60">
      {SECTIONS.map(({ id, title, component: Component }) => (
        <div key={id}>
          <button
            onClick={() => setExpanded(expanded === id ? null : id)}
            className="flex w-full items-center justify-between border-b border-border/60 bg-muted/30 px-4 py-4 font-semibold transition-colors hover:bg-muted/50"
          >
            <span>{title}</span>
            <ChevronDown
              className={`size-5 transition-transform ${expanded === id ? "rotate-180" : ""}`}
            />
          </button>
          {expanded === id && (
            <div className="bg-muted/10 py-8">
              <Component />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function SectionsDesktop() {
  return (
    <div className="hidden md:block">
      <FeaturesSection />
      <DealerHighlightSection />
      <AboutSection />
      <FinancingAndTradeUnified />
      <ContactSection />
    </div>
  );
}
