import { type ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean
  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number
  /**
   * Optional CSS class name to apply to each animated content track
   */
  itemClassName?: string
}

export function Marquee({
  className,
  itemClassName,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex gap-(--gap) overflow-hidden [--duration:40s] [--gap:1rem]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 justify-around gap-(--gap)",
              {
                "animate-marquee flex-row": !vertical,
                "animate-marquee-vertical w-full flex-col": vertical && !reverse,
                "animate-marquee-vertical-reverse w-full flex-col": vertical && reverse,
                "[animation-direction:reverse]": !vertical && reverse,
                "group-hover:[animation-play-state:paused]": pauseOnHover,
              },
              itemClassName
            )}
          >
            {children}
          </div>
        ))}
    </div>
  )
}
