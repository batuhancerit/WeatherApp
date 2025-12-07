import { Text, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

const ThemedTitle = ({ children, style, titleType }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  return (
    <Text
      style={[
        style,
        { color: titleType == "title" ? theme.title : theme.subTitle },
      ]}
    >
      {children}
    </Text>
  );
};

export default ThemedTitle;
