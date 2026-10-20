# Design

## Context

The base visualizer (`event-loop-visualizer`) is implemented and complete. This change records the UI polish applied afterward. See `proposal.md` for motivation.

## Goals / Non-Goals

**Goals:**

- Replace native form controls with shadcn/ui components for consistency.
- Use shiki for professional code highlighting (light theme).
- Improve typography and layout (fonts, sidebar, full-width).
- Refine narration highlighting and step panel prominence.

**Non-Goals:**

- No spec-level behavior changes.
- No new topics or examples.

## Decisions

### D1: shadcn components over native controls

Use shadcn Button, Select, Label, Slider instead of native `<button>`, `<select>`, `<label>`, `<input type="range">`. Install missing Slider via shadcn CLI. Fixes the generated slider's bad `cn` import.

### D2: shiki for code highlighting

Use `shiki/bundle/web` with `github-light` theme instead of hand-rolled tokenizer. Cached highlighter at module level; fallback to plain text while loading. Line numbers via CSS counter on `.shiki-view`.

### D3: Typography

- UI text: Outfit Variable (with Inter Variable fallback).
- Code: JetBrains Mono Variable.

### D4: Layout

- Left sidebar listing topics via a layout route (`src/routes/topics.tsx`).
- Full-width containers (remove `max-w-*` constraints).

### D5: Narration highlighting

Background-colored highlights (not bold/underline): container terms in container colors, quoted output values in orange, code tokens in violet, time values in amber. Remove the inline active-code-line block from the step panel; keep the separate code view.

### D6: Color-coded containers and chips

Containers get tinted backgrounds/borders/dots; chips get stable colors by id hash and larger block shape for visual tracking.

## Risks / Trade-offs

- [Risk] shiki bundle size → Mitigation: web bundle; cached highlighter; fallback plain text.
- [Risk] Sidebar duplicates topic names in catalog → Mitigation: e2e locators scoped to `main`.
