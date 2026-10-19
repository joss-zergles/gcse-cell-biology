registerSection({
  id: '4.1.3.2',
  title: 'Osmosis',
  topic: 'Transport in cells',
  emoji: '💧',
  biologyOnly: false,
  intro: 'Water fans are slipping through the turnstile and pouring into the crowded end. Get osmosis sorted, then join the potato penalty shootout.',
  scenes: [
    {
      title: 'Dilute vs concentrated',
      commentator: '"Look at the dilute side — loads of water fans, barely any sugar in the stands!"',
      type: 'versus',
      params: {
        left: { name: 'Dilute solution', emoji: '💧' },
        right: { name: 'Concentrated solution', emoji: '🍬' },
        rows: [
          { feature: 'Solute (dissolved substance)', left: 'A little', right: 'Lots' },
          { feature: 'Water (the solvent)', left: 'Lots', right: 'Less' },
          { feature: 'Water concentration', left: 'Higher', right: 'Lower' },
        ],
      },
      text: 'A <b>solute</b> is the substance that dissolves, such as sugar or salt. The liquid it dissolves in is the <b>solvent</b>, which is water here. A <b>dilute solution</b> has lots of water and only a little solute; a <b>concentrated solution</b> has lots of solute and relatively less water. KEY IDEA: a dilute solution has a <b>higher concentration of water</b> than a concentrated one. A <b>partially permeable membrane</b> has tiny holes that let small molecules, like water, through but block bigger ones, like sugar. Think of a turnstile that only lets small fans through.',
      keyFact: 'A dilute solution has a higher concentration of water than a concentrated solution, because it contains less solute.',
    },
    {
      title: 'Water fans through the turnstile',
      commentator: '"And the water fans are slipping through the turnstile — but the big inflatable bananas are stuck at the gate!"',
      type: 'flow',
      params: {
        mode: 'osmosis',
        particle: '💧',
        particleName: 'water',
        leftLabel: 'Dilute solution (lots of water)',
        rightLabel: 'Concentrated solution',
        membraneLabel: 'partially permeable membrane',
        solute: '🍬',
        captions: [
          'Small water molecules pass through the membrane',
          'Large sugar molecules are too big to pass',
          'Net movement: dilute solution to concentrated solution',
        ],
      },
      text: '<b>Osmosis</b> is a special case of <b>diffusion</b>: it is the diffusion of <b>water only</b>, through a partially permeable membrane. Water moves from the dilute solution to the concentrated solution, because water is more concentrated on the dilute side. The sugar is too big to pass through the membrane, so it stays on the concentrated side.',
      keyFact: 'Osmosis is the diffusion of water from a dilute solution to a concentrated solution through a partially permeable membrane.',
    },
    {
      title: 'Percentage change, step by step',
      commentator: '"Percentage change is the stat that tells you who really won the mass battle!"',
      type: 'commentary',
      params: {
        emoji: ['🧮', '📈', '📉'],
        lines: [
          'Percentage change = (final mass − initial mass) ÷ initial mass × 100.',
          '2.0 g to 2.5 g: (2.5 − 2.0) ÷ 2.0 × 100 = +25%. A gain!',
          '4.0 g to 3.0 g: (3.0 − 4.0) ÷ 4.0 × 100 = −25%. A loss!',
          'Always divide by the START mass, not the finish.',
        ],
      },
      text: 'Potato pieces start at different masses, so comparing the raw mass change is not fair: a 0.5 g gain is 25% of a 2 g piece but only 2.5% of a 20 g piece. <b>Percentage change</b> compares the change with the starting mass, so every piece is on the same scale. A gain gives a positive answer; a loss gives a negative answer. Always divide by the <b>initial</b> (starting) mass.',
      keyFact: 'Percentage change in mass = (final mass − initial mass) ÷ initial mass × 100.',
    },
    {
      title: 'Required practical: potato penalty shootout',
      commentator: '"Every strip gets the same kick in the same conditions — that is how you win a fair test!"',
      type: 'chain',
      params: {
        steps: [
          { emoji: '🥔', label: 'Cut potato cylinders', note: 'Cork borer (a tube-shaped cutter): same size each time' },
          { emoji: '🧻', label: 'Blot dry, then weigh', note: 'Removes surface water so it does not add mass' },
          { emoji: '🧪', label: 'Add the solutions', note: '0 to 1.0 M sugar, same volume each' },
          { emoji: '⏱️', label: 'Wait the same time', note: 'e.g. 24 hours, at the same temperature' },
          { emoji: '⚖️', label: 'Blot dry, reweigh', note: 'Record the final mass' },
          { emoji: '📊', label: 'Work out % change', note: 'Plot % change against concentration' },
        ],
      },
      text: 'Required practical 3: investigate how the mass of potato changes in sugar or salt solutions of different concentrations. The <b>independent variable</b> is the thing you change on purpose: the concentration of the solution. Concentration is measured in <b>M</b> (molar), a unit of concentration: the bigger the number, the more sugar or salt is dissolved. The <b>dependent variable</b> is the thing you measure: the percentage change in mass. <b>Control variables</b> are the things you keep the same so the test is fair: potato size, time, temperature and volume of solution.',
      keyFact: 'In the potato practical, the independent variable is the concentration of the solution and the dependent variable is the percentage change in mass.',
    },
    {
      title: 'Reading the graph',
      commentator: '"Look at where the line crosses the x-axis — that is the magic point where nothing moves!"',
      type: 'commentary',
      params: {
        emoji: ['📊', '🎯', '🏁'],
        lines: [
          'Plot % change in mass on the y-axis and concentration on the x-axis.',
          'Above the x-axis: a gain. Water moved in, so the solution was more dilute than the cells.',
          'Crossing the x-axis at 0%: the solution matches the cells. No net water movement.',
        ],
      },
      text: 'Draw a <b>line of best fit</b>: a smooth line drawn through the middle of the points to show the pattern. It does not have to hit every point. Where the line crosses the x-axis, at 0% change, the solution has the same concentration as the cells, so there is no net movement of water.',
      keyFact: 'Where the line crosses the x-axis at 0% change, the solution concentration equals the concentration inside the cells and there is no net movement of water.',
    },
    {
      title: 'Animal cell vs plant cell',
      commentator: '"Animal cells have no armour, so they can burst — but the plant cell wall is a proper defender!"',
      type: 'versus',
      params: {
        left: { name: 'Animal cell', emoji: '🐄' },
        right: { name: 'Plant cell', emoji: '🌿' },
        rows: [
          { feature: 'Cell wall', left: false, right: true },
          { feature: 'In pure water', left: 'Swells and bursts (lysis)', right: 'Turgid: firm, pressing on the wall' },
          { feature: 'In concentrated solution', left: 'Shrinks', right: 'Flaccid, then plasmolysed' },
        ],
      },
      text: 'Animal cells have no cell wall, so in pure water they take in water by osmosis until they swell and burst. This bursting is called <b>lysis</b>. Plant cells have a strong cell wall, so they swell until they are <b>turgid</b>: swollen and firm, pressing against the wall, which stops them bursting. In a concentrated solution, a plant cell loses water and becomes <b>flaccid</b>: soft and floppy. If so much water leaves that the cytoplasm pulls away from the cell wall, the cell is undergoing <b>plasmolysis</b>.',
      keyFact: 'Animal cells have no cell wall, so they can swell and burst (lysis) in pure water; plant cells become turgid because the cell wall stops them bursting.',
    },
    {
      title: 'Isotonic sports drinks',
      commentator: '"Same strength as your body fluids — no water rushing in or out, and your legs stay ready for the second half!"',
      type: 'commentary',
      params: {
        emoji: ['🥤', '⚽', '💦'],
        lines: [
          '"Isotonic" means the same concentration as the body\'s fluids.',
          'So an isotonic drink does not cause a big net flow of water into or out of your cells.',
          'Replacing lost water and salts without upsetting your cells: that is the sports science.',
        ],
      },
      text: '<b>Isotonic</b> means having the same concentration as something else. Isotonic sports drinks have the same concentration as body fluids, so they replace water and salts lost in sweat without a big net movement of water into or out of cells by osmosis.',
      keyFact: 'Isotonic sports drinks have the same concentration as body fluids.',
    },
  ],
  cards: [
    {
      q: 'What is osmosis?',
      a: 'Diffusion of water from a dilute to a concentrated solution through a partially permeable membrane',
      options: [
        'Movement of sugar from a concentrated to a dilute solution',
        'Water moving from a concentrated to a dilute solution through a membrane',
        'Water being pumped across a membrane using energy from respiration',
      ],
      why: 'It is diffusion, but only for water, and only through a partially permeable membrane.',
    },
    {
      q: 'In osmosis, which way does the net movement of water go?',
      a: 'From the dilute solution to the concentrated solution',
      options: [
        'From the concentrated solution to the dilute solution',
        'Equally in both directions, so no net movement',
        'Only out of the cell, never into it',
      ],
      why: 'Water fans leave the dilute end, which has more water, and pile into the concentrated end.',
    },
    {
      q: 'Why can water pass through a partially permeable membrane but sugar cannot?',
      a: 'Water molecules are small enough to pass through; sugar molecules are too big.',
      options: [
        'Sugar molecules are charged, so the membrane repels them',
        'Water is pumped through the membrane using energy',
        'Sugar only crosses membranes when the cell is respiring',
      ],
      why: 'The big inflatable bananas get stuck at the turnstile while the water fans slip through.',
    },
    {
      q: 'In a sugar solution, what is the solute?',
      a: 'The sugar, the substance dissolved in the water',
      options: [
        'The water, because it does the dissolving',
        'The beaker the solution is kept in',
        'The whole mixture of sugar and water together',
      ],
      why: 'The solute is the thing that dissolves; the water is the solvent doing the dissolving.',
    },
    {
      q: 'A potato strip goes from 2.0 g to 2.5 g. What is its percentage change in mass?',
      a: '+25% (a gain)',
      accept: ['25'],
      options: ['+20%', '−25%', '+50%'],
      why: 'Gain of 0.5 g ÷ starting mass 2.0 g × 100 = 25%.',
    },
    {
      q: 'A potato strip goes from 4.0 g to 3.0 g. What is its percentage change in mass?',
      a: '−25% (a loss)',
      options: ['+25%', '−33%', '−75%'],
      why: 'Lost 1.0 g ÷ starting mass 4.0 g × 100 = 25%, so the answer is −25%.',
    },
    {
      q: 'A potato strip goes from 5.0 g to 6.0 g. What is its percentage change in mass?',
      a: '+20%',
      accept: ['20'],
      options: ['+16.7%', '+25%', '−20%'],
      why: 'Gain 1.0 g ÷ starting mass 5.0 g × 100 = 20%. Always divide by the starting mass.',
    },
    {
      q: 'Which solution has the higher concentration of water: dilute or concentrated?',
      a: 'The dilute solution',
      accept: ['dilute'],
      options: [
        'The concentrated solution',
        'Both have exactly the same amount of water',
        'Neither solution contains any water',
      ],
      why: 'A dilute solution has lots of water and only a little solute dissolved in it.',
    },
    {
      q: 'What are the variables called that are kept the same to make a test fair?',
      a: 'Control variables',
      accept: ['control'],
      options: ['Dependent variables', 'Independent variables', 'Random variables'],
      why: 'Control variables are the referee: they stay the same so only the concentration changes the result.',
    },
    {
      q: 'In the potato practical, what is the independent variable?',
      a: 'The concentration of the sugar or salt solution',
      accept: ['concentration'],
      options: ['The mass of the potato strip', 'The room temperature', 'The percentage change in mass'],
      why: 'You choose the concentration on purpose; the change in mass is what you measure.',
    },
    {
      q: 'In the potato practical, what is the dependent variable?',
      a: 'The percentage change in mass',
      accept: ['percentage'],
      options: ['The concentration of the solution', 'The temperature of the room', 'The size of the potato cylinders'],
      why: 'You measure how the mass changes; the size and temperature are kept the same.',
    },
    {
      q: 'What does the M in a 0.2 M sugar solution mean?',
      a: 'A unit of concentration: the bigger the number, the more solute dissolved',
      options: [
        'A unit of time, like seconds',
        'A unit of mass, like grams',
        'A unit of length, like millimetres',
      ],
      why: 'M (molar) is a scale for how much sugar or salt is dissolved in the water.',
    },
    {
      q: 'What is a line of best fit?',
      a: 'A smooth line drawn through the middle of the points to show the pattern',
      options: [
        'A line that joins every point exactly, dot to dot',
        'A line drawn only through the first and last points',
        'A line that must always start at zero',
      ],
      why: 'It smooths out the bumps so the overall pattern is clear.',
    },
    {
      q: 'On a percentage change graph, what does the line crossing the x-axis at 0% tell you?',
      a: 'The solution has the same concentration as the cells, so no net water movement',
      options: [
        'The potato lost the most mass',
        'The solution is pure water',
        'The potato cell wall has been destroyed',
      ],
      why: 'No water fans cross in either direction, so the mass does not change.',
    },
    {
      q: 'What happens to an animal cell placed in pure water?',
      a: 'It swells and bursts, because it has no cell wall',
      accept: ['burst'],
      options: [
        'It shrinks and shrivels',
        'It becomes firm and turgid',
        'Nothing happens, because water cannot enter animal cells',
      ],
      why: 'No cell wall means nothing stops it swelling until it bursts. Bursting is called lysis.',
    },
    {
      q: 'Why does a plant cell not burst when it is placed in pure water?',
      a: 'The rigid cell wall pushes back, so the cell becomes turgid',
      options: [
        'It has no water inside it to absorb',
        'Its membrane pumps all the water back out again',
        'Plant cells are too small to take in any water',
      ],
      why: 'The cell wall is like a strong keeper: it holds the cell firm.',
    },
    {
      q: 'What is it called when so much water has left a plant cell that the cytoplasm pulls away from the cell wall?',
      a: 'Plasmolysis',
      accept: ['plasmolysis'],
      options: ['Turgid', 'Lysis', 'Isotonic'],
      why: 'The cell lost lots of water in a concentrated solution, so its contents shrink away from the wall.',
    },
    {
      q: 'What does "isotonic" mean for a sports drink?',
      a: 'It has the same concentration as the body\'s fluids',
      options: [
        'It is more concentrated than the body\'s fluids',
        'It contains no sugar or salt at all',
        'It must be drunk before, never during, exercise',
      ],
      why: 'Same strength as your body fluids, so it does not cause a big water shift in or out of your cells.',
    },
    {
      "q": "A potato strip gains 0.6 g in 3 hours. What is its rate of mass gain in g per hour?",
      "a": "0.2 g per hour",
      "options": [
        "0.6 g per hour",
        "1.8 g per hour",
        "5 g per hour"
      ],
      "accept": [
        "0.2"
      ],
      "why": "Rate = change ÷ time, so 0.6 g ÷ 3 hours = 0.2 g per hour."
    },
  ],
});
