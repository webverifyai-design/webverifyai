'use client';

import { motion } from 'framer-motion';
import { RecentScan } from '@/lib/types';
import Link from 'next/link';

interface RecentScansProps {
  scans: RecentScan[];
  title?: string;
}

export default function RecentScans({ scans, title = 'Recent Scans' }: RecentScansProps) {
  if (scans.length === 0) {
    return null;
  }

  const getRiskColor = (riskLevel: string) => {
    if (riskLevel === 'Low') return 'bg-green-100 text-green-800';
    if (riskLevel === 'Medium') return 'bg-amber-100 text-amber-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <div className="space-y-2">
        {scans.map((scan, i) => (
          <motion.div
            key={scan.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link href={`/results/${scan.id}`}>
              <div className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all group cursor-pointer">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate group-hover:text-blue-600 transition">
                      {scan.url}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(scan.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">{scan.trustScore}</div>
                      <div className="text-xs text-gray-500">Score</div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRiskColor(scan.riskLevel)} whitespace-nowrap`}>
                      {scan.riskLevel}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
