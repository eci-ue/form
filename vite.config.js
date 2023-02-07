import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import jsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  resolve: {
    extensions: [".ts", ".vue", ".js", ".tsx"],
    alias: {
      "src/": `${path.resolve(__dirname, "src")}/`,
      "test/": `${path.resolve(__dirname, "test")}/`,
      "types/": `${path.resolve(__dirname, "types")}/`,
    },
  },
  plugins: [vue(), jsx()],
  build: {
    target: "modules",
    polyfillModulePreload: false,
    lib: {
      entry: "src/index",
      name: "form",
      formats: ["es"],
      fileName: "form"
    },
    sourcemap: true,
    manifest: false,
    rollupOptions: {
      external: [
        /lodash/i,
        /vue/i,
        /@ui/,
        /ant-design-vue/i,
        /@fengqiaogang\/safe-set/,
        /@fengqiaogang\/safe-get/,
      ],
      output: {
        inlineDynamicImports: true
      }
    }
  }
})
