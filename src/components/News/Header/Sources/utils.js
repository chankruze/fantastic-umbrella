import { t } from "i18next";

export const getNewsSourceOptions = () => [
  { label: t("sources.bbcNews"), value: "bbc-news" },
  { label: t("sources.theVerge"), value: "the-verge" },
  { label: t("sources.businessInsider"), value: "business-insider" },
  { label: t("sources.time"), value: "time" },
  { label: t("sources.theNextWeb"), value: "the-next-web" },
  { label: t("sources.abcNews"), value: "abc-news" },
  { label: t("sources.engadget"), value: "engadget" },
  {
    label: t("sources.entertainmentWeekly"),
    value: "entertainmentWeekly",
  },
  { label: t("sources.espn"), value: "espn" },
  { label: t("sources.financialPost"), value: "financial-post" },
];
