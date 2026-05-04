import { useRef, useEffect, useState } from 'react';

export function TerraZaHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onLoaded = () => setVideoLoaded(true);
    video.addEventListener('loadeddata', onLoaded);
    return () => video.removeEventListener('loadeddata', onLoaded);
  }, []);

  const toggleMenu = () => setMenuOpen((o) => !o);

  return (
    <div
      className="min-h-screen bg-black text-white overflow-x-hidden"
      style={{ fontFamily: "'Inter', -apple-system, sans-serif", WebkitFontSmoothing: 'antialiased' }}
    >
      {/* HERO */}
      <section className="relative min-h-[100dvh] flex flex-col overflow-hidden">
        {/* Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms]"
          style={{ opacity: videoLoaded ? 1 : 0 }}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="./assets/terraza-hero.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay — lighter so video breathes */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.10) 35%, rgba(0,0,0,0.60) 100%)',
          }}
        />

        {/* NAVBAR */}
        <nav
          className="relative z-10 px-6 pt-5"
          style={{ opacity: 0, animation: 'fadeIn 0.8s ease-out 0.1s forwards' }}
        >
          <div className="flex items-center justify-between max-w-[1200px] mx-auto">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 no-underline">
              <img
                src="/images/logo-wisegen.jpg"
                alt="WG"
                className="w-9 h-9 rounded-lg object-cover"
              />
              <span
                className="text-lg font-semibold"
                style={{
                  background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                WiseGenerative
              </span>
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {['Accueil', 'Solutions', 'Tarifs', 'Contact'].map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  className="text-sm font-medium transition-colors duration-200 hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  {l}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <button
              className="hidden md:block px-5 py-2 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #14B8A6 100%)',
                boxShadow: '0 4px 20px rgba(124,58,237,0.35)',
              }}
            >
              Réserver une Démo
            </button>

            {/* Burger */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex flex-col items-center justify-center gap-[5px] w-11 h-11 rounded-xl cursor-pointer transition-all"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
              aria-label="Menu"
            >
              <span
                className="block w-5 h-0.5 bg-white rounded-sm transition-all duration-300"
                style={
                  menuOpen
                    ? { transform: 'rotate(45deg) translate(4px, 4px)' }
                    : {}
                }
              />
              <span
                className="block w-5 h-0.5 bg-white rounded-sm transition-all duration-300"
                style={menuOpen ? { opacity: 0, width: 0 } : {}}
              />
              <span
                className="block w-5 h-0.5 bg-white rounded-sm transition-all duration-300"
                style={
                  menuOpen
                    ? { transform: 'rotate(-45deg) translate(4px, -4px)' }
                    : {}
                }
              />
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-[99] transition-opacity duration-300"
          style={{
            background: 'rgba(0,0,0,0.6)',
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? 'auto' : 'none',
          }}
        />

        {/* Mobile Menu Panel */}
        <div
          className="fixed top-0 right-0 h-screen w-[280px] z-[100] flex flex-col gap-1 pt-24 px-6 pb-6 transition-[right] duration-300 ease-out"
          style={{
            right: menuOpen ? 0 : '-100%',
            background: 'rgba(10,10,12,0.96)',
            backdropFilter: 'blur(24px) saturate(140%)',
            WebkitBackdropFilter: 'blur(24px) saturate(140%)',
            borderLeft: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {['Accueil', 'Solutions', 'Tarifs', 'Contact'].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-white no-underline text-base font-medium py-4 border-b transition-colors duration-200 hover:text-purple-400"
              style={{ borderBottomColor: 'rgba(255,255,255,0.06)' }}
            >
              {l}
            </a>
          ))}
          <button
            onClick={() => setMenuOpen(false)}
            className="mt-6 w-full py-3.5 rounded-full font-semibold text-white cursor-pointer transition-transform hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, #7C3AED 0%, #14B8A6 100%)',
            }}
          >
            Découvrir les Solutions
          </button>
        </div>

        {/* HERO CONTENT — MINIMALIST */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
              style={{
                opacity: 0,
                animation: 'scaleIn 0.6s ease-out 0.3s forwards',
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.10)',
              }}
            >
              <div
                className="w-4 h-4 rounded flex items-center justify-center text-[9px] font-bold text-white"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED 0%, #14B8A6 100%)',
                }}
              >
                WG
              </div>
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/80">
                TerraZa Conciergerie
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-normal leading-[1.1] mb-5"
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
                opacity: 0,
                animation: 'slideUp 0.9s ease-out 0.5s forwards',
              }}
            >
              L'IA libère votre
              <br />
              <span
                className="font-semibold"
                style={{
                  background:
                    'linear-gradient(135deg, #7C3AED 0%, #14B8A6 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'gradientShift 4s ease infinite',
                }}
              >
                temps précieux
              </span>
            </h1>

            {/* Dialectique AI pitch */}
            <p
              className="text-base md:text-lg leading-relaxed mb-8 max-w-lg mx-auto"
              style={{
                color: 'rgba(255,255,255,0.65)',
                opacity: 0,
                animation: 'slideUp 0.9s ease-out 0.7s forwards',
              }}
            >
              Vous gérez l'exceptionnel. L'IA gère le répétitif.{' '}
              <span className="text-white/90 font-medium">
                Vos clients vivent l'expérience. Vous vivez la tranquillité.
              </span>
            </p>

            {/* CTA */}
            <div
              className="flex flex-wrap items-center justify-center gap-4"
              style={{
                opacity: 0,
                animation: 'slideUp 0.9s ease-out 0.9s forwards',
              }}
            >
              <button
                className="px-8 py-3.5 rounded-full font-semibold text-white transition-all hover:scale-[1.03] hover:-translate-y-0.5 cursor-pointer"
                style={{
                  background:
                    'linear-gradient(135deg, #7C3AED 0%, #14B8A6 100%)',
                  boxShadow: '0 8px 32px rgba(124,58,237,0.35)',
                }}
              >
                Voir comment ça marche
              </button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
        @keyframes gradientShift {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}
