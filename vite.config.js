import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  const config = {
    plugins: [react(), svgr()],
    server: {
      cors: {
        origin: isProduction ? "https://maeilmail.co.kr" : true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
      },
      hmr: {
        host: 'maeilmail.co.kr',
        protocol: 'wss',
        port: 433
      },
      host: "0.0.0.0",
      port: 5173,
      allowedHosts: ["maeilmail.co.kr"],
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@screens": path.resolve(__dirname, "./src/screens"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@css": path.resolve(__dirname, "./src/screens/css"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@contexts": path.resolve(__dirname, "./src/contexts"),
        "@routes": path.resolve(__dirname, "./src/routes"),
        "@store": path.resolve(__dirname, "./src/store"),
      },
    },
  };

  
  if (!isProduction) {
    config.server.hmr = true;
  }

  return config;
});