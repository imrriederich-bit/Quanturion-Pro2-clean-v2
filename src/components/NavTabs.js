import { ScrollView, Text, TouchableOpacity } from "react-native";
import { SCREENS } from "../constants/screens";
import styles from "../styles/appStyles";

export default function NavTabs({ screen, onChange, t }) {
  const tabs = [
    [SCREENS.dashboard, t.dashboard],
    [SCREENS.tax, t.tax],
    [SCREENS.mortgage, t.mortgage],
    [SCREENS.electricity, t.electricity],
    [SCREENS.insurance, t.insurance],
    [SCREENS.premium, t.premium],
    [SCREENS.legal, t.legal],
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.navRow}
    >
      {tabs.map(([key, label]) => (
        <TouchableOpacity
          key={key}
          style={[styles.navChip, screen === key && styles.navChipActive]}
          onPress={() => onChange(key)}
        >
          <Text style={[styles.navChipText, screen === key && styles.navChipTextActive]}>
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
