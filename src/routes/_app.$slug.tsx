import { createFileRoute } from "@tanstack/react-router";
import { getTopic } from "@/features/topics";

export const Route = createFileRoute("/_app/$slug")({
  component: TopicRouteComponent,
});

function TopicRouteComponent() {
  const { slug } = Route.useParams();
  const topic = getTopic(slug);

  if (!topic) {
    return (
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-10 sm:px-6">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Topic not found
        </h1>
        <p className="text-muted-foreground">
          No topic exists for &quot;{slug}&quot;.
        </p>
      </main>
    );
  }

  const Component = topic.Component;
  return <Component />;
}
