export function normalizeNumberInput(value) {
  return value.replace(/,/g, ".").replace(/[^0-9.]/g, "");
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function formatCurrency(value, lang = "de") {
  const numeric = Number.isFinite(value) ? value : Number(value) || 0;
  const locale = lang === "he" ? "en-US" : lang;
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(Math.round(numeric));
}
