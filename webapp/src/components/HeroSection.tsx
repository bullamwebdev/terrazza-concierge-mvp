import { useRef, useEffect, useCallback } from 'react';
import { AnimatedHeading } from './AnimatedHeading';
import { FadeIn } from './FadeIn';

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const opacityRef = useRef(0);
  const fadingOutRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const fadeDuration = 500; // ms

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
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
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

    // Initial fade-in
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
      // Backup in case timeupdate doesn't fire precisely
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
          <div className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-semibold tracking-tight text-white">
              VEX
            </div>

            {/* Center Links — hidden on mobile */}
            <div className="hidden md:flex items-center gap-8">
              {['Story', 'Investing', 'Building', 'Advisory'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <button className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors duration-200">
              Start a Chat
            </button>
          </div>
        </nav>

        {/* Hero Content — pushed to bottom */}
        <div className="flex-1 flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-12 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-end gap-8">
            {/* Left Column */}
            <div>
              <AnimatedHeading
                text="Shaping tomorrow\nwith vision and action."
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white mb-4"
                delay={200}
                charDelay={30}
              />

              <FadeIn delay={800} duration={1000}>
                <p className="text-base md:text-lg text-gray-300 mb-5 max-w-xl">
                  We back visionaries and craft ventures that define what comes next.
                </p>
              </FadeIn>

              <FadeIn delay={1200} duration={1000}>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
                    Start a Chat
                  </button>
                  <button className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-all duration-200">
                    Explore Now
                  </button>
                </div>
              </FadeIn>
            </div>

            {/* Right Column — Tag */}
            <FadeIn delay={1400} duration={1000}>
              <div className="flex items-end justify-start lg:justify-end">
                <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl"
                >
                  <span className="text-lg md:text-xl lg:text-2xl font-light text-white"
                  >
                    Investing. Building. Advisory.
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
