import { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import school from '../data/school';

export default function FloatingElements() {
  const [showTop, setShowTop] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 no-print">
      {/* WhatsApp */}
      <a
        href={`https://wa.me/${school.social.whatsapp.replace(/\D/g, '')}`}
        target="_blank"
        rel="noreferrer"
        className="whatsapp-btn w-12 h-12 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:scale-110"
          aria-label={t.backToTop}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
