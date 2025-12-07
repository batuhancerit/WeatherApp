import { Text, useColorScheme, Pressable } from "react-native";
import { Colors } from "../constants/Colors";

const ThemedButton = ({ children, textStyle, onPress, buttonStyle }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          borderRadius: 15,
          padding: 10,
          backgroundColor: theme.button,
          justifyContent: "center",
          alignItems: "center",
        },
        buttonStyle,
      ]}
    >
      <Text
        style={[
          { fontWeight: "bold", fontSize: 30, color: theme.buttonText },
          textStyle,
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
};

export default ThemedButton;
