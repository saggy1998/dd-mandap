import React, { useEffect, useRef } from "react";

/**
 * AgniFlameCanvas — Sacred Havan Kund Fire Simulation
 *
 * A multi-layered ceremonial fire rendered on a full-viewport canvas.
 * Features:
 *   - 3-layer flame body (inner core, amber mid, crimson outer)
 *   - Rising ember particles with sinusoidal drift
 *   - Periodic ghee-offering burst with golden sparks
 *   - Heat shimmer distortion above the flame zone
 *   - Scroll-reactive intensity via `scrollIntensity` prop (0–1)
 */
export default function AgniFlameCanvas({ scrollIntensity = 0 }) {
  const canvasRef = useRef(null);
  const intensityRef = useRef(scrollIntensity);
  intensityRef.current = scrollIntensity;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let time = 0;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    /* ── Cheap sine-based pseudo-noise ── */
    const noise = (x, y) =>
      Math.sin(x * 1.3 + y * 0.7) * 0.5 +
      Math.sin(x * 0.6 - y * 1.1) * 0.3 +
      Math.sin(x * 2.1 + y * 0.3) * 0.2;

    /* ══════════════════════════════════════
       EMBER PARTICLE POOL
       ══════════════════════════════════════ */
    const MAX_EMBERS = 120;
    const embers = [];

    class Ember {
      constructor() { this.reset(); }
      reset() {
        const cx = W / 2;
        this.x = cx + (Math.random() - 0.5) * W * 0.18;
        this.y = H - Math.random() * 40;
        this.size = Math.random() * 2.8 + 0.8;
        this.vy = Math.random() * 1.4 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.life = 1;
        this.decay = Math.random() * 0.004 + 0.002;
        this.hue = Math.random() < 0.5 ? 35 : Math.random() < 0.7 ? 20 : 45;
        this.brightness = Math.random() * 20 + 55;
      }
      update(intensity) {
        const speed = 1 + intensity * 0.8;
        this.y -= this.vy * speed;
        this.x += Math.sin(this.y * 0.012 + time * 0.5) * 0.7 + this.vx;
        this.life -= this.decay;
        if (this.life <= 0 || this.y < -20) this.reset();
      }
      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 95%, ${this.brightness}%, ${this.life * 0.85})`;
        ctx.shadowBlur = this.size * 6;
        ctx.shadowColor = `hsla(${this.hue}, 100%, 55%, ${this.life * 0.7})`;
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < MAX_EMBERS; i++) {
      const e = new Ember();
      e.y = Math.random() * H;
      e.life = Math.random();
      embers.push(e);
    }

    /* ══════════════════════════════════════
       GHEE BURST SPARKS
       ══════════════════════════════════════ */
    const sparks = [];
    let lastBurst = 0;

    class Spark {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 4.5;
        this.vy = -(Math.random() * 5 + 3);
        this.life = 1;
        this.size = Math.random() * 2.5 + 1;
        this.hue = Math.random() < 0.6 ? 45 : 30;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.06;
        this.life -= 0.018;
      }
      draw() {
        if (this.life <= 0) return;
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 100%, 70%, ${this.life})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsla(${this.hue}, 100%, 60%, ${this.life * 0.8})`;
        ctx.fill();
        ctx.restore();
      }
    }

    const triggerGheeBurst = () => {
      const cx = W / 2;
      const by = H - 10;
      for (let i = 0; i < 18; i++) {
        sparks.push(new Spark(cx + (Math.random() - 0.5) * 60, by));
      }
    };

    /* ══════════════════════════════════════
       DRAW A SINGLE FLAME LAYER
       ══════════════════════════════════════ */
    const drawFlameLayer = (cx, baseY, width, height, color1, color2, phaseOffset, alphaBase) => {
      const segments = 28;
      ctx.save();
      ctx.beginPath();

      // Left side rising
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const nx = noise(t * 4 + time * 1.8 + phaseOffset, time * 0.9);
        const taper = Math.sin(t * Math.PI);
        const x = cx - width / 2 * (1 - t) + nx * width * 0.22 * taper;
        const y = baseY - t * height + nx * height * 0.08;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      // Tip
      const tipNoise = noise(time * 2.2 + phaseOffset, time * 1.4);
      ctx.lineTo(cx + tipNoise * width * 0.12, baseY - height - tipNoise * height * 0.15);

      // Right side descending
      for (let i = segments; i >= 0; i--) {
        const t = i / segments;
        const nx = noise(t * 4 + time * 1.8 + phaseOffset + 3, time * 0.9 + 2);
        const taper = Math.sin(t * Math.PI);
        const x = cx + width / 2 * (1 - t) + nx * width * 0.22 * taper;
        const y = baseY - t * height + nx * height * 0.08;
        ctx.lineTo(x, y);
      }

      ctx.closePath();

      const grad = ctx.createLinearGradient(cx, baseY, cx, baseY - height);
      grad.addColorStop(0, color1);
      grad.addColorStop(0.5, color2);
      grad.addColorStop(1, "rgba(255, 200, 50, 0)");
      ctx.fillStyle = grad;
      ctx.globalAlpha = alphaBase;
      ctx.fill();
      ctx.restore();
    };

    /* ══════════════════════════════════════
       RENDER LOOP
       ══════════════════════════════════════ */
    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, W, H);

      const intensity = intensityRef.current;
      const cx = W / 2;
      const baseY = H + 5;

      // Base flame height scales with scroll intensity
      const flameH = H * (0.22 + intensity * 0.18);
      const flameW = W * (0.12 + intensity * 0.06);

      // ── Ambient radial glow at fire base ──
      const ambGrad = ctx.createRadialGradient(cx, H, 20, cx, H, W * 0.55);
      ambGrad.addColorStop(0, `rgba(226, 137, 56, ${0.1 + intensity * 0.06})`);
      ambGrad.addColorStop(0.4, `rgba(184, 58, 40, ${0.04 + intensity * 0.02})`);
      ambGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = ambGrad;
      ctx.fillRect(0, 0, W, H);

      // ── Layer 1: Outer crimson flames ──
      drawFlameLayer(
        cx, baseY,
        flameW * 1.3, flameH * 0.92,
        "rgba(184, 58, 40, 0.55)", "rgba(224, 83, 60, 0.25)",
        0, 0.7 + intensity * 0.15
      );

      // ── Layer 2: Mid amber body ──
      drawFlameLayer(
        cx, baseY,
        flameW * 0.85, flameH * 0.95,
        "rgba(226, 137, 56, 0.75)", "rgba(245, 211, 138, 0.35)",
        1.5, 0.8 + intensity * 0.1
      );

      // ── Layer 3: Inner white-gold core ──
      drawFlameLayer(
        cx, baseY,
        flameW * 0.4, flameH * 0.85,
        "rgba(255, 240, 180, 0.9)", "rgba(255, 255, 220, 0.5)",
        3.0, 0.85 + intensity * 0.1
      );

      // ── Core glow point ──
      const coreGrad = ctx.createRadialGradient(cx, H - 5, 2, cx, H - 5, flameW * 0.5);
      coreGrad.addColorStop(0, `rgba(255, 250, 220, ${0.6 + intensity * 0.2})`);
      coreGrad.addColorStop(0.5, `rgba(245, 211, 138, ${0.15 + intensity * 0.1})`);
      coreGrad.addColorStop(1, "rgba(245, 211, 138, 0)");
      ctx.fillStyle = coreGrad;
      ctx.fillRect(0, 0, W, H);

      // ── Embers ──
      const activeCount = Math.floor(MAX_EMBERS * (0.5 + intensity * 0.5));
      for (let i = 0; i < activeCount; i++) {
        embers[i].update(intensity);
        embers[i].draw();
      }

      // ── Ghee burst (every ~6-8 seconds) ──
      if (time - lastBurst > 6 + Math.random() * 2) {
        triggerGheeBurst();
        lastBurst = time;
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        sparks[i].update();
        sparks[i].draw();
        if (sparks[i].life <= 0) sparks.splice(i, 1);
      }

      // ── Heat shimmer (subtle scan-line displacement) ──
      const shimmerStrength = 1.5 + intensity * 2;
      if (shimmerStrength > 0.5 && H > 200) {
        const shimmerZone = Math.min(H * 0.25, flameH * 0.6);
        const srcY = Math.max(0, Math.floor(H - flameH - shimmerZone));
        const srcH = Math.floor(shimmerZone);
        if (srcH > 0 && srcY >= 0 && srcY + srcH <= H) {
          try {
            const imgData = ctx.getImageData(0, srcY, W, srcH);
            const dx = Math.sin(time * 3) * shimmerStrength;
            const dy = Math.cos(time * 2.5) * shimmerStrength * 0.5;
            ctx.putImageData(imgData, dx, srcY + dy);
          } catch (_) {
            // Skip shimmer if getImageData fails (e.g., tainted canvas)
          }
        }
      }

      raf = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line
  }, []);

  return <canvas ref={canvasRef} className="agni-canvas-fixed" />;
}
