import { Text, View } from "react-native";
import FieldInput from "../components/FieldInput";
import OptionGroup from "../components/OptionGroup";
import InsightTile from "../components/InsightTile";
import BulletList from "../components/BulletList";
import SectionCard from "../components/SectionCard";
import PrimaryButton from "../components/PrimaryButton";
import styles from "../styles/appStyles";
import { SCREENS } from "../constants/screens";
import { formatCurrency } from "../utils/number";
import {
  getEffortLabel,
  getModuleTitle,
  getPriorityLabel,
  getProfileLabel,
  getSpeedLabel,
  getVehicleLabel,
} from "../utils/labels";

const YES_NO = ["yes", "no"];
const LAST_CHECK_OPTIONS = ["never", "3plus", "1to2", "recently"];
const PROFILE_OPTIONS = ["single", "couple", "family", "home_office"];
const VEHICLE_OPTIONS = ["mini", "family", "suv", "luxury"];

const DYNAMIC_TRANSLATIONS = {
  de: {
    "Insurance is rarely the largest lever, but often an easy quality-and-price optimization.": "Versicherung ist selten der größte Hebel, aber oft eine einfache Qualitäts- und Preisoptimierung.",
    "Review current cover.": "Bestehenden Schutz prüfen.",
    "Validate your risk profile.": "Risikoprofil validieren.",
    "Prepare a structured market request.": "Strukturierte Marktanfrage vorbereiten.",
    "Current policy": "Aktuelle Police",
    "Claims history": "Schadenshistorie",
    "Vehicle registration": "Fahrzeugschein / Zulassung",
    "Tax reviews are often underused after employer or family changes.": "Steuerprüfungen bleiben nach Arbeitgeber- oder Familienänderungen oft ungenutzt.",
    "Collect annual salary records.": "Jahreslohnunterlagen sammeln.",
    "Review credits and deductible events.": "Steuergutschriften und absetzbare Ereignisse prüfen.",
    "Submit a structured tax case review.": "Strukturierte Steuerprüfung einreichen.",
    "Payslips": "Gehaltsabrechnungen",
    "Annual tax summary": "Jahressteuerübersicht",
    "Supporting documents": "Nachweisunterlagen",
    "Mortgage optimization is often the largest lever when the current structure is outdated.": "Eine Hypothekenoptimierung ist oft der größte Hebel, wenn die aktuelle Struktur veraltet ist.",
    "Review the current structure.": "Aktuelle Struktur prüfen.",
    "Compare refinance scenarios.": "Refinanzierungsszenarien vergleichen.",
    "Escalate only if savings justify expert handling.": "Nur weitergeben, wenn die Ersparnis den Expertenaufwand rechtfertigt.",
    "Mortgage statement": "Hypothekenauszug",
    "Rate structure": "Zinsstruktur",
    "Outstanding balance confirmation": "Restschuld-Bestätigung",
    "This is often the quickest savings lever with low operational friction.": "Das ist oft der schnellste Hebel mit wenig operativem Aufwand.",
    "Check the current provider and bill.": "Aktuellen Anbieter und Rechnung prüfen.",
    "Validate the best-fit tariff model.": "Passendes Tarifmodell validieren.",
    "Switch only if final numbers still hold.": "Nur wechseln, wenn die Endwerte weiterhin passen.",
    "Latest bill": "Letzte Rechnung",
    "Provider details": "Anbieterdaten",
    "Consumption data if available": "Verbrauchsdaten, falls vorhanden",
    "A structured tax review often uncovers unused credits after family or employment changes.": "Eine strukturierte Steuerprüfung deckt oft ungenutzte Vorteile nach Familien- oder Jobwechseln auf.",
    "Validate salary basis and family information.": "Gehaltsbasis und Familiendaten validieren.",
    "Review credits, employer changes and interruption periods.": "Steuergutschriften, Arbeitgeberwechsel und Unterbrechungen prüfen.",
    "Prepare a structured document package for review.": "Strukturiertes Dokumentenpaket vorbereiten.",
    "12 payslips": "12 Gehaltsabrechnungen",
    "Proof of donations, leave or employer changes": "Nachweise zu Spenden, Auszeiten oder Arbeitgeberwechseln",
    "An outdated mortgage structure is often the single strongest monthly savings lever.": "Eine veraltete Hypothekenstruktur ist oft der stärkste monatliche Sparhebel.",
    "Validate the current loan structure and rate mix.": "Aktuelle Darlehensstruktur und Zinsmix prüfen.",
    "Compare refinancing scenarios against a realistic target rate.": "Refinanzierungsszenarien gegen einen realistischen Zielzins vergleichen.",
    "Current mortgage schedule": "Aktueller Tilgungsplan",
    "Bank summary": "Bankübersicht",
    "Electricity is usually the fastest operational win even when the absolute savings are smaller.": "Strom ist oft der schnellste operative Gewinn, auch wenn die absolute Ersparnis kleiner ist.",
    "Validate the current bill and provider.": "Aktuelle Rechnung und Anbieter validieren.",
    "Confirm the usage profile and tariff fit.": "Nutzungsprofil und Tarif-Fit bestätigen.",
    "Switch only if the upside stays visible after the final check.": "Nur wechseln, wenn der Vorteil auch nach der Endprüfung sichtbar bleibt.",
    "Latest electricity bill": "Letzte Stromrechnung",
    "Customer number": "Kundennummer",
    "Usage data if known": "Verbrauchsdaten, falls bekannt",
    "Insurance is rarely the biggest lever, but often a clean price-to-value optimization.": "Versicherung ist selten der größte Hebel, aber oft eine saubere Preis-Leistungs-Optimierung.",
    "Check claims history and required cover level.": "Schadenhistorie und benötigte Deckung prüfen.",
    "Validate driver and vehicle profile.": "Fahrer- und Fahrzeugprofil validieren.",
    "Prepare a structured request for licensed providers.": "Strukturierte Anfrage für lizenzierte Anbieter vorbereiten."
  },
  he: {
    "Insurance is rarely the largest lever, but often an easy quality-and-price optimization.": "ביטוח הוא לרוב לא המנוף הגדול ביותר, אבל לעיתים קרובות זו אופטימיזציה פשוטה של מחיר ואיכות.",
    "Review current cover.": "בדוק את הכיסוי הנוכחי.",
    "Validate your risk profile.": "אמת את פרופיל הסיכון שלך.",
    "Prepare a structured market request.": "הכן פנייה מסודרת לשוק.",
    "Current policy": "פוליסה נוכחית",
    "Claims history": "היסטוריית תביעות",
    "Vehicle registration": "רישיון רכב",
    "Tax reviews are often underused after employer or family changes.": "בדיקות מס אינן מנוצלות מספיק לאחר שינוי בעבודה או במשפחה.",
    "Collect annual salary records.": "אסוף מסמכי שכר שנתיים.",
    "Review credits and deductible events.": "בדוק נקודות זיכוי ואירועים מוכרים לניכוי.",
    "Submit a structured tax case review.": "הגש בדיקת מס מסודרת.",
    "Payslips": "תלושי שכר",
    "Annual tax summary": "סיכום מס שנתי",
    "Supporting documents": "מסמכים תומכים",
    "Mortgage optimization is often the largest lever when the current structure is outdated.": "אופטימיזציית משכנתא היא לעיתים קרובות המנוף הגדול ביותר כשהמבנה הנוכחי מיושן.",
    "Review the current structure.": "בדוק את המבנה הנוכחי.",
    "Compare refinance scenarios.": "השווה תרחישי מחזור.",
    "Escalate only if savings justify expert handling.": "המשך רק אם החיסכון מצדיק טיפול מקצועי.",
    "Mortgage statement": "דוח משכנתא",
    "Rate structure": "מבנה ריבית",
    "Outstanding balance confirmation": "אישור יתרה לסילוק",
    "This is often the quickest savings lever with low operational friction.": "זה לרוב מנוף החיסכון המהיר ביותר עם מעט חיכוך תפעולי.",
    "Check the current provider and bill.": "בדוק את הספק והחשבון הנוכחיים.",
    "Validate the best-fit tariff model.": "אמת את מודל התעריף המתאים ביותר.",
    "Switch only if final numbers still hold.": "החלף רק אם המספרים הסופיים עדיין מצדיקים זאת.",
    "Latest bill": "חשבון אחרון",
    "Provider details": "פרטי ספק",
    "Consumption data if available": "נתוני צריכה אם זמינים",
    "A structured tax review often uncovers unused credits after family or employment changes.": "בדיקת מס מסודרת חושפת לעיתים קרובות זכויות שלא נוצלו לאחר שינויי עבודה או משפחה.",
    "Validate salary basis and family information.": "אמת את בסיס השכר ואת פרטי המשפחה.",
    "Review credits, employer changes and interruption periods.": "בדוק זיכויים, שינויי מעסיק ותקופות הפסקה.",
    "Prepare a structured document package for review.": "הכן חבילת מסמכים מסודרת לבדיקה.",
    "12 payslips": "12 תלושי שכר",
    "Proof of donations, leave or employer changes": "אישורים על תרומות, חופשות או שינויי מעסיק",
    "An outdated mortgage structure is often the single strongest monthly savings lever.": "מבנה משכנתא מיושן הוא לעיתים קרובות מנוף החיסכון החודשי החזק ביותר.",
    "Validate the current loan structure and rate mix.": "אמת את מבנה ההלוואה ותמהיל הריביות הנוכחי.",
    "Compare refinancing scenarios against a realistic target rate.": "השווה תרחישי מחזור מול ריבית יעד ריאלית.",
    "Current mortgage schedule": "לוח משכנתא נוכחי",
    "Bank summary": "סיכום בנקאי",
    "Electricity is usually the fastest operational win even when the absolute savings are smaller.": "חשמל הוא בדרך כלל הרווח התפעולי המהיר ביותר גם כשהחיסכון המוחלט קטן יותר.",
    "Validate the current bill and provider.": "אמת את החשבון והספק הנוכחיים.",
    "Confirm the usage profile and tariff fit.": "אשר את פרופיל השימוש והתאמת התעריף.",
    "Switch only if the upside stays visible after the final check.": "החלף רק אם היתרון נשאר ברור גם לאחר הבדיקה הסופית.",
    "Latest electricity bill": "חשבון חשמל אחרון",
    "Customer number": "מספר לקוח",
    "Usage data if known": "נתוני שימוש אם ידועים",
    "Insurance is rarely the biggest lever, but often a clean price-to-value optimization.": "ביטוח הוא לרוב לא המנוף הגדול ביותר, אבל לעיתים קרובות הוא אופטימיזציה נקייה של מחיר מול ערך.",
    "Check claims history and required cover level.": "בדוק את היסטוריית התביעות ואת רמת הכיסוי הנדרשת.",
    "Validate driver and vehicle profile.": "אמת את פרופיל הנהג והרכב.",
    "Prepare a structured request for licensed providers.": "הכן פנייה מסודרת לספקים מורשים."
  }
};

