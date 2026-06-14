'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/languageContext';
import { languages } from '@/lib/translations';
import { Globe, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(l => l.code === language);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium transition-all border border-gray-200"
      >
        <Globe className="w-4 h-4 text-gray-600" />
        <span>{currentLang?.label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <motion.div
          className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm transition-all ${
                language === lang.code
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'
              } ${lang.code !== languages[languages.length - 1].code ? 'border-b border-gray-100' : ''}`}
            >
              <span className="flex items-center justify-between">
                <span>{lang.name}</span>
                {language === lang.code && <span className="text-blue-600">✓</span>}
              </span>
            </button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
