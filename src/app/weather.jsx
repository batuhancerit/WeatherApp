import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import ThemedView from "../components/ThemedView";
import ErrorMessage from "../components/ErrorMessage";
import ThemedText from "../components/ThemedText";
import useForecasts from "../hooks/useForecasts";
import useWeather from "../hooks/useWeather";
import { getDayName } from "../utils/helper";
import { getLocationData, storeLocationData } from "../utils/storage";
import { useEffect } from "react";

const Weather = () => {
  const params = useLocalSearchParams();
  const lat = params.locationLatitude ?? params.latitude;
  const lon = params.locationLongitude ?? params.longitude;
  const {
    loading: currentWeatherLoading,
    data: currentWeatherData,
    error: currentWeatherError,
  } = useWeather(lat, lon);
  const {
    error: forecastsError,
    loading: forecastsLoading,
    forecastsData,
  } = useForecasts(lat, lon);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  useEffect(() => {
    const loadLocation = async () => {
      const storedLocation = await getLocationData();
      if (!storedLocation) {
        await storeLocationData({ latitude: lat, longitude: lon });
      }
    };
    loadLocation();
  }, [lat, lon]);

  if (forecastsError || currentWeatherError) {
    return <ErrorMessage message={forecastsError || currentWeatherError} />;
  }
  if (forecastsLoading || currentWeatherLoading) {
    return <ActivityIndicator size="large" color="blue" />;
  }
  return (
    <ThemedView>
      <View
        style={[
          styles.currentWeatherView,
          { width: windowWidth, height: windowHeight / 2 },
        ]}
      >
        <ThemedText style={styles.cityName}>
          {currentWeatherData?.name}
        </ThemedText>
        <Image
          source={{
            uri: `https://openweathermap.org/img/wn/${currentWeatherData?.weather?.[0]?.icon}@4x.png`,
          }}
          resizeMode="contain"
          style={{ width: 200, height: 200 }}
        />
        <ThemedText style={{ fontSize: 50, fontWeight: "bold" }}>
          {Math.round(currentWeatherData?.main?.temp)}°C
        </ThemedText>
        <ThemedText style={{ fontSize: 20 }}>
          {currentWeatherData?.weather?.[0]?.description?.toUpperCase()}
        </ThemedText>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {forecastsData?.list
          ?.filter((item) => item.dt_txt.includes("12:00:00"))
          .map((item, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.dailyForecastView,
                  { width: windowWidth / 4, height: windowHeight / 3 },
                ]}
              >
                <ThemedText
                  style={{ borderBottomWidth: 1, fontWeight: "bold" }}
                >
                  {getDayName(item.dt_txt, "en-GB")}
                </ThemedText>
                <ThemedText style={{ fontSize: 20, fontWeight: "bold" }}>
                  {Math.round(item.main.temp)}°C
                </ThemedText>
                <Image
                  source={{
                    uri: `https://openweathermap.org/img/wn/${item?.weather?.[0]?.icon}@4x.png`,
                  }}
                  style={{ width: 100, height: 100 }}
                  resizeMode="contain"
                />
              </View>
            );
          })}
      </ScrollView>
    </ThemedView>
  );
};

export default Weather;

const styles = StyleSheet.create({
  currentWeatherView: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
    padding: 20,
  },
  cityName: { fontSize: 50, fontWeight: "bold" },
  dailyForecastView: {
    justifyContent: "space-around",
    margin: 20,
    alignItems: "center",
    borderRadius: 20,

    backgroundColor: "gray",
  },
});
