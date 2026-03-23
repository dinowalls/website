import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { WallpaperMarquee } from "@/components/wallpaper-marquee"
import { PricingSection } from "@/components/pricing-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"
import { Navbar01 } from "@/components/ui/navbar"
import { getPublicWallpapers } from "@/lib/appwrite-wallpapers"

export default async function HomePage() {
  const wallpapers = await getPublicWallpapers()

  return (
    <main className="min-h-screen">
      <Navbar01
        navigationLinks={[
          { href: "#features", label: "Features" },
          { href: "#gallery", label: "Gallery" },
          { href: "#about", label: "About" },
        ]}
        signInText="Sign In"
        signInHref="#signin"
        ctaText="Download"
        ctaHref="#download"
      />
      <HeroSection />
      <FeaturesSection />
      <WallpaperMarquee wallpapers={wallpapers} />
      <PricingSection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}
