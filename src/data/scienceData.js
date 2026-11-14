// Authentic, educational NASA Science Centre knowledge base tailored for children aged 7-12

export const NASA_EXHIBITS = [
  {
    id: 'artemis',
    title: 'The NASA Artemis Program',
    badge: 'Moon to Mars',
    icon: '🚀',
    accent: '#FFD166',
    summary: 'NASA is landing the first woman and the first person of colour on the Moon using the massive Space Launch System (SLS) rocket and Orion spacecraft.',
    sections: [
      {
        heading: 'Why is it named Artemis?',
        text: 'In Greek mythology, Artemis is the twin sister of Apollo and the goddess of the Moon! The Apollo missions of the 1960s and 70s were the first time humans walked on the Moon. Artemis represents the new generation of sustainable space exploration.'
      },
      {
        heading: 'The Megarocket: Space Launch System (SLS)',
        text: 'SLS is taller than the Statue of Liberty (98 meters) and produces 8.8 million pounds of thrust at liftoff—15% more power than the famous Saturn V rocket!'
      },
      {
        heading: 'Orion Spacecraft',
        text: 'Orion is designed to keep 4 astronauts safe on missions lasting up to 21 days in deep space, equipped with an advanced heat shield that survives re-entry at 40,000 km/h (Mach 32)!'
      }
    ],
    funFact: 'Did you know? Unlike Apollo, which only stayed for a few days, Artemis is building a permanent basecamp so scientists can live and work on the Moon for months!'
  },
  {
    id: 'lunar-living',
    title: 'Living on the Moon: The Science of Survival',
    badge: 'Life Support',
    icon: '🧑‍🚀',
    accent: '#06D6A0',
    summary: 'The Moon has no breathable air, extreme temperatures, and sharp dusty soil. Here is how space engineering makes life possible.',
    sections: [
      {
        heading: 'Water Ice at the South Pole',
        text: 'Because the Moon has no tilt, deep craters at the poles never receive sunlight. NASA\'s LCROSS satellite confirmed billions of kilograms of water ice hidden in the shadows. This water can be melted for drinking or split into hydrogen and oxygen to make rocket fuel!'
      },
      {
        heading: 'Lunar Regolith (Moon Dust)',
        text: 'Moon dust is like powdered glass! With no wind or water to smooth the edges, regolith particles are razor sharp and cling statically to spacesuits. Engineers use electrodynamic dust shields to shake the dust away.'
      },
      {
        heading: 'Wild Temperatures',
        text: 'In direct sunlight, the Moon reaches a boiling +120°C (+250°F). In the shadow, it plunges to an icy -130°C (-200°F). Spacesuits and habitats use multi-layer insulation and active liquid cooling loops.'
      }
    ],
    funFact: 'Because the Moon only has 1/6th of Earth\'s gravity, a 30 kg cadet would weigh only 5 kg on the Moon! You could jump 6 times higher than on Earth!'
  },
  {
    id: 'gateway',
    title: 'Lunar Gateway: Orbiting Science Hub',
    badge: 'Deep Space Station',
    icon: '🛰️',
    accent: '#118AB2',
    summary: 'A miniature space station in a special halo orbit around the Moon, built with international partners including ESA, JAXA, and CSA.',
    sections: [
      {
        heading: 'High-Tech Rendezvous Point',
        text: 'Astronauts fly from Earth to Gateway, dock their spaceship, conduct deep-space biology experiments, and then board a Lunar Lander to fly down to the Moon\'s surface.'
      },
      {
        heading: 'Solar Electric Propulsion',
        text: 'Gateway uses giant solar arrays and xenon ion thrusters. These super-efficient engines shoot out glowing blue ions to gently maneuver the station through space.'
      },
      {
        heading: 'Canadian Space Agency Canadarm3',
        text: 'Canadarm3 is a smart robotic arm equipped with artificial intelligence to inspect, repair, and capture spacecraft even when astronauts are not aboard!'
      }
    ],
    funFact: 'Gateway orbits in a "Near-Rectilinear Halo Orbit" (NRHO), balancing the gravity of Earth and the Moon so it uses almost zero fuel to stay in position!'
  },
  {
    id: 'apollo-vs-artemis',
    title: 'Apollo Legacy vs. Artemis Era',
    badge: 'Then & Now',
    icon: '🏛️',
    accent: '#EF476F',
    summary: 'Compare how space exploration has evolved over 50 years of scientific and technological progress.',
    sections: [
      {
        heading: 'Computers & Technology',
        text: 'The Apollo Guidance Computer had only 4 kilobytes of RAM—thousands of times less power than a simple modern wristwatch! Modern Artemis computers can run billions of calculations per second.'
      },
      {
        heading: 'Spacesuits: A7L vs xEMU / Axiom',
        text: 'Apollo astronauts couldn\'t bend their knees well and had to bunny-hop on the Moon! New exploration spacesuits have flexible bearings, allowing astronauts to kneel, run, climb, and collect rocks with ease.'
      },
      {
        heading: 'Mission Goal',
        text: 'Apollo was a sprint to demonstrate human capability to land and return. Artemis is a sustainable marathon to learn how to live permanently off-world before heading to Mars.'
      }
    ],
    funFact: 'The footprints left on the Moon by Neil Armstrong and Buzz Aldrin in 1969 will stay there for millions of years because there is no wind to blow them away!'
  }
];

