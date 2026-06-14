# Plain Language Mode & Multi-Language Support

## Overview
WebVerify now supports multiple languages with "Plain Language Mode" - simple explanations that non-technical users can easily understand.

## Features Implemented

### 1. **Language Support**
- **English (EN)** - Default language
- **Hindi (हिंदी)** - Hindi language with plain explanations

### 2. **Plain Language Explanations**
Instead of technical jargon, users see simple messages like:
- ✅ **Safe**: "यह वेबसाइट सुरक्षित दिख रही है..." (This website looks safe...)
- ⚠️ **Caution**: "इस वेबसाइट के कुछ सवाल हैं..." (This website has some concerns...)
- ❌ **Danger**: "यह वेबसाइट महत्वपूर्ण जोखिम दिखा रही है..." (This website shows significant risk...)

### 3. **Language Toggle Button**
Located in Navigation bar (top right):
- Click "EN" for English
- Click "हिं" for Hindi
- Preference saves automatically

## Files Created/Modified

### New Files:
1. **`lib/translations.ts`**
   - Translation strings for all UI elements
   - English & Hindi translations
   - Easy to add more languages

2. **`lib/languageContext.tsx`**
   - React Context for language state
   - Persists to localStorage
   - Accessible throughout app

3. **`components/LanguageToggle.tsx`**
   - Language selector button
   - Shows in Navigation
   - Smooth transitions

4. **`components/PlainLanguageMode.tsx`**
   - Plain language explanation card
   - Color-coded (green/yellow/red)
   - Shows on results page

### Modified Files:
1. **`components/Navigation.tsx`**
   - Added LanguageToggle component
   - Dynamic tagline based on language

2. **`app/results/[id]/page.tsx`**
   - Added PlainLanguageMode component
   - Shows right after verdict

3. **`app/layout.tsx`**
   - Wrapped with LanguageProvider
   - Enables language context globally

## How It Works

### User Flow:
1. User lands on WebVerify
2. Clicks language toggle (top right) - EN or हिं
3. Language preference saves to browser
4. Scans website as normal
5. On results page, sees:
   - Verdict (Trust Score)
   - **Plain Language Explanation** (in selected language)
   - Technical Details
   - Share button

### Plain Language Messages:

**English:**
- Safe: "This website looks safe. It has a valid SSL certificate..."
- Caution: "This website has some concerns. Use caution..."
- Danger: "This website shows significant risk factors..."

**Hindi (हिंदी):**
- Safe: "यह वेबसाइट सुरक्षित दिख रही है। इसके पास वैध SSL सर्टिफिकेट है..."
- Caution: "इस वेबसाइट के कुछ सवाल हैं। सावधानी बरतें..."
- Danger: "यह वेबसाइट महत्वपूर्ण जोखिम दिखा रही है..."

## Adding More Languages

### Step 1: Add translations to `lib/translations.ts`

```typescript
export const translations = {
  en: { ... },
  hi: { ... },
  es: {  // Spanish example
    appName: 'WebVerify IA',
    verdictSafe: '🟢 Seguro para pagar',
    plainLangSafe: 'Este sitio web parece seguro...',
    // ... add all keys
  }
}
```

### Step 2: Update Language type

```typescript
export type Language = 'en' | 'hi' | 'es';
```

### Step 3: Add button to LanguageToggle

```typescript
<button onClick={() => setLanguage('es')}>ES</button>
```

## Styling

### Plain Language Card Colors:
- **Safe (70+):** Green background
- **Caution (40-69):** Yellow background
- **Danger (<40):** Red background

### Language Toggle:
- Compact button in Navigation
- Active language highlighted
- Globe icon

## Translation Structure

Each language has these keys:

### Navigation
- `appName` - App title
- `checkBeforeYouPay` - Tagline

### Results
- `verdictSafe` - Safe verdict
- `verdictCaution` - Caution verdict
- `verdictAvoid` - Avoid verdict
- `plainLangSafe` - Safe explanation
- `plainLangCaution` - Caution explanation
- `plainLangDanger` - Danger explanation

### Technical
- `trustScore` - Label
- `riskLevel` - Label
- `lowRisk` / `mediumRisk` / `highRisk` - Risk levels

### Buttons
- `shareOnWhatsApp` - Share button text
- `backToHome` - Back button text

## User Experience

### English Mode:
```
🛡️ WebVerify AI
                                   EN | हिं

Results Page:
🟢 Safe to Pay
📖 In Plain Language:
This website looks safe. It has a valid SSL certificate, 
established domain history, and no major security threats detected.

[Share on WhatsApp]
```

### Hindi Mode:
```
🛡️ वेबवेरिफाई एआई
                                   EN | हिं

नतीजे पृष्ठ:
🟢 भुगतान के लिए सुरक्षित है
🔍 सरल भाषा में समझाया:
यह वेबसाइट सुरक्षित दिख रही है। इसके पास वैल्ड SSL सर्टिफिकेट, 
स्थापित डोमेन इतिहास है और कोई बड़ा सुरक्षा खतरा नहीं मिला है।

[WhatsApp पर साझा करें]
```

## Storage

- Language preference stored in `localStorage`
- Key: `webverify-language`
- Persists across sessions
- Auto-loads on page refresh

## Benefits

✅ **Accessible to Non-Technical Users** - No jargon, simple language
✅ **Multi-Language Ready** - Easy to add more languages
✅ **No API Calls** - All translations stored client-side
✅ **Persistent** - Remembers user's language choice
✅ **Responsive** - Works on all devices
✅ **Inclusive** - Supports Hindi and English

## Testing

1. Open WebVerify frontend
2. Click language toggle (EN/हिं)
3. Verify text changes
4. Scan a domain
5. Check Plain Language Mode displays correctly
6. Refresh page - language preference persists
7. Test different trust scores (safe/caution/danger)

## Future Enhancements

- Add more languages (Spanish, French, Arabic, Bengali, Marathi, Tamil, etc.)
- Add language detection based on browser locale
- Add accessibility features
- Add RTL language support (Arabic, Hindi)
- Add text-to-speech for explanations
