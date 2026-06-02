import React from 'react'
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  CloudFog,
} from 'lucide-react'

export const weatherIconMap = {
  // Clear
  0: { icon: Sun, type: 'clear', label: 'Clear Sky' },
  // Partly Cloudy
  1: { icon: Sun, type: 'partly-cloudy', label: 'Mainly Clear' },
  2: { icon: Sun, type: 'partly-cloudy', label: 'Partly Cloudy' },
  // Cloudy
  3: { icon: Cloud, type: 'cloudy', label: 'Overcast' },
  // Foggy
  45: { icon: CloudFog, type: 'foggy', label: 'Foggy' },
  48: { icon: CloudFog, type: 'foggy', label: 'Depositing Rime Fog' },
  // Drizzle
  51: { icon: CloudDrizzle, type: 'drizzle', label: 'Light Drizzle' },
  53: { icon: CloudDrizzle, type: 'drizzle', label: 'Moderate Drizzle' },
  55: { icon: CloudDrizzle, type: 'drizzle', label: 'Dense Drizzle' },
  // Rain
  61: { icon: CloudRain, type: 'rainy', label: 'Slight Rain' },
  63: { icon: CloudRain, type: 'rainy', label: 'Moderate Rain' },
  65: { icon: CloudRain, type: 'rainy', label: 'Heavy Rain' },
  80: { icon: CloudRain, type: 'rainy', label: 'Slight Rain Showers' },
  81: { icon: CloudRain, type: 'rainy', label: 'Moderate Rain Showers' },
  82: { icon: CloudRain, type: 'rainy', label: 'Violent Rain Showers' },
  // Snow
  71: { icon: CloudSnow, type: 'snowy', label: 'Slight Snow' },
  73: { icon: CloudSnow, type: 'snowy', label: 'Moderate Snow' },
  75: { icon: CloudSnow, type: 'snowy', label: 'Heavy Snow' },
  77: { icon: CloudSnow, type: 'snowy', label: 'Snow Grains' },
  85: { icon: CloudSnow, type: 'snowy', label: 'Slight Snow Showers' },
  86: { icon: CloudSnow, type: 'snowy', label: 'Heavy Snow Showers' },
  // Thunderstorm
  95: { icon: CloudLightning, type: 'stormy', label: 'Thunderstorm' },
  96: { icon: CloudLightning, type: 'stormy', label: 'Thunderstorm with Hail' },
  99: { icon: CloudLightning, type: 'stormy', label: 'Thunderstorm with Hail' },
}

