import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemas } from "./sanity/schemas";
import { sanityConfig } from "./sanity/config";

export default defineConfig({
  ...sanityConfig,
  name: "thekayodekolade",
  title: "TheKayodeKolade — CMS",
  basePath: "/studio",
  plugins: [
    structureTool(),
    visionTool(),          // GROQ query playground
  ],
  schema: { types: schemas },
});
