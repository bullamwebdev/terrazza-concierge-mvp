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
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: 'translateY(17%)', opacity: 0 }}
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4"
          type="video/mp4"
        />
      </video>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="px-6 md:px-12 lg:px-16 pt-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="liquid-glass-dark rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto"
          >
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-teal-400 flex items-center justify-center">
                <span className="text-white font-bold text-sm">WG</span>
              </div>
              <span className="text-white font-semibold text-lg">WiseGenerative</span>
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
                  className="text-sm transition-colors"
                  style={{ color: link.active ? '#ffffff' : 'rgba(255,255,255,0.6)' }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <button className="bg-gradient-to-r from-purple-600 to-teal-500 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:scale-[1.03] transition-transform">
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white mb-6 tracking-tight leading-[1.05]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              L'IA au Service de Votre{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400">
                Conciergerie
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-lg text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Comment l'intelligence artificielle transforme concrètement une conciergerie de luxe en Martinique. 
              Exemples réels, chiffres, et argumentation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <button className="bg-white text-black px-8 py-3.5 rounded-full font-medium hover:bg-gray-100 transition-colors">
                Découvrir les Solutions
              </button>
              <button className="liquid-glass-dark border border-white/20 text-white px-8 py-3.5 rounded-full font-medium hover:bg-white/10 transition-colors">
                Voir la Vidéo
              </button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex justify-center gap-8 md:gap-16 mt-16 pb-12"
          >
            {[
              { value: '40%', label: 'Temps économisé' },
              { value: '24/7', label: 'Disponibilité' },
              { value: '+30%', label: 'Satisfaction client' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-semibold text-white">{stat.value}</div>
                <div className="text-xs md:text-sm text-white/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
