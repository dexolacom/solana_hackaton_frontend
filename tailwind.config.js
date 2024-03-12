/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        kanit: ["Kanit", "sans-serif"],
        roboto: ["Roboto mono", "mono-space"],
      },
      fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      // fontSize: {
      //   // labels
      //   labelH1: ['24px', '32px'],
      //   labelH2: ['20px', '30px'],
      //   labelH3: ['14px', '24px'],
      //   // buttons
      //   labelButtonL: ['18px', '24px'],
      //   labelButtonM: ['14px', '24px'],
      //   labelButtonS: ['12px', '24px'],
      //   // body
      //   bodyRegularL: ['16px', '24px'],
      //   bodyRegularM: ['14px', '24px'],
      //   bodyRegularS: ['12px', '16px'],
      //   bodyLightM: ['14px', '24px'],
      //   bodyLightS: ['12px', '16px'],
      //   // numbers
      //   numbersBoldH1: ['40px', '53px'],
      //   numbersMediumM: ['14px', '24px'],
      //   numbersRegularM: ['14px', '24px']
      // },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        actions: {
          foreground: "hsl(var(--actions-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          additionalForeground: "hsl(var(--secondary-additional-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          hovered: "hsl(var(--accent-hovered))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          additionalForeground: "hsl(var(--card-additional-foreground))"
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "dialog": {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "dialog": "dialog 0.3s",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}