'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import URLInput from '@/components/URLInput';
import FeatureCards from '@/components/FeatureCards';
import RecentScans from '@/components/RecentScans';
import Footer from '@/components/Footer';
import { RecentScan } from '@/lib/types';

// Mock recent scans for demo
const mockRecentScans: RecentScan[] = [
  {
    id: '1',
    url: 'example.com',
    trustScore: 72,
    riskLevel: 'Medium Risk',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
];

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async (url: string) => {
    setIsLoading(true);
    // Redirect to analyzing page
    router.push(`/analyzing?url=${encodeURIComponent(url)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Not sure if a website is safe?
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Let AI investigate before you pay.
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Analyze online stores, payment safety, trust signals, customer reputation, and scam indicators in seconds.
            </motion.p>
          </motion.div>

          {/* URL Input */}
          <URLInput onAnalyze={handleAnalyze} isLoading={isLoading} />

          {/* Trust Indicators */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              Trusted by shoppers worldwide
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              AI-powered analysis
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              100% private and secure
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Website Analysis</h2>
            <p className="text-lg text-gray-600">Everything you need to make confident online purchases</p>
          </motion.div>
          <FeatureCards />
        </div>
      </section>

      {/* Recent Scans Section */}
      {mockRecentScans.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <RecentScans scans={mockRecentScans} title="Recently Analyzed" />
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to shop safely?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Check any website in seconds. No signup required.
            </p>
            <URLInput onAnalyze={handleAnalyze} isLoading={isLoading} />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
