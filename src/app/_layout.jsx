import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { router } from "expo-router";
import { getLocationData } from "../utils/storage";

const RootLayout = () => {
  useEffect(() => {
    const loadLocation = async () => {
      const storedLocation = await getLocationData();

      if (storedLocation) {
        router.replace({
          pathname: "/weather",
          params: {
            latitude: storedLocation.latitude,
            longitude: storedLocation.longitude,
          },
        });
      }
    };

    loadLocation();
  }, []);

  return (
    <>
      <StatusBar style="auto" />
      <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="manualLocation" />
        <Stack.Screen name="weather" />
      </Stack>
    </>
  );
};

export default RootLayout;
