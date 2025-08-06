import { render, screen } from "@testing-library/react"
import { WeatherCard } from "@/widgets/weather-card"
import type { WeatherData } from "@/shared/api/weather"

const mockWeatherData: WeatherData = {
  id: 1,
  name: "London",
  country: "GB",
  coord: { lat: 51.5074, lon: -0.1278 },
  weather: [
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01d",
    },
  ],
  main: {
    temp: 20,
    feels_like: 18,
    temp_min: 15,
    temp_max: 25,
    pressure: 1013,
    humidity: 65,
  },
  wind: {
    speed: 3.5,
    deg: 180,
  },
  visibility: 10000,
  dt: 1640995200,
  sys: {
    country: "GB",
    sunrise: 1640937600,
    sunset: 1640970000,
  },
}

describe("WeatherCard", () => {
  it("renders weather information correctly", () => {
    render(<WeatherCard weather={mockWeatherData} />)

    expect(screen.getByText("London, GB")).toBeInTheDocument()
    expect(screen.getByText("20°C")).toBeInTheDocument()
    expect(screen.getByText("clear sky")).toBeInTheDocument()
    expect(screen.getByText("Feels like 18°C")).toBeInTheDocument()
    expect(screen.getByText("65%")).toBeInTheDocument()
    expect(screen.getByText("3.5 m/s")).toBeInTheDocument()
  })

  it("displays temperature range", () => {
    render(<WeatherCard weather={mockWeatherData} />)

    expect(screen.getByText("15°C/25°C")).toBeInTheDocument()
  })

  it("shows weather icon with correct alt text", () => {
    render(<WeatherCard weather={mockWeatherData} />)

    const weatherIcon = screen.getByAltText("clear sky")
    expect(weatherIcon).toBeInTheDocument()
    expect(weatherIcon).toHaveAttribute("src", expect.stringContaining("01d"))
  })
})
