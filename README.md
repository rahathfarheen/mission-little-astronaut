# 🚀 Mission: Little Astronaut

> **An educational, child-friendly 2.5D space survival & STEM adventure designed for children aged 7–12.**

Built with **React 18 + Vite**, modular component architecture, accessible high-contrast design system, self-contained Web Audio synthesis, and authentic NASA Artemis science concepts.

---

## 🌟 Table of Contents
1. [Project Overview](#-project-overview)
2. [Target Age Adaptations (7–12 Years)](#-target-age-adaptations-712-years)
3. [Screens & Navigation Architecture](#-screens--navigation-architecture)
4. [Component & Folder Structure](#-component--folder-structure)
5. [Getting Started & Running Locally](#-getting-started--running-locally)
6. [How to Integrate Other Modules](#-how-to-integrate-other-modules)
7. [Git Repository Management & Merging External Files](#-git-repository-management--merging-external-files)
8. [Accessibility & Child-Friendly UX Design](#-accessibility--child-friendly-ux-design)

---

## 🛰️ Project Overview

**Mission: Little Astronaut** puts children in the boots of an Artemis astronaut establishing a sustainable human outpost at **Shackleton Crater** on the Moon's South Pole.

### Core Highlights:
- **Illustrated 2.5D Space Environment**: Parallax starfield, twinkling celestial canvas, glowing nebulae, lunar crater horizon, and animated 2.5D vector astronauts.
- **Kid-Friendly High Contrast Palette**: Deep cosmic blues, starlight gold, neon life-support teal, and rocket coral with tactile 3D push-buttons.
- **Audio Synthesizer (Zero External MP3 Dependencies)**: Built-in Web Audio API synthesizer that produces cheerful retro-futuristic bleeps, hover blips, rover drill hums, and fanfare.
- **Authentic NASA Science**: Real facts on the SLS rocket, Orion capsule, Lunar Gateway in NRHO halo orbit, water ice cold traps, and regolith dust dynamics.

---

## 🎯 Target Age Adaptations (7–12 Years)

| Age Level | Role | UI & Experience Tailoring |
| :--- | :--- | :--- |
| **7–8** | **Junior Space Cadet** | Extra-large chunky buttons, simplified vocabulary, bright visual cues from Astro-Bot, forgiving drills. |
| **9–10** | **Lunar Specialist** | Balanced STEM challenges, real NASA Artemis equipment, angle sliders, rock taxonomy, and base telemetry. |
| **11–12** | **Mission Commander** | In-situ resource utilization (ISRU) science, cryogenic thermal dissipation, orbital mechanics, lunar geology. |

---

## 🧭 Screens & Navigation Architecture

The application includes 9 fully functional screens coordinated by `GameContext`:

1. **Welcome Screen (`SCREENS.WELCOME`)**: Animated floating astronaut hero, mission overview, "Blast Off!" launch trigger, and direct navigation links.
2. **Astronaut Onboarding (`SCREENS.ONBOARDING`)**: Interactive cadet profile builder with live 2.5D avatar preview (customizable spacesuit color, UV visor tint, mission badge patch, and call sign).
3. **Age Selection (`SCREENS.AGE_SELECTION`)**: Interactive 3-tier difficulty bracket calibrator (7–8, 9–10, 11–12).
4. **Planet Selection (`SCREENS.PLANET_SELECTION`)**: Celestial destination picker highlighting the Moon (Shackleton Crater, South Pole) alongside Earth, Lunar Gateway, and Mars, with orbital telemetry (gravity, distance, day/night period).
5. **Mission Briefing (`SCREENS.MISSION_BRIEFING`)**: CapCom transmission from Flight Director Nova and Astro-Bot with an interactive 4-step pre-flight checklist.
6. **Main Outpost Screen (`SCREENS.OUTPOST`)**: Lunar Base Alpha command hub with 6 modular bays (Hydroponics, Solar Array, Ice Melter, Rover Bay, Comm Tower, Science Lab), interactive diagnostic modals, and real-time Life Support HUD (O2, Power, H2O, Temp, Hull).
7. **Mission Screen (`SCREENS.MISSION`)**: Playable mini-missions:
   - ❄️ *Lunar Ice Harvester*: Navigate Shackleton Crater cold traps and drill water-ice cores.
   - ☀️ *Solar Array Alignment*: Rotate photovoltaic panels to catch 100% polar sunlight.
   - 🪨 *Rock & Regolith Explorer*: Catalogue Genesis Anorthosite, Mare Basalt, and Apollo 17 Orange Soil.
8. **NASA Science Centre (`SCREENS.SCIENCE`)**: 4 comprehensive interactive exhibits (Artemis Program, Lunar Survival, Gateway, Apollo vs Artemis) + an interactive 4-question NASA Cadet Quiz with instant explanations and badge rewards.
9. **Mission Results Screen (`SCREENS.RESULTS`)**: Debriefing with 3 gold stars, confetti explosion, score calculation, unlocked badge showcase, and a **printable Official NASA Cadet Certificate**.

---

## 📁 Component & Folder Structure

```
mission-little-astronaut/
├── index.html                   # HTML5 shell with Google Fonts (Fredoka, Nunito, Space Grotesk)
├── package.json                 # Dependencies (React 18, Vite, canvas-confetti, lucide-react)
├── vite.config.js               # Vite bundler configuration
├── README.md                    # Project documentation
└── src/
    ├── main.jsx                 # React root renderer
    ├── App.jsx                  # Main application orchestrator & 2.5D space background
    ├── index.css                # Design system variables, animations, and accessible styles
    ├── context/
    │   └── GameContext.jsx      # Global state for cadet profile, resources, badges & router
    ├── data/
    │   ├── missionsData.js      # Missions, difficulties, checklists, and celestial targets
    │   ├── scienceData.js       # Authentic NASA exhibits and quiz bank
    │   ├── outpostData.js       # Outpost modules and initial life-support telemetry
    │   └── badgesData.js        # Cadet badges, suit colors, visors, and flight patches
    ├── utils/
    │   ├── audio.js             # Web Audio API synthesizer for sound effects
    │   └── confetti.js          # Confetti particle burst celebration helper
    ├── components/
    │   ├── common/
    │   │   ├── Button.jsx       # 3D tactical push-button with sounds
    │   │   ├── Card.jsx         # Glassmorphism 2.5D card container
    │   │   ├── ProgressBar.jsx  # Telemetry bar with animated gradient fill
    │   │   ├── Modal.jsx        # Accessible dialog with backdrop blur
    │   │   ├── Badge.jsx        # Achievement badge with rarity border
    │   │   ├── AudioToggle.jsx  # Mute / unmute sound effect pill
    │   │   ├── TopNav.jsx       # Mission HUD bar with quick-jump screen selector
    │   │   └── AstronautAvatar.jsx # Dynamic 2.5D SVG astronaut reflecting suit & visor
    │   ├── outpost/
    │   │   ├── ModuleCard.jsx   # Interactive base module card with action triggers
    │   │   └── TelemetryGauge.jsx # Outpost HUD life-support telemetry gauge
    │   └── miniGames/
    │       ├── IceHarvesterGame.jsx  # Interactive cryogenic ice drilling game
    │       ├── SolarAlignGame.jsx     # Solar angle azimuth tracking game
    │       └── RockCollectorGame.jsx  # Lunar rock & regolith collection game
    └── screens/
        ├── WelcomeScreen.jsx
        ├── OnboardingScreen.jsx
        ├── AgeSelectionScreen.jsx
        ├── PlanetSelectionScreen.jsx
        ├── MissionBriefingScreen.jsx
        ├── OutpostScreen.jsx
        ├── MissionScreen.jsx
        ├── ScienceCentreScreen.jsx
        └── ResultsScreen.jsx
```

---

## 💻 Getting Started & Running Locally

### Prerequisites
- Node.js 18+ (tested on Node v24)
- npm 9+

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` to play the game!

### 3. Production Build
```bash
npm run build
```
Generates optimized assets in `/dist`.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🔌 How to Integrate Other Modules

The project is built on clean modular boundaries:

### 1. Adding a New Planet / Destination (e.g., Mars Base)
1. Open `src/data/missionsData.js`.
2. Add a new object to `CELESTIAL_DESTINATIONS`:
   ```javascript
   {
     id: 'mars',
     name: 'Mars (Jezero Crater)',
     type: 'Terrestrial Planet',
     distance: '225 Million km',
     gravity: '0.38 g',
     unlocked: true,
     ...
   }
   ```
3. Update `PlanetSelectionScreen.jsx` to enable missions on Mars!

### 2. Adding a New Mini-Game
1. Create your component in `src/components/miniGames/MyNewGame.jsx`.
2. Accept props: `{ onFinish, ageGroup }`.
3. When the objective is achieved, call:
   ```javascript
   onFinish({
     score: 1000,
     stars: 3,
     extractedItems: ['Discovered Specimen X'],
     resourcesEarned: { oxygen: '+20 %', water: '+10 L', battery: '+20 %' },
     message: 'Great job completing this task!'
   });
   ```
4. Register the game in `src/screens/MissionScreen.jsx`.

### 3. Connecting Real NASA APIs or Backend Telemetry
- Simply create a service in `src/services/nasaApi.js` (e.g. NASA APOD or Mars Rover Photos).
- Call it from `src/screens/ScienceCentreScreen.jsx` or `src/context/GameContext.jsx` using `fetch` or React Query.

---

## 🐙 Git Repository Management & Merging External Files

To manage this repository and merge modules from other team members or repositories:

### 1. Initialize & Verify Repository
```bash
cd "C:\Users\Rahath farheen\.gemini\antigravity\scratch\mission-little-astronaut"
git status
```

### 2. Working with Feature Branches
When collaborating on a new module (e.g. audio narration or teacher dashboard):
```bash
# 1. Create a new branch
git checkout -b feature/teacher-dashboard

# 2. Add and commit your changes
git add .
git commit -m "feat: add teacher classroom progress view"

# 3. Switch back to main and merge
git checkout main
git merge feature/teacher-dashboard
```

### 3. Merging Files from Another Folder or Repository
If you have existing files or another repository to merge into this one:
```bash
# Copy files into the target folder or use git remote:
git remote add external <url-or-local-path-to-other-repo>
git fetch external
git merge external/main --allow-unrelated-histories -m "merge: integrated external modules"
```

---

## ♿ Accessibility & Child-Friendly UX Design

- **Font Hierarchy**: Scalable `Fredoka` for friendly headlines and `Nunito` for high-legibility prose.
- **Large Clickable Areas**: All buttons conform to minimum 48px touch targets for small fingers and touchscreen devices.
- **Clear Contrast**: Evaluated against WCAG AAA standards for high legibility against cosmic backgrounds.
- **Safe Audio Defaults**: Web Audio synth sound effects can be muted instantly with the persistent top-right audio pill.
