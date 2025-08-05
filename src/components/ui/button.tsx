import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg border-0",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow-lg border-0",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-accent",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md border-0",
        ghost: "hover:bg-accent hover:text-accent-foreground border-0",
        link: "text-primary underline-offset-4 hover:underline border-0 shadow-none",
        "brand-red": "bg-brand-red text-brand-red-foreground hover:bg-brand-red/90 shadow-md hover:shadow-lg border-0",
        success: "bg-status-success text-status-success-foreground hover:bg-status-success/90 shadow-md hover:shadow-lg border-0",
        warning: "bg-status-warning text-status-warning-foreground hover:bg-status-warning/90 shadow-md hover:shadow-lg border-0",
      },
      size: {
        sm: "h-9 px-3 text-sm rounded-base",
        default: "h-10 px-4 py-2 text-sm rounded-md",
        lg: "h-11 px-8 text-base rounded-md min-h-[44px]", // WCAG touch target
        icon: "h-10 w-10 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
