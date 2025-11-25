import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { Navbar01 } from "@/components/ui/navbar"

export const metadata: Metadata = {
  title: "Terms of Service | Dinowalls",
  description: "Rules for using Dinowalls and contributing wallpapers.",
}

const sections = [
  {
    title: "Your Use of Dinowalls",
    content: [
      "You must be at least 13 and comply with all applicable laws when using the app.",
      "Do not misuse the service, attempt unauthorized access, or disrupt our infrastructure.",
      "Dinowalls is provided “as is” without warranties; use is at your own risk.",
    ],
  },
  {
    title: "User Content & Conduct",
    content: [
      "You may share wallpapers if you hold the rights to do so or have permission from the copyright holder.",
      "Vulgar, pornographic, hateful, or otherwise offensive content is not allowed and may be removed.",
      "We may moderate, remove, or restrict content or accounts that violate these terms or applicable law.",
    ],
  },
  {
    title: "Intellectual Property & DMCA",
    content: [
      "If you believe a listed wallpaper infringes your copyright, email proof of ownership and the URL or description of the item to dmca@dinowalls.app for removal.",
      "By submitting content, you grant Dinowalls a non-exclusive license to host, display, and distribute it within the service.",
      "We respect third-party rights and may suspend repeat infringers.",
    ],
  },
  {
    title: "Disclaimers & Liability",
    content: [
      "Dinowalls provides no warranties of uninterrupted or error-free service.",
      "To the fullest extent permitted by law, Dinowalls is not liable for indirect, incidental, or consequential damages arising from your use of the service.",
      "You agree to indemnify Dinowalls for claims related to your content, conduct, or violation of these terms.",
    ],
  },
  {
    title: "Changes & Termination",
    content: [
      "We may update these terms as the service evolves; continued use means you accept the updated terms.",
      "We may suspend or terminate access for violations or to protect the service and community.",
    ],
  },
]

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar01 />
      <div className="flex-1">
        <div className="container mx-auto px-4 py-16 lg:py-24 max-w-4xl">
          <div className="space-y-6 border border-border/60 bg-card/60 backdrop-blur rounded-2xl p-8 lg:p-10 shadow-lg">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Dinowalls</p>
            <h1 className="text-4xl lg:text-5xl font-bold">Terms of Service</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              These terms explain what you can expect from Dinowalls and what we expect from you. If you do not agree,
              please discontinue use of the service.
            </p>
            <div className="space-y-8">
              {sections.map((section) => (
                <section key={section.title} className="space-y-3">
                  <h2 className="text-2xl font-semibold">{section.title}</h2>
                  <ul className="space-y-2 text-muted-foreground leading-relaxed list-disc pl-5">
                    {section.content.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
            <div className="pt-6 border-t border-border/60 space-y-3">
              <h3 className="text-xl font-semibold">Contact</h3>
              <p className="text-muted-foreground leading-relaxed">
                Report content or ask about these terms at <a href="mailto:support@dinowalls.app" className="underline">support@dinowalls.app</a>. DMCA notices should go to
                <a href="mailto:dmca@dinowalls.app" className="underline ml-1">dmca@dinowalls.app</a> with proof of ownership and the location of the material.
              </p>
              <p className="text-xs text-muted-foreground">Last updated: July 2024</p>
              <p className="text-xs text-muted-foreground">
                By using Dinowalls you also agree to our <Link href="/privacy" className="underline">Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
