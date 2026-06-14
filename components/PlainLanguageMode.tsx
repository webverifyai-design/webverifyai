'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/languageContext';
import { getTranslation } from '@/lib/translations';

interface PlainLanguageModeProps {
  trustScore: number;
  riskLevel: string;
}

export default function PlainLanguageMode({
  trustScore,
  riskLevel,
}: PlainLanguageModeProps) {
  const { language } = useLanguage();

  const getPlainLanguageMessage = () => {
    if (trustScore >= 70) {
      return getTranslation(language, 'plainLangSafe');
    } else if (trustScore >= 40) {
      return getTranslation(language, 'plainLangCaution');
    } else {
      return getTranslation(language, 'plainLangDanger');
    }
  };

  const getBackgroundColor = () => {
    if (trustScore >= 70) {
      return 'bg-green-50 border-green-200';
    } else if (trustScore >= 40) {
      return 'bg-yellow-50 border-yellow-200';
    } else {
      return 'bg-red-50 border-red-200';
    }
  };

  const getTextColor = () => {
    if (trustScore >= 70) {
      return 'text-green-800';
    } else if (trustScore >= 40) {
      return 'text-yellow-800';
    } else {
      return 'text-red-800';
    }
  };

  return (
    <motion.div
      className={`border-l-4 rounded-lg p-6 ${getBackgroundColor()} ${getTextColor()}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-lg font-bold mb-3">
        {language === 'hi' ? '🔍 सरल भाषा में समझाया:' : '📖 In Plain Language:'}
      </h3>
      <p className="text-base leading-relaxed font-medium">
        {getPlainLanguageMessage()}
      </p>
    </motion.div>
  );
}
