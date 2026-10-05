import { motion } from 'framer-motion';
import {
  Dumbbell, Music, FlaskConical, Globe, Palette, Cpu, BookOpen, MessageSquare,
  Users, Leaf, Star, Mic, Monitor, Brain, Shield, Trophy,
} from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import SectionTitle from '../components/SectionTitle';
import { getActivities } from '../lib/api';
import { useState, useEffect } from 'react';
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

const studentLife = [
  { icon: Dumbbell, nameMr: 'क्रीडा', nameEn: 'Sports', img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500&h=350&fit=crop&auto=format', descMr: 'क्रिकेट, कबड्डी, खो-खो आणि अॅथलेटिक्स', descEn: 'Cricket, Kabaddi, Kho-Kho and Athletics' },
  { icon: Music, nameMr: 'सांस्कृतिक उपक्रम', nameEn: 'Cultural Activities', img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=350&fit=crop&auto=format', descMr: 'नृत्य, गाणे, नाटक आणि एकांकिका', descEn: 'Dance, singing, drama and one-act plays' },
  { icon: FlaskConical, nameMr: 'विज्ञान प्रदर्शन', nameEn: 'Science Exhibition', img: 'https://images.unsplash.com/photo-1532094349884-543559fe0e5f?w=500&h=350&fit=crop&auto=format', descMr: 'वैज्ञानिक संशोधन आणि नवोपक्रम', descEn: 'Scientific research and innovations' },
  { icon: Globe, nameMr: 'शैक्षणिक सहली', nameEn: 'Educational Trips', img: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=500&h=350&fit=crop&auto=format', descMr: 'ऐतिहासिक आणि भौगोलिक ठिकाणांना भेटी', descEn: 'Visits to historical and geographical places' },
  { icon: Palette, nameMr: 'कला व हस्तकला', nameEn: 'Art & Craft', img: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=500&h=350&fit=crop&auto=format', descMr: 'रंगकाम, चित्रकला आणि शिल्पकला', descEn: 'Painting, drawing and sculpture' },
  { icon: Cpu, nameMr: 'कोडिंग व तंत्रज्ञान', nameEn: 'Coding & Technology', img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=350&fit=crop&auto=format', descMr: 'आधुनिक तंत्रज्ञान आणि प्रोग्रामिंग', descEn: 'Modern technology and programming' },
  { icon: MessageSquare, nameMr: 'वादविवाद स्पर्धा', nameEn: 'Debate Competition', img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&h=350&fit=crop&auto=format', descMr: 'विद्यार्थ्यांमधील वक्तृत्व क्षमता विकास', descEn: 'Development of oratory skills in students' },
  { icon: BookOpen, nameMr: 'वाचन उपक्रम', nameEn: 'Reading Activities', img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=500&h=350&fit=crop&auto=format', descMr: 'वाचन संस्कृतीचा विकास', descEn: 'Development of reading culture' },
  { icon: Star, nameMr: 'प्रश्नमंजुषा', nameEn: 'Quiz Competition', img: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=500&h=350&fit=crop&auto=format', descMr: 'सामान्यज्ञान आणि बुद्धिमत्ता स्पर्धा', descEn: 'General knowledge and intelligence competitions' },
  { icon: Leaf, nameMr: 'योगा', nameEn: 'Yoga', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=350&fit=crop&auto=format', descMr: 'शारीरिक आणि मानसिक आरोग्यासाठी योग', descEn: 'Yoga for physical and mental health' },
];

const specialActivities = [
  { icon: Monitor, nameMr: 'डिजिटल शिक्षण', nameEn: 'Digital Learning', descMr: 'स्मार्ट बोर्ड आणि ऑनलाइन संसाधनांचा उपयोग', descEn: 'Use of smart boards and online resources', color: 'bg-blue-50 text-blue-600' },
  { icon: Cpu, nameMr: 'स्मार्ट क्लासरूम', nameEn: 'Smart Classroom', descMr: 'आधुनिक तंत्रज्ञानाने सुसज्ज वर्गखोल्या', descEn: 'Classrooms equipped with modern technology', color: 'bg-cyan-50 text-cyan-600' },
  { icon: FlaskConical, nameMr: 'विज्ञान व नवोपक्रम', nameEn: 'Science & Innovation', descMr: 'प्रयोगशाळेत संशोधनास प्रोत्साहन', descEn: 'Encouraging research in the laboratory', color: 'bg-green-50 text-green-600' },
  { icon: Trophy, nameMr: 'क्रीडा विकास', nameEn: 'Sports Development', descMr: 'राज्यस्तरीय स्पर्धांसाठी प्रशिक्षण', descEn: 'Training for state-level competitions', color: 'bg-orange-50 text-orange-600' },
  { icon: Brain, nameMr: 'व्यक्तिमत्त्व विकास', nameEn: 'Personality Development', descMr: 'नेतृत्व, आत्मविश्वास आणि सार्वजनिक बोलण्याचे प्रशिक्षण', descEn: 'Leadership, confidence and public speaking training', color: 'bg-purple-50 text-purple-600' },
  { icon: Users, nameMr: 'करिअर मार्गदर्शन', nameEn: 'Career Guidance', descMr: 'विद्यार्थ्यांना करिअर निवडीसाठी मार्गदर्शन', descEn: 'Guidance for career selection for students', color: 'bg-indigo-50 text-indigo-600' },
  { icon: Leaf, nameMr: 'पर्यावरण जागृती', nameEn: 'Environmental Awareness', descMr: 'वृक्षारोपण, स्वच्छता आणि पर्यावरण रक्षण', descEn: 'Tree planting, cleanliness and environmental protection', color: 'bg-teal-50 text-teal-600' },
  { icon: BookOpen, nameMr: 'वाचन उपक्रम', nameEn: 'Reading Activities', descMr: 'वाचन संस्कृती विकसित करणारे विविध उपक्रम', descEn: 'Various activities to develop reading culture', color: 'bg-rose-50 text-rose-600' },
];

const iconMapping = {
  'dumbbell': Dumbbell, 'music': Music, 'flask-conical': FlaskConical, 'globe': Globe,
  'palette': Palette, 'cpu': Cpu, 'book-open': BookOpen, 'message-square': MessageSquare,
  'users': Users, 'leaf': Leaf, 'star': Star, 'mic': Mic, 'monitor': Monitor,
  'brain': Brain, 'shield': Shield, 'trophy': Trophy
};

export default function Activities() {
  const { t, lang } = useLang();
  
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await getActivities();
      setActivities(data);
    }
    loadData();
  }, []);

  const displayStudentLife = activities.length > 0 
    ? activities.filter(a => !a.is_special_activity) 
    : studentLife;
    
  const displaySpecial = activities.length > 0 
    ? activities.filter(a => a.is_special_activity) 
    : specialActivities;

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full mb-4">
              {t.studentLife.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#0a1628' }}>
              {t.studentLife.title}
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">{t.studentLife.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Student Life Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle badge={t.studentLife.badge} title={t.studentLife.title} subtitle={t.studentLife.subtitle} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {displayStudentLife.map((act, i) => {
              const IconComp = act.icon_name ? iconMapping[act.icon_name] || Star : act.icon;
              return (
              <motion.div
                key={act.id || i}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group relative rounded-3xl overflow-hidden card-hover aspect-[3/4] cursor-default"
              >
                <img src={act.image_url || act.img} alt={lang === 'mr' ? (act.title_mr || act.nameMr) : (act.title_en || act.nameEn)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <IconComp className="w-5 h-5 text-white mb-2" />
                  <h3 className="text-white font-bold text-sm mb-1">{lang === 'mr' ? (act.title_mr || act.nameMr) : (act.title_en || act.nameEn)}</h3>
                  <p className="text-white/70 text-xs line-clamp-2">{lang === 'mr' ? (act.description_mr || act.descMr) : (act.description_en || act.descEn)}</p>
                </div>
              </motion.div>
            )})}
          </div>
        </div>
      </section>

      {/* Special Activities */}
      <section id="special" className="py-20 section-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle badge={t.activities.badge} title={t.activities.title} subtitle={t.activities.subtitle} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {displaySpecial.map((act, i) => {
              const IconComp = act.icon_name ? iconMapping[act.icon_name] || Star : act.icon;
              const bgColors = ['bg-blue-50 text-blue-600', 'bg-cyan-50 text-cyan-600', 'bg-green-50 text-green-600', 'bg-orange-50 text-orange-600', 'bg-purple-50 text-purple-600', 'bg-indigo-50 text-indigo-600', 'bg-teal-50 text-teal-600', 'bg-rose-50 text-rose-600'];
              const colorClass = act.color || bgColors[i % bgColors.length];
              return (
              <motion.div
                key={act.id || i}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 card-hover"
              >
                <div className={`w-12 h-12 ${colorClass} rounded-xl flex items-center justify-center mb-4`}>
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-2">{lang === 'mr' ? (act.title_mr || act.nameMr) : (act.title_en || act.nameEn)}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{lang === 'mr' ? (act.description_mr || act.descMr) : (act.description_en || act.descEn)}</p>
              </motion.div>
            )})}
          </div>
        </div>
      </section>
    </div>
  );
}
