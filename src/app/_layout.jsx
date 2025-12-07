import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const RootLayout = () => {
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
