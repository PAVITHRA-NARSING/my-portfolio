import { useState, useEffect } from 'react';
import { MotionConfig, motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  HERO_METRICS,
  PageRoute,
  PROFILE,
  PROJECTS,
  ProjectItem,
} from './data/portfolioData';
import { SmokyBackground } from './components/SmokyBackground';
import { Navbar } from './components/Navbar';
import { HeroGraphic } from './components/HeroGraphic';
import { GarbageClassifierDemo } from './components/GarbageClassifierDemo';
import { VeyrithShowcase } from './components/VeyrithShowcase';
import { ProjectShowcase } from './components/ProjectShowcase';
import { ProjectModal } from './components/ProjectModal';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { JourneySection } from './components/JourneySection';
import { ContactSection } from './components/ContactSection';

const MARQUEE_ITEMS = [
  'Python ML Engineering',
  'OpenCV Computer Vision',
  'Garbage Classifier',
  'LLM Fine-Tuning',
  'Hackathon Builder',
  'Veyrith Labs Co-Founder',
  'Newton School of Technology',
  'Hyderabad',
];

function MarqueeDivider() {
  return (
    <div
      className="relative overflow-hidden border-y border-white/[0.07] bg-white/[0.015] py-3.5"
      aria-hidden="true"
    >
      <div className="animate-marquee flex items-center gap-8 text-xs tracking-wide text-[#9ea39f]">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((text, idx) => (
          <span key={idx} className="flex items-center gap-8 whitespace-nowrap">
            <span>{text}</span>
            <span className="text-[#b8c4a4]/60">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const pageVariants = {
  initial: { opacity: 0, y: 14, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.36, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: 'blur(4px)',
    transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('overview');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  const handleNavigate = (page: PageRoute) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const titles: Record<PageRoute, string> = {
      overview: 'Narsing Pavithra — Python ML Engineer, OpenCV & LLM Trainer',
      projects: 'Projects & Garbage Classifier — Narsing Pavithra',
      veyrith: 'Veyrith Labs (Co-Founder) — Narsing Pavithra',
      journey: 'Education & Hackathons — Narsing Pavithra',
      contact: 'Contact — Narsing Pavithra',
    };
    document.title = titles[currentPage];
  }, [currentPage]);

  const garbageProject =
    PROJECTS.find((p) => p.id === 'garbage-classifier') ?? PROJECTS[0];

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[#08090b] text-[#eae8e1] flex flex-col">
        {/* Scroll Progress Hairline */}
        <motion.div
          style={{
            scaleX: smoothProgress,
            transformOrigin: 'left',
            background: 'linear-gradient(90deg, #e8a8b8 0%, #c4b0e8 50%, #f2bfa0 100%)',
          }}
          className="fixed inset-x-0 top-0 z-50 h-[2px]"
          aria-hidden="true"
        />

        {/* Ambient Smoky Canvas Background */}
        <SmokyBackground />

        {/* Sticky 3-Zone Top Bar */}
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

        {/* Main Content with Page Transitions */}
        <main className="relative z-10 flex-1">
          <AnimatePresence mode="wait">
            {currentPage === 'overview' && (
              <motion.div
                key="page-overview"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {/* Hero Section */}
                <section className="mx-auto max-w-6xl px-6 pt-12 pb-14 sm:pt-16 sm:pb-18">
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
                    {/* Hero Left Column */}
                    <div className="lg:col-span-6 flex flex-col justify-between gap-8 py-2">
                      <div>
                        <motion.p
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="text-xs font-medium text-[#b8c4a4]"
                        >
                          Python ML Engineer · OpenCV Developer · LLM Trainer
                        </motion.p>

                        <motion.h1
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
                          className="mt-4 font-display text-4xl font-semibold tracking-tight text-[#eae8e1] sm:text-5xl lg:text-[3.35rem] lg:leading-[1.06]"
                        >
                          {PROFILE.headline}
                        </motion.h1>

                        <motion.p
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                          className="mt-5 max-w-xl text-base leading-relaxed text-[#9ea39f]"
                        >
                          I&apos;m <span className="text-[#eae8e1] font-medium">Narsing Pavithra</span>,
                          a 19-year-old first-year engineering student at{' '}
                          <span className="text-[#eae8e1]">
                            Newton School of Technology, St. Mary&apos;s Institute of Technology, Hyderabad
                          </span>{' '}
                          and an alumna of Kendriya Vidyalaya. Beyond hackathons and computer vision
                          research, I co-founded{' '}
                          <span className="text-[#eae8e1]">Veyrith Labs</span> to build applied
                          intelligence systems.
                        </motion.p>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-wrap items-center gap-4"
                      >
                        <button
                          type="button"
                          onClick={() => handleNavigate('projects')}
                          className="inline-flex items-center gap-2 rounded-lg bg-[#eae8e1] px-5 py-2.5 text-sm font-medium text-[#08090b] transition-colors hover:bg-[#b8c4a4] whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <span>Explore Projects</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleNavigate('veyrith')}
                          className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-[#eae8e1] transition-colors hover:bg-white/[0.08] whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <span>Veyrith Labs</span>
                          <ArrowUpRight className="h-4 w-4 text-[#b8c4a4]" />
                        </button>
                      </motion.div>
                    </div>

                    {/* Hero Right Column: Interactive Animated Visual */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="lg:col-span-6"
                    >
                      <HeroGraphic />
                    </motion.div>
                  </div>

                  {/* Full-width 4-column Strip Below Hero Split */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-white/[0.08] pt-7"
                  >
                    {HERO_METRICS.map((item) => (
                      <div key={item.label} className="smoky-glass rounded-xl px-4 py-3.5">
                        <p className="text-xs text-[#9ea39f]">{item.label}</p>
                        <p className="mt-1 font-display text-sm sm:text-base font-medium text-[#eae8e1] tabular-nums">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                </section>

                {/* Marquee Ribbon Divider */}
                <MarqueeDivider />

                {/* Interactive Garbage Classifier Spotlight */}
                <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
                  <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <GarbageClassifierDemo
                      onOpenFullProject={() => setActiveProject(garbageProject)}
                    />
                  </motion.div>
                </section>

                {/* Veyrith Labs Pre-Launch Venture Showcase */}
                <section className="mx-auto max-w-6xl px-6 pb-16 sm:pb-20">
                  <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <VeyrithShowcase />
                  </motion.div>
                </section>

                {/* Responsive Project Showcase */}
                <section className="mx-auto max-w-6xl px-6 pb-16 sm:pb-20">
                  <ProjectShowcase onSelectProject={setActiveProject} />
                </section>

                {/* Core Capabilities & LLM Training Dynamics */}
                <section className="mx-auto max-w-6xl px-6 pb-16 sm:pb-20">
                  <CapabilitiesSection />
                </section>

                {/* Education & Hackathon Journey */}
                <section className="mx-auto max-w-6xl px-6 pb-20 sm:pb-24">
                  <JourneySection />
                </section>
              </motion.div>
            )}

            {currentPage === 'projects' && (
              <motion.div
                key="page-projects"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mx-auto max-w-6xl px-6 py-12 sm:py-16 space-y-16"
              >
                <div className="max-w-2xl">
                  <p className="text-xs font-medium text-[#b8c4a4]">Engineering Portfolio</p>
                  <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#eae8e1] sm:text-5xl">
                    Computer Vision &amp; Language Model Builds
                  </h1>
                  <p className="mt-4 text-base leading-relaxed text-[#9ea39f]">
                    Interactive pipelines spanning OpenCV waste classification, parameter-efficient
                    LLM training, and 24-hour hackathon prototypes.
                  </p>
                </div>

                <GarbageClassifierDemo
                  onOpenFullProject={() => setActiveProject(garbageProject)}
                />

                <ProjectShowcase onSelectProject={setActiveProject} />
              </motion.div>
            )}

            {currentPage === 'veyrith' && (
              <motion.div
                key="page-veyrith"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mx-auto max-w-6xl px-6 py-12 sm:py-16 space-y-14"
              >
                <div className="max-w-2xl">
                  <p className="text-xs font-medium text-[#b8c4a4]">Pre-Launch Venture</p>
                  <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#eae8e1] sm:text-5xl">
                    Veyrith Labs
                  </h1>
                  <p className="mt-4 text-base leading-relaxed text-[#9ea39f]">
                    Co-founded alongside engineering peers while in first-year university—building
                    foundational software and intelligence systems without claims ahead of the work.
                  </p>
                </div>

                <VeyrithShowcase />

                <CapabilitiesSection />
              </motion.div>
            )}

            {currentPage === 'journey' && (
              <motion.div
                key="page-journey"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mx-auto max-w-6xl px-6 py-12 sm:py-16 space-y-16"
              >
                <div className="max-w-2xl">
                  <p className="text-xs font-medium text-[#b8c4a4]">Background &amp; Milestones</p>
                  <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#eae8e1] sm:text-5xl">
                    Education, Hackathons &amp; Research
                  </h1>
                  <p className="mt-4 text-base leading-relaxed text-[#9ea39f]">
                    19 years old in Hyderabad — transitioning from Kendriya Vidyalaya fundamentals
                    into Newton School of Technology (St. Mary&apos;s Institute of Technology) and
                    co-founding Veyrith Labs.
                  </p>
                </div>

                <JourneySection />

                <CapabilitiesSection />
              </motion.div>
            )}

            {currentPage === 'contact' && (
              <motion.div
                key="page-contact"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mx-auto max-w-6xl px-6 py-12 sm:py-20"
              >
                <ContactSection />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Quiet Editorial Footer */}
        <footer className="relative z-10 border-t border-white/[0.07] bg-[#08090b]/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between text-xs text-[#9ea39f]">
            <div>
              <span className="font-medium text-[#eae8e1]">{PROFILE.name}</span>
              <span aria-hidden="true"> · </span>
              <span>Newton School of Technology, St. Mary&apos;s Institute of Technology, Hyderabad</span>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={() => handleNavigate('projects')}
                className="hover:text-[#eae8e1] transition-colors cursor-pointer"
              >
                Projects
              </button>
              <button
                type="button"
                onClick={() => handleNavigate('journey')}
                className="hover:text-[#eae8e1] transition-colors cursor-pointer"
              >
                Journey
              </button>
              <a
                href={PROFILE.venture.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#b8c4a4] hover:text-[#eae8e1] transition-colors"
              >
                <span>Veyrith Labs</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
              <button
                type="button"
                onClick={() => handleNavigate('contact')}
                className="hover:text-[#eae8e1] transition-colors cursor-pointer"
              >
                Contact
              </button>
            </div>
          </div>
        </footer>

        {/* Project Lightbox Detail Modal */}
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      </div>
    </MotionConfig>
  );
}
