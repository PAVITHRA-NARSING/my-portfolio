import { motion } from 'motion/react';
import { CAPABILITIES } from '../data/portfolioData';
import { LlmTrainingGraphic } from './LlmTrainingGraphic';

export function CapabilitiesSection() {
  return (
    <section aria-labelledby="capabilities-heading">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* Left: Core Engineering Disciplines */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <p className="text-xs font-medium text-[#b8c4a4]">Core Disciplines</p>
            <h2
              id="capabilities-heading"
              className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-[#eae8e1] sm:text-3xl"
            >
              Vision, Language, and Applied ML
            </h2>
          </div>

          <div className="space-y-4">
            {CAPABILITIES.map((cap, idx) => (
              <motion.div
                key={cap.index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="smoky-glass rounded-2xl p-6"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-display text-lg font-semibold text-[#eae8e1]">
                    {cap.index}. {cap.title}
                  </h3>
                  <span className="text-xs text-[#9ea39f]">
                    {cap.tools.join(' · ')}
                  </span>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-[#9ea39f]">
                  {cap.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Interactive LLM Training Dynamics Graphic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 lg:sticky lg:top-24"
        >
          <LlmTrainingGraphic />
        </motion.div>
      </div>
    </section>
  );
}
