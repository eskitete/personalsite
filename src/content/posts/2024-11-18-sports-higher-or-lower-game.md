---
title: "Sports Higher or Lower Game"
date: "Nov 18, 2024"
category: "Projects"
tags:
  - "TypeScript"
  - "React"
  - "Tailwind CSS"
  - "Python"
author: "Rafay Syed"
duration: "6 min"
slug: "sports-higher-or-lower-game"
---

## Overview

I built an interactive **Higher or Lower** web game that lets users compare NBA and NFL players across key statistics. The goal was to create a fun, fast-loading interface backed by clean data pipelines.

## What I Built

- Real-time player comparisons powered by a **TypeScript/React** stack
- Smooth animations and responsive layout with **Tailwind CSS**
- Aggressive memoization to keep the interface snappy even with large datasets
- A **Python data pipeline** that pre-fetches, normalizes, and serializes player stats into JSON — so the frontend never waits on slow API calls

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

## GitHub

[View on GitHub →](https://github.com/eskitete/HigherLower)

## Outcome

The project sharpened my performance profiling skills and gave me a platform to experiment with data visualization patterns. Bundled with Vite for near-instant load times.
