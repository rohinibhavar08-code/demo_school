import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import galleryMock from '../data/gallery';
import { getGallery } from '../lib/api';
const fadeUp = {
  hidden: { opacity: 0, scale: 0.95 },
  show: (i = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.4, delay: i * 0.05 } }),
};

export default function Gallery() {
  const { t, lang } = useLang();
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightbox, setLightbox] = useState(null); // index

  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    async function loadGallery() {
      const data = await getGallery();
      setGallery(data);
    }
    loadGallery();
  }, []);

  const categories = [
    { key: 'all', labelMr: 'सर्व', labelEn: 'All' },
    { key: 'academic', labelMr: 'शैक्षणिक', labelEn: 'Academic' },
    { key: 'sports', labelMr: 'क्रीडा', labelEn: 'Sports' },
    { key: 'cultural', labelMr: 'सांस्कृतिक', labelEn: 'Cultural' },
    { key: 'events', labelMr: 'कार्यक्रम', labelEn: 'Events' },
    { key: 'campus', labelMr: 'परिसर', labelEn: 'Campus' },
  ];

  const filtered = activeCategory === 'all'
    ? gallery
    : gallery.filter((g) => g.category === activeCategory);

  function openLightbox(idx) {
    setLightbox(idx);
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    setLightbox(null);
    document.body.style.overflow = '';
  }
  function prevImg() {
    setLightbox((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
  }
  function nextImg() {
    setLightbox((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
  }

  useEffect(() => {
    function onKey(e) {
      if (lightbox === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImg();
      if (e.key === 'ArrowRight') nextImg();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, filtered.length]);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full mb-4">
              {t.gallery.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#0a1628' }}>
              {t.gallery.title}
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">{t.gallery.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-6 bg-white sticky top-20 z-30 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex-shrink-0 px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeCategory === cat.key
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lang === 'mr' ? cat.labelMr : cat.labelEn}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
          >
            <AnimatePresence>
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  custom={i}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, scale: 0.9 }}
                  variants={fadeUp}
                  className="group relative rounded-2xl overflow-hidden break-inside-avoid cursor-pointer bg-blue-50"
                  onClick={() => openLightbox(i)}
                >
                  <img
                    src={item.image}
                    alt={lang === 'mr' ? item.captionMr : item.captionEn}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/50 transition-colors duration-300 flex items-center justify-center">
                    <ZoomIn className="text-white w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-sm font-medium">{lang === 'mr' ? item.captionMr : item.captionEn}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-10"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); prevImg(); }}
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl max-h-[85vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightbox]?.image}
                alt={lang === 'mr' ? filtered[lightbox]?.captionMr : filtered[lightbox]?.captionEn}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl"
              />
              <div className="text-center mt-4">
                <p className="text-white text-sm">
                  {lang === 'mr' ? filtered[lightbox]?.captionMr : filtered[lightbox]?.captionEn}
                </p>
                <p className="text-white/50 text-xs mt-1">{lightbox + 1} / {filtered.length}</p>
              </div>
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); nextImg(); }}
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
