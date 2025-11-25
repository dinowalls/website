import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles, Heart } from "lucide-react"

const plans = [
  {
    name: "Free Forever",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with dynamic wallpapers",
    badge: "Most Popular",
    icon: Heart,
    features: [
      "Access to entire wallpaper catalog",
      "Manual wallpaper creation tools",
      "Community sharing",
      "Basic time-based transitions",
      "iOS integration",
      "Regular catalog updates",
    ],
  },
  {
    name: "Pro Creator",
    price: "$4.99",
    period: "month",
    description: "Unlock AI creation and advanced features",
    badge: "Best Value",
    icon: Sparkles,
    features: [
      "Everything in Free",
      "AI-powered wallpaper generation",
      "Unlimited AI creations",
      "Advanced transition effects",
      "Priority support",
      "Early access to new features",
      "Export to other devices",
    ],
  },
]

export function PricingSection() {
  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-balance">
            {"Choose Your "}
            <span className="text-primary">{"Creative Journey"}</span>
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            {"Start free with our complete catalog, or unlock AI creation with Pro. No hidden fees, cancel anytime."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${index === 1 ? "border-primary shadow-lg scale-105" : ""}`}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge variant={index === 1 ? "default" : "secondary"}>{plan.badge}</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <plan.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="space-y-2">
                  <div className="text-4xl font-bold">
                    {plan.price}
                    <span className="text-lg font-normal text-muted-foreground">/{plan.period}</span>
                  </div>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className="w-full" variant={index === 1 ? "default" : "outline"} size="lg">
                  {index === 0 ? "Download Free" : "Start Pro Trial"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
