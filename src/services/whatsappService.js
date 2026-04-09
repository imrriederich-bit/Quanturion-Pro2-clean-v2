import { Alert, Linking } from "react-native";
import { SCREENS } from "../constants/screens";
import { getPriorityLabel, getEffortLabel, getModuleTitle, getSpeedLabel } from "../utils/labels";
import { formatCurrency } from "../utils/number";

const WHATSAPP_NUMBER = "972509101898";

export function buildWhatsAppMessage(module, result, t) {
  const intro =
    module === SCREENS.tax
      ? t.taxMessageIntro
      : module === SCREENS.mortgage
      ? t.mortgageMessageIntro
      : module === SCREENS.electricity
      ? t.electricityMessageIntro
      : module === SCREENS.insurance
      ? t.insuranceMessageIntro
      : t.premiumMessageIntro;

  return [
    intro,
    "",
    `${t.nextStep}: ${getModuleTitle(module, t)}`,
    `${t.monthlyPotentialLabel}: ${formatCurrency(result.monthlyPotential, "en")} ₪`,
    `${t.annualPotentialLabel}: ${formatCurrency(result.annualPotential, "en")} ₪`,
    `${t.priority}: ${getPriorityLabel(result.priorityScore, t)}`,
    `${t.confidence}: ${result.confidence}/100`,
    `${t.effort}: ${getEffortLabel(result.effort, t)}`,
    `${t.nextStep}: ${result.insights.steps[0]}`,
    `${t.benchmark}: ${result.benchmark}`,
    `${t.optimizedPayment}: ${
      typeof result.optimizedPayment === "number"
        ? `${formatCurrency(result.optimizedPayment, "en")} ₪`
        : "-"
    }`,
    `${t.bestTariff}: ${
      typeof result.estimatedConsumption === "number" ? result.primaryValue : "-"
    }`,
    `${t.documents}: ${result.insights.docs.join(", ")}`,
    `${t.nextStep} ETA: ${getSpeedLabel(result.speedDays, t)}`,
  ].join("\n");
}

export async function openWhatsApp(message, t) {
  const encoded = encodeURIComponent(message);
  const appUrl = `whatsapp://send?phone=${WHATSAPP_NUMBER}&text=${encoded}`;
  const webUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;

  try {
    const appSupported = await Linking.canOpenURL(appUrl);

    if (appSupported) {
      await Linking.openURL(appUrl);
      return;
    }

    const webSupported = await Linking.canOpenURL(webUrl);

    if (webSupported) {
      await Linking.openURL(webUrl);
      return;
    }

    Alert.alert("WhatsApp", t.whatsappFail);
  } catch (error) {
    try {
      await Linking.openURL(webUrl);
    } catch (fallbackError) {
      Alert.alert("WhatsApp", t.whatsappFail);
    }
  }
}
