import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Check if we're building the widget
  const isWidgetBuild = process.env.BUILD_TARGET === 'widget';

  if (isWidgetBuild) {
    return {
      plugins: [react()],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
      build: {
        lib: {
          entry: path.resolve(__dirname, "src/widget.tsx"),
          name: "OnlineBerater",
          fileName: () => "onlineberater-widget.js",
          formats: ["iife"],
        },
        rollupOptions: {
          output: {
            // Ensure all dependencies are bundled
            inlineDynamicImports: true,
          },
        },
        cssCodeSplit: false,
        outDir: "dist-widget",
      },
      define: {
        'process.env.NODE_ENV': JSON.stringify('production'),
      },
    };
  }

  // Default app build
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
