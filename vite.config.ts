import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// Auto-inject <link rel="preload"> for the latin woff2 fonts that show up on
// the home page so they load in parallel with the CSS instead of being
// discovered after CSS parses. Cuts ~1s off LCP on cold loads.
const fontPreload = (): Plugin => ({
  name: "font-preload",
  apply: "build",
  enforce: "post",
  generateBundle(_options, bundle) {
    const critical = ["inter-latin-400", "inter-latin-600", "poppins-latin-700"];
    const fonts = Object.keys(bundle).filter(
      (name) => name.endsWith(".woff2") && critical.some((c) => name.includes(c))
    );
    const indexAsset = bundle["index.html"];
    if (!indexAsset || indexAsset.type !== "asset") return;
    const links = fonts
      .map((f) => `\t\t<link rel="preload" as="font" type="font/woff2" href="/${f}" crossorigin />`)
      .join("\n");
    indexAsset.source = String(indexAsset.source).replace("</head>", `${links}\n\t</head>`);
  },
});

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    tailwindcss(),
    fontPreload(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@components": resolve(__dirname, "./src/components"),
      "@lib": resolve(__dirname, "./src/lib"),
      "@hooks": resolve(__dirname, "./src/hooks"),
      "@pages": resolve(__dirname, "./src/pages"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react-dom") || id.includes("node_modules/react/") || id.includes("node_modules/react-router-dom")) {
            return "vendor";
          }
          if (id.includes("node_modules/framer-motion")) {
            return "animations";
          }
        },
      },
    },
  },
});
