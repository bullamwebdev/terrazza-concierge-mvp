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
    <div className="min-h-screen bg-black text-white overflow-x-hidden" style={{ fontFamily: "'Inter', -apple-system, sans-serif", WebkitFontSmoothing: 'antialiased' }}>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[100dvh] flex flex-col overflow-hidden">
        {/* Video Background */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: videoLoaded ? 1 : 0, transform: 'translateY(0)' }}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="./assets/terraza-hero.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.75) 100%)',
          }}
        />

        {/* ===== NAVBAR ===== */}
        <nav className="relative z-10 px-6 pt-5" style={{ opacity: 0, animation: 'fadeIn 0.8s ease-out 0.1s forwards' }}>
          <div className="flex items-center justify-between max-w-[1200px] mx-auto gap-6">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 no-underline shrink-0">
              <img
                src="/images/logo-wisegen.jpg"
                alt="WG"
                className="w-9 h-9 rounded-lg object-cover"
              />
              <span className="text-lg font-semibold" style={{ background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                WiseGenerative
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center justify-center flex-1 gap-7">
              {['Accueil', 'Solutions', 'Tarifs', 'Contact'].map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  className="text-sm font-medium transition-colors hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  {label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <button
              className="hidden md:block px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #14B8A6 100%)',
                boxShadow: '0 4px 20px rgba(124,58,237,0.4)',
              }}
            >
              Réserver une Démo
            </button>

            {/* Burger */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex flex-col items-center justify-center gap-[5px] w-11 h-11 rounded-xl cursor-pointer transition-all"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
              aria-label="Menu"
            >
              <span className="block w-5 h-0.5 bg-white rounded-sm transition-all" style={menuOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}} />
              <span className="block w-5 h-0.5 bg-white rounded-sm transition-all" style={menuOpen ? { opacity: 0 } : {}} />
              <span className="block w-5 h-0.5 bg-white rounded-sm transition-all" style={menuOpen ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {}} />
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-[99] transition-opacity"
          style={{ background: 'rgba(0,0,0,0.5)', opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none' }}
        />
        {/* Mobile Menu Panel */}
        <div
          className="fixed top-0 right-0 h-screen w-[280px] z-[100] flex flex-col gap-2 pt-20 px-6 pb-6 transition-[right] duration-300"
          style={{
            right: menuOpen ? 0 : '-100%',
            background: 'rgba(0,0,0,0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          {['Accueil', 'Solutions', 'Tarifs', 'Contact'].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-white no-underline text-lg font-medium py-4 border-b transition-colors hover:text-purple-400"
              style={{ borderBottomColor: 'rgba(255,255,255,0.1)' }}
            >
              {label}
            </a>
          ))}
          <a
            href="#"
            onClick={() => setMenuOpen(false)}
            className="mt-4 text-center py-4 rounded-full font-semibold text-white no-underline"
            style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #14B8A6 100%)' }}
          >
            Découvrir les Solutions
          </a>
        </div>

        {/* ===== HERO CONTENT ===== */}
        <div className="relative z-10 flex-1 flex flex-col justify-end px-6 pb-12 max-w-[1200px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8 lg:gap-12 items-end">
            {/* Left Column */}
            <div>
              {/* Eyebrow */}
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5"
                style={{
                  opacity: 0,
                  animation: 'scaleIn 0.6s ease-out 0.3s forwards',
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #14B8A6 100%)' }}
                >
                  WG
                </div>
                <span className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.9)' }}>
                  Solutions IA Innovantes
                </span>
              </div>

              {/* Title */}
              <h1
                className="font-normal leading-[1.12] mb-4"
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: 'clamp(2rem, 5vw, 4rem)',
                  opacity: 0,
                  animation: 'slideUp 0.8s ease-out 0.5s forwards',
                }}
              >
                Bonjour{' '}
                <span
                  className="font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #7C3AED 0%, #14B8A6 100%)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'gradientShift 4s ease infinite',
                  }}
                >
                  Andrew
                </span>
                ,<br />
                l'IA transforme votre conciergerie
              </h1>

              {/* Subtitle */}
              <p
                className="text-base leading-relaxed mb-7 max-w-[460px]"
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  opacity: 0,
                  animation: 'slideUp 0.8s ease-out 0.7s forwards',
                }}
              >
                Cette page est pour vous. Pas de jargon technique — juste des exemples concrets,
                des chiffres réels, et ce que l'IA peut faire pour votre business dès demain.
              </p>

              {/* Greeting Card */}
              <div
                className="inline-flex items-center gap-3.5 px-5 py-3.5 rounded-2xl"
                style={{
                  opacity: 0,
                  animation: 'slideUp 0.8s ease-out 0.9s forwards',
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-2xl shrink-0"
                  style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.3) 0%, rgba(20,184,166,0.3) 100%)' }}
                >
                  👋
                </div>
                <div className="text-left">
                  <div className="text-[15px] font-semibold text-white">Présentation personnalisée</div>
                  <div className="text-[13px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    Conciergerie de luxe · Martinique · Caraïbes
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div
                className="flex flex-wrap gap-4 mt-6"
                style={{ opacity: 0, animation: 'slideUp 0.8s ease-out 1.1s forwards' }}
              >
                {[
                  { num: '+30%', label: 'revenus' },
                  { num: '-50%', label: 'charge admin' },
                  { num: '24/7', label: 'disponible' },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="inline-flex items-baseline gap-1.5 px-4 py-2 rounded-full"
                    style={{
                      background: 'rgba(124,58,237,0.15)',
                      border: '1px solid rgba(124,58,237,0.25)',
                    }}
                  >
                    <span
                      className="text-lg font-bold"
                      style={{
                        background: 'linear-gradient(135deg, #7C3AED 0%, #14B8A6 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {s.num}
                    </span>
                    <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inline keyframe styles for this component */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes gradientShift {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}
