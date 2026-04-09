import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 20px 60px rgba(15, 23, 42, 0.08)",
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(circle at top left, rgba(99, 102, 241, 0.22), transparent 45%), radial-gradient(circle at right top, rgba(251, 191, 36, 0.18), transparent 30%)",
      },
    },
  },
  plugins: [],
};

export default config;
