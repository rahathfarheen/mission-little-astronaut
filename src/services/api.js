/**
 * API Service Adapter for Mission: Little Astronaut
 * Connects the React Frontend with the Backend / Database / Server module.
 *
 * Designed for 6-member team collaboration:
 * - When USE_MOCK is true: Frontend works completely standalone without backend running.
 * - When USE_MOCK is false: Connects to your backend REST / GraphQL / Socket server.
 */

const USE_MOCK = true; // Set to false once the backend team deploys the server
const BACKEND_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiService = {
  // 1. Save Cadet Profile & Progress
  async saveCadetProfile(profile) {
    if (USE_MOCK) {
      localStorage.setItem('little_astronaut_cadet', JSON.stringify(profile));
      return { success: true, data: profile };
    }
    const res = await fetch(`${BACKEND_BASE_URL}/cadet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    });
    return res.json();
  },

  // 2. Fetch Leaderboard / Team Scores
  async getLeaderboard() {
    if (USE_MOCK) {
      return [
        { rank: 1, name: 'Astro Leo', score: 1250, badges: 6 },
        { rank: 2, name: 'Cadet Nova', score: 1100, badges: 5 },
        { rank: 3, name: 'Captain Stella', score: 980, badges: 4 }
      ];
    }
    const res = await fetch(`${BACKEND_BASE_URL}/leaderboard`);
    return res.json();
  },

  // 3. Submit Completed Mission Results
  async submitMissionResults(results) {
    if (USE_MOCK) {
      console.log('[Mock API] Mission results saved:', results);
      return { success: true, timestamp: new Date().toISOString() };
    }
    const res = await fetch(`${BACKEND_BASE_URL}/missions/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(results)
    });
    return res.json();
  },

  // 4. Fetch Dynamic NASA Science Fact of the Day (Live NASA API Integration)
  async getNasaDailyFact() {
    try {
      // Optional real NASA APOD public feed
      const res = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
      if (!res.ok) throw new Error('NASA API offline');
      return await res.json();
    } catch {
      return {
        title: 'Shackleton Crater: The Cold Trap of the Moon',
        explanation: 'Permanently shadowed regions near the lunar south pole maintain temperatures around 40 Kelvin (-233°C), harboring ancient water ice deposits.',
        url: 'https://images-assets.nasa.gov/image/PIA13517/PIA13517~orig.jpg'
      };
    }
  }
};
