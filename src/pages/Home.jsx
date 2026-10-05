import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight, BookOpen, Users, Award, CheckCircle2, Star,
  Lightbulb, Target, Monitor, FlaskConical, Library, Dumbbell,
  Palette, Wifi, TreePine, Calculator, Globe, Cpu, Music,
} from 'lucide-react';
import { useLang } from '../context/LanguageContext';

import SectionTitle from '../components/SectionTitle';
import schoolMock from '../data/school';
import teachersMock from '../data/teachers';
import noticesMock from '../data/notices';
import eventsMock from '../data/events';
import {
  getSchoolProfile,
  getSchoolStatistics,
  getTeachers,
  getSchoolHistory,
  getNotices,
  getEvents,
  getClasses,
  getSubjects,
  getActivities,
  getFacilities,
  getAchievements
} from '../lib/api';
// --- Animated Counter ---
function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });


  useEffect(() => {
    if (!inView) return;
    const numericTarget = parseInt(target.replace(/\D/g, ''));
    const step = numericTarget / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= numericTarget) {
        setCount(numericTarget);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  const hasSuffix = target.includes('+') || target.includes('%');
  return (
    <span ref={ref}>
      {count}{hasSuffix ? target.replace(/\d/g, '').replace(/,/g, '') : ''}{suffix}
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

export default function Home() {
  const { t, lang } = useLang();

  const subjects = [
    { icon: BookOpen, nameMr: 'मराठी', nameEn: 'Marathi', descMr: 'मातृभाषेतून ज्ञान', descEn: 'Knowledge through mother tongue', color: 'blue' },
    { icon: Globe, nameMr: 'हिंदी', nameEn: 'Hindi', descMr: 'राष्ट्रभाषा शिक्षण', descEn: 'National language education', color: 'green' },
    { icon: Star, nameMr: 'इंग्रजी', nameEn: 'English', descMr: 'वैश्विक भाषा प्रभुत्व', descEn: 'Global language mastery', color: 'indigo' },
    { icon: Calculator, nameMr: 'गणित', nameEn: 'Mathematics', descMr: 'तार्किक विचारशक्ती', descEn: 'Logical thinking skills', color: 'orange' },
    { icon: FlaskConical, nameMr: 'विज्ञान', nameEn: 'Science', descMr: 'वैज्ञानिक दृष्टिकोन', descEn: 'Scientific perspective', color: 'cyan' },
    { icon: Globe, nameMr: 'सामाजिक शास्त्रे', nameEn: 'Social Science', descMr: 'समाज व इतिहास', descEn: 'Society and history', color: 'purple' },
    { icon: Cpu, nameMr: 'संगणक', nameEn: 'Computer', descMr: 'डिजिटल कौशल्ये', descEn: 'Digital skills', color: 'teal' },
    { icon: Palette, nameMr: 'कला', nameEn: 'Art', descMr: 'सर्जनशीलता विकास', descEn: 'Creativity development', color: 'rose' },
  ];

  const colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    orange: 'bg-orange-50 text-orange-600',
    cyan: 'bg-cyan-50 text-cyan-600',
    purple: 'bg-purple-50 text-purple-600',
    teal: 'bg-teal-50 text-teal-600',
    rose: 'bg-rose-50 text-rose-600',
  };

  const activities = [
    { icon: Dumbbell, nameMr: 'क्रीडा', nameEn: 'Sports', color: 'blue' },
    { icon: Music, nameMr: 'सांस्कृतिक उपक्रम', nameEn: 'Cultural Activities', color: 'rose' },
    { icon: FlaskConical, nameMr: 'विज्ञान प्रदर्शन', nameEn: 'Science Exhibition', color: 'cyan' },
    { icon: Globe, nameMr: 'शैक्षणिक सहली', nameEn: 'Educational Trips', color: 'green' },
    { icon: Palette, nameMr: 'कला व हस्तकला', nameEn: 'Art & Craft', color: 'orange' },

  ];

  const facilities = [
    { icon: Monitor, nameMr: 'स्मार्ट क्लासरूम', nameEn: 'Smart Classroom', img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500&h=350&fit=crop&auto=format' },
    { icon: FlaskConical, nameMr: 'विज्ञान प्रयोगशाळा', nameEn: 'Science Lab', img: 'https://images.unsplash.com/photo-1532094349884-543559fe0e5f?w=500&h=350&fit=crop&auto=format' },
    { icon: Cpu, nameMr: 'संगणक प्रयोगशाळा', nameEn: 'Computer Lab', img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=350&fit=crop&auto=format' },
    { icon: Library, nameMr: 'ग्रंथालय', nameEn: 'Library', img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=500&h=350&fit=crop&auto=format' },
  ];

  const classes = [
    { std: lang === 'mr' ? '५वी' : '5th', color: 'blue', subjectsMr: ['मराठी', 'हिंदी', 'इंग्रजी', 'गणित', 'विज्ञान', 'परिसर अभ्यास'], subjectsEn: ['Marathi', 'Hindi', 'English', 'Mathematics', 'Science', 'Environmental Studies'] },
    { std: lang === 'mr' ? '६वी' : '6th', color: 'cyan', subjectsMr: ['मराठी', 'हिंदी', 'इंग्रजी', 'गणित', 'विज्ञान', 'इतिहास'], subjectsEn: ['Marathi', 'Hindi', 'English', 'Mathematics', 'Science', 'History'] },
    { std: lang === 'mr' ? '७वी' : '7th', color: 'indigo', subjectsMr: ['मराठी', 'हिंदी', 'इंग्रजी', 'गणित', 'विज्ञान', 'भूगोल'], subjectsEn: ['Marathi', 'Hindi', 'English', 'Mathematics', 'Science', 'Geography'] },
    { std: lang === 'mr' ? '८वी' : '8th', color: 'purple', subjectsMr: ['मराठी', 'हिंदी', 'इंग्रजी', 'गणित', 'विज्ञान', 'संगणक'], subjectsEn: ['Marathi', 'Hindi', 'English', 'Mathematics', 'Science', 'Computer'] },
    { std: lang === 'mr' ? '९वी' : '9th', color: 'teal', subjectsMr: ['मराठी', 'हिंदी', 'इंग्रजी', 'गणित', 'विज्ञान', 'सा.शास्त्रे'], subjectsEn: ['Marathi', 'Hindi', 'English', 'Mathematics', 'Science', 'Social Sc.'] },
    { std: lang === 'mr' ? '१०वी' : '10th', color: 'rose', subjectsMr: ['मराठी', 'हिंदी', 'इंग्रजी', 'गणित', 'विज्ञान', 'सामाजिक शास्त्रे'], subjectsEn: ['Marathi', 'Hindi', 'English', 'Mathematics', 'Science', 'Social Science'] },
  ];

  const classColors = {
    blue: 'from-blue-500 to-blue-600',
    cyan: 'from-cyan-500 to-cyan-600',
    indigo: 'from-indigo-500 to-indigo-600',
    purple: 'from-purple-500 to-purple-600',
    teal: 'from-teal-500 to-teal-600',
    rose: 'from-rose-500 to-rose-600',
  };

  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState([]);
  const [dbTeachers, setDbTeachers] = useState([]);
  const [dbNotices, setDbNotices] = useState([]);
  const [dbEvents, setDbEvents] = useState([]);
  const [dbClasses, setDbClasses] = useState([]);
  const [dbSubjects, setDbSubjects] = useState([]);
  const [dbActivities, setDbActivities] = useState([]);
  const [dbFacilities, setDbFacilities] = useState([]);
  const [dbHistory, setDbHistory] = useState([]);
  const [dbAchievements, setDbAchievements] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [
          p,
          s,
          t,
          n,
          e,
          c,
          sub,
          a,
          f,
          achievements,
          h
        ] = await Promise.all([
          getSchoolProfile(),
          getSchoolStatistics(),
          getTeachers(),
          getNotices(),
          getEvents(),
          getClasses(),
          getSubjects(),
          getActivities(),
          getFacilities(),
          getAchievements(),
          getSchoolHistory()
        ]);

        console.log('HOME ACHIEVEMENTS:', achievements);

        setProfile(p);
        setStats(s);
        setDbTeachers(t);
        setDbNotices(n);
        setDbEvents(e);
        setDbClasses(c);
        setDbSubjects(sub);
        setDbActivities(a);
        setDbFacilities(f);
        setDbAchievements(achievements || []);
        setDbHistory(h || []);

      } catch (error) {
        console.error('HOME PAGE DATA ERROR:', error);
      }
    }

    loadData();
  }, []);

  const school = {
    ...(profile || schoolMock),

    stats: {
      years:
        stats.find(s => s.title_en === 'Years of Excellence')?.value ||
        schoolMock.stats?.years ||
        '0',

      students:
        stats.find(s => s.title_en === 'Students')?.value ||
        schoolMock.stats?.students ||
        '0',

      teachers:
        stats.find(s => s.title_en === 'Teachers')?.value ||
        schoolMock.stats?.teachers ||
        '0',

      development:
        stats.find(s => s.title_en === 'Classes')?.value ||
        schoolMock.stats?.development ||
        '0',
    },
  };

  const currentStats = school.stats;

  const displayNotices = dbNotices.length > 0 ? dbNotices : noticesMock;
  const displayEvents = dbEvents.length > 0 ? dbEvents : eventsMock;
  const displayTeachers = dbTeachers.length > 0 ? dbTeachers : teachersMock;
  const displayClasses = dbClasses.length > 0 ? dbClasses : classes;
  const displaySubjects = dbSubjects.length > 0 ? dbSubjects : subjects;
  const displayActivities = dbActivities.length > 0 ? dbActivities.filter(a => !a.is_special_activity) : activities;
  const displayFacilities = dbFacilities.length > 0 ? dbFacilities : facilities;

  return (
    <div className="overflow-x-hidden">
      {/* =========== HERO =========== */}
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
        {/* BG decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 -z-10" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50 -z-10" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-100 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-40 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                {t.hero.badge}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#0a1628' }}>
                <span className="block">{t.hero.heading1}</span>
                <span className="block text-gradient">{t.hero.heading2}</span>
                <span className="block">{t.hero.heading3}</span>
              </h1>

              <p className="text-slate-500 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                {t.hero.subtext}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/admission"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
                >
                  {t.hero.cta1}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-6 py-3.5 rounded-xl font-semibold transition-all hover:-translate-y-0.5"
                >
                  {t.hero.cta2}
                </Link>
              </div>

              {/* Float badges */}
              <div className="flex flex-wrap gap-3 mt-10">
                {[t.hero.float1, t.hero.float2, t.hero.float3, t.hero.float4].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.15 }}
                    className="glass-card rounded-xl px-4 py-2.5 shadow-md flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span className="text-xs font-semibold text-slate-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right – image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center"
            >
              <div className="relative w-full max-w-lg">
                <div className="organic-image overflow-hidden bg-blue-100 aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&h=700&fit=crop&auto=format"
                    alt={lang === 'mr' ? 'शाळेचा परिसर' : 'School campus'}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating card top right */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 glass-card rounded-2xl px-4 py-3 shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-amber-400 rounded-xl flex items-center justify-center">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">{currentStats.students}</div>
                      <div className="text-xs text-slate-500">{t.stats.students}</div>
                    </div>
                  </div>
                </motion.div>
                {/* Floating card bottom left */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                  className="absolute -bottom-4 -left-4 glass-card rounded-2xl px-4 py-3 shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">{currentStats.teachers}</div>
                      <div className="text-xs text-slate-500">{t.stats.teachers}</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========== STATS =========== */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { val: currentStats.years, label: t.stats.years, icon: BookOpen },
              { val: currentStats.students, label: t.stats.students, icon: Users },
              { val: currentStats.teachers, label: t.stats.teachers, icon: Star },
              { val: currentStats.development, label: t.stats.development, icon: Award },
            ].map((stat, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center"
              >
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                  <AnimatedCounter target={stat.val} />
                </div>
                <div className="text-blue-100 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========== ABOUT =========== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden bg-blue-50">
                <img
                  src="https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=700&h=550&fit=crop&auto=format"
                  alt={lang === 'mr' ? 'शाळेची इमारत' : 'School building'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-amber-400 text-white rounded-2xl p-4 shadow-xl">
                <div className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>{currentStats.years}</div>
                <div className="text-xs font-medium">{t.stats.years}</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <SectionTitle badge={t.about.badge} title={t.about.title} center={false} />
              <p className="text-slate-500 leading-relaxed mb-8">{t.about.desc}</p>
              <ul className="space-y-3 mb-8">
                {[t.about.point1, t.about.point2, t.about.point3, t.about.point4].map((p, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span className="text-slate-700 font-medium">{p}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
              >
                {t.about.btn}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      {/* =========== SCHOOL HISTORY =========== */}
      <section className="py-20 section-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <SectionTitle
            badge={lang === 'mr' ? 'आमचा इतिहास' : 'Our History'}
            title={lang === 'mr' ? 'शाळेचा प्रवास' : 'Our Journey'}
            subtitle={
              lang === 'mr'
                ? 'आमच्या शाळेच्या विकासाचा प्रवास'
                : 'Our journey of growth and development'
            }
          />

          <div className="max-w-4xl mx-auto mt-12 space-y-6">

            {dbHistory && dbHistory.length > 0 ? (
              dbHistory.map((item, index) => (
                <motion.div
                  key={item.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
                >

                  <div className="flex gap-5">

                    <div className="min-w-[90px]">
                      <div className="text-2xl font-bold text-blue-600">
                        {item.year}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {lang === 'mr'
                          ? item.title_mr
                          : item.title_en}
                      </h3>

                      <p className="text-slate-600 leading-relaxed">
                        {lang === 'mr'
                          ? item.description_mr
                          : item.description_en}
                      </p>
                    </div>

                  </div>

                </motion.div>
              ))
            ) : (
              <p className="text-center text-slate-500">
                {lang === 'mr'
                  ? 'इतिहासाची माहिती उपलब्ध नाही.'
                  : 'No history information available.'}
              </p>
            )}

          </div>

        </div>
      </section>
      {/* Achievements */}
      <section className="py-20 section-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <SectionTitle
            badge={lang === 'mr' ? 'आमच्या यशाची गाथा' : 'Our Achievements'}
            title={
              lang === 'mr'
                ? 'आमची उल्लेखनीय कामगिरी'
                : 'Our Achievements'
            }
            subtitle={
              lang === 'mr'
                ? 'आमच्या विद्यार्थ्यांच्या आणि शाळेच्या उल्लेखनीय कामगिरीचा गौरव'
                : 'Celebrating the achievements of our students and school'
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">

            {dbAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id || index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
              >

                {/* Year */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-blue-600 font-bold text-lg">
                    {achievement.year}
                  </span>

                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-600">
                    {achievement.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {lang === 'mr'
                    ? achievement.title_mr
                    : achievement.title_en}
                </h3>

                {/* Description */}
                <p className="text-slate-500 text-sm leading-relaxed">
                  {lang === 'mr'
                    ? achievement.description_mr
                    : achievement.description_en}
                </p>

              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* =========== VISION & MISSION =========== */}
      <section className="py-20 section-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle badge={t.vision.badge} title={t.vision.title} />
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-blue-100 card-hover"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                {t.vision.visionTitle}
              </h3>
              <p className="text-slate-500 leading-relaxed">{t.vision.visionText}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-blue-600 rounded-3xl p-8 shadow-sm card-hover"
            >
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Lightbulb className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                {t.vision.missionTitle}
              </h3>
              <p className="text-blue-100 leading-relaxed">{t.vision.missionText}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========== PRINCIPAL =========== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative flex justify-center lg:justify-start"
            >
              <div className="relative w-72 h-72 sm:w-80 sm:h-80">
                <div className="w-full h-full rounded-full overflow-hidden bg-blue-50 border-4 border-blue-100">
                  <img
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&auto=format"
                    alt={lang === 'mr' ? 'मुख्याध्यापक' : 'Principal'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white rounded-2xl px-6 py-2 shadow-lg whitespace-nowrap">
                  <div className="text-sm font-semibold">{t.principal.name}</div>
                  <div className="text-blue-200 text-xs">{t.principal.designation}</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mt-8 lg:mt-0"
            >
              <SectionTitle badge={t.principal.badge} title={t.principal.title} center={false} />
              <blockquote className="text-slate-500 leading-relaxed mb-8 italic border-l-4 border-blue-500 pl-6">
                {t.principal.message.split('\n\n').map((para, i) => (
                  <p key={i} className="mb-3 last:mb-0">{para}</p>
                ))}
              </blockquote>
              <Link to="/about#principal" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all">
                {t.principal.btn}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========== ACADEMICS =========== */}
      <section className="py-20 section-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle badge={t.academics.badge} title={t.academics.title} subtitle={t.academics.subtitle} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayClasses.map((cls, i) => {
              const bgColors = ['blue', 'cyan', 'indigo', 'purple', 'teal', 'rose'];
              const colorKey = cls.color || bgColors[i % bgColors.length];
              return (
                <motion.div
                  key={cls.id || i}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 card-hover"
                >
                  <div className={`bg-gradient-to-r ${classColors[colorKey]} p-6`}>
                    <div className="text-4xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {lang === 'mr'
                        ? cls.class_name_mr || cls.std
                        : cls.class_name || cls.std}
                    </div>
                  </div>
                  <div className="p-6">
                    {(cls.subjectsMr || cls.subjectsEn) && (
                      <>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">{t.academics.subjects}</p>
                        <div className="flex flex-wrap gap-2 mb-5">
                          {(lang === 'mr' ? cls.subjectsMr : cls.subjectsEn).map((sub) => (
                            <span key={sub} className="bg-slate-50 text-slate-600 text-xs font-medium px-3 py-1 rounded-full border border-slate-100">
                              {sub}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                    <Link to="/academics" className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1 transition-colors mt-auto">
                      {t.academics.learnMore} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========== SUBJECTS =========== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle badge={t.subjects.badge} title={t.subjects.title} subtitle={t.subjects.subtitle} />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {displaySubjects.map((sub, i) => {
              const IconComp = sub.icon || BookOpen; // Needs a proper icon mapping if using DB, keeping simple for home
              const colorKeys = Object.keys(colorMap);
              const cMap = colorMap[sub.color] || colorMap[colorKeys[i % colorKeys.length]];
              return (
                <motion.div
                  key={sub.id || i}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 card-hover text-center cursor-default"
                >
                  <div className={`w-14 h-14 ${cMap} rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110`}>
                    <IconComp className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{lang === 'mr' ? (sub.name_mr || sub.nameMr) : (sub.name_en || sub.nameEn)}</h3>
                  <p className="text-slate-400 text-xs">{lang === 'mr' ? (sub.description_mr || sub.descMr) : (sub.description_en || sub.descEn)}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========== TEACHERS =========== */}
      <section className="py-20 section-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle badge={t.teachers.badge} title={t.teachers.title} subtitle={t.teachers.subtitle} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayTeachers.map((teacher, i) => (
              <motion.div
                key={teacher.id || i}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 card-hover flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-50 mb-4 ring-4 ring-blue-100">
                  <img
                    src={teacher.image_url || teacher.photo}
                    alt={lang === 'mr' ? (teacher.name_mr || teacher.nameMr) : (teacher.name_en || teacher.nameEn)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {lang === 'mr' ? (teacher.name_mr || teacher.nameMr) : (teacher.name_en || teacher.nameEn)}
                </h3>
                <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                  {lang === 'mr' ? (teacher.subject_mr || teacher.subjectMr) : (teacher.subject_en || teacher.subjectEn)}
                </span>
                <p className="text-slate-400 text-xs mb-2">{teacher.qualifications || teacher.qualification}</p>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                  {lang === 'mr' ? (teacher.bio_mr || teacher.descMr) : (teacher.bio_en || teacher.descEn)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========== STUDENT LIFE =========== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle badge={t.studentLife.badge} title={t.studentLife.title} subtitle={t.studentLife.subtitle} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayActivities.map((act, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-3xl bg-slate-900 h-48 flex items-end p-6 card-hover"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${classColors[act.color]} opacity-80`} />
                <div className="relative z-10">
                  <act.icon className="w-8 h-8 text-white mb-2" />
                  <h3 className="text-white font-bold text-lg">{lang === 'mr' ? act.nameMr : act.nameEn}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========== FACILITIES =========== */}
      <section className="py-20 section-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle badge={t.facilities.badge} title={t.facilities.title} subtitle={t.facilities.subtitle} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayFacilities.map((fac, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-3xl overflow-hidden shadow-sm card-hover"
              >
                <div className="h-44 overflow-hidden">
                  <img src={fac.img} alt={lang === 'mr' ? fac.nameMr : fac.nameEn} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-900 text-sm">{lang === 'mr' ? fac.nameMr : fac.nameEn}</h3>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/facilities" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all">
              {lang === 'mr' ? 'सर्व सुविधा पहा' : 'View All Facilities'} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========== NOTICES =========== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
            <SectionTitle badge={t.notices.badge} title={t.notices.title} center={false} />
            <Link to="/notices" className="flex-shrink-0 inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-semibold text-sm">
              {t.notices.viewAll} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayNotices.slice(0, 6).map((notice, i) => (
              <motion.div
                key={notice.id}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="border border-slate-100 rounded-2xl p-5 hover:border-blue-100 hover:bg-blue-50/50 transition-all card-hover"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                    {lang === 'mr' ? notice.categoryMr : notice.categoryEn}
                  </span>
                  {notice.important && (
                    <span className="bg-amber-50 text-amber-600 text-xs font-semibold px-3 py-1 rounded-full">
                      {lang === 'mr' ? 'महत्त्वाचे' : 'Important'}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mb-2">{lang === 'mr' ? notice.date : notice.dateEn}</p>
                <h3 className="font-bold text-slate-900 text-sm mb-2">{lang === 'mr' ? notice.titleMr : notice.titleEn}</h3>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{lang === 'mr' ? notice.descMr : notice.descEn}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========== EVENTS =========== */}
      <section className="py-20 section-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
            <SectionTitle badge={t.events.badge} title={t.events.title} center={false} />
            <Link to="/events" className="flex-shrink-0 inline-flex items-center gap-1 text-blue-600 font-semibold text-sm">
              {t.events.viewAll} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayEvents.slice(0, 3).map((event, i) => (
              <motion.div
                key={event.id}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-3xl overflow-hidden shadow-sm card-hover"
              >
                <div className="h-48 overflow-hidden">
                  <img src={event.image} alt={lang === 'mr' ? event.titleMr : event.titleEn} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-slate-900 text-base mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {lang === 'mr' ? event.titleMr : event.titleEn}
                  </h3>
                  <p className="text-slate-400 text-xs mb-1">{lang === 'mr' ? event.dateMr : event.dateEn}</p>
                  <p className="text-slate-500 text-sm line-clamp-2">{lang === 'mr' ? event.descMr : event.descEn}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========== ADMISSION CTA =========== */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              {t.admission.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              {t.admission.title}
            </h2>
            <p className="text-blue-100 text-lg mb-10">{t.admission.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/admission" className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:-translate-y-0.5">
                {t.admission.processBtn}
              </Link>
              <Link to="/admission" className="border-2 border-white/60 text-white hover:bg-white/10 px-8 py-3.5 rounded-xl font-bold transition-all hover:-translate-y-0.5">
                {t.admission.formBtn}
              </Link>
              <Link
                to="/admin"
                className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700"
              >
                Admin Login
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>

  );
}
