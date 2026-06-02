'use client';

import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface NegativeSignalsProps {
  signals: string[];
}

export default function NegativeSignals({ signals }: NegativeSignalsProps) {
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-lg font-semibold text-gray-900">Warning Signals</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {signals.map((signal, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + i * 0.05 }}
          >
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <span className="text-sm text-gray-700">{signal}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
