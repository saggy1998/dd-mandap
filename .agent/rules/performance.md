---
name: frontend-performance
description: Performance standards for interactive React and Next.js applications.
activation: model_decision
---

# Frontend Performance

## Core Goal

Interactive experiences should feel fast even when visually complex.

## JavaScript

Avoid unnecessary client components.

Prefer Server Components where possible.

Only use "use client" when interaction or browser APIs require it.

Avoid unnecessary global state.

Avoid unnecessary dependencies.

## Images

Use Next.js image optimization when appropriate.

Prefer modern image formats.

Use responsive image sizes.

Lazy-load below-the-fold images.

## 3D

Three.js scenes should be isolated into client components.

Lazy-load expensive 3D scenes.

Avoid loading large models before they are needed.

Use appropriate geometry complexity.

Avoid unnecessary real-time rendering.

Use instancing for repeated objects when appropriate.

## Animation

Prefer compositor-friendly properties:

- transform
- opacity

Avoid forced synchronous layout.

Avoid unnecessary scroll listeners.

Prefer GSAP ScrollTrigger or IntersectionObserver where appropriate.

## Rendering

Avoid unnecessary React renders.

Memoize expensive components when profiling shows a benefit.

Do not blindly add memoization everywhere.

## Loading

Provide meaningful loading states.

Do not display blank screens while heavy assets load.

Use progressive enhancement when possible.

## Before Completion

Run:

- production build
- lint
- type checking

Inspect the page in a real browser.

Test:

- mobile
- desktop
- slow network
- reduced motion