# Proposal

## Why

The event loop visualizer shipped as a functional v1, but its UI was iterated heavily after the initial implementation: native controls were replaced with shadcn components, the code block moved to shiki with a light theme, typography and layout changed, and narration highlighting was refined. These refinements are not captured in the original change's artifacts, making the plan incoherent with the shipped code. This change records that polish work so the project's planning history matches reality.

## What Changes

- Replace native form controls (select, button, label, range input) with shadcn/ui components (Select, Button, Label, Slider); install missing Slider.
- Replace hand-rolled syntax highlighting with shiki (`github-light` theme) in the code block; add line numbers and light-themed styling.
- Change typography: Outfit Variable for UI text, JetBrains Mono Variable for code.
- Add a left sidebar listing all topics (layout route) and stretch the layout to full width.
- Refine narration highlighting: background-colored terms, quoted output values, and code tokens; remove the inline code-line block from the step panel.
- Color-code containers and chips for visual tracking; larger block-shaped chips.
- Make the step section larger and more prominent.

## Capabilities

### New Capabilities

<!-- None: no new spec-level behavior. -->

### Modified Capabilities

<!-- None: no spec-level behavior changes; all changes are implementation/UI polish. -->

## Impact

- Affected code: `src/components/visualizer/EventLoopVisualizer.tsx`, `src/routes/topics.tsx`, `src/routes/topics/index.tsx`, `src/styles.css`, `src/components/ui/slider.tsx`.
- Dependencies: adds `shiki`, `@fontsource-variable/outfit`, `@fontsource-variable/jetbrains-mono`, shadcn slider.
- Tests: existing Playwright/Vitest suites updated for new controls (slider input, sidebar text).
