import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // target: "https://brewhopper-backend.onrender.com",
        target: "http://localhost:5001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
