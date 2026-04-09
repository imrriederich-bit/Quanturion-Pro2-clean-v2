import { Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/appStyles";

export default function OptionGroup({ items, value, onChange, getLabel }) {
  return (
    <View style={styles.optionWrap}>
      {items.map((item) => (
        <TouchableOpacity
          key={item}
          style={[styles.optionChip, value === item && styles.optionChipActive]}
          onPress={() => onChange(item)}
        >
          <Text
            style={[styles.optionChipText, value === item && styles.optionChipTextActive]}
          >
            {getLabel(item)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
