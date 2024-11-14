import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      "@wails": path.resolve(__dirname, "./wailsjs/go/main/App"),
      "@stores": path.resolve(__dirname, "./src/stores"),
    },
  },
});
