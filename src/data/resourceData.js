// Educational Resource Management Data & Science Content for Mission: Little Astronaut
// Maintained by: Member 3 (NASA Science & Content Lead)
// Audience: Children aged 7-12
// NOTE: These values are simplified educational simulation values designed for game balance,
// not official NASA mission specifications.

export const RESOURCE_CONFIGS = {
  oxygen: {
    id: 'oxygen',
    name: 'Oxygen Reserve',
    shortName: 'O₂ Air',
    icon: '🫁',
    unit: '%',
    startingValue: 90,
    minValue: 0,
    maxValue: 100,
    warningThreshold: 25,
    criticalThreshold: 10,
    optimalThreshold: 70,
    color: '#06D6A0', // Nebula Teal
    glowColor: 'rgba(6, 214, 160, 0.4)',
    passiveDrainPerTick: 1.5,
    description: 'Breathable air pumped through the habitat and spacesuits so astronauts can live and think clearly.',
    educationalSummary: 'On Earth, trees and plants make our oxygen. On the Moon, we must bring our own or make it from lunar rocks and water!',
    nasaScienceContext: 'NASA\'s MOXIE experiment on Mars proved we can extract breathable oxygen from alien atmospheres. On the Moon, NASA\'s Artemis base will melt water ice and split it (electrolysis) into oxygen (O2) and hydrogen (H2).'
  },
  water: {
    id: 'water',
    name: 'Purified Water',
    shortName: 'H₂O Water',
    icon: '💧',
    unit: '%',
    startingValue: 85,
    minValue: 0,
    maxValue: 100,
    warningThreshold: 25,
    criticalThreshold: 10,
    optimalThreshold: 70,
    color: '#3A86FF', // Cosmic Blue
    glowColor: 'rgba(58, 134, 255, 0.4)',
    passiveDrainPerTick: 1.2,
    description: 'Fresh clean water for drinking, food rehydration, spacesuit cooling, and plant hydroponics.',
    educationalSummary: 'Water is heavy! Carrying water from Earth on rockets is expensive, so space stations recycle up to 98% of all water.',
    nasaScienceContext: 'The International Space Station (ISS) uses the Water Recovery System to purify astronaut sweat and breath condensation into water cleaner than Earth tap water. Artemis will harvest billions of kilograms of water ice from permanently shadowed lunar craters.'
  },
  energy: {
    id: 'energy',
    name: 'Solar & Battery Power',
    shortName: '⚡ Energy',
    icon: '⚡',
    unit: '%',
    startingValue: 80,
    minValue: 0,
    maxValue: 100,
    warningThreshold: 25,
    criticalThreshold: 10,
    optimalThreshold: 70,
    color: '#FFD166', // Starlight Gold
    glowColor: 'rgba(255, 209, 102, 0.4)',
    passiveDrainPerTick: 2.0,
    description: 'Electrical power stored in lithium-ion battery banks charged by photovoltaic solar wings.',
    educationalSummary: 'Without electricity, heaters stop working in the freezing -130°C lunar night, and computers turn off!',
    nasaScienceContext: 'At the Moon\'s south pole, tall crater rims experience peaks of near-continuous sunlight. Artemis base will use vertical solar arrays that track the Sun as it skims along the horizon.'
  },
  radiationShield: {
    id: 'radiationShield',
    name: 'Radiation Shielding',
    shortName: '🛡️ Shield',
    icon: '🛡️',
    unit: '%',
    startingValue: 95,
    minValue: 0,
    maxValue: 100,
    warningThreshold: 30,
    criticalThreshold: 15,
    optimalThreshold: 75,
    color: '#9D4EDD', // Magnetic Purple
    glowColor: 'rgba(157, 78, 221, 0.4)',
    passiveDrainPerTick: 0.8,
    description: 'Electromagnetic deflector barrier and lunar regolith shielding protecting cadets from galactic cosmic rays and solar flares.',
    educationalSummary: 'The Moon has no atmosphere or magnetic field like Earth to block cosmic radiation. We need special shields and thick dirt layers to stay safe!',
    nasaScienceContext: 'Earth\'s magnetosphere protects us from space radiation. On the Moon, NASA plans to pile lunar soil (regolith) over habitats and use water jackets as biological radiation shields.'
  }
};