function localizeDynamic(value, lang) {
  if (Array.isArray(value)) {
    return value.map((item) => localizeDynamic(item, lang));
  }

  if (typeof value !== "string") {
    return value;
  }

  const table = DYNAMIC_TRANSLATIONS[lang];
  return table?.[value] || value;
}


function ModuleForm({ module, form, setForm, t, textAlign }) {
  if (module === SCREENS.tax) {
    return (
      <>
        <FieldInput
          label={t.salary}
          value={form.salary}
          onChangeText={(value) => setForm((prev) => ({ ...prev, salary: value }))}
          placeholder="13500"
          keyboardType="numeric"
          textAlign={textAlign}
        />
        <FieldInput
          label={t.children}
          value={form.children}
          onChangeText={(value) => setForm((prev) => ({ ...prev, children: value }))}
          placeholder="2"
          keyboardType="numeric"
          textAlign={textAlign}
        />
        <Text style={[styles.fieldLabel, { textAlign }]}>{t.salaryType}</Text>
        <OptionGroup
          items={["net", "gross", "unknown"]}
          value={form.salaryType}
          onChange={(value) => setForm((prev) => ({ ...prev, salaryType: value }))}
          getLabel={(value) =>
            value === "net" ? t.net : value === "gross" ? t.gross : t.notSure
          }
        />
        <Text style={[styles.fieldLabel, { textAlign }]}>{t.familyStatus}</Text>
        <OptionGroup
          items={["single", "married", "single_parent"]}
          value={form.familyStatus}
          onChange={(value) => setForm((prev) => ({ ...prev, familyStatus: value }))}
          getLabel={(value) =>
            value === "single"
              ? t.single
              : value === "married"
              ? t.married
              : t.singleParent
          }
        />
        <Text style={[styles.fieldLabel, { textAlign }]}>{t.changedEmployer}</Text>
        <OptionGroup
          items={YES_NO}
          value={form.jobChanges}
          onChange={(value) => setForm((prev) => ({ ...prev, jobChanges: value }))}
          getLabel={(value) => (value === "yes" ? t.yes : t.no)}
        />
        <Text style={[styles.fieldLabel, { textAlign }]}>{t.gap}</Text>
        <OptionGroup
          items={YES_NO}
          value={form.gap}
          onChange={(value) => setForm((prev) => ({ ...prev, gap: value }))}
          getLabel={(value) => (value === "yes" ? t.yes : t.no)}
        />
        <Text style={[styles.fieldLabel, { textAlign }]}>{t.donations}</Text>
        <OptionGroup
          items={YES_NO}
          value={form.donations}
          onChange={(value) => setForm((prev) => ({ ...prev, donations: value }))}
          getLabel={(value) => (value === "yes" ? t.yes : t.no)}
        />
        <Text style={[styles.fieldLabel, { textAlign }]}>{t.pension}</Text>
        <OptionGroup
          items={YES_NO}
          value={form.pension}
          onChange={(value) => setForm((prev) => ({ ...prev, pension: value }))}
          getLabel={(value) => (value === "yes" ? t.yes : t.no)}
        />
        <Text style={[styles.fieldLabel, { textAlign }]}>{t.lastCheck}</Text>
        <OptionGroup
          items={LAST_CHECK_OPTIONS}
          value={form.lastCheck}
          onChange={(value) => setForm((prev) => ({ ...prev, lastCheck: value }))}
          getLabel={(value) =>
            value === "never"
              ? t.never
              : value === "3plus"
              ? t.threePlus
              : value === "1to2"
              ? t.oneToTwo
              : t.recently
          }
        />
      </>
    );
  }

  if (module === SCREENS.mortgage) {
    return (
      <>
        <FieldInput
          label={t.loanAmount}
          value={form.amount}
          onChangeText={(value) => setForm((prev) => ({ ...prev, amount: value }))}
          placeholder="1200000"
          keyboardType="numeric"
          textAlign={textAlign}
        />
        <FieldInput
          label={t.termYears}
          value={form.years}
          onChangeText={(value) => setForm((prev) => ({ ...prev, years: value }))}
          placeholder="25"
          keyboardType="numeric"
          textAlign={textAlign}
        />
        <FieldInput
          label={t.currentRate}
          value={form.rate}
          onChangeText={(value) => setForm((prev) => ({ ...prev, rate: value }))}
          placeholder="6.1"
          keyboardType="numeric"
          textAlign={textAlign}
        />
        <FieldInput
          label={t.currentPayment}
          value={form.currentPayment}
          onChangeText={(value) =>
            setForm((prev) => ({ ...prev, currentPayment: value }))
          }
          placeholder="7600"
          keyboardType="numeric"
          textAlign={textAlign}
        />
      </>
    );
  }

  if (module === SCREENS.electricity) {
    return (
      <>
        <FieldInput
          label={t.monthlyBill}
          value={form.bill}
          onChangeText={(value) => setForm((prev) => ({ ...prev, bill: value }))}
          placeholder="650"
          keyboardType="numeric"
          textAlign={textAlign}
        />
        <FieldInput
          label={t.monthlyKwh}
          value={form.kwh}
          onChangeText={(value) => setForm((prev) => ({ ...prev, kwh: value }))}
          placeholder="620"
          keyboardType="numeric"
          textAlign={textAlign}
        />
        <Text style={[styles.fieldLabel, { textAlign }]}>{t.usageProfile}</Text>
        <OptionGroup
          items={PROFILE_OPTIONS}
          value={form.profile}
          onChange={(value) => setForm((prev) => ({ ...prev, profile: value }))}
          getLabel={(value) => getProfileLabel(value, t)}
        />
      </>
    );
  }

  return (
    <>
      <FieldInput
        label={t.age}
        value={form.age}
        onChangeText={(value) => setForm((prev) => ({ ...prev, age: value }))}
        placeholder="37"
        keyboardType="numeric"
        textAlign={textAlign}
      />
      <FieldInput
        label={t.vehicleYear}
        value={form.year}
        onChangeText={(value) => setForm((prev) => ({ ...prev, year: value }))}
        placeholder="2021"
        keyboardType="numeric"
        textAlign={textAlign}
      />
      <FieldInput
        label={t.drivingExperience}
        value={form.experience}
        onChangeText={(value) => setForm((prev) => ({ ...prev, experience: value }))}
        placeholder="12"
        keyboardType="numeric"
        textAlign={textAlign}
      />
      <Text style={[styles.fieldLabel, { textAlign }]}>{t.vehicleType}</Text>
      <OptionGroup
        items={VEHICLE_OPTIONS}
        value={form.vehicleType}
        onChange={(value) => setForm((prev) => ({ ...prev, vehicleType: value }))}
        getLabel={(value) => getVehicleLabel(value, t)}
      />
      <Text style={[styles.fieldLabel, { textAlign }]}>{t.claimsHistory}</Text>
      <OptionGroup
        items={YES_NO}
        value={form.claims}
        onChange={(value) => setForm((prev) => ({ ...prev, claims: value }))}
        getLabel={(value) => (value === "yes" ? t.yes : t.no)}
      />
    </>
  );
}

