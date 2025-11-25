import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Designer",
    content:
      "Dinowalls completely transformed my iPhone experience. The AI creation feature is incredible - I can generate wallpapers that match my mood perfectly!",
    rating: 5,
    avatar: "🦕",
  },
  {
    name: "Mike Rodriguez",
    role: "Student",
    content:
      "Love how my wallpaper changes throughout the day. The free catalog has so many amazing options, and the community sharing is fantastic.",
    rating: 5,
    avatar: "🦖",
  },
  {
    name: "Emma Thompson",
    role: "Artist",
    content:
      "The manual creation tools are surprisingly powerful. I've made dozens of dynamic wallpapers and shared them with the community. Highly recommended!",
    rating: 5,
    avatar: "🦴",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-balance">
            {"Loved by "}
            <span className="text-primary">{"Thousands"}</span>
            {" of Users"}
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            {"Join the growing community of iPhone users who have transformed their devices with Dinowalls."}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>

                <div className="flex items-center gap-3 pt-4 border-t">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
