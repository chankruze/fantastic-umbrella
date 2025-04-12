import { memo, useRef, useState } from "react";

import useFuncDebounce from "hooks/useFuncDebounce";
import useKeyboardShortcut from "hooks/useKeyboardShortcut";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Search } from "neetoicons";
import { Input, Kbd } from "neetoui";
import { assoc } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

const Bar = () => {
  const [searchKey, setSearchKey] = useState("");

  const searchInputRef = useRef(null);

  const { t } = useTranslation();

  const history = useHistory();

  const queryParams = useQueryParams();

  const updateSearchTermInQueryParams = useFuncDebounce(searchTerm => {
    history.replace(
      buildUrl(
        routes.movies.index,
        filterNonNull(
          assoc("searchTerm", searchTerm || null, searchTerm ? queryParams : {})
        )
      )
    );
  });

  useKeyboardShortcut("/", () => {
    searchInputRef.current?.focus();
  });

  const handleSearchKeyChange = ({ target: { value } }) => {
    updateSearchTermInQueryParams(value);
    setSearchKey(value);
  };

  return (
    <Input
      className="w-full"
      placeholder={t("movies.searchPlaceholder")}
      prefix={<Search />}
      ref={searchInputRef}
      suffix={<Kbd keyName="/" />}
      type="search"
      value={searchKey}
      onChange={handleSearchKeyChange}
    />
  );
};

export default memo(Bar);
