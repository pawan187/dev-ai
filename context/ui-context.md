# UI Context

## Theme

Dark only. No light mode. The design language is a dark technical
workspace — near-black backgrounds, layered surfaces,
and vivid accent colors for interactive elements.


## Colors

All colors are defined as CSS custom properties in global.css and mapped to tailwind tokens via theme inline. Components must use these tokens instead of hardcoded hex values or raw tailwind colors.

| Role | CSS Variable | Value |
| --- | --- | --- |
| Page background | `--bg-base` | `#0b1020` |
| Surface | `--bg-surface` | `#111827` |
| Elevated surface | `--bg-elevated` | `#172033` |
| Subtle surface | `--bg-subtle` | `#1d2940` |
| Primary text | `--text-primary` | `#eaf2ff` |
| Secondary text | `--text-secondary` | `#c9d6ee` |
| Muted text | `--text-muted` | `#8ea3c7` |
| Faint text | `--text-faint` | `#60759b` |
| Brand accent | `--accent-primary` | `#7aa2ff` |
| Brand dim | `--accent-primary-dim` | `#1c2d52` |
| AI accent | `--accent-ai` | `#4cc9f0` |
| AI text | `--accent-ai-text` | `#061b29` |
| Border | `--border-default` | `#263548` |
| Error | `--state-error` | `#f87171` |
| Success | `--state-success` | `#34d399` |
| Warning | `--state-warning` | `#fbbf24` |

Tailwind utility names map to these variables. Use bg-base, bg-surface, text-copy-primary, text-copy-muted, border-surface-border, text-branch, bg-accent-dim, etc.

## Typography

| Role      | Font              | Variable      |
| --------- | ----------------- | ------------- |
| UI text   | Geist Sans        | `--font-geist-sans` |
| Code/mono | Geist Mono        | `--font-geist-mono` |

Both fonts are loaded via next/font/google and applied as css variables on the <html>
element. The base body uses geist sands with antialiased.

## Border Radius
Radius increases with surface depth - smaller for inner elements, larger for outer containers.

| Context           | Class            |
| ----------------- | ---------------- |
| Inline / small UI | `rounded-xl` |
| Cards / panels    | `rounded-2xl` |
| Modals / overlays | `rounded-3xl` |

## Canvas

Node color palette
8 defined color pairs. Each pair specifies a dark node fill and a vivid contrasting text color tuned for readability on the dark canvas. Defined in types/canvas.ts as NODE_COLORS.

| Node fill | text color | character |
| --- | --- | --- |
| `#111827` | `#EAF2FF` | neutral dark |
| `#15314D` | `#DCEEFF` | blue |
| `#2A2345` | `#F0E8FF` | purple |
| `#3A2A1A` | `#FFE7C2` | orange |
| `#3B1F2A` | `#FFD9DE` | red |
| `#3A2438` | `#FFD9F2` | pink |
| `#1C2E2A` | `#DDFEEB` | green |
| `#102F2F` | `#D9FFFB` | teal |

default node color: #111827 and #EAF2FF


## Component Library

[e.g. shadcn/ui on top of Tailwind. Components live
in components/ui/. Use the CLI to add new components
rather than writing from scratch.]

## Layout Patterns

- [Pattern — e.g. Editor: full-viewport split with
  left sidebar, center canvas, right sidebar]
- [Pattern — e.g. Sidebars: fixed width with border separator]
- [Pattern — e.g. Modals: centered overlay with backdrop blur]
- [Pattern — e.g. Navbar: top bar with bottom border]

## Icons

[e.g. Lucide React. Stroke-based icons only. Sizes:
h-4 w-4 for inline, h-5 w-5 for buttons.]
