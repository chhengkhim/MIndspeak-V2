/** @type {import('tailwindcss').Config} */

const config = {
	darkMode: ["class"],
	content: [
	  "./pages/**/*.{ts,tsx}",
	  "./components/**/*.{ts,tsx}",
	  "./app/**/*.{ts,tsx}",
	  "./src/**/*.{html,ts,tsx}",
	  "*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
	  extend: {
		animation: {
		  'shimmer-slide': 'shimmer-slide var(--speed) ease-in-out infinite alternate',
		  'spin-around': 'spin-around calc(var(--speed)*2) infinite linear',
		  'slow-spin': 'slow-spin 6s linear infinite',  // Define a slower spin animation
		  'spin-slow': 'spin 3s linear infinite',  // Define a slower spin animation for loading
		  'slide-in': 'slide-in 0.5s ease-out forwards',  // Define slide-in animation
		  'slide-up': 'slide-up 0.5s ease-out forwards'  // Define slide-up animation
		},
		keyframes: {
		  'shimmer-slide': {
			to: {
			  transform: 'translate(calc(100cqw - 100%), 0)'
			}
		  },
		  'spin-around': {
			'0%': {
			  transform: 'translateZ(0) rotate(0)'
			},
			'15%, 35%': {
			  transform: 'translateZ(0) rotate(90deg)'
			},
			'65%, 85%': {
			  transform: 'translateZ(0) rotate(270deg)'
			},
			'100%': {
			  transform: 'translateZ(0) rotate(360deg)'
			}
		  },
		  'slow-spin': {  // Define the keyframes for the slower spin
			'0%': {
			  transform: 'rotate(0deg)'
			},
			'100%': {
			  transform: 'rotate(360deg)'
			}
		  },
		  'slide-in': {  // Define the keyframes for slide-in
			'0%': {
			  transform: 'translateX(-100%)',
			  opacity: 0
			},
			'100%': {
			  transform: 'translateX(0)',
			  opacity: 1
			}
		  },
		  'slide-up': {  // Define the keyframes for slide-up
			'0%': {
			  transform: 'translateY(100%)',
			  opacity: 0
			},
			'100%': {
			  transform: 'translateY(0)',
			  opacity: 1
			}
		  }
		},
		container: {
		  center: true,
		  padding: '2rem',
		  screens: {
			'2xl': '1400px'
		  }
		},
		colors: {
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
		  }
		},
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)'
		},
		keyframes: {
		  'accordion-down': {
			from: {
			  height: 0
			},
			to: {
			  height: 'var(--radix-accordion-content-height)'
			}
		  },
		  'accordion-up': {
			from: {
			  height: 'var(--radix-accordion-content-height)'
			},
			to: {
			  height: 0
			}
		  },
		  marquee: {
			from: {
			  transform: 'translateX(0)'
			},
			to: {
			  transform: 'translateX(calc(-100% - var(--gap)))'
			}
		  },
		  'marquee-vertical': {
			from: {
			  transform: 'translateY(0)'
			},
			to: {
			  transform: 'translateY(calc(-100% - var(--gap)))'
			}
		  }
		},
		animation: {
		  'accordion-down': 'accordion-down 0.2s ease-out',
		  'accordion-up': 'accordion-up 0.2s ease-out',
		  marquee: 'marquee var(--duration) infinite linear',
		  'marquee-vertical': 'marquee-vertical var(--duration) linear infinite'
		}
	  }
	},
	plugins: [],
  }
  
  export default config