import { motion } from 'motion/react';
import { ArrowUpRight, TrendingUp, Shield, Zap } from 'lucide-react';

export function RivrHero() {
  const stats = [
    { label: 'TVL', value: '$2.4B', icon: TrendingUp },
    { label: 'Protocols', value: '142', icon: Zap },
    { label: 'Security Score', value: '98.5%', icon: Shield },
  ];

  return (
    <section className="relative min-h-screen bg-[#f0f0f0] overflow-hidden flex flex-col">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      ></div>

      {/* Ambient orbs */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gray-400/20 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-gray-300/30 rounded-full blur-[120px]"></div>

      {/* Navbar */}
      <nav className="relative z-20 px-6 md:px-12 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between max-w-6xl mx-auto"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-black font-semibold text-lg tracking-tight">RIVR</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Dashboard', 'Pools', 'Governance', 'Docs'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-black/60 hover:text-black transition-colors text-sm font-medium"
              >
                {link}
              </a>
            ))}
          </div>

          <button className="bg-black text-white rounded-full px-6 py-2.5 text-sm font-medium hover:bg-black/80 transition-colors">
            Launch App
          </button>
        </motion.div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 border border-black/5 text-black/60 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Live on Ethereum, Arbitrum & Base
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl text-black mb-6 tracking-tight leading-[1.1]"
            style={{ fontFamily: "var(--font-helvetica), 'Helvetica Neue', Arial, sans-serif" }}
          >
            The liquidity layer
            <br />
            for DeFi
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-black/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            RIVR aggregates liquidity across chains, enabling seamless swaps,
            yield farming, and governance participation with institutional-grade security.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <button className="bg-black text-white rounded-full px-8 py-3.5 text-sm font-medium hover:bg-black/80 transition-colors flex items-center gap-2">
              Launch Dashboard
              <ArrowUpRight size={16}></ArrowUpRight>
            </button>
            <button className="bg-white/60 border border-black/10 text-black rounded-full px-8 py-3.5 text-sm font-medium hover:bg-white transition-colors">
              View Documentation
            </button>
          </motion.div>

          {/* Stats cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto w-full"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white/40 backdrop-blur-xl border border-black/5 rounded-2xl p-6 text-left hover:bg-white/60 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center">
                    <stat.icon size={18} className="text-black/60"></stat.icon>
                  </div>
                  <span className="text-black/40 text-xs font-medium uppercase tracking-wider">{stat.label}</span>
                </div>
                <div className="text-3xl font-semibold text-black tracking-tight">{stat.value}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="relative z-10 flex justify-center gap-8 py-8 text-black/30 text-xs"
      >
        <a href="#" className="hover:text-black/60 transition-colors">Terms</a>
        <a href="#" className="hover:text-black/60 transition-colors">Privacy</a>
        <a href="#" className="hover:text-black/60 transition-colors">Audits</a>
        <span>© 2026 RIVR Protocol</span>
      </motion.div>
    </section>
  );
}
