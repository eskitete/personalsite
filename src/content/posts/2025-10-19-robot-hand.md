---
title: "Robot Hand"
date: "Oct 19, 2025"
category: "Projects"
tags:
  - "Python"
  - "OpenCV"
  - "Computer Vision"
  - "Servo Control"
author: "Rafay Syed"
duration: "5 min"
slug: "robot-hand"
---

## Overview

A Python-controlled robotic hand that uses real-time computer vision to recognize hand gestures and translate them into physical finger movements via servo motors.

## How It Works

1. A webcam feeds frames into a **MediaPipe** hand landmark detection pipeline
2. 21 keypoints are extracted per hand, tracking each finger joint's bend angle
3. Joint angles are mapped to servo pulse widths and sent over serial
4. The physical hand mirrors the operator's pose with minimal latency

## Key Features

- Real-time tracking at ~30 FPS with stable landmark estimation
- Per-finger calibration so each servo range maps precisely to the mechanical limits
- Gesture mode — predefined poses (fist, open, point) trigger discrete actions
- Modular design separates vision, mapping, and servo layers cleanly

## GitHub

[View on GitHub →](https://github.com/eskitete/robot_hand)
