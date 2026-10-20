/**
 * Topics are grouped by the area of the platform they explain, so the sidebar
 * and the catalog can present them as nested sections.
 */
export const TOPIC_CATEGORIES = ["javascript", "html", "css"] as const;

export type TopicCategory = (typeof TOPIC_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<TopicCategory, string> = {
  javascript: "JavaScript",
  html: "HTML & DOM",
  css: "CSS",
};

export interface CategorizedTopic {
  id: string;
  title: string;
  category: TopicCategory;
}

export interface TopicGroup<T extends CategorizedTopic> {
  category: TopicCategory;
  label: string;
  topics: T[];
}

/**
 * Group topics into the canonical category order, skipping empty categories.
 */
export function groupTopicsByCategory<T extends CategorizedTopic>(
  topics: readonly T[],
): TopicGroup<T>[] {
  const groups: TopicGroup<T>[] = [];
  for (const category of TOPIC_CATEGORIES) {
    const group = topics.filter((topic) => topic.category === category);
    if (group.length === 0) continue;
    groups.push({
      category,
      label: CATEGORY_LABELS[category],
      topics: group,
    });
  }
  return groups;
}
