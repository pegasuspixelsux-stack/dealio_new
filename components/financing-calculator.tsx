"use client";

import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TERMS = [36, 48, 60, 72, 84];
const TERM_ITEMS = TERMS.map((months) => ({ value: String(months), label: `${months} meses` }));

const currency = new Intl.NumberFormat("es-UY", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function toNumber(value: string): number {
  const parsed = Number(value.replace(/,/g, ""));
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

/** Standard amortizing-loan monthly payment formula. */
function calculateMonthlyPayment(principal: number, aprPercent: number, termMonths: number): number {
  if (principal <= 0 || termMonths <= 0) return 0;
  const monthlyRate = aprPercent / 100 / 12;
  if (monthlyRate === 0) return principal / termMonths;

  const factor = Math.pow(1 + monthlyRate, termMonths);
  return (principal * monthlyRate * factor) / (factor - 1);
}

export function FinancingCalculator() {
  const [price, setPrice] = useState("28000");
  const [downPayment, setDownPayment] = useState("3000");
  const [apr, setApr] = useState("6.5");
  const [term, setTerm] = useState("60");

  const monthlyPayment = useMemo(() => {
    const principal = Math.max(0, toNumber(price) - toNumber(downPayment));
    return calculateMonthlyPayment(principal, toNumber(apr), Number(term));
  }, [price, downPayment, apr, term]);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Calculator className="size-4.5" />
          </div>
          <CardTitle className="text-lg">Calculadora de cuotas</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {/* Precio del vehículo */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="calc-price">Precio del vehículo</Label>
            <span className="text-sm font-semibold text-foreground">${price}</span>
          </div>
          <input
            id="calc-price"
            type="range"
            min="5000"
            max="100000"
            step="1000"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$5k</span>
            <span>$100k</span>
          </div>
        </div>

        {/* Anticipo */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="calc-down">Anticipo</Label>
            <span className="text-sm font-semibold text-foreground">${downPayment}</span>
          </div>
          <input
            id="calc-down"
            type="range"
            min="0"
            max={Math.min(50000, Number(price))}
            step="500"
            value={downPayment}
            onChange={(event) => setDownPayment(event.target.value)}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$0</span>
            <span>$50k</span>
          </div>
        </div>

        {/* Tasa de interés */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="calc-apr">Tasa de interés anual</Label>
            <span className="text-sm font-semibold text-foreground">{apr}%</span>
          </div>
          <input
            id="calc-apr"
            type="range"
            min="2"
            max="15"
            step="0.1"
            value={apr}
            onChange={(event) => setApr(event.target.value)}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>2%</span>
            <span>15%</span>
          </div>
        </div>

        {/* Plazo del préstamo */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="calc-term">Plazo del préstamo</Label>
            <span className="text-sm font-semibold text-foreground">{term} meses</span>
          </div>
          <div className="flex gap-2">
            {TERMS.map((months) => (
              <button
                key={months}
                onClick={() => setTerm(String(months))}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  term === String(months)
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {months}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-1 rounded-xl bg-muted/60 py-6 text-center">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Cuota mensual estimada
          </span>
          <span className="text-4xl font-semibold tracking-tight text-foreground">
            {currency.format(Math.round(monthlyPayment))}
            <span className="text-base font-normal text-muted-foreground">/mes</span>
          </span>
        </div>

        <p className="text-xs text-muted-foreground">
          Estimación a modo ilustrativo. La tasa y la cuota reales dependen de
          la aprobación crediticia y las condiciones del prestamista.
        </p>
      </CardContent>
    </Card>
  );
}
