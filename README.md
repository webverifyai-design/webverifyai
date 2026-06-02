# WebVerify AI

**Check before you pay.** AI-powered trust analysis for online stores.

A modern, friendly platform that helps users determine whether an online shopping website is trustworthy before making payment.

## Features

- 🛡️ **Scam Detection** - Identify fraudulent websites and scam indicators
- 💳 **Payment Safety** - Check for secure payment systems and encryption
- 📊 **Trust Score** - Get a comprehensive trust rating from 0-100
- 🧠 **AI Investigation** - Advanced AI analysis of website patterns
- 🌐 **Domain Reputation** - Domain history and ownership verification
- 👥 **Customer Signals** - Real customer reviews and feedback analysis

## Getting Started

### Prerequisites

- Node.js 18+ and npm 9+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Project Structure

```
app/
├── layout.tsx                  # Root layout
├── page.tsx                    # Landing page
├── analyzing/page.tsx          # Analysis page
└── results/[id]/page.tsx       # Results page

components/
├── Navigation.tsx              # Header
├── URLInput.tsx                # URL input form
├── FeatureCards.tsx            # Feature overview
├── TrustScoreMeter.tsx         # Animated score
├── AIInvestigationCard.tsx     # AI summary
├── PaymentRecommendation.tsx   # Payment recommendation
├── PositiveSignals.tsx         # Positive signals
├── NegativeSignals.tsx         # Negative signals
├── TechnicalAnalysis.tsx       # Technical details
├── LoadingInvestigation.tsx    # Loading animation
├── TrustReport.tsx             # Report actions
└── RecentScans.tsx             # Recent websites

lib/
├── api.ts                      # API integration
└── types.ts                    # TypeScript types
```

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Key Features

### Animated Trust Score (0-100)
Color-coded circular meter with smooth animations

### 5-Step Investigation Flow
- Checking website identity
- Verifying security certificates
- Analyzing trust signals
- Scanning fraud indicators
- Generating AI assessment

### Comprehensive Analysis
- Technical details (SSL, domain age, VirusTotal)
- Positive/negative signals
- AI investigation summary
- Payment safety recommendation

## API Integration

Backend endpoint: `http://localhost:8000/scan`

**Request:**
```json
{ "url": "https://example.com" }
```

**Response:**
```json
{
  "trust_score": 72,
  "risk_level": "Medium",
  "payment_recommendation": "Use caution",
  "positive_signals": ["HTTPS Enabled"],
  "negative_signals": ["Recent Domain Registration"]
}
```

## Building for Production

```bash
npm run build
npm start
```

## License

MIT