export default function ModuleScreen({
  module,
  t,
  lang,
  textAlign,
  form,
  setForm,
  result,
  errorText,
  onCalculate,
  onContact,
  onOpenPremium,
}) {
  const primaryLabel = result.primaryLabelKey ? t[result.primaryLabelKey] : t.quickSummary;

  return (
    <>
      <SectionCard dark>
        <Text style={[styles.sectionEyebrow, { textAlign }]}>{getModuleTitle(module, t)}</Text>
        <Text style={[styles.sectionTitleLight, { textAlign }]}>
          {t.nextStep}
        </Text>
        <Text style={[styles.sectionTextLight, { textAlign }]}>
          {t.overviewSubtitle}
        </Text>
      </SectionCard>

      <SectionCard>
        <Text style={[styles.sectionTitle, { textAlign }]}>{getModuleTitle(module, t)}</Text>
        <ModuleForm
          module={module}
          form={form}
          setForm={setForm}
          t={t}
          textAlign={textAlign}
        />
        <PrimaryButton title={t.calculate} onPress={onCalculate} />
        {errorText ? (
          <Text style={[styles.errorText, { textAlign }]}>{errorText}</Text>
        ) : null}
      </SectionCard>

      <SectionCard dark>
        <Text style={[styles.sectionEyebrow, { textAlign }]}>{t.quickSummary}</Text>
        <Text style={[styles.sectionTitleLight, { textAlign }]}>{primaryLabel}</Text>
        <Text style={[styles.resultPrimaryValue, { textAlign }]}>{result.primaryValue}</Text>
        <Text style={[styles.sectionTextLight, { textAlign }]}>
          {t.monthlyPotentialLabel}: {formatCurrency(result.monthlyPotential, lang)} ₪ ·{" "}
          {t.annualPotentialLabel}: {formatCurrency(result.annualPotential, lang)} ₪
        </Text>
      </SectionCard>

      <View style={styles.insightGrid}>
        <InsightTile label={t.confidence} value={`${result.confidence}/100`} />
        <InsightTile label={t.readiness} value={`${result.readiness}/100`} />
        <InsightTile label={t.priority} value={getPriorityLabel(result.priorityScore, t)} />
        <InsightTile label={t.effort} value={getEffortLabel(result.effort, t)} />
      </View>

      <SectionCard>
        <Text style={[styles.sectionTitle, { textAlign }]}>{t.quickSummary}</Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryMiniCard}>
            <Text style={styles.summaryMiniLabel}>{t.monthlyPotentialLabel}</Text>
            <Text style={styles.summaryMiniValue}>
              {formatCurrency(result.monthlyPotential, lang)} ₪
            </Text>
          </View>

          <View style={styles.summaryMiniCard}>
            <Text style={styles.summaryMiniLabel}>{t.annualPotentialLabel}</Text>
            <Text style={styles.summaryMiniValue}>
              {formatCurrency(result.annualPotential, lang)} ₪
            </Text>
          </View>

          <View style={styles.summaryMiniCard}>
            <Text style={styles.summaryMiniLabel}>{t.benchmark}</Text>
            <Text style={styles.summaryMiniValueSmall}>{result.benchmark}</Text>
          </View>

          <View style={styles.summaryMiniCard}>
            <Text style={styles.summaryMiniLabel}>{t.nextStep}</Text>
            <Text style={styles.summaryMiniValueSmall}>{getSpeedLabel(result.speedDays, t)}</Text>
          </View>
        </View>

        {typeof result.optimizedPayment === "number" ? (
          <View style={styles.detailLine}>
            <Text style={styles.detailLineLabel}>{t.optimizedPayment}</Text>
            <Text style={styles.detailLineValue}>
              {formatCurrency(result.optimizedPayment, lang)} ₪
            </Text>
          </View>
        ) : null}

        {typeof result.estimatedConsumption === "number" ? (
          <View style={styles.detailLine}>
            <Text style={styles.detailLineLabel}>{t.estimatedConsumption}</Text>
            <Text style={styles.detailLineValue}>
              {formatCurrency(result.estimatedConsumption, lang)} kWh
            </Text>
          </View>
        ) : null}

        {Array.isArray(result.providers) ? (
          <>
            <Text style={[styles.sectionText, { textAlign, marginTop: 14 }]}>
              {t.exampleProviders}
            </Text>
            <View style={styles.providerWrap}>
              {result.providers.map((provider) => (
                <View key={provider} style={styles.providerPill}>
                  <Text style={styles.providerPillText}>{provider}</Text>
                </View>
              ))}
            </View>
          </>
        ) : null}
      </SectionCard>

      <SectionCard>
        <Text style={[styles.sectionTitle, { textAlign }]}>{t.whyThisMatters}</Text>
        <Text style={[styles.sectionText, { textAlign }]}>{localizeDynamic(result.insights.why, lang)}</Text>
      </SectionCard>

      <SectionCard>
        <Text style={[styles.sectionTitle, { textAlign }]}>{t.actionPlan}</Text>
        <BulletList items={localizeDynamic(result.insights.steps, lang)} textAlign={textAlign} />
      </SectionCard>

      <SectionCard>
        <Text style={[styles.sectionTitle, { textAlign }]}>{t.documents}</Text>
        <BulletList items={localizeDynamic(result.insights.docs, lang)} textAlign={textAlign} />
      </SectionCard>

      <SectionCard dark>
        <PrimaryButton title={t.sendWhatsApp} onPress={onContact} />
        <PrimaryButton
          title={t.openPremium}
          onPress={onOpenPremium}
          secondary
          style={{ marginTop: 12 }}
        />
      </SectionCard>
    </>
  );
}
