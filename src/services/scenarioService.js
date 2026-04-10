import { SCREENS } from "../constants/screens";
import { TARIFF_MODELS } from "../data/tariffs";
import { INSURANCE_PROVIDERS } from "../data/providers";
import { clamp, formatCurrency } from "../utils/number";

const INTERNAL_MORTGAGE_RATE = 4.54;

function calculateMonthlyPayment(principal, annualRate, years) {
  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;

  if (!months) return 0;
  if (!monthlyRate) return principal / months;

  const factor = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * factor) / (factor - 1);
}

function getProfileMultiplier(profile) {
  switch (profile) {
    case "single":
      return 0.88;
    case "couple":
      return 1;
    case "home_office":
      return 1.14;
    case "family":
    default:
      return 1.2;
  }
}

function getVehicleBase(type) {
  switch (type) {
    case "mini":
      return 2800;
    case "suv":
      return 4100;
    case "luxury":
      return 5600;
    case "family":
    default:
      return 3400;
  }
}

function buildTaxScenario(form) {
  const salary = parseFloat(form.salary);
  const children = parseFloat(form.children || "0");

  if (!salary || !form.familyStatus) return null;

  let annual = salary * 12;
  if (form.salaryType === "net") annual *= 1.28;
  if (form.salaryType === "unknown") annual *= 1.18;

  let base = annual * 0.055;
  if (form.jobChanges === "yes") base += annual * 0.012;
  if (form.gap === "yes") base += annual * 0.014;
  if (form.donations === "yes") base += annual * 0.004;
  if (form.pension === "yes") base += annual * 0.0035;
  if (form.familyStatus === "married") base += 700;
  if (form.familyStatus === "single_parent") base += 1200;
  if (children > 0) base += children * 480;
  if (form.lastCheck === "never") base *= 1.16;
  if (form.lastCheck === "3plus") base *= 1.08;

  const rangeMin = Math.max(Math.round(base * 0.72), 600);
  const rangeMax = Math.max(Math.round(base * 1.2), rangeMin + 400);
  const annualPotential = Math.round((rangeMin + rangeMax) / 2);
  const monthlyPotential = Math.round(annualPotential / 12);

  const confidence = clamp(
    62 +
      (form.jobChanges === "yes" ? 8 : 0) +
      (form.gap === "yes" ? 7 : 0) +
      (children > 0 ? 5 : 0) +
      (form.donations === "yes" ? 3 : 0),
    60,
    93
  );

  const priorityScore = clamp(
    48 +
      (form.lastCheck === "never" ? 20 : form.lastCheck === "3plus" ? 12 : 5) +
      (form.jobChanges === "yes" ? 10 : 0) +
      (form.gap === "yes" ? 10 : 0) +
      (children > 0 ? 6 : 0) +
      (form.familyStatus === "single_parent" ? 6 : 0),
    45,
    96
  );

  return {
    module: SCREENS.tax,
    primaryLabelKey: "annualPriceBand",
    primaryValue: `${formatCurrency(rangeMin, "en")}-${formatCurrency(rangeMax, "en")} ₪`,
    monthlyPotential,
    annualPotential,
    confidence,
    readiness: clamp(confidence + 4, 60, 96),
    priorityScore,
    effort: priorityScore > 82 ? "medium" : "low",
    speedDays: priorityScore > 75 ? 7 : 14,
    benchmark: `${formatCurrency(rangeMin, "en")}-${formatCurrency(rangeMax, "en")} ₪ / year`,
    insights: {
      why: "A structured tax review often uncovers unused credits after family or employment changes.",
      steps: [
        "Validate salary basis and family information.",
        "Review credits, employer changes and interruption periods.",
        "Prepare a structured document package for review.",
      ],
      docs: [
        "12 payslips",
        "Annual tax overview",
        "Proof of donations, leave or employer changes",
      ],
    },
  };
}

function buildMortgageScenario(form) {
  const principal = parseFloat(form.amount);
  const years = parseFloat(form.years);
  const rate = form.rate.trim() === "" ? null : parseFloat(form.rate);
  const monthly = form.currentPayment.trim() === "" ? null : parseFloat(form.currentPayment);

  if (!principal || !years || (rate === null && monthly === null)) return null;
  if ((rate !== null && Number.isNaN(rate)) || (monthly !== null && Number.isNaN(monthly))) {
    return null;
  }

  const currentPayment =
    rate !== null ? calculateMonthlyPayment(principal, rate, years) : monthly;
  const optimizedPayment = calculateMonthlyPayment(
    principal,
    INTERNAL_MORTGAGE_RATE,
    years
  );

  const monthlyPotential = Math.max(Math.round(currentPayment - optimizedPayment), 0);
  const annualPotential = monthlyPotential * 12;
  const confidence = clamp(61 + (rate !== null ? 15 : 0) + (monthly !== null ? 10 : 0), 60, 93);
  const priorityScore = clamp(
    52 + (annualPotential > 8000 ? 18 : 8) + (principal > 1000000 ? 8 : 0),
    50,
    95
  );

  return {
    module: SCREENS.mortgage,
    primaryLabelKey: "monthlyPotentialLabel",
    primaryValue: `${formatCurrency(monthlyPotential, "en")} ₪ / month`,
    monthlyPotential,
    annualPotential,
    confidence,
    readiness: clamp(confidence + (annualPotential > 6000 ? 6 : 2), 60, 95),
    priorityScore,
    effort: annualPotential > 12000 ? "medium" : "low",
    speedDays: annualPotential > 12000 ? 21 : 14,
    benchmark: `${formatCurrency(currentPayment, "en")} → ${formatCurrency(
      optimizedPayment,
      "en"
    )} ₪`,
    optimizedPayment,
    insights: {
      why: "An outdated mortgage structure is often the single strongest monthly savings lever.",
      steps: [
        "Validate the current loan structure and rate mix.",
        "Compare refinancing scenarios against a realistic target rate.",
        "Escalate only if the savings justify the effort.",
      ],
      docs: ["Current mortgage schedule", "Bank summary", "Rate structure"],
    },
  };
}

