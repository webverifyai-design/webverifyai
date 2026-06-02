'use client';

import { motion } from 'framer-motion';
import { Globe, Lock, Calendar, Server, Cookie, Shield } from 'lucide-react';
import { TechnicalDetails } from '@/lib/types';

interface TechnicalAnalysisProps {
  technicalDetails: TechnicalDetails;
}

interface DetailCard {
  title: string;
  items: { label: string; value: string }[];
  icon: React.ReactNode;
  color: string;
}

export default function TechnicalAnalysis({
  technicalDetails,
}: TechnicalAnalysisProps) {
  const cards: DetailCard[] = [
    {
      title: 'Server Location',
      items: [
        { label: 'Country', value: technicalDetails.serverLocation?.country || 'N/A' },
        { label: 'City', value: technicalDetails.serverLocation?.city || 'N/A' },
        { label: 'Hosting Provider', value: technicalDetails.serverLocation?.hostingProvider || 'N/A' },
        { label: 'Timezone', value: technicalDetails.serverLocation?.timezone || 'N/A' },
      ],
      icon: <Globe className="w-5 h-5" />,
      color: 'blue',
    },
    {
      title: 'SSL Certificate',
      items: [
        { label: 'Trusted Status', value: technicalDetails.sslCertificate?.trustedStatus || 'N/A' },
        { label: 'Issuer', value: technicalDetails.sslCertificate?.issuer || 'N/A' },
        { label: 'Expiry Date', value: technicalDetails.sslCertificate?.expiryDate || 'N/A' },
        { label: 'Encryption', value: technicalDetails.sslCertificate?.encryptionStatus || 'N/A' },
      ],
      icon: <Lock className="w-5 h-5" />,
      color: 'green',
    },
    {
      title: 'Domain Information',
      items: [
        { label: 'Registration Date', value: technicalDetails.domainInfo?.registrationDate || 'N/A' },
        { label: 'Domain Age', value: technicalDetails.domainInfo?.domainAge || 'N/A' },
        { label: 'Registrar', value: technicalDetails.domainInfo?.registrar || 'N/A' },
        { label: 'Expiry Date', value: technicalDetails.domainInfo?.expiryDate || 'N/A' },
      ],
      icon: <Calendar className="w-5 h-5" />,
      color: 'purple',
    },
    {
      title: 'Server Information',
      items: [
        { label: 'Organization', value: technicalDetails.serverInfo?.organization || 'N/A' },
        { label: 'Hosting Provider', value: technicalDetails.serverInfo?.hostingProvider || 'N/A' },
        { label: 'ASN', value: technicalDetails.serverInfo?.asn || 'N/A' },
      ],
      icon: <Server className="w-5 h-5" />,
      color: 'orange',
    },
    {
      title: 'Cookies & Tracking',
      items: [
        { label: 'Cookie Count', value: technicalDetails.cookies?.count?.toString() || 'N/A' },
        { label: 'Tracking Risk', value: technicalDetails.cookies?.trackingRisk || 'N/A' },
      ],
      icon: <Cookie className="w-5 h-5" />,
      color: 'amber',
    },
    {
      title: 'Security Headers',
      items: [
        { label: 'HSTS', value: technicalDetails.securityHeaders?.hsts || 'N/A' },
        { label: 'CSP', value: technicalDetails.securityHeaders?.csp || 'N/A' },
        { label: 'X-Frame-Options', value: technicalDetails.securityHeaders?.xFrameOptions || 'N/A' },
      ],
      icon: <Shield className="w-5 h-5" />,
      color: 'blue',
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'green': 'bg-green-50 text-green-600 border-green-200',
      'blue': 'bg-blue-50 text-blue-600 border-blue-200',
      'purple': 'bg-purple-50 text-purple-600 border-purple-200',
      'orange': 'bg-orange-50 text-orange-600 border-orange-200',
      'amber': 'bg-amber-50 text-amber-600 border-amber-200',
    };
    return colorMap[color] || 'bg-gray-50 text-gray-600 border-gray-200';
  };

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h3 className="text-lg font-semibold text-gray-900">Technical Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card, cardIndex) => (
          <motion.div
            key={cardIndex}
            className={`border rounded-lg p-4 ${getColorClasses(card.color)}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 + cardIndex * 0.05 }}
          >
            <div className="flex items-center gap-2 mb-3">
              {card.icon}
              <h4 className="font-semibold text-sm text-gray-900">{card.title}</h4>
            </div>
            <div className="space-y-2">
              {card.items.map((item, itemIndex) => (
                <div key={itemIndex} className="text-xs">
                  <div className="text-gray-600 font-medium">{item.label}</div>
                  <div className="text-gray-900 font-semibold text-sm">{item.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
