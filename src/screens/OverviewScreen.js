import { Text, TouchableOpacity, View } from "react-native";
import { MODULE_SCREENS } from "../constants/screens";
import { formatCurrency } from "../utils/number";
import { getModuleTitle, getPriorityLabel, getSpeedLabel } from "../utils/labels";
import BulletList from "../components/BulletList";
import SectionCard from "../components/SectionCard";
import styles from "../styles/appStyles";

export default function OverviewScreen({ t, lang, results, onOpen }) {
  const modules = MODULE_SCREENS.map((key) => results[key]);
  const ranked = [...modules].sort((a, b) => b.annualPotential - a.annualPotential);
  const combinedMonthly = modules.reduce((sum, item) => sum + item.monthlyPotential, 0);
  const combinedAnnual = modules.reduce((sum, item) => sum + item.annualPotential, 0);

  return (
    <>
      <SectionCard dark>
        <Text style={styles.sectionEyebrow}>{t.dashboard}</Text>
        <Text style={styles.sectionTitleLight}>{t.overviewTitle}</Text>
        <Text style={styles.sectionTextLight}>{t.overviewSubtitle}</Text>

        <View style={styles.summaryHeroRow}>
          <View style={styles.summaryHeroBox}>
            <Text style={styles.summaryHeroLabel}>{t.combinedPotential}</Text>
            <Text style={styles.summaryHeroValue}>
              {formatCurrency(combinedMonthly, lang)} ₪
            </Text>
            <Text style={styles.summaryHeroSub}>{t.monthlyPotentialLabel}</Text>
          </View>

          <View style={styles.summaryHeroBoxAlt}>
            <Text style={styles.summaryHeroLabelDark}>{t.annualPerspective}</Text>
            <Text style={styles.summaryHeroValueDark}>
              {formatCurrency(combinedAnnual, lang)} ₪
            </Text>
            <Text style={styles.summaryHeroSubDark}>{t.notIncluded}</Text>
          </View>
        </View>
      </SectionCard>

      <SectionCard>
        <Text style={styles.sectionTitle}>{t.strongestLevers}</Text>
        <Text style={styles.sectionText}>{t.prioritySubtitle}</Text>

        {ranked.map((item, index) => (
          <TouchableOpacity
            key={item.module}
            style={styles.roadmapRow}
            onPress={() => onOpen(item.module)}
          >
            <View style={styles.roadmapRank}>
              <Text style={styles.roadmapRankText}>{index + 1}</Text>
            </View>

            <View style={styles.roadmapBody}>
              <Text style={styles.roadmapTitle}>
                {getModuleTitle(item.module, t)}
              </Text>
              <Text style={styles.roadmapMeta}>
                {formatCurrency(item.annualPotential, lang)} ₪ / {t.perYear} ·{" "}
                {getPriorityLabel(item.priorityScore, t)}
              </Text>
            </View>

            <View style={styles.roadmapTag}>
              <Text style={styles.roadmapTagText}>{getSpeedLabel(item.speedDays, t)}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </SectionCard>

      <SectionCard>
        <Text style={styles.sectionTitle}>{t.premiumFeaturesTitle}</Text>
        <Text style={styles.sectionText}>{t.premiumFeaturesSubtitle}</Text>

        <View style={styles.featureGrid}>
          {[
            [t.feature1Title, t.feature1Text],
            [t.feature2Title, t.feature2Text],
            [t.feature3Title, t.feature3Text],
            [t.feature4Title, t.feature4Text],
          ].map(([title, copy]) => (
            <View key={title} style={styles.featureCard}>
              <Text style={styles.featureCardTitle}>{title}</Text>
              <Text style={styles.featureCardText}>{copy}</Text>
            </View>
          ))}
        </View>
      </SectionCard>
    </>
  );
}
