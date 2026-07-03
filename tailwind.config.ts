import type { Config } from "tailwindcss";

// Paleta y escala definidas en docs/04-diseno-ux-accesibilidad.md:
// alto contraste, texto grande por defecto, sin infantilizar.
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF9F5",
        ink: "#17282A",
        teal: {
          DEFAULT: "#0F5B57",
          deep: "#0A403D",
          soft: "#E4EDEB",
          tint: "#EDF3F1",
        },
        ochre: "#C0722C",
        muted: "#5C6C6A",
        line: "#DDD9CF",
        band: {
          ok: "#2F7A46",
          watch: "#B5790A",
          refer: "#B14B2C",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Iowan Old Style", "Palatino Linotype", "serif"],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        // Escala "persona": mínimo 18-20px equivalente en pantallas de cara al usuario evaluado.
        "persona-base": ["1.25rem", { lineHeight: "1.7" }],
        "persona-lg": ["1.6rem", { lineHeight: "1.5" }],
        "persona-xl": ["2.1rem", { lineHeight: "1.3" }],
      },
      minHeight: {
        touch: "44px",
      },
      minWidth: {
        touch: "44px",
      },
    },
  },
  plugins: [],
};

export default config;
