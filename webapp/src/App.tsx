import { HeroSection } from './components/HeroSection';
import { AsmeHero } from './components/AsmeHero';
import { RivrHero } from './components/RivrHero';
import { Hero } from './components/Hero';
import { AetheraHero } from './components/AetheraHero';

function App() {
  const params = new URLSearchParams(window.location.search);
  const demo = params.get('demo');

  if (demo === 'asme') return <AsmeHero />;
  if (demo === 'rivr') return <RivrHero />;
  if (demo === 'fluid') return <Hero />;
  if (demo === 'aethera') return <AetheraHero />;

  return <HeroSection />;
}

export default App;
