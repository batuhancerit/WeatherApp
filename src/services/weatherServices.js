import axios from "axios";

const Weather_Api_Key = process.env.EXPO_PUBLIC_OPEN_WEATHER_API;
export const getCities = async (text) => {
  if (!text || text.trim().length < 3) {
    return [];
  }
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${text}&limit=5&appid=${Weather_Api_Key}`
    );
    return response.data;
  } catch (e) {
    //console.error("Error! getCities", e.message);
    throw new Error(`Error-getCities ${e}`);
  }
};

export const getWeatherForecasts = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${Weather_Api_Key}&units=metric`
    );
    return response.data;
  } catch (e) {
    throw new Error(`Error-getWeatherForecasts${e}`);
  }
};

export const getCurrentWeather = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${Weather_Api_Key}&units=metric`
    );
    return response.data;
  } catch (e) {
    throw new Error(`Error-getCurrentWeather ${e}`);
  }
};
