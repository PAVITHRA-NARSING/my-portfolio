import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

export function VeyrithShowcase() {
  const [imgError, setImgError] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const frameRef = useRef<HTMLDivElement | null>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: -y * 5,
      rotateY: x * 6,
    });
  };

  const handlePointerLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <section className="smoky-glass-elevated relative overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
        {/* Left Copy Column */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          <div>
            <p className="text-xs font-medium text-[#b8c4a4]">
              {PROFILE.venture.role} · {PROFILE.venture.stage} · {PROFILE.venture.established}
            </p>
            <h2 className="mt-2.5 font-display text-3xl font-semibold tracking-tight text-[#eae8e1] sm:text-4xl">
              {PROFILE.venture.name}
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#9ea39f]">
              Co-founded at age 19, Veyrith Labs is an independent pre-development engineering
              company focused on building thoughtful software and investigating the systems behind
              applied intelligence—prioritizing clear evidence and real utility ahead of public launch.
            </p>
          </div>

          {/* Subtle Animated Signal Waveform */}
          <div className="rounded-xl border border-white/[0.07] bg-[#07080a]/60 p-4">
            <div className="flex items-center justify-between text-xs text-[#9ea39f]">
              <span>Engineering Intelligence</span>
              <span className="font-mono text-[#b8c4a4]">Pre-Launch R&amp;D</span>
            </div>
            <svg
              viewBox="0 0 280 48"
              className="mt-2.5 h-10 w-full"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="veyrith-wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#b4d4c0" />
                  <stop offset="50%" stopColor="#c4b0e8" />
                  <stop offset="100%" stopColor="#e8a8b8" />
                </linearGradient>
              </defs>
              <motion.path
                d="M0 24 Q35 6 70 24 T140 24 T210 24 T280 24"
                fill="none"
                stroke="url(#veyrith-wave-grad)"
                strokeWidth="1.8"
                initial={{ pathLength: 0.2, pathOffset: 0 }}
                animate={{
                  d: [
                    'M0 24 Q35 8 70 24 T140 24 T210 24 T280 24',
                    'M0 24 Q35 40 70 24 T140 24 T210 24 T280 24',
                    'M0 24 Q35 8 70 24 T140 24 T210 24 T280 24',
                  ],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.path
                d="M0 24 Q45 38 90 24 T180 24 T270 24 L280 24"
                fill="none"
                stroke="rgba(242,191,160,0.55)"
                strokeWidth="1.15"
                animate={{
                  d: [
                    'M0 24 Q45 38 90 24 T180 24 T270 24 L280 24',
                    'M0 24 Q45 10 90 24 T180 24 T270 24 L280 24',
                    'M0 24 Q45 38 90 24 T180 24 T270 24 L280 24',
                  ],
                }}
                transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </svg>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={PROFILE.venture.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#eae8e1] px-5 py-2.5 text-sm font-medium text-[#08090b] transition-colors hover:bg-[#b8c4a4] whitespace-nowrap shrink-0"
            >
              <span>Visit veyrith-labs.com</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <span className="text-xs text-[#9ea39f]">
              Software · Systems · Research
            </span>
          </div>
        </div>

        {/* Right Column: Veyrith Labs Homepage Screenshot in Smoky Glass Frame */}
        <div
          ref={frameRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="lg:col-span-7"
          style={{ perspective: 1100 }}
        >
          <motion.div
            animate={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
            transition={{ type: 'spring', stiffness: 180, damping: 24 }}
            className="group relative overflow-hidden rounded-xl border border-white/[0.11] bg-[#0a0b0a] shadow-2xl"
          >
            {/* Minimal Browser Top Chrome */}
            <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#101215]/90 px-4 py-2.5">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
              </div>
              <span className="font-mono text-[11px] text-[#9ea39f]">
                veyrith-labs.com
              </span>
              <a
                href={PROFILE.venture.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Veyrith Labs website in new tab"
                className="text-[#9ea39f] transition-colors hover:text-[#eae8e1]"
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Screenshot Image with Resilient Fallback */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0a0b0a]">
              {!imgError ? (
                <img
                  src={PROFILE.venture.screenshotPath}
                  alt="Veyrith Labs homepage — Engineering intelligence. Building what's next."
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.018]"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#121512] to-[#08090b] p-8 text-center">
                  <p className="font-display text-2xl font-semibold text-[#eae8e1]">
                    VEYRITH LABS
                  </p>
                  <p className="mt-2 text-sm text-[#b8c4a4]">
                    Engineering intelligence. Building what&apos;s next.
                  </p>
                </div>
              )}

              {/* Subtle bottom scrim */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#08090b]/60 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
