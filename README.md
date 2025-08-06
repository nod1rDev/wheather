# Weather Forecast App

Modern, responsive weather forecast application built with React, Next.js, and OpenWeatherMap API. Features 7-day forecasts, location detection, theme switching, and accessibility support.

## 🌟 Features

- **Current Weather**: Real-time weather data with location detection
- **7-Day Forecast**: Extended weather predictions with detailed information
- **City Search**: Search weather for any city worldwide
- **Theme Support**: Light, dark, and system theme modes
- **Responsive Design**: Optimized for mobile and desktop devices
- **Accessibility**: Full keyboard navigation and screen reader support
- **Offline Storage**: Settings saved locally using localStorage
- **Smooth Animations**: Powered by Framer Motion

## 🛠️ Technologies

- **Frontend**: React 19, Next.js 15, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: TanStack Query for server state
- **Animations**: Framer Motion
- **API**: OpenWeatherMap API
- **Testing**: Vitest, React Testing Library
- **Architecture**: Feature-Sliced Design (FSD)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenWeatherMap API key

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/weather-forecast-app.git
cd weather-forecast-app
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create environment file:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Add your OpenWeatherMap API key to \`.env.local\`:
\`\`\`
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
\`\`\`

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Getting API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key
4. Add it to your environment variables

## 🏗️ Project Structure

The project follows Feature-Sliced Design (FSD) architecture:

\`\`\`
src/
├── app/                 # App initialization, providers, routing
├── pages/              # Route components
│   ├── main/           # Home page
│   ├── forecast/       # 7-day forecast page
│   └── settings/       # Settings page
├── widgets/            # Complex UI blocks
│   ├── navigation/     # Navigation component
│   └── weather-card/   # Weather display card
├── features/           # User interactions
│   ├── city-search/    # City search functionality
│   └── theme-switcher/ # Theme switching
├── entities/           # Business entities
├── shared/             # Reusable code
│   ├── api/           # API integration
│   ├── hooks/         # Custom hooks
│   ├── lib/           # Utilities
│   └── ui/            # Base UI components
└── test/              # Test files
\`\`\`

## 🧪 Testing

Run tests:
\`\`\`bash
npm run test
\`\`\`

Run tests with UI:
\`\`\`bash
npm run test:ui
\`\`\`

## 📱 Features Overview

### Main Page
- Automatic location detection
- Current weather display
- City search functionality
- Responsive weather card

### Forecast Page
- 7-day weather forecast
- Daily temperature ranges
- Weather conditions and icons
- Smooth animations

### Settings Page
- Theme switcher (Light/Dark/System)
- Default city configuration
- Local storage persistence

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- High contrast support

## 🎨 Design System

- Primary color: \`#0EA5E9\` (Sky Blue)
- Responsive breakpoints
- Consistent spacing and typography
- Dark mode support
- Smooth transitions and animations

## 📦 Build & Deployment

Build for production:
\`\`\`bash
npm run build
\`\`\`

Start production server:
\`\`\`bash
npm start
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

- Phone: +998 77 100-40-84
- Telegram: @nodir_dev

## 🙏 Acknowledgments

- OpenWeatherMap for weather data API
- Vercel for hosting platform
- shadcn/ui for component library
- Framer Motion for animations
\`\`\`
