'use client';

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Contact Section */}
        <motion.div
          className="mb-8 pb-8 border-b border-slate-700"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
            <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <p className="text-sm sm:text-base leading-relaxed">
              If you have any suggestions or feedback to help us improve, please reach out to us at{' '}
              <a
                href="mailto:webverifyai@gmail.com"
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors underline"
              >
                webverifyai@gmail.com
              </a>
              .
            </p>
          </div>
        </motion.div>

        {/* Copyright Section */}
        <motion.div
          className="text-center text-xs sm:text-sm text-slate-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <p>© 2024 WebVerify AI. Check before you pay.</p>
        </motion.div>
      </div>
    </footer>
  );
}
