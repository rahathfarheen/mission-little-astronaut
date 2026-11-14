// Confetti celebration helper
let confettiLib = null;

// Dynamic import with fallback
export async function fireCelebration() {
  try {
    if (!confettiLib) {
      const module = await import('canvas-confetti');
      confettiLib = module.default || module;
    }
    if (typeof confettiLib === 'function') {
      confettiLib({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD166', '#06D6A0', '#118AB2', '#EF476F', '#7F5AF0']
      });
      setTimeout(() => {
        confettiLib({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confettiLib({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 250);
      return;
    }
  } catch {
    // Fallback: log or ignore if library not available yet
  }
}
