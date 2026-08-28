import { describe, expect, it } from "vitest";
import { representativePublicationSchema } from "../shared/representativePageSchema";

const activity = {
  kind: "activity" as const,
  path: "/activities/example/",
  lang: "en",
  title: "Example activity",
  description: "Example description",
  eyebrow: "Activity",
  heading: "Example",
  intro: "Example introduction",
  sections: [],
  links: [],
};

describe("representative activity publication gate", () => {
  it("requires an explicit evidence state", () => {
    expect(representativePublicationSchema.safeParse(activity).success).toBe(
      false
    );
  });

  it("accepts an internal future structure without invented outcomes", () => {
    expect(
      representativePublicationSchema.safeParse({
        ...activity,
        evidence: {
          publication_state: "internal",
          outcome: null,
          durability: null,
          action_stage: "discovery",
          status: "future",
        },
      }).success
    ).toBe(true);
  });

  it("rejects a public current claim without intervention and dated evidence", () => {
    expect(
      representativePublicationSchema.safeParse({
        ...activity,
        evidence: {
          publication_state: "public",
          outcome: null,
          durability: null,
          action_stage: "continuity",
          status: "current",
        },
      }).success
    ).toBe(false);
  });
});
