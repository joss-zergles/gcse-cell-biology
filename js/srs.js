/* Progress store + spaced repetition.
   Learning (per section): every card must be answered correctly 3 times in a row of stages:
     stage 0 = multiple choice, stage 1 = recall, stage 2 = recall again later  → graduated.
   Reviews (after graduation): Leitner boxes with growing gaps between reviews. */
(function () {
  'use strict';
  const KEY = 'cellbio.v1';
  const DAY = 24 * 60 * 60 * 1000;
  const INTERVALS = [0, 1, 3, 7, 14, 30, 60]; // days, indexed by box
  const GRADUATE_STAGE = 3;

  function blank() {
    return { cards: {}, mastered: {}, goals: 0, streak: { count: 0, last: null }, settings: { unlockAll: false } };
  }
  let data = blank();
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) data = Object.assign(blank(), JSON.parse(raw));
  } catch (e) { /* private mode etc. — work in memory */ }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { /* ignore */ }
  }
  const today = () => new Date().toISOString().slice(0, 10);
  const startOfToday = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d.getTime(); };

  function card(id) {
    if (!data.cards[id]) data.cards[id] = { stage: 0, box: 0, due: 0, right: 0, wrong: 0 };
    return data.cards[id];
  }

  function touchStreak() {
    const t = today();
    if (data.streak.last === t) return;
    const y = new Date(Date.now() - DAY).toISOString().slice(0, 10);
    data.streak.count = data.streak.last === y ? data.streak.count + 1 : 1;
    data.streak.last = t;
  }

  window.SRS = {
    DAY, GRADUATE_STAGE,
    get data() { return data; },
    save,
    card,
    isGraduated(id) { const c = data.cards[id]; return !!c && c.stage >= GRADUATE_STAGE; },
    isDue(id) {
      const c = data.cards[id];
      return !!c && c.stage >= GRADUATE_STAGE && c.due <= Date.now();
    },
    // learning-phase answer; returns the card's new stage
    learn(id, correct) {
      const c = card(id);
      touchStreak();
      if (correct) {
        c.right++; data.goals++;
        c.stage = Math.min(GRADUATE_STAGE, c.stage + 1);
        if (c.stage === GRADUATE_STAGE) { c.box = 1; c.due = startOfToday() + INTERVALS[1] * DAY; }
      } else {
        c.wrong++;
        c.stage = c.stage >= 2 ? 1 : 0;
      }
      save();
      return c.stage;
    },
    // review answer: grade 0 = missed, 1 = nearly, 2 = nailed it
    review(id, grade) {
      const c = card(id);
      touchStreak();
      if (grade === 2) { c.right++; data.goals++; c.box = Math.min(INTERVALS.length - 1, c.box + 1); }
      else if (grade === 0) { c.wrong++; c.box = 1; }
      c.due = startOfToday() + INTERVALS[Math.max(1, c.box)] * DAY;
      save();
      return c.box;
    },
    markMastered(sectionId) { if (!data.mastered[sectionId]) { data.mastered[sectionId] = today(); save(); } },
    exportCode() { return btoa(unescape(encodeURIComponent(JSON.stringify(data)))); },
    importCode(code) {
      const parsed = JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
      if (!parsed || typeof parsed.cards !== 'object') throw new Error('Not a progress code');
      data = Object.assign(blank(), parsed); save();
    },
    reset() { data = blank(); save(); },
  };
})();
