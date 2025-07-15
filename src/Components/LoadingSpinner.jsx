const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner glass">
        <div className="spinner-icon">🌀</div>
        <p>Getting your location and weather data...</p>
      </div>
    </div>
  )
}

export default LoadingSpinner