---
title: "ML-Based Network Intrusion Detection & Traffic Classification"
date: "Apr 23, 2026"
category: "Projects"
tags:
  - "Python"
  - "Machine Learning"
  - "Cybersecurity"
  - "XGBoost"
  - "Network Security"
author: "Rafay Syed"
duration: "8 min"
slug: "ml-network-security"
---

## Overview

This research project examines how machine learning can be applied to two critical network security problems: **DDoS attack detection** and **encrypted traffic classification**. Conducted at Texas A&M University alongside Nicholas Martinez and Carmichael Rivera.

The core challenge — modern networks face automated attacks and pervasive HTTPS encryption simultaneously, rendering traditional defenses like firewalls and Deep Packet Inspection (DPI) insufficient at scale.

## The Two Tracks

### Track A — DDoS Attack Detection

Using the **CIC-DDoS2019** dataset (110,284-row test set), we trained classifiers to label traffic as `Normal` or `Attack` without relying on IP addresses, which attackers routinely spoof.

| Model | Accuracy | F1-Score |
|---|---|---|
| Dummy Baseline | 83.56% | 0.91 |
| Decision Tree | **99.97%** | ~1.00 |
| Random Forest | **99.97%** | ~1.00 |
| XGBoost | **99.97%** | ~1.00 |

All three trained models dramatically outperformed the baseline. **XGBoost** was selected as the deployment choice — it matched near-perfect accuracy while training in ~8.3s vs Random Forest's ~119s.

### Track B — Encrypted Traffic Classification (Streaming vs Browsing)

Using the **ISCXVPN2016** dataset, we classified encrypted flows as `Streaming` or `Browsing` using only metadata (no packet payloads). This is the harder problem — the minority streaming class is easy to miss.

| Model | Accuracy | F1-Score |
|---|---|---|
| Dummy Baseline | 71.64% | 0.14 |
| Decision Tree | 97.15% | 0.91 |
| Random Forest | 98.32% | 0.95 |
| XGBoost | **98.49%** | **0.95** |

**XGBoost** again performed best, making the fewest misses on the minority streaming class — the most operationally critical metric.

## Key Finding: Feature Importance

The top signal for distinguishing streaming from browsing was `flowBytesPerSecond`. This makes intuitive sense: streaming traffic is continuous and high-bandwidth, while browsing is bursty and session-based. The model is learning real behavioral patterns — not statistical noise.

## Efficiency Results

| Track | Model | Train Time | Inference Time |
|---|---|---|---|
| A | Random Forest | 119.01s | 0.517s |
| A | XGBoost | 8.32s | 0.226s |
| A | Decision Tree | 10.57s | **0.013s** |
| B | XGBoost | 0.28s | 0.006s |

**Recommendation:**
- **Edge / IoT deployments** → Decision Tree (near-zero inference cost)
- **General deployment** → XGBoost (best accuracy-efficiency tradeoff)

## Ethical Considerations

Even without inspecting payloads, flow-based models can infer sensitive user behavior (streaming, gaming, browsing). Deployed IDS systems must be monitored for bias, generalization failure across different networks, and adversarial manipulation of the model itself. ML should augment human judgment — not replace it.

## Notebook

[View on Google Colab →](https://colab.research.google.com/drive/1lCADmNq-eOjPeYANZ1Vbpmh-gvmbtNls?usp=sharing)

## Datasets

- CIC-DDoS2019 — Canadian Institute for Cybersecurity
- ISCXVPN2016 — Canadian Institute for Cybersecurity
