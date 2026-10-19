registerSection({
  id: '4.1.1.2',
  title: 'Animal and plant cells',
  topic: 'Cell structure',
  emoji: '🌿',
  biologyOnly: false,
  intro: 'Every cell is a club with a squad, but animal and plant cells pick different teams. Let\'s see who plays where, and who needs a bigger pitch!',
  scenes: [
    {
      title: 'The animal cell squad',
      commentator: '"Here come the starting XI, and every single one of them is needed!" — the nucleus is the manager, and the rest keep the cell ticking over.',
      type: 'squad',
      params: {
        cellType: 'animal',
        parts: [
          { emoji: '🧠', label: 'Nucleus', role: 'the manager: contains genetic material that controls the activities of the cell' },
          { emoji: '🧪', label: 'Cytoplasm', role: 'the gel-like pitch where most chemical reactions happen, full of enzymes' },
          { emoji: '🧤', label: 'Cell membrane', role: 'the gatekeeper: controls what moves in and out of the cell' },
          { emoji: '⚡', label: 'Mitochondria', role: 'the engine room: where aerobic respiration releases energy' },
          { emoji: '🏗️', label: 'Ribosomes', role: 'the builders: where proteins are built (protein synthesis)' },
        ],
      },
      text: 'Most <b>animal cells</b> have a <b>nucleus</b>, <b>cytoplasm</b>, <b>cell membrane</b>, <b>mitochondria</b> and <b>ribosomes</b>. The <b>mitochondria</b> are where <b>aerobic respiration</b> releases energy, and <b>ribosomes</b> are where <b>proteins</b> are built, which is called <b>protein synthesis</b>. Don\'t worry about the big words yet, because the jargon buster is next!',
      keyFact: 'The nucleus contains genetic material that controls the activities of the cell, and the mitochondria are where aerobic respiration takes place.',
    },
    {
      title: 'Jargon buster',
      commentator: '"Hold on, ref, we need a jargon buster before the next bit!" — here are the words you will see from now on, in plain English.',
      type: 'commentary',
      params: {
        emoji: ['📖', '🧬', '⚡', '🍬', '🫁'],
        lines: [
          'Protein: a large molecule cells use to build their structures and do their jobs.',
          'Enzyme: a protein that speeds up chemical reactions. Protein synthesis: building proteins.',
          'Glucose: a sugar that cells use as fuel for energy.',
          'Respiration: a chemical reaction in cells that releases energy from glucose. It is NOT breathing!',
          'Aerobic: using oxygen. So aerobic respiration releases energy from glucose using oxygen.',
        ],
      },
      text: 'A <b>protein</b> is a large molecule (a big chemical made of many smaller parts) that cells use to build their structures and do their jobs. An <b>enzyme</b> is a protein that speeds up chemical reactions, and <b>protein synthesis</b> means building proteins. <b>Respiration</b> is a chemical reaction that releases energy from <b>glucose</b>, a sugar used as fuel. It is <b>not breathing</b>, and <b>aerobic</b> just means it needs oxygen.',
      keyFact: 'Respiration is a chemical reaction that releases energy from glucose; it is not breathing, and aerobic respiration uses oxygen.',
    },
    {
      title: 'The extra plant cell players',
      commentator: '"And the plant cell brings on three extra subs, and they are game-changers!" — these are the bits that make plant cells different.',
      type: 'squad',
      params: {
        cellType: 'plant',
        parts: [
          { emoji: '☀️', label: 'Chloroplasts', role: 'the solar panels: contain chlorophyll, which absorbs light for photosynthesis' },
          { emoji: '💧', label: 'Permanent vacuole', role: 'filled with cell sap, keeps the cell firm and rigid' },
          { emoji: '🧱', label: 'Cell wall', role: 'the stadium wall: made of tough cellulose, which strengthens the cell' },
        ],
      },
      text: 'In addition to the animal cell parts, <b>plant cells</b> often have <b>chloroplasts</b>, a <b>permanent vacuole</b> and a <b>cell wall</b>. Chloroplasts contain <b>chlorophyll</b>, the green substance that absorbs light, which powers <b>photosynthesis</b>: plants using light energy to make glucose (their food) from carbon dioxide and water. The vacuole is filled with <b>cell sap</b>, a watery liquid with sugars and salts dissolved in it, and the wall is made of <b>cellulose</b>, a tough fibre. Together they keep the cell <b>rigid</b>, which means firm and holding its shape. <b>Algae</b> are simple plant-like organisms, such as seaweed or the green stuff in ponds, and their cells also have a cellulose cell wall and chloroplasts.',
      keyFact: 'Plant cells often have chloroplasts, which contain chlorophyll and absorb light for photosynthesis, and a cell wall made of cellulose that strengthens the cell.',
    },
    {
      title: 'Animal vs plant: head to head',
      commentator: '"It\'s a proper derby, and the plant cell has more tricks up its sleeve!" — same nucleus, same membrane, different extras.',
      type: 'versus',
      params: {
        left: { name: 'Animal cell', emoji: '🐾' },
        right: { name: 'Plant cell', emoji: '🌳' },
        rows: [
          { feature: 'Nucleus', left: true, right: true },
          { feature: 'Cell membrane', left: true, right: true },
          { feature: 'Mitochondria', left: true, right: true },
          { feature: 'Cell wall (cellulose)', left: false, right: true },
          { feature: 'Chloroplasts', left: false, right: true },
          { feature: 'Permanent vacuole', left: false, right: true },
          { feature: 'Cell size', left: '10–30 µm', right: '10–100 µm' },
        ],
      },
      text: 'Animal and plant cells share the <b>nucleus</b>, <b>cell membrane</b> and <b>mitochondria</b>. Only plant cells have a <b>cell wall</b>, <b>chloroplasts</b> and a <b>permanent vacuole</b>. Sizes are typical values, so treat them as rough figures.',
      keyFact: 'Plant cells have a cell wall, chloroplasts and a permanent vacuole that animal cells do not have, while both share a nucleus, cell membrane and mitochondria.',
    },
    {
      title: 'Estimating the size of the pitch',
      commentator: '"Look at the scale on that ladder, everything from a full pitch down to a tiny bacterium!" — from a whole pitch down to cells is a gigantic drop, then each cell part is a smaller step down.',
      type: 'ladder',
      params: {
        items: [
          { emoji: '🏟️', label: 'Football pitch', size: '100 m', metres: 100 },
          { emoji: '🌿', label: 'Plant cell', size: '50 µm', metres: 5e-5 },
          { emoji: '🐾', label: 'Animal cell', size: '20 µm', metres: 2e-5 },
          { emoji: '☀️', label: 'Chloroplast', size: '5 µm', metres: 5e-6 },
          { emoji: '🦠', label: 'Bacterium', size: '1 µm', metres: 1e-6 },
        ],
      },
      text: 'An <b>estimate</b> is a sensible rough answer. We use <b>estimations</b> to judge the relative size or area of sub-cellular structures when an exact measurement is not needed. A chloroplast is roughly a tenth the length of a plant cell, so an estimate gets you the right answer quickly.',
      keyFact: 'Estimations let you judge the relative size or area of sub-cellular structures quickly when exact measurements are not needed.',
    },
    {
      title: 'Magnification: the big idea',
      commentator: '"Time for a bit of maths, and it\'s simple as a backheel: image size = real size × magnification!" — you just need to shuffle the numbers around.',
      type: 'triangle',
      params: {
        top: 'Image size',
        left: 'Real size',
        right: 'Magnification',
        examples: [
          'Image 5 mm = 5000 µm (× 1000)',
          'Magnification ×100',
          'Real size = 5000 ÷ 100 = 50 µm',
        ],
      },
      text: '<b>Magnification</b> is how many times bigger the image is than the real object. The <b>image size</b> is how big the cell looks in your drawing or photo, and the <b>real size</b> is how big the cell actually is. The full formula is covered in Microscopy, but the basic version is <b>image size = real size × magnification</b>. Rearrange it to get the real size: <b>real size = image size ÷ magnification</b>. Convert to µm before you divide, because cells are measured in µm.',
      keyFact: 'Real size = image size ÷ magnification, and you must use the same units throughout.',
    },
    {
      title: 'Know your microscope',
      commentator: '"The kit bag is open, and every piece of the microscope has a job!" — learn the names before you pick up the ball.',
      type: 'branch',
      params: {
        centre: { emoji: '🔬', label: 'Light microscope' },
        outcomes: [
          { emoji: '👀', label: 'Eyepiece lens', note: 'the lens you look through' },
          { emoji: '🔭', label: 'Objective lenses', note: 'near the slide, several powers' },
          { emoji: '🧫', label: 'Stage', note: 'where the slide sits' },
          { emoji: '💡', label: 'Light', note: 'shines up through the specimen' },
          { emoji: '🎚️', label: 'Coarse focus', note: 'big adjustments' },
          { emoji: '🔍', label: 'Fine focus', note: 'small adjustments to sharpen the image' },
        ],
      },
      text: 'The <b>specimen</b> is the thing you are looking at. It sits on a thin glass plate called a <b>slide</b>, which sits on the <b>stage</b>, and <b>light</b> shines up through it. A <b>coverslip</b> is a very thin glass square laid on top. A <b>stain</b> is a dye that colours parts of the cell so you can see them, and an <b>onion epidermis</b> is the thin, see-through skin layer of an onion. Use the <b>coarse focus</b> for big adjustments and the <b>fine focus</b> for small ones.',
      keyFact: 'You look through the eyepiece lens, the objective lenses sit near the slide, and you sharpen the image with the fine focus after the coarse focus.',
    },
    {
      title: 'Required practical: the microscope drill',
      commentator: '"Right, it\'s the required practical, and the steps have to be done in order to keep the cells looking good!" — follow the sequence and the picture will be spot on.',
      type: 'chain',
      params: {
        steps: [
          { emoji: '🧫', label: 'Put specimen on slide', note: 'onion epidermis or cheek cells' },
          { emoji: '🧪', label: 'Add stain', note: 'iodine for onion, methylene blue for cheek cells' },
          { emoji: '📏', label: 'Lower coverslip at an angle', note: 'stops air bubbles getting trapped' },
          { emoji: '🔭', label: 'Lowest-power objective', note: 'always start on the lowest power' },
          { emoji: '🎯', label: 'Coarse then fine focus', note: 'coarse first, then fine to sharpen the image' },
          { emoji: '✏️', label: 'Draw and label', note: 'sharp pencil, no shading, label lines with a ruler' },
        ],
      },
      text: 'In the <b>required practical</b>, you use a <b>light microscope</b> to observe, draw and label plant and animal cells. Use the <b>magnification</b> to work out the real size of what you have drawn.',
      keyFact: 'Lower the coverslip at an angle to avoid air bubbles, start on the lowest-power objective, focus with the coarse then fine knob, and draw with a sharp pencil and no shading.',
    },
  ],
  cards: [
    {
      q: 'What is the function of the nucleus?',
      a: 'Contains genetic material that controls the activities of the cell',
      options: ['Site of aerobic respiration', 'Where most chemical reactions happen', 'Absorbs light for photosynthesis'],
      why: 'The nucleus is the manager: it runs the whole squad from the middle of the pitch.',
    },
    {
      q: 'What is the function of the cell membrane?',
      a: 'Controls the movement of substances in and out of the cell',
      options: ['Contains genetic material', 'Where protein synthesis occurs', 'Keeps the cell rigid and supports it'],
      why: 'The cell membrane is the goalkeeper: it decides what gets in and what gets out.',
    },
    {
      q: 'Which part of the cell is the site of aerobic respiration?',
      a: 'Mitochondria',
      options: ['Ribosomes', 'Chloroplasts', 'Permanent vacuole'],
      accept: ['mitochondria', 'mitochondrion'],
      why: 'Mitochondria are the engine room, burning fuel to release energy for the squad.',
    },
    {
      q: 'Where does protein synthesis occur in a cell?',
      a: 'Ribosomes',
      options: ['Cell membrane', 'Permanent vacuole', 'Cell wall'],
      accept: ['ribosomes', 'ribosome'],
      why: 'Ribosomes are the builders, putting proteins together like a club building a new stadium.',
    },
    {
      q: 'What do chloroplasts contain, and what do they absorb light for?',
      a: 'Chlorophyll, which absorbs light for photosynthesis',
      options: ['Cellulose, which strengthens the cell', 'Genetic material, which controls the cell', 'Cell sap, which keeps the cell rigid'],
      accept: ['chlorophyll'],
      why: 'Chloroplasts are the solar panels of the plant cell, soaking up light to power photosynthesis.',
    },
    {
      q: 'What does the permanent vacuole contain, and what does it do?',
      a: 'Cell sap, which keeps the cell rigid and supports it',
      options: ['Chlorophyll, which absorbs light', 'Genetic material, which controls the cell', 'Enzymes, which speed up reactions'],
      accept: ['cell sap'],
      why: 'The vacuole fills up with cell sap like a full water bottle, pushing the cell firm.',
    },
    {
      q: 'What is the cell wall made of, and what does it do?',
      a: 'Cellulose, which strengthens the cell',
      options: ['Chlorophyll, which strengthens the cell', 'Protein, which controls movement', 'Cell sap, which absorbs light'],
      accept: ['cellulose'],
      why: 'The cell wall is the stadium wall: tough cellulose that stops the cell bursting.',
    },
    {
      q: 'Name two structures that algal cells have and animal cells do not.',
      a: 'A cell wall made of cellulose, and chloroplasts',
      options: ['A nucleus and a cell membrane', 'Mitochondria and ribosomes', 'Cytoplasm and enzymes'],
      why: 'Algal cells are plant-like teams: they share the cellulose wall and chloroplasts with plant cells.',
    },
    {
      q: 'What is the name of the small loop of extra DNA found in bacterial cells?',
      a: 'A plasmid',
      options: ['A chloroplast', 'A ribosome', 'A vacuole'],
      accept: ['plasmid', 'plasmids'],
      why: 'Plasmids are the bacteria\'s spare kit: small extra loops of DNA, separate from the main DNA loop.',
    },
    {
      q: 'An image is 5 mm wide and the magnification is ×100. What is the real size in µm?',
      a: '50 µm',
      options: ['500 µm', '0.5 µm', '5000 µm'],
      accept: ['50'],
      why: 'Image 5 mm = 5000 µm, then 5000 ÷ 100 = 50 µm. Always convert to µm before you divide.',
    },
    {
      q: 'Why do you use an estimation to judge the relative size of sub-cellular structures?',
      a: 'It quickly compares sizes when an exact measurement is not needed',
      options: ['It gives the exact size to the nearest nanometre', 'It replaces the need for a microscope', 'It shows the real magnification of the image'],
      why: 'Estimating is like judging a tackle at a glance: fast, and good enough when you do not need the exact figure.',
    },
    {
      q: 'Why do you lower the coverslip at an angle onto the specimen?',
      a: 'To avoid trapping air bubbles under the coverslip',
      options: ['To make the cells stick to the slide', 'To stop the stain from drying', 'To make the image bigger'],
      why: 'Air bubbles spoil the view, so tilt the coverslip like a careful defender stepping in.',
    },
    {
      q: 'What is respiration?',
      a: 'A chemical reaction in cells that releases energy from glucose',
      options: ['Breathing air in and out of the lungs', 'A chemical reaction that makes glucose from light', 'A process that builds new cell walls from cellulose'],
      why: 'Respiration is the engine room burning glucose for energy. It is NOT breathing, which only moves air in and out of your lungs.',
    },
    {
      q: 'What is an enzyme?',
      a: 'A protein that speeds up chemical reactions in cells',
      options: ['A sugar that cells use as fuel for energy', 'A tiny structure where proteins are built', 'A green substance that absorbs light for photosynthesis'],
      why: 'Enzymes are the midfield playmakers: they speed up the game and are not used up.',
    },
    {
      q: 'What is photosynthesis?',
      a: 'Plants using light energy to make glucose from carbon dioxide and water',
      options: ['Breaking down glucose to release energy in mitochondria', 'Animals using light energy to build their muscles', 'Cells copying their DNA before they divide'],
      why: 'Photosynthesis is the plant\'s own food factory, powered by sunlight.',
    },
    {
      q: 'What is a stain used for?',
      a: 'To colour parts of the cell so they can be seen under the microscope',
      options: ['To keep the specimen still on the slide', 'To make the cell grow bigger under the microscope', 'To speed up chemical reactions inside the cell'],
      why: 'A stain is like a team kit that makes each part of the cell stand out on the pitch.',
    },
    {
      q: 'In the required practical, which objective lens do you start on, and how do you focus?',
      a: 'The lowest-power objective, then coarse focus followed by fine focus',
      options: ['The highest-power objective, then fine focus only', 'The highest-power objective, then coarse focus only', 'The lowest-power objective, then fine focus only'],
      why: 'Start low and wide like a scout, then sharpen up with coarse first and fine second.',
    },
    {
      q: 'How should you draw a cell in the required practical?',
      a: 'With a sharp pencil, no shading, and labels drawn with a ruler',
      options: ['With a coloured pen, shading the nucleus, and labels drawn freehand', 'With a blunt pencil, shading the whole cell, and labels drawn freehand', 'With a sharp pen, shading the cytoplasm, and labels drawn with a ruler'],
      why: 'Neat drawings score marks, so keep the pencil sharp and the lines clean, just like a tidy passing game.',
    },
    {
      "q": "Where do most of the chemical reactions in a cell happen?",
      "a": "In the cytoplasm",
      "options": [
        "In the cell membrane",
        "In the cell wall",
        "In the permanent vacuole"
      ],
      "accept": [
        "cytoplasm"
      ],
      "why": "The cytoplasm is the pitch where most of the action happens, and it is full of enzymes that speed the reactions up."
    },
    {
      "q": "Which stain is used to see human cheek cells under a light microscope?",
      "a": "Methylene blue",
      "options": [
        "Iodine",
        "Chlorophyll",
        "Cell sap"
      ],
      "accept": [
        "methylene"
      ],
      "why": "Iodine is for onion cells; methylene blue colours cheek cells so the nucleus shows up."
    },
  ],
});
