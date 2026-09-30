"use client";

import { useState } from "react";
import { Landmark, RefreshCw, ChevronDown } from "lucide-react";
import { FinancingCalculator } from "@/components/financing-calculator";
import { TradeInForm } from "@/components/trade-in-form";
import { ScrollReveal } from "@/components/scroll-reveal";

const FINANCING_POINTS = [
  "Plazos flexibles de 36 a 84 meses",
  "Simular no afecta tu historial crediticio",
  "Solicita financiación real cuando encuentres tu vehículo",
];

const TRADE_IN_POINTS = [
  "Recibe una tasación real en un día hábil",
  "Sin obligación de vender — la tasación es gratis",
  "Usa el valor de tu usado como parte de pago de tu próximo vehículo",
];

export function FinancingAndTradeUnified() {
  const [activeTab, setActiveTab] = useState<"calculator" | "trading">("calculator");
  const [expandedAccordion, setExpandedAccordion] = useState<"calculator" | "trading">("calculator");

  return (
    <>
      {/* Financing Section */}
      <section id="financing" className="border-b border-border/60 bg-muted/20 py-20 sm:py-28">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          {/* Desktop Tab Navigation */}
          <div className="mb-12 hidden gap-8 border-b border-border md:flex">
            <button
              onClick={() => setActiveTab("calculator")}
              className={`flex items-center gap-2 pb-4 font-semibold transition-colors ${
                activeTab === "calculator"
                  ? "text-foreground border-b-2 border-primary -mb-[2px]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Landmark className="size-4" />
              Calculadora Financiera
            </button>
            <button
              onClick={() => setActiveTab("trading")}
              className={`flex items-center gap-2 pb-4 font-semibold transition-colors ${
                activeTab === "trading"
                  ? "text-foreground border-b-2 border-primary -mb-[2px]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <RefreshCw className="size-4" />
              Permuta
            </button>
          </div>

          {/* Mobile Accordion Navigation */}
          <div className="mb-8 space-y-2 md:hidden">
            {/* Calculator Accordion */}
            <button
              onClick={() => setExpandedAccordion(expandedAccordion === "calculator" ? "trading" : "calculator")}
              className="flex w-full items-center justify-between rounded-lg border border-border bg-muted/50 p-4 font-semibold transition-colors hover:bg-muted"
            >
              <span className="flex items-center gap-2">
                <Landmark className="size-4" />
                Calculadora Financiera
              </span>
              <ChevronDown
                className={`size-4 transition-transform ${expandedAccordion === "calculator" ? "rotate-180" : ""}`}
              />
            </button>
            {expandedAccordion === "calculator" && (
              <div className="rounded-lg border border-border p-4">
                <FinancingCalculator />
              </div>
            )}

            {/* Permuta Accordion */}
            <button
              onClick={() => setExpandedAccordion(expandedAccordion === "trading" ? "calculator" : "trading")}
              className="flex w-full items-center justify-between rounded-lg border border-border bg-muted/50 p-4 font-semibold transition-colors hover:bg-muted"
            >
              <span className="flex items-center gap-2">
                <RefreshCw className="size-4" />
                Permuta
              </span>
              <ChevronDown
                className={`size-4 transition-transform ${expandedAccordion === "trading" ? "rotate-180" : ""}`}
              />
            </button>
            {expandedAccordion === "trading" && (
              <div className="rounded-lg border border-border p-4">
                <TradeInForm />
              </div>
            )}
          </div>

          {/* Calculator Tab - Desktop Only */}
          {activeTab === "calculator" && (
            <div className="hidden grid-cols-1 items-center gap-12 md:grid lg:grid-cols-2 lg:gap-16">
              <ScrollReveal>
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                  <Landmark className="size-4" />
                  Financiación
                </p>
                <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Calcula cuánto te podría costar
                </h2>
                <p className="mt-4 text-balance text-muted-foreground">
                  Obtén una estimación rápida de tu cuota mensual antes de pisar el lote. Ajusta
                  el precio, el anticipo, la tasa y el plazo para encontrar lo que se adapta a tu
                  presupuesto.
                </p>
                <ul className="mt-6 flex flex-col gap-3">
                  {FINANCING_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-foreground">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      {point}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <FinancingCalculator />
              </ScrollReveal>
            </div>
          )}

          {/* Trading Tab - Desktop Only */}
          {activeTab === "trading" && (
            <div className="hidden grid-cols-1 items-center gap-12 md:grid lg:grid-cols-2 lg:gap-16">
              <ScrollReveal>
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                  <RefreshCw className="size-4" />
                  Permuta
                </p>
                <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  ¿Tienes un auto para dar en parte de pago?
                </h2>
                <p className="mt-4 text-balance text-muted-foreground">
                  Cuéntanos sobre tu vehículo actual y te responderemos con una tasación estimada;
                  no hace falta visitar el local para empezar.
                </p>
                <ul className="mt-6 flex flex-col gap-3">
                  {TRADE_IN_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-foreground">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      {point}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <TradeInForm />
              </ScrollReveal>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
