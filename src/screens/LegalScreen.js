import { Text } from "react-native";
import SectionCard from "../components/SectionCard";
import styles from "../styles/appStyles";

export default function LegalScreen({ t, textAlign }) {
  return (
    <SectionCard>
      <Text style={[styles.sectionTitle, { textAlign }]}>{t.legalTitle}</Text>
      <Text style={[styles.sectionText, { textAlign }]}>{t.legalBody}</Text>
      <Text style={[styles.sectionText, { textAlign, marginTop: 12 }]}>
        {t.legalBody2}
      </Text>
    </SectionCard>
  );
}
