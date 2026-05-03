import { HeroSection } from './components/HeroSection';
import { AsmeHero } from './components/AsmeHero';
import { RivrHero } from './components/RivrHero';

function App() {
  // Read URL param to show different hero demos
  const params = new URLSearchParams(window.location.search);
  const demo = params.get('demo');

  if (demo === 'asme') return <AsmeHero />;
  if (demo === 'rivr') return <RivrHero />;

  return <HeroSection />;
}

export default App;
