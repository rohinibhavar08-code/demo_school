import { motion } from 'framer-motion';

export default function SectionTitle({ badge, title, subtitle, center = true, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${center ? 'text-center' : ''}`}
    >
      {badge && (
        <span className={`inline-block text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 ${
          light
            ? 'bg-white/20 text-white'
            : 'bg-blue-50 text-blue-600'
        }`}>
          {badge}
        </span>
      )}
      <h2
        className={`text-3xl sm:text-4xl font-bold leading-tight mb-4 ${light ? 'text-white' : 'text-slate-900'}`}
        style={{ fontFamily: 'Playfair Display, serif', color: light ? '#fff' : '#0a1628' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base sm:text-lg max-w-2xl leading-relaxed ${center ? 'mx-auto' : ''} ${light ? 'text-blue-100' : 'text-slate-500'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
