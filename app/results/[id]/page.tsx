'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import TrustScoreMeter from '@/components/TrustScoreMeter';
import AIInvestigationCard from '@/components/AIInvestigationCard';
import PaymentRecommendation from '@/components/PaymentRecommendation';
import PositiveSignals from '@/components/PositiveSignals';
import NegativeSignals from '@/components/NegativeSignals';
import TechnicalAnalysis from '@/components/TechnicalAnalysis';
import FraudPrediction from '@/components/FraudPrediction';
import Verdict from '@/components/Verdict';
import TrustReport from '@/components/TrustReport';
import RecentScans from '@/components/RecentScans';
import ShareButton from '@/components/ShareButton';
import Footer from '@/components/Footer';
import { ScanResult } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import PlainLanguageMode from '@/components/PlainLanguageMode';

export default function ResultsPage() {
  const params = useParams();
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedResult = sessionStorage.getItem('lastScanResult');

    if (savedResult) {
      try {
        const result = JSON.parse(savedResult) as ScanResult;
        setScanResult(result);
        sessionStorage.removeItem('lastScanResult');
      } catch (error) {
        console.error('Failed to parse saved result:', error);
      }
    }

    setIsLoading(false);
  }, [params]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  if (!scanResult) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No scan results found</h1>
          <p className="text-gray-600 mb-8">Please perform a new scan to analyze a website.</p>
          <Link href="/">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const recentScans = [
    {
      id: '1',
      url: 'example.com',
      trustScore: 72,
      riskLevel: 'Medium Risk' as const,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Navigation />

      {/* Back Button */}
      <motion.div
        className="border-b border-gray-100 bg-white sticky top-16 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/">
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition font-medium text-sm">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* URL Display */}
          <motion.div
            className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm text-blue-800 font-medium">Analyzing:</p>
            <p className="text-lg text-blue-900 font-semibold break-all">{scanResult.url}</p>
          </motion.div>

          {/* Verdict Section - Prominent */}
          <div className="mb-12">
            <Verdict verdict={scanResult.verdict} explanation={scanResult.verdictExplanation} />
          </div>

          {/* Plain Language Explanation */}
          <div className="mb-12">
            <PlainLanguageMode
              trustScore={scanResult.trustScore}
              riskLevel={scanResult.riskLevel}
            />
          </div>

          {/* Action Buttons */}
          <motion.div
            className="mb-12 flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ShareButton
              domain={scanResult.url}
              trustScore={scanResult.trustScore}
              riskLevel={scanResult.riskLevel}
              summary={scanResult.summary}
              verdict={scanResult.verdict}
            />
          </motion.div>

          {/* Two Column Layout - Trust Score & Recommendation */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Left Column - Trust Score */}
            <motion.div
              className="lg:col-span-1 space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg">
                <TrustScoreMeter score={scanResult.trustScore} animate={true} />
                {/* Trust Details Below Score */}
                <div className="mt-8 space-y-3 text-center text-sm">
                  <div>
                    <p className="text-gray-600">Risk Level</p>
                    <p className="font-semibold text-gray-900">{scanResult.riskLevel}</p>
                  </div>
                </div>
              </div>
              <PaymentRecommendation recommendation={scanResult.paymentRecommendation} />
            </motion.div>

            {/* Right Column - AI Investigation Summary */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <AIInvestigationCard
                summary={scanResult.summary}
                websitePurpose={scanResult.websitePurpose}
              />
            </motion.div>
          </div>

          {/* Signal Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <PositiveSignals signals={scanResult.positiveSignals} />
            <NegativeSignals signals={scanResult.warningSignals} />
          </div>

          {/* Fraud Prediction */}
          <div className="mb-12">
            <FraudPrediction
              fraudRisk={scanResult.fraudRisk}
              recommendation={scanResult.fraudRecommendation}
            />
          </div>

          {/* Technical Details */}
          <div className="mb-12">
            <TechnicalAnalysis technicalDetails={scanResult.technicalDetails} />
          </div>

          {/* Trust Report */}
          <TrustReport
            url={scanResult.url}
            trustScore={scanResult.trustScore}
            riskLevel={scanResult.riskLevel}
            summary={scanResult.summary}
          />
        </div>
      </main>

      {/* Recent Scans Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <RecentScans scans={recentScans} title="Other Recent Analyses" />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
