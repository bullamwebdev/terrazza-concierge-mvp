import { motion } from 'motion/react';
import { ArrowUpRight, Shield } from 'lucide-react';

export function BottomRightCorner() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-10"
    >
      <div className="flex flex-col items-end gap-3">
        {/* Security badge */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/30 rounded-full px-4 py-2 flex items-center gap-2">
          <Shield className="w-4 h-4 text-green-600" />
          <span className="text-xs font-medium text-[#5E6470]">Audited by CertiK</span>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-[#5E6470]/60">Scroll to explore</span>
          <div className="w-8 h-8 rounded-full bg-white/40 backdrop-blur-md border border-white/20 flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 text-[#5E6470] rotate-90" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
