# Portfolio Website — Project Brief

## Who I am
Shanid — early-career Cloud / DevOps engineer with a cybersecurity background.
Target roles: Junior DevOps, Cloud Engineer, Linux/Infrastructure, entry-level Platform Engineer.
Audience: technical recruiters and hiring engineers who will spend under 60 seconds on the site.

## Source of truth
- `content/resume.pdf` (or `.md`) and the repos/READMEs linked in `content/projects.md`.
- NEVER invent jobs, metrics, certifications, production deployments or skills.
- Mark work-in-progress projects as such. If a claim can't be verified from these files, ask me.

## Your role
Act as a senior product designer + frontend engineer. Make deliberate design decisions
and explain them in one or two sentences. Use the installed design skill for visual direction.

## Design rules
- Define design tokens FIRST in one file (type scale, spacing scale, colors incl. dark mode,
  radius, shadows). Every component uses only these tokens — no one-off values.
- Max 2 typefaces. One accent color, used sparingly.
- Content first: clear project write-ups (problem → what I built → stack → outcome → repo link)
  matter more than decoration.
- Animation must be subtle and respect `prefers-reduced-motion`.
- This must be an ORIGINAL design. Do not imitate popular portfolio templates or any
  specific existing site. Derive the visual direction from the Design identity below.

## Design identity (my own design — fill this in, or let Claude interview you)
- 3 words the site should feel like: precise, calm (engineered, quiet confidence)
- 3 words it must NOT feel like: cute/playful, academic/dense
- Things outside websites whose look I like: engineering blueprints (technical
  drawings, grid paper, annotations, dimension lines)
- Colors I'm drawn to / colors I dislike: warm stone neutrals + one muted forest-green
  accent ("all checks passed"). Avoid neon, purple/blue gradients.
- Light, dark, or both by default: both, follow system setting, with a manual toggle
- One idea from my own work or background that could shape the design:
  pipeline stages (test → build → scan → deploy) as a structural thread down the page
- Density: balanced — readable in 60s, real detail underneath
- Motion: interactive but controlled (updated 2026-10-29). Spring/"bouncy" feedback and
  3D tilt on things people touch, one orchestrated load sequence (the pipeline run).
  No ambient bouncing. Everything respects prefers-reduced-motion.
- Impression after 60s: "security-minded DevOps" — a rare combo of DevOps with a
  genuine security background

Chosen direction (2026-10-29): **A, "Drawing sheet"**. The page is an engineering
drawing: bordered sheet, zone markers, annotated pipeline drawing, title block.
Barlow Condensed (headings, labels) + Barlow (body). Tokens: `src/styles/tokens.css`.

Use these answers as the source of design decisions. When proposing a direction,
say which answers each choice comes from.

### Banned (generic AI look)
- Purple/blue gradients, glassmorphism, neon glows, particle backgrounds
- "Hi, I'm Shanid 👋" hero, emoji as icons, typewriter text effects
- Generic 3-card feature grids, skill bars / percentage meters
- Inter/Roboto as the only font with no hierarchy, everything centered
- Stock "terminal" cliché hero unless it's genuinely well executed and I approve it

## Engineering
- Stack: Astro (or plain HTML/CSS if simpler) — static, fast, no heavy JS frameworks
  unless justified. Ask before adding dependencies.
- Semantic HTML, keyboard accessible, WCAG AA contrast, alt text on images.
- Lighthouse target: 95+ on performance and accessibility.
- No secrets or personal phone number in the repo.

## Visual feedback loop (mandatory)
After every meaningful UI change:
1. Run the dev server.
2. Use Playwright MCP to screenshot at 390px (mobile) and 1440px (desktop).
3. Look at the screenshots and critique them honestly: hierarchy, spacing, alignment,
   contrast, anything that looks generic.
4. Fix issues before moving on.
Never say something "looks good" or "is done" without having actually looked at a screenshot.

## Working method
- Work one section at a time (hero → projects → experience → skills → contact → footer).
- After each section: what changed, what you checked, what's left.
- Before finishing: run build, check console errors, test every link and the contact action,
  check both breakpoints, report anything unresolved.
