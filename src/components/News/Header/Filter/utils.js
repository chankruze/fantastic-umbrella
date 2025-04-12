import { t } from "i18next";

export const getNewsCategoryOptions = () => [
  { label: t("categories.business"), value: "business" },
  { label: t("categories.entertainment"), value: "entertainment" },
  { label: t("categories.general"), value: "general" },
  { label: t("categories.health"), value: "health" },
  { label: t("categories.science"), value: "science" },
  { label: t("categories.sports"), value: "sports" },
  { label: t("categories.technology"), value: "technology" },
];
