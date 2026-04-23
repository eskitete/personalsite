---
title: "Robot Head (CV Eye/Jaw Control)"
date: "Sep 1, 2023"
category: "Projects"
tags:
  - "Python"
  - "OpenCV"
  - "Computer Vision"
  - "Servo Control"
author: "Rafay Syed"
duration: "5 min"
slug: "robot-head"
---

## Overview

Built an animatronic robot head controlled entirely by computer vision. The head tracks faces and objects in real-time using a webcam, translating movement into servo-driven eye and jaw motion.

## How It Works

1. A webcam feeds frames into an **OpenCV** pipeline running on a Raspberry Pi
2. Face detection identifies the target and computes its position relative to center
3. Servo angles are calculated and sent over serial to drive the eye gimbals and jaw mechanism
4. The result is a head that looks at whoever is speaking and reacts to audio amplitude

## Key Features

- Real-time face tracking at ~30 FPS with minimal latency
- Smooth servo interpolation to avoid jerky mechanical movement
- Modular Python architecture — swap out detection models without touching the servo layer
- Configurable sensitivity and range limits per axis

```python
def track_face(frame, servo_controller):
    faces = detector.detect(frame)
    if faces:
        cx, cy = get_center(faces[0])
        pan = map_range(cx, 0, frame.width, SERVO_MIN, SERVO_MAX)
        tilt = map_range(cy, 0, frame.height, SERVO_MIN, SERVO_MAX)
        servo_controller.set(pan=pan, tilt=tilt)
```

## GitHub

[View on GitHub →](https://github.com/eskitete/Robot-Head)
