import type { ComponentType } from "react";
import type { TopicCategory } from "./categories";

export interface TopicDefinition {
  id: string;
  title: string;
  description: string;
  category: TopicCategory;
  Component: ComponentType;
}

const registry = new Map<string, TopicDefinition>();

export function defineTopic(topic: TopicDefinition): TopicDefinition {
  if (registry.has(topic.id)) {
    throw new Error(`Topic already registered: ${topic.id}`);
  }
  registry.set(topic.id, topic);
  return topic;
}

export function getTopic(id: string): TopicDefinition | undefined {
  return registry.get(id);
}

export function listTopics(): TopicDefinition[] {
  return [...registry.values()];
}
