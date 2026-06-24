import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    target: "es2020",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("gsap")) return "gsap";
          if (id.includes("framer-motion") || id.includes("/motion")) return "motion";
          if (id.includes("react-router") || id.includes("@remix-run")) return "router";
          return undefined;
        },
      },
    },
  },
});
