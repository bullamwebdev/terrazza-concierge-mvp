import { useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';

export function WiseGenerativeHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const opacityRef = useRef(0);
  const fadingOutRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const fadeDuration = 500;

  const cancelFade = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const fadeTo = useCallback((targetOpacity: number, onComplete?: () => void) => {
    cancelFade();
    const video = videoRef.current;
    if (!video) return;

    const startOpacity = opacityRef.current;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / fadeDuration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startOpacity + (targetOpacity - startOpacity) * eased;
      opacityRef.current = current;
      video.style.opacity = String(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
        onComplete?.();
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    fadeTo(1);

    const handleTimeUpdate = () => {
      if (!video) return;
      const timeRemaining = video.duration - video.currentTime;

      if (timeRemaining <= 0.55 && !fadingOutRef.current) {
        fadingOutRef.current = true;
        fadeTo(0, () => {
          setTimeout(() => {
            if (video) {
              video.currentTime = 0;
              video.play();
              fadeTo(1);
              fadingOutRef.current = false;
            }
          }, 100);
        });
      }
    };

    const handleEnded = () => {
      if (!fadingOutRef.current) {
        fadingOutRef.current = true;
        fadeTo(0, () => {
          setTimeout(() => {
            if (video) {
              video.currentTime = 0;
              video.play();
              fadeTo(1);
              fadingOutRef.current = false;
            }
          }, 100);
        });
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      cancelFade();
    };
  }, [fadeTo]);

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Background Image (Martinique) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=1920&q=80')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-white/90" />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="px-6 md:px-12 lg:px-16 pt-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-between max-w-6xl mx-auto"
          >
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-teal-500 flex items-center justify-center shadow-lg shadow-purple-200">
                <span className="text-white font-bold text-sm">WG</span>
              </div>
              <span className="text-xl font-semibold tracking-tight"
                style={{ 
                  background: 'linear-gradient(135deg, #7C3AED 0%, #14B8A6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                WiseGenerative
              </span>
            </div>

            {/* Center Links */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { label: 'Accueil', active: true },
                { label: 'Solutions', active: false },
                { label: 'Tarifs', active: false },
                { label: 'Contact', active: false },
              ].map((link) => (
                <a
                  key={link.label}
                  href={`#${link.label.toLowerCase()}`}
                  className="text-sm font-medium transition-colors"
                  style={{ 
                    color: link.active ? '#7C3AED' : '#6B7280',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <button 
              className="px-6 py-2.5 rounded-full text-sm font-medium text-white shadow-lg transition-transform hover:scale-[1.03]"
              style={{ 
                background: 'linear-gradient(135deg, #7C3AED 0%, #14B8A6 100%)',
                boxShadow: '0 8px 30px rgba(124, 58, 237, 0.25)'
              }}
            >
              Réserver une Démo
            </button>
          </motion.div>
        </nav>

        {/* Hero Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md mb-6 border border-purple-100">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-600 to-teal-500 flex items-center justify-center">
                <span className="text-white font-bold text-[10px]">WG</span>
              </div>
              <span className="text-sm font-medium text-purple-700">Solutions IA Innovantes</span>
            </div>

            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6 tracking-tight leading-[1.1]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1F2937' }}
            >
              Bonjour <span 
                className="font-semibold"
                style={{ 
                  background: 'linear-gradient(135deg, #7C3AED 0%, #14B8A6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >Andrew</span>,<br />
              l'IA transforme votre conciergerie
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed"
              style={{ color: '#4B5563' }}
            >
              Cette page est pour vous. Pas de jargon technique — juste des exemples concrets, 
              des chiffres réels, et ce que l'IA peut faire pour votre business dès demain.
            </motion.p>

            {/* Andrew Greeting Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/70 backdrop-blur-md shadow-lg border border-white/50"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-teal-100 flex items-center justify-center text-xl">
                👋
              </div>
              <div className="text-left">
                <div className="text-sm font-medium" style={{ color: '#1F2937' }}>Présentation personnalisée</div>
                <div className="text-xs" style={{ color: '#6B7280' }}>Conciergerie de luxe · Martinique · Caraïbes</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center justify-center gap-4 mt-8"
            >
              <button 
                className="px-8 py-3.5 rounded-full font-medium text-white transition-transform hover:scale-[1.03] shadow-xl"
                style={{ 
                  background: 'linear-gradient(135deg, #7C3AED 0%, #14B8A6 100%)',
                  boxShadow: '0 8px 30px rgba(124, 58, 237, 0.3)'
                }}
              >
                Découvrir les Solutions
              </button>
              <button className="px-8 py-3.5 rounded-full font-medium border-2 transition-colors hover:bg-gray-50"
                style={{ borderColor: '#E5E7EB', color: '#374151' }}
              >
                Voir la Vidéo
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
