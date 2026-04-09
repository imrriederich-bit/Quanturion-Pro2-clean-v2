import { Text, View } from "react-native";
import styles from "../styles/appStyles";

export default function InsightTile({ label, value }) {
  return (
    <View style={styles.insightTile}>
      <Text style={styles.insightTileLabel}>{label}</Text>
      <Text style={styles.insightTileValue}>{value}</Text>
    </View>
  );
}
