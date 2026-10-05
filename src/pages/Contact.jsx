import { useState } from 'react';
import SchoolMap from '../components/SchoolMap';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

function FbIcon() { return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>; }
function IgIcon() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>; }
function YtIcon() { return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon fill="white" points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02" /></svg>; }
import { useLang } from '../context/LanguageContext';
import school from '../data/school';
import { submitContactMessage } from '../lib/api';

export default function Contact() {
  const { t, lang } = useLang();
  const [form, setForm] = useState({ name: '', mobile: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = lang === 'mr' ? 'नाव आवश्यक आहे' : 'Name is required';
    if (!form.mobile.trim() || !/^\d{10}$/.test(form.mobile.replace(/\s/g, ''))) {
      errs.mobile = lang === 'mr' ? 'वैध मोबाईल नंबर टाका' : 'Enter a valid mobile number';
    }
    if (!form.message.trim()) errs.message = lang === 'mr' ? 'संदेश आवश्यक आहे' : 'Message is required';
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the error for that field while typing
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();

    console.log('CONTACT FORM SUBMITTED');
    console.log('Form data:', form);

    const errs = validate();

    if (Object.keys(errs).length > 0) {
      console.log('Validation errors:', errs);
      setErrors(errs);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const result = await submitContactMessage({
        name: form.name,
        mobile: form.mobile,
        email: form.email,
        subject: form.subject,
        message: form.message,
      });

      console.log('Supabase result:', result);

      if (result.success) {
        setSent(true);

        setForm({
          name: '',
          mobile: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        alert(
          lang === 'mr'
            ? `काहीतरी चूक झाली: ${result.error}`
            : `Something went wrong: ${result.error}`
        );
      }
    } catch (error) {
      console.error('Contact form error:', error);

      alert(
        lang === 'mr'
          ? 'संदेश पाठवता आला नाही.'
          : 'Unable to send message.'
      );
    } finally {
      setLoading(false);
    }
  }
  const infoCards = [
    {
      icon: MapPin,
      labelMr: t.contact.address,
      labelEn: t.contact.address,
      valueMr: school.address,
      valueEn: school.addressEn,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: Phone,
      labelMr: t.contact.phone,
      labelEn: t.contact.phone,
      valueMr: school.phone,
      valueEn: school.phone,
      color: 'bg-green-50 text-green-600',
      link: `tel:${school.phone}`,
    },
    {
      icon: Mail,
      labelMr: t.contact.email,
      labelEn: t.contact.email,
      valueMr: school.email,
      valueEn: school.email,
      color: 'bg-cyan-50 text-cyan-600',
      link: `mailto:${school.email}`,
    },
    {
      icon: Clock,
      labelMr: t.contact.hours,
      labelEn: t.contact.hours,
      valueMr: lang === 'mr' ? 'सोमवार – शुक्रवार: सकाळी १०:०० – दुपारी ४:३०' : school.hours,
      valueEn: school.hours,
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full mb-4">
              {t.contact.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#0a1628' }}>
              {t.contact.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Info cards */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {infoCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
              >
                <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center mb-4`}>
                  <card.icon className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{lang === 'mr' ? card.labelMr : card.labelEn}</p>
                {card.link ? (
                  <a href={card.link} className="text-slate-700 text-sm font-medium hover:text-blue-600 transition-colors">
                    {lang === 'mr' ? card.valueMr : card.valueEn}
                  </a>
                ) : (
                  <p className="text-slate-700 text-sm font-medium">{lang === 'mr' ? card.valueMr : card.valueEn}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-16 section-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-blue-100"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                {t.contact.formTitle}
              </h3>

              {sent ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{lang === 'mr' ? 'धन्यवाद!' : 'Thank You!'}</h4>
                  <p className="text-slate-500 text-sm">{t.contact.successMsg}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">{t.contact.name} *</label>
                      <input name="name" value={form.name} onChange={handleChange}
                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors ${errors.name ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-blue-400'}`}
                        placeholder={lang === 'mr' ? 'तुमचे नाव' : 'Your name'} />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">{t.contact.mobile} *</label>
                      <input name="mobile" type="tel" value={form.mobile} onChange={handleChange}
                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors ${errors.mobile ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-blue-400'}`}
                        placeholder="9XXXXXXXXX" />
                      {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">{t.contact.emailLabel}</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 transition-colors"
                      placeholder="email@example.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">{t.contact.subject}</label>
                    <input name="subject" value={form.subject} onChange={handleChange}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 transition-colors"
                      placeholder={lang === 'mr' ? 'संदेशाचा विषय' : 'Message subject'} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">{t.contact.message} *</label>
                    <textarea name="message" rows="4" value={form.message} onChange={handleChange}
                      className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors resize-none ${errors.message ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-blue-400'}`}
                      placeholder={lang === 'mr' ? 'तुमचा संदेश लिहा...' : 'Write your message...'} />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-70">
                    {loading ? (lang === 'mr' ? 'पाठवत आहे...' : 'Sending...') : t.contact.send}
                    {!loading && <ArrowRight className="w-4 h-4" />}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col gap-6"
              >
                <div className="bg-blue-100 rounded-3xl overflow-hidden flex-1 min-h-64 relative">

                  <SchoolMap
                    school={school}
                    lang={lang}
                  />

                </div>
              </motion.div>
              {/* Social */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-4">{lang === 'mr' ? 'आम्हाला फॉलो करा' : 'Follow Us'}</h4>
                <div className="flex gap-4">
                  <a href={school.social.facebook} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
                    <FbIcon /> Facebook
                  </a>
                  <a href={school.social.instagram} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 bg-pink-50 hover:bg-pink-100 text-pink-600 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
                    <IgIcon /> Instagram
                  </a>
                  <a href={school.social.youtube} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
                    <YtIcon /> YouTube
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
