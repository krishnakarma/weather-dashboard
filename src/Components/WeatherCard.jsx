import { useEffect, useRef } from 'react'

const WeatherCard = ({ weather }) => {
  const cardRef = useRef()

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.animation = 'fadeInUp 0.8s ease-out'
    }
  }, [weather])

  const getWeatherIcon = (condition) => {
    const icons = {
      Clear: '☀️',
      Clouds: '☁️',
      Rain: '🌧️',
      Snow: '❄️',
      Drizzle: '🌦️',
      Thunderstorm: '⛈️',
      Mist: '🌫️'
    }
    return icons[condition] || '🌤️'
  }

  if (!weather) return null

  return (
    <div ref={cardRef} className="weather-card glass">
      <div className="weather-main">
        <div className="weather-icon animate-float">
          {getWeatherIcon(weather.weather[0].main)}
        </div>
        <div className="weather-info">
          <h2 className="location">{weather.name}</h2>
          <div className="temperature">{Math.round(weather.main.temp)}°C</div>
          <div className="description">{weather.weather[0].description}</div>
        </div>
      </div>
      
      <div className="weather-details">
        <div className="detail-item">
          <span className="label">Feels like</span>
          <span className="value">{Math.round(weather.main.feels_like)}°C</span>
        </div>
        <div className="detail-item">
          <span className="label">Humidity</span>
          <span className="value">{weather.main.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="label">Wind Speed</span>
          <span className="value">{weather.wind.speed} m/s</span>
        </div>
        <div className="detail-item">
          <span className="label">Pressure</span>
          <span className="value">{weather.main.pressure} hPa</span>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard