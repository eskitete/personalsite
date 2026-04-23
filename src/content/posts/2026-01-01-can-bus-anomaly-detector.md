---
title: "CAN-Bus Anomaly Detector"
date: "Jan 1, 2026"
category: "Projects"
tags:
  - "Python"
  - "CAN Bus"
  - "Cybersecurity"
  - "Anomaly Detection"
author: "Rafay Syed"
duration: "6 min"
slug: "can-bus-anomaly-detector"
---

## Overview

Modern vehicles rely on a Controller Area Network (CAN) bus to let ECUs communicate — but the protocol has zero authentication, making it a prime target for attacks. This tool analyzes CAN traffic to surface anomalous patterns that could indicate intrusion or malfunction.

## How It Works

- Captures raw CAN frames from a hardware interface or log file
- Builds a baseline model of normal message frequency, ID distribution, and payload patterns
- Flags frames that deviate statistically from the learned baseline
- Outputs a timestamped anomaly report with severity scoring

## Why It Matters

CAN bus attacks — like those demonstrated on Jeep Cherokees and Tesla vehicles — can affect braking, steering, and acceleration. Early anomaly detection is the first line of defense for automotive security.

## GitHub

[View on GitHub →](https://github.com/eskitete)
