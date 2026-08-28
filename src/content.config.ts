import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { representativePageSchema } from "../shared/representativePageSchema";

const representativePages = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/pages" }),
  schema: representativePageSchema,
});

export const collections = { representativePages };
