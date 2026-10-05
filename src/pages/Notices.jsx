import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Calendar, ChevronDown } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import SectionTitle from '../components/SectionTitle';
import noticesMock from '../data/notices';
import { getNotices } from '../lib/api';
import { useEffect } from 'react';
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08 } }),
};

const categoryColors = {
  'परीक्षा': 'bg-red-50 text-red-600',
  'Examination': 'bg-red-50 text-red-600',
  'सभा': 'bg-blue-50 text-blue-600',
  'Meeting': 'bg-blue-50 text-blue-600',
  'उपक्रम': 'bg-green-50 text-green-600',
  'Activity': 'bg-green-50 text-green-600',
  'क्रीडा': 'bg-orange-50 text-orange-600',
  'Sports': 'bg-orange-50 text-orange-600',
  'कार्यक्रम': 'bg-purple-50 text-purple-600',
  'Event': 'bg-purple-50 text-purple-600',
  'सामान्य': 'bg-slate-100 text-slate-600',
  'General': 'bg-slate-100 text-slate-600',
};

function NoticeCard({ notice, lang, t, index }) {
  const [expanded, setExpanded] = useState(false);
  const category = lang === 'mr' ? notice.categoryMr : notice.categoryEn;

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={fadeUp}
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:border-blue-100 hover:shadow-md transition-all"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[category] || 'bg-slate-100 text-slate-600'}`}>
              {category}
            </span>
            {notice.important && (
              <span className="bg-amber-50 text-amber-600 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                <Bell className="w-3 h-3" />
                {lang === 'mr' ? 'महत्त्वाचे' : 'Important'}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-slate-400 text-xs whitespace-nowrap">
            <Calendar className="w-3 h-3" />
            {lang === 'mr' ? notice.date : notice.dateEn}
          </div>
        </div>

        <h3 className="font-bold text-slate-900 text-base mb-3">
          {lang === 'mr' ? notice.titleMr : notice.titleEn}
        </h3>

        <p className={`text-slate-500 text-sm leading-relaxed transition-all ${expanded ? '' : 'line-clamp-2'}`}>
          {lang === 'mr' ? notice.descMr : notice.descEn}
        </p>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors"
        >
          {expanded ? (lang === 'mr' ? 'कमी पहा' : 'Show Less') : t.notices.readMore}
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </motion.div>
  );
}

export default function Notices() {
  const { t, lang } = useLang();
  const [filter, setFilter] = useState('all');
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    async function loadNotices() {
      const data = await getNotices();
      setNotices(data);
    }
    loadNotices();
  }, []);

  const categories = lang === 'mr'
    ? ['all', 'परीक्षा', 'सभा', 'उपक्रम', 'क्रीडा', 'कार्यक्रम', 'सामान्य']
    : ['all', 'Examination', 'Meeting', 'Activity', 'Sports', 'Event', 'General'];

  const filteredNotices = filter === 'all'
    ? notices
    : notices.filter((n) => {
        const cat = lang === 'mr' ? n.categoryMr : n.categoryEn;
        return cat === filter;
      });

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full mb-4">
              {t.notices.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#0a1628' }}>
              {t.notices.title}
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">{t.notices.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-10 bg-white sticky top-20 z-30 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === cat ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? (lang === 'mr' ? 'सर्व' : 'All') : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Notices */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {filteredNotices.length === 0 ? (
            <div className="text-center py-20">
              <Bell className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400">{lang === 'mr' ? 'कोणत्याही सूचना नाहीत' : 'No notices found'}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotices.map((notice, i) => (
                <NoticeCard key={notice.id} notice={notice} lang={lang} t={t} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
