import { describe, expect, it } from "vitest";
import { TOPIC_CATEGORIES } from "./categories";
import { listTopics } from "./index";
import { TOPIC_MANIFEST } from "./topic-manifest";

describe("topic manifest", () => {
  it("lists every registered topic id", () => {
    const registered = listTopics()
      .map((topic) => topic.id)
      .sort();
    const manifest = TOPIC_MANIFEST.map((entry) => entry.id).sort();
    expect(manifest).toEqual(registered);
  });

  it("matches registered titles and categories", () => {
    for (const entry of TOPIC_MANIFEST) {
      const topic = listTopics().find((candidate) => candidate.id === entry.id);
      expect(topic, `topic ${entry.id} is registered`).toBeDefined();
      expect(topic?.title).toBe(entry.title);
      expect(topic?.category).toBe(entry.category);
    }
  });

  it("uses a known category for every topic", () => {
    for (const topic of listTopics()) {
      expect(TOPIC_CATEGORIES).toContain(topic.category);
    }
  });
});
