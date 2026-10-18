import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Tailwind runs through its Vite plugin - no PostCSS config needed.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    // Proxy /api calls to your Express backend during development
    proxy: {
      "/api": { target: "http://localhost:5000", changeOrigin: true },
    },
  },
});
