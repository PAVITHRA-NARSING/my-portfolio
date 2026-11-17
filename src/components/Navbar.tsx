import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { PageRoute, PROFILE } from '../data/portfolioData';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
}

const NAV_ITEMS: { id: PageRoute; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'projects', label: 'Projects' },
  { id: 'veyrith', label: 'Veyrith Labs' },
  { id: 'journey', label: 'Journey' },
];

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSelect = (page: PageRoute) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#08090b]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-6">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleSelect('overview')}
          className="font-display text-base font-semibold tracking-tight text-[#eae8e1] transition-colors hover:text-[#b8c4a4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8c4a4]/60 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
        >
          {PROFILE.name}
        </button>

        {/* Zone 2: 4 single-line text nav links with animated active underline */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`relative py-1.5 text-sm font-medium transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8c4a4]/60 rounded-sm ${
                  isActive ? 'text-[#eae8e1]' : 'text-[#9ea39f] hover:text-[#eae8e1]'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-x-0 -bottom-[1px] h-[1.5px] bg-[#b8c4a4]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleSelect('contact')}
            className={`hidden sm:inline-flex items-center justify-center rounded-lg px-4 py-2 text-xs font-medium transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8c4a4]/70 ${
              currentPage === 'contact'
                ? 'bg-[#b8c4a4] text-[#08090b]'
                : 'bg-[#eae8e1] text-[#08090b] hover:bg-[#b8c4a4]'
            }`}
          >
            Get in Touch
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="inline-flex md:hidden h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#eae8e1] transition-colors hover:bg-white/[0.08] cursor-pointer"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-white/[0.07] bg-[#0b0d10]/95 backdrop-blur-2xl md:hidden"
          >
            <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4" aria-label="Mobile navigation">
              {NAV_ITEMS.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item.id)}
                    className={`flex items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-white/[0.07] text-[#eae8e1]'
                        : 'text-[#9ea39f] hover:bg-white/[0.04] hover:text-[#eae8e1]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="text-xs text-[#b8c4a4]">Active</span>}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => handleSelect('contact')}
                className="mt-2 rounded-lg bg-[#eae8e1] px-4 py-3 text-center text-sm font-medium text-[#08090b] transition-colors hover:bg-[#b8c4a4] cursor-pointer"
              >
                Get in Touch
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
