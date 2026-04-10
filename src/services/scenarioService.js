import { SCREENS } from "../constants/screens";

const INSURANCE_PROVIDERS = ["Harel", "Clal", "Phoenix"];

function buildInsuranceScenario(form) {
  const monthlyPotential = 120;
  const annualPotential = monthlyPotential * 12;

  return {
    primaryLabelKey: "quickSummary",
    primaryValue: "Insurance optimization",

    monthlyPotential,
    annualPotential,

    confidence: 72,
    readiness: 68,
    priorityScore: 60,

    effort: "low",
    speedDays: 14,

    benchmark: "Market average",
    providers: INSURANCE_PROVIDERS,

    insights: {
      why: "insuranceWhy",
      steps: ["insuranceStep1", "insuranceStep2", "insuranceStep3"],
      docs: ["insuranceDoc1", "insuranceDoc2", "insuranceDoc3"],
    },
  };
}

function buildTaxScenario(form) {
  return {
    primaryLabelKey: "quickSummary",
    primaryValue: "Tax optimization",
    monthlyPotential: 200,
    annualPotential: 2400,
    confidence: 80,
    readiness: 70,
    priorityScore: 75,
    effort: "medium",
    speedDays: 21,
    benchmark: "Tax baseline",
    insights: {
      why: "taxWhy",
      steps: ["taxStep1", "taxStep2", "taxStep3"],
      docs: ["taxDoc1", "taxDoc2", "taxDoc3"],
    },
  };
}

function buildMortgageScenario(form) {
  return {
    primaryLabelKey: "quickSummary",
    primaryValue: "Mortgage optimization",
    monthlyPotential: 450,
    annualPotential: 5400,
    confidence: 78,
    readiness: 65,
    priorityScore: 85,
    effort: "high",
    speedDays: 21,
    benchmark: "Mortgage baseline",
    insights: {
      why: "mortgageWhy",
      steps: ["mortgageStep1", "mortgageStep2", "mortgageStep3"],
      docs: ["mortgageDoc1", "mortgageDoc2", "mortgageDoc3"],
    },
  };
}

function buildElectricityScenario(form) {
  return {
    primaryLabelKey: "quickSummary",
    primaryValue: "Electricity optimization",
    monthlyPotential: 80,
    annualPotential: 960,
    confidence: 65,
    readiness: 85,
    priorityScore: 55,
    effort: "low",
    speedDays: 7,
    benchmark: "Energy baseline",
    insights: {
      why: "electricityWhy",
      steps: ["electricityStep1", "electricityStep2", "electricityStep3"],
      docs: ["electricityDoc1", "electricityDoc2", "electricityDoc3"],
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