export const RESOURCE_ACTIONS = [
  {
    id: 'hydroponic-photosynthesis',
    name: 'Tend Space Crops',
    system: 'oxygen',
    icon: '🌱',
    cost: { energy: 4, water: 3 },
    benefit: { oxygen: 14 },
    difficulty: 'Easy',
    explanations: {
      '7-8': '🌱 Your space lettuce drank some water and light, puffing fresh, sweet oxygen into the habitat!',
      '9-10': '🌱 LED grow lights activated photosynthesis! The crops absorbed cadet carbon dioxide and released +14% clean oxygen.',
      '11-12': '🌱 Photobioreactor cycle complete: Closed-loop hydroponics metabolized CO2 into biomass and generated +14% O2 via plant transpiration.'
    },
    scienceFact: 'NASA astronauts have grown red romaine lettuce, radishes, and chile peppers aboard the ISS using special red and blue LED lights!'
  },
  {
    id: 'water-electrolysis',
    name: 'Run Water Electrolysis',
    system: 'oxygen',
    icon: '⚗️',
    cost: { water: 12, energy: 10 },
    benefit: { oxygen: 22 },
    difficulty: 'Medium',
    explanations: {
      '7-8': '⚗️ Zap! An electric spark split water bubbles into breathable oxygen gas!',
      '9-10': '⚗️ Electrolysis machine activated: Running electricity through H2O separated the hydrogen and oxygen atoms, yielding +22% O2.',
      '11-12': '⚗️ Electrolytic cell operational: 2 H2O + Electrical Work -> 2 H2 + O2. High-yield oxygen produced for life support reserves.'
    },
    scienceFact: 'Electrolysis uses electricity to split water (H2O) into hydrogen and oxygen. The oxygen keeps astronauts breathing, while hydrogen can be stored for rocket propulsion!'
  },
  {
    id: 'harvest-polar-ice',
    name: 'Melt Lunar Ice Core',
    system: 'water',
    icon: '🧊',
    cost: { energy: 8 },
    benefit: { water: 20 },
    difficulty: 'Easy',
    explanations: {
      '7-8': '🧊 The thermal heater melted sparkling ice from Shackleton Crater into yummy pure water!',
      '9-10': '🧊 Cryogenic ice drill melted dark crater ice. Multi-stage filters purified +20% fresh water.',
      '11-12': '🧊 Sublimation condenser cycled: Deep-freeze polar volatiles were melted, filtered through activated charcoal, and remineralized.'
    },
    scienceFact: 'Water ice on the Moon exists in craters where temperatures drop to -246°C (-410°F)—colder than the surface of Pluto!'
  },
  {
    id: 'recycle-greywater',
    name: 'Cycle Water Recycler',
    system: 'water',
    icon: '🔄',
    cost: { energy: 5 },
    benefit: { water: 14 },
    difficulty: 'Easy',
    explanations: {
      '7-8': '🔄 The space filter cleaned up used water until it was sparkling and crystal clear again!',
      '9-10': '🔄 High-tech centrifuge and ceramic membrane recycled +14% purified water for the crew.',
      '11-12': '🔄 Distillation and catalytic oxidation recovered 98% of greywater, replenishing reserve tanks with +14% potable H2O.'
    },
    scienceFact: 'The ISS water filtration system cleans water so thoroughly that space travelers drink water that was once astronaut sweat and urine just hours earlier!'
  },
  {
    id: 'clean-solar-panels',
    name: 'Dust Off Solar Wings',
    system: 'energy',
    icon: '🧹',
    cost: {},
    benefit: { energy: 16 },
    difficulty: 'Easy',
    explanations: {
      '7-8': '🧹 Whoosh! Wiped away sticky Moon dust so the shiny panels can soak up bright sunshine!',
      '9-10': '🧹 Electrostatic dust wand swept sharp regolith off the solar cells, boosting charging efficiency by +16%.',
      '11-12': '🧹 Photovoltaic transmission restored: Cleared abrasive silicate dust, eliminating cell occlusion and surging battery recharge by +16%.'
    },
    scienceFact: 'Moon dust has no wind or rain to wear down its edges, so each grain is like miniature broken glass that statically sticks to everything!'
  },
  {
    id: 'align-solar-trackers',
    name: 'Align Sun-Tracking Wings',
    system: 'energy',
    icon: '☀️',
    cost: { energy: 3 },
    benefit: { energy: 24 },
    difficulty: 'Medium',
    explanations: {
      '7-8': '☀️ Turned the solar wings right towards the Sun! Batteries are filling up with power fast!',
      '9-10': '☀️ Pivoted the solar azimuth motors to face the low polar sun, generating +24% high-voltage battery power.',
      '11-12': '☀️ Solar gimbal calibration locked onto 1.5° polar elevation. Photovoltaic yield maximized at 99.4% peak solar irradiance.'
    },
    scienceFact: 'At the lunar poles, the Sun circles slowly around the horizon rather than rising high into the sky, so solar panels stand upright like walls!'
  },
  {
    id: 'magnetic-shield-boost',
    name: 'Boost Magnetic Deflector',
    system: 'radiationShield',
    icon: '🧲',
    cost: { energy: 12 },
    benefit: { radiationShield: 18 },
    difficulty: 'Medium',
    explanations: {
      '7-8': '🧲 Zap! Created a glowing magnetic bubble over the base to bounce dangerous space rays away!',
      '9-10': '🧲 Superconducting electromagnetic coil charged! Magnetic deflection field fortified by +18%.',
      '11-12': '🧲 Active magnetosphere generator energized: Lorentz-force deflection grid established to shield against energetic solar proton events.'
    },
    scienceFact: 'Earth\'s iron core creates a giant magnetic shield that deflects solar wind. On the Moon, scientists are experimenting with artificial magnetic bubbles to shield human outposts!'
  },
  {
    id: 'reinforce-regolith-berm',
    name: 'Pile Lunar Regolith Berm',
    system: 'radiationShield',
    icon: '🧱',
    cost: { energy: 6 },
    benefit: { radiationShield: 22 },
    difficulty: 'Hard',
    explanations: {
      '7-8': '🧱 Piled heavy Moon dirt over the roof! It acts like a giant cozy rock blanket against radiation!',
      '9-10': '🧱 Robotic bulldozer pushed a 2-meter layer of regolith over the dome, boosting radiation shielding by +22%.',
      '11-12': '🧱 Passive shielding optimized: Lunar regolith contains silicon, iron, and oxygen that absorb cosmic radiation and high-energy neutrons.'
    },
    scienceFact: 'Covering a Moon base with just 2 to 3 meters of lunar dirt provides the same radiation protection as Earth\'s atmosphere!'
  }
];

