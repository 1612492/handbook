import { Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileTopicsNav } from "@/components/visualizer/MobileTopicsNav";
import { groupTopicsByCategory, listTopics } from "@/features/topics";

export function TopicsShell({ children }: { children: ReactNode }) {
  const topics = listTopics();
  const groups = groupTopicsByCategory(topics);

  return (
    <div className="mx-auto flex h-screen w-full flex-col gap-6 overflow-hidden pl-4 pr-0 py-4 sm:pl-6">
      <header className="flex shrink-0 items-center justify-between gap-4 pr-4 sm:pr-6">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg px-1 py-1 font-heading text-base font-semibold tracking-tight transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
            inactiveProps={{ className: "text-foreground" }}
          >
            <BookOpen className="size-5" />
            Handbook
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <MobileTopicsNav groups={groups} />
          <ThemeToggle />
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-6 md:flex-row">
        <aside className="hidden min-h-0 md:flex md:w-64 md:shrink-0 md:flex-col md:overflow-y-auto">
          <p className="px-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Topics
          </p>
          <nav aria-label="Topics" className="mt-4 flex flex-col gap-5">
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
                      to="/$slug"
                      params={{ slug: topic.id }}
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
        </aside>
        <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
