import { SiteHeader } from "@/components/site-header";
import { InfoStripe } from "@/components/info-stripe";
import { HeroSection } from "@/components/hero-section";
import { HeroSearch } from "@/components/hero-search";
import { InventorySection } from "@/components/inventory-section";
import { VehicleSearchBar } from "@/components/vehicle-search-bar";
import { SectionsAccordion, SectionsDesktop } from "@/components/sections-accordion";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppContact } from "@/components/whatsapp-contact";
import { WhatsAppProvider } from "@/components/whatsapp-context";

export default function Home() {
  return (
    <WhatsAppProvider>
      <div className="flex min-h-full flex-1 flex-col">
        {/* 1. Black Stripe - FIXED at top */}
        <div className="fixed top-0 left-0 right-0 z-40">
          <InfoStripe />
        </div>

        {/* WhatsApp Contact Button */}
        <WhatsAppContact />

      <main className="flex-1">
        {/* 2. Hero Section with Nav Inside */}
        <div className="relative">
          {/* Transparent Nav - Inside Hero, Sticky */}
          <SiteHeader />
          {/* Hero Background */}
          <HeroSection />
        </div>

        <HeroSearch />

        {/* 3. Inventory Section */}
        <InventorySection />

        {/* Rest of Page */}
        <div className="w-full">
          <SectionsAccordion />
          <SectionsDesktop />
        </div>
      </main>
      <SiteFooter />
    </div>
    </WhatsAppProvider>
  );
}
