import { useEffect, useRef } from 'react';

const PALETTE = [
  '244, 174, 196', // Blush pink
  '204, 180, 240', // Soft lavender
  '246, 198, 170', // Warm peach
  '180, 212, 192', // Sage mint
];

export function SmokyBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: width * 0.65, y: height * 0.35, active: false };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const nodeCount = Math.min(58, Math.max(30, Math.floor((width * height) / 28000)));
    const nodes = Array.from({ length: nodeCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: 1.3 + (i % 3) * 0.6,
      rgb: PALETTE[i % PALETTE.length],
      phase: Math.random() * Math.PI * 2,
      isSparkle: i % 5 === 0,
    }));

    let tick = 0;

    const drawFourPointSparkle = (x: number, y: number, r: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      ctx.moveTo(0, -r * 2.4);
      ctx.quadraticCurveTo(0, 0, r * 2.4, 0);
      ctx.quadraticCurveTo(0, 0, 0, r * 2.4);
      ctx.quadraticCurveTo(0, 0, -r * 2.4, 0);
      ctx.quadraticCurveTo(0, 0, 0, -r * 2.4);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    };

    const renderFrame = () => {
      ctx.clearRect(0, 0, width, height);
      tick += 0.016;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;

          if (mouse.active) {
            const dx = mouse.x - node.x;
            const dy = mouse.y - node.y;
            const dist = Math.hypot(dx, dy);
            if (dist > 36 && dist < 250) {
              node.x += (dx / dist) * 0.16;
              node.y += (dy / dist) * 0.16;
            }
          }
        }

        const shimmer = 0.34 + 0.2 * Math.sin(tick + node.phase);

        // Soft pastel halo
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${node.rgb}, ${shimmer * 0.3})`;
        ctx.fill();

        if (node.isSparkle) {
          drawFourPointSparkle(node.x, node.y, node.radius * 1.35, `rgba(${node.rgb}, ${shimmer + 0.18})`);
        } else {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${node.rgb}, ${shimmer + 0.14})`;
          ctx.fill();
        }

        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 155) {
            const alpha = (1 - dist / 155) * 0.12;
            const grad = ctx.createLinearGradient(node.x, node.y, other.x, other.y);
            grad.addColorStop(0, `rgba(${node.rgb}, ${alpha})`);
            grad.addColorStop(1, `rgba(${other.rgb}, ${alpha})`);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Soft colorful smoky clouds (blush pink, lavender mist, warm peach, sage mint) */}
      <div className="animate-smoke-slow absolute -top-[18%] -left-[12%] h-[62vw] w-[62vw] max-h-[820px] max-w-[820px] rounded-full bg-[radial-gradient(circle,rgba(244,174,196,0.13)_0%,rgba(204,180,240,0.07)_42%,transparent_72%)] blur-3xl" />
      <div className="animate-smoke-reverse absolute top-[24%] -right-[14%] h-[58vw] w-[58vw] max-h-[780px] max-w-[780px] rounded-full bg-[radial-gradient(circle,rgba(204,180,240,0.13)_0%,rgba(246,198,170,0.06)_46%,transparent_74%)] blur-3xl" />
      <div className="animate-smoke-slow absolute -bottom-[20%] left-[20%] h-[54vw] w-[54vw] max-h-[720px] max-w-[720px] rounded-full bg-[radial-gradient(circle,rgba(246,198,170,0.1)_0%,rgba(180,212,192,0.065)_44%,transparent_72%)] blur-3xl" />

      {/* Subtle architectural grid veil */}
      <div
        className="absolute inset-0 opacity-[0.024]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* Interactive animated colorful constellation & 4-point sparkle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-95" />

      {/* Soft top/bottom smoky vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(8,9,11,0.72)_100%)]" />
    </div>
  );
}
