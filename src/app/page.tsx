import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { WallpaperMarquee } from "@/components/wallpaper-marquee"
import { PricingSection } from "@/components/pricing-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"
import { Navbar01 } from "@/components/ui/navbar"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar01 />
      <HeroSection />
      <FeaturesSection />
      <WallpaperMarquee />
      <PricingSection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}
