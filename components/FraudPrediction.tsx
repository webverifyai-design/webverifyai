'use client';

import { motion } from 'framer-motion';

interface FraudPredictionProps {
  fraudRisk: 'Low' | 'Medium' | 'High';
  recommendation: string;
}

export default function FraudPrediction({
  fraudRisk,
  recommendation,
}: FraudPredictionProps) {
  const getColorClasses = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'bg-green-50 border-green-200 text-green-900';
      case 'Medium':
        return 'bg-amber-50 border-amber-200 text-amber-900';
      case 'High':
        return 'bg-red-50 border-red-200 text-red-900';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-900';
    }
  };

  return (
    <motion.div
      className={`border-2 rounded-2xl p-8 ${getColorClasses(fraudRisk)}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
    >
      <h3 className="text-lg font-semibold mb-4">AI Fraud Prediction</h3>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Fraud Risk</p>
          <p className="text-2xl font-bold">{fraudRisk}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Recommendation</p>
          <p className="text-base">{recommendation}</p>
        </div>
      </div>
    </motion.div>
  );
}
