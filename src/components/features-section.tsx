import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Palette, Share2, Sparkles, Download, Users } from "lucide-react"

const features = [
  {
    icon: Clock,
    title: "Dynamic Time-Based Changes",
    description:
      "Wallpapers automatically transition from dawn to dusk, creating a living background that matches your day.",
    badge: "Core Feature",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Creation",
    description:
      "Generate unique wallpapers with AI. Describe your vision and watch it come to life across different times of day.",
    badge: "Pro Feature",
  },
  {
    icon: Palette,
    title: "Manual Creation Tools",
    description:
      "Design your own dynamic wallpapers with our intuitive editor. Perfect for artists and creative minds.",
    badge: "Free",
  },
  {
    icon: Download,
    title: "Massive Free Catalog",
    description: "Access thousands of professionally designed dynamic wallpapers. New additions every week.",
    badge: "Free",
  },
  {
    icon: Share2,
    title: "Community Sharing",
    description: "Share your creations with the Dinowalls community and discover amazing wallpapers from other users.",
    badge: "Free",
  },
  {
    icon: Users,
    title: "Seamless iOS Integration",
    description: "Works perfectly with iOS 14+ and integrates seamlessly with your device's settings and shortcuts.",
    badge: "Native",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-balance">
            {"Everything You Need for "}
            <span className="text-primary">{"Dynamic Wallpapers"}</span>
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            {"From AI creation to community sharing, Dinowalls has all the tools to make your iPhone truly unique."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="relative group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant={feature.badge === "Pro Feature" ? "default" : "secondary"}>{feature.badge}</Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
