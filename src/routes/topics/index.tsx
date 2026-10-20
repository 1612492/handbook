import { createFileRoute, Link } from "@tanstack/react-router";
import { groupTopicsByCategory, listTopics } from "@/features/topics";

export const Route = createFileRoute("/topics/")({
  component: TopicsIndexComponent,
});

function TopicsIndexComponent() {
  const topics = listTopics();
  const groups = groupTopicsByCategory(topics);

  return (
    <main className="mx-auto flex w-full flex-col gap-8 px-4 py-10 sm:px-6">
      <header className="space-y-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Interview Topics
        </h1>
        <p className="text-muted-foreground">
          Interactive visualizers for common front end interview topics.
        </p>
      </header>

      {groups.length === 0 ? (
        <p className="text-muted-foreground">No topics available yet.</p>
      ) : (
        groups.map((group) => (
          <section key={group.category} className="flex flex-col gap-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {group.label}
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {group.topics.map((topic) => (
                <li key={topic.id}>
                  <Link
                    to="/topics/$topicId"
                    params={{ topicId: topic.id }}
                    className="block rounded-2xl border border-border/70 bg-card/80 p-5 transition-transform duration-200 hover:-translate-y-1"
                  >
                    <h3 className="font-medium">{topic.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {topic.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </main>
  );
}
