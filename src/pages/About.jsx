import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Target, Lightbulb, Clock, Award } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import SectionTitle from '../components/SectionTitle';
import schoolMock from '../data/school';
import { getSchoolProfile, getSchoolHistory } from '../lib/api';
import { useState, useEffect } from 'react';
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

export default function About() {
  const { t, lang } = useLang();

  const [profile, setProfile] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function loadData() {
      const [profileData, historyData] = await Promise.all([
        getSchoolProfile(),
        getSchoolHistory()
      ]);
      setProfile(profileData);
      setHistory(historyData);
    }
    loadData();
  }, []);

  const timelineFallback = [
    { yearMr: 'स्थापना', yearEn: 'Established', descMr: 'शाळेची स्थापना स्थानिक शैक्षणिक संस्थेद्वारे करण्यात आली.', descEn: 'The school was established by a local educational institution.' },
    { yearMr: 'पहिली तुकडी', yearEn: 'First Batch', descMr: 'पहिल्या तुकडीतील विद्यार्थ्यांनी उत्कृष्ट परिणाम मिळवले.', descEn: 'The first batch of students achieved excellent results.' },
    { yearMr: 'स्मार्ट क्लास', yearEn: 'Smart Classes', descMr: 'आधुनिक स्मार्ट क्लासरूमची सुरुवात करण्यात आली.', descEn: 'Modern smart classrooms were introduced.' },
    { yearMr: 'विस्तार', yearEn: 'Expansion', descMr: 'नवीन इमारत आणि प्रयोगशाळांचा विस्तार करण्यात आला.', descEn: 'New building and laboratories were expanded.' },
  ];

  const displayTimeline = history.length > 0 ? history.map(h => ({
    yearMr: h.year_or_period, yearEn: h.year_or_period,
    descMr: h.description_mr, descEn: h.description_en
  })) : timelineFallback;

  return (
    <div className="pt-20">
      {/* Page Hero */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full mb-4">
              {t.about.badge}
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#0a1628' }}>
              {profile ? (lang === 'mr' ? profile.name_mr : profile.name_en) : schoolMock.name}
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              {profile ? (lang === 'mr' ? profile.tagline_mr : profile.tagline_en) : t.about.desc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our School */}
      <section id="school" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="rounded-3xl overflow-hidden bg-blue-50">
                <img src="https://images.unsplash.com/photo-1562774053-701939374585?w=700&h=500&fit=crop&auto=format"
                  alt={lang === 'mr' ? 'शाळेचा परिसर' : 'School campus'} className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <SectionTitle badge={lang === 'mr' ? 'आमची शाळा' : 'Our School'} title={t.about.title} center={false} />
              <p className="text-slate-500 leading-relaxed mb-6">{t.about.desc}</p>
              <p className="text-slate-500 leading-relaxed mb-8">
                {lang === 'mr'
                  ? 'आमच्या शाळेत अनुभवी शिक्षक, आधुनिक तंत्रज्ञान आणि विद्यार्थ्यांच्या सर्वांगीण विकासावर विशेष भर दिला जातो. शाळेचे वातावरण सुरक्षित, आनंददायी आणि शिकण्यासाठी प्रोत्साहन देणारे आहे.'
                  : 'Our school emphasizes experienced teachers, modern technology, and the holistic development of students. The school environment is safe, joyful, and encouraging for learning.'}
              </p>
              <ul className="space-y-3">
                {[t.about.point1, t.about.point2, t.about.point3, t.about.point4].map((p, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span className="text-slate-700 font-medium">{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision" className="py-20 section-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle badge={t.vision.badge} title={t.vision.title} />
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-white rounded-3xl p-10 shadow-sm border border-blue-100 card-hover">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>
                {t.vision.visionTitle}
              </h3>
              <p className="text-slate-500 leading-relaxed text-lg">{t.vision.visionText}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              className="bg-blue-600 rounded-3xl p-10 shadow-sm card-hover">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>
                {t.vision.missionTitle}
              </h3>
              <p className="text-blue-100 leading-relaxed text-lg">{t.vision.missionText}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Principal Message */}
      <section id="principal" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle badge={t.principal.badge} title={t.principal.title} />
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="lg:col-span-2 flex flex-col items-center text-center">
              <div className="w-56 h-56 rounded-full overflow-hidden ring-8 ring-blue-50 mb-6 bg-blue-100">
                <img src="https://stock.adobe.com/search?k=male+teacher+cartoon"
                  alt={lang === 'mr' ? 'मुख्याध्यापक' : 'Principal'} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                {t.principal.name}
              </h3>
              <span className="bg-blue-100 text-blue-700 text-sm px-4 py-1.5 rounded-full font-medium">
                {t.principal.designation}
              </span>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="lg:col-span-3">
              <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100">
                <div className="text-5xl text-blue-200 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>"</div>
                {t.principal.message.split('\n\n').map((para, i) => (
                  <p key={i} className="text-slate-600 leading-relaxed text-base mb-4 last:mb-0">{para}</p>
                ))}
                <div className="text-5xl text-blue-200 text-right mt-4" style={{ fontFamily: 'Playfair Display, serif' }}>"</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* History */}
      <section id="history" className="py-20 section-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionTitle badge={lang === 'mr' ? 'शाळेचा इतिहास' : 'School History'} title={lang === 'mr' ? 'आमच्या शाळेची वाटचाल' : 'Our School Journey'} />
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 -translate-x-1/2 hidden md:block" />
            <div className="space-y-10">
              {displayTimeline.map((item, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className={`flex flex-col md:flex-row gap-6 items-start md:items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className={`flex-1 bg-white rounded-2xl p-6 shadow-sm border border-blue-100 ${i % 2 === 1 ? 'md:text-right' : ''}`}>
                    <h3 className="font-bold text-slate-900 mb-2">{lang === 'mr' ? item.yearMr : item.yearEn}</h3>
                    <p className="text-slate-500 text-sm">{lang === 'mr' ? item.descMr : item.descEn}</p>
                  </div>
                  <div className="hidden md:flex w-12 h-12 bg-blue-600 rounded-full items-center justify-center flex-shrink-0 z-10">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
