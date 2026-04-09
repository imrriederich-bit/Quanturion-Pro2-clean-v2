export const TARIFF_MODELS = [
  {
    key: "balanced",
    monthlyBase: 18,
    ratePerKwh: 0.54,
    fit: { single: 1.02, couple: 1.01, family: 1.0, home_office: 1.03 },
  },
  {
    key: "smart",
    monthlyBase: 24,
    ratePerKwh: 0.49,
    fit: { single: 1.01, couple: 1.0, family: 0.98, home_office: 0.95 },
  },
  {
    key: "green",
    monthlyBase: 27,
    ratePerKwh: 0.47,
    fit: { single: 1.05, couple: 1.02, family: 0.94, home_office: 0.97 },
  },
];
