import { useEffect, useState } from "react";

type Language = "javascript" | "css" | "html";

let highlighterPromise: Promise<any> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = import("shiki/bundle/web").then((m) =>
      m.createHighlighter({
        themes: ["github-light"],
        langs: ["javascript", "css", "html"],
      }),
    );
  }
  return highlighterPromise;
}

export function CodeView({
  code,
  activeLine,
  language = "javascript",
}: {
  code: string;
  activeLine: number;
  language?: Language;
}) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getHighlighter()
      .then((h) => {
        if (cancelled) return;
        const out = h.codeToHtml(code, {
          lang: language,
          theme: "github-light",
        });
        setHtml(out);
      })
      .catch(() => {
        if (!cancelled) setHtml(null);
      });
    return () => {
      cancelled = true;
    };
  }, [code, language]);

  const lineHeight = 1.5;
  if (!html) {
    const lines = code.split("\n");
    return (
      <div className="relative shrink-0 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-zinc-900">
        <pre className="relative m-0 font-mono text-sm leading-6 text-zinc-900">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="flex">
                <span className="flex-1">{line || " "}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    );
  }

  return (
    <div className="relative shrink-0 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
      <div
        className="pointer-events-none absolute left-4 right-4 rounded-md bg-zinc-300/60 transition-all duration-200"
        style={{
          top: `${1 + (activeLine - 1) * lineHeight}rem`,
          height: `${lineHeight}rem`,
        }}
      />
      <div
        className="shiki-view relative font-mono text-sm leading-6"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
