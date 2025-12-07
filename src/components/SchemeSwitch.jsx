import { View, useColorScheme, Switch, Appearance } from "react-native";
import React from "react";

const SchemeSwitch = () => {
  const colorScheme = useColorScheme();
  return (
    <View style={{ position: "absolute", right: 50, top: 50 }}>
      <Switch
        thumbColor={colorScheme === "dark" ? "black" : "white"}
        value={colorScheme === "dark"}
        onChange={() => {
          Appearance.setColorScheme(colorScheme === "dark" ? "light" : "dark");
        }}
      />
    </View>
  );
};

export default SchemeSwitch;
