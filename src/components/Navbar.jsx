import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, GraduationCap } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import school from '../data/school';

export default function Navbar() {
  const { t, lang, switchLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { key: 'home', path: '/' },
    {
      key: 'about', path: '/about',
      sub: [
        { key: 'ourSchool', path: '/about#school' },
        { key: 'visionMission', path: '/about#vision' },
        { key: 'principalMessage', path: '/about#principal' },
        { key: 'history', path: '/about#history' },
      ],
    },
    {
      key: 'academics', path: '/academics',
      sub: [
        { key: 'class5', path: '/academics#class5' },
        { key: 'class6', path: '/academics#class6' },
        { key: 'class7', path: '/academics#class7' },
        { key: 'class8', path: '/academics#class8' },
        { key: 'class9', path: '/academics#class9' },
        { key: 'class10', path: '/academics#class10' },
      ],
    },
    { key: 'studentLife', path: '/activities' },
    { key: 'activities', path: '/activities#special' },
    { key: 'facilities', path: '/facilities' },
    { key: 'gallery', path: '/gallery' },
    { key: 'notices', path: '/notices' },
    { key: 'contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path.split('#')[0]);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg shadow-blue-900/10' : 'bg-white/95 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
              <GraduationCap className="text-white w-5 h-5 lg:w-6 lg:h-6" />
            </div>
            <div className="hidden sm:block">
              <div className="text-navy-900 font-bold text-sm lg:text-base leading-tight" style={{ fontFamily: 'Playfair Display, serif', color: '#0a1628' }}>
                {school.name}
              </div>
              <div className="text-xs text-blue-600 font-medium">{lang === 'mr' ? school.taglineMr : school.taglineEn}</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav ref={dropdownRef} className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.key} className="relative">
                {link.sub ? (
                  <button
                    onMouseEnter={() => setActiveDropdown(link.key)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {t.nav[link.key]}
                    <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === link.key ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {t.nav[link.key]}
                  </Link>
                )}

                {link.sub && activeDropdown === link.key && (
                  <div
                    onMouseEnter={() => setActiveDropdown(link.key)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-xl shadow-blue-900/10 border border-blue-50 py-2 nav-dropdown"
                  >
                    {link.sub.map((sub) => (
                      <Link
                        key={sub.key}
                        to={sub.path}
                        className="block px-4 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        {t.nav[link.key === 'about' ? 'aboutSub' : 'academicsSub'][sub.key]}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Language switcher */}
            <div className="hidden sm:flex items-center bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => switchLang('mr')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  lang === 'mr' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                मराठी
              </button>
              <button
                onClick={() => switchLang('en')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  lang === 'en' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                English
              </button>
            </div>

            {/* CTA */}
            <Link
              to="/admission"
              className="hidden sm:flex bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-md shadow-blue-500/30"
            >
              {t.nav.admissionBtn}
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="xl:hidden bg-white border-t border-blue-50 max-h-screen overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            {/* Lang switcher mobile */}
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-3">
              <button
                onClick={() => switchLang('mr')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  lang === 'mr' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                मराठी
              </button>
              <button
                onClick={() => switchLang('en')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  lang === 'en' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                English
              </button>
            </div>

            {navLinks.map((link) => (
              <div key={link.key}>
                <Link
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path) ? 'text-blue-600 bg-blue-50' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {t.nav[link.key]}
                </Link>
                {link.sub && (
                  <div className="pl-4 space-y-1 mt-1">
                    {link.sub.map((sub) => (
                      <Link
                        key={sub.key}
                        to={sub.path}
                        className="block px-4 py-2 rounded-lg text-xs text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        {t.nav[link.key === 'about' ? 'aboutSub' : 'academicsSub'][sub.key]}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              to="/admission"
              className="block mt-4 bg-blue-600 text-white text-center py-3 rounded-xl font-semibold text-sm"
            >
              {t.nav.admissionBtn}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
