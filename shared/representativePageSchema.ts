import { z } from "astro/zod";

const evidenceSchema = z.object({
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
  status: z.enum(["current", "preparing", "future", "paused", "complete"]),
});

export const representativePageSchema = z.object({
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
  updated: z.string().optional(),
  evidence: evidenceSchema.optional(),
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
});

export const representativePublicationSchema =
  representativePageSchema.superRefine((page, context) => {
    if (page.kind === "activity" && !page.evidence) {
      context.addIssue({
        code: "custom",
        path: ["evidence"],
        message:
          "Activity pages require an explicit evidence and publication state",
      });
      return;
    }

    const evidence = page.evidence;
    if (!evidence) return;
    const datedSources =
      evidence.evidence.length > 0 &&
      evidence.evidence.every(reference =>
        Boolean(reference.source && reference.date)
      );

    if (
      evidence.publication_state === "public" &&
      evidence.status === "current" &&
      (!evidence.intervention || !datedSources)
    ) {
      context.addIssue({
        code: "custom",
        path: ["evidence"],
        message:
          "A public current activity requires an intervention and dated evidence",
      });
    }

    if (evidence.outcome && !datedSources) {
      context.addIssue({
        code: "custom",
        path: ["evidence", "outcome"],
        message: "A published outcome requires dated evidence",
      });
    }
  });
