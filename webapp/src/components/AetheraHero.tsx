import { VideoBackground } from './VideoBackground';
import { Navigation } from './Navigation';

export function AetheraHero() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#FFFFFF]">
      {/* Video layer */}
      <VideoBackground />

      {/* Content */}
      <div className="relative z-10 flex flex-col">
        <Navigation />

        <section
          className="flex flex-col items-center justify-center text-center px-6 pb-40"
          style={{ paddingTop: 'calc(8rem - 75px)' }}
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl max-w-7xl font-normal leading-[0.95] tracking-[-2.46px] text-[#000000] animate-fade-rise">
            Beyond <em className="text-[#6F6F6F] not-italic">
              silence,
            </em>{" "}
            we build <em className="text-[#6F6F6F] not-italic">
              the eternal.
            </em>
          </h1>

          <p className="text-base sm:text-lg max-w-2xl mt-8 leading-relaxed text-[#6F6F6F] animate-fade-rise-delay">
            Building platforms for brilliant minds, fearless makers, and thoughtful souls. Through the noise, we craft digital havens for deep work and pure flows.
          </p>

          <button className="rounded-full px-14 py-5 text-base mt-12 bg-[#000000] text-[#FFFFFF] hover:scale-[1.03] transition-transform animate-fade-rise-delay-2">
            Begin Journey
          </button>
        </section>
      </div>
    </div>
  );
}
