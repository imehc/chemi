import { useTranslations, useLocale } from "next-intl";
import {} from "next/navigation";
import Link from "next/link";
import { locales } from "~/config";
import { Switch } from "./switch";

export const Footer = () => {
  const t = useTranslations("Basic");
  const lng = useLocale() as (typeof locales)[number];
  return (
    <footer style={{ margin: 20 }}>
      <span>{t("languageSwitcher", { lng })}</span>
      <Switch locales={locales} lng={lng} />
    </footer>
  );
};
