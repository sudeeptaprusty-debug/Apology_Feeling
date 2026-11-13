import React, { useEffect, useRef } from 'react';

export default function FallingPetals() {
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

    // Number of petals: moderate, tranquil, not overcrowded
    const petalCount = Math.min(24, Math.max(12, Math.floor(width / 60)));
    const petals = [];

    const petalColors = [
      { r: 247, g: 219, b: 213, a: 0.65 }, // Soft blush
      { r: 238, g: 202, b: 194, a: 0.6 },  // Rose cream
      { r: 252, g: 235, b: 230, a: 0.7 },  // Pale blossom
      { r: 228, g: 186, b: 178, a: 0.55 }, // Muted petal
    ];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height, // start staggered
        size: Math.random() * 8 + 9,        // natural petal size
        speedY: Math.random() * 0.45 + 0.35, // very slow peaceful descent
        speedX: Math.random() * 0.3 - 0.15,
        oscillationSpeed: Math.random() * 0.02 + 0.01,
        oscillationDistance: Math.random() * 25 + 15,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        flip: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.02 + 0.01,
        seed: Math.random() * 100,
      });
    }

    // Helper to draw an organic curved petal
    const drawPetal = (ctx, x, y, size, angle, flip, color) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(Math.cos(flip), 1); // 3D flip effect

      const grad = ctx.createLinearGradient(0, -size, 0, size);
      grad.addColorStop(0, `rgba(${color.r + 10}, ${color.g + 10}, ${color.b + 10}, ${color.a})`);
      grad.addColorStop(0.7, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`);
      grad.addColorStop(1, `rgba(${color.r - 20}, ${color.g - 20}, ${color.b - 20}, ${color.a * 0.9})`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, -size);
      // Delicate organic curve
      ctx.bezierCurveTo(size * 0.7, -size * 0.6, size * 0.75, size * 0.5, 0, size);
      ctx.bezierCurveTo(-size * 0.75, size * 0.5, -size * 0.7, -size * 0.6, 0, -size);
      ctx.closePath();
      ctx.fill();

      // Subtle center vein
      ctx.strokeStyle = `rgba(255, 255, 255, 0.25)`;
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.7);
      ctx.lineTo(0, size * 0.7);
      ctx.stroke();

      ctx.restore();
    };

    let tick = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick += 1;

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        // Peaceful sway
        p.y += p.speedY;
        p.x += Math.sin(tick * p.oscillationSpeed + p.seed) * 0.6 + p.speedX;
        p.angle += p.rotationSpeed;
        p.flip += p.flipSpeed;

        // Reset when exiting bottom or sides
        if (p.y > height + 30) {
          p.y = -30;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;

        drawPetal(ctx, p.x, p.y, p.size, p.angle, p.flip, p.color);
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
      className="pointer-events-none fixed inset-0 z-10 opacity-85"
      aria-hidden="true"
    />
  );
}
