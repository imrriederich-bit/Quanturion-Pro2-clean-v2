import { View, Text } from "react-native";
import styles from "../styles/appStyles";

export default function HeaderBlock({ t }) {
  return (
    <View style={styles.header}>
      <View style={styles.brandRow}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoPlaceholderText}>Q</Text>
        </View>

        <View style={styles.brandTextWrap}>
          <Text style={styles.brandTitle}>{t.brand}</Text>
          <Text style={styles.brandUpdated}>{t.updated}</Text>
        </View>

        <View style={styles.badgePill}>
          <Text style={styles.badgePillText}>{t.badge}</Text>
        </View>
      </View>

      <Text style={styles.heroTitle}>{t.headline}</Text>
      <Text style={styles.heroSubtitle}>{t.subheadline}</Text>
    </View>
  );
}
