import { createFileRoute, Outlet } from "@tanstack/react-router";
import { TopicsShell } from "@/components/visualizer/TopicsShell";

export const Route = createFileRoute("/_app")({
  component: AppLayoutComponent,
});

function AppLayoutComponent() {
  return (
    <TopicsShell>
      <Outlet />
    </TopicsShell>
  );
}
