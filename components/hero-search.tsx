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
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  const handleSearch = () => {
    // TODO: Implement search functionality with year, make, model
    console.log({ year, make, model });
  };

  return (
    <div className="relative z-10 -mt-10 md:-mt-16 mb-0 md:mb-2 hidden md:block">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg md:rounded-lg p-4 md:p-6 space-y-3 md:space-y-4">
          {/* Search Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Year Input */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Año"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full py-2 md:py-3 text-sm md:text-base border border-gray-400 bg-muted/50"
              />
            </div>

            {/* Make Input */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Marca"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full py-2 md:py-3 text-sm md:text-base border border-gray-400 bg-muted/50"
              />
            </div>

            {/* Model Input */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Modelo"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full py-2 md:py-3 text-sm md:text-base border border-gray-400 bg-muted/50"
              />
            </div>

            {/* Search Button */}
            <Button
              onClick={handleSearch}
              className="w-full py-2 md:py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              <Search className="size-4 md:size-5 mr-2" />
              Buscar
            </Button>
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
