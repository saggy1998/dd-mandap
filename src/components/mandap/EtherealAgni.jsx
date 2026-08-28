import React, { useEffect, useRef } from "react";

export default function EtherealAgni({ activeFrame = 0, totalFrames = 6 }) {
  const canvasRef = useRef(null);
  
  const intensity = Math.min(activeFrame / (totalFrames - 1), 1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let time = 0;

    let W = (canvas.width = canvas.parentElement.offsetWidth);
    let H = (canvas.height = canvas.parentElement.offsetHeight);

    const onResize = () => {
      W = canvas.width = canvas.parentElement.offsetWidth;
      H = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    const embers = [];
    const MAX_EMBERS = 60;

    class Ember {
      constructor() { this.reset(); }
      reset() {
        this.x = W / 2 + (Math.random() - 0.5) * W * 0.4;
        this.y = H + Math.random() * 20;
        this.size = Math.random() * 2.5 + 0.5;
        this.vy = Math.random() * 0.6 + 0.2; // Slowed down from 1.5 + 0.5
        this.vx = (Math.random() - 0.5) * 0.6; // Reduced horizontal drift
        this.life = 1;
        this.decay = Math.random() * 0.003 + 0.0015; // Slowed down decay
        this.hue = Math.random() < 0.5 ? 35 : Math.random() < 0.7 ? 20 : 45;
        this.brightness = Math.random() * 30 + 70;
      }
      update(currentIntensity) {
        const speed = 1 + currentIntensity * 0.8; // Reduced max intensity speed
        this.y -= this.vy * speed;
        this.x += Math.sin(this.y * 0.015 + time * 0.3) * 0.6 + this.vx; // Smoother sine wave
        this.life -= this.decay;
        if (this.life <= 0 || this.y < -20) this.reset();
      }
      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.life * 0.8})`;
        ctx.shadowBlur = this.size * 5;
        ctx.shadowColor = `hsla(${this.hue}, 100%, 60%, ${this.life})`;
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

    const render = () => {
      time += 0.01; // Slower overall time progression
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      
      const pulse = Math.sin(time * 1.2) * 0.05; // Slower pulsing glow
      const baseAlpha = 0.3 + intensity * 0.4 + pulse;
      
      const grad = ctx.createRadialGradient(cx, H + 20, 10, cx, H, W * 0.6);
      grad.addColorStop(0, `rgba(255, 140, 40, ${baseAlpha})`);
      grad.addColorStop(0.3, `rgba(200, 60, 20, ${baseAlpha * 0.6})`);
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      const activeCount = Math.floor(MAX_EMBERS * (0.3 + intensity * 0.7));
      for (let i = 0; i < activeCount; i++) {
        embers[i].update(intensity);
        embers[i].draw();
      }

      raf = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [intensity]);

  return (
    <div className="ethereal-agni-container">
      <canvas ref={canvasRef} className="ethereal-agni-canvas" />
    </div>
  );
}
