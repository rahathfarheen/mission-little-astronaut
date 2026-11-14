# 🤝 6-Member Team Collaboration & Integration Guide
### Project: Mission: Little Astronaut

This guide provides a step-by-step workflow for your 6-member team so everyone can build their modules independently and merge them seamlessly without breaking the application or fighting merge conflicts.

---

## 👥 1. Suggested 6-Member Role & File Ownership Matrix

To prevent merge conflicts, **each teammate should primarily edit files within their assigned domain**:

| Member | Assigned Role | Primary Folders / Files Owned | Responsibilities |
| :--- | :--- | :--- | :--- |
| **Member 1 (You)** | **Frontend Lead & Core Shell** | `src/App.jsx`, `src/context/GameContext.jsx`, `src/components/common/`, `src/index.css` | Overall UI shell, state router, global navigation, integration testing. |
| **Member 2** | **Frontend UI & Mini-Games** | `src/components/miniGames/`, `src/screens/MissionScreen.jsx`, `src/screens/OutpostScreen.jsx` | Mini-game interactions, animations, outpost modals, button controls. |
| **Member 3** | **NASA Science & Content** | `src/data/scienceData.js`, `src/data/missionsData.js`, `src/data/badgesData.js` | Educational facts, quiz question bank, Artemis facts, age-adapted texts. |
| **Member 4** | **Backend / API & DB** | `server/` (or backend folder), `src/services/api.js` | REST/GraphQL server, user authentication, score leaderboard, progress database. |
| **Member 5** | **Graphics, Audio & Media** | `public/assets/`, `src/utils/audio.js`, illustrations | Custom SVG badges, space audio tracks, sound effects, mission icons. |
| **Member 6** | **QA, Testing & DevOps** | `tests/`, `.github/workflows/`, `package.json`, Vite configs | Automated tests (`npm test`), build validation (`npm run build`), deployment (Vercel/Netlify). |

---

## 🌿 2. Git Branching Strategy

Follow this simple branch structure:

```
master (or main)   ───> Stable, working version (never push unverified code here)
  │
  ├── feature/frontend-minigames   (Member 2)
  ├── feature/nasa-quiz-data       (Member 3)
  ├── feature/backend-api          (Member 4)
  ├── feature/audio-pack           (Member 5)
  └── feature/tests-deployment     (Member 6)
```

---

## 🚀 3. How to Set Up the Remote Repository (GitHub / GitLab)

### Step 1: Push This Local Repository to GitHub
1. Go to [GitHub](https://github.com) and click **New Repository**.
2. Name it `mission-little-astronaut` (leave "Initialize with README" unchecked).
3. In your terminal, run:
   ```bash
   cd "C:\Users\Rahath farheen\.gemini\antigravity\scratch\mission-little-astronaut"
   git remote add origin https://github.com/<your-username>/mission-little-astronaut.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Invite Your 5 Teammates
1. Go to GitHub repo → **Settings** → **Collaborators** → **Add people**.
2. Invite your 5 teammates using their GitHub usernames or emails.

### Step 3: How Teammates Clone the Repo
Your teammates run:
```bash
git clone https://github.com/<your-username>/mission-little-astronaut.git
cd mission-little-astronaut
npm install
npm run dev
```

---

## 🔄 4. How Teammates Work & Merge via Pull Requests (Best Practice)

Every teammate should follow this 5-step loop:

### 1. Pull Latest Changes Before Starting
```bash
git checkout main
git pull origin main
```

### 2. Create Their Feature Branch
```bash
# Example for Member 2 working on a new rover mini-game:
git checkout -b feature/rover-maze-game
```

### 3. Work on Files and Commit
```bash
git add .
git commit -m "feat: added rover maze mini-game component"
```

### 4. Push Branch to GitHub
```bash
git push -u origin feature/rover-maze-game
```

### 5. Open a Pull Request (PR) on GitHub
1. On GitHub, click **Compare & Pull Request**.
2. You (as Frontend Lead) review the code.
3. Test locally if needed, then click **Merge Pull Request**.

---

## 📥 5. How to Merge Files if Teammates Send You Files Directly (ZIP / Drive)

If a teammate sends you files directly (e.g. in a `.zip` or via email):

1. **Create an integration branch:**
   ```bash
   git checkout -b integrate-member3-content
   ```
2. **Copy the files** into the respective directory:
   - Content/Questions → `src/data/`
   - New Mini-game → `src/components/miniGames/`
   - Images/Sounds → `public/assets/`
3. **Run the build test to make sure nothing broke:**
   ```bash
   npm run build
   ```
   - If it outputs `✓ built in ...s` with exit code 0, everything is safe!
   - If there is an error, fix the import statement or syntax.
4. **Commit and Merge:**
   ```bash
   git add .
   git commit -m "feat: integrated member 3 NASA quiz data"
   git checkout main
   git merge integrate-member3-content
   git push origin main
   ```

---

## ⚠️ 6. How to Resolve Merge Conflicts (When Two People Edit the Same File)

If Git shows `CONFLICT (content): Merge conflict in src/...`:

1. Open the file in **VS Code**.
2. You will see markers like this:
   ```javascript
   <<<<<<< HEAD (Current Change - Your Code)
   const missionTitle = "Lunar Ice Harvester";
   =======
   const missionTitle = "Shackleton Polar Ice Harvester";
   >>>>>>> feature/new-title (Incoming Change - Teammate Code)
   ```
3. Choose one of VS Code's one-click buttons:
   - **Accept Current Change**
   - **Accept Incoming Change**
   - **Accept Both Changes**
   - Or manually delete the `<<<<<<<`, `=======`, and `>>>>>>>` lines and keep the best combination.
4. Test and commit:
   ```bash
   npm run build
   git add .
   git commit -m "fix: resolved merge conflict in missionTitle"
   ```

---

## 🔌 7. Modular Component Integration Contracts

### Contract A: Adding a New Mini-Game
Any teammate building a mini-game only needs to follow this template:
```jsx
// src/components/miniGames/MyGame.jsx
export const MyGame = ({ onFinish, ageGroup }) => {
  const handleWin = () => {
    onFinish({
      score: 1000,
      stars: 3,
      extractedItems: ['Discovered Ice Deposit #1'],
      resourcesEarned: { oxygen: '+15 %', water: '+20 L', battery: '+10 %' },
      message: 'Great job!'
    });
  };

  return <div>...mini-game UI...</div>;
};
```

### Contract B: Connecting the Backend Server
In `src/services/api.js`:
- Change `const USE_MOCK = true;` to `false`.
- Set `VITE_API_URL=http://localhost:5000/api` in a `.env` file.
- The frontend will immediately start sending data to the backend!
