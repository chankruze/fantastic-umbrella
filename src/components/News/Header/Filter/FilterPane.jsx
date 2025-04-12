import { useState } from "react";

import dayjs from "dayjs";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Button, DatePicker, Input, Pane, Select, Typography } from "neetoui";
import { assoc } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import { getNewsCategoryOptions } from "./utils";

const FilterPane = ({ isOpen, closePane }) => {
  const [searchKey, setSearchKey] = useState("");
  const [publicationDate, setPublicationDate] = useState(dayjs());
  const [newsCategories, setNewsCategories] = useState(
    () => getNewsCategoryOptions()[0]
  );

  const { t } = useTranslation();

  const history = useHistory();

  const queryParams = useQueryParams();

  const newsCategoryOptions = getNewsCategoryOptions();

  const updateFiltersInQueryParams = useFuncDebounce(
    ({ categories = [], publicationDate, keywords }) => {
      let updatedQueryParams = { ...queryParams };

      if (categories.length > 0) {
        updatedQueryParams = assoc(
          "category",
          categories.join(","),
          updatedQueryParams
        );
      }

      if (publicationDate) {
        updatedQueryParams = assoc(
          "from",
          dayjs(publicationDate).format("YYYY-MM-DD"),
          updatedQueryParams
        );
      }

      if (keywords) {
        updatedQueryParams = assoc("searchTerm", keywords, updatedQueryParams);
      }

      history.replace(
        buildUrl(routes.news.index, filterNonNull(updatedQueryParams))
      );
    }
  );

  const handleSearchKeyChange = ({ target: { value } }) => {
    updateFiltersInQueryParams({ keywords: value });
    setSearchKey(value);
  };

  const handleCategoryChange = selectedOptions => {
    setNewsCategories(selectedOptions);
    const selectedCategories = selectedOptions.map(option => option.value);
    updateFiltersInQueryParams({ categories: selectedCategories });
  };

  const handlePublicationDateChange = selectedDate => {
    setPublicationDate(selectedDate);
    updateFiltersInQueryParams({ publicationDate: selectedDate });
  };

  console.log(publicationDate);

  return (
    <Pane closeOnEsc isOpen={isOpen} onClose={closePane}>
      <Pane.Header>
        <Typography className="text-xl font-bold" style="h2" weight="bold">
          title
        </Typography>
      </Pane.Header>
      <Pane.Body>
        <div className="w-full space-y-4">
          <Input
            required
            className="w-full flex-grow-0"
            label="Keyword or a phrase"
            placeholder="Enter keyword"
            value={searchKey}
            onChange={handleSearchKeyChange}
          />
          <Select
            isMulti
            className="w-full"
            label={t("news.list.category")}
            options={newsCategoryOptions}
            placeholder={t("news.list.selectSource")}
            value={newsCategories}
            onChange={handleCategoryChange}
          />
          <DatePicker
            className="flex-grow-1 "
            label="Date of publication"
            picker="date"
            placeholder="Select publication date"
            type="date"
            onChange={handlePublicationDateChange}
          />
        </div>
      </Pane.Body>
      <Pane.Footer className="flex space-x-2">
        <Button label="Done" style="primary" />
        <Button label="Clear all" style="secondary" />
      </Pane.Footer>
    </Pane>
  );
};

export default FilterPane;
