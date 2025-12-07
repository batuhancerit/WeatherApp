import React, { useState, useEffect } from "react";
import { getWeatherForecasts } from "../services/weatherServices";

const useForecasts = (lat, lon) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [forecastsData, setForecastsData] = useState([]);

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const response = await getWeatherForecasts(lat, lon);
      setForecastsData(response);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return { loading, error, forecastsData };
};

export default useForecasts;
