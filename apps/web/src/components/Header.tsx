import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants.tsx';

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile drawer on Escape key (R-32 accessibility)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const toggleMobileDropdown = (name: string) => {
    setMobileDropdownOpen(mobileDropdownOpen === name ? null : name);
  };

  const headerBg = isScrolled
    ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200"
    : isMenuOpen
      ? "bg-aruna-950 border-b border-aruna-800"
      : "bg-transparent border-b border-transparent";

  const linkText = isScrolled
    ? "text-slate-700 hover:text-aruna-600"
    : "text-white/90 hover:text-white";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <a href="/" onClick={handleLinkClick} className="flex items-center group" aria-label="FisheryTrade">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1 shadow-md border border-slate-100 group-hover:border-aruna-300 transition-all">
                <img src="/logo.png" alt="FisheryTrade" className="w-full h-full object-contain" />
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7">
            {NAV_LINKS.map((link) => (
              <div key={link.name} className="relative group">
                {link.dropdownItems ? (
                  <button
                    type="button"
                    className={`text-sm font-semibold transition-colors flex items-center py-2 ${linkText}`}
                  >
                    {link.name}
                    <ChevronDownIcon />
                  </button>
                ) : (
                  <a
                    href={link.href}
                    className={`text-sm font-semibold transition-colors flex items-center py-2 ${linkText}`}
                  >
                    {link.name}
                  </a>
                )}

                {/* Dropdown Menu */}
                {link.dropdownItems && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-1">
                    <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden min-w-[240px] py-1.5">
                      {link.dropdownItems.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          target={item.isExternal ? "_blank" : undefined}
                          rel={item.isExternal ? "noopener noreferrer" : undefined}
                          className="block px-4 py-2.5 text-xs font-medium text-slate-800 hover:bg-aruna-50 hover:text-aruna-700 transition-colors"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Action Button: Vitality Coral CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href="https://wa.me/6282241114959?text=Halo%20FisheryTrade,%20saya%20ingin%20meminta%20penawaran%20harga%20pasokan%20ikan%20beku."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-coral-600 hover:bg-coral-700 text-white text-xs font-bold py-2.5 px-5 rounded-lg shadow-sm transition-all flex items-center gap-2 hover:shadow-md cursor-pointer"
            >
              <span>Minta Penawaran B2B</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Buka menu navigasi"
              className={`p-2.5 rounded-lg border transition-colors ${
                isScrolled
                  ? 'border-slate-200 text-slate-800 hover:bg-slate-100'
                  : 'border-white/20 text-white hover:bg-white/10'
              }`}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto">
          <div className="space-y-1">
            {NAV_LINKS.map((link) => (
              <div key={link.name} className="border-b border-slate-100 last:border-0 pb-1">
                {link.dropdownItems ? (
                  <div>
                    <button
                      onClick={() => toggleMobileDropdown(link.name)}
                      className="w-full flex items-center justify-between py-2.5 text-sm font-semibold text-slate-900"
                    >
                      <span>{link.name}</span>
                      <svg className={`w-4 h-4 transition-transform ${mobileDropdownOpen === link.name ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {mobileDropdownOpen === link.name && (
                      <div className="pl-3 pb-2 space-y-1 bg-slate-50 rounded-lg p-2 mb-2">
                        {link.dropdownItems.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            onClick={handleLinkClick}
                            target={item.isExternal ? "_blank" : undefined}
                            rel={item.isExternal ? "noopener noreferrer" : undefined}
                            className="block py-1.5 text-xs text-slate-700 hover:text-aruna-600"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={link.href}
                    onClick={handleLinkClick}
                    className="block py-2.5 text-sm font-semibold text-slate-900 hover:text-aruna-600"
                  >
                    {link.name}
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <a
              href="https://wa.me/6282241114959?text=Halo%20FisheryTrade,%20saya%20ingin%20meminta%20penawaran%20harga%20pasokan%20ikan%20beku."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-coral-600 hover:bg-coral-700 text-white text-xs font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Minta Penawaran B2B (WhatsApp)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
