import { Text, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

const ThemedText = ({ children, style }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  return <Text style={[style, { color: theme.text }]}>{children}</Text>;
};

export default ThemedText;
