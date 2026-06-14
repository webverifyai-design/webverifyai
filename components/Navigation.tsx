'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/lib/languageContext';

export default function Navigation() {
  const { language } = useLanguage();
  const tagline = language === 'hi' ? 'भुगतान करने से पहले जांचें।' : 'Check before you pay.';

  return (
    <motion.nav
      className="bg-white border-b border-gray-100 sticky top-0 z-50"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="p-2 bg-blue-600 rounded-lg"
              >
                <Shield className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">
                WebVerify AI
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-6">
            <div className="text-sm text-gray-600 font-medium">
              {tagline}
            </div>
            <LanguageToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
