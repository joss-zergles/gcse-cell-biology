# ⚽ Cell Biology FC

A revision site for **AQA GCSE Biology (8461) — 4.1 Cell biology**. Each spec sub-section is taught with
animated scenes built on silly football metaphors, then drilled with flashcards until it sticks.

## How the training works

- **Lesson** — 5–6 animated scenes per section, each with the real biology and an exam key fact.
- **Training ground** — every card must be answered correctly **three times** (multiple choice, then
  recall twice, spaced apart). Wrong answers knock a card back. All cards mastered → the next section unlocks.
- **Daily training** — mastered cards come back after 1, 3, 7, 14, 30 and 60 days (Leitner boxes).
  Miss one and it drops back to tomorrow.

Progress is stored in the browser (localStorage). Use ⚙️ → *Move progress to another device* to copy it across.
⚙️ also has "unlock every section" for skipping the gate.

## Editing content

Each section is one file in `content/` (e.g. `content/4.1.3.2.js`). The format and the 12 animation types are
documented in [CONTENT_GUIDE.md](CONTENT_GUIDE.md). Check changes with:

```bash
node tools/validate.js
```

No build step — it's plain HTML/CSS/JS served by GitHub Pages.
