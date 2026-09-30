"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Clock } from "lucide-react";

const SHORTCUTS = [
  { label: "SUV", value: "suv" },
  { label: "Sedán", value: "sedan" },
  { label: "Pickup", value: "pickup" },
];

const FILTERS = [
  { label: "Precio", icon: "💰" },
  { label: "Año", icon: "📅" },
  { label: "Marca", icon: "🏷️" },
];

export function HeroSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="relative z-10 -mt-12 md:-mt-20 mb-0 md:mb-2 hidden md:block">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg md:rounded-lg p-4 md:p-6 space-y-3 md:space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Buscar vehículos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 py-2 md:py-3 text-sm md:text-base border border-gray-400 bg-muted/50"
            />
          </div>

          {/* Filters and Shortcuts */}
          <div className="flex gap-2 items-center justify-between">
            {/* Shortcut Buttons */}
            <div className="flex flex-wrap gap-2">
              {SHORTCUTS.map((shortcut) => (
                <Button
                  key={shortcut.value}
                  variant="ghost"
                  size="sm"
                  className="text-xs md:text-xs"
                >
                  <Clock className="size-2 md:size-3 mr-1" />
                  {shortcut.label}
                </Button>
              ))}
            </div>

            {/* Filter Button */}
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-xs md:text-sm flex-shrink-0"
            >
              <Filter className="size-3 md:size-4" />
              Filtros
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
