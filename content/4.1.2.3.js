registerSection({
  id: '4.1.2.3',
  title: 'Stem cells',
  topic: 'Cell division',
  emoji: '🌱',
  biologyOnly: false,
  intro: 'Stem cells are the academy kids of the body: not yet picked for a position, but able to be trained into almost any one. Scouts are hunting for them in early embryos, adults and plant growing tips, so pay attention, because the transfer window is wide open.',
  scenes: [
    {
      title: 'The academy kid',
      commentator: '"Look at this talent! One stem cell, and it can be trained into almost any position on the pitch!"',
      type: 'branch',
      params: {
        centre: { emoji: '🌱', label: 'Stem cell' },
        outcomes: [
          { emoji: '🧠', label: 'Nerve cell', note: 'Carries electrical impulses' },
          { emoji: '💪', label: 'Muscle cell', note: 'Contracts to move the body' },
          { emoji: '🩸', label: 'Blood cell', note: 'Red and white blood cells' },
        ],
      },
      text: 'A <b>stem cell</b> is an <b>undifferentiated</b> cell. Undifferentiated means it has not yet become specialised, so it has not "picked a job" yet. A stem cell can divide to make many more cells, and it can <b>differentiate</b> (become specialised) into cell types such as nerve, muscle and blood cells.',
      keyFact: 'A stem cell is an undifferentiated cell that can divide to make many more cells, and can differentiate into other, specialised cell types.',
    },
    {
      title: 'Embryonic versus adult: two academies',
      commentator: '"Two very different youth set-ups here! One can play almost anywhere, so which one is it?"',
      type: 'versus',
      params: {
        left: { name: 'Embryonic stem cells', emoji: '👶' },
        right: { name: 'Adult bone marrow stem cells', emoji: '🦴' },
        rows: [
          { feature: 'Found in', left: 'Very early embryos', right: 'Adults, in bone marrow' },
          { feature: 'Can form', left: 'Most types of human cell', right: 'Many types, including blood cells' },
          { feature: 'Main job', left: 'Build the body of a developing embryo', right: 'Repair and replace cells' },
        ],
      },
      text: '<b>Embryonic stem cells</b> come from very early embryos and can differentiate into <b>most types</b> of human cell. <b>Adult stem cells</b> are found in adults, for example in <b>bone marrow</b>: the soft tissue inside some bones, where blood cells are made. Adult stem cells can form many types of cell, including blood cells, but the range is more limited.',
      keyFact: 'Embryonic stem cells can differentiate into most types of human cell, whereas adult stem cells from bone marrow can form many types of cell, including blood cells.',
    },
    {
      title: 'Clones: the identical twins of cells',
      commentator: '"Two players with exactly the same boots, shirts and skills. Perfect for a squad of copies!"',
      type: 'commentary',
      params: {
        emoji: ['🧬', '👯', '🔁'],
        lines: [
          'A clone is an organism or cell that is genetically identical to another: it has exactly the same genes.',
          'Cloning means making clones.',
          'Mitosis makes cell clones: the two new cells are genetically identical to the original.',
        ],
      },
      text: 'A <b>clone</b> is an organism or cell that is <b>genetically identical</b> to another, meaning it has exactly the same genes. <b>Cloning</b> means making clones. Mitosis makes cell clones, which is why the two new cells are genetically identical to the original.',
      keyFact: 'A clone is an organism or cell that is genetically identical to another, and cloning means making clones.',
    },
    {
      title: 'Therapeutic cloning: the copy-cat plan',
      commentator: '"Clever thinking from the medical staff! They build a copy of the patient\'s own genes, so the body welcomes the new signing!"',
      type: 'chain',
      params: {
        steps: [
          { emoji: '🧑', label: 'Patient\'s body cell', note: 'Its nucleus holds the patient\'s genes' },
          { emoji: '🥚', label: 'Egg cell', note: 'Its own nucleus is removed first' },
          { emoji: '🔁', label: 'Nucleus inserted', note: 'Gives the egg the patient\'s genes' },
          { emoji: '🧫', label: 'Embryo develops', note: 'Has the same genes as the patient' },
          { emoji: '🧪', label: 'Stem cells taken', note: 'From the embryo, for treatment' },
        ],
      },
      text: '<b>Therapeutic cloning</b> means making an embryo with the same genes as the patient, so its stem cells can be used to treat illness. The body\'s <b>immune system</b> is its defence system against germs. It attacks cells it recognises as <b>foreign</b> (not part of the body), and this attack is called <b>rejection</b>. Cells with the patient\'s own genes are recognised as "home players", so they are not attacked and are not rejected.',
      keyFact: 'In therapeutic cloning, an embryo is produced with the same genes as the patient, so its stem cells are not recognised as foreign by the immune system and are not rejected.',
    },
    {
      title: 'Diabetes and paralysis: the injured stars',
      commentator: '"Two big injury problems on the treatment table! Can the stem cell medics get these players back on the pitch?"',
      type: 'commentary',
      params: {
        emoji: ['🍬', '🦽', '🌟'],
        lines: [
          'Diabetes: the body cannot control the level of sugar (glucose) in the blood properly.',
          'Paralysis: being unable to move part of the body, often because nerves are damaged.',
          'Stem cells might help by replacing damaged cells, though this is still being researched.',
        ],
      },
      text: '<b>Diabetes</b> is a condition where the body cannot control the level of <b>glucose</b> (sugar) in the blood properly. <b>Paralysis</b> means being unable to move part of the body, often because <b>nerves</b> are damaged. Stem cells might help by <b>replacing damaged cells</b>, which could help treat conditions such as these.',
      keyFact: 'Diabetes is a condition where the body cannot control blood glucose levels, and paralysis is being unable to move part of the body, often because nerves are damaged.',
    },
    {
      title: 'Risks and the big debate',
      commentator: '"The referee has to weigh up everything here, from the medical wins to the arguments on the terraces!"',
      type: 'commentary',
      params: {
        emoji: ['🦠', '⚖️', '🙏', '🏁'],
        lines: [
          'Risk: stem cells grown in a lab could carry a virus, a tiny germ that infects cells, and pass it to the patient.',
          'Ethical means to do with whether something is right or wrong.',
          'Objection: embryos are destroyed to collect stem cells, and some people believe an embryo has a right to life. Some religious people object too.',
          'Verdict: the medical benefits, the risks and the ethics all need weighing up.',
        ],
      },
      text: 'Stem cells grown in a lab could carry a <b>virus</b> (a tiny germ that infects cells), which could cause a <b>viral infection</b> in the patient. <b>Ethical</b> means to do with whether something is right or wrong. Some people object because <b>embryos</b> are destroyed to collect the stem cells, and they believe an embryo has a right to life. Some people also have <b>religious objections</b>, based on their beliefs.',
      keyFact: 'Risks of stem cell treatment include transfer of viral infection, and some people have ethical or religious objections because embryos are destroyed to collect stem cells.',
    },
    {
      title: 'Meristems: the academy that never closes',
      commentator: '"The academy at the tip of every root and shoot never shuts! Any position, at any time of the season!"',
      type: 'branch',
      params: {
        centre: { emoji: '🌿', label: 'Meristem cell' },
        outcomes: [
          { emoji: '🌱', label: 'Root hair cell', note: 'Absorbs water and mineral ions' },
          { emoji: '🍃', label: 'Leaf cell', note: 'Makes food by photosynthesis' },
          { emoji: '🌸', label: 'Flower cell', note: 'Helps the plant reproduce' },
        ],
      },
      text: 'A <b>meristem</b> is a tissue at the tips of plant roots and shoots (the growing stems above the ground), where cells keep dividing. Meristem cells can differentiate into <b>any type of plant cell</b>, and they keep doing so throughout the life of the plant.',
      keyFact: 'Meristem tissue, found at the tips of roots and shoots, can differentiate into any type of plant cell throughout the life of the plant.',
    },
    {
      title: 'Cloning plants from meristems',
      commentator: '"Clone the best players! Identical plants, quick and cheap, for the farmers and the rare species fans!"',
      type: 'chain',
      params: {
        steps: [
          { emoji: '🌿', label: 'Meristem tissue', note: 'Taken from the tip of a plant' },
          { emoji: '🧪', label: 'Grown in lab', note: 'Given nutrients, in germ-free conditions' },
          { emoji: '🌱', label: 'New plants form', note: 'Cells differentiate into plant tissue' },
          { emoji: '🌾', label: 'Identical clones', note: 'Genetically identical to the parent' },
          { emoji: '🚜', label: 'Protect and farm', note: 'Rare species saved, resistant crops multiplied' },
        ],
      },
      text: 'Stem cells from <b>meristems</b> can be used to produce <b>clones</b> of plants <b>quickly and cheaply</b>. Clones can protect <b>rare species</b> (plants with very few members left) from <b>extinction</b> (dying out completely). Crop plants with useful features, such as <b>disease resistance</b> (the ability to fight off disease), can also be cloned to give farmers large numbers of identical plants.',
      keyFact: 'Meristem stem cells can be used to produce clones of plants quickly and cheaply, protecting rare species from extinction and giving farmers large numbers of identical, disease-resistant plants.',
    },
  ],
  cards:  [
    {
      q: 'What does "undifferentiated" mean?',
      a: 'Not yet specialised for a particular job',
      options: [
        'Already specialised for one particular job',
        'Found only in the roots of a plant',
        'Unable to divide to make new cells',
      ],
      why: 'Like an academy kid who has not yet been picked for a position.',
    },
    {
      q: 'What is a stem cell?',
      a: 'An undifferentiated cell that can divide and differentiate into other types of cell',
      options: [
        'A cell that has already become specialised for one job',
        'A cell found only in the roots of a plant',
        'A cell that can only make copies of itself and never change',
      ],
      why: 'Stem cells are like academy kids: not yet picked for a position, but able to be trained into one.',
    },
    {
      q: 'What is the name of the process where a stem cell becomes a specialised cell?',
      a: 'Differentiation',
      accept: ['differentiation'],
      options: ['Fertilisation', 'Respiration', 'Mitosis'],
      why: 'It is like an academy kid finally being trained up and picked for a specific position.',
    },
    {
      q: 'What is bone marrow?',
      a: 'The soft tissue inside some bones, where blood cells are made',
      options: [
        'The hard outer layer of a bone',
        'The tough tissue that joins muscles to bones',
        'A thin layer of skin that covers the bones',
      ],
      why: 'The academy\'s training ground, tucked away inside the bones.',
    },
    {
      q: 'Which type of stem cell comes from very early embryos and can form most types of human cell?',
      a: 'Embryonic stem cells',
      accept: ['embryonic'],
      options: ['Adult stem cells', 'Meristem cells', 'Red blood cells'],
      why: 'The under-9s who could become almost anything: the most versatile players in the academy.',
    },
    {
      q: 'What is a clone?',
      a: 'An organism or cell that is genetically identical to another',
      options: [
        'An organism with a different set of genes from its parent',
        'A cell that has become specialised for one job',
        'A cell with only half the chromosomes of its parent',
      ],
      why: 'A clone is a perfect copy of the original player, right down to the genes.',
    },
    {
      q: 'What is therapeutic cloning?',
      a: 'Making an embryo with the patient\'s own genes, so its stem cells can be used to treat illness',
      options: [
        'Making an embryo with completely different genes to the patient',
        'Cutting out damaged cells with a laser',
        'Removing all the blood from a patient\'s body',
      ],
      why: 'It is a copy of the patient\'s own genes: a bit like signing a player who already fits the team\'s kit.',
    },
    {
      q: 'What is rejection?',
      a: 'The immune system attacking cells it recognises as foreign',
      options: [
        'The body growing extra cells it does not need',
        'Stem cells turning into plant cells',
        'Cells dividing too slowly to repair the body',
      ],
      why: 'The defence tackles a player who is not part of the team.',
    },
    {
      q: 'Why are stem cells from a therapeutic clone not rejected by the patient\'s body?',
      a: 'They have the patient\'s own genes, so the immune system does not attack them',
      options: [
        'They are coated in a special protective wax',
        'They are made from plant meristem cells',
        'They are much bigger than the patient\'s own cells',
      ],
      why: 'Same shirt as the home side, so the defence lets them straight through.',
    },
    {
      q: 'Which condition is when the body cannot control the level of glucose (sugar) in the blood properly?',
      a: 'Diabetes',
      accept: ['diabetes'],
      options: [
        'A condition where the body makes too many red blood cells',
        'A condition caused by damaged nerves in the legs',
        'A condition where the body cannot see clearly',
      ],
      why: 'Like a midfield that cannot control possession, the blood sugar runs out of control.',
    },
    {
      q: 'Which condition means being unable to move part of the body, often because nerves are damaged?',
      a: 'Paralysis',
      accept: ['paralysis'],
      options: [
        'Having too much sugar in the blood',
        'Having too many red blood cells',
        'Being unable to hear clearly',
      ],
      why: 'The signals from the manager cannot reach the legs, so the player cannot move.',
    },
    {
      q: 'Give one risk of using stem cells grown in a lab for treatment.',
      a: 'They could carry a virus that infects the patient',
      accept: ['viral', 'virus'],
      options: [
        'Patients develop perfect eyesight',
        'The stem cells turn into plant cells',
        'The patient grows taller than normal',
      ],
      why: 'A virus is a dodgy tackle that can sneak into the team and spread.',
    },
    {
      q: 'What does "ethical" mean?',
      a: 'To do with whether something is right or wrong',
      options: [
        'To do with how fast a cell divides',
        'To do with how much a cell weighs',
        'To do with which plants grow in a field',
      ],
      why: 'The referee has to decide what is right and fair, not just what is possible.',
    },
    {
      q: 'Why do some people object to using embryonic stem cells?',
      a: 'Embryos are destroyed to collect the stem cells, and they believe an embryo has a right to life',
      options: [
        'They think stem cells make people taller',
        'They say stem cells are only found in plants',
        'They believe stem cells cannot divide',
      ],
      why: 'It is a big debate on the terraces, and ethical and religious views are part of it.',
    },
    {
      q: 'Where in a plant are meristems found?',
      a: 'At the tips of roots and shoots',
      options: [
        'In the middle of the leaves only',
        'Inside the seeds only',
        'In the petals of the flower only',
      ],
      why: 'Meristems are the plant\'s academy, sitting at the growing tips.',
    },
    {
      q: 'What is the name of the plant tissue at the tips of roots and shoots that keeps dividing and can become any plant cell?',
      a: 'Meristem',
      accept: ['meristem'],
      options: ['Xylem', 'Phloem', 'Root hair'],
      why: 'The academy at the tip of every root and shoot.',
    },
    {
      q: 'Why can cloning plants from meristems be useful to farmers?',
      a: 'It produces large numbers of identical plants quickly and cheaply',
      options: [
        'It takes many years and costs a fortune for each plant',
        'It only produces one plant at a time',
        'It produces plants that are all different from each other',
      ],
      why: 'It is like building a whole squad of identical players from one academy star in no time.',
    },
    {
      q: 'What is the main job of stem cells in adult animals?',
      a: 'To repair and replace damaged or worn-out cells',
      accept: ['repair'],
      options: [
        'To pump blood around the body',
        'To produce seeds for reproduction',
        'To make new cells for a new embryo only',
      ],
      why: 'Adult stem cells are the reserve team, ready to step in when a first-team player gets injured.',
    },
    {
      "q": "What is the job of stem cells in an embryo?",
      "a": "To divide and differentiate into all the different cells the body needs",
      "options": [
        "To repair a cut in the skin",
        "To carry oxygen around the body",
        "To make the cell walls of plant cells"
      ],
      "why": "Embryonic stem cells are the under-9s: they become every position the body needs as it develops."
    },
    {
      "q": "Name one condition that stem cell treatment may be able to help.",
      "a": "Diabetes or paralysis",
      "options": [
        "A broken fingernail",
        "Short-sightedness from screens",
        "A common cold"
      ],
      "accept": [
        "diabetes",
        "paralysis"
      ],
      "why": "Stem cells could replace the damaged cells, such as nerve cells in paralysis."
    },
    {
      "q": "How can cloning plants from meristems help a rare plant species?",
      "a": "It makes lots of identical copies, protecting the species from extinction",
      "options": [
        "It makes the plants grow in the sea",
        "It changes all the plants into a new species",
        "It stops the plants from ever flowering"
      ],
      "why": "More copies of a rare plant means it is much less likely to die out completely."
    },
  ],
});
