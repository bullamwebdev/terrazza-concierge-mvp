import { useState } from 'react';
import { Globe, ArrowRight, ExternalLink, Send } from 'lucide-react';
import { motion } from 'motion/react';

export function AsmeHero() {
  const [email, setEmail] = useState('');

  return (
    <section className="relative min-h-screen bg-black overflow-hidden flex flex-col">
      {/* Background ambient glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[100px]"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-20 px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto liquid-glass-dark"
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Globe size={24} className="text-white"></Globe>
            <span className="text-white font-semibold text-lg">Asme</span>
          </div>

          {/* Center links — hidden mobile */}
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Pricing', 'About'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-white/80 hover:text-white transition-colors text-sm font-medium"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-4">
            <button className="text-white text-sm font-medium hover:text-white/80 transition-colors">
              Sign Up
            </button>
            <button className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium hover:bg-white/10 transition-colors">
              Login
            </button>
          </div>
        </motion.div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[10%]">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-6xl lg:text-7xl text-white mb-8 tracking-tight whitespace-nowrap"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Built for the curious
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl w-full space-y-4"
        >
          {/* Email input bar */}
          <div className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder:text-white/40 text-base outline-none"
            />
            <button className="bg-white rounded-full p-3 text-black hover:bg-gray-100 transition-colors">
              <ArrowRight size={20}></ArrowRight>
            </button>
          </div>

          {/* Subtitle */}
          <p className="text-white/60 text-sm leading-relaxed px-4">
            Stay updated with the latest news and insights. Subscribe to our newsletter today and never miss out on exciting updates.
          </p>

          {/* Manifesto button */}
          <button className="mx-auto liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors">
            Read our manifesto
          </button>
        </motion.div>
      </div>

      {/* Social icons footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="relative z-10 flex justify-center gap-4 pb-12"
      >
        {[
          { icon: ExternalLink, label: 'Blog' },
          { icon: Send, label: 'Newsletter' },
          { icon: Globe, label: 'Website' },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            aria-label={label}
            className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
          >
            <Icon size={20}></Icon>
          </button>
        ))}
      </motion.div>
    </section>
  );
}
