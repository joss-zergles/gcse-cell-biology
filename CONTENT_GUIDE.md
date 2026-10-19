# Content guide — "Cell Biology FC"

A revision site for a 15-year-old revising **AQA GCSE Biology (8461), section 4.1 Cell biology**.
Every idea is taught with **silly football metaphors** (the cell is a club, organelles are players,
the nucleus is the manager, diffusion is fans spreading out of a packed stand, etc.), then drilled
with flashcards until it sticks.

Each spec sub-section lives in its own file: `content/<id>.js`, e.g. `content/4.1.1.1.js`.

## Accuracy rules (most important)

- The biology must be **exactly right for AQA GCSE** — use the spec's own vocabulary
  (e.g. "partially permeable membrane", "dilute solution", "concentration gradient", "sub-cellular structures").
- The football metaphor is the hook; the **`text` and `keyFact` must still state the real biology plainly**,
  so he could write it in an exam. Never let a metaphor replace or blur the correct term.
- Don't go beyond GCSE (no phases of mitosis names like prophase — the spec says they're not needed;
  no 80S/70S ribosomes, etc.).
- British spelling (organise, colour, fibre, centimetre). Numbers/units correct (µm, nm, mm).

## Tone

Fun, cheeky, Match-of-the-Day commentator energy, aimed at a football-mad 15-year-old. Short sentences.
Puns welcome. No real players' or clubs' names (keep it to invented ones like "Mitochondria Rovers",
"Real Nucleus", "Osmosis Athletic"). Keep it kind — no swearing, no insults.

## File format

The file must be plain JavaScript that calls `registerSection({...})` exactly once. No imports, no other code.

```js
registerSection({
  id: '4.1.3.1',                       // spec number, as a string
  title: 'Diffusion',                  // spec title
  topic: 'Transport in cells',         // one of: 'Cell structure', 'Cell division', 'Transport in cells'
  emoji: '🏃',                          // one emoji for the fixtures list
  biologyOnly: false,                  // true only for 4.1.1.6
  intro: 'One or two punchy sentences: the football hook for the whole section.',
  scenes: [ /* 4–6 scenes, see below */ ],
  cards:  [ /* 12–18 flashcards, see below */ ],
});
```

### Scenes

Each scene is one animated "slide":

```js
{
  title: 'Fans leaving a packed stand',          // short
  commentator: '"And they\'re streaming out of the away end!" — 1 or 2 sentences of commentary in quotes.',
  type: 'flow',                                   // one of the 12 animation types below
  params: { ... },                                // depends on type — PLAIN TEXT only, keep labels short
  text: 'The real biology explanation, 2–4 sentences. May use <b>bold</b>, <i>, <sub>, <sup>.',
  keyFact: 'One exam-ready sentence he should be able to write word for word.',
}
```

Use a **variety** of animation types across a section, and pick the one that actually shows the idea.
Labels inside params appear on a small stage, so keep them **short** (labels ≤ 3 words, roles/notes/details ≤ ~14 words).

#### Animation types and their params

1. **`squad`** — a cell drawn as a pitch; parts "join the squad" one by one, with their role listed alongside.
   ```js
   { cellType: 'animal' | 'plant' | 'bacteria',
     parts: [ { emoji: '🧠', label: 'Nucleus', role: 'the manager — holds the genetic material that controls the cell' } ] } // 2–8 parts
   ```
2. **`versus`** — head-to-head comparison table (✅/❌ for true/false, or short text).
   ```js
   { left: { name: 'Eukaryotes', emoji: '🏟️' }, right: { name: 'Prokaryotes', emoji: '⚽' },
     rows: [ { feature: 'Nucleus', left: true, right: false }, { feature: 'Size', left: '10–100 µm', right: '0.1–5 µm' } ] } // 2–7 rows
   ```
