import { View } from "react-native";
import styles from "../styles/appStyles";

export default function SectionCard({ children, dark = false, style }) {
  return (
    <View style={[dark ? styles.cardDark : styles.cardLight, style]}>
      {children}
    </View>
  );
}
