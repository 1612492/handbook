import { ClientOnly } from "@/components/visualizer/ClientOnly";
import { ThisBindingVisualizer } from "@/components/visualizer/ThisBindingVisualizer";
import { defineTopic } from "../registry";

function ThisBindingTopic() {
  return (
    <ClientOnly>
      <ThisBindingVisualizer />
    </ClientOnly>
  );
}

export const thisBindingTopic = defineTopic({
  id: "this-binding",
  category: "javascript",
  title: "How `this` Works",
  description:
    "Step through the binding rules and see which target `this` resolves to for each call.",
  Component: ThisBindingTopic,
});
