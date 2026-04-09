import { Text, TouchableOpacity } from "react-native";
import styles from "../styles/appStyles";

export default function PrimaryButton({ title, onPress, secondary = false, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[secondary ? styles.secondaryButton : styles.primaryButton, style]}
    >
      <Text style={secondary ? styles.secondaryButtonText : styles.primaryButtonText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
