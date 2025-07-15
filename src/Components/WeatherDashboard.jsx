import { useState, useEffect, useRef } from 'react'
import WeatherCard from './WeatherCard'
import ForecastSection from './ForecastSection'
import SearchBar from './SearchBar'
import LoadingSpinner from './LoadingSpinner'

const WeatherDashboard = ({ theme }) => {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [location, setLocation] = useState(null)
  const [searchLoading, setSearchLoading] = useState(false)
  const sectionsRef = useRef([])

  // Intersection Observer for smooth animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  // Geolocation API implementation
  useEffect(() => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by this browser.')
        setLoading(false)
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation({ lat: latitude, lon: longitude })
          fetchWeatherData(latitude, longitude)
        },
        (error) => {
          console.error('Geolocation error:', error)
          // Fallback to default location (New York)
          setLocation({ lat: 40.7128, lon: -74.0060 })
          fetchWeatherData(40.7128, -74.0060)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      )
    }

    getLocation()
  }, [])

  const fetchWeatherData = async (lat, lon) => {
    try {
      // REAL API INTEGRATION INSTRUCTIONS:
      // 1. Sign up at https://openweathermap.org/api
      // 2. Get your free API key
      // 3. Replace 'YOUR_API_KEY_HERE' with your actual key
      // 4. Uncomment the real API calls below
      
      const API_KEY = 'YOUR_API_KEY_HERE' // Replace with your OpenWeatherMap API key
      
      // UNCOMMENT THESE LINES FOR REAL API DATA:
      /*
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      )
      
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      )
      
      setWeather(weatherResponse.data)
      setForecast(forecastResponse.data.list.slice(0, 5))
      */
      
      // MOCK DATA (remove when using real API):
      const mockWeatherData = {
        name: lat && lon ? 'Current Location' : 'Demo Location',
        main: {
          temp: Math.floor(Math.random() * 30) + 5,
          feels_like: Math.floor(Math.random() * 30) + 5,
          humidity: Math.floor(Math.random() * 50) + 30,
          pressure: Math.floor(Math.random() * 100) + 1000
        },
        weather: [
          {
            main: ['Clear', 'Clouds', 'Rain', 'Snow'][Math.floor(Math.random() * 4)],
            description: 'scattered clouds',
            icon: '03d'
          }
        ],
        wind: {
          speed: Math.floor(Math.random() * 10) + 1
        },
        visibility: Math.floor(Math.random() * 5000) + 5000
      }

      const mockForecast = Array.from({ length: 5 }, (_, i) => ({
        dt: Date.now() + (i + 1) * 24 * 60 * 60 * 1000,
        main: {
          temp: Math.floor(Math.random() * 25) + 10
        },
        weather: [
          {
            main: ['Clear', 'Clouds', 'Rain'][Math.floor(Math.random() * 3)],
            description: 'partly cloudy'
          }
        ]
      }))

      setWeather(mockWeatherData)
      setForecast(mockForecast)
    } catch (error) {
      setError('Failed to fetch weather data')
    } finally {
      setLoading(false)
    }
  }

  const searchWeatherByCity = async (cityName) => {
    setSearchLoading(true)
    setError(null)
    
    try {
      // REAL API INTEGRATION FOR CITY SEARCH:
      // Uncomment these lines when you have a real API key
      /*
      const API_KEY = 'YOUR_API_KEY_HERE'
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      )
      
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      )
      
      setWeather(response.data)
      setForecast(forecastResponse.data.list.slice(0, 5))
      setLocation({ lat: response.data.coord.lat, lon: response.data.coord.lon })
      */
      
      // MOCK DATA FOR SEARCH (remove when using real API):
      const mockSearchData = {
        name: cityName,
        main: {
          temp: Math.floor(Math.random() * 35) + 0,
          feels_like: Math.floor(Math.random() * 35) + 0,
          humidity: Math.floor(Math.random() * 50) + 30,
          pressure: Math.floor(Math.random() * 100) + 1000
        },
        weather: [
          {
            main: ['Clear', 'Clouds', 'Rain', 'Snow', 'Drizzle'][Math.floor(Math.random() * 5)],
            description: ['sunny', 'partly cloudy', 'light rain', 'snow showers', 'drizzle'][Math.floor(Math.random() * 5)],
            icon: '03d'
          }
        ],
        wind: {
          speed: Math.floor(Math.random() * 15) + 1
        },
        visibility: Math.floor(Math.random() * 5000) + 5000
      }

      const mockSearchForecast = Array.from({ length: 5 }, (_, i) => ({
        dt: Date.now() + (i + 1) * 24 * 60 * 60 * 1000,
        main: {
          temp: Math.floor(Math.random() * 30) + 5
        },
        weather: [
          {
            main: ['Clear', 'Clouds', 'Rain', 'Snow'][Math.floor(Math.random() * 4)],
            description: ['sunny', 'cloudy', 'rainy', 'snowy'][Math.floor(Math.random() * 4)]
          }
        ]
      }))

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setWeather(mockSearchData)
      setForecast(mockSearchForecast)
      
    } catch (error) {
      setError(`Could not find weather data for "${cityName}". Please check the city name and try again.`)
    } finally {
      setSearchLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="weather-dashboard">
      <div className="container">
        <header 
          ref={el => sectionsRef.current[0] = el}
          className="dashboard-header"
        >
          <h1 className="main-title">Weather Dashboard</h1>
          <p className="subtitle">Real-time weather information for your location</p>
        </header>

        <section 
          ref={el => sectionsRef.current[1] = el}
          className="search-section"
        >
          <SearchBar onSearch={searchWeatherByCity} loading={searchLoading} />
        </section>

        {error && (
          <div className="error-message glass">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
            <button 
              className="retry-button"
              onClick={() => {
                setError(null)
                if (location) {
                  fetchWeatherData(location.lat, location.lon)
                }
              }}
            >
              Try Again
            </button>
          </div>
        )}

        <main className="dashboard-content">
          <section 
            ref={el => sectionsRef.current[2] = el}
            className="current-weather-section"
          >
            {weather && <WeatherCard weather={weather} />}
          </section>

          <section 
            ref={el => sectionsRef.current[3] = el}
            className="forecast-section"
          >
            <ForecastSection forecast={forecast} />
          </section>
        </main>
      </div>
    </div>
  )
}

export default WeatherDashboard