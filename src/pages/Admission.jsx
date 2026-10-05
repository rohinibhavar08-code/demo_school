import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, FileText, Calendar, HelpCircle, ChevronDown, ArrowRight } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import SectionTitle from '../components/SectionTitle';
import { submitAdmission } from '../lib/api';
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

function FAQ({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div custom={index} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
      className="border border-slate-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-900 text-sm pr-4">{q}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-slate-500 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </motion.div>
  );
}

export default function Admission() {
  const { t, lang } = useLang();
  const [formData, setFormData] = useState({ name: '', parentName: '', cls: '', mobile: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();

    setSubmitting(true);
    setError('');

    const result = await submitAdmission({
      name: formData.name,
      parentName: formData.parentName,
      cls: formData.cls,
      mobile: formData.mobile,
      email: formData.email,
      message: '',
    });

    if (result.success) {
      setSubmitted(true);

      setFormData({
        name: '',
        parentName: '',
        cls: '',
        mobile: '',
        email: '',
      });
    } else {
      setError(result.error || 'Failed to submit application.');
    }

    setSubmitting(false);
  }
  const steps = [
    { icon: FileText, stepMr: '१. अर्ज भरा', stepEn: '1. Fill Application', descMr: 'ऑनलाइन किंवा शाळेत येऊन अर्ज भरा', descEn: 'Fill the form online or visit the school' },
    { icon: FileText, stepMr: '२. कागदपत्रे सादर करा', stepEn: '2. Submit Documents', descMr: 'आवश्यक कागदपत्रे शाळेत जमा करा', descEn: 'Submit required documents to school' },
    { icon: CheckCircle2, stepMr: '३. मुलाखत', stepEn: '3. Interview', descMr: 'विद्यार्थी आणि पालकांची मुलाखत', descEn: 'Student and parent interview' },
    { icon: CheckCircle2, stepMr: '४. प्रवेश निश्चित', stepEn: '4. Confirm Admission', descMr: 'शुल्क भरून प्रवेश निश्चित करा', descEn: 'Confirm admission by paying fees' },
  ];

  const docs = lang === 'mr'
    ? ['जन्म दाखला', 'आधार कार्ड', 'मागील वर्गाचे गुणपत्रक', 'पालकाचा ओळखपत्र', 'पासपोर्ट आकाराचे फोटो (२)', 'जात प्रमाणपत्र (लागू असल्यास)']
    : ['Birth Certificate', 'Aadhaar Card', 'Previous class mark sheet', 'Parent\'s ID proof', 'Passport size photos (2)', 'Caste certificate (if applicable)'];

  const faqs = [
    {
      qMr: 'प्रवेशासाठी वयाची अट काय आहे?',
      qEn: 'What is the age requirement for admission?',
      aMr: 'इयत्ता ५वीसाठी विद्यार्थ्याचे वय किमान ११ वर्षे असणे आवश्यक आहे. प्रत्येक इयत्तेनुसार वय निकष बदलतो.',
      aEn: 'For Class 5, the student must be at least 11 years old. Age criteria varies by class.',
    },
    {
      qMr: 'प्रवेश प्रक्रिया कधी सुरू होते?',
      qEn: 'When does the admission process begin?',
      aMr: 'प्रवेश प्रक्रिया साधारणपणे मार्च ते जूनदरम्यान होते. अचूक तारखांसाठी शाळेशी संपर्क साधा.',
      aEn: 'The admission process generally takes place between March and June. Contact the school for exact dates.',
    },
    {
      qMr: 'शुल्क संरचना काय आहे?',
      qEn: 'What is the fee structure?',
      aMr: 'शुल्क संरचना शैक्षणिक वर्षानुसार बदलू शकते. अधिक माहितीसाठी शाळेत भेट द्या किंवा फोन करा.',
      aEn: 'The fee structure may change with each academic year. Visit the school or call for more information.',
    },
    {
      qMr: 'शाळेत कोणती भाषा माध्यम आहे?',
      qEn: 'What is the medium of instruction?',
      aMr: 'शाळेत मराठी माध्यम आणि सेमी-इंग्लिश भाषेत शिक्षण दिले जाते. इंग्रजी हा अनिवार्य विषय आहे.',
      aEn: 'The school provides education in Marathi and Semi-English medium. English is a compulsory subject.',
    },
    {
      qMr: 'शाळेची वेळ काय आहे?',
      qEn: 'What are the school timings?',
      aMr: 'शाळेची वेळ सोमवार ते शुक्रवार, सकाळी 10:00 AM ते दुपारी 4:00 PM आहे. शनिवारी सकाळी 09:00 AM ते दुपारी 12:00 PM आहे.',
      aEn: 'School hours are Monday to Friday, 10:00 AM to 4:00 PM. For Saturday it is 09:00 AM to 12:00 PM. (Sunday Holiday)',
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full mb-6">
              {t.admission.badge}
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              {t.admission.title}
            </h1>
            <p className="text-blue-100 text-xl mb-10">{t.admission.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle badge={t.admission.processTitle} title={lang === 'mr' ? 'प्रवेशाची सोपी प्रक्रिया' : 'Simple Admission Process'} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-blue-100" />
                )}
                <h3 className="font-bold text-slate-900 text-sm mb-2">{lang === 'mr' ? step.stepMr : step.stepEn}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{lang === 'mr' ? step.descMr : step.descEn}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Docs + Form */}
      <section className="py-20 section-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Documents */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-blue-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                <span className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </span>
                {t.admission.docsTitle}
              </h3>
              <ul className="space-y-3">
                {docs.map((doc, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">{doc}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-blue-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                {t.admission.formTitle}
              </h3>

              {submitted ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{lang === 'mr' ? 'धन्यवाद!' : 'Thank You!'}</h4>
                  <p className="text-slate-500 text-sm">{lang === 'mr' ? 'तुमचा अर्ज प्राप्त झाला. आम्ही लवकरच संपर्क करू.' : 'Your application has been received. We will contact you soon.'}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">{t.admission.name} *</label>
                    <input name="name" required value={formData.name} onChange={handleChange}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 transition-colors"
                      placeholder={lang === 'mr' ? 'विद्यार्थ्याचे संपूर्ण नाव' : 'Student\'s full name'} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">{t.admission.parentName} *</label>
                    <input name="parentName" required value={formData.parentName} onChange={handleChange}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 transition-colors"
                      placeholder={lang === 'mr' ? 'पालकाचे नाव' : 'Parent\'s name'} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">{t.admission.class} *</label>
                      <select name="cls" required value={formData.cls} onChange={handleChange}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 transition-colors bg-white">
                        <option value="">{lang === 'mr' ? 'निवडा' : 'Select'}</option>
                        {['5th', '6th', '7th', '8th', '9th', '10th'].map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">{t.admission.mobile} *</label>
                      <input name="mobile" type="tel" required value={formData.mobile} onChange={handleChange}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 transition-colors"
                        placeholder="9XXXXXXXXX" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">{t.admission.email}</label>
                    <input name="email" type="email" value={formData.email} onChange={handleChange}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 transition-colors"
                      placeholder="email@example.com" />
                  </div>
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3">
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-3.5 rounded-xl font-semibold transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    {submitting
                      ? (lang === 'mr' ? 'सबमिट करत आहे...' : 'Submitting...')
                      : t.admission.submit}

                    {!submitting && <ArrowRight className="w-4 h-4" />}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionTitle badge={t.admission.faqTitle} title={lang === 'mr' ? 'सामान्य प्रश्न' : 'Frequently Asked Questions'} />
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FAQ
                key={i}
                q={lang === 'mr' ? faq.qMr : faq.qEn}
                a={lang === 'mr' ? faq.aMr : faq.aEn}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
