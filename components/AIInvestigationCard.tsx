'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface AIInvestigationCardProps {
  summary: string;
  websitePurpose?: string;
}

function AIMascot() {
  return (
    <motion.div
      className="relative w-32 h-32 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <svg viewBox="0 0 200 240" className="w-full h-full">
        {/* Hat */}
        <ellipse cx="100" cy="45" rx="50" ry="35" fill="#f4a261" opacity="0.9" />
        <path d="M 60 50 Q 60 20 100 15 Q 140 20 140 50" fill="#f4a261" />
        <ellipse cx="100" cy="50" rx="45" ry="12" fill="#e89257" />

        {/* Head */}
        <circle cx="100" cy="110" r="45" fill="#fdbf9f" />

        {/* Blush */}
        <ellipse cx="65" cy="115" rx="15" ry="12" fill="#f4a8a8" opacity="0.6" />
        <ellipse cx="135" cy="115" rx="15" ry="12" fill="#f4a8a8" opacity="0.6" />

        {/* Eyes - Large and cute */}
        <circle cx="80" cy="100" r="12" fill="#ffffff" />
        <circle cx="120" cy="100" r="12" fill="#ffffff" />
        <circle cx="82" cy="102" r="8" fill="#2d3436" />
        <circle cx="122" cy="102" r="8" fill="#2d3436" />
        <circle cx="84" cy="100" r="3" fill="#ffffff" />
        <circle cx="124" cy="100" r="3" fill="#ffffff" />

        {/* Smile */}
        <path d="M 85 125 Q 100 135 115 125" stroke="#2d3436" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Nose */}
        <circle cx="100" cy="110" r="4" fill="#f08080" />

        {/* Body/Shirt */}
        <ellipse cx="100" cy="175" rx="40" ry="50" fill="#2980b9" />

        {/* Checkered Shirt pattern */}
        <rect x="75" y="155" width="50" height="40" fill="#e67e22" opacity="0.8" />
        <line x1="75" y1="165" x2="125" y2="165" stroke="#2980b9" strokeWidth="1" />
        <line x1="75" y1="175" x2="125" y2="175" stroke="#2980b9" strokeWidth="1" />
        <line x1="85" y1="155" x2="85" y2="195" stroke="#2980b9" strokeWidth="1" />
        <line x1="100" y1="155" x2="100" y2="195" stroke="#2980b9" strokeWidth="1" />
        <line x1="115" y1="155" x2="115" y2="195" stroke="#2980b9" strokeWidth="1" />

        {/* Backpack */}
        <rect x="130" y="160" width="28" height="35" rx="4" fill="#1e90ff" stroke="#0066cc" strokeWidth="1.5" />
        <circle cx="137" cy="167" r="2.5" fill="#0066cc" />
        <circle cx="148" cy="167" r="2.5" fill="#0066cc" />

        {/* Magnifying Glass */}
        <g transform="translate(45, 60)">
          <circle cx="0" cy="0" r="20" fill="none" stroke="#2d3436" strokeWidth="3" />
          <circle cx="0" cy="0" r="18" fill="#e8f4f8" opacity="0.7" />
          <line x1="14" y1="14" x2="28" y2="28" stroke="#8b7355" strokeWidth="3" strokeLinecap="round" />
          <line x1="14" y1="14" x2="20" y2="20" stroke="#2d3436" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Sparkles around magnifying glass */}
        <circle cx="30" cy="40" r="2" fill="#f1c40f" />
        <circle cx="50" cy="35" r="1.5" fill="#f1c40f" />
        <circle cx="25" cy="60" r="1.5" fill="#f1c40f" />
      </svg>
    </motion.div>
  );
}

export default function AIInvestigationCard({
  summary,
  websitePurpose,
}: AIInvestigationCardProps) {
  const [showFallback, setShowFallback] = useState(false);

  return (
    <motion.div
      className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="space-y-6">
        <div className="flex justify-center">
          {!showFallback ? (
            <motion.div
              className="relative w-32 h-32 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Image
                src="/mascot.png"
                alt="WebVerify AI Mascot"
                width={128}
                height={128}
                className="w-full h-full object-contain"
                priority
                onError={() => setShowFallback(true)}
              />
            </motion.div>
          ) : (
            <AIMascot />
          )}
        </div>

        <motion.h3
          className="text-xl font-semibold text-gray-900 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          AI Investigation Summary
        </motion.h3>

        {/* ── Website Purpose Block ── ADD THIS ENTIRE BLOCK */}
        {websitePurpose && (
          <motion.div
            className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            <p className="text-xs font-semibold text-blue-600 mb-1">🌐 What this website does</p>
            <p className="text-sm text-gray-700 leading-relaxed">{websitePurpose}</p>
          </motion.div>
        )}
        {/* ── End Website Purpose Block ── */}

        <motion.p
          className="text-gray-700 text-center leading-relaxed text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {summary}
        </motion.p>
      </div>
    </motion.div>
  );
}