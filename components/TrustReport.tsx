'use client';

import { motion } from 'framer-motion';
import { Copy, Download, Share2, Check } from 'lucide-react';
import { useState } from 'react';

interface TrustReportProps {
  url: string;
  trustScore: number;
  riskLevel: string;
  summary: string;
}

export default function TrustReport({
  url,
  trustScore,
  riskLevel,
  summary,
}: TrustReportProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const report = `WebVerify AI Trust Report\n\nWebsite: ${url}\nTrust Score: ${trustScore}\nRisk Level: ${riskLevel}\n\n${summary}`;
    await navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const report = `WebVerify AI Trust Report\n\nWebsite: ${url}\nTrust Score: ${trustScore}\nRisk Level: ${riskLevel}\nDate: ${new Date().toLocaleString()}\n\n${summary}`;
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(report)}`);
    element.setAttribute('download', `webverify-report-${Date.now()}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h3 className="text-lg font-semibold text-gray-900">Trust Report</h3>
      <div className="flex flex-wrap gap-3">
        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy Report
            </>
          )}
        </motion.button>

        <motion.button
          onClick={handleDownload}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 border border-green-200 rounded-lg hover:bg-green-100 transition-colors font-medium text-sm"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm"
        >
          <Share2 className="w-4 h-4" />
          Share Result
        </motion.button>
      </div>
    </motion.div>
  );
}
