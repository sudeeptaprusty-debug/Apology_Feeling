import React, { useEffect, useRef } from 'react';

export default function BackgroundParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create subtle warm glowing particles (tiny stars & warm dusk motes)
    const particleCount = Math.min(45, Math.floor((width * height) / 25000));
    const particles = [];

    const colors = [
      'rgba(238, 207, 196, ', // blush
      'rgba(245, 235, 224, ', // soft cream
      'rgba(224, 192, 179, ', // muted rose
      'rgba(255, 248, 238, ', // starlight
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.6,
        colorBase: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2,
        targetAlpha: Math.random() * 0.5 + 0.2,
        twinkleSpeed: Math.random() * 0.008 + 0.004,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -Math.random() * 0.22 - 0.05, // gentle upward float like warm embers / night dust
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Soft twinkle
        if (Math.abs(p.alpha - p.targetAlpha) < 0.02) {
          p.targetAlpha = Math.random() * 0.55 + 0.15;
        } else {
          p.alpha += (p.targetAlpha - p.alpha) * p.twinkleSpeed;
        }

        // Float movement
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw soft glow
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.radius * 3
        );
        gradient.addColorStop(0, p.colorBase + p.alpha + ')');
        gradient.addColorStop(1, p.colorBase + '0)');

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Particle core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.colorBase + (p.alpha * 1.2) + ')';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-80"
      aria-hidden="true"
    />
  );
}
