import strings from "./strings";

export function getText(lang) {
  return strings[lang] || strings.en;
}
