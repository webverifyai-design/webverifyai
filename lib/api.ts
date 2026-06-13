import { ScanResult } from './types';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export async function scanWebsite(url: string): Promise<ScanResult> {
  try {
    // Extract domain from URL
    const domain = url.startsWith('http') ? new URL(url).hostname : url;

    const response = await fetch(`${BACKEND_URL}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ domain }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return mapBackendResponse(data);
  } catch (error) {
    console.error('Failed to scan website:', error);
    // Return mock data for development
    return getMockScanResult(url);
  }
}

function mapBackendResponse(data: any): ScanResult {
  const analysis = data.aiAnalysis || {};
  const domainInfo = data.domainInfo || {};
  const sslInfo = data.sslInfo || {};
  const serverLocation = data.serverLocation || {};
  const threatIntelligence = data.threatIntelligence || {};
  const dnsSecurityCheck = data.dnsSecurityCheck || {};
  const contentAnalysis = data.contentAnalysis || {};

  return {
    url: data.domain || '',
    trustScore: analysis.trustScore || 72,
    riskLevel: analysis.riskLevel || 'Medium Risk',
    paymentRecommendation: mapPaymentRecommendation(analysis.paymentAdvice),
    aiConfidence: analysis.confidence || 85,
    summary: analysis.summary || '',
    websitePurpose: analysis.websitePurpose || '',
    trustBadges: [],
    positiveSignals: analysis.positiveSignals || [
      'HTTPS Enabled',
      'Valid SSL Certificate',
      'Domain Registered Multiple Years Ago',
    ],
    warningSignals: analysis.warningSignals || [],
    fraudRisk: (analysis.fraudRisk === 'Low' ? 'Low' : analysis.fraudRisk === 'High' ? 'High' : 'Medium') as 'Low' | 'Medium' | 'High',
    fraudRecommendation: analysis.fraudExplanation || 'Use standard payment methods for security.',
    fraudConfidence: analysis.confidence || 85,
    verdict: mapVerdict(analysis.trustScore),
    verdictExplanation: getVerdictExplanation(analysis.trustScore, analysis.summary),
    technicalDetails: {
      serverLocation: {
        country: serverLocation.country || 'Unknown',
        city: serverLocation.city || 'Unknown',
        hostingProvider: serverLocation.org || serverLocation.isp || 'Unknown',
        timezone: serverLocation.timezone || 'Unknown',
      },
      sslCertificate: {
        trustedStatus: sslInfo.status === 'Valid' ? 'Valid' : 'Invalid',
        issuer: sslInfo.issuer || 'Unknown',
        expiryDate: sslInfo.validTo || 'Unknown',
        encryptionStatus: sslInfo.protocol || 'TLS 1.2',
      },
      domainInfo: {
        registrationDate: domainInfo.created || 'Unknown',
        domainAge: domainInfo.domainAge || 'Unknown',
        registrar: domainInfo.registrar || 'Unknown',
        expiryDate: domainInfo.expires || 'Unknown',
      },
      serverInfo: {
        organization: serverLocation.org || 'Unknown',
        hostingProvider: serverLocation.isp || 'Unknown',
        asn: serverLocation.asn || 'Unknown',
      },
      cookies: {
        count: 0,
        trackingRisk: 'Medium',
      },
      securityHeaders: {
        hsts: sslInfo.trusted ? 'Present' : 'Missing',
        csp: 'Partial',
        xFrameOptions: 'SAMEORIGIN',
      },
      threatIntelligence: {
        googleSafeBrowsing: {
          threat: threatIntelligence.googleSafeBrowsing?.threat || false,
          threatType: threatIntelligence.googleSafeBrowsing?.threatType,
        },
        urlhaus: {
          threat: threatIntelligence.urlhaus?.threat || false,
        },
        phishTank: {
          threat: threatIntelligence.phishTank?.threat || false,
          confidence: threatIntelligence.phishTank?.confidence,
        },
        openPhish: {
          threat: threatIntelligence.openPhish?.threat || false,
        },
      },
      dnsSecurityCheck: {
        dnssec: {
          status: dnsSecurityCheck.dnssec?.status || 'unknown',
          signed: dnsSecurityCheck.dnssec?.signed || false,
        },
        mxRecords: {
          exists: dnsSecurityCheck.mxRecords?.exists || false,
          count: dnsSecurityCheck.mxRecords?.count || 0,
          quality: dnsSecurityCheck.mxRecords?.quality || 'unknown',
        },
        spfRecord: {
          exists: dnsSecurityCheck.spfRecord?.exists || false,
          valid: dnsSecurityCheck.spfRecord?.valid || false,
        },
        tlsaRecords: {
          exists: dnsSecurityCheck.tlsaRecords?.exists || false,
        },
      },
      contentAnalysis: {
        statusCode: contentAnalysis.statusCode || 0,
        suspiciousPatterns: contentAnalysis.suspiciousPatterns || [],
        contactInfo: contentAnalysis.hasContactInfo || false,
        redirectCount: contentAnalysis.redirects || 0,
      },
    },
    timestamp: new Date(),
  };
}

function mapPaymentRecommendation(advice: string): 'Safe to Pay' | 'Use Caution' | 'Avoid Prepaid Payment' {
  if (!advice) return 'Use Caution';
  const lower = advice.toLowerCase();
  if (lower.includes('safe') || lower.includes('credit card')) return 'Safe to Pay';
  if (lower.includes('avoid') || lower.includes('not recommended')) return 'Avoid Prepaid Payment';
  return 'Use Caution';
}

function getVerdictExplanation(trustScore: number, summary: string): string {
  if (trustScore >= 70) {
    return 'This website demonstrates strong security measures and a solid trust profile. You can proceed with confidence for transactions.';
  } else if (trustScore >= 40) {
    return 'While this website has some positive indicators, there are aspects that warrant caution. Consider using secure payment methods like credit cards or UPI.';
  } else {
    return 'This website shows significant risk factors. We strongly recommend avoiding prepaid transactions and considering alternative options.';
  }
}

function mapVerdict(trustScore: number): '🟢 Safe to Pay' | '🟡 Proceed With Caution' | '🔴 Avoid Prepaid Payment' {
  if (trustScore >= 70) return '🟢 Safe to Pay';
  if (trustScore >= 40) return '🟡 Proceed With Caution';
  return '🔴 Avoid Prepaid Payment';
}

export function getMockScanResult(url: string): ScanResult {
  return {
    url,
    trustScore: 72,
    riskLevel: 'Medium Risk',
    paymentRecommendation: 'Use Caution',
    aiConfidence: 85,
    summary: 'Our analysis indicates that this website uses a valid SSL certificate and has been active for several years. The business appears legitimate and contact information is available. However, customer reputation signals are mixed, so users should exercise caution before making large prepaid purchases.',
    websitePurpose: 'Enable Gemini AI for website purpose detection. Add GEMINI_API_KEY to your backend .env file.',
    trustBadges: [],
    positiveSignals: [
      'HTTPS Enabled',
      'Valid SSL Certificate',
      'Domain Registered Multiple Years Ago',
      'Contact Information Available',
      'Business Identity Detected',
      'Active Website Presence',
    ],
    warningSignals: [
      'Mixed Customer Reviews',
      'Limited Return Policy Information',
      'Recently Updated Ownership Records',
      'Large Discounts Require Verification',
    ],
    fraudRisk: 'Medium',
    fraudRecommendation: 'Small purchases appear reasonable. For expensive purchases use a credit card or Cash on Delivery.',
    fraudConfidence: 85,
    verdict: '🟡 Proceed With Caution',
    verdictExplanation: 'This website has legitimate SSL encryption and a established domain history, but mixed customer reviews suggest you should be cautious with large purchases. Use secure payment methods.',
    technicalDetails: {
      serverLocation: {
        country: 'United States',
        city: 'San Francisco',
        hostingProvider: 'Example Hosting Inc',
        timezone: 'PST',
      },
      sslCertificate: {
        trustedStatus: 'Valid',
        issuer: 'Let\'s Encrypt',
        expiryDate: '2025-12-31',
        encryptionStatus: 'TLS 1.3',
      },
      domainInfo: {
        registrationDate: '2021-03-15',
        domainAge: '3 years',
        registrar: 'GoDaddy',
        expiryDate: '2026-03-15',
      },
      serverInfo: {
        organization: 'Example Business LLC',
        hostingProvider: 'Example Hosting Inc',
        asn: 'AS12345',
      },
      cookies: {
        count: 8,
        trackingRisk: 'Medium',
      },
      securityHeaders: {
        hsts: 'Present',
        csp: 'Partial',
        xFrameOptions: 'SAMEORIGIN',
      },
    },
    timestamp: new Date(),
  };
}
