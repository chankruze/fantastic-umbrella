import { memo, useState } from "react";

import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Search } from "neetoicons";
import { Input } from "neetoui";
import { assoc } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

const SearchBar = () => {
  const [searchKey, setSearchKey] = useState("");

  const { t } = useTranslation();

  const history = useHistory();

  const queryParams = useQueryParams();

  const updateSearchTermInQueryParams = useFuncDebounce(searchTerm => {
    history.replace(
      buildUrl(
        routes.news.index,
        filterNonNull(
          assoc("searchTerm", searchTerm || null, searchTerm ? queryParams : {})
        )
      )
    );
  });

  const handleSearchKeyChange = ({ target: { value } }) => {
    updateSearchTermInQueryParams(value);
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
