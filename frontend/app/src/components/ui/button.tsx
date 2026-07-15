import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-bold border-2 border-black transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-neo active:translate-x-0 active:translate-y-0 active:shadow-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-neo-sm hover:shadow-neo",
        destructive: "bg-destructive text-white shadow-neo-sm hover:shadow-neo",
        outline: "bg-white text-foreground shadow-neo-sm hover:shadow-neo",
        secondary: "bg-sand text-black shadow-neo-sm hover:shadow-neo",
        ghost: "border-transparent hover:border-black hover:bg-accent/50 shadow-none hover:shadow-neo-sm",
        link: "border-transparent shadow-none hover:shadow-none text-primary underline-offset-4 hover:underline hover:-translate-y-0 hover:-translate-x-0 active:translate-x-0 active:translate-y-0",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-12 rounded-md px-8 has-[>svg]:px-4 text-base",
        icon: "size-10",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
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
  variant = "default",
  size = "default",
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
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
