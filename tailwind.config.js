/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      screens: {
        '1440': '1440px',
        '1920': '1920px',
      },
      fontFamily: {
        roboto: ['Roboto mono', 'mono-space'],
        raleway: ['Raleway', 'sans-serif'],
        kanit: ['Kanit', 'sans-serif']
      },
      boxShadow: {
        sm: '0px 2px 8px 2px rgba(0, 0, 0, 0.04);',
        m: '0px 4px 16px 8px rgba(0, 0, 0, 0.02)'
      },
      fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700'
      },
      colors: {
        border: 'rgba(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        actions: {
          DEFAULT: 'hsl(var(--actions))',
          foreground: 'hsl(var(--actions-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
          background: 'hsl(var(--muted-background))'
        },
        disabled: {
          foreground: 'hsl(var(--disabled-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
          additionalForeground: 'hsl(var(--card-additional-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        dialog: {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        dialog: 'dialog 0.3s',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
