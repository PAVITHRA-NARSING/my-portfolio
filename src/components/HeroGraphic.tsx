import { useState, useRef } from 'react';
import { motion } from 'motion/react';

type GraphicMode = 'muse' | 'signals' | 'attention';

const ATTENTION_WEIGHTS = [
  [0.92, 0.24, 0.14, 0.08, 0.35, 0.19],
  [0.21, 0.88, 0.42, 0.18, 0.12, 0.28],
  [0.16, 0.44, 0.91, 0.37, 0.22, 0.15],
  [0.11, 0.19, 0.39, 0.86, 0.48, 0.31],
  [0.34, 0.14, 0.21, 0.45, 0.94, 0.41],
  [0.18, 0.29, 0.17, 0.33, 0.44, 0.89],
];

const TOKENS = ['cv2', 'canny', 'tensor', 'lora', 'attn', 'cls'];

function getAttentionCellColor(weight: number, rIdx: number, cIdx: number) {
  const paletteIndex = (rIdx + cIdx) % 3;
  const alpha = (0.18 + weight * 0.72).toFixed(2);
  if (paletteIndex === 0) return `rgba(244, 174, 196, ${alpha})`; // Blush pink
  if (paletteIndex === 1) return `rgba(204, 180, 240, ${alpha})`; // Soft lavender
  return `rgba(246, 198, 170, ${alpha})`; // Warm peach
}

