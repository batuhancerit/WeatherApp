import { StyleSheet, Image } from "react-native";
import ThemedView from "../components/ThemedView";
import ThemedText from "../components/ThemedText";
import ThemedTitle from "../components/ThemedTitle";
import ThemedButton from "../components/ThemedButton";
import * as Location from "expo-location";
import { router } from "expo-router";
import SchemeSwitch from "../components/SchemeSwitch";

const index = () => {
  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("PERMISSION STATUS:", status);
      if (status !== "granted") {
        return null;
      }

      let location = await Location.getCurrentPositionAsync();
      return location;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleNavigation = async () => {
    const location = await getCurrentLocation();
    if (location) {
      router.replace({
        pathname: "/weather",
        params: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });
    } else {
      router.replace("manualLocation");
    }
  };
  return (
    <ThemedView style={styles.container}>
      <SchemeSwitch />
      <Image
        source={require("../../assets/weatherIcon.png")}
        resizeMode="contain"
        style={{ width: 250, height: 250 }}
      />
      <ThemedTitle titleType="title" style={styles.title}>
        Wheather App
      </ThemedTitle>
      <ThemedText style={styles.text}>
        For weather information based on your location, please click the button
        below and allow location access.
      </ThemedText>

      <ThemedButton buttonStyle={{ width: "70%" }} onPress={handleNavigation}>
        Continue
      </ThemedButton>
    </ThemedView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "900",
  },
  text: {
    fontSize: 15,
  },
});
