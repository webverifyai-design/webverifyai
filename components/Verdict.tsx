'use client';

import { motion } from 'framer-motion';

interface VerdictProps {
  verdict: '🟢 Safe to Pay' | '🟡 Proceed With Caution' | '🔴 Avoid Prepaid Payment';
  explanation: string;
}

export default function Verdict({ verdict, explanation }: VerdictProps) {
  const getColorClasses = (v: string) => {
    if (v.includes('🟢')) return 'bg-green-50 border-green-200';
    if (v.includes('🟡')) return 'bg-amber-50 border-amber-200';
    return 'bg-red-50 border-red-200';
  };

  const getTextColor = (v: string) => {
    if (v.includes('🟢')) return 'text-green-900';
    if (v.includes('🟡')) return 'text-amber-900';
    return 'text-red-900';
  };

  return (
    <motion.div
      className={`border-2 rounded-2xl p-8 ${getColorClasses(verdict)}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <h3 className={`text-2xl font-bold mb-4 ${getTextColor(verdict)}`}>
        {verdict}
      </h3>
      <p className="text-gray-700 leading-relaxed">
        {explanation}
      </p>
    </motion.div>
  );
}
