---
name: animation-engineering
description: Guidelines for implementing sophisticated web animation using Framer Motion, GSAP and Three.js.
activation: model_decision
---

# Animation Engineering

## Choose the Correct Tool

Use Framer Motion for:

- component entrance
- component exit
- hover interactions
- buttons
- dialogs
- layout transitions
- simple page transitions
- React state-driven animation

Use GSAP for:

- complex timelines
- scroll-driven sequences
- pinned sections
- parallax
- text reveals
- SVG animation
- coordinated multi-element sequences
- precise timeline control

Use Three.js / React Three Fiber for:

- 3D objects
- particles
- WebGL backgrounds
- interactive 3D scenes
- shaders
- 3D product experiences
- spatial interactions

Do not use Three.js when CSS or normal DOM animation is sufficient.

## Animation Principles

Animations should have:

- clear purpose
- consistent easing
- intentional duration
- logical sequencing

Prefer short interactions.

Micro-interactions should generally feel immediate.

Large cinematic sequences can use longer durations when appropriate.

## Scroll Animation

Do not animate every section.

Use scroll animation to reveal:

- hierarchy
- narrative
- spatial relationships
- product features
- transitions between sections

Avoid excessive scroll-jacking.

## Performance

Prefer transform and opacity.

Avoid animating:

- width
- height
- top
- left
- margin

unless there is a specific reason.

Use requestAnimationFrame appropriately.

Clean up event listeners.

Clean up GSAP contexts.

Dispose Three.js resources when components unmount.

## Reduced Motion

Always support:

prefers-reduced-motion

When reduced motion is enabled:

- disable large movement
- reduce parallax
- simplify transitions
- avoid rapid sequences

The website must remain completely usable.

## 3D

Use React Three Fiber when integrating Three.js with React.

Prefer Drei helpers when they simplify implementation.

Keep geometry counts reasonable.

Use compressed assets where appropriate.

Avoid unnecessary real-time effects.

Use post-processing selectively.

Do not add bloom, particles, distortion or shaders merely because they look impressive.

Every effect must support the visual concept.