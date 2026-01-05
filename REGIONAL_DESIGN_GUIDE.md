# Tengcle Group - Regional Design Guide

## Overview

This document explains the design differences between each regional website and the reasoning behind them. All sites share the same base design (Plan A: Deep Purple & Champagne Gold) but have subtle variations to match local web culture and user expectations.

---

## Base Design: Plan A (Deep Purple & Champagne Gold)

| Element | Value | Reasoning |
|---------|-------|-----------|
| Primary Color | Deep Purple (#2d1b4e) | Sophistication, luxury, trust |
| Accent Color | Champagne Gold (#c9a962) | Premium feel, prosperity |
| Background | Off-white (#faf9f7) | Clean, professional |
| Typography | Playfair Display (headings), Cormorant Garamond (body) | Elegant, classic |

---

## Hong Kong (香港) - Tengcle Limited

### Design Philosophy
- **International Finance Hub**: Sophisticated, trustworthy, premium
- **East-West Blend**: Balances Chinese cultural elements with Western business aesthetics
- **Prosperity Symbolism**: Warmer gold tones (important in Chinese culture)

### Color Variations
| Element | Value | Difference from Base |
|---------|-------|---------------------|
| Primary | oklch(0.25 0.10 295) | Slightly warmer purple |
| Accent | oklch(0.72 0.13 82) | Warmer gold (prosperity) |

### Layout & Features
- **Hero Image**: Hong Kong Victoria Harbour skyline
- **Trust Indicators**: TCSP License prominently displayed
- **Services**: B2B focused (Asset Management, Hotel Procurement)
- **Languages**: English (default), Japanese, Chinese

### Why These Differences?
1. **Warmer Gold**: In Chinese culture, gold symbolizes wealth and prosperity. A warmer gold tone resonates better with Chinese and international clients.
2. **License Display**: Hong Kong's regulated financial environment requires clear compliance indicators.
3. **B2B Focus**: Hong Kong serves as the group's headquarters for international business operations.

---

## Japan (日本) - Tengcle Inc.

### Design Philosophy
- **Refined Minimalism**: Subtle, attention to detail (wabi-sabi aesthetics)
- **Whitespace (間 - Ma)**: Generous spacing for visual breathing room
- **Omotenashi Spirit**: Hospitality-focused, detailed information

### Color Variations
| Element | Value | Difference from Base |
|---------|-------|---------------------|
| Primary | oklch(0.28 0.08 300) | Softer, more muted purple |
| Accent | oklch(0.70 0.10 85) | More subtle gold |

### Layout & Features
- **Hero Image**: Tokyo business district
- **Typography**: Noto Serif JP (明朝体) for Japanese text
- **Services**: B2C focused (Real Estate, F&B, Gym, Capsule Hotel, Recruitment)
- **Careers Page**: Detailed job listings (Japanese job seekers expect comprehensive information)
- **Languages**: Japanese (default), English, Chinese

### Why These Differences?
1. **Muted Colors**: Japanese design aesthetics favor subtlety over boldness. Softer colors create a more refined impression.
2. **Detailed Information**: Japanese consumers expect thorough information before making decisions.
3. **Careers Section**: Japanese job market culture requires detailed job descriptions, benefits, and company information.
4. **Serif Typography**: Mincho (明朝体) fonts convey tradition and trustworthiness in Japanese business contexts.

---

## United States (アメリカ) - Tengcle Development LLC

### Design Philosophy
- **Bold & Direct**: Confident, action-oriented communication
- **High Contrast**: Clear visual hierarchy for quick scanning
- **Modern Professional**: Clean, contemporary business aesthetic

### Color Variations
| Element | Value | Difference from Base |
|---------|-------|---------------------|
| Primary | oklch(0.22 0.12 290) | Richer, more saturated purple |
| Accent | oklch(0.74 0.14 85) | Brighter, bolder gold |

### Layout & Features
- **Hero Image**: New York City skyline (lighter overlay for visibility)
- **Typography**: Sans-serif friendly, clear hierarchy
- **Services**: Property Management, Vacation Rentals (Airbnb/VRBO)
- **CTA Buttons**: Larger, more prominent call-to-action buttons
- **Languages**: English (default), Japanese, Chinese

### Why These Differences?
1. **Higher Saturation**: American web design tends toward bolder, more confident colors.
2. **Direct Communication**: US users prefer clear, concise messaging with obvious next steps.
3. **Prominent CTAs**: American users expect clear calls-to-action and easy navigation.
4. **Lighter Hero Overlay**: American design favors showing more of the background imagery.

---

## Global Gateway (グローバルゲートウェイ)

### Design Philosophy
- **Neutral Entry Point**: Doesn't favor any specific region
- **Cultural Symbolism**: Auspicious patterns (青海波 - Seigaiha waves)
- **Premium First Impression**: Sets the tone for the entire brand

### Features
- **Background**: Deep purple with gold Seigaiha wave pattern
- **Region Selection**: Equal visual weight for all three regions
- **Multi-language**: Instructions in English, Japanese, and Chinese

### Why This Design?
1. **Seigaiha Pattern**: Traditional Japanese wave pattern symbolizing good fortune and peaceful seas - appropriate for a company with Asian roots.
2. **Equal Presentation**: All regions displayed equally to avoid hierarchy implications.
3. **Tri-lingual Instructions**: Ensures all visitors can navigate regardless of language.

---

## Summary: Key Differences by Region

| Aspect | Hong Kong | Japan | USA |
|--------|-----------|-------|-----|
| **Color Intensity** | Balanced | Muted/Subtle | Bold/Saturated |
| **Gold Tone** | Warm (prosperity) | Subtle (elegance) | Bright (confidence) |
| **Layout** | Professional B2B | Detailed, spacious | Direct, action-focused |
| **Typography** | Classic serif | Mincho (明朝体) | Clear hierarchy |
| **Hero Overlay** | Medium | Medium | Light |
| **CTA Style** | Professional | Refined | Prominent |
| **Information Density** | Moderate | High | Moderate |
| **Default Language** | English | Japanese | English |

---

## Implementation Notes

### CSS Custom Properties
Each region uses `data-region` attribute to apply regional color variations:
- `data-region="hk"` - Hong Kong styles
- `data-region="jp"` - Japan styles
- `data-region="us"` - USA styles

### Font Loading
- English: Playfair Display, Cormorant Garamond, Libre Baskerville
- Japanese: Noto Serif JP
- Chinese: Noto Serif SC

### Responsive Design
All regional variations maintain consistent responsive breakpoints and mobile-first approach.
