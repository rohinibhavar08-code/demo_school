import { createContext, useContext, useState, useEffect } from 'react';
import translations from '../data/translations.js';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('schoolLang') || 'mr';
  });

  const t = translations[lang];

  function switchLang(l) {
    setLang(l);
    localStorage.setItem('schoolLang', l);
  }

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, t, switchLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
