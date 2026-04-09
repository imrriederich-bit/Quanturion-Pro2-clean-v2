import React, { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, Text } from "react-native";
import HeaderBlock from "./components/HeaderBlock";
import LanguageToggle from "./components/LanguageToggle";
import NavTabs from "./components/NavTabs";
import OverviewScreen from "./screens/OverviewScreen";
import ModuleScreen from "./screens/ModuleScreen";
import PremiumScreen from "./screens/PremiumScreen";
import LegalScreen from "./screens/LegalScreen";
import { getText } from "./i18n";
import { SCREENS } from "./constants/screens";
import { getPreviewResults } from "./data/previews";
import { calculateScenario } from "./services/scenarioService";
import { buildWhatsAppMessage, openWhatsApp } from "./services/whatsappService";
import { normalizeNumberInput } from "./utils/number";
import styles from "./styles/appStyles";

function sanitizeFormValues(module, form) {
  if (module === SCREENS.tax) {
    return {
      ...form,
      salary: normalizeNumberInput(form.salary),
      children: normalizeNumberInput(form.children),
    };
  }

  if (module === SCREENS.mortgage) {
    return {
      ...form,
      amount: normalizeNumberInput(form.amount),
      years: normalizeNumberInput(form.years),
      rate: normalizeNumberInput(form.rate),
      currentPayment: normalizeNumberInput(form.currentPayment),
    };
  }

  if (module === SCREENS.electricity) {
    return {
      ...form,
      bill: normalizeNumberInput(form.bill),
      kwh: normalizeNumberInput(form.kwh),
    };
  }

  return {
    ...form,
    age: normalizeNumberInput(form.age),
    year: normalizeNumberInput(form.year),
    experience: normalizeNumberInput(form.experience),
  };
}

export default function MainApp() {
  const [lang, setLang] = useState("de");
  const [screen, setScreen] = useState(SCREENS.dashboard);

  const t = getText(lang);
  const textAlign = t.dir === "rtl" ? "right" : "left";

  const previewResults = useMemo(() => getPreviewResults(), []);
  const [results, setResults] = useState(previewResults);
  const [errorText, setErrorText] = useState("");

  const [taxForm, setTaxForm] = useState({
    salary: "",
    salaryType: "net",
    familyStatus: "single",
    children: "0",
    jobChanges: "no",
    gap: "no",
    donations: "no",
    pension: "no",
    lastCheck: "never",
  });

  const [mortgageForm, setMortgageForm] = useState({
    amount: "",
    years: "",
    rate: "",
    currentPayment: "",
  });

  const [electricityForm, setElectricityForm] = useState({
    bill: "",
    kwh: "",
    profile: "family",
  });

  const [insuranceForm, setInsuranceForm] = useState({
    age: "",
    vehicleType: "family",
    year: "",
    experience: "",
    claims: "no",
  });

  const forms = {
    [SCREENS.tax]: [taxForm, setTaxForm, t.missingTax],
    [SCREENS.mortgage]: [mortgageForm, setMortgageForm, t.missingMortgage],
    [SCREENS.electricity]: [electricityForm, setElectricityForm, t.missingElectricity],
    [SCREENS.insurance]: [insuranceForm, setInsuranceForm, t.missingInsurance],
  };

  const handleOpenModule = (module) => {
    setScreen(module);
    setErrorText("");
  };

  const handleCalculate = (module) => {
    const [form, setForm, errorMessage] = forms[module];
    const sanitized = sanitizeFormValues(module, form);
    setForm(sanitized);

    const result = calculateScenario(module, sanitized);

    if (!result) {
      setErrorText(errorMessage);
      return;
    }

    setResults((prev) => ({ ...prev, [module]: result }));
    setErrorText("");
  };

  const handleContact = async (module) => {
    const result = results[module];
    if (!result) return;
    await openWhatsApp(buildWhatsAppMessage(module, result, t), t);
  };

  const handlePremiumContact = async () => {
    await openWhatsApp(t.premiumMessageIntro, t);
  };

  const renderCurrentScreen = () => {
    if (screen === SCREENS.dashboard) {
      return (
        <OverviewScreen
          t={t}
          lang={lang}
          results={results}
          onOpen={handleOpenModule}
        />
      );
    }

    if (screen === SCREENS.premium) {
      return <PremiumScreen t={t} onContact={handlePremiumContact} />;
    }

    if (screen === SCREENS.legal) {
      return <LegalScreen t={t} textAlign={textAlign} />;
    }

    const [form, setForm] = forms[screen];

    return (
      <ModuleScreen
        module={screen}
        t={t}
        lang={lang}
        textAlign={textAlign}
        form={form}
        setForm={setForm}
        result={results[screen]}
        errorText={errorText}
        onCalculate={() => handleCalculate(screen)}
        onContact={() => handleContact(screen)}
        onOpenPremium={() => setScreen(SCREENS.premium)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <HeaderBlock t={t} textAlign={textAlign} />
        <LanguageToggle lang={lang} onChange={setLang} />
        <NavTabs screen={screen} onChange={setScreen} t={t} />

        {renderCurrentScreen()}

        <Text style={[styles.footerNote, { textAlign }]}>
          {t.footerNote}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
