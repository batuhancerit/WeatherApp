import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import ThemedView from "../components/ThemedView";
import { Colors } from "../constants/Colors";
import { getCities } from "../services/weatherServices";
import { router } from "expo-router";
const ManualLocation = () => {
  const colorScheme = useColorScheme();
  const [error, setError] = useState(null);
  const theme = Colors[colorScheme] ?? Colors.light;
  const [cities, setCities] = useState([]);

  const handleSearch = async (text) => {
    try {
      const searchedCities = await getCities(text);
      setCities(searchedCities);
      setError(null);
    } catch (e) {
      console.log("Error-HandleSearch", e.message);
      setError(e.message);
    }
  };

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <ThemedView>
      <View style={[styles.innerView, { borderColor: theme.text }]}>
        <Text style={{ fontSize: 20 }}>🔍</Text>
        <TextInput
          onChangeText={handleSearch}
          placeholder="Enter your location..."
          placeholderTextColor={theme.text}
          cursorColor={theme.text}
          style={{ flex: 1, color: theme.text }}
        />
      </View>

      {cities.map((city, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{ margin: 15 }}
            onPress={() => {
              router.replace({
                pathname: "weather",
                params: {
                  locationLongitude: city.lon,
                  locationLatitude: city.lat,
                },
              });
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "500", color: theme.text }}
            >
              📍 {city.name}, {city.country}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ThemedView>
  );
};

export default ManualLocation;

const styles = StyleSheet.create({
  innerView: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 20,
    borderBottomWidth: 2,
  },
});
