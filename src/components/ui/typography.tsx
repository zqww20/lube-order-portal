import * as React from "react"
import { cn } from "@/lib/utils"

// =============================================================================
// HEADING COMPONENTS
// =============================================================================

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  variant?: "default" | "gradient" | "muted"
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as = "h1", variant = "default", ...props }, ref) => {
    const Component = as
    
    const variants = {
      default: "text-foreground",
      gradient: "text-gradient font-bold",
      muted: "text-muted-foreground"
    }

    const sizes = {
      h1: "text-h1 md:text-display-sm lg:text-display-md font-bold font-heading tracking-tight",
      h2: "text-h2 md:text-h1 lg:text-display-sm font-semibold font-heading tracking-tight",
      h3: "text-h3 md:text-h2 lg:text-h1 font-semibold font-heading",
      h4: "text-h4 md:text-h3 lg:text-h2 font-semibold font-heading",
      h5: "text-h5 md:text-h4 lg:text-h3 font-semibold font-heading",
      h6: "text-h6 md:text-h5 lg:text-h4 font-semibold font-heading uppercase tracking-wide"
    }

    return (
      <Component
        ref={ref as any}
        className={cn(
          sizes[as],
          variants[variant],
          className
        )}
        {...props}
      />
    )
  }
)
Heading.displayName = "Heading"

// Convenience components for each heading level
export const H1 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, "as">>(
  (props, ref) => <Heading as="h1" ref={ref} {...props} />
)
H1.displayName = "H1"

export const H2 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, "as">>(
  (props, ref) => <Heading as="h2" ref={ref} {...props} />
)
H2.displayName = "H2"

export const H3 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, "as">>(
  (props, ref) => <Heading as="h3" ref={ref} {...props} />
)
H3.displayName = "H3"

export const H4 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, "as">>(
  (props, ref) => <Heading as="h4" ref={ref} {...props} />
)
H4.displayName = "H4"

export const H5 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, "as">>(
  (props, ref) => <Heading as="h5" ref={ref} {...props} />
)
H5.displayName = "H5"

export const H6 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, "as">>(
  (props, ref) => <Heading as="h6" ref={ref} {...props} />
)
H6.displayName = "H6"

// =============================================================================
// TEXT COMPONENTS
// =============================================================================

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "xs" | "sm" | "base" | "lg" | "xl"
  variant?: "default" | "muted" | "success" | "warning" | "error"
  weight?: "light" | "normal" | "medium" | "semibold" | "bold"
}

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size = "base", variant = "default", weight = "normal", ...props }, ref) => {
    const sizes = {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg", 
      xl: "text-xl"
    }

    const variants = {
      default: "text-foreground",
      muted: "text-muted-foreground",
      success: "text-status-success",
      warning: "text-status-warning", 
      error: "text-status-error"
    }

    const weights = {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold"
    }

    return (
      <p
        ref={ref}
        className={cn(
          "font-body",
          sizes[size],
          variants[variant],
          weights[weight],
          className
        )}
        {...props}
      />
    )
  }
)
Text.displayName = "Text"

// =============================================================================
// SPECIALIZED TEXT COMPONENTS
// =============================================================================

export const Caption = React.forwardRef<HTMLParagraphElement, Omit<TextProps, "size">>(
  ({ className, ...props }, ref) => (
    <Text
      ref={ref}
      size="xs"
      variant="muted"
      className={cn("leading-relaxed", className)}
      {...props}
    />
  )
)
Caption.displayName = "Caption"

export const Lead = React.forwardRef<HTMLParagraphElement, Omit<TextProps, "size">>(
  ({ className, ...props }, ref) => (
    <Text
      ref={ref}
      size="lg"
      className={cn("leading-relaxed", className)}
      {...props}
    />
  )
)
Lead.displayName = "Lead"

export const Small = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <small
      ref={ref}
      className={cn("text-sm font-medium text-muted-foreground font-body", className)}
      {...props}
    />
  )
)
Small.displayName = "Small"

export const Code = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <code
      ref={ref}
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className
      )}
      {...props}
    />
  )
)
Code.displayName = "Code"

// Export the main Heading component
export { Heading }