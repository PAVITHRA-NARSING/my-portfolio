import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Collaboration');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  return (
    <section aria-labelledby="contact-heading" className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Left Info Column */}
      <div className="lg:col-span-5 flex flex-col justify-between gap-6">
        <div>
          <p className="text-xs font-medium text-[#b8c4a4]">Connect · Hyderabad</p>
          <h2
            id="contact-heading"
            className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#eae8e1] sm:text-4xl"
          >
            Start a Conversation
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#9ea39f]">
            Open to ML engineering collaborations, computer vision research, hackathon teams,
            and early conversations around Veyrith Labs.
          </p>
        </div>

        <div className="smoky-glass rounded-2xl p-6 space-y-5">
          <div>
            <p className="text-xs text-[#9ea39f]">Direct Email</p>
            <div className="mt-1.5 flex items-center justify-between gap-3">
              <span className="font-mono text-sm text-[#eae8e1] truncate">
                {PROFILE.email}
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-[#eae8e1] transition-colors hover:bg-white/[0.09] whitespace-nowrap shrink-0 cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-[#b8c4a4]" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="border-t border-white/[0.07] pt-4">
            <p className="text-xs text-[#9ea39f]">Campus</p>
            <p className="mt-1 text-sm text-[#eae8e1]">{PROFILE.college}</p>
            <p className="mt-0.5 text-xs text-[#9ea39f]">{PROFILE.location}</p>
          </div>

          <div className="border-t border-white/[0.07] pt-4">
            <p className="text-xs text-[#9ea39f]">Venture</p>
            <a
              href={PROFILE.venture.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-[#b8c4a4] transition-colors hover:text-[#eae8e1]"
            >
              <span>Veyrith Labs · veyrith-labs.com</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Right Form Column */}
      <div className="lg:col-span-7 smoky-glass-elevated rounded-2xl p-6 sm:p-8">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[340px] flex-col items-start justify-center gap-4"
          >
            <p className="text-xs font-medium text-[#b8c4a4]">Message Prepared</p>
            <h3 className="font-display text-2xl font-semibold text-[#eae8e1]">
              Thank you, {name}.
            </h3>
            <p className="max-w-md text-sm leading-relaxed text-[#9ea39f]">
              Your note regarding <span className="text-[#eae8e1]">{topic}</span> has been logged.
              You can also reach out directly at{' '}
              <span className="font-mono text-[#eae8e1]">{PROFILE.email}</span> or connect via
              Veyrith Labs.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setName('');
                setEmail('');
                setMessage('');
              }}
              className="mt-2 rounded-lg border border-white/15 bg-white/[0.05] px-4 py-2 text-xs font-medium text-[#eae8e1] transition-colors hover:bg-white/[0.1] cursor-pointer"
            >
              Send Another Note
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-medium text-[#9ea39f]">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="mt-2 w-full rounded-lg border border-white/10 bg-[#07080a]/75 px-3.5 py-2.5 text-sm text-[#eae8e1] placeholder-[#9ea39f]/50 transition-colors focus:border-[#b8c4a4] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs font-medium text-[#9ea39f]">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="mt-2 w-full rounded-lg border border-white/10 bg-[#07080a]/75 px-3.5 py-2.5 text-sm text-[#eae8e1] placeholder-[#9ea39f]/50 transition-colors focus:border-[#b8c4a4] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <span className="block text-xs font-medium text-[#9ea39f]">Topic</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {['Collaboration', 'ML / OpenCV', 'LLM Training', 'Veyrith Labs'].map((item) => {
                  const active = topic === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setTopic(item)}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-[#eae8e1] text-[#08090b]'
                          : 'border border-white/10 bg-white/[0.03] text-[#9ea39f] hover:text-[#eae8e1]'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-medium text-[#9ea39f]">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share project details, research ideas, or hackathon plans..."
                className="mt-2 w-full rounded-lg border border-white/10 bg-[#07080a]/75 px-3.5 py-2.5 text-sm text-[#eae8e1] placeholder-[#9ea39f]/50 transition-colors focus:border-[#b8c4a4] focus:outline-none resize-none"
              />
            </div>

            <div className="flex items-center justify-end pt-1">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-[#eae8e1] px-5 py-2.5 text-sm font-medium text-[#08090b] transition-colors hover:bg-[#b8c4a4] cursor-pointer"
              >
                <span>Send Message</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
