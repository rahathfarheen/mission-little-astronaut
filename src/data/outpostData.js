// Lunar Base Alpha Outpost Systems and Modules

export const OUTPOST_MODULES = [
  {
    id: 'greenhouse',
    name: 'Hydroponics Dome',
    icon: '🌱',
    status: 'OPTIMAL',
    health: 94,
    description: 'Automated aeroponic growth chambers cultivating space lettuce, radishes, and spirulina algae to recycle CO2 and produce fresh vitamins.',
    vitalStat: 'O2 Output: +120 L/day',
    actionText: 'Tend Space Crops',
    bonusText: 'Increases Oxygen and Cadet Morale!'
  },
  {
    id: 'solar',
    name: 'Photovoltaic Wing Array',
    icon: '☀️',
    status: 'ACTIVE',
    health: 88,
    description: 'Triple-junction solar panels perched on the rim of Shackleton Crater tracking the low polar sun across the lunar horizon.',
    vitalStat: 'Power: 14.8 kW (Stable)',
    actionText: 'Dust Off Panels',
    bonusText: 'Cleans lunar regolith and boosts battery recharge!'
  },
  {
    id: 'water-recycler',
    name: 'Ice Melter & Purifier',
    icon: '💧',
    status: 'STANDBY',
    health: 82,
    description: 'Multi-stage catalytic purifier melting cryogenic ice cores extracted from dark craters into ultrapure drinking water.',
    vitalStat: 'Reserves: 2,450 Litres',
    actionText: 'Cycle Water Filter',
    bonusText: 'Secures habitat hydration and electrolytic O2!'
  },
  {
    id: 'rover-garage',
    name: 'Hop-1 Rover Bay',
    icon: '🚜',
    status: 'READY',
    health: 100,
    description: 'Pressurized maintenance airlock for the all-terrain 6-wheel robotic exploration rover equipped with scientific scoops and spectrometers.',
    vitalStat: 'Charge: 100% Ready',
    actionText: 'Pre-Flight Diagnostic',
    bonusText: 'Checks suspension and stereo cameras for missions!'
  },
  {
    id: 'comm-tower',
    name: 'Deep Space Earth Link',
    icon: '📡',
    status: 'ONLINE',
    health: 96,
    description: 'Laser communication dish transmitting high-definition video, telemetry, and science discoveries back to NASA Mission Control in Houston.',
    vitalStat: 'Latency: 1.28 Seconds',
    actionText: 'Ping Houston Control',
    bonusText: 'Syncs science logs and updates mission objectives!'
  },
  {
    id: 'science-lab',
    name: 'NASA Astro-Lab',
    icon: '🔬',
    status: 'ONLINE',
    health: 91,
    description: 'Cleanroom glovebox with scanning electron microscopes to inspect rock samples and search for water-bearing mineral inclusions.',
    vitalStat: 'Analyzers: Calibrated',
    actionText: 'Visit Science Center',
    bonusText: 'Explore real NASA exhibits and test cadet knowledge!'
  }
];

export const INITIAL_HUD_RESOURCES = {
  oxygen: 92,
  energy: 85,
  water: 78,
  temperature: 21.5, // Celsius
  hullIntegrity: 98
};
