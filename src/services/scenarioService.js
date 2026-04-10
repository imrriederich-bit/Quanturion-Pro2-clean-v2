import { SCREENS } from "../constants/screens";
import { formatCurrency } from "../utils/number";
import { ELECTRICITY_TARIFFS } from "../data/tariffs";
import { INSURANCE_PROVIDERS } from "../data/providers";

function buildTaxScenario(form) {
  const salary = Number(form.salary || 0);
  const children = Number(form.children || 0);

  const employerFactor = form.jobChanges === "yes" ? 1 : 0;
  const gapFactor = form.gap === "yes" ? 1 : 0;
  const donationFactor = form.donations === "yes" ? 1 : 0;
  const pensionFactor = form.pension === "yes" ? 1 : 0;
  const familyFactor =
    form.familyStatus === "married" ? 1 : form.familyStatus === "single_parent" ? 1.2 : 0.6;

  const monthlyPotential = Math.max(
    80,
    Math.round(
      salary * 0.006 +
        children * 45 +
        employerFactor * 90 +
        gapFactor * 70 +
        donationFactor * 55 +
        pensionFactor * 60 +
        familyFactor * 40
    )
  );

  const annualPotential = monthlyPotential * 12;
  const confidence = 82;
  const readiness = 74;
  const priorityScore = 76;

  return {
    primaryLabelKey: "quickSummary",
    primaryValue: `${formatCurrency(monthlyPotential, "en")} ₪`,
    monthlyPotential,
    annualPotential,
    confidence,
    readiness,
    priorityScore,
    effort: "medium",
    speedDays: 21,
    benchmark: `${formatCurrency(annualPotential, "en")} ₪ / year`,
    insights: {
      why: "taxWhy",
      steps: ["taxStep1", "taxStep2", "taxStep3"],
      docs: ["taxDoc1", "taxDoc2", "taxDoc3"],
    },
  };
}

function buildMortgageScenario(form) {
  const amount = Number(form.amount || 0);
  const years = Number(form.years || 0);
  const rate = Number(form.rate || 0);
  const currentPayment = Number(form.currentPayment || 0);

  const monthlyPotential = Math.max(
    120,
    Math.round(amount * 0.00025 + years * 10 + Math.max(0, rate - 3.5) * 70 + currentPayment * 0.03)
  );

  const annualPotential = monthlyPotential * 12;
  const confidence = 79;
  const readiness = 66;
  const priorityScore = 88;
  const optimizedPayment =
    currentPayment > 0 ? Math.max(0, Math.round(currentPayment - monthlyPotential)) : undefined;

  return {
    primaryLabelKey: "optimizedPayment",
    primaryValue:
      typeof optimizedPayment === "number"
        ? `${formatCurrency(optimizedPayment, "en")} ₪`
        : `${formatCurrency(monthlyPotential, "en")} ₪`,
    monthlyPotential,
    annualPotential,
    confidence,
    readiness,
    priorityScore,
    effort: "advanced",
    speedDays: 21,
    benchmark: `${formatCurrency(amount, "en")} ₪ loan base`,
    optimizedPayment,
    insights: {
      why: "mortgageWhy",
      steps: ["mortgageStep1", "mortgageStep2", "mortgageStep3"],
      docs: ["mortgageDoc1", "mortgageDoc2", "mortgageDoc3"],
    },
  };
}

function buildElectricityScenario(form) {
  const bill = Number(form.bill || 0);
  const kwh = Number(form.kwh || 0);

  const profileFactor =
    form.profile === "family" ? 1.15 : form.profile === "home_office" ? 1.1 : 1;

  const monthlyPotential = Math.max(
    35,
    Math.round((bill * 0.12 + kwh * 0.08) * profileFactor)
  );

  const annualPotential = monthlyPotential * 12;
  const confidence = 73;
  const readiness = 86;
  const priorityScore = 58;
  const estimatedConsumption = kwh > 0 ? kwh : Math.round(bill * 1.4);
  const bestTariff = ELECTRICITY_TARIFFS?.[0]?.name || "Best tariff";

  return {
    primaryLabelKey: "bestTariff",
    primaryValue: bestTariff,
    monthlyPotential,
    annualPotential,
    confidence,
    readiness,
    priorityScore,
    effort: "low",
    speedDays: 7,
    benchmark: `${formatCurrency(monthlyPotential, "en")} ₪ / month midpoint`,
    estimatedConsumption,
    insights: {
      why: "electricityWhy",
      steps: ["electricityStep1", "electricityStep2", "electricityStep3"],
      docs: ["electricityDoc1", "electricityDoc2", "electricityDoc3"],
    },
  };
}

function buildInsuranceScenario(form) {
  const age = Number(form.age || 0);
  const year = Number(form.year || 0);
  const experience = Number(form.experience || 0);

  const vehicleFactor =
    form.vehicleType === "luxury"
      ? 1.35
      : form.vehicleType === "suv"
      ? 1.2
      : form.vehicleType === "family"
      ? 1.05
      : 0.9;

  const claimsFactor = form.claims === "yes" ? 0.75 : 1.15;
  const recencyFactor = year >= 2022 ? 1.1 : year >= 2018 ? 1 : 0.9;
  const experienceFactor = experience >= 10 ? 1.05 : 0.9;

  const midpoint = Math.round(
    Math.max(90, (age * 1.8 + 45) * vehicleFactor * claimsFactor * recencyFactor * experienceFactor)
  );

  const monthlyPotential = midpoint;
  const annualPotential = monthlyPotential * 12;
  const confidence = 72;
  const readiness = 68;
  const priorityScore = 60;

  return {
    primaryLabelKey: "quickSummary",
    primaryValue: `${formatCurrency(monthlyPotential, "en")} ₪`,
    monthlyPotential,
    annualPotential,
    confidence,
    readiness,
    priorityScore,
    effort: "low",
    speedDays: 14,
    benchmark: `${formatCurrency(midpoint, "en")} ₪ midpoint`,
    providers: INSURANCE_PROVIDERS,
    insights: {
      why: "insuranceWhy",
      steps: ["insuranceStep1", "insuranceStep2", "insuranceStep3"],
      docs: ["insuranceDoc1", "insuranceDoc2", "insuranceDoc3"],
    },
  };
}

export function calculateScenario(module, form) {
  switch (module) {
    case SCREENS.tax:
      return buildTaxScenario(form);
    case SCREENS.mortgage:
      return buildMortgageScenario(form);
    case SCREENS.electricity:
      return buildElectricityScenario(form);
    case SCREENS.insurance:
      return buildInsuranceScenario(form);
    default:
      return null;
  }
}
