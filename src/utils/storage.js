import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeLocationData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("location-key", jsonValue);
  } catch (e) {
    console.error(`Error location data could not be saved : ${e}`);
  }
};

export const getLocationData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("location-key");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(`Error location data cannot be read : ${e}`);
  }
};
