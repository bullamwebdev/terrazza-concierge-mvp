import { useRef, useEffect } from 'react';

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4';

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId: number;
    const fadeDuration = 0.5;

    const update = () => {
      const duration = video.duration;
      if (!duration || isNaN(duration)) {
        rafId = requestAnimationFrame(update);
        return;
      }

      const current = video.currentTime;

      // Fade in at start (first 0.5s)
      if (current < fadeDuration) {
        video.style.opacity = String(current / fadeDuration);
      }
      // Fade out at end (last 0.5s)
      else if (current > duration - fadeDuration) {
        video.style.opacity = String((duration - current) / fadeDuration);
      }
      // Full opacity in middle
      else {
        video.style.opacity = '1';
      }

      rafId = requestAnimationFrame(update);
    };

    const handleEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
      }, 100);
    };

    video.addEventListener('ended', handleEnded);
    rafId = requestAnimationFrame(update);

    return () => {
      video.removeEventListener('ended', handleEnded);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute w-full object-cover z-0"
        style={{
          top: '300px',
          left: 0,
          right: 0,
          bottom: 0,
          height: 'calc(100% - 300px)',
          opacity: 0,
        }}
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white z-[1] pointer-events-none" />
    </>
  );
}
