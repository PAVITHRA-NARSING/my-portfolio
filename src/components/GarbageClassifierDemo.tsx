import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Play, Pause } from 'lucide-react';
import { WASTE_SAMPLES } from '../data/portfolioData';

interface GarbageClassifierDemoProps {
  onOpenFullProject: () => void;
}

const SAMPLE_PALETTES: Record<
  string,
  { stroke: string; fill: string; secondary: string; barGradient: string }
> = {
  plastic: {
    stroke: '#c4b0e8',
    fill: 'rgba(196, 176, 232, 0.16)',
    secondary: '#9ecae8',
    barGradient: 'linear-gradient(90deg, #c4b0e8 0%, #9ecae8 100%)',
  },
  organic: {
    stroke: '#b4d4c0',
    fill: 'rgba(180, 212, 192, 0.16)',
    secondary: '#f2bfa0',
    barGradient: 'linear-gradient(90deg, #b4d4c0 0%, #f2bfa0 100%)',
  },
  metal: {
    stroke: '#e8a8b8',
    fill: 'rgba(232, 168, 184, 0.16)',
    secondary: '#c4b0e8',
    barGradient: 'linear-gradient(90deg, #e8a8b8 0%, #c4b0e8 100%)',
  },
  paper: {
    stroke: '#f2bfa0',
    fill: 'rgba(242, 191, 160, 0.16)',
    secondary: '#e8a8b8',
    barGradient: 'linear-gradient(90deg, #f2bfa0 0%, #e8a8b8 100%)',
  },
};