function WeatherIcon({ code, size = 64, animated = true, className = '' }) {
  const mapping = weatherIconMap[code] || { icon: Cloud, type: 'cloudy', label: 'Unknown' }
  const IconComponent = mapping.icon
  const type = mapping.type

  // Return custom beautiful SVG animated setups for high-level quality UI
  if (type === 'clear') {
    return (
      <div className={`weather-icon-wrapper clear-sky ${className}`} style={{ width: size, height: size }}>
        <svg viewBox="0 0 24 24" className={`svg-icon ${animated ? 'animate-sun' : ''}`}>
          <defs>
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF9E6" stopOpacity="1" />
              <stop offset="30%" stopColor="#FFD54F" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#FF8F00" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FF6F00" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF176" />
              <stop offset="100%" stopColor="#E65100" />
            </linearGradient>
          </defs>
          {animated && <circle cx="12" cy="12" r="10" fill="url(#sunGlow)" className="sun-halo" />}
          <circle cx="12" cy="12" r="5" fill="url(#sunGrad)" />
          {/* Ray paths for high-quality representation */}
          <g stroke="url(#sunGrad)" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="18.36" y1="4.22" x2="19.78" y2="5.64" />
            <line x1="4.22" y1="18.36" x2="5.64" y2="19.78" />
          </g>
        </svg>
      </div>
    )
  }

  if (type === 'partly-cloudy') {
    return (
      <div className={`weather-icon-wrapper partly-cloudy ${className}`} style={{ width: size, height: size }}>
        <svg viewBox="0 0 24 24" className="svg-icon">
          <defs>
            <linearGradient id="sunGradPC" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE082" />
              <stop offset="100%" stopColor="#FF8F00" />
            </linearGradient>
            <linearGradient id="cloudGradPC" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#CFD8DC" />
            </linearGradient>
            <filter id="cloudShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodOpacity="0.15" />
            </filter>
          </defs>
          {/* Peeking Sun */}
          <g className={animated ? 'animate-sun-peek' : ''} transform="translate(-1, -1)">
            <circle cx="16" cy="8" r="4" fill="url(#sunGradPC)" />
            <g stroke="url(#sunGradPC)" strokeWidth="1.5" strokeLinecap="round">
              <line x1="16" y1="2" x2="16" y2="3.5" />
              <line x1="16" y1="12.5" x2="16" y2="14" />
              <line x1="10" y1="8" x2="11.5" y2="8" />
              <line x1="20.5" y1="8" x2="22" y2="8" />
              <line x1="11.76" y1="3.76" x2="12.82" y2="4.82" />
              <line x1="19.18" y1="11.18" x2="20.24" y2="12.24" />
              <line x1="19.18" y1="3.76" x2="20.24" y2="4.82" />
              <line x1="11.76" y1="11.18" x2="12.82" y2="12.24" />
            </g>
          </g>
          {/* Cloud Cover */}
          <path
            d="M5.5 17A3.5 3.5 0 0 1 2 13.5A3.5 3.5 0 0 1 5.5 10c.34 0 .67.04.99.11A4.5 4.5 0 0 1 15 11.5a3.5 3.5 0 0 1-1.5 6.8c-.33 0-.67-.04-.99-.12A4.5 4.5 0 0 1 5.5 17z"
            fill="url(#cloudGradPC)"
            filter="url(#cloudShadow)"
            className={animated ? 'animate-cloud-drift' : ''}
          />
        </svg>
      </div>
    )
  }

  if (type === 'cloudy') {
    return (
      <div className={`weather-icon-wrapper cloudy ${className}`} style={{ width: size, height: size }}>
        <svg viewBox="0 0 24 24" className="svg-icon">
          <defs>
            <linearGradient id="cloudFront" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#CFD8DC" />
            </linearGradient>
            <linearGradient id="cloudBack" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ECEFF1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#90A4AE" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          {/* Back Cloud */}
          <path
            d="M17 19a4 4 0 0 0 4-4a4 4 0 0 0-4-4c-.38 0-.74.05-1.1.13A5.5 5.5 0 0 0 6.5 12A4.5 4.5 0 0 0 8 20.8h9z"
            fill="url(#cloudBack)"
            className={animated ? 'animate-cloud-drift-slow' : ''}
          />
          {/* Front Cloud */}
          <path
            d="M6.5 18A4.5 4.5 0 0 1 2 13.5A4.5 4.5 0 0 1 6.5 9c.43 0 .86.05 1.27.14A6 6 0 0 1 19 11A4.5 4.5 0 0 1 17.5 20H6.5z"
            fill="url(#cloudFront)"
            className={animated ? 'animate-cloud-drift' : ''}
          />
        </svg>
      </div>
    )
  }

  if (type === 'rainy' || type === 'drizzle') {
    const dropColor = type === 'rainy' ? '#29B6F6' : '#80DEEA'
    return (
      <div className={`weather-icon-wrapper rainy ${className}`} style={{ width: size, height: size }}>
        <svg viewBox="0 0 24 24" className="svg-icon">
          <defs>
            <linearGradient id="rainCloud" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#B0BEC5" />
              <stop offset="100%" stopColor="#546E7A" />
            </linearGradient>
          </defs>
          <path
            d="M6.5 16A4.5 4.5 0 0 1 2 11.5A4.5 4.5 0 0 1 6.5 7c.43 0 .86.05 1.27.14A6 6 0 0 1 19 9a4.5 4.5 0 0 1-1.5 8.8H6.5z"
            fill="url(#rainCloud)"
          />
          {/* Drops */}
          <g stroke={dropColor} strokeWidth="1.8" strokeLinecap="round" className={animated ? 'animate-rain-drops' : ''}>
            <line x1="7" y1="16" x2="5" y2="20" className="rain-drop-1" />
            <line x1="11" y1="17" x2="9" y2="21" className="rain-drop-2" />
            <line x1="15" y1="16" x2="13" y2="20" className="rain-drop-3" />
          </g>
        </svg>
      </div>
    )
  }

  if (type === 'snowy') {
    return (
      <div className={`weather-icon-wrapper snowy ${className}`} style={{ width: size, height: size }}>
        <svg viewBox="0 0 24 24" className="svg-icon">
          <defs>
            <linearGradient id="snowCloud" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E0F7FA" />
              <stop offset="100%" stopColor="#B2EBF2" />
            </linearGradient>
          </defs>
          <path
            d="M6.5 16A4.5 4.5 0 0 1 2 11.5A4.5 4.5 0 0 1 6.5 7c.43 0 .86.05 1.27.14A6 6 0 0 1 19 9a4.5 4.5 0 0 1-1.5 8.8H6.5z"
            fill="url(#snowCloud)"
          />
          {/* Snowflake elements */}
          <g fill="#E0F7FA" stroke="#80DEEA" strokeWidth="0.5" className={animated ? 'animate-snow-flakes' : ''}>
            {/* Snowflake 1 */}
            <g transform="translate(6, 17)" className="snow-flake-1">
              <line x1="0" y1="-2" x2="0" y2="2" strokeWidth="1" strokeLinecap="round"/>
              <line x1="-2" y1="0" x2="2" y2="0" strokeWidth="1" strokeLinecap="round"/>
            </g>
            {/* Snowflake 2 */}
            <g transform="translate(11, 18)" className="snow-flake-2">
              <line x1="-1.5" y1="-1.5" x2="1.5" y2="1.5" strokeWidth="1" strokeLinecap="round"/>
              <line x1="1.5" y1="-1.5" x2="-1.5" y2="1.5" strokeWidth="1" strokeLinecap="round"/>
            </g>
            {/* Snowflake 3 */}
            <g transform="translate(15, 17)" className="snow-flake-3">
              <line x1="0" y1="-2" x2="0" y2="2" strokeWidth="1" strokeLinecap="round"/>
              <line x1="-2" y1="0" x2="2" y2="0" strokeWidth="1" strokeLinecap="round"/>
            </g>
          </g>
        </svg>
      </div>
    )
  }

  if (type === 'stormy') {
    return (
      <div className={`weather-icon-wrapper stormy ${className}`} style={{ width: size, height: size }}>
        <svg viewBox="0 0 24 24" className="svg-icon">
          <defs>
            <linearGradient id="stormCloud" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#455A64" />
              <stop offset="100%" stopColor="#212121" />
            </linearGradient>
            <linearGradient id="lightningGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFEB3B" />
              <stop offset="100%" stopColor="#FF9800" />
            </linearGradient>
            <filter id="lightningGlow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path
            d="M6.5 15A4.5 4.5 0 0 1 2 10.5A4.5 4.5 0 0 1 6.5 6c.43 0 .86.05 1.27.14A6 6 0 0 1 19 8a4.5 4.5 0 0 1-1.5 8.8H6.5z"
            fill="url(#stormCloud)"
          />
          {/* Lightning bolt */}
          <path
            d="M13 14h-3.5l2-5.5h3.5l-2 5.5z"
            fill="url(#lightningGrad)"
            filter="url(#lightningGlow)"
            className={animated ? 'animate-lightning' : ''}
            transform="translate(0, 3)"
          />
        </svg>
      </div>
    )
  }

  if (type === 'foggy') {
    return (
      <div className={`weather-icon-wrapper foggy ${className}`} style={{ width: size, height: size }}>
        <svg viewBox="0 0 24 24" className="svg-icon">
          <defs>
            <linearGradient id="fogCloud" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ECEFF1" />
              <stop offset="100%" stopColor="#B0BEC5" />
            </linearGradient>
          </defs>
          <path
            d="M6.5 15A4.5 4.5 0 0 1 2 10.5A4.5 4.5 0 0 1 6.5 6c.43 0 .86.05 1.27.14A6 6 0 0 1 19 8a4.5 4.5 0 0 1-1.5 8.8H6.5z"
            fill="url(#fogCloud)"
            className={animated ? 'animate-cloud-drift' : ''}
          />
          {/* Fog lines */}
          <g stroke="#B0BEC5" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" className={animated ? 'animate-fog-lines' : ''}>
            <line x1="4" y1="16" x2="17" y2="16" className="fog-line-1" />
            <line x1="6" y1="19" x2="20" y2="19" className="fog-line-2" />
          </g>
        </svg>
      </div>
    )
  }

  // Fallback
  return <IconComponent size={size} className={className} />
}

export default WeatherIcon
