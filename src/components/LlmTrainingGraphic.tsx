import { useState } from 'react';
import { motion } from 'motion/react';

const EPOCH_POINTS = [
  { epoch: 1, train: 2.41, val: 2.48 },
  { epoch: 2, train: 1.94, val: 2.02 },
  { epoch: 3, train: 1.56, val: 1.68 },
  { epoch: 4, train: 1.28, val: 1.42 },
  { epoch: 5, train: 1.09, val: 1.23 },
  { epoch: 6, train: 0.96, val: 1.11 },
  { epoch: 7, train: 0.89, val: 1.04 },
];

export function LlmTrainingGraphic() {
  const [hoveredIdx, setHoveredIdx] = useState<number>(6);

  const width = 360;
  const height = 160;
  const padX = 24;
  const padY = 18;

  const toX = (idx: number) =>
    padX + (idx / (EPOCH_POINTS.length - 1)) * (width - padX * 2);
  const toY = (val: number) => {
    const min = 0.7;
    const max = 2.6;
    const norm = (val - min) / (max - min);
    return height - padY - norm * (height - padY * 2);
  };

  const trainPath = EPOCH_POINTS.map(
    (p, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(p.train).toFixed(1)}`
  ).join(' ');

  const trainAreaPath = `${trainPath} L ${toX(EPOCH_POINTS.length - 1).toFixed(1)} ${height - padY} L ${toX(0).toFixed(1)} ${height - padY} Z`;

  const valPath = EPOCH_POINTS.map(
    (p, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(p.val).toFixed(1)}`
  ).join(' ');

  const activePoint = EPOCH_POINTS[hoveredIdx];

  return (
    <div className="smoky-glass rounded-2xl p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/[0.07] pb-4">
        <div>
          <p className="text-xs text-[#b8c4a4]">LLM Training Dynamics</p>
          <h3 className="mt-1 font-display text-lg font-semibold text-[#eae8e1]">
            QLoRA Fine-Tuning Loss Convergence
          </h3>
        </div>
        <div className="flex items-center gap-4 font-mono text-xs tabular-nums">
          <span className="text-[#e8a8b8]">Train {activePoint.train.toFixed(2)}</span>
          <span className="text-[#c4b0e8]">Val {activePoint.val.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-white/[0.06] bg-[#07080a]/75 p-3">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" aria-label="LLM training loss convergence chart">
          <defs>
            <linearGradient id="llm-train-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e8a8b8" />
              <stop offset="55%" stopColor="#c4b0e8" />
              <stop offset="100%" stopColor="#f2bfa0" />
            </linearGradient>
            <linearGradient id="llm-train-fill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(232,168,184,0.22)" />
              <stop offset="100%" stopColor="rgba(196,176,232,0.0)" />
            </linearGradient>
          </defs>

          {/* Horizontal guides */}
          {[0.9, 1.5, 2.1].map((tick) => (
            <line
              key={tick}
              x1={padX}
              y1={toY(tick)}
              x2={width - padX}
              y2={toY(tick)}
              stroke="rgba(255,255,255,0.06)"
              strokeDasharray="3 3"
            />
          ))}

          {/* Soft translucent blush area under training curve */}
          <motion.path
            d={trainAreaPath}
            fill="url(#llm-train-fill)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          />

          {/* Validation curve */}
          <motion.path
            d={valPath}
            fill="none"
            stroke="#c4b0e8"
            strokeWidth="1.8"
            strokeDasharray="4 3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Training curve */}
          <motion.path
            d={trainPath}
            fill="none"
            stroke="url(#llm-train-stroke)"
            strokeWidth="2.4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Interactive Epoch Nodes */}
          {EPOCH_POINTS.map((pt, idx) => {
            const x = toX(idx);
            const yTrain = toY(pt.train);
            const yVal = toY(pt.val);
            const isSelected = idx === hoveredIdx;
            return (
              <g
                key={pt.epoch}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIdx(idx)}
                onClick={() => setHoveredIdx(idx)}
              >
                <rect x={x - 16} y={0} width={32} height={height} fill="transparent" />
                {isSelected && (
                  <line
                    x1={x}
                    y1={padY}
                    x2={x}
                    y2={height - padY}
                    stroke="rgba(232,168,184,0.35)"
                    strokeWidth="1"
                  />
                )}
                <circle
                  cx={x}
                  cy={yVal}
                  r={isSelected ? 4 : 2.5}
                  fill="#c4b0e8"
                />
                <circle
                  cx={x}
                  cy={yTrain}
                  r={isSelected ? 4.8 : 3.2}
                  fill="#e8a8b8"
                  stroke="#08090b"
                  strokeWidth="1.2"
                />
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-[#9ea39f]">
        <span>Epoch {activePoint.epoch} of 7 · Cosine LR Decay</span>
        <span className="font-mono tabular-nums">NF4 Quantized</span>
      </div>
    </div>
  );
}
