import { Pathnames } from "next-intl/navigation";

export const locales = ["zh", "zh-TW", "en-US"] as const;
export const defaultLocale = "zh";

export const pathnames = {
  '/': '/',
} satisfies Pathnames<typeof locales>;
