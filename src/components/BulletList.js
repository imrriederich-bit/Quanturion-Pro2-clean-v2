import { Text, View } from "react-native";
import styles from "../styles/appStyles";

export default function BulletList({ items, textAlign = "left" }) {
  const isRTL = textAlign === "right";

  return (
    <View style={styles.bulletWrap}>
      {items.map((item, index) => (
        <View key={`${index}-${item}`} style={[styles.bulletRow, isRTL && styles.bulletRowRtl]}>
          <View style={[styles.bulletDot, isRTL && styles.bulletDotRtl]} />
          <Text style={[styles.bulletText, { textAlign }]}>{item}</Text>
        </View>
      ))}
    </View>
  );
}
