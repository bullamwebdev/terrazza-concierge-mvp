import { AsmeHero } from './components/AsmeHero';
import { RivrHero } from './components/RivrHero';
import { Hero } from './components/Hero';
import { AetheraHero } from './components/AetheraHero';
import { WiseGenerativeHero } from './components/WiseGenerativeHero';

function App() {
  const params = new URLSearchParams(window.location.search);
  const demo = params.get('demo');

  if (demo === 'asme') return <AsmeHero />;
  if (demo === 'rivr') return <RivrHero />;
  if (demo === 'fluid') return <Hero />;
  if (demo === 'aethera') return <AetheraHero />;
  if (demo === 'wise') return <WiseGenerativeHero />;

  // Default: WiseGenerative branded hero
  return <WiseGenerativeHero />;
}

export default App;
