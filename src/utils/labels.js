import { SCREENS } from "../constants/screens";

export function getPriorityLabel(score, t) {
  if (score >= 80) return t.high;
  if (score >= 60) return t.medium;
  return t.low;
}

export function getEffortLabel(level, t) {
  if (level === "high") return t.advanced;
  if (level === "medium") return t.standard;
  return t.simple;
}

export function getSpeedLabel(days, t) {
  if (days <= 7) return t.speed7;
  if (days <= 14) return t.speed14;
  return t.speed21;
}

export function getModuleTitle(module, t) {
  switch (module) {
    case SCREENS.tax:
      return t.tax;
    case SCREENS.mortgage:
      return t.mortgage;
    case SCREENS.electricity:
      return t.electricity;
    case SCREENS.insurance:
      return t.insurance;
    case SCREENS.premium:
      return t.premium;
    case SCREENS.legal:
      return t.legal;
    default:
      return t.dashboard;
  }
}

export function getProfileLabel(value, t) {
  switch (value) {
    case "single":
      return t.single;
    case "couple":
      return t.couple;
    case "home_office":
      return t.homeOffice;
    case "family":
    default:
      return t.family;
  }
}

export function getVehicleLabel(value, t) {
  switch (value) {
    case "mini":
      return t.vehicleMini;
    case "suv":
      return t.vehicleSuv;
    case "luxury":
      return t.vehicleLuxury;
    case "family":
    default:
      return t.vehicleFamily;
  }
}
