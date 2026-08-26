---
name: interactive-frontend
description: Standards for building polished, production-quality interactive frontend applications.
activation: always_on
---

# Interactive Frontend Engineering Rules

## Core Philosophy

Build interfaces that feel intentionally designed and production-ready.

Do NOT create generic "AI-generated" landing pages.

Avoid:
- excessive gradients
- random glassmorphism
- unnecessary glowing borders
- repetitive cards
- excessive rounded containers
- meaningless animations
- generic hero sections
- giant text with no visual hierarchy

Prefer:
- strong typography
- intentional spacing
- visual hierarchy
- asymmetric layouts when appropriate
- meaningful interaction
- restrained color systems
- high-quality motion
- responsive composition

## Default Stack

Prefer:

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- GSAP
- Three.js
- React Three Fiber
- @react-three/drei
- Lenis when smooth scrolling is appropriate

Do not introduce another UI framework unless there is a clear reason.

## Component Architecture

Create reusable components.

Prefer:

components/
├── ui/
├── layout/
├── sections/
├── animation/
└── 3d/

Keep page-level components focused on composition.

Avoid putting large amounts of implementation directly inside page.tsx.

## UI

Use shadcn/ui for standard primitives where appropriate.

Customize components to match the visual direction.

Do not make every element a Card.

Do not use a component simply because it exists in shadcn.

Use semantic HTML.

Maintain keyboard accessibility.

## Responsive Design

Design mobile and desktop intentionally.

Do not simply shrink desktop layouts.

Check:

- mobile
- tablet
- desktop
- wide desktop

Avoid horizontal overflow.

Use responsive typography and spacing.

## Animation

Animation must communicate hierarchy, interaction, or spatial relationships.

Do not animate everything.

Prefer:

- opacity
- transform
- scale
- clip-path
- mask
- position
- WebGL transforms

Avoid animating expensive layout properties unnecessarily.

Animation should feel intentional and fast.

## Performance

Prioritize 60fps interaction.

Prefer transform and opacity animations.

Avoid unnecessary React re-renders.

Lazy-load heavy components.

Lazy-load Three.js scenes when appropriate.

Do not load large 3D assets on the initial page unless necessary.

Use dynamic imports for heavy client components.

## Accessibility

Respect:

prefers-reduced-motion

Interactive elements must have:

- keyboard support
- visible focus states
- accessible labels
- sufficient contrast

Animation must never be required to understand the interface.

## Visual Quality

Before considering a page complete:

1. Inspect the entire page.
2. Check spacing consistency.
3. Check typography hierarchy.
4. Check responsive behavior.
5. Check animation timing.
6. Check loading states.
7. Check empty states.
8. Check accessibility.
9. Check performance.
10. Remove unnecessary visual elements.

The goal is not maximum visual complexity.

The goal is maximum perceived quality.