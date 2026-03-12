import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 cursor-pointer select-none",
  {
    variants: {
      variant: {
        // Primary "Candy Button" — violet pill with hard shadow + lift on hover
        default:
          "bg-[#8B5CF6] text-white rounded-full border-2 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#1E293B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#1E293B]",
        // Secondary — transparent outline, fills with amber on hover
        secondary:
          "bg-transparent text-[#1E293B] rounded-full border-2 border-[#1E293B] shadow-none hover:bg-[#FBBF24] active:bg-[#FBBF24]/80",
        // Destructive — hot pink candy (used for delete/danger)
        destructive:
          "bg-[#F472B6] text-white rounded-full border-2 border-[#1E293B] shadow-[4px_4px_0px_0px_#1E293B] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#1E293B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#1E293B]",
        // Ghost — invisible until hover
        ghost:
          "rounded-full border-none text-[#1E293B] hover:bg-[#F1F5F9] shadow-none",
        // Outline — violet border, subtle violet fill on hover
        outline:
          "bg-transparent text-[#1E293B] rounded-full border-2 border-[#8B5CF6] shadow-none hover:bg-[#8B5CF6]/10",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-sm",
        lg: "h-14 px-8 text-lg",
        icon: "size-10 rounded-full",
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
