'use client';

import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ShareProps {
  domain: string;
  trustScore: number;
  riskLevel: string;
  summary: string;
  verdict?: string;
}

export default function ShareButton({
  domain,
  trustScore,
  riskLevel,
  summary,
  verdict,
}: ShareProps) {
  const shareText = `🛡️ *WebVerify Security Check*\n\n` +
    `*Domain:* ${domain}\n` +
    `*Trust Score:* ${trustScore}/100\n` +
    `*Risk Level:* ${riskLevel}\n` +
    `${verdict ? `*Verdict:* ${verdict}\n` : ''}` +
    `\n*Summary:*\n${summary}\n\n` +
    `🔒 Check any website for free:\n` +
    `https://webverify.in`;

  const handleShare = async () => {
    try {
      // Track share event (optional)
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
      await fetch(`${backendUrl}/api/share`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain,
          platform: 'whatsapp',
          trustScore,
        }),
      }).catch(err => console.log('Share tracking failed:', err));
    } catch (error) {
      console.error('Error tracking share:', error);
    }

    // Open WhatsApp
    const encodedText = encodeURIComponent(shareText);
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.button
      onClick={handleShare}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
      title="Share on WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
      Share on WhatsApp
    </motion.button>
  );
}