function buildElectricityScenario(form) {
  const bill = parseFloat(form.bill);
  const kwh = form.kwh.trim() === "" ? null : parseFloat(form.kwh);

  if (!bill || Number.isNaN(bill)) return null;

  const profile = form.profile || "family";
  const estimatedConsumption = kwh
    ? kwh
    : Math.max(160, (bill - 28) / 0.6) * getProfileMultiplier(profile);

  const evaluated = TARIFF_MODELS.map((model) => {
    const fit = model.fit[profile] || 1;
    const monthlyCost = model.monthlyBase + estimatedConsumption * model.ratePerKwh * fit;

    return { ...model, monthlyCost };
  }).sort((a, b) => a.monthlyCost - b.monthlyCost);

  const best = evaluated[0];
  const monthlyPotential = Math.max(Math.round(bill - best.monthlyCost), 0);
  const annualPotential = monthlyPotential * 12;
  const confidence = clamp(66 + (kwh ? 14 : 0) + (profile ? 8 : 0), 62, 91);
  const priorityScore = clamp(58 + (monthlyPotential > 90 ? 14 : 8) + (kwh ? 6 : 0), 55, 92);

  return {
    module: SCREENS.electricity,
    primaryLabelKey: "bestTariff",
    primaryValue:
      best.key === "balanced"
        ? "Balanced Fix"
        : best.key === "smart"
        ? "Smart Flex"
        : "Green Family",
    monthlyPotential,
    annualPotential,
    confidence,
    readiness: clamp(confidence + 6, 64, 94),
    priorityScore,
    effort: best.key === "smart" ? "medium" : "low",
    speedDays: 7,
    benchmark: `${formatCurrency(best.monthlyCost, "en")} ₪ / month`,
    estimatedConsumption: Math.round(estimatedConsumption),
    insights: {
      why: "Electricity is usually the fastest operational win even when the absolute savings are smaller.",
      steps: [
        "Validate the current bill and provider.",
        "Confirm the usage profile and tariff fit.",
        "Switch only if the upside stays visible after the final check.",
      ],
      docs: ["Latest electricity bill", "Customer number", "Usage data if known"],
    },
  };
}

function buildInsuranceScenario(form) {
  const age = parseFloat(form.age);
  const year = parseFloat(form.year);
  const experience = parseFloat(form.experience);

  if (!age || !year || !experience || !form.vehicleType) return null;

  let base = getVehicleBase(form.vehicleType);

  if (age < 24) base *= 1.32;
  else if (age < 30) base *= 1.12;
  else if (age > 55) base *= 1.05;

  if (experience < 2) base *= 1.28;
  else if (experience < 5) base *= 1.12;
  else if (experience > 12) base *= 0.95;

  const currentYear = new Date().getFullYear();
  const vehicleAge = currentYear - year;

  if (vehicleAge <= 2) base *= 1.08;
  else if (vehicleAge >= 10) base *= 0.94;

  if (form.claims === "yes") base *= 1.22;

  const rangeMin = Math.round(base * 0.9);
  const rangeMax = Math.round(base * 1.17);
  const midpoint = Math.round((rangeMin + rangeMax) / 2);
  const annualPotential = Math.max(Math.round((rangeMax - rangeMin) * 0.55), 350);

  const confidence = clamp(69 + (experience ? 8 : 0) + (form.claims ? 6 : 0), 64, 92);
  const priorityScore = clamp(
    56 + (form.claims === "no" ? 8 : 0) + (age > 25 ? 6 : 0),
    55,
    88
  );

  return {
    module: SCREENS.insurance,
    primaryLabelKey: "annualPriceBand",
    primaryValue: `${formatCurrency(rangeMin, "en")}-${formatCurrency(rangeMax, "en")} ₪`,
    monthlyPotential: Math.round(annualPotential / 12),
    annualPotential,
    confidence,
    readiness: clamp(confidence + 3, 64, 93),
    priorityScore,
    effort: "low",
    speedDays: 14,
    benchmark: `${formatCurrency(midpoint, "en")} ₪ midpoint`,
    rangeMin,
    rangeMax,
    providers: INSURANCE_PROVIDERS,
  insights: {
  why: "insuranceWhy",
  steps: ["insuranceStep1", "insuranceStep2", "insuranceStep3"],
  docs: ["insuranceDoc1", "insuranceDoc2", "insuranceDoc3"],
  }
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
