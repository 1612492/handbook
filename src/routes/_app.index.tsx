import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
  component: IntroComponent,
});

function IntroComponent() {
  return (
    <div className="max-w-2xl space-y-3">
      <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
        Handbook
      </h1>
      <p className="text-muted-foreground">
        Interactive step-by-step visualizations for a range of topics. Pick a
        topic from the sidebar to get started.
      </p>
    </div>
  );
}
