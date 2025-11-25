import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { Navbar01 } from "@/components/ui/navbar"

export const metadata: Metadata = {
  title: "Privacy Policy | Dinowalls",
  description: "How Dinowalls collects, uses, and protects your data.",
}

const sections = [
  {
    title: "Information We Collect",
    content: [
      "Usage data such as app interactions and feature performance to keep Dinowalls reliable.",
      "Time zone to display time-aware wallpapers correctly.",
      "Approximate location to surface region-appropriate content (you can opt out at any time).",
    ],
  },
  {
    title: "How We Use Data",
    content: [
      "Operate and improve the app, including troubleshooting and analytics.",
      "Personalize wallpaper timing and recommendations when enabled.",
      "Protect against abuse and enforce our terms and content standards.",
    ],
  },
  {
    title: "Your Choices",
    content: [
      "Location is optional — you can disable location sharing in the app or your device settings at any time.",
      "You can request access to or deletion of your data by emailing privacy@dinowalls.app.",
      "Opt out of non-essential analytics within the app settings when available.",
    ],
  },
  {
    title: "Data Sharing",
    content: [
      "We do not sell your personal data.",
      "Trusted providers may process data on our behalf to run the service; they are bound by confidentiality obligations.",
      "We may disclose information if required by law or to protect the rights and safety of Dinowalls and its users.",
    ],
  },
  {
    title: "Retention & Security",
    content: [
      "We retain data only as long as necessary for the purposes above or as required by law.",
      "We use industry-standard safeguards to protect your information, but no service can guarantee complete security.",
    ],
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar01 />
      <div className="flex-1">
        <div className="container mx-auto px-4 py-16 lg:py-24 max-w-4xl">
          <div className="space-y-6 border border-border/60 bg-card/60 backdrop-blur rounded-2xl p-8 lg:p-10 shadow-lg">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Dinowalls</p>
            <h1 className="text-4xl lg:text-5xl font-bold">Privacy Policy</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Your data should support great wallpapers, not surprise you. This policy explains what we collect, why we
              collect it, and the choices you have. By using Dinowalls you agree to these practices.
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
                Questions or requests about your data? Reach us at <a href="mailto:privacy@dinowalls.app" className="underline">privacy@dinowalls.app</a>.
                For copyright issues, see our <Link href="/terms" className="underline">Terms of Service</Link>.
              </p>
              <p className="text-xs text-muted-foreground">Last updated: July 2024</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
