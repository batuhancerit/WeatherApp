import React, { useState, useEffect } from "react";
import { getCurrentWeather } from "../services/weatherServices";

const useWeather = (lat, lon) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const fetchCurrentWeather = async () => {
    setLoading(true);
    try {
      const response = await getCurrentWeather(lat, lon);
      setData(response);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentWeather();
  }, []);

  return { loading, error, data };
};

export default useWeather;
