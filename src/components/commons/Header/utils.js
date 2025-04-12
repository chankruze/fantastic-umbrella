import { t } from "i18next";

export const extractNavLinks = routes =>
  Object.entries(routes).flatMap(([key, value]) => {
    if (key === "root" || key === "show") {
      return [];
    }

    if (typeof value === "string") {
      return { to: value, label: t(`header.nav.${key}`) };
    }

    if (typeof value === "object" && value.index) {
      return { to: value.index, label: t(`header.nav.${key}`) };
    }

    return extractNavLinks(value);
  });
