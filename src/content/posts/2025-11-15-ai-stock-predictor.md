---
title: "AI Stock Predictor"
date: "Nov 15, 2025"
category: "Projects"
tags:
  - "Python"
  - "Machine Learning"
  - "Finance"
  - "Data Science"
author: "Rafay Syed"
duration: "5 min"
slug: "ai-stock-predictor"
---

## Overview

A machine learning pipeline that ingests historical stock market data, engineers predictive features, and trains models to forecast near-term price movements.

## Pipeline Stages

1. **Data ingestion** — pulls OHLCV data via API and caches locally
2. **Feature engineering** — computes technical indicators (RSI, MACD, Bollinger Bands, moving averages)
3. **Model training** — evaluates multiple regressors (XGBoost, LSTM, Linear) with time-series cross-validation
4. **Prediction output** — generates a directional signal with confidence score for the next N trading sessions

## Key Decisions

- Used walk-forward validation instead of random splits to prevent data leakage
- Normalized features per-ticker to handle different price scales
- Ensembled models to reduce variance on volatile tickers

## GitHub

[View on GitHub →](https://github.com/eskitete)
