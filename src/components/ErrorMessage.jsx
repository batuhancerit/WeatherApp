import { View, Text, StyleSheet, useColorScheme } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

const ErrorMessage = ({ message }) => {
  const scheme = useColorScheme();
  const theme = Colors[scheme] ?? Colors.light;
  return (
    <View style={[styles.errorView, { backgroundColor: theme.background }]}>
      <Text style={[styles.errorText, { color: theme.text }]}>Error !</Text>
      <Text style={[styles.errorText, { color: theme.text }]}>{message}</Text>
    </View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  errorView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: { fontSize: 40, fontWeight: "bold", color: "red" },
});
