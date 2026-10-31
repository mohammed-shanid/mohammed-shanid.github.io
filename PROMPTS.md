# Prompts for Claude Code — Portfolio Build

Use these in order. Paste one, let it finish, review, then move to the next.

---

## 0. Design interview (if you haven't filled in "Design identity" in CLAUDE.md)

```
I want an original design, not based on any existing site. Interview me to build
my design identity. Ask me one question at a time (max 10 questions) about my taste,
personality, things I like visually outside of websites, colors, mood, and how I want
recruiters to feel about me. Offer 3–4 example answers with each question so it's easy
to reply. When done, write my answers into the "Design identity" section of CLAUDE.md
and summarize my design personality in 3 sentences.
```

---

## 1. Kickoff — understand before designing

```
Read CLAUDE.md, my resume in content/, and the project list in content/projects.md.

Don't write any code yet. Give me:
1. My 3–5 strongest selling points for junior Cloud/DevOps roles, based only on what's
   in these files.
2. Any claims or details that are missing or need my confirmation.
3. The site structure (sections, in order) and what each section must prove to a recruiter.
```

---

## 2. Design directions

```
Propose three genuinely different visual directions for this portfolio. For each:
- a name and one-line concept
- typefaces (heading + body) and why
- color palette (hex values, light and dark mode)
- layout approach and density
- one thing that makes it memorable
- its weakness

Then recommend one, judged on recruiter readability, technical credibility and
distinctiveness. Base every choice on my Design identity in CLAUDE.md, and make sure
none of the three looks like a standard portfolio template. Avoid everything in the
"Banned" list.

Then build a quick, rough preview of just the hero section for each direction at
/preview/a, /preview/b and /preview/c, screenshot them with Playwright at 1440px and
390px, and show me. These are my references now — I'll pick one (or mix parts).
Wait for my choice before building anything else.
```

---

## 3. Design system first

```
We're going with direction [X], with these changes: [your tweaks].

Create the design tokens file and a single /styleguide page showing: the type scale,
color swatches (light + dark), spacing scale, buttons, links, a project card and a tag/badge.
Screenshot the styleguide at 390px and 1440px with Playwright, critique it, fix it,
then show me the screenshots.
```

---

## 4. Build one section at a time

```
Build the [hero / projects / experience / skills / contact] section using only the
design tokens. Use real content from my resume — no placeholder text, no invented metrics.

When done, screenshot it at 390px and 1440px, critique it like a senior designer
reviewing a junior's work (be harsh), fix the top 3 issues, and show me before/after.
```

---

## 5. Giving feedback (template)

Specific feedback gets specific fixes. Fill in the blanks instead of saying "make it better":

```
Feedback on the [section]:
- [element] is too [big/small/loud/faint] compared to [other element]
- spacing between [A] and [B] feels [cramped/loose] — adjust
- [thing] looks generic / template-like — give me 2 alternatives
- keep: [what you like]
Re-screenshot after changes.
```

---

## 6. Anti-generic pass

```
Look at the full page screenshots. List every element that looks like a generic
AI-generated portfolio or a template. For each, propose a more intentional alternative
that fits our design direction. Apply the ones I approve.
```

---

## 7. Final QA

```
Run a full QA pass:
1. Production build — fix any errors or warnings.
2. Playwright: screenshot every section at 390px, 768px and 1440px; check light and dark mode.
3. Click every link and button; confirm external links open correctly and the contact
   action works.
4. Check the browser console for errors.
5. Accessibility: keyboard navigation, focus states, contrast, alt text, heading order.
6. Run Lighthouse if available and report the scores.
Fix what you can, then give me a short list of anything unresolved. Don't claim
anything passed unless you actually ran it.
```

---

## Folder setup before you start

```
portfolio/
├── CLAUDE.md
├── PROMPTS.md
├── content/
│   ├── resume.pdf
│   └── projects.md          ← each project: name, repo link, what it does, stack, status
```

No reference screenshots needed: the Design identity in CLAUDE.md (or prompt 0)
gives Claude your taste, and the hero previews in prompt 2 become your references.
