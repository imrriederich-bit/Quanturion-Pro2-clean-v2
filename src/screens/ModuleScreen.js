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

function translateValue(value, t) {
  if (typeof value !== "string") return value;
  return t[value] || value;
}

function translateList(items, t) {
  if (!Array.isArray(items)) return [];
  return items.map((item) => translateValue(item, t));
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
        <Text style={[styles.sectionTitleLight, { textAlign }]}>{t.nextStep}</Text>
        <Text style={[styles.sectionTextLight, { textAlign }]}>{t.overviewSubtitle}</Text>
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
          {t.monthlyPotentialLabel}: {formatCurrency(result.monthlyPotential, "en")} ₪ ·{" "}
          {t.annualPotentialLabel}: {formatCurrency(result.annualPotential, "en")} ₪
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
              {formatCurrency(result.monthlyPotential, "en")} ₪
            </Text>
          </View>

          <View style={styles.summaryMiniCard}>
            <Text style={styles.summaryMiniLabel}>{t.annualPotentialLabel}</Text>
            <Text style={styles.summaryMiniValue}>
              {formatCurrency(result.annualPotential, "en")} ₪
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
              {formatCurrency(result.optimizedPayment, "en")} ₪
            </Text>
          </View>
        ) : null}

        {typeof result.estimatedConsumption === "number" ? (
          <View style={styles.detailLine}>
            <Text style={styles.detailLineLabel}>{t.estimatedConsumption}</Text>
            <Text style={styles.detailLineValue}>
              {formatCurrency(result.estimatedConsumption, "en")} kWh
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
        <Text style={[styles.sectionText, { textAlign }]}>
          {translateValue(result.insights.why, t)}
        </Text>
      </SectionCard>

      <SectionCard>
        <Text style={[styles.sectionTitle, { textAlign }]}>{t.actionPlan}</Text>
        <BulletList items={translateList(result.insights.steps, t)} textAlign={textAlign} />
      </SectionCard>

      <SectionCard>
        <Text style={[styles.sectionTitle, { textAlign }]}>{t.documents}</Text>
        <BulletList items={translateList(result.insights.docs, t)} textAlign={textAlign} />
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
