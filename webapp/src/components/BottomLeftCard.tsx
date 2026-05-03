import { motion } from 'motion/react';
import { TrendingUp } from 'lucide-react';

export function BottomLeftCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-10"
    >
      <div className="bg-white/60 backdrop-blur-xl border border-white/30 rounded-2xl p-5 md:p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[rgba(30,50,90,0.1)] flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-[rgba(30,50,90,0.8)]" />
          </div>
          <span className="text-xs font-medium text-[#5E6470] uppercase tracking-wider">Total Value Locked</span>
        </div>
        <div className="text-2xl md:text-3xl font-semibold text-[rgba(30,50,90,0.9)] tracking-tight">$2.4B</div>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-xs text-green-600 font-medium">+12.5%</span>
          <span className="text-xs text-[#5E6470]/60">vs last month</span>
        </div>
      </div>
    </motion.div>
  );
}
