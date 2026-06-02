# 🌤️ Weather App

A modern, responsive weather application built with **React** and **Vite**. Search for any city and get real-time weather information with a beautiful 5-day forecast.

## ✨ Features

- **City Search**: Search for any city worldwide
- **Current Weather**: Display temperature, weather conditions, and "feels like" temperature
- **Weather Details**: Humidity, wind speed, pressure, visibility, and UV index
- **5-Day Forecast**: Beautiful forecast strip showing daily highs/lows and rain probability
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Weather Emojis**: Visual weather indicators with intuitive emoji icons
- **Real-time Updates**: Powered by WeatherAPI.com

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project folder
2. Install dependencies:

```bash
npm install
```

### Configuration

The app uses **WeatherAPI.com** free API. The API key is already configured in `App.jsx`:

```javascript
const API_KEY = 'e3dca4ceb37846ca942163642241905'
```

> You can sign up for a free account at [WeatherAPI.com](https://www.weatherapi.com/) to get your own API key.

### Running the App

Start the development server:

```bash
npm run dev
```

The app will open at `http://localhost:5173` (or another port if 5173 is in use).

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## 📁 Project Structure

```
weather/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx          # City search input component
│   │   ├── WeatherCard.jsx        # Main weather display card
│   │   └── ForecastStrip.jsx      # 5-day forecast component
│   ├── styles/
│   │   ├── SearchBar.css          # Search bar styling
│   │   ├── WeatherCard.css        # Weather card styling
│   │   └── ForecastStrip.css      # Forecast strip styling
│   ├── App.jsx                    # Main app component
│   ├── App.css                    # App-wide styling
│   ├── index.css                  # Global styles
│   └── main.jsx                   # React entry point
├── index.html                     # HTML template
├── vite.config.js                 # Vite configuration
└── package.json                   # Dependencies & scripts
```

## 🎨 Design Highlights

- **Beautiful Gradient Background**: Dark blue gradient for a modern look
- **Polished Cards**: Smooth shadows and hover effects
- **Smooth Animations**: Subtle transitions and hover states
- **Mobile Optimized**: Fully responsive design with media queries
- **Accessible**: Semantic HTML and proper contrast ratios

## 🌐 API Integration

The app fetches data from **WeatherAPI.com** with two endpoints:

1. **Current Weather**: `current.json` - Temperature, conditions, humidity, wind
2. **Forecast Data**: `forecast.json` - 5-day weather forecast

## 🛠️ Technologies Used

- **React 19.2** - UI library
- **Vite 8.0** - Build tool & dev server
- **CSS3** - Styling with modern features
- **WeatherAPI.com** - Weather data provider

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

This project is open source and available under the MIT License.

## 💡 Future Enhancements

- Save favorite cities
- Dark mode toggle
- Historical weather data
- Weather alerts
- Geolocation support
- Multiple unit systems (Celsius/Fahrenheit/Kelvin)

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
