import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { JOURNEY_MILESTONES } from '../data/portfolioData';

export function JourneySection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 60%'],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} aria-labelledby="journey-heading">
      <div className="max-w-2xl">
        <p className="text-xs font-medium text-[#b8c4a4]">Academic &amp; Builder Path</p>
        <h2
          id="journey-heading"
          className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-[#eae8e1] sm:text-3xl"
        >
          From Kendriya Vidyalaya to Veyrith Labs
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#9ea39f]">
          A first-year undergraduate journey in Hyderabad combining foundational schooling,
          rapid hackathon engineering, and applied research in computer vision and language models.
        </p>
      </div>

      <div className="relative mt-10 pl-6 sm:pl-10">
        {/* Background static vertical hairline */}
        <div
          className="absolute left-2 sm:left-3.5 top-2 bottom-2 w-[1px] bg-white/[0.08]"
          aria-hidden="true"
        />
        {/* Animated scroll-driven progress line */}
        <motion.div
          style={{ scaleY: lineScaleY, transformOrigin: 'top' }}
          className="absolute left-2 sm:left-3.5 top-2 bottom-2 w-[1.5px] bg-[#b8c4a4]"
          aria-hidden="true"
        />

        <div className="space-y-6">
          {JOURNEY_MILESTONES.map((item, idx) => (
            <motion.article
              key={item.index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="smoky-glass relative rounded-2xl p-6 sm:p-7"
            >
              {/* Timeline marker aligned on rail */}
              <span
                className="absolute -left-[22px] sm:-left-[31px] top-7 h-2.5 w-2.5 rounded-full border border-[#b8c4a4] bg-[#08090b]"
                aria-hidden="true"
              />

              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <p className="text-xs text-[#b8c4a4]">
                  {item.index}. {item.period} · {item.location}
                </p>
                <p className="text-xs text-[#9ea39f]">{item.role}</p>
              </div>

              <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-[#eae8e1]">
                {item.institution}
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-[#9ea39f]">
                {item.description}
              </p>

              <div className="mt-4 border-t border-white/[0.07] pt-3.5 text-xs text-[#9ea39f]">
                {item.highlights.join(' · ')}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
