export function transAttribute(
  language: string,
  textVN: string,
  textEN: string
) {
  return language === "en" ? textEN : textVN;
}
