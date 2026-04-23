---
title: "IRL Streaming Platform"
date: "Dec 1, 2025"
category: "Projects"
tags:
  - "Go"
  - "React"
  - "SQLite"
  - "TypeScript"
  - "Streaming"
author: "Rafay Syed"
duration: "8 min"
slug: "irl-streaming-platform"
---

## Overview

I architected a full end-to-end IRL (In-Real-Life) streaming ecosystem — from an edge capture device all the way to multi-role React web portals for creators and editors.

## Architecture

The system is composed of three major layers:

- **Edge Device** — Captures and encodes live video/audio at the source location
- **Go-based NAS Backend** — Handles media ingestion, segmentation, and storage with fault-tolerance baked in
- **React Web Portals** — Separate Login, Edge UI, and Editor UI, each with role-based access control (RBAC)

## Key Engineering Decisions

- **Role-Based Access Control (RBAC)** enforced across all three portals to prevent privilege escalation
- **Fault-tolerant media segmentation** using SQLite — video chunks are cached locally during connectivity outages and auto-synced the moment the connection restores
- **Responsive interfaces** built in React with TypeScript for type safety and maintainability

```go
func backfillSegments(db *sql.DB, uploader Uploader) error {
    rows, _ := db.Query("SELECT id, path FROM segments WHERE synced = 0")
    for rows.Next() {
        var id int; var path string
        rows.Scan(&id, &path)
        if err := uploader.Upload(path); err == nil {
            db.Exec("UPDATE segments SET synced = 1 WHERE id = ?", id)
        }
    }
    return nil
}
```

## GitHub

[View on GitHub →](https://github.com/eskitete/vidproject)
