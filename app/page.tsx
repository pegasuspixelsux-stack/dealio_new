import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { FeaturedVehiclesSection } from "@/components/featured-vehicles";
import { FeaturesSection } from "@/components/features-section";
import { DealerHighlightSection } from "@/components/dealer-highlight-section";
import { AboutSection } from "@/components/about-section";
import { FinancingSection } from "@/components/financing-section";
import { TradeInSection } from "@/components/trade-in-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <FeaturedVehiclesSection />
        <FeaturesSection />
        <DealerHighlightSection />
        <AboutSection />
        <FinancingSection />
        <TradeInSection />
      </main>
      <SiteFooter />
    </div>
  );
}
