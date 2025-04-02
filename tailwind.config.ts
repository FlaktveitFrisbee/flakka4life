import typographyPlugin from "@tailwindcss/typography";
import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "selector",
  plugins: [typographyPlugin],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },

    // typography: typographyStyles,
  },
} satisfies Config;
