import { Text, View } from "react-native";
import BulletList from "../components/BulletList";
import PrimaryButton from "../components/PrimaryButton";
import SectionCard from "../components/SectionCard";
import styles from "../styles/appStyles";

export default function PremiumScreen({ t, onContact }) {
  const textAlign = t.dir === "rtl" ? "right" : "left";

  return (
    <>
      <SectionCard dark>
        <Text style={[styles.sectionEyebrow, { textAlign }]}>{t.premium}</Text>
        <Text style={[styles.sectionTitleLight, { textAlign }]}>{t.premiumTitle}</Text>
        <Text style={[styles.sectionTextLight, { textAlign }]}>{t.premiumSubtitle}</Text>

        <View style={styles.priceBadge}>
          <Text style={styles.priceBadgeText}>{t.premiumPrice}</Text>
        </View>
      </SectionCard>

      <SectionCard>
        <BulletList
          items={[
            t.premiumPillar1,
            t.premiumPillar2,
            t.premiumPillar3,
            t.premiumPillar4,
            t.premiumPillar5,
          ]}
          textAlign={textAlign}
        />
      </SectionCard>

      <SectionCard dark>
        <PrimaryButton title={t.sendWhatsApp} onPress={onContact} />
      </SectionCard>
    </>
  );
}
