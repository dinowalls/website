import { Button } from "@/components/ui/button"
import { Download, Heart } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden">
                <Image
                  src="/app-icon.png"
                  alt="Dinowalls"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Dinowalls</h3>
                <p className="text-muted-foreground">Dynamic wallpapers for iOS</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-md">
              {
                "Transform your iPhone with wallpapers that evolve throughout the day. Join thousands of users who have already discovered the magic of dynamic wallpapers."
              }
            </p>

            <Button size="lg" className="text-lg px-8">
              <Download className="w-5 h-5 mr-2" />
              {"Download Now"}
            </Button>
          </div>

          <div className="text-center lg:text-right space-y-4">
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                {"Made with"} <Heart className="w-4 h-4 inline text-red-500" /> {"for iPhone users"}
              </p>
              <p>{"© 2024 Dinowalls. All rights reserved."}</p>
            </div>

            <div className="flex justify-center lg:justify-end gap-6 text-sm">
              <a href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                {"Privacy Policy"}
              </a>
              <a href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                {"Terms of Service"}
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                {"Support"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