export const ENVIRONMENTAL_EVENTS = [
  {
    id: 'solar-flare',
    title: '☀️ Solar Storm Alert!',
    severity: 'high',
    drain: { radiationShield: 20, energy: 0 },
    message: 'A solar flare fired a cloud of energetic protons! The radiation shield absorbed the brunt of the storm.',
    tip: 'Boost the magnetic deflector or reinforce regolith shielding immediately!'
  },
  {
    id: 'regolith-dust-storm',
    title: '🌪️ Electrostatic Dust Swarm',
    severity: 'medium',
    drain: { energy: 10 },
    message: 'Levitating lunar dust coated the solar wings, temporarily dropping energy output.',
    tip: 'Dust off the solar arrays with the cleaning tool!'
  },
  {
    id: 'ice-crater-glint',
    title: '✨ Ice Core Pocket Detected',
    severity: 'low',
    bonus: { water: 10 },
    message: 'Rover radar located a pure ice pocket near the rim shadow! Free +10% water harvested.',
    tip: 'Great job! Store extra water for electrolysis.'
  }
];

export const EDUCATIONAL_DISCLAIMER = 
  'Educational Notice: Resource numbers, rates, and values in Mission: Little Astronaut are streamlined educational game mechanics tailored for young explorers aged 7-12, not real-time NASA flight or telemetry data.';
