import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Calculator, FlaskConical, Globe, Cpu, Palette, ArrowRight, Globe2, Languages } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import SectionTitle from '../components/SectionTitle';
import { getClasses, getSubjects } from '../lib/api';
import { useState, useEffect } from 'react';
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

const classData = [
  {
    id: 'class5',
    stdMr: '५वी', stdEn: '5th',
    subjectsMr: ['मराठी', 'हिंदी', 'इंग्रजी', 'गणित', 'विज्ञान', 'परिसर अभ्यास', 'कला', 'शारीरिक शिक्षण'],
    subjectsEn: ['Marathi', 'Hindi', 'English', 'Mathematics', 'Science', 'Environmental Studies', 'Art', 'Physical Education'],
    descMr: 'पाचव्या इयत्तेत विद्यार्थ्यांना मूलभूत विषयांची ओळख करून दिली जाते. भाषा, गणित आणि परिसर अभ्यासावर विशेष भर दिला जातो.',
    descEn: 'In Class 5, students are introduced to foundational subjects. Special emphasis is placed on language, mathematics, and environmental studies.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'class6',
    stdMr: '६वी', stdEn: '6th',
    subjectsMr: ['मराठी', 'हिंदी', 'इंग्रजी', 'गणित', 'विज्ञान', 'इतिहास', 'भूगोल', 'कला'],
    subjectsEn: ['Marathi', 'Hindi', 'English', 'Mathematics', 'Science', 'History', 'Geography', 'Art'],
    descMr: 'सहाव्या इयत्तेत सामाजिक शास्त्राचा प्रारंभ होतो. इतिहास आणि भूगोल विषय स्वतंत्रपणे शिकवले जातात.',
    descEn: 'In Class 6, social science begins. History and Geography are taught as separate subjects.',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    id: 'class7',
    stdMr: '७वी', stdEn: '7th',
    subjectsMr: ['मराठी', 'हिंदी', 'इंग्रजी', 'गणित', 'विज्ञान', 'इतिहास', 'भूगोल', 'संगणक'],
    subjectsEn: ['Marathi', 'Hindi', 'English', 'Mathematics', 'Science', 'History', 'Geography', 'Computer'],
    descMr: 'सातव्या इयत्तेत संगणक विज्ञान हा विषय सुरू होतो. डिजिटल साक्षरतेवर भर दिला जातो.',
    descEn: 'In Class 7, Computer Science begins. Digital literacy is emphasized.',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    id: 'class8',
    stdMr: '८वी', stdEn: '8th',
    subjectsMr: ['मराठी', 'हिंदी', 'इंग्रजी', 'गणित', 'विज्ञान', 'सामाजिक शास्त्रे', 'संगणक', 'कला'],
    subjectsEn: ['Marathi', 'Hindi', 'English', 'Mathematics', 'Science', 'Social Science', 'Computer', 'Art'],
    descMr: 'आठव्या इयत्तेत अभ्यासक्रम अधिक विस्तृत होतो. विज्ञान आणि गणितावर अधिक लक्ष केंद्रित केले जाते.',
    descEn: 'In Class 8, the curriculum becomes more extensive. Greater focus is placed on Science and Mathematics.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 'class9',
    stdMr: '९वी', stdEn: '9th',
    subjectsMr: ['मराठी', 'हिंदी', 'इंग्रजी', 'गणित', 'विज्ञान', 'सामाजिक शास्त्रे', 'संगणक', 'शारीरिक शिक्षण'],
    subjectsEn: ['Marathi', 'Hindi', 'English', 'Mathematics', 'Science', 'Social Science', 'Computer', 'Physical Education'],
    descMr: 'नवव्या इयत्तेत बोर्ड परीक्षेची तयारी सुरू होते. विद्यार्थ्यांच्या शैक्षणिक गुणवत्तेवर विशेष लक्ष दिले जाते.',
    descEn: 'In Class 9, preparation for board examinations begins. Special attention is given to academic excellence.',
    color: 'from-teal-500 to-teal-600',
  },
  {
    id: 'class10',
    stdMr: '१०वी', stdEn: '10th',
    subjectsMr: ['मराठी', 'हिंदी', 'इंग्रजी', 'गणित', 'विज्ञान', 'सामाजिक शास्त्रे', 'संगणक', 'नागरिकशास्त्र'],
    subjectsEn: ['Marathi', 'Hindi', 'English', 'Mathematics', 'Science', 'Social Science', 'Computer', 'Civics'],
    descMr: 'दहावी ही विद्यार्थ्यांच्या शालेय जीवनातील महत्त्वाची इयत्ता. बोर्ड परीक्षेत यश मिळवण्यासाठी विशेष मार्गदर्शन.',
    descEn: 'Class 10 is a critical year in a student\'s school life. Special guidance for success in board examinations.',
    color: 'from-rose-500 to-rose-600',
  },
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

const iconMapping = {
  'book-open': BookOpen,
  'languages': Languages,
  'globe': Globe,
  'calculator': Calculator,
  'flask-conical': FlaskConical,
  'globe-2': Globe2,
  'cpu': Cpu,
  'palette': Palette
};

export default function Academics() {
  const { t, lang } = useLang();

  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [classesData, subjectsData] = await Promise.all([
          getClasses(),
          getSubjects()
        ]);

        console.log("CLASSES FROM SUPABASE:", classesData);
        console.log("SUBJECTS FROM SUPABASE:", subjectsData);

        setClasses(classesData || []);
        setSubjects(subjectsData || []);
      } catch (error) {
        console.error("ACADEMICS LOAD ERROR:", error);

        setClasses([]);
        setSubjects([]);
      }
    }

    loadData();
  }, []);

  const displayClasses = classes.length > 0 ? classes : classData;
  const displaySubjects = subjects || [];
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full mb-4">
              {t.academics.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#0a1628' }}>
              {t.academics.title}
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">{t.academics.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Classes */}
      {/* Classes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="space-y-8">

            {displayClasses.map((cls, i) => {

              const bgColors = [
                'from-blue-500 to-blue-600',
                'from-cyan-500 to-cyan-600',
                'from-indigo-500 to-indigo-600',
                'from-purple-500 to-purple-600',
                'from-teal-500 to-teal-600',
                'from-rose-500 to-rose-600'
              ];

              const className =
                lang === 'mr'
                  ? cls.class_name_mr
                  : cls.class_name;

              const description =
                lang === 'mr'
                  ? cls.description_mr
                  : cls.description;

              return (
                <motion.div
                  key={cls.id}
                  className="grid md:grid-cols-4 rounded-3xl overflow-hidden shadow-sm border border-slate-100"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >

                  {/* CLASS NAME */}
                  <div
                    className={`bg-gradient-to-br ${bgColors[i % bgColors.length]
                      } p-8 flex flex-col justify-center`}
                  >
                    <div
                      className="text-4xl font-bold text-white mb-2"
                      style={{
                        fontFamily: 'Playfair Display, serif'
                      }}
                    >
                      {className}
                    </div>

                    <div className="text-white/80 text-sm">
                      {lang === 'mr' ? 'इयत्ता' : 'Class'}
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <div className="md:col-span-3 bg-white p-8">

                    <p className="text-slate-600 text-base leading-relaxed">
                      {description}
                    </p>

                    <div className="mt-5">
                      <span className="text-blue-600 text-sm font-semibold">
                        {lang === 'mr'
                          ? 'अधिक माहिती →'
                          : 'More Information →'}
                      </span>
                    </div>

                  </div>

                </motion.div>
              );
            })}

          </div>

        </div>
      </section>
      {/* Subjects */}
      <section className="py-20 section-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle badge={t.subjects.badge} title={t.subjects.title} subtitle={t.subjects.subtitle} />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {displaySubjects.map((sub, i) => {
              const subjectIcons = {
                Marathi: BookOpen,
                Hindi: Languages,
                English: Globe,
                Mathematics: Calculator,
                Science: FlaskConical,
                'Social Science': Globe2,
                'Computer Science': Cpu,
                Art: Palette,
              };

              const IconComp = subjectIcons[sub.nameEn] || BookOpen;

              const colorKeys = Object.keys(colorMap);
              const colorStyle = colorMap[colorKeys[i % colorKeys.length]];

              return (
                <motion.div
                  key={sub.id}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`w-14 h-14 ${colorStyle} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <IconComp className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900">
                    {lang === 'mr' ? sub.nameMr : sub.nameEn}
                  </h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            {lang === 'mr' ? 'प्रवेशासाठी संपर्क करा' : 'Contact for Admission'}
          </h2>
          <p className="text-blue-100 mb-8">{lang === 'mr' ? 'तुमच्या मुलाच्या शैक्षणिक प्रवासाची सुरुवात करा.' : 'Begin your child\'s educational journey.'}</p>
          <Link to="/admission" className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 px-8 py-3.5 rounded-xl font-bold transition-all">
            {t.admission.formBtn} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