3. **`flow`** — live particle animation across a membrane in the middle of the stage. Left half vs right half.
   - `mode: 'diffusion'` — particles start packed on the LEFT and spread to the right (net movement high → low). Membrane has pores.
   - `mode: 'osmosis'` — water 💧 on both sides, big solute particles 🍬 stuck on the RIGHT (can't pass); net water movement left → right
     (from the dilute side on the left to the concentrated side on the right).
   - `mode: 'active'` — few particles LEFT, lots RIGHT; a 🧤 pump grabs particles from the left and pushes them right
     using ⚡ energy (low → high, against the gradient).
   ```js
   { mode: 'diffusion', particle: '⚽', particleName: 'oxygen', leftLabel: 'High concentration', rightLabel: 'Low concentration',
     membraneLabel: 'cell membrane', solute: '🍬' /* osmosis only */, captions: ['caption 1', 'caption 2', 'caption 3'] } // captions rotate every 4.5 s
   ```
   Make the labels match the mode (for osmosis: left = 'Dilute solution (lots of water)', right = 'Concentrated solution').
4. **`split`** — animated cell division.
   - `kind: 'mitosis'` has **6 stages**: (0) one cell with chromosomes, (1) cell grows / organelles copied, (2) DNA/chromosomes copied,
     (3) chromosome copies line up in the middle, (4) pulled to opposite ends, (5) cytoplasm and membrane divide → two identical cells.
   - `kind: 'binary'` (bacteria) has **4 stages**: (0) one bacterium with circular DNA loop + plasmids, (1) it grows,
     (2) DNA loop and plasmids copied, (3) splits into two identical bacteria.
   ```js
   { kind: 'mitosis', steps: ['one caption per stage, in order — exactly 6 for mitosis, 4 for binary'] }
   ```
5. **`cycle`** — stages around a circle, a ball travels round; each stage's detail shows in turn.
   ```js
   { stages: [ { label: 'Growth', detail: 'what happens in this stage, ≤ 20 words' } ] } // 2–6 stages
   ```
6. **`ladder`** — true-scale size comparison: neighbouring items (auto-sorted biggest → smallest) are drawn side by side at their REAL relative size, then the view zooms into the smaller one; a powers-of-ten ruler shows where every item sits. Ratios and orders of magnitude are calculated automatically.
   ```js
   { items: [ { emoji: '🏟️', label: 'Football pitch', size: '100 m', metres: 100 }, { emoji: '🦠', label: 'Bacterium', size: '1 µm', metres: 1e-6 } ] } // 3–7 items, metres MUST be correct
   ```
7. **`triangle`** — formula triangle. Means **top = left × right**, left = top ÷ right, right = top ÷ left (all generated automatically).
   ```js
   { top: 'Image size', left: 'Real size', right: 'Magnification', examples: ['worked example line 1', 'line 2', 'line 3'] } // ≤ 4 example lines
   ```
8. **`branch`** — one thing branching out into several (stem cell → specialised cells, academy → positions).
   ```js
   { centre: { emoji: '🌱', label: 'Stem cell' }, outcomes: [ { emoji: '🩸', label: 'Blood cell', note: 'optional ≤ 6 words' } ] } // 2–6 outcomes
   ```
9. **`chain`** — a sequence of steps with arrows (cell → tissue → organ…, or method steps).
   ```js
   { steps: [ { emoji: '🧫', label: 'Cell', note: 'optional ≤ 8 words' } ] } // 2–7 steps
   ```
10. **`growth`** — bacteria doubling bar chart; does the maths for you and shows `start × 2ⁿ`.
    ```js
    { start: 1, divisionMinutes: 20, totalMinutes: 120, label: 'bacteria' } // at most 10 divisions shown
    ```
11. **`cubes`** — surface area : volume for cubes; calculates SA, volume and ratio automatically.
    ```js
    { sizes: [1, 2, 4], unit: 'cm' } // 2–4 sizes
    ```
12. **`commentary`** — bouncing emoji + commentator lines appearing one by one. Use for ideas that don't fit the others (ethics, history of microscopes…).
    ```js
    { emoji: ['🔬', '⚽', '🎉'], lines: ['line 1', 'line 2', 'line 3'] } // up to 6 emoji, 2–5 lines
    ```

### Cards (flashcards)

He meets each card **three times** before it's mastered: first as multiple choice, then twice as free recall.
After that it comes back in spaced-repetition reviews over the following days/weeks.

```js
{
  q: 'What is the function of the mitochondria?',
  a: 'Site of aerobic respiration — releases energy for the cell',   // the correct answer, ≤ 15 words
  options: ['Site of protein synthesis', 'Controls the activities of the cell', 'Where photosynthesis happens'], // EXACTLY 3 wrong answers, similar length/style to `a`, plausible but clearly wrong
  accept: ['respiration'],      // OPTIONAL: if present, he TYPES his answer and it's marked right if it contains any of these
                                // (case-insensitive, small typos forgiven). Use only when the answer is one key word/number
                                // (e.g. 'osmosis', 'ribosomes', '1000', 'mitosis'). Otherwise omit, and he self-marks a flip card.
  why: 'One short sentence explaining WHY — can use a football metaphor to make it memorable.',
}
```

Card rules:
- Cover **every** statement in the spec for the section, including the "students should be able to" skills and any calculations
  (give calculation cards with real numbers, e.g. "Image 5 mm, magnification ×100 — real size in µm?").
- Questions must make sense on their own (no "as in the scene above").
- Mix: definitions, functions, comparisons, "explain why", and calculations. Roughly a third should have `accept`.
- Distractors must be **wrong**, not just less complete.
- Escape apostrophes inside single-quoted strings (`'it\'s'`) or use double quotes / backticks.

When done, check the file is valid JS: `node -e "global.registerSection=s=>console.log(s.id, s.scenes.length, s.cards.length); require('./content/<id>.js')"`
