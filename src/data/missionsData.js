// Educational missions for Mission: Little Astronaut

export const MISSIONS = [
  {
    id: 'ice-extractor',
    title: 'Lunar Ice Harvester',
    location: 'Shackleton Crater (Lunar South Pole)',
    duration: '10 Mins (Simulated)',
    difficulty: {
      '7-8': 'Gentle Explorer',
      '9-10': 'Cadet Specialist',
      '11-12': 'Lunar Commander'
    },
    icon: '❄️',
    summary: 'Permanently shadowed craters at the Moon\'s south pole hold frozen water ice! Guide our robotic drill to extract precious ice pockets to supply drinking water and rocket fuel.',
    briefing: {
      directorName: 'Flight Director Nova',
      botName: 'Astro-Bot Beep',
      message: 'Greetings, Cadet! Did you know that the bottom of Shackleton Crater has been dark for billions of years? It is one of the coldest places in the solar system: minus 246 degrees Celsius! Our lunar outpost needs water for oxygen and drinking. Deploy our thermal drill and harvest 3 clean ice deposits.',
      checklist: [
        'Check rover battery status',
        'Scan shadowed terrain for ice signals',
        'Drill carefully without overheating',
        'Store sample into cryogenic bay'
      ]
    },
    ageHints: {
      '7-8': 'Look for the sparkling blue ice crystals on the ground! Click the big DRILL button when your rover is nearby.',
      '9-10': 'Watch your rover temperature and battery gauge. Ice pockets are buried beneath the lunar dust (regolith).',
      '11-12': 'Manage the drill RPM and thermal dissipation. Water ice is essential for in-situ resource utilization (ISRU) to generate H2 and O2 for Mars rockets!'
    }
  },
  {
    id: 'solar-align',
    title: 'Solar Array Alignment',
    location: 'Ridge of Eternal Light',
    duration: '8 Mins (Simulated)',
    difficulty: {
      '7-8': 'Fun Alignment',
      '9-10': 'Angle Specialist',
      '11-12': 'Power Grid Master'
    },
    icon: '☀️',
    summary: 'The Moon doesn\'t have air, but it has peaks that stay bathed in sunlight almost continuously! Rotate the high-efficiency solar wings to track the Sun and charge the habitat batteries.',
    briefing: {
      directorName: 'Chief Engineer Vega',
      botName: 'Astro-Bot Beep',
      message: 'Cadet, power is life on the Moon! Our habitat needs steady electricity to run heaters, oxygen generators, and hydroponic lights. Align the three solar wings to catch 100% of the sunlight and wipe away sticky lunar dust.',
      checklist: [
        'Inspect photovoltaic cells for dust',
        'Rotate angle azimuth to match solar heading',
        'Lock into peak efficiency band',
        'Verify battery charging rate'
      ]
    },
    ageHints: {
      '7-8': 'Turn the solar wheel until the beam of light turns bright golden yellow! Keep the battery smiling.',
      '9-10': 'Adjust the angle slider to find the sweet spot between 60° and 75° for maximum solar energy absorption.',
      '11-12': 'Account for the low solar elevation at the lunar poles (only 1.5 degrees above the horizon) to avoid crater rim shadowing.'
    }
  },
  {
    id: 'rock-collector',
    title: 'Lunar Rock & Regolith Explorer',
    location: 'Taurus-Littrow Valley / South Pole',
    duration: '12 Mins (Simulated)',
    difficulty: {
      '7-8': 'Rock Finder',
      '9-10': 'Geology Scout',
      '11-12': 'Astrogeologist'
    },
    icon: '🪨',
    summary: 'Search the lunar surface for rare geologic samples: sparkling Anorthosite from the ancient lunar crust, Basalt lava from moon seas, and mysterious orange volcanic glass.',
    briefing: {
      directorName: 'Dr. Orion (NASA Astrogeologist)',
      botName: 'Astro-Bot Beep',
      message: 'Welcome to field geology! Lunar rocks hold the history of the early Earth and Moon. Unlike Earth, the Moon has no wind or rain, so rocks from 4 billion years ago are preserved like a cosmic time capsule. Let us collect and classify 3 rock specimens.',
      checklist: [
        'Deploy geology rake and tongs',
        'Analyze rock texture and mineral sparkle',
        'Categorize specimen type',
        'Seal into nitrogen-purged sample return box'
      ]
    },
    ageHints: {
      '7-8': 'Pick up the white sparkly rock, the dark volcanic stone, and the rare orange glass bead!',
      '9-10': 'Match the rock color and crystal size to Dr. Orion\'s field handbook.',
      '11-12': 'Analyze spectral reflectance to differentiate highland plagioclase feldspar from basaltic mare titanium.'
    }
  }
];

export const CELESTIAL_DESTINATIONS = [
  {
    id: 'earth',
    name: 'Planet Earth',
    subtitle: 'Cadet Home Base',
    type: 'Terrestrial Planet',
    distance: '0 km',
    gravity: '1.0 g (9.8 m/s²)',
    atmosphere: 'Nitrogen (78%), Oxygen (21%)',
    dayNight: '24 Hours',
    description: 'Our vibrant blue home world. Blue oceans, green continents, and white swirling clouds protect all known life.',
    status: 'Departure Site',
    color: '#3A86FF',
    glow: 'rgba(58, 134, 255, 0.4)',
    unlocked: true
  },
  {
    id: 'moon',
    name: 'The Moon (Luna)',
    subtitle: 'Primary Target: Shackleton Crater',
    type: 'Natural Satellite',
    distance: '384,400 km',
    gravity: '0.166 g (1/6th Earth)',
    atmosphere: 'Nearly None (Exosphere)',
    dayNight: '29.5 Earth Days (Lunar Day)',
    description: 'Our closest celestial neighbour! Covered in grey powdered dust called regolith and craters billions of years old. The South Pole has permanent ice and peaks of eternal light.',
    status: 'MISSION ACTIVE',
    color: '#E0E1DD',
    glow: 'rgba(224, 225, 221, 0.6)',
    target: true,
    unlocked: true
  },
  {
    id: 'gateway',
    name: 'Lunar Gateway',
    subtitle: 'Orbiting Space Outpost',
    type: 'Space Station',
    distance: '380,000 km',
    gravity: 'Microgravity (0 g)',
    atmosphere: 'Habitable Module Air',
    dayNight: '7-Day Halo Orbit',
    description: 'NASA\'s planned space station that will orbit the Moon, serving as a staging point for lunar landings and future deep space missions.',
    status: 'Orbital Staging',
    color: '#06D6A0',
    glow: 'rgba(6, 214, 160, 0.4)',
    unlocked: true
  },
  {
    id: 'mars',
    name: 'Mars (The Red Planet)',
    subtitle: 'Future Frontier',
    type: 'Terrestrial Planet',
    distance: '225 Million km',
    gravity: '0.38 g (38% Earth)',
    atmosphere: 'Carbon Dioxide (95%)',
    dayNight: '24 Hours 39 Mins',
    description: 'A rusty red desert world with towering volcanoes and ancient dry river valleys. The skills you master on the Moon will help human astronauts journey to Mars!',
    status: 'Next Milestone (Level 2)',
    color: '#EF476F',
    glow: 'rgba(239, 71, 111, 0.4)',
    unlocked: false
  }
];
