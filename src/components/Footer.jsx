import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Phone, Mail } from 'lucide-react';

function FbIcon() { return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>; }
function IgIcon() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>; }
function YtIcon() { return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="white" points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02"/></svg>; }
import { useLang } from '../context/LanguageContext';
import school from '../data/school';

export default function Footer() {
  const { t, lang } = useLang();

  const quickLinks = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.about, path: '/about' },
    { label: t.nav.academics, path: '/academics' },
    { label: t.nav.activities, path: '/activities' },
    { label: t.nav.gallery, path: '/gallery' },
    { label: t.nav.notices, path: '/notices' },
    { label: t.nav.contact, path: '/contact' },
  ];

  const importantLinks = [
    { label: t.footer.admissionProcess, path: '/admission' },
    { label: t.footer.academicInfo, path: '/academics' },
    { label: t.footer.programs, path: '/activities' },
    { label: t.nav.gallery, path: '/gallery' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-700">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                <GraduationCap className="text-white w-6 h-6" />
              </div>
              <div>
                <div className="text-white font-bold text-base" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {school.name}
                </div>
                <div className="text-blue-400 text-xs">{lang === 'mr' ? school.taglineMr : school.taglineEn}</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">{t.footer.desc}</p>
            <div className="flex gap-3">
              <a href={school.social.facebook} target="_blank" rel="noreferrer"
                className="w-9 h-9 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                <FbIcon />
              </a>
              <a href={school.social.instagram} target="_blank" rel="noreferrer"
                className="w-9 h-9 bg-slate-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors">
                <IgIcon />
              </a>
              <a href={school.social.youtube} target="_blank" rel="noreferrer"
                className="w-9 h-9 bg-slate-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors">
                <YtIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-slate-400 hover:text-blue-400 text-sm transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">{t.footer.importantLinks}</h4>
            <ul className="space-y-2">
              {importantLinks.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-slate-400 hover:text-blue-400 text-sm transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full flex-shrink-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">{t.footer.contactUs}</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-400 text-sm">{lang === 'mr' ? school.address : school.addressEn}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href={`tel:${school.phone}`} className="text-slate-400 hover:text-blue-400 text-sm transition-colors">{school.phone}</a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href={`mailto:${school.email}`} className="text-slate-400 hover:text-blue-400 text-sm transition-colors">{school.email}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-sm">
            © 2026 {school.name}. {t.footer.rights}
          </p>
          <p className="text-slate-600 text-xs">
            {lang === 'mr' ? school.classesMr : school.classesEn} | {lang === 'mr' ? school.locationMr : school.locationEn}
          </p>
        </div>
      </div>
    </footer>
  );
}
