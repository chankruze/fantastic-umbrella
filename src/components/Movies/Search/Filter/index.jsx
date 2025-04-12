import { memo, useCallback, useState } from "react";

import classNames from "classnames";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { Close, Filter as FilterIcon } from "neetoicons";
import { Button, Checkbox, Input, Label, Typography } from "neetoui";
import { filter } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import { FILTER_DEFAULTS, FILTER_TYPES } from "./constants";
import { getSelectedType, yearSchema } from "./utils";

const Filter = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [yearError, setYearError] = useState("");
  const [filters, setFilters] = useState(FILTER_DEFAULTS);

  const history = useHistory();

  const { t } = useTranslation();

  const queryParams = useQueryParams();

  const updateFiltersInQueryParams = useFuncDebounce(({ year, type }) => {
    history.replace(
      buildUrl(
        routes.movies.index,
        filter(Boolean, {
          ...queryParams,
          year,
          type: getSelectedType(type),
        })
      )
    );
  });

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen(prev => !prev);
  }, []);

  const handleYearChange = async ({ target: { value } }) => {
    setFilters(prev => ({ ...prev, year: value }));

    try {
      setYearError("");
      await yearSchema.validate(value);
      updateFiltersInQueryParams({ ...filters, year: value });
    } catch (error) {
      setYearError(error.message);
    }
  };

  const handleTypeChange = ({ target: { name, checked } }) => {
    setFilters(prev => {
      const updatedFilters = {
        ...prev,
        type: { ...prev.type, [name]: checked },
      };
      updateFiltersInQueryParams(updatedFilters);

      return updatedFilters;
    });
  };

  return (
    <div className="relative">
      <Button
        icon={FilterIcon}
        style="secondary"
        tooltipProps={{ content: t("filter.filter") }}
        onClick={toggleDropdown}
      />
      <div
        className={classNames(
          "absolute right-0 z-10 mt-4 w-64 space-y-2 rounded-lg bg-white p-4 shadow-lg",
          { hidden: !isDropdownOpen }
        )}
      >
        <Button
          className="float-right"
          icon={Close}
          style="icon"
          tooltipProps={{ content: t("filter.close") }}
          onClick={toggleDropdown}
        />
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="year-filter">
              <Typography style="h4" weight="bold">
                {t("filter.year")}
              </Typography>
            </Label>
            <Input
              error={yearError}
              id="year-filter"
              placeholder={t("filter.yearPlaceholder")}
              type="number"
              value={filters.year}
              onChange={handleYearChange}
            />
          </div>
          <div className="space-y-3">
            <Typography style="h4" weight="bold">
              {t("filter.type")}
            </Typography>
            <div className="flex flex-wrap items-center justify-between gap-2">
              {FILTER_TYPES.map(type => (
                <Checkbox
                  checked={filters.type[type.value]}
                  key={type.value}
                  label={type.label}
                  name={type.value}
                  onChange={handleTypeChange}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Filter);
