import { motion } from 'framer-motion';
import { Monitor, FlaskConical, Cpu, Library, Dumbbell, Palette, Wifi, TreePine, Users, Shield } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import SectionTitle from '../components/SectionTitle';
import { getFacilities } from '../lib/api';
import { useState, useEffect } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

const facilities = [
  {
    icon: Monitor, nameMr: 'स्मार्ट क्लासरूम', nameEn: 'Smart Classrooms',
    descMr: 'प्रत्येक वर्गखोलीत स्मार्ट बोर्ड, प्रोजेक्टर आणि डिजिटल शिक्षण साहित्य उपलब्ध आहे. शिक्षण अधिक रोचक आणि परिणामकारक बनवण्यासाठी आधुनिक तंत्रज्ञानाचा वापर.',
    descEn: 'Every classroom is equipped with smart boards, projectors, and digital learning materials. Modern technology is used to make education more engaging and effective.',
    img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop&auto=format',
  },
  {
    icon: FlaskConical, nameMr: 'विज्ञान प्रयोगशाळा', nameEn: 'Science Laboratory',
    descMr: 'सुसज्ज विज्ञान प्रयोगशाळेत भौतिकशास्त्र, रसायनशास्त्र आणि जीवशास्त्राचे प्रात्यक्षिक प्रयोग करता येतात. शास्त्रीय संशोधनाला प्रोत्साहन.',
    descEn: 'In the well-equipped science laboratory, practical experiments in Physics, Chemistry, and Biology can be conducted. Encouragement for scientific research.',
    img: 'https://images.unsplash.com/photo-1532094349884-543559fe0e5f?w=600&h=400&fit=crop&auto=format',
  },

  {
    icon: Library, nameMr: 'ग्रंथालय', nameEn: 'Library',
    descMr: '५,०००+ पुस्तके, मासिके, वर्तमानपत्रे आणि डिजिटल संसाधनांनी समृद्ध ग्रंथालय. वाचन संस्कृतीच्या विकासासाठी शांत वातावरण.',
    descEn: 'A library rich with 5,000+ books, magazines, newspapers, and digital resources. A peaceful environment for developing reading culture.',
    img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&h=400&fit=crop&auto=format',
  },
  {
    icon: Dumbbell, nameMr: 'क्रीडांगण', nameEn: 'Playground',
    descMr: 'विस्तीर्ण क्रीडांगणावर क्रिकेट, कबड्डी, खो-खो, फुटबॉल, अॅथलेटिक्ससाठी सर्व सोयी. शारीरिक विकासासाठी योग्य सुविधा.',
    descEn: 'All facilities for cricket, kabaddi, kho-kho, football, and athletics on the spacious playground. Proper facilities for physical development.',
    img: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop&auto=format',
  },
  {
    icon: Palette, nameMr: 'उपक्रम कक्ष', nameEn: 'Activity Room',
    descMr: 'कला, हस्तकला, संगीत आणि विविध सांस्कृतिक उपक्रमांसाठी खास सुसज्ज कक्ष. विद्यार्थ्यांच्या सर्जनशीलतेला वाव देण्यासाठी.',
    descEn: 'A specially equipped room for art, handicrafts, music, and various cultural activities. To encourage students\' creativity.',
    img: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&h=400&fit=crop&auto=format',
  },

  {
    icon: TreePine, nameMr: 'हिरवागार परिसर', nameEn: 'Green Campus',
    descMr: 'वृक्षांनी सुशोभित हिरवागार आणि स्वच्छ परिसर. पर्यावरण जागृतीसाठी शाळेत वनस्पती उद्यान.',
    descEn: 'A green and clean campus adorned with trees. A botanical garden at school for environmental awareness.',
    img: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop&auto=format',
  },
];

const iconMapping = {
  'monitor': Monitor,
  'flask-conical': FlaskConical,
  'cpu': Cpu,
  'library': Library,
  'dumbbell': Dumbbell,
  'palette': Palette,
  'wifi': Wifi,
  'tree-pine': TreePine,
  'users': Users,
  'shield': Shield
};

export default function Facilities() {
  const { t, lang } = useLang();

  const [facilitiesList, setFacilitiesList] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await getFacilities();
      setFacilitiesList(data);
    }
    loadData();
  }, []);

  const displayFacilities = facilitiesList.length > 0 ? facilitiesList : facilities;

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full mb-4">
              {t.facilities.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#0a1628' }}>
              {t.facilities.title}
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">{t.facilities.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="space-y-12">
            {displayFacilities.map((fac, i) => {
              const IconComp = fac.icon_name ? iconMapping[fac.icon_name] || Monitor : fac.icon;
              return (
                <motion.div
                  key={fac.id || i}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}
                >
                  <div className="rounded-3xl overflow-hidden bg-blue-50 aspect-video">
                    <img src={fac.image_url || fac.img} alt={lang === 'mr' ? (fac.name_mr || fac.nameMr) : (fac.name_en || fac.nameEn)}
                      className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-5">
                      <IconComp className="w-7 h-7 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {lang === 'mr' ? (fac.name_mr || fac.nameMr) : (fac.name_en || fac.nameEn)}
                    </h3>
                    <p className="text-slate-500 leading-relaxed">
                      {lang === 'mr' ? (fac.description_mr || fac.descMr) : (fac.description_en || fac.descEn)}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="py-16 section-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-10 shadow-sm border border-blue-100 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              {lang === 'mr' ? 'विद्यार्थ्यांची सुरक्षितता' : 'Student Safety'}
            </h3>
            <p className="text-slate-500 leading-relaxed">
              {lang === 'mr'
                ? 'शाळेत CCTV निगराणी, सुरक्षा रक्षक आणि सुरक्षित प्रवेश व्यवस्था आहे. प्रत्येक विद्यार्थ्याची सुरक्षितता आमची प्राथमिकता आहे.'
                : 'The school has CCTV surveillance, security guards, and a secure entry system. The safety of every student is our priority.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
