export type Language = 'en' | 'hi';

export const translations = {
  en: {
    // Navigation
    appName: 'WebVerify AI',
    checkBeforeYouPay: 'Check before you pay',

    // Home Page
    enterDomain: 'Enter domain or URL',
    analyze: 'Analyze Website',

    // Results - Main Messages
    verdictSafe: '🟢 Safe to Pay',
    verdictCaution: '🟡 Proceed With Caution',
    verdictAvoid: '🔴 Avoid Prepaid Payment',

    // Plain Language Explanations
    plainLangSafe: 'This website looks safe. It has a valid SSL certificate, established domain history, and no major security threats detected.',
    plainLangCaution: 'This website has some concerns. Use caution and prefer credit card payment over direct bank transfer for buyer protection.',
    plainLangDanger: 'This website shows significant risk factors. We strongly recommend avoiding prepaid payments and contacting the seller through other verified channels.',

    // Threat Intelligence
    threatDetected: 'Threat Detected',
    threatClean: 'Clean',
    noThreats: 'No threats detected in major security databases',

    // DNS Security
    dnsSecure: 'DNS Security Configured',
    dnsInsecure: 'DNS Security Issues Found',

    // Technical Details
    trustScore: 'Trust Score',
    riskLevel: 'Risk Level',
    lowRisk: 'Low Risk',
    mediumRisk: 'Medium Risk',
    highRisk: 'High Risk',

    // Buttons
    shareOnWhatsApp: 'Share on WhatsApp',
    backToHome: 'Back to Home',

    // Language Toggle
    language: 'Language',
    english: 'English',
    hindi: 'हिंदी',
  },

  hi: {
    // Navigation
    appName: 'वेबवेरिफाई एआई',
    checkBeforeYouPay: 'भुगतान करने से पहले जांचें',

    // Home Page
    enterDomain: 'डोमेन या यूआरएल दर्ज करें',
    analyze: 'वेबसाइट का विश्लेषण करें',

    // Results - Main Messages
    verdictSafe: '🟢 भुगतान के लिए सुरक्षित है',
    verdictCaution: '🟡 सावधानी के साथ आगे बढ़ें',
    verdictAvoid: '🔴 प्रीपेड भुगतान से बचें',

    // Plain Language Explanations
    plainLangSafe: 'यह वेबसाइट सुरक्षित दिख रही है। इसके पास वैध SSL सर्टिफिकेट, स्थापित डोमेन इतिहास है और कोई बड़ा सुरक्षा खतरा नहीं मिला है।',
    plainLangCaution: 'इस वेबसाइट के कुछ सवाल हैं। सावधानी बरतें और खरीदार सुरक्षा के लिए सीधे बैंक ट्रांसफर के बजाय क्रेडिट कार्ड का उपयोग करें।',
    plainLangDanger: 'यह वेबसाइट महत्वपूर्ण जोखिम दिखा रही है। हम दृढ़ता से प्रीपेड भुगतान से बचने की सलाह देते हैं। विक्रेता से अन्य सत्यापित चैनलों के माध्यम से संपर्क करें।',

    // Threat Intelligence
    threatDetected: 'खतरा पाया गया',
    threatClean: 'सुरक्षित',
    noThreats: 'प्रमुख सुरक्षा डेटाबेस में कोई खतरा नहीं मिला',

    // DNS Security
    dnsSecure: 'DNS सुरक्षा कॉन्फ़िगर की गई है',
    dnsInsecure: 'DNS सुरक्षा समस्याएं मिलीं',

    // Technical Details
    trustScore: 'विश्वास स्कोर',
    riskLevel: 'जोखिम स्तर',
    lowRisk: 'कम जोखिम',
    mediumRisk: 'मध्यम जोखिम',
    highRisk: 'उच्च जोखिम',

    // Buttons
    shareOnWhatsApp: 'WhatsApp पर साझा करें',
    backToHome: 'होम पर वापस जाएं',

    // Language Toggle
    language: 'भाषा',
    english: 'English',
    hindi: 'हिंदी',
  }
};

export const getTranslation = (lang: Language, key: keyof typeof translations.en): string => {
  return translations[lang][key] || translations.en[key];
};
