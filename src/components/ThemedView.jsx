import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { Colors } from "../constants/Colors";

const ThemedView = ({ style, children }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <SafeAreaView
      style={[style, { flex:1,backgroundColor: theme.background }]}
    >
      {children}
    </SafeAreaView>
  );
};

export default ThemedView;

const styles = StyleSheet.create({});
