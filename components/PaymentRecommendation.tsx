'use client';

import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { PaymentRecommendation } from '@/lib/types';

interface PaymentRecommendationProps {
  recommendation: PaymentRecommendation;
  riskLevel?: string;
}

export default function PaymentRecommendationCard({
  recommendation,
  riskLevel,
}: PaymentRecommendationProps) {
  const getStyle = (rec: PaymentRecommendation) => {
    if (rec === 'Safe to Pay') {
      return {
        icon: CheckCircle,
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-900',
        badge: 'bg-green-100 text-green-800',
      };
    } else if (rec === 'Use Caution') {
      return {
        icon: AlertCircle,
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        text: 'text-amber-900',
        badge: 'bg-amber-100 text-amber-800',
      };
    } else {
      return {
        icon: XCircle,
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-900',
        badge: 'bg-red-100 text-red-800',
      };
    }
  };

  const style = getStyle(recommendation);
  const Icon = style.icon;

  return (
    <motion.div
      className={`${style.bg} border-2 ${style.border} rounded-xl p-6`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-4">
        <Icon className={`w-8 h-8 ${style.text} flex-shrink-0`} />
        <div>
          <div className="text-sm font-medium text-gray-600">Payment Recommendation</div>
          <div className={`text-lg font-semibold ${style.text}`}>
            {recommendation}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