function SparkleStar({
  x,
  y,
  size = 9,
  color = '#f4aec4',
  delay = 0,
}: {
  x: number;
  y: number;
  size?: number;
  color?: string;
  delay?: number;
}) {
  return (
    <motion.g
      transform={`translate(${x}, ${y})`}
      animate={{
        scale: [0.75, 1.18, 0.75],
        opacity: [0.45, 1, 0.45],
        rotate: [0, 12, 0],
      }}
      transition={{ duration: 3.2, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path
        d={`M0 ${-size} Q0 0 ${size} 0 Q0 0 0 ${size} Q0 0 ${-size} 0 Q0 0 0 ${-size} Z`}
        fill={color}
      />
    </motion.g>
  );
}

function BlossomFlower({
  x,
  y,
  scale = 1,
  petalColor = '#f4aec4',
  centerColor = '#f6d2b0',
  delay = 0,
}: {
  x: number;
  y: number;
  scale?: number;
  petalColor?: string;
  centerColor?: string;
  delay?: number;
}) {
  return (
    <motion.g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      animate={{ rotate: [-4, 5, -4] }}
      transition={{ duration: 5, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse
          key={angle}
          cx="0"
          cy="-7.5"
          rx="4.2"
          ry="6.6"
          fill={petalColor}
          fillOpacity="0.88"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="0.5"
          transform={`rotate(${angle})`}
        />
      ))}
      <circle cx="0" cy="0" r="3.2" fill={centerColor} />
    </motion.g>
  );
}

export function HeroGraphic() {
  const [mode, setMode] = useState<GraphicMode>('muse');
  const [pointer, setPointer] = useState({ x: 52, y: 48 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(12, Math.min(88, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(14, Math.min(86, ((e.clientY - rect.top) / rect.height) * 100));
    setPointer({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className="smoky-glass-elevated relative flex h-full min-h-[400px] lg:min-h-[470px] flex-col justify-between overflow-hidden rounded-2xl p-5 sm:p-6"
    >
      {/* Top Bar inside Interactive Canvas */}
      <div className="relative z-10 flex items-center justify-between gap-4 border-b border-white/[0.07] pb-3.5">
        <div className="flex items-center gap-2 text-xs text-[#9ea39f]">
          <span>Visual Study</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#f5eee8]">
            {mode === 'muse'
              ? 'Engineer Muse & Blossoms'
              : mode === 'signals'
                ? 'Iris Signal Ribbons'
                : 'Self-Attention Matrix'}
          </span>
        </div>
        <span className="font-mono text-[11px] text-[#f4aec4] tabular-nums">
          {Math.round(pointer.x)}x / {Math.round(pointer.y)}y
        </span>
      </div>

      {/* Central Animated SVG Graphic */}
      <div className="relative my-3 flex flex-1 items-center justify-center overflow-hidden rounded-xl border border-white/[0.07] bg-[#08090c]/75">
        {/* Dreamy pastel smoky aurora wash inside viewport */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(244,174,196,0.16), transparent 55%), radial-gradient(circle at 75% 68%, rgba(204,180,240,0.16), transparent 58%), radial-gradient(circle at 50% 85%, rgba(246,198,170,0.11), transparent 50%)',
          }}
        />

        {/* Subtle delicate grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(244,174,196,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(204,180,240,0.12) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {mode === 'muse' && (
          <svg
            viewBox="0 0 400 300"
            className="relative z-10 h-full w-full max-h-[320px]"
            aria-label="Illustrated animated portrait of a young woman ML engineer surrounded by blossoms and sparkles"
          >
            <defs>
              <radialGradient id="muse-halo" cx="50%" cy="46%" r="48%">
                <stop offset="0%" stopColor="rgba(244, 174, 196, 0.34)" />
                <stop offset="55%" stopColor="rgba(204, 180, 240, 0.16)" />
                <stop offset="100%" stopColor="rgba(244, 174, 196, 0)" />
              </radialGradient>

              <linearGradient id="hair-dark-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#261b2e" />
                <stop offset="55%" stopColor="#1b1424" />
                <stop offset="100%" stopColor="#312038" />
              </linearGradient>

              <linearGradient id="hair-rim-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f4aec4" />
                <stop offset="50%" stopColor="#ccb4f0" />
                <stop offset="100%" stopColor="#f6c6aa" />
              </linearGradient>

              <linearGradient id="skin-grad" x1="20%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" stopColor="#fae2d8" />
                <stop offset="65%" stopColor="#f0c8bc" />
                <stop offset="100%" stopColor="#dfb0a4" />
              </linearGradient>

              <linearGradient id="dress-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#231c2b" />
                <stop offset="100%" stopColor="#15121b" />
              </linearGradient>

              <radialGradient id="cheek-blush" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(240, 142, 172, 0.48)" />
                <stop offset="100%" stopColor="rgba(240, 142, 172, 0)" />
              </radialGradient>
            </defs>

            {/* Ambient Halo Circle */}
            <circle cx="200" cy="146" r="118" fill="url(#muse-halo)" />

            {/* Rotating Floral & Star Orbit Halo */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 46, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '200px 146px' }}
            >
              <circle
                cx="200"
                cy="146"
                r="108"
                fill="none"
                stroke="rgba(244,174,196,0.28)"
                strokeWidth="1"
                strokeDasharray="4 8"
              />
              <circle
                cx="200"
                cy="146"
                r="92"
                fill="none"
                stroke="rgba(204,180,240,0.24)"
                strokeWidth="0.9"
                strokeDasharray="16 10"
              />
              <circle cx="200" cy="38" r="3.2" fill="#f4aec4" />
              <circle cx="308" cy="146" r="2.8" fill="#ccb4f0" />
              <circle cx="200" cy="254" r="3.2" fill="#f6c6aa" />
              <circle cx="92" cy="146" r="2.8" fill="#b4d4c0" />
            </motion.g>

            {/* Subtle Parallax Group reacting gently to pointer */}
            <motion.g
              animate={{
                x: (pointer.x - 50) * 0.14,
                y: (pointer.y - 50) * 0.1,
              }}
              transition={{ type: 'spring', stiffness: 120, damping: 24 }}
            >
              {/* Back Flowing Hair Silhouette */}
              <motion.path
                d="M174 62 C136 68, 114 106, 118 156 C120 192, 98 222, 108 264 L198 266 C214 234, 224 198, 220 156 C218 110, 206 62, 174 62 Z"
                fill="url(#hair-dark-grad)"
                stroke="url(#hair-rim-grad)"
                strokeWidth="1.25"
                animate={{
                  d: [
                    'M174 62 C136 68, 114 106, 118 156 C120 192, 98 222, 108 264 L198 266 C214 234, 224 198, 220 156 C218 110, 206 62, 174 62 Z',
                    'M174 62 C134 68, 110 108, 115 158 C117 194, 92 224, 104 264 L198 266 C214 234, 224 198, 220 156 C218 110, 206 62, 174 62 Z',
                    'M174 62 C136 68, 114 106, 118 156 C120 192, 98 222, 108 264 L198 266 C214 234, 224 198, 220 156 C218 110, 206 62, 174 62 Z',
                  ],
                }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Animated Soft Hair Wave Highlights */}
              <motion.path
                d="M148 86 C132 122, 136 168, 122 214 C116 234, 118 250, 122 262"
                fill="none"
                stroke="#f4aec4"
                strokeOpacity="0.45"
                strokeWidth="1.3"
                strokeLinecap="round"
                animate={{
                  d: [
                    'M148 86 C132 122, 136 168, 122 214 C116 234, 118 250, 122 262',
                    'M148 86 C128 124, 132 170, 117 216 C111 236, 114 252, 118 262',
                    'M148 86 C132 122, 136 168, 122 214 C116 234, 118 250, 122 262',
                  ],
                }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.path
                d="M160 100 C146 138, 150 184, 138 232"
                fill="none"
                stroke="#ccb4f0"
                strokeOpacity="0.38"
                strokeWidth="1.1"
                strokeLinecap="round"
                animate={{
                  d: [
                    'M160 100 C146 138, 150 184, 138 232',
                    'M160 100 C142 140, 146 186, 134 232',
                    'M160 100 C146 138, 150 184, 138 232',
                  ],
                }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Neck & Shoulders / Top */}
              <path
                d="M180 172 L176 206 C152 214, 136 234, 130 272 L274 272 C266 234, 246 214, 218 206 L214 176 Z"
                fill="url(#dress-grad)"
                stroke="rgba(244,174,196,0.28)"
                strokeWidth="1.1"
              />

              {/* Neck skin */}
              <path
                d="M182 164 L180 206 Q198 220 215 206 L212 166 Z"
                fill="url(#skin-grad)"
              />

              {/* Delicate Pearl Necklace */}
              <path
                d="M179 207 Q198 224 217 207"
                fill="none"
                stroke="rgba(246,210,176,0.65)"
                strokeWidth="0.9"
              />
              <circle cx="198" cy="217" r="3.4" fill="#faf3ed" stroke="#f4aec4" strokeWidth="0.8" />

              {/* Three-Quarter Face Profile */}
              <path
                d="M174 86 C194 72, 224 80, 232 104 C236 116, 236 122, 242 132 C244 136, 239 139, 236 140 C237 146, 236 150, 234 152 C235 156, 233 162, 226 168 C218 175, 196 176, 182 164 C172 154, 168 136, 170 116 Z"
                fill="url(#skin-grad)"
              />

              {/* Soft Rose Cheek Blush */}
              <ellipse cx="216" cy="142" rx="11" ry="7" fill="url(#cheek-blush)" />

              {/* Delicate Ear + Pearl Earring */}
              <path
                d="M178 130 C172 128, 170 140, 177 144"
                fill="url(#skin-grad)"
                stroke="rgba(190,130,120,0.4)"
                strokeWidth="0.9"
              />
              <circle cx="176" cy="147" r="2.6" fill="#faf3ed" stroke="#f4aec4" strokeWidth="0.7" />

              {/* Soft Eyebrow & Expressive Lashes */}
              <path
                d="M210 111 Q221 106 231 111"
                fill="none"
                stroke="#2e1e33"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M212 122 Q221 126 229 121"
                fill="none"
                stroke="#26182c"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              {/* Tiny lash flick */}
              <path
                d="M229 121 L233 118"
                fill="none"
                stroke="#26182c"
                strokeWidth="1.3"
                strokeLinecap="round"
              />

              {/* Soft Rose Lips */}
              <path
                d="M226 151 Q231 153 235 151"
                fill="none"
                stroke="#d67f98"
                strokeWidth="1.6"
                strokeLinecap="round"
              />

              {/* Stylish Thin Rose-Gold Round Glasses */}
              <circle
                cx="221"
                cy="122"
                r="11.5"
                fill="rgba(244,174,196,0.08)"
                stroke="#f6c6aa"
                strokeWidth="1.2"
              />
              <line
                x1="178"
                y1="127"
                x2="210"
                y2="123"
                stroke="#f6c6aa"
                strokeWidth="1.1"
              />
              <path
                d="M232.5 121 Q236 120 237 122"
                fill="none"
                stroke="#f6c6aa"
                strokeWidth="1.1"
              />

              {/* Front Framing Hair Lock & Sweeping Bangs */}
              <path
                d="M174 62 C202 58, 228 74, 232 98 C218 86, 204 88, 190 98 C178 108, 174 128, 172 152 C169 178, 160 202, 148 228 C144 190, 146 154, 152 122 C156 92, 160 66, 174 62 Z"
                fill="url(#hair-dark-grad)"
                stroke="url(#hair-rim-grad)"
                strokeWidth="1.15"
              />

              {/* Hair Ribbon Highlight */}
              <path
                d="M180 72 C196 68, 212 74, 222 86"
                fill="none"
                stroke="#f4aec4"
                strokeOpacity="0.55"
                strokeWidth="1.2"
                strokeLinecap="round"
              />

              {/* Botanical Blossoms Tucked in Hair */}
              <BlossomFlower x={170} y={106} scale={1.1} petalColor="#f4aec4" delay={0} />
              <BlossomFlower x={156} y={120} scale={0.78} petalColor="#ccb4f0" delay={0.8} />
              <BlossomFlower x={165} y={88} scale={0.68} petalColor="#f6c6aa" delay={1.4} />
            </motion.g>

            {/* Delicate Floating Pastel Butterfly */}
            <motion.g
              transform="translate(284, 86)"
              animate={{
                y: [0, -8, 0],
                x: [0, 4, 0],
                rotate: [-6, 8, -6],
              }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path
                d="M0 0 C-10 -12, -20 -6, -12 4 C-18 12, -8 18, 0 8 C8 18, 18 12, 12 4 C20 -6, 10 -12, 0 0 Z"
                fill="rgba(204,180,240,0.45)"
                stroke="#f4aec4"
                strokeWidth="1.1"
              />
              <line x1="0" y1="-4" x2="0" y2="8" stroke="#f6c6aa" strokeWidth="1.2" strokeLinecap="round" />
            </motion.g>

            {/* Drifting Soft Petals */}
            {[
              { cx: 102, cy: 96, r: 4, color: '#f4aec4', d: 0 },
              { cx: 298, cy: 176, r: 3.5, color: '#ccb4f0', d: 0.7 },
              { cx: 118, cy: 204, r: 3.2, color: '#f6c6aa', d: 1.3 },
              { cx: 268, cy: 224, r: 3.8, color: '#f4aec4', d: 1.9 },
            ].map((petal, idx) => (
              <motion.ellipse
                key={idx}
                cx={petal.cx}
                cy={petal.cy}
                rx={petal.r * 1.4}
                ry={petal.r * 0.85}
                fill={petal.color}
                fillOpacity="0.6"
                animate={{
                  y: [-5, 7, -5],
                  rotate: [0, 35, 0],
                  opacity: [0.4, 0.85, 0.4],
                }}
                transition={{ duration: 4.4, delay: petal.d, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}

            {/* Twinkling 4-Point Sparkles */}
            <SparkleStar x={108} y={64} size={8} color="#f4aec4" delay={0.1} />
            <SparkleStar x={262} y={56} size={7} color="#ccb4f0" delay={0.7} />
            <SparkleStar x={306} y={134} size={9} color="#f6c6aa" delay={1.2} />
            <SparkleStar x={90} y={168} size={6.5} color="#b4d4c0" delay={1.8} />
            <SparkleStar x={274} y={248} size={7.5} color="#f4aec4" delay={0.5} />

            {/* Subtle Cursor-Reactive Soft Vision Focus Brackets */}
            <motion.g
              animate={{
                x: (pointer.x - 50) * 1.15,
                y: (pointer.y - 50) * 0.9,
              }}
              transition={{ type: 'spring', stiffness: 140, damping: 22 }}
            >
              <path d="M168 110 V100 H178" fill="none" stroke="rgba(244,174,196,0.65)" strokeWidth="1.4" />
              <path d="M222 100 H232 V110" fill="none" stroke="rgba(204,180,240,0.65)" strokeWidth="1.4" />
              <path d="M168 176 V186 H178" fill="none" stroke="rgba(246,198,170,0.65)" strokeWidth="1.4" />
              <path d="M222 186 H232 V176" fill="none" stroke="rgba(180,212,192,0.65)" strokeWidth="1.4" />
            </motion.g>
          </svg>
        )}

        {mode === 'signals' && (
          <svg
            viewBox="0 0 400 300"
            className="relative z-10 h-full w-full max-h-[320px]"
            aria-label="Animated colorful signal harmonics graph"
          >
            <defs>
              <linearGradient id="wave-rose-area" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(244,174,196,0.28)" />
                <stop offset="100%" stopColor="rgba(204,180,240,0.0)" />
              </linearGradient>
              <linearGradient id="wave-lavender-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f4aec4" />
                <stop offset="50%" stopColor="#ccb4f0" />
                <stop offset="100%" stopColor="#f6c6aa" />
              </linearGradient>
            </defs>

            <line x1="28" y1="150" x2="372" y2="150" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <line x1="28" y1="90" x2="372" y2="90" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            <line x1="28" y1="210" x2="372" y2="210" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

            <motion.path
              fill="url(#wave-rose-area)"
              animate={{
                d: [
                  'M28 150 C84 82, 134 218, 200 150 C266 82, 316 218, 372 150 L372 230 L28 230 Z',
                  'M28 150 C84 206, 134 94, 200 150 C266 206, 316 94, 372 150 L372 230 L28 230 Z',
                  'M28 150 C84 82, 134 218, 200 150 C266 82, 316 218, 372 150 L372 230 L28 230 Z',
                ],
              }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.path
              fill="none"
              stroke="url(#wave-lavender-stroke)"
              strokeWidth="2.4"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: 1,
                d: [
                  'M28 150 C84 82, 134 218, 200 150 C266 82, 316 218, 372 150',
                  'M28 150 C84 206, 134 94, 200 150 C266 206, 316 94, 372 150',
                  'M28 150 C84 82, 134 218, 200 150 C266 82, 316 218, 372 150',
                ],
              }}
              transition={{
                pathLength: { duration: 1, ease: [0.16, 1, 0.3, 1] },
                d: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' },
              }}
            />

            <motion.path
              fill="none"
              stroke="#b4d4c0"
              strokeWidth="1.5"
              strokeOpacity="0.82"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: 1,
                d: [
                  'M28 150 C96 206, 152 98, 208 154 C264 208, 320 102, 372 150',
                  'M28 150 C96 96, 152 202, 208 146 C264 96, 320 202, 372 150',
                  'M28 150 C96 206, 152 98, 208 154 C264 208, 320 102, 372 150',
                ],
              }}
              transition={{
                pathLength: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                d: { duration: 6.5, repeat: Infinity, ease: 'easeInOut' },
              }}
            />

            {[
              { cx: 92, color: '#f4aec4' },
              { cx: 164, color: '#ccb4f0' },
              { cx: 236, color: '#f6c6aa' },
              { cx: 308, color: '#b4d4c0' },
            ].map((node, idx) => (
              <motion.circle
                key={node.cx}
                cx={node.cx}
                cy={150}
                r="4.8"
                fill={node.color}
                stroke="#08090b"
                strokeWidth="1.2"
                animate={{
                  cy: idx % 2 === 0 ? [126, 174, 126] : [174, 126, 174],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 4.5, delay: idx * 0.35, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}

            <SparkleStar x={72} y={76} size={7} color="#f4aec4" delay={0.2} />
            <SparkleStar x={316} y={74} size={8} color="#ccb4f0" delay={0.9} />
            <SparkleStar x={200} y={244} size={6.5} color="#f6c6aa" delay={1.4} />
          </svg>
        )}

        {mode === 'attention' && (
          <div className="relative z-10 flex w-full max-w-[310px] flex-col gap-2.5 p-5">
            <div className="grid grid-cols-7 gap-1.5 text-center font-mono text-[10px] text-[#9ea39f]">
              <span />
              {TOKENS.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            {ATTENTION_WEIGHTS.map((row, rIdx) => (
              <div key={TOKENS[rIdx]} className="grid grid-cols-7 items-center gap-1.5">
                <span className="font-mono text-[10px] text-[#9ea39f] text-right pr-1">
                  {TOKENS[rIdx]}
                </span>
                {row.map((weight, cIdx) => (
                  <motion.div
                    key={`${rIdx}-${cIdx}`}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      backgroundColor: getAttentionCellColor(weight, rIdx, cIdx),
                    }}
                    transition={{
                      duration: 0.35,
                      delay: (rIdx * 6 + cIdx) * 0.015,
                    }}
                    className="aspect-square rounded-[6px] border border-white/[0.1] flex items-center justify-center font-mono text-[9px] text-[#08090b]/90 font-semibold"
                    title={`${TOKENS[rIdx]} → ${TOKENS[cIdx]}: ${weight.toFixed(2)}`}
                  >
                    {weight > 0.8 ? weight.toFixed(1) : ''}
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mode Selector Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-1">
        <div
          className="inline-flex items-center gap-1 rounded-lg border border-white/[0.08] bg-[#0b0d10]/80 p-1"
          role="tablist"
          aria-label="Graphic visualization mode"
        >
          {(
            [
              { id: 'muse', label: 'Muse Portrait' },
              { id: 'signals', label: 'Signal Wave' },
              { id: 'attention', label: 'Attention' },
            ] as const
          ).map((tab) => {
            const active = mode === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setMode(tab.id)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#eae8e1] text-[#08090b]'
                    : 'text-[#9ea39f] hover:text-[#eae8e1]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <span className="font-mono text-[11px] text-[#9ea39f]">Move cursor to interact</span>
      </div>
    </div>
  );
}
