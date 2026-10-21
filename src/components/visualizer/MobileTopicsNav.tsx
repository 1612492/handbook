"use client";

import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { TopicDefinition, TopicGroup } from "@/features/topics";

interface MobileTopicsNavProps {
  groups: TopicGroup<TopicDefinition>[];
}

export function MobileTopicsNav({ groups }: MobileTopicsNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={<Button variant="outline" size="sm" aria-label="Topics" />}
        >
          <Menu className="size-4" />
          Topics
        </SheetTrigger>
        <SheetContent side="left" className="w-[18rem]">
          <SheetHeader>
            <SheetTitle>Topics</SheetTitle>
          </SheetHeader>
          <nav
            aria-label="Topics"
            className="flex flex-col gap-5 overflow-y-auto"
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
                      to="/$slug"
                      params={{ slug: topic.id }}
                      onClick={() => setOpen(false)}
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
        </SheetContent>
      </Sheet>
    </div>
  );
}
