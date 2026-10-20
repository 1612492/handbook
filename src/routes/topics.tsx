import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { groupTopicsByCategory, listTopics } from "@/features/topics";

export const Route = createFileRoute("/topics")({
  component: TopicsLayoutComponent,
});

function TopicsLayoutComponent() {
  const topics = listTopics();
  const groups = groupTopicsByCategory(topics);

  return (
    <div className="mx-auto flex w-full flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row">
      <aside className="md:w-64 md:shrink-0">
        <div className="sticky top-4 flex max-h-[calc(100vh-2rem)] flex-col gap-4">
          <p className="px-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Topics
          </p>
          <nav
            aria-label="Interview topics"
            className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto overscroll-contain pr-1"
          >
            {groups.length === 0 ? (
              <p className="px-3 py-2 text-sm text-muted-foreground">
                No topics yet.
              </p>
            ) : (
              groups.map((group) => (
                <section key={group.category} className="flex flex-col gap-1">
                  <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/80">
                    {group.label}
                  </p>
                  {group.topics.map((topic) => (
                    <Link
                      key={topic.id}
                      to="/topics/$topicId"
                      params={{ topicId: topic.id }}
                      activeProps={{
                        className: "bg-muted text-foreground font-medium",
                      }}
                      inactiveProps={{
                        className:
                          "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                      }}
                      className="rounded-lg px-3 py-2 text-sm transition-colors"
                    >
                      {topic.title}
                    </Link>
                  ))}
                </section>
              ))
            )}
          </nav>
        </div>
      </aside>
      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
