import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS, ProjectCategory, ProjectItem } from '../data/portfolioData';

interface ProjectShowcaseProps {
  onSelectProject: (project: ProjectItem) => void;
}

const FILTER_TABS: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Work' },
  { id: 'vision', label: 'Computer Vision' },
  { id: 'llm', label: 'LLM & Systems' },
  { id: 'hackathon', label: 'Hackathons' },
];

function CardAnimatedPreview({ type }: { type: ProjectItem['visualType'] }) {
  if (type === 'garbage') {
    return (
      <svg viewBox="0 0 260 120" className="h-28 w-full" aria-hidden="true">
        <defs>
          <linearGradient id="card-garbage-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f4aec4" />
            <stop offset="50%" stopColor="#ccb4f0" />
            <stop offset="100%" stopColor="#b4d4c0" />
          </linearGradient>
        </defs>
        <rect
          x="74"
          y="16"
          width="112"
          height="88"
          rx="8"
          fill="none"
          stroke="rgba(246,198,170,0.45)"
          strokeDasharray="4 4"
        />
        <motion.path
          d="M118 24 L142 24 L145 36 L158 50 L158 94 Q158 98 150 98 L110 98 Q102 98 102 94 L102 50 L115 36 Z"
          fill="rgba(204,180,240,0.16)"
          stroke="url(#card-garbage-grad)"
          strokeWidth="1.9"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.line
          x1="78"
          y1="24"
          x2="182"
          y2="24"
          stroke="#f4aec4"
          strokeOpacity="0.65"
          strokeWidth="1.3"
          animate={{ y1: [24, 96, 24], y2: [24, 96, 24] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M52 34 Q52 40 58 40 Q52 40 52 46 Q52 40 46 40 Q52 40 52 34 Z"
          fill="#f4aec4"
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.85, 1.15, 0.85] }}
          transition={{ duration: 2.8, repeat: Infinity }}
        />
        <motion.path
          d="M208 72 Q208 78 214 78 Q208 78 208 84 Q208 78 202 78 Q208 78 208 72 Z"
          fill="#ccb4f0"
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.85, 1.15, 0.85] }}
          transition={{ duration: 2.8, delay: 1, repeat: Infinity }}
        />
      </svg>
    );
  }

  if (type === 'llm') {
    return (
      <svg viewBox="0 0 260 120" className="h-28 w-full" aria-hidden="true">
        <defs>
          <linearGradient id="card-llm-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f4aec4" />
            <stop offset="50%" stopColor="#ccb4f0" />
            <stop offset="100%" stopColor="#f6c6aa" />
          </linearGradient>
        </defs>
        <motion.path
          d="M20 26 C64 28, 92 64, 136 78 C178 90, 212 94, 242 96"
          fill="none"
          stroke="url(#card-llm-grad)"
          strokeWidth="2.4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M20 34 C68 38, 102 72, 142 84 C180 94, 212 98, 242 100"
          fill="none"
          stroke="#b4d4c0"
          strokeOpacity="0.7"
          strokeWidth="1.4"
          strokeDasharray="3 3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.15 }}
        />
        {[
          { cx: 20, cy: 26, c: '#f4aec4' },
          { cx: 76, cy: 48, c: '#ccb4f0' },
          { cx: 136, cy: 78, c: '#f6c6aa' },
          { cx: 192, cy: 92, c: '#b4d4c0' },
          { cx: 242, cy: 96, c: '#f4aec4' },
        ].map((pt) => (
          <circle key={pt.cx} cx={pt.cx} cy={pt.cy} r="3.4" fill={pt.c} />
        ))}
        <motion.path
          d="M210 24 Q210 30 216 30 Q210 30 210 36 Q210 30 204 30 Q210 30 210 24 Z"
          fill="#f4aec4"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.6, repeat: Infinity }}
        />
      </svg>
    );
  }

  if (type === 'gesture') {
    const joints = [
      [130, 96],
      [106, 74],
      [96, 48],
      [118, 62],
      [118, 30],
      [132, 60],
      [136, 26],
      [146, 64],
      [154, 34],
      [158, 74],
      [172, 52],
    ];
    const links = [
      [0, 1],
      [1, 2],
      [0, 3],
      [3, 4],
      [0, 5],
      [5, 6],
      [0, 7],
      [7, 8],
      [0, 9],
      [9, 10],
    ];
    const dotColors = ['#f4aec4', '#ccb4f0', '#f6c6aa', '#b4d4c0'];
    return (
      <svg viewBox="0 0 260 120" className="h-28 w-full" aria-hidden="true">
        {links.map(([a, b], idx) => (
          <motion.line
            key={idx}
            x1={joints[a][0]}
            y1={joints[a][1]}
            x2={joints[b][0]}
            y2={joints[b][1]}
            stroke={idx % 2 === 0 ? 'rgba(244,174,196,0.72)' : 'rgba(204,180,240,0.72)'}
            strokeWidth="1.6"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: idx * 0.05 }}
          />
        ))}
        {joints.map(([cx, cy], idx) => (
          <motion.circle
            key={idx}
            cx={cx}
            cy={cy}
            r={idx === 0 ? 4.5 : 3}
            fill={dotColors[idx % dotColors.length]}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.8, delay: idx * 0.15, repeat: Infinity }}
          />
        ))}
        <motion.path
          d="M56 54 Q56 60 62 60 Q56 60 56 66 Q56 60 50 60 Q56 60 56 54 Z"
          fill="#ccb4f0"
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 260 120" className="h-28 w-full" aria-hidden="true">
      <defs>
        <linearGradient id="card-veyrith-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#b4d4c0" />
          <stop offset="50%" stopColor="#ccb4f0" />
          <stop offset="100%" stopColor="#f4aec4" />
        </linearGradient>
      </defs>
      <motion.path
        d="M18 62 C58 20, 98 102, 138 62 C178 22, 214 96, 244 58"
        fill="none"
        stroke="url(#card-veyrith-grad)"
        strokeWidth="2.1"
        animate={{
          d: [
            'M18 62 C58 20, 98 102, 138 62 C178 22, 214 96, 244 58',
            'M18 62 C58 98, 98 24, 138 62 C178 96, 214 26, 244 58',
            'M18 62 C58 20, 98 102, 138 62 C178 22, 214 96, 244 58',
          ],
        }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path
        d="M18 62 C64 96, 108 26, 152 64 C192 98, 222 32, 244 62"
        fill="none"
        stroke="rgba(246,198,170,0.52)"
        strokeWidth="1.25"
        animate={{
          d: [
            'M18 62 C64 96, 108 26, 152 64 C192 98, 222 32, 244 62',
            'M18 62 C64 28, 108 94, 152 60 C192 26, 222 92, 244 62',
            'M18 62 C64 96, 108 26, 152 64 C192 98, 222 32, 244 62',
          ],
        }}
        transition={{ duration: 6.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <circle cx="88" cy="64" r="3.6" fill="#ccb4f0" />
      <circle cx="174" cy="54" r="3.6" fill="#f4aec4" />
      <motion.path
        d="M220 26 Q220 31 225 31 Q220 31 220 36 Q220 31 215 31 Q220 31 220 26 Z"
        fill="#f6c6aa"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
    </svg>
  );
}

export function ProjectShowcase({ onSelectProject }: ProjectShowcaseProps) {
  const [filter, setFilter] = useState<ProjectCategory>('all');

  const filteredProjects =
    filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section aria-labelledby="projects-heading">
      {/* Header + Segmented Filter Bar */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium text-[#b8c4a4]">Selected Engineering</p>
          <h2
            id="projects-heading"
            className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-[#eae8e1] sm:text-3xl"
          >
            Responsive Project Showcase
          </h2>
        </div>

        <div
          className="inline-flex flex-wrap items-center gap-1 rounded-lg border border-white/[0.08] bg-[#0e1014]/90 p-1"
          role="tablist"
          aria-label="Filter projects by discipline"
        >
          {FILTER_TABS.map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(tab.id)}
                className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
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
      </div>

      {/* Responsive Project Cards Grid */}
      <motion.div layout className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.article
              layout
              key={project.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.42,
                delay: index * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => onSelectProject(project)}
              className="smoky-glass group flex cursor-pointer flex-col justify-between rounded-2xl p-6 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.05]"
            >
              <div>
                {/* Top Unboxed Metadata Line */}
                <div className="flex items-center justify-between gap-4 text-xs text-[#9ea39f]">
                  <span>
                    {project.categoryLabel} · {project.year}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#b8c4a4] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <span>Inspect</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>

                {/* Animated Vector Preview Window */}
                <div className="mt-4 overflow-hidden rounded-xl border border-white/[0.06] bg-[#07080a]/75 px-3 py-2">
                  <CardAnimatedPreview type={project.visualType} />
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-[#eae8e1] group-hover:text-[#b8c4a4] transition-colors">
                  {project.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#9ea39f]">
                  {project.summary}
                </p>
              </div>

              {/* Metrics + Unboxed Stack Footer */}
              <div className="mt-6 border-t border-white/[0.07] pt-4">
                <div className="grid grid-cols-3 gap-2 pb-3">
                  {project.metrics.map((m) => (
                    <div key={m.label}>
                      <p className="text-[11px] text-[#9ea39f] truncate">{m.label}</p>
                      <p className="mt-0.5 font-mono text-xs font-medium text-[#eae8e1] tabular-nums">
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="border-t border-white/[0.05] pt-3 text-xs text-[#9ea39f]">
                  {project.stack.join(' · ')}
                </p>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
