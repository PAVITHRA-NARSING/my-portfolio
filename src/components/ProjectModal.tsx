import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight } from 'lucide-react';
import { ProjectItem, PROFILE } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 sm:p-6 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="smoky-glass-elevated relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-6 sm:p-8"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#eae8e1] transition-colors hover:bg-white/[0.1] cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Unboxed metadata header */}
            <div className="pr-10">
              <p className="text-xs text-[#b8c4a4]">
                {project.categoryLabel} · {project.year}
              </p>
              <h3
                id="project-modal-title"
                className="mt-2 font-display text-2xl font-semibold tracking-tight text-[#eae8e1] sm:text-3xl"
              >
                {project.title}
              </h3>
              <p className="mt-1.5 text-sm text-[#9ea39f]">{project.subtitle}</p>
            </div>

            {/* Key Metrics Row */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 border-y border-white/[0.08] py-4">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <p className="text-xs text-[#9ea39f]">{m.label}</p>
                  <p className="mt-1 font-mono text-base font-medium text-[#eae8e1] tabular-nums">
                    {m.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-6">
              <h4 className="text-xs font-medium text-[#eae8e1]">Overview</h4>
              <p className="mt-2 text-sm leading-relaxed text-[#9ea39f]">{project.summary}</p>
            </div>

            {/* Technical Pipeline */}
            <div className="mt-6">
              <h4 className="text-xs font-medium text-[#eae8e1]">Engineering Pipeline</h4>
              <ul className="mt-3 space-y-2.5">
                {project.architecture.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#9ea39f]">
                    <span className="font-mono text-xs text-[#b8c4a4] pt-0.5 tabular-nums">
                      0{i + 1}.
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Unboxed Stack & Action Footer */}
            <div className="mt-7 flex flex-col gap-4 border-t border-white/[0.08] pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-[#9ea39f]">
                {project.stack.join(' · ')}
              </p>
              {project.visualType === 'veyrith' && (
                <a
                  href={PROFILE.venture.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#eae8e1] px-4 py-2 text-xs font-medium text-[#08090b] transition-colors hover:bg-[#b8c4a4] whitespace-nowrap shrink-0"
                >
                  <span>Visit Veyrith Labs</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
