import type { TopicCategory } from "./categories";

export interface TopicManifestEntry {
  id: string;
  title: string;
  category: TopicCategory;
}

/**
 * Static list of every registered topic. Kept in sync with the topic registry
 * by `topic-manifest.test.ts`, and used to parametrize the e2e suite.
 */
export const TOPIC_MANIFEST: TopicManifestEntry[] = [
  { id: "async-await", title: "Async / Await", category: "javascript" },
  { id: "closures", title: "Closures", category: "javascript" },
  { id: "coercion", title: "Type Coercion", category: "javascript" },
  { id: "event-loop", title: "Event Loop", category: "javascript" },
  {
    id: "event-propagation",
    title: "Event Propagation",
    category: "javascript",
  },
  { id: "hoisting", title: "Hoisting", category: "javascript" },
  { id: "promises", title: "Promises", category: "javascript" },
  {
    id: "prototypes",
    title: "Prototypal Inheritance",
    category: "javascript",
  },
  { id: "scoping", title: "Scoping", category: "javascript" },
  { id: "this-binding", title: "How `this` Works", category: "javascript" },
  {
    id: "dom-attr-vs-prop",
    title: "Attributes vs Properties",
    category: "html",
  },
  { id: "dom-lifecycle", title: "Document Lifecycle", category: "html" },
  { id: "css-bfc", title: "Block Formatting Context", category: "css" },
  { id: "css-box-model", title: "CSS Box Model", category: "css" },
  { id: "css-flexbox", title: "CSS Flexbox", category: "css" },
  { id: "css-grid", title: "CSS Grid", category: "css" },
  { id: "css-positioning", title: "CSS Positioning", category: "css" },
  { id: "css-specificity", title: "CSS Specificity", category: "css" },
  { id: "css-stacking", title: "CSS Stacking Context", category: "css" },
];
