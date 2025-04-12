import dayjs from "dayjs";
import { t } from "i18next";
import * as yup from "yup";

export const getSelectedType = typeFilters => {
  if (!typeFilters) return null;

  const selectedTypes = Object.keys(typeFilters).filter(
    key => typeFilters[key]
  );

  return selectedTypes.length === 0 ||
    selectedTypes.length === Object.keys(typeFilters).length
    ? null
    : selectedTypes[0];
};

export const yearSchema = yup
  .number()
  .typeError(t("filter.validations.typeError"))
  .test("exact-length", t("filter.validations.exactLength"), value =>
    /^\d{4}$/.test(value?.toString())
  )
  .min(
    1888,
    t("filter.validations.range", { min: 1888, max: dayjs().year() + 5 })
  )
  .max(
    dayjs().year() + 5,
    t("filter.validations.max", { max: dayjs().year() + 5 })
  )
  .nullable()
  .transform(value => (isNaN(value) ? null : value));
