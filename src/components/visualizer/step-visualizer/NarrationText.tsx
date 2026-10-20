import type { ReactNode } from "react";

export interface HighlightTerm {
  term: string;
  className: string;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function NarrationText({
  text,
  terms = [],
}: {
  text: string;
  terms?: HighlightTerm[];
}) {
  if (terms.length === 0) {
    return <PlainNarration text={text} />;
  }

  const sorted = [...terms].sort((a, b) => b.term.length - a.term.length);
  const termPattern = sorted.map((t) => escapeRegExp(t.term)).join("|");
  const codePattern =
    "'(?:[^']*)'|`[^`]*`|[A-Za-z_$][\\w$]*(?:\\.[A-Za-z_$][\\w$]*)*\\([^)]*\\)|\\b(?:true|false|null|undefined|this|new|await|async)\\b";
  const regex = new RegExp(
    `('(?:[^']*)'|\`[^\`]*\`)|(${termPattern})|(${codePattern})`,
    "gi",
  );

  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    const idx = match.index;
    if (idx > lastIndex) parts.push(text.slice(lastIndex, idx));
    const full = match[0];
    if (match[1]) {
      parts.push(
        <span
          key={key++}
          className="rounded bg-orange-200/70 px-0.5 text-orange-900 dark:bg-orange-500/25 dark:text-orange-200"
        >
          {full}
        </span>,
      );
    } else if (match[2]) {
      const lower = full.toLowerCase();
      const term = sorted.find((t) => t.term.toLowerCase() === lower);
      parts.push(
        <span key={key++} className={term?.className ?? ""}>
          {full}
        </span>,
      );
    } else {
      parts.push(
        <span
          key={key++}
          className="rounded bg-violet-200/70 px-0.5 text-violet-900 dark:bg-violet-500/25 dark:text-violet-200"
        >
          {full}
        </span>,
      );
    }
    lastIndex = idx + full.length;
    if (match.index === regex.lastIndex) regex.lastIndex++;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  if (parts.length === 0) parts.push(text);
  return <>{parts}</>;
}

function PlainNarration({ text }: { text: string }) {
  return <>{text}</>;
}
