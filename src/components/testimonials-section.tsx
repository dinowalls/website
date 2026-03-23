const testimonials = [
  {
    label: "Morning",
    content: "Wake up to light, not the same static lock screen you saw at midnight.",
  },
  {
    label: "Afternoon",
    content: "Discover scenes that feel crisp at noon and still hold up when the day gets warmer.",
  },
  {
    label: "Night",
    content: "Let the palette settle into dusk automatically without touching a setting.",
  },
]

export function TestimonialsSection() {
  return (
    <section id="about" className="px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Across the day</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-slate-950 dark:text-white sm:text-5xl [font-family:var(--font-display)]">
            Designed around time, not just a wallpaper file.
          </h2>
        </div>

        <div className="grid gap-0 border-t border-slate-200/80 dark:border-slate-800 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.label}
              className="border-b border-slate-200/80 py-8 dark:border-slate-800 lg:border-b-0 lg:border-l lg:px-8 lg:py-0 first:lg:border-l-0"
            >
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">{testimonial.label}</p>
              <p className="mt-4 max-w-sm text-2xl leading-9 tracking-[-0.03em] text-slate-900 dark:text-white">
                {testimonial.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
