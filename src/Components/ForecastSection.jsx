const ForecastSection = ({ forecast }) => {
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  const getWeatherIcon = (condition) => {
    const icons = {
      Clear: '☀️',
      Clouds: '☁️',
      Rain: '🌧️',
      Snow: '❄️'
    }
    return icons[condition] || '🌤️'
  }

  return (
    <div className="forecast-section">
      <h3 className="section-title">5-Day Forecast</h3>
      <div className="forecast-grid">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-item glass">
            <div className="forecast-date">{formatDate(day.dt)}</div>
            <div className="forecast-icon animate-pulse">
              {getWeatherIcon(day.weather[0].main)}
            </div>
            <div className="forecast-temp">{Math.round(day.main.temp)}°C</div>
            <div className="forecast-desc">{day.weather[0].description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ForecastSection