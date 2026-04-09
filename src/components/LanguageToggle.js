import { Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/appStyles";

export default function LanguageToggle({ lang, onChange }) {
  return (
    <View style={styles.langRow}>
      {["de", "en", "he"].map((item) => (
        <TouchableOpacity
          key={item}
          style={[styles.langChip, lang === item && styles.langChipActive]}
          onPress={() => onChange(item)}
        >
          <Text
            style={[styles.langChipText, lang === item && styles.langChipTextActive]}
          >
            {item.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
