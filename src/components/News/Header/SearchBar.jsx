import { memo, useState } from "react";

import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { Search } from "neetoicons";
import { Input } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { updateSearchTermInQueryParams } from "../utils";

const SearchBar = () => {
  const [searchKey, setSearchKey] = useState("");

  const { t } = useTranslation();

  const history = useHistory();

  const queryParams = useQueryParams();

  const updateSearchParams = useFuncDebounce(searchTerm =>
    updateSearchTermInQueryParams(searchTerm, queryParams, history)
  );

  const handleSearchKeyChange = ({ target: { value } }) => {
    updateSearchParams(value);
    setSearchKey(value);
  };

  return (
    <Input
      className="w-96 flex-grow-0"
      placeholder={t("movies.searchPlaceholder")}
      suffix={<Search />}
      type="search"
      value={searchKey}
      onChange={handleSearchKeyChange}
    />
  );
};

export default memo(SearchBar);
