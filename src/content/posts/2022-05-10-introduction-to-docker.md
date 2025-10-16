---
title: "Introduction to Docker"
date: "May 10, 2022"
category: "Cloud"
tags:
  - "Docker"
  - "Containers"
  - "Basics"
author: "Rafay Syed"
duration: "7 min"
---

## Containers in a Nutshell

Docker packages applications and their dependencies into portable containers, eliminating the dreaded “works on my machine” problem. A Docker image layers the operating system, runtime, libraries, and application code into a single artifact that runs consistently anywhere the Docker engine is installed.

### Anatomy of a Dockerfile

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
CMD ["npm", "start"]
```

- `FROM` chooses the base image.  
- `COPY` and `RUN` add files and install dependencies.  
- `CMD` (or `ENTRYPOINT`) defines the default process.

Lean images start fast and reduce attack surface. Multi-stage builds compile code in an intermediate stage, then copy only the artifacts into the final lightweight image.

## Run and Orchestrate Containers

Containers are flexible once built:

- Bind host ports to container ports for local testing.  
- Mount volumes to persist data between restarts.  
- Pass configuration via environment variables for twelve-factor apps.  
- Use **Docker Compose** to describe multi-service setups in declarative YAML—ideal for local dev and CI.

## Infrastructure as Code Mindset

Version-controlling Dockerfiles and compose files documents exactly how environments are built. Combine Docker with orchestration platforms like Kubernetes or ECS to scale reliably, automate rollouts, and keep environments consistent from laptop to production.
