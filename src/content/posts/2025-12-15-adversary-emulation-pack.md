---
title: "Adversary Emulation Pack"
date: "Dec 15, 2025"
category: "Projects"
tags:
  - "PowerShell"
  - "Red Team"
  - "Active Directory"
  - "MITRE ATT&CK"
author: "Rafay Syed"
duration: "6 min"
slug: "adversary-emulation-pack"
---

## Overview

A PowerShell-based toolkit for emulating real-world adversary behavior in Windows and Active Directory environments. Built to run controlled red team exercises and validate detection coverage against known TTPs.

## Capabilities

- **Credential access** — simulates LSASS dumping, token impersonation, and pass-the-hash techniques
- **Lateral movement** — WMI and PSExec-style remote execution stubs
- **Persistence** — scheduled task creation, registry run key manipulation
- **Defense evasion** — AMSI bypass attempts and log clearing stubs, clearly marked for lab use only

## MITRE ATT&CK Alignment

Each module maps to a specific ATT&CK technique ID so blue teams can correlate emulation runs directly with their SIEM detection rules.

## GitHub

[View on GitHub →](https://github.com/eskitete/Adversary-Emulation-Pack)
