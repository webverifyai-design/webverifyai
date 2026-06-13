export type RiskLevel = 'Low Risk' | 'Medium Risk' | 'High Risk';
export type PaymentRecommendation = 'Safe to Pay' | 'Use Caution' | 'Avoid Prepaid Payment';
export type FraudRisk = 'Low' | 'Medium' | 'High';
export type Verdict = '🟢 Safe to Pay' | '🟡 Proceed With Caution' | '🔴 Avoid Prepaid Payment';

export interface TrustBadge {
  text: string;
}

export interface TechnicalDetails {
  serverLocation: {
    country?: string;
    city?: string;
    hostingProvider?: string;
    timezone?: string;
  };
  sslCertificate: {
    trustedStatus?: string;
    issuer?: string;
    expiryDate?: string;
    encryptionStatus?: string;
  };
  domainInfo: {
    registrationDate?: string;
    domainAge?: string;
    registrar?: string;
    expiryDate?: string;
  };
  serverInfo: {
    organization?: string;
    hostingProvider?: string;
    asn?: string;
  };
  cookies: {
    count?: number;
    trackingRisk?: string;
  };
  securityHeaders: {
    hsts?: string;
    csp?: string;
    xFrameOptions?: string;
  };
  threatIntelligence?: {
    googleSafeBrowsing?: { threat: boolean; threatType?: string };
    urlhaus?: { threat: boolean };
    phishTank?: { threat: boolean; confidence?: number };
    openPhish?: { threat: boolean };
  };
  dnsSecurityCheck?: {
    dnssec?: { status: string; signed: boolean };
    mxRecords?: { exists: boolean; count: number; quality: string };
    spfRecord?: { exists: boolean; valid: boolean };
    tlsaRecords?: { exists: boolean };
  };
  contentAnalysis?: {
    statusCode: number;
    suspiciousPatterns: string[];
    contactInfo: boolean;
    redirectCount: number;
  };
}

export interface ScanResult {
  url: string;
  trustScore: number;
  riskLevel: RiskLevel;
  paymentRecommendation: PaymentRecommendation;
  aiConfidence: number;
  summary: string;
  websitePurpose?: string;
  trustBadges: TrustBadge[];
  positiveSignals: string[];
  warningSignals: string[];
  fraudRisk: FraudRisk;
  fraudRecommendation: string;
  fraudConfidence: number;
  verdict: Verdict;
  verdictExplanation: string;
  technicalDetails: TechnicalDetails;
  timestamp?: Date;
}

export interface RecentScan {
  id: string;
  url: string;
  trustScore: number;
  riskLevel: RiskLevel;
  timestamp: Date;
}
