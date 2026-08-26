---
name: threejs
description: Build performant interactive 3D web experiences using Three.js and React Three Fiber.
---

# Three.js / React Three Fiber

## Default Stack

Prefer:

- three
- @react-three/fiber
- @react-three/drei

Use postprocessing only when required.

## Architecture

Keep the Canvas isolated.

Prefer:

components/3d/
├── Scene.tsx
├── Camera.tsx
├── Lighting.tsx
├── Objects/
└── Effects/

Do not mix large Three.js implementations into normal UI components.

## Interaction

Use pointer interactions intentionally.

Possible interactions:

- hover
- click
- drag
- scroll
- camera movement
- object rotation

Do not make the entire page depend on 3D interaction.

## Performance

Use:

- instancing
- memoization where appropriate
- asset compression
- lazy loading
- appropriate geometry complexity

Avoid:

- unnecessary high-poly geometry
- excessive lights
- excessive post-processing
- huge textures
- unnecessary real-time calculations

## Rendering

Use the correct color space and tone mapping.

Use physically appropriate lighting where required.

Avoid excessive ambient effects.

## UX

3D should enhance the page.

If the 3D scene fails to load, the website should still communicate its primary message.

Support reduced motion.

## Debugging

When a 3D scene has problems:

1. Check browser console.
2. Check WebGL errors.
3. Check asset paths.
4. Check camera position.
5. Check lighting.
6. Check geometry scale.
7. Check animation loops.
8. Check resource disposal.