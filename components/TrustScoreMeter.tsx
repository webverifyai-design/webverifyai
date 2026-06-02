'use client';

import { motion } from 'framer-motion';

interface TrustScoreMeterProps {
  score: number;
  animate?: boolean;
}

export default function TrustScoreMeter({ score, animate = true }: TrustScoreMeterProps) {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = (score: number) => {
    if (score >= 70) return '#10b981'; // green
    if (score >= 40) return '#f59e0b'; // amber
    return '#ef4444'; // red
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={getColor(score)}
            strokeWidth="8"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={animate ? { strokeDashoffset } : {}}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            strokeLinecap="round"
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            className="text-4xl font-bold text-gray-900"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={animate ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {score}
          </motion.div>
          <div className="text-xs text-gray-500 font-medium">Trust Score</div>
        </div>
      </div>

      {/* Score Label */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={animate ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
          score >= 70 ? 'bg-green-100 text-green-800' :
          score >= 40 ? 'bg-amber-100 text-amber-800' :
          'bg-red-100 text-red-800'
        }`}>
          {score >= 70 ? 'Generally Safe' :
           score >= 40 ? 'Moderate Risk' :
           'High Risk'}
        </div>
      </motion.div>
    </div>
  );
}
