import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-150 ease-snap active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 cursor-pointer select-none",
  {
    variants: {
      variant: {
        // Primary — ink, the one solid fill in the chrome
        default:
          "bg-primary text-primary-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_1px_2px_rgb(28_27_31/0.16)] hover:bg-primary-hover",
        // Secondary — card surface with a hairline
        secondary:
          "bg-card text-foreground border border-input shadow-raised hover:bg-secondary",
        // Destructive — toned red, only for confirming a delete
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive-hover",
        // Ghost — invisible until hover
        ghost:
          "text-muted-foreground hover:bg-secondary hover:text-foreground",
        // Outline — hairline, no fill
        outline:
          "border border-input text-foreground hover:bg-secondary",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-8 px-3",
        lg: "h-12 px-5 text-[15px]",
        icon: "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