export const NASA_QUIZ = [
  {
    id: 'q1',
    question: 'How strong is gravity on the Moon compared to Planet Earth?',
    options: [
      { label: 'A', text: 'Exactly the same as Earth', correct: false },
      { label: 'B', text: '1/6th of Earth gravity (You weigh 6x less!)', correct: true },
      { label: 'C', text: 'Double Earth gravity (Super heavy)', correct: false },
      { label: 'D', text: 'Zero gravity (You float away)', correct: false }
    ],
    explanation: 'Great job! The Moon is smaller and less massive than Earth, so its gravity is about 1/6th as strong. A 60 lb cadet feels like only 10 lbs on the lunar surface!'
  },
  {
    id: 'q2',
    question: 'Where has NASA discovered frozen water ice on the Moon?',
    options: [
      { label: 'A', text: 'In deep craters at the South Pole that never see sunlight', correct: true },
      { label: 'B', text: 'Flowing in warm lunar rivers', correct: false },
      { label: 'C', text: 'Falling as snow from lunar clouds', correct: false },
      { label: 'D', text: 'There is no water anywhere on the Moon', correct: false }
    ],
    explanation: 'Spot on! Deep craters near the Moon\'s poles are permanently shadowed and super cold (-246°C), keeping ice frozen solid for billions of years.'
  },
  {
    id: 'q3',
    question: 'What is the name of the powdery soil covering the Moon\'s surface?',
    options: [
      { label: 'A', text: 'Garden Potting Soil', correct: false },
      { label: 'B', text: 'Lunar Regolith', correct: true },
      { label: 'C', text: 'Cosmic Sandpaper', correct: false },
      { label: 'D', text: 'Star Glitter', correct: false }
    ],
    explanation: 'Awesome! Lunar regolith is formed by billions of micrometeorites pulverizing lunar rocks into fine, sharp, electrostatically charged dust.'
  },
  {
    id: 'q4',
    question: 'What can astronauts use lunar water ice for in survival missions?',
    options: [
      { label: 'A', text: 'Making ice cream cones only', correct: false },
      { label: 'B', text: 'Drinking water, breathable oxygen, and rocket fuel (H2 + O2)', correct: true },
      { label: 'C', text: 'Building ice castles', correct: false },
      { label: 'D', text: 'Watering lunar trees in the open air', correct: false }
    ],
    explanation: 'Brilliant! Water (H2O) can be purified for drinking or split with electricity into breathable Oxygen and Hydrogen rocket fuel!'
  }
];
