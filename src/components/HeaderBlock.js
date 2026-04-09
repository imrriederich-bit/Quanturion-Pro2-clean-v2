import { Image, Text, View } from "react-native";
import styles from "../styles/appStyles";
import SectionCard from "./SectionCard";

export default function HeaderBlock({ t, textAlign }) {
  return (
    <SectionCard dark style={styles.headerBlock}>
      <View style={styles.headerTopRow}>
        <View style={styles.brandRow}>
          <Image
            source={require("../../assets/logo-pro.png")}
            style={styles.logoImage}
            resizeMode="cover"
          />
          <View>
            <Text style={[styles.brandText, { textAlign }]}>{t.brand}</Text>
            <Text style={[styles.updatedText, { textAlign }]}>{t.updated}</Text>
          </View>
        </View>

        <View style={styles.badgePill}>
          <Text style={styles.badgePillText}>{t.badge}</Text>
        </View>
      </View>

      <Text style={[styles.mainTitle, { textAlign }]}>{t.headline}</Text>
      <Text style={[styles.mainSubtitle, { textAlign }]}>{t.subheadline}</Text>
    </SectionCard>
  );
}
