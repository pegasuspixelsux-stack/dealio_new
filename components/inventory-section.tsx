"use client";

import { useEffect, useState } from "react";
import { VehicleCard } from "@/components/vehicle-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Clock } from "lucide-react";

const SHORTCUTS = [
  { label: "SUV", value: "suv" },
  { label: "Sedán", value: "sedan" },
  { label: "Pickup", value: "pickup" },
  { label: "Económicos", value: "economicos" },
];

export function InventorySection() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVehicles, setFilteredVehicles] = useState<any[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("/api/vehicles?limit=100");
        if (response.ok) {
          const data = await response.json();
          setVehicles(data);
          setFilteredVehicles(data);
        }
      } catch (error) {
        console.error("Failed to fetch vehicles:", error);
      }
    };
    fetchVehicles();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredVehicles(vehicles);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = vehicles.filter((vehicle) =>
        `${vehicle.year} ${vehicle.make} ${vehicle.model}`
          .toLowerCase()
          .includes(query)
      );
      setFilteredVehicles(filtered);
    }
  }, [searchQuery, vehicles]);

  return (
    <section className="border-b border-border/60 bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Grid */}
        {filteredVehicles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              No se encontraron vehículos que coincidan con tu búsqueda.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
