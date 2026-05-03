const menuItems = [
  { label: 'Home', active: true },
  { label: 'Studio', active: false },
  { label: 'About', active: false },
  { label: 'Journal', active: false },
  { label: 'Reach Us', active: false },
];

export function Navigation() {
  return (
    <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto w-full relative z-10">
      {/* Logo */}
      <div className="text-3xl tracking-tight font-[Instrument_Serif] text-[#000000]">
        Aethera
        <sup className="text-sm">®</sup>
      </div>

      {/* Center menu */}
      <ul className="hidden md:flex items-center gap-8">
        {menuItems.map((item) => (
          <li
            key={item.label}
            className="text-sm transition-colors cursor-pointer"
            style={{ color: item.active ? '#000000' : '#6F6F6F' }}
          >
            {item.label}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button className="rounded-full px-6 py-2.5 text-sm bg-[#000000] text-[#FFFFFF] hover:scale-[1.03] transition-transform">
        Begin Journey
      </button>
    </nav>
  );
}
