import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const LanguageDropdownSwitcher: React.FC<{
  onChange?: (locale: string) => unknown;
}> = ({ onChange }) => {
  const { i18n } = useTranslation();

  // const { language: currentLanguage, options } = i18n;
  const { options } = i18n;

  const locales = (options.supportedLngs as string[]).filter(
    (locale) => locale.toLowerCase() !== "cimode"
  );

  // const languageNames = useMemo(() => {
  //   return new Intl.DisplayNames([currentLanguage], {
  //     type: "region",
  //   });
  // }, [currentLanguage]);

  const [value, setValue] = useState(i18n.language);

  const languageChanged = useCallback(
    async (locale: string) => {
      setValue(locale);

      if (onChange) {
        onChange(locale);
      }

      await i18n.changeLanguage(locale);
      // only refresh the page if it's home page
      if (window.location.pathname === "/") {
        window.location.reload();
      }
    },
    [i18n, onChange]
  );

  return (
    <Select value={value} onValueChange={languageChanged}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {locales.map((locale) => {
          // const label = capitalize(languageNames.of(locale) ?? locale);
          // const label = locale === 'vn' ? '🇻🇳' : '🇬🇧';
          const label = locale === "vn" ? "Tiếng Việt" : "English";

          const option = {
            value: locale,
            label,
          };

          return (
            <SelectItem value={option.value} key={option.value}>
              {option.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

// function capitalize(lang: string) {
//   return lang.slice(0, 1).toUpperCase() + lang.slice(1);
// }

export default LanguageDropdownSwitcher;
