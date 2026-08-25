import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const representativePages = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/pages" }),
  schema: z.object({
    kind: z.enum(["home", "company", "activity"]),
    path: z.string().startsWith("/"),
    lang: z.string(),
    title: z.string(),
    description: z.string(),
    eyebrow: z.string(),
    heading: z.string(),
    intro: z.string(),
    masterTagline: z.string().optional(),
    supportingLine: z.string().optional(),
    purpose: z.string().optional(),
    purposeExplanation: z.string().optional(),
    actionModel: z.array(z.string()).default([]),
    legalName: z.string().optional(),
    status: z.string().optional(),
    updated: z.string().optional(),
    evidence: z
      .object({
        publication_state: z.enum(["internal", "reviewed", "public"]),
        latent_value: z.string().optional(),
        beneficiary: z.string().optional(),
        intervention: z.string().optional(),
        outcome: z.string().nullable(),
        durability: z.string().nullable(),
        evidence: z
          .array(z.object({ source: z.string(), date: z.string().nullable() }))
          .default([]),
        tradeoffs: z.array(z.string()).default([]),
        constraints: z.array(z.string()).default([]),
        action_stage: z.enum([
          "discovery",
          "understanding",
          "design",
          "execution",
          "continuity",
          "verification",
        ]),
        status: z.enum([
          "current",
          "preparing",
          "future",
          "paused",
          "complete",
        ]),
      })
      .optional(),
    facts: z
      .array(z.object({ label: z.string(), value: z.string() }))
      .default([]),
    sections: z.array(
      z.object({
        heading: z.string(),
        body: z.string(),
        items: z.array(z.string()).default([]),
      })
    ),
    links: z.array(
      z.object({
        label: z.string(),
        href: z.string().startsWith("/"),
      })
    ),
  }),
});

export const collections = { representativePages };
