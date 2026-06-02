'use client';

import { motion } from 'framer-motion';
import { Shield, CreditCard, TrendingUp, Brain, Globe, Users } from 'lucide-react';

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Scam Detection',
    description: 'Identify fraudulent websites and scam indicators',
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: 'Payment Safety',
    description: 'Check for secure payment systems and encryption',
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Trust Score',
    description: 'Get a comprehensive trust rating from 0-100',
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'AI Investigation',
    description: 'Advanced AI analysis of website patterns',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Domain Reputation',
    description: 'Domain history and ownership verification',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Customer Signals',
    description: 'Real customer reviews and feedback analysis',
  },
];

export default function FeatureCards() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {features.map((feature, i) => (
        <motion.div
          key={i}
          className="p-6 bg-white border-2 border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-lg transition-all group cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.05 }}
          whileHover={{ y: -5 }}
        >
          <motion.div
            className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-100 transition-colors"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15 + i * 0.05 }}
          >
            {feature.icon}
          </motion.div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">✓ {feature.title}</h3>
          <p className="text-gray-600 text-sm">{feature.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
