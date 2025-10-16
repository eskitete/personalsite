---
title: "Sports Higher or Lower Game"
date: "Nov 18, 2024"
category: "Projects"
tags:
  - "TypeScript"
  - "React"
  - "Tailwind CSS"
  - "Sports Analytics"
author: "Rafay Syed"
duration: "6 min"
---

## Overview

I wanted a playful way to explore sports statistics, so I built an interactive **Higher or Lower** experience that compares NBA and NFL players. The app consumes pre-processed stat packages, then challenges users to decide which athlete leads in a particular metric. A correct guess advances the game while the scoreboard tallies streaks and high scores.

## What I Built

- Real-time comparisons powered by a TypeScript/React stack  
- Smooth animations and responsive UI with Tailwind CSS  
- Aggressive memoization to keep the interface snappy even when datasets grow large  
- A data pipeline that pre-fetches and normalizes stats so the frontend never waits on slow API calls

```tsx
const revealAnswer = (choice: 'left' | 'right') => {
  const correct = isHigher(choice, currentMetric);
  setResults(prev => ({
    ...prev,
    streak: correct ? prev.streak + 1 : 0,
    best: correct ? Math.max(prev.best, prev.streak + 1) : prev.best,
  }));
};
```

## Outcome

The project sharpened my performance profiling skills and gave me a platform to experiment with data visualization patterns. It now serves as a demo for potential clients who want to see how quickly I can translate a game concept into a polished, production-ready experience.
