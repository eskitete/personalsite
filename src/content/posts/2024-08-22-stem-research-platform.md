---
title: "STEM Research & Learning Platform"
date: "Aug 22, 2024"
category: "Projects"
tags:
  - "Education"
  - "Hardware"
  - "3D Printing"
  - "Block Coding"
author: "Rafay Syed"
duration: "8 min"
---

## Bringing STEM to Life

K–12 educators needed a customizable environment where students could prototype ideas quickly. I delivered a hybrid platform that mixes hardware, software, and lesson plans to make STEM approachable for every learning style.

## Platform Components

- **Block-based coding editor** with scaffolding for microcontrollers and robotics  
- **3D-printed kits** that snap together, removing the intimidation factor for first-time builders  
- Real-time classroom dashboards so teachers can monitor progress and surface teachable moments  
- Extensive documentation and tutorial videos to empower educators without a technical background

### Architecture Snapshot

```mermaid
flowchart LR
  UI[Block Coding UI] --> API[(Hasura GraphQL API)]
  API --> DB[(Postgres)]
  API --> Realtime{Subscriptions}
  UI --> Devices[(Microcontroller Bridge)]
  Devices --> Students[(Lesson Kits)]
```

## Impact

The rollout improved classroom participation and gave administrators confidence to expand the program district-wide. The toolkit now serves as a flagship example of how I translate emerging technology trends into tangible, student-friendly experiences.
