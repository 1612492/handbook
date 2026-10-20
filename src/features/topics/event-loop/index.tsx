import { ClientOnly } from "@/components/visualizer/ClientOnly";
import { EventLoopVisualizer } from "@/components/visualizer/EventLoopVisualizer";
import { defineTopic } from "../registry";

function EventLoopTopic() {
  return (
    <ClientOnly>
      <EventLoopVisualizer />
    </ClientOnly>
  );
}

export const eventLoopTopic = defineTopic({
  id: "event-loop",
  category: "javascript",
  title: "Event Loop",
  description:
    "Watch the call stack, Web APIs, microtask queue, and task queue interact, step by step.",
  Component: EventLoopTopic,
});
