import { BuildingInfo, OutpostElementId } from '../types/outpost';

export const OUTPOST_ELEMENTS: Record<OutpostElementId, BuildingInfo> = {
  'habitat': {
    id: 'habitat',
    name: 'Crew Habitat Dome',
    category: 'Habitat',
    tagline: 'Home sweet home 384,400 km away from Earth!',
    themeColor: {
      primary: '#38bdf8',
      secondary: '#0284c7',
      glow: 'rgba(56, 189, 248, 0.4)',
      accent: '#bae6fd',
      badgeBg: '#0369a1'
    },
    icon: '🏠',
    badgeName: 'Cozy Hab Pioneer',
    badgeIcon: '🏅',
    purpose: 'Provides pressurized living quarters, sleeping pods, exercise equipment, and communication systems for the astronaut crew.',
    kidExplanation: 'Think of this as the astronauts’ cozy space house! Outside, there is no air to breathe and it can get freezing cold (-130°C) or boiling hot (+120°C). Inside the habitat, it is always a cozy 21°C with fresh air, comfy sleeping bags hung on walls, and fun space food!',
    spaceSuperpower: 'Double-walled pressurized seal with micro-meteorite blast curtains that keep all the breathable air safely inside!',
    funFact: 'Because there is very little gravity on the Moon (1/6th of Earth!), astronauts sleep strapped into wall bags so they don’t float away and bump into the ceiling while dreaming!',
    audioVoiceLine: 'Welcome inside the Crew Habitat! All systems are nominal and the air is fresh. Time for a space dinner!',
    stats: [
      { label: 'Inside Temp', value: '21°C (70°F)', icon: '🌡️' },
      { label: 'Air Pressure', value: '101.3 kPa (Normal)', icon: '💨' },
      { label: 'Crew Capacity', value: '4 Astronauts', icon: '👨‍🚀' },
      { label: 'Gravity', value: '1/6 Earth G', icon: '🪶' }
    ],
    miniTask: {
      prompt: 'Check the airlock seal to ensure clean cabin pressure!',
      actionText: 'Pressurize Airlock',
      successMessage: 'Psssshh! Airlock sealed tight! Safe for socks-only indoor fun!',
      actionIcon: '🚪'
    }
  },

  'solar-station': {
    id: 'solar-station',
    name: 'Solar Panel Station',
    category: 'Energy',
    tagline: 'Catching sunlight to power all our space science!',
    themeColor: {
      primary: '#fbbf24',
      secondary: '#d97706',
      glow: 'rgba(251, 191, 36, 0.45)',
      accent: '#fef08a',
      badgeBg: '#b45309'
    },
    icon: '☀️',
    badgeName: 'Sun Power Champion',
    badgeIcon: '⚡',
    purpose: 'Converts direct solar radiation into electrical power and stores reserve energy in ultra-density lithium-ion battery banks.',
    kidExplanation: 'Without power cords running to Earth, how do our lamps, heaters, and computers stay on? The Moon has no clouds and no rain, so the Sun shines super bright! These giant shiny blue wings soak up sunlight and turn it into clean electricity.',
    spaceSuperpower: 'Self-orienting robotic tracking: the solar panels slowly turn like sunflowers to catch every beam of golden sunlight!',
    funFact: 'A lunar day lasts about 14 Earth days of non-stop sunshine followed by 14 Earth days of night! That’s why our station has super big battery cubes to keep the lights on during the long lunar night.',
    audioVoiceLine: 'Solar array tracking activated! Power grid at 100% efficiency. Generating clean energy!',
    stats: [
      { label: 'Peak Output', value: '150 kW', icon: '⚡' },
      { label: 'Sun Tracking', value: 'Continuous 360°', icon: '🔄' },
      { label: 'Battery Reserve', value: '350 kWh Storage', icon: '🔋' },
      { label: 'Panel Efficiency', value: '34% GaInP/GaAs', icon: '✨' }
    ],
    miniTask: {
      prompt: 'Align the solar panels directly toward the sun for max charge!',
      actionText: 'Track the Sun',
      successMessage: 'Bzzzt! Solar panels aligned! Power flow boosted to maximum surge!',
      actionIcon: '🌻'
    }
  },

  'greenhouse': {
    id: 'greenhouse',
    name: 'Lunar Bio-Dome Greenhouse',
    category: 'Life Support',
    tagline: 'Growing fresh lunar strawberries and sweet oxygen!',
    themeColor: {
      primary: '#34d399',
      secondary: '#059669',
      glow: 'rgba(52, 211, 153, 0.45)',
      accent: '#a7f3d0',
      badgeBg: '#047857'
    },
    icon: '🌱',
    badgeName: 'Master Astro-Farmer',
    badgeIcon: '🍓',
    purpose: 'Cultivates fresh food using hydroponic nutrient mist, recycles carbon dioxide into oxygen, and provides botanical therapy for astronauts.',
    kidExplanation: 'Astronauts get tired of eating food out of plastic pouches! In this sparkling glass dome, we grow real crispy lettuce, sweet space strawberries, and dwarf cherry tomatoes. Plants breathe in the CO₂ astronauts breathe out, and give back fresh, pure oxygen in return!',
    spaceSuperpower: 'Aeroponic root misting: the plants grow without any dirt! Their roots dangle in the air and get sprayed with nutrient water mist!',
    funFact: 'Plants in space still know which way to grow! Even in low gravity, roots follow the water mist downwards and the leaves grow toward the special purple LED grow lights.',
    audioVoiceLine: 'Bio-dome humidity optimal! The space tomatoes are ripening and oxygen release is rising!',
    stats: [
      { label: 'Daily O₂ Made', value: '12 kg / Day', icon: '🫧' },
      { label: 'Crops Growing', value: 'Tomatoes, Strawberries, Kale', icon: '🥗' },
      { label: 'Grow Lights', value: 'Photosynthetic Purple LED', icon: '💡' },
      { label: 'Water Recycling', value: '98% Closed-Loop', icon: '💧' }
    ],
    miniTask: {
      prompt: 'Spray nutrient mist onto the hydroponic roots to help them grow!',
      actionText: 'Mist the Plants',
      successMessage: 'Spritz! The space plants love it! A tiny strawberry just sprouted!',
      actionIcon: '💦'
    }
  },

  'radiation-shelter': {
    id: 'radiation-shelter',
    name: 'Radiation-Protected Shelter',
    category: 'Safety',
    tagline: 'Deep underground shield safe from solar storms & space rays!',
    themeColor: {
      primary: '#a855f7',
      secondary: '#7e22ce',
      glow: 'rgba(168, 85, 247, 0.45)',
      accent: '#e9d5ff',
      badgeBg: '#6b21a8'
    },
    icon: '🛡️',
    badgeName: 'Cosmic Shield Guardian',
    badgeIcon: '🔮',
    purpose: 'Protects the crew during solar flare events and cosmic radiation spikes using underground regolith berms and water-jacket shielding.',
    kidExplanation: 'Earth has a giant magnetic shield that protects us from harmful space radiation, but the Moon doesn’t! When the Sun shoots out solar storms, astronauts head down into this reinforced underground bunker. It has a super thick roof made of melted lunar moon rocks and water walls that cosmic rays can’t penetrate!',
    spaceSuperpower: '3 meters of dense compacted lunar regolith plus water-jacket ceiling that blocks 99.8% of cosmic rays!',
    funFact: 'Water is one of the best space shields in the universe because hydrogen atoms absorb cosmic particles! So the shelter walls double as our drinking water tanks!',
    audioVoiceLine: 'Cosmic radiation shields active! Bunker integrity is at maximum safety. Safe and sound underground!',
    stats: [
      { label: 'Shield Thickness', value: '3.2 meters Regolith', icon: '🪨' },
      { label: 'Radiation Block', value: '99.8% Protection', icon: '🛡️' },
      { label: 'Depth', value: '5 meters Below Surface', icon: '⛏️' },
      { label: 'Emergency Food', value: '30-Day Sealed Stash', icon: '🥫' }
    ],
    miniTask: {
      prompt: 'Engage the cosmic shield blast doors to test the storm drill!',
      actionText: 'Activate Shield Barrier',
      successMessage: 'Clang-woosh! Heavy blast shields engaged! 100% storm safe!',
      actionIcon: '🔒'
    }
  },

  'rover': {
    id: 'rover',
    name: 'Lunar Scout Rover',
    category: 'Exploration',
    tagline: 'The ultimate off-road electric moon buggy!',
    themeColor: {
      primary: '#f97316',
      secondary: '#c2410c',
      glow: 'rgba(249, 115, 22, 0.45)',
      accent: '#fed7aa',
      badgeBg: '#9a3412'
    },
    icon: '🚙',
    badgeName: 'Moon Buggy Racer',
    badgeIcon: '🚀',
    purpose: 'Transports astronauts across crater ridges, collects geology samples, and scouts locations for future outpost expansions.',
    kidExplanation: 'Walking on the Moon in a big bulky spacesuit takes lots of energy. This electric rover has wire mesh spring tires that never get flat tires from sharp rocks, an HD camera mast, and mechanical arms to pick up sparkly moon stones!',
    spaceSuperpower: 'Special nickel-titanium wire tires that bounce over rocks without needing air, so they can never pop in a vacuum!',
    funFact: 'The rover can climb steep 25-degree crater walls without slipping because its computer can turn each wheel in opposite directions!',
    audioVoiceLine: 'Rover systems online! Navigation set for Crater Tycho. Let’s go exploring!',
    stats: [
      { label: 'Top Speed', value: '18 km/h (11 mph)', icon: '🏎️' },
      { label: 'Drive Range', value: '90 km per charge', icon: '🛣️' },
      { label: 'Tires', value: 'Airless Shape-Memory Mesh', icon: '⚙️' },
      { label: 'Cargo Arm', value: 'Sample Scoop & Drill', icon: '🦾' }
    ],
    miniTask: {
      prompt: 'Honk the rover communication horn and spin the antenna!',
      actionText: 'Beep the Rover',
      successMessage: 'Beep beep! Antenna rotating! Ready to roll over crater rims!',
      actionIcon: '📡'
    }
  },

  'astronaut-leo': {
    id: 'astronaut-leo',
    name: 'Commander Leo',
    category: 'Crew',
    tagline: 'Mission Commander, lunar pilot & zero-gravity acrobat!',
    themeColor: {
      primary: '#06b6d4',
      secondary: '#0891b2',
      glow: 'rgba(6, 182, 212, 0.45)',
      accent: '#cffafe',
      badgeBg: '#0e7490'
    },
    icon: '👨‍🚀',
    badgeName: 'Commander Salute',
    badgeIcon: '🌟',
    purpose: 'Leads the lunar outpost mission, pilots the lander spacecraft, and monitors habitat communications with Earth Mission Control.',
    kidExplanation: 'Meet Commander Leo! He has spent 500 hours training underwater in giant pools on Earth to practice how to move in space. His gold visor protects his eyes from harsh UV sunlight!',
    spaceSuperpower: 'Master of the low-gravity bunny hop! He can leap over big craters with a single bounce!',
    funFact: 'Leo’s spacesuit has 14 different layers of special fabric to keep him warm, cool, and safe from tiny space dust called micrometeoroids.',
    audioVoiceLine: 'Hello there, Little Astronaut! Beautiful view of Earth today, isn’t it? Keep exploring!',
    stats: [
      { label: 'Spacewalks (EVAs)', value: '12 Successful', icon: '🥾' },
      { label: 'Suit Oxygen', value: '8.5 Hours Reserve', icon: '🫁' },
      { label: 'Moon Jumps', value: 'Over 2,000 hops!', icon: '🦘' },
      { label: 'Favorite Snack', value: 'Freeze-Dried Strawberries', icon: '🍓' }
    ],
    miniTask: {
      prompt: 'High-five Commander Leo in low gravity!',
      actionText: 'High-Five Leo',
      successMessage: 'Boing! Epic low-gravity high-five! You jumped 2 meters high!',
      actionIcon: '✋'
    }
  },

  'astronaut-maya': {
    id: 'astronaut-maya',
    name: 'Specialist Maya',
    category: 'Crew',
    tagline: 'Astro-Botanist, scientist & chief plant whisperer!',
    themeColor: {
      primary: '#10b981',
      secondary: '#047857',
      glow: 'rgba(16, 185, 129, 0.45)',
      accent: '#d1fae5',
      badgeBg: '#065f46'
    },
    icon: '👩‍🚀',
    badgeName: 'Space Botanist Pin',
    badgeIcon: '🌿',
    purpose: 'Conducts plant biology experiments, monitors the greenhouse bio-cycle, and studies how lunar soil can be fertilized.',
    kidExplanation: 'Maya loves green living things! She brought special seeds from Earth and is testing how plants can produce enough food and fresh oxygen for astronauts to live on the Moon and Mars forever.',
    spaceSuperpower: 'Can tell if a lunar tomato plant is thirsty just by looking at its leaf posture under the purple LED lights!',
    funFact: 'Maya once played a flute inside the greenhouse dome to see if musical vibrations help space lettuce grow faster!',
    audioVoiceLine: 'Greetings, explorer! Our lunar salad garden is thriving today. Science is delicious!',
    stats: [
      { label: 'Specialty', value: 'Astro-Botany', icon: '🔬' },
      { label: 'Seeds Planted', value: '450 Varieties', icon: '🌱' },
      { label: 'Lab Samples', value: '128 Lunar Cores', icon: '🧪' },
      { label: 'Favorite Flower', value: 'Cosmic Sunflower', icon: '🌻' }
    ],
    miniTask: {
      prompt: 'Help Maya record the height of a baby space sunflower!',
      actionText: 'Measure Sunflower',
      successMessage: 'Recorded! The space sunflower is 15 cm tall and glowing bright!',
      actionIcon: '📏'
    }
  },

  'astronaut-sam': {
    id: 'astronaut-sam',
    name: 'Cadet Sam & BEEP-0',
    category: 'Crew',
    tagline: 'Robotics engineer, mechanic & rover tuning wizard!',
    themeColor: {
      primary: '#ec4899',
      secondary: '#be185d',
      glow: 'rgba(236, 72, 153, 0.45)',
      accent: '#fce7f3',
      badgeBg: '#9d174d'
    },
    icon: '🧑‍🚀',
    badgeName: 'Robo-Mechanic Wrench',
    badgeIcon: '🤖',
    purpose: 'Maintains lunar rovers, repairs external equipment, and builds friendly robot helpers to explore dark crater bottoms.',
    kidExplanation: 'Cadet Sam is our tech genius! Together with his trusty hover-drone buddy BEEP-0, he fixes solar panels, tightens rover lug nuts, and programs robot drones to explore icy moon caves.',
    spaceSuperpower: 'Can fix any machine on the lunar outpost using a multi-tool wrench and a roll of space-grade Kapton duct tape!',
    funFact: 'BEEP-0 the robot uses sound beeps because in space there is no air for talking outside, so they chat using radio frequencies!',
    audioVoiceLine: 'Beep boop! Sam and BEEP-0 ready for maintenance duty! All circuits firing at 100%!',
    stats: [
      { label: 'Inventions Built', value: '8 Robot Drones', icon: '⚙️' },
      { label: 'Companion Bot', value: 'BEEP-0 (Mark II)', icon: '🤖' },
      { label: 'Wrench Turns', value: '1,420 Bolts Fastened', icon: '🔧' },
      { label: 'Favorite Music', value: 'Synthwave & Electronic', icon: '🎵' }
    ],
    miniTask: {
      prompt: 'Calibrate BEEP-0’s optical sensor with a cheerful high beep!',
      actionText: 'Calibrate Robot',
      successMessage: 'Boop-whirrr-ding! BEEP-0 lights up with a happy smiley face!',
      actionIcon: '💡'
    }
  }
};
