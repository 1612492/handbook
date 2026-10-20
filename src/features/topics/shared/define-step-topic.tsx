import { ClientOnly } from "@/components/visualizer/ClientOnly";
import {
  StepVisualizer,
  type StepVisualizerConfig,
} from "@/components/visualizer/step-visualizer";
import type { TopicCategory } from "../categories";
import { defineTopic, type TopicDefinition } from "../registry";

/**
 * Register a step-visualizer topic with the shared playback shell. Keeps each
 * topic's entry point to metadata plus a config object.
 */
export function defineStepTopic<C extends string>(
  meta: {
    id: string;
    title: string;
    description: string;
    category: TopicCategory;
  },
  config: StepVisualizerConfig<C>,
): TopicDefinition {
  function TopicVisualizer() {
    return (
      <ClientOnly>
        <StepVisualizer config={config} />
      </ClientOnly>
    );
  }

  return defineTopic({ ...meta, Component: TopicVisualizer });
}