export function GarbageClassifierDemo({ onOpenFullProject }: GarbageClassifierDemoProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [autoCycle, setAutoCycle] = useState(true);

  const sample = WASTE_SAMPLES[selectedIndex];
  const palette = SAMPLE_PALETTES[sample.id] ?? SAMPLE_PALETTES.plastic;

  useEffect(() => {
    if (!autoCycle) return;
    const timer = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % WASTE_SAMPLES.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [autoCycle]);

  return (
    <div className="smoky-glass-elevated rounded-2xl p-6 sm:p-8">
      {/* Header Row */}
      <div className="flex flex-col gap-4 border-b border-white/[0.08] pb-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-medium text-[#b8c4a4]">
            Featured Build · Python ML &amp; OpenCV Computer Vision
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-[#eae8e1] sm:text-3xl">
            Automated Garbage Classifier
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#9ea39f]">
            Real-time waste segmentation and stream classification using OpenCV contour extraction,
            HSV specular profiling, and a fine-tuned MobileNetV3 neural classifier.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setAutoCycle((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-[#eae8e1] transition-colors hover:bg-white/[0.08] whitespace-nowrap shrink-0 cursor-pointer"
          >
            {autoCycle ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            <span>{autoCycle ? 'Pause Cycle' : 'Auto Cycle'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenFullProject}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#eae8e1] px-4 py-2 text-xs font-medium text-[#08090b] transition-colors hover:bg-[#b8c4a4] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Architecture</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Main Interactive Split */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 items-stretch">
        {/* Left: Simulated OpenCV Frame Viewport */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-white/[0.08] bg-[#07080a]/85 p-4 sm:p-5">
          <div className="flex items-center justify-between text-xs text-[#9ea39f]">
            <span className="font-mono">cv2.findContours · ROI Inference</span>
            <span
              className="font-mono tabular-nums transition-colors duration-300"
              style={{ color: palette.stroke }}
            >
              {sample.inferenceMs} ms / frame
            </span>
          </div>

          <div className="relative my-4 flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-lg border border-white/[0.06] bg-[#0b0d10]">
            {/* Soft colorful radial spotlight matching active waste class */}
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${palette.fill}, transparent 68%)`,
              }}
            />

            {/* Calibration grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />

            {/* Animated pastel scanning sweep line */}
            <motion.div
              key={`scan-${sample.id}`}
              initial={{ y: '-100%', opacity: 0.45 }}
              animate={{ y: '220%', opacity: [0.25, 0.65, 0.15] }}
              transition={{ duration: 2.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.4 }}
              className="pointer-events-none absolute inset-x-0 top-0 h-16"
              style={{
                background: `linear-gradient(to bottom, transparent, ${palette.fill}, transparent)`,
              }}
            />

            <AnimatePresence mode="wait">
              <motion.svg
                key={sample.id}
                viewBox="0 0 320 240"
                className="relative z-10 h-full w-full"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                aria-label={`OpenCV detection frame for ${sample.name}`}
              >
                {/* Silhouette Fill */}
                <motion.path
                  d={sample.contourPath}
                  fill={palette.fill}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Animated OpenCV Contour Trace */}
                <motion.path
                  d={sample.contourPath}
                  fill="none"
                  stroke={palette.stroke}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Internal Structural Edge Vectors */}
                <motion.path
                  d={sample.innerDetailPath}
                  fill="none"
                  stroke={palette.secondary}
                  strokeOpacity="0.65"
                  strokeWidth="1.3"
                  strokeDasharray="3 3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.25 }}
                />

                {/* Bounding Box Lock-on */}
                <motion.rect
                  x={sample.bbox.x}
                  y={sample.bbox.y}
                  width={sample.bbox.w}
                  height={sample.bbox.h}
                  rx="5"
                  fill="none"
                  stroke={palette.secondary}
                  strokeOpacity="0.6"
                  strokeWidth="1"
                  strokeDasharray="5 4"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: 0.15 }}
                />

                {/* Corner Brackets & Pearl Dots */}
                <g stroke={palette.stroke} strokeWidth="2" fill="none">
                  <path
                    d={`M${sample.bbox.x} ${sample.bbox.y + 12} V${sample.bbox.y} H${sample.bbox.x + 12}`}
                  />
                  <path
                    d={`M${sample.bbox.x + sample.bbox.w - 12} ${sample.bbox.y} H${sample.bbox.x + sample.bbox.w} V${sample.bbox.y + 12}`}
                  />
                  <path
                    d={`M${sample.bbox.x} ${sample.bbox.y + sample.bbox.h - 12} V${sample.bbox.y + sample.bbox.h} H${sample.bbox.x + 12}`}
                  />
                  <path
                    d={`M${sample.bbox.x + sample.bbox.w - 12} ${sample.bbox.y + sample.bbox.h} H${sample.bbox.x + sample.bbox.w} V${sample.bbox.y + sample.bbox.h - 12}`}
                  />
                </g>

                {/* Twinkling 4-point sparkle stars around ROI */}
                <motion.path
                  d={`M${sample.bbox.x - 12} ${sample.bbox.y + 14} Q${sample.bbox.x - 12} ${sample.bbox.y + 20} ${sample.bbox.x - 6} ${sample.bbox.y + 20} Q${sample.bbox.x - 12} ${sample.bbox.y + 20} ${sample.bbox.x - 12} ${sample.bbox.y + 26} Q${sample.bbox.x - 12} ${sample.bbox.y + 20} ${sample.bbox.x - 18} ${sample.bbox.y + 20} Q${sample.bbox.x - 12} ${sample.bbox.y + 20} ${sample.bbox.x - 12} ${sample.bbox.y + 14} Z`}
                  fill={palette.stroke}
                  animate={{ opacity: [0.35, 1, 0.35] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                />
                <motion.path
                  d={`M${sample.bbox.x + sample.bbox.w + 12} ${sample.bbox.y + sample.bbox.h - 30} Q${sample.bbox.x + sample.bbox.w + 12} ${sample.bbox.y + sample.bbox.h - 24} ${sample.bbox.x + sample.bbox.w + 18} ${sample.bbox.y + sample.bbox.h - 24} Q${sample.bbox.x + sample.bbox.w + 12} ${sample.bbox.y + sample.bbox.h - 24} ${sample.bbox.x + sample.bbox.w + 12} ${sample.bbox.y + sample.bbox.h - 18} Q${sample.bbox.x + sample.bbox.w + 12} ${sample.bbox.y + sample.bbox.h - 24} ${sample.bbox.x + sample.bbox.w + 6} ${sample.bbox.y + sample.bbox.h - 24} Q${sample.bbox.x + sample.bbox.w + 12} ${sample.bbox.y + sample.bbox.h - 24} ${sample.bbox.x + sample.bbox.w + 12} ${sample.bbox.y + sample.bbox.h - 30} Z`}
                  fill={palette.secondary}
                  animate={{ opacity: [0.35, 1, 0.35] }}
                  transition={{ duration: 2.4, delay: 0.9, repeat: Infinity }}
                />
              </motion.svg>
            </AnimatePresence>
          </div>

          {/* Sample Frame Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Waste classification samples">
            {WASTE_SAMPLES.map((item, idx) => {
              const active = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setAutoCycle(false);
                    setSelectedIndex(idx);
                  }}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#eae8e1] text-[#08090b]'
                      : 'border border-white/[0.07] bg-white/[0.03] text-[#9ea39f] hover:text-[#eae8e1]'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Live Classification Readout & Spectral Feature Bars */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-5 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
          <div>
            <p className="text-xs text-[#9ea39f]">Predicted Waste Stream</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={sample.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
              >
                <h3 className="mt-1.5 font-display text-xl font-semibold text-[#eae8e1]">
                  {sample.classLabel}
                </h3>
                <p className="mt-1 text-sm" style={{ color: palette.stroke }}>
                  {sample.recyclability}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Primary Confidence */}
            <div className="mt-5 border-t border-white/[0.07] pt-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-[#9ea39f]">Softmax Confidence</span>
                <span className="font-mono text-lg font-medium text-[#eae8e1] tabular-nums">
                  {sample.confidence.toFixed(1)}%
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  key={`conf-${sample.id}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: sample.confidence / 100 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: 'left', background: palette.barGradient }}
                  className="h-full w-full rounded-full"
                />
              </div>
            </div>

            {/* Feature Extraction Breakdown */}
            <div className="mt-5 space-y-3.5 border-t border-white/[0.07] pt-4">
              <p className="text-xs text-[#9ea39f]">Extracted OpenCV Descriptors</p>
              {sample.hsvProfile.map((metric, mIdx) => (
                <div key={metric.channel}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#eae8e1]/85">{metric.channel}</span>
                    <span className="font-mono text-[#9ea39f] tabular-nums">{metric.value}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.05]">
                    <motion.div
                      key={`${sample.id}-${metric.channel}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: metric.value / 100 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        transformOrigin: 'left',
                        backgroundColor:
                          mIdx === 0 ? '#e8a8b8' : mIdx === 1 ? '#c4b0e8' : '#f2bfa0',
                      }}
                      className="h-full w-full rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline Stack Footer (Zero-pill unboxed metadata) */}
          <div className="border-t border-white/[0.07] pt-4 text-xs text-[#9ea39f]">
            <span>Python 3.11</span>
            <span aria-hidden="true"> · </span>
            <span>OpenCV Canny</span>
            <span aria-hidden="true"> · </span>
            <span>MobileNetV3</span>
            <span aria-hidden="true"> · </span>
            <span>ONNX CPU</span>
          </div>
        </div>
      </div>
    </div>
  );
}
