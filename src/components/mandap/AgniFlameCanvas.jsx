import React, { useEffect, useRef } from "react";

export default function AgniFlameCanvas({ activeIndex = 0 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle pool for sacred embers
    const particleCount = 85;
    const particles = [];

    class EmberParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 1.5 + 0.6;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.hue = Math.random() < 0.6 ? 35 : Math.random() < 0.8 ? 15 : 45; // Amber, Crimson, Gold
        this.pulseSpeed = Math.random() * 0.03 + 0.01;
      }

      update() {
        this.y -= this.speedY;
        this.x += Math.sin(this.y * 0.01) * 0.6 + this.speedX;
        this.opacity -= 0.0025;

        if (this.y < -20 || this.opacity <= 0) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 90%, 60%, ${this.opacity})`;
        ctx.shadowBlur = this.size * 5;
        ctx.shadowColor = `hsla(${this.hue}, 100%, 50%, 0.9)`;
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      const p = new EmberParticle();
      p.y = Math.random() * height; // Spread initially across viewport
      particles.push(p);
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle warm ambient radial light glow at center bottom
      const gradient = ctx.createRadialGradient(
        width / 2,
        height * 0.9,
        50,
        width / 2,
        height * 0.9,
        width * 0.6
      );
      gradient.addColorStop(0, "rgba(226, 137, 56, 0.08)");
      gradient.addColorStop(0.5, "rgba(184, 58, 40, 0.03)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="agni-canvas-fixed" />;
}
