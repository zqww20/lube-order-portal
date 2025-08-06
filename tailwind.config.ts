import type { Config } from "tailwindcss";
import { designTokens } from "./src/styles/tokens";
import { typographyTokens } from "./src/styles/typography";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: designTokens.spacing.md,
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			// Design System Colors - Enhanced with semantic tokens
			colors: {
				// Core theme colors (keep existing CSS variables)
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},

				// NEW: Bluewater Visual Refresh v2 Palette
				'bw-primary': designTokens.colors['bw-primary'],     // #111D4A Deep Navy
				'bw-accent': designTokens.colors['bw-accent'],       // #4CC1E5 Accent Blue
				'bw-surface': designTokens.colors['bw-surface'],     // #F2F5F7 Mist Grey
				'bw-text': designTokens.colors['bw-text'],           // #333333 Dark Grey
				'bw-white': designTokens.colors['bw-white'],         // #FFFFFF Pure White

				// Legacy colors (backwards compatibility)
				'brand-red': {
					DEFAULT: 'hsl(var(--brand-red))',
					foreground: 'hsl(var(--brand-red-foreground))'
				},
				
				// Status colors with variants
				status: designTokens.colors.status,
				
				// Neutral color scale
				neutral: designTokens.colors.neutral,
			},

			// Typography system
			fontFamily: designTokens.typography.fontFamily,
			fontSize: {
				// Legacy sizes (keep for backwards compatibility)
				...designTokens.typography.fontSize,
				
				// New centralized typography scale
				...typographyTokens.fontSize,
				
				// Responsive heading variants (legacy)
				'h1': ['2rem', { lineHeight: '1.25', fontWeight: '700' }],
				'h2': ['1.5rem', { lineHeight: '1.25', fontWeight: '600' }],
				'h3': ['1.25rem', { lineHeight: '1.5', fontWeight: '600' }],
				'h4': ['1.125rem', { lineHeight: '1.5', fontWeight: '600' }],
				'h5': ['1rem', { lineHeight: '1.5', fontWeight: '600' }],
				'h6': ['0.875rem', { lineHeight: '1.5', fontWeight: '600' }],
			},
			fontWeight: {
				...designTokens.typography.fontWeight,
				...typographyTokens.fontWeight,
			},
			lineHeight: {
				...designTokens.typography.lineHeight,
				...typographyTokens.lineHeight,
			},
			letterSpacing: designTokens.typography.letterSpacing,

			// Spacing system
			spacing: designTokens.spacing,

			// Border radius
			borderRadius: {
				...designTokens.radius,
				// Keep existing CSS variable references
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},

			// Enhanced shadows with unified token
			boxShadow: {
				...designTokens.elevation,
				'bw-md': designTokens.elevation['bw-md'], // 4dp unified shadow
			},

			// Transition system
			transitionDuration: designTokens.transition.duration,
			transitionTimingFunction: designTokens.transition.timing,

			// Enhanced animations
			keyframes: {
				'accordion-down': {
					from: { height: '0', opacity: '0' },
					to: { height: 'var(--radix-accordion-content-height)', opacity: '1' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
					to: { height: '0', opacity: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
