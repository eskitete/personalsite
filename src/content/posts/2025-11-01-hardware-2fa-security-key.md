---
title: "Hardware-Backed 2FA Security Key"
date: "Nov 1, 2025"
category: "Projects"
tags:
  - "Embedded Systems"
  - "Cryptography"
  - "ESP8266"
  - "Ed25519"
  - "Security"
author: "Rafay Syed"
duration: "7 min"
slug: "hardware-2fa-security-key"
---

## Overview

I designed and developed a custom hardware 2FA token on the ESP8266 microcontroller. The device authorizes cryptographic challenges via a USB-Serial interface, acting as a self-contained secure element.

## How It Works

1. The host sends a cryptographic challenge over USB-Serial
2. The ESP8266 signs it using a stored **Ed25519** private key
3. The signed response is returned to the host for verification

No secrets ever leave the device in plaintext.

## Security Design

- **Emulated Secure Element** using the ESP8266's Flash memory to persistently store dynamically generated Ed25519 keypairs
- **Non-volatile security state** — the device tracks usage counters and lock states across power cycles
- **Side-channel mitigations** — constant-time comparison routines to prevent timing attacks
- **Brute-force lockout** — failed authentication attempts trigger progressive lockout delays

```c
void sign_challenge(const uint8_t *challenge, size_t len, uint8_t *sig_out) {
    ed25519_sign(sig_out, challenge, len, keypair.private_key);
}
```

## GitHub

[View on GitHub →](https://github.com/eskitete)
