import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import eventsMock from '../data/events';
import { getEvents } from '../lib/api';
import { useState, useEffect } from 'react';
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

const colorBadge = {
  blue: 'bg-blue-100 text-blue-700',
  cyan: 'bg-cyan-100 text-cyan-700',
  amber: 'bg-amber-100 text-amber-700',
};

export default function Events() {
  const { t, lang } = useLang();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function loadEvents() {
      const data = await getEvents();
      setEvents(data);
    }
    loadEvents();
  }, []);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full mb-4">
              {t.events.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#0a1628' }}>
              {t.events.title}
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">{t.events.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, i) => (
              <motion.article
                key={event.id}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 card-hover"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={event.image}
                    alt={lang === 'mr' ? event.titleMr : event.titleEn}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className={`absolute top-4 right-4 ${colorBadge[event.color]} text-xs font-semibold px-3 py-1.5 rounded-full`}>
                    {lang === 'mr' ? event.dateMr : event.dateEn}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-slate-900 text-lg mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {lang === 'mr' ? event.titleMr : event.titleEn}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">
                    {lang === 'mr' ? event.descMr : event.descEn}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      <span>{t.events.time}: {lang === 'mr' ? event.timeMr : event.timeEn}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      <span>{t.events.location}: {lang === 'mr' ? event.locationMr : event.locationEn}</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar note */}
      <section className="py-12 section-blue">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-100">
            <Calendar className="w-10 h-10 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
              {lang === 'mr' ? 'अधिक माहितीसाठी संपर्क करा' : 'Contact for More Information'}
            </h3>
            <p className="text-slate-500 text-sm">
              {lang === 'mr'
                ? 'कार्यक्रमांच्या तारखा आणि वेळांमध्ये बदल होऊ शकतो. अद्ययावत माहितीसाठी शाळेशी संपर्क साधा.'
                : 'Event dates and times are subject to change. Contact the school for updated information.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
