import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // 🔥 Agregado para permitir Railway
  server: {
    host: true,
    strictPort: true,
    allowedHosts: [
      "front-tesis-production.up.railway.app"
    ]
  },

  preview: {
    host: true,
    strictPort: true,
    allowedHosts: [
      "front-tesis-production.up.railway.app"
    ]
  }
});
