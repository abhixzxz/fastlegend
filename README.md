# FastLegend - Typing Speed Test

A modern, high-performance typing speed test application built with Next.js, React, and Tailwind CSS. Test your typing speed, measure accuracy, and track your progress with beautiful animations and detailed analytics.

## Features

✨ **Modern UI with Animations**
- Smooth Framer Motion animations throughout the app
- Beautiful gradient designs with Spotify-inspired black and green color scheme
- Responsive design that works on all devices
- Glassmorphism effects with backdrop blur

⚡ **Typing Test Modes**
- **Time Mode**: Race against the clock (15s, 30s, 60s, 120s)
- **Words Mode**: Type a set number of words (10, 25, 50, 100)
- **Quote Mode**: Type famous quotes
- **Zen Mode**: No timer, just flow

📊 **Comprehensive Statistics**
- Real-time WPM (Words Per Minute) calculation
- Accuracy percentage tracking
- Raw WPM vs adjusted WPM
- Error tracking and consistency metrics
- Detailed character-by-character analysis

📈 **Analytics & Charts**
- WPM over time visualization
- Error distribution charts
- Performance metrics dashboard
- Downloadable results

🎨 **Design System**
- Spotify-inspired color palette (Black #0f0f0f, Green #1db954)
- Smooth transitions and hover effects
- Custom scrollbar styling
- Accessible UI components

🔍 **SEO Optimized**
- Complete metadata and Open Graph tags
- Sitemap and robots.txt
- Web manifest for PWA support
- Twitter Card integration
- Structured data support

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI Library**: React 19.2
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/fastlegend.git
cd fastlegend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Project Structure

\`\`\`
fastlegend/
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Main page with state management
│   ├── globals.css          # Global styles and animations
│   ├── sitemap.ts           # Dynamic sitemap
│   ├── robots.ts            # Robots.txt configuration
│   ├── opengraph-image.tsx  # OG image generation
│   └── twitter-image.tsx    # Twitter card image
├── components/
│   ├── header.tsx           # Header with branding
│   ├── settings.tsx         # Test mode and duration selection
│   ├── typing-test.tsx      # Main typing interface
│   ├── results-screen.tsx   # Results and analytics display
│   └── ui/
│       └── button.tsx       # Button component
├── lib/
│   ├── phrase-generator.ts  # Phrase database and generation
│   ├── stats-calculator.ts  # WPM and accuracy calculations
│   └── utils.ts             # Utility functions
├── public/
│   ├── sitemap.xml          # XML sitemap
│   ├── robots.txt           # Robots configuration
│   └── manifest.json        # PWA manifest
└── package.json             # Dependencies
\`\`\`

## Key Components

### TypingTest Component
Handles the main typing interface with:
- Real-time character validation
- Live statistics display
- Pause/Resume functionality
- Auto-phrase generation

### ResultsScreen Component
Displays comprehensive results with:
- Main statistics cards
- WPM and error charts
- Detailed metrics breakdown
- Share and download options

### Settings Component
Allows users to configure:
- Test mode selection
- Duration/word count
- Visual mode indicators

## Customization

### Modify Phrases
Edit `lib/phrase-generator.ts` to add custom phrases:

\`\`\`typescript
const CUSTOM_PHRASES = [
  "Your custom phrase here",
  "Another phrase to type",
]
\`\`\`

### Change Color Scheme
Update CSS variables in `app/globals.css`:

\`\`\`css
:root {
  --primary: #1db954;      /* Spotify Green */
  --accent: #1ed760;       /* Bright Green */
  --background: #0f0f0f;   /* Dark Black */
}
\`\`\`

### Adjust Animation Timing
Modify animation durations in component files:

\`\`\`tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}  // Change this value
\`\`\`

## Performance Optimizations

- Server-side rendering for SEO
- Image optimization with Next.js Image
- Code splitting and lazy loading
- CSS-in-JS with Tailwind for minimal bundle
- Framer Motion GPU-accelerated animations

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect Next.js and configure the build
4. Your site will be live at `https://fastlegend.vercel.app`

### Environment Variables

No environment variables required for basic functionality.

## SEO Features

- ✅ Meta tags and descriptions
- ✅ Open Graph support
- ✅ Twitter Card integration
- ✅ Sitemap generation
- ✅ Robots.txt configuration
- ✅ Structured data ready
- ✅ Mobile-friendly design
- ✅ Fast Core Web Vitals

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

## Roadmap

- [ ] User authentication and profiles
- [ ] Leaderboard system
- [ ] Custom theme support
- [ ] Multiplayer typing races
- [ ] Advanced statistics and history
- [ ] Mobile app version
- [ ] Dark/Light mode toggle
- [ ] Keyboard shortcuts guide

## Credits

Inspired by MonkeyType and other typing speed test applications.

---

**FastLegend** - Test Your Speed ⚡
