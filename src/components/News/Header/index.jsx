import { Button, Tag } from "@bigbinary/neetoui";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { Typography } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import Filter from "./Filter";
import SearchBar from "./SearchBar";
import Sources from "./Sources";

import {
  flatQueryParams,
  removeTagFromQueryParams,
  updateSearchTermInQueryParams,
} from "../utils";

const Header = ({ totalResults }) => {
  const history = useHistory();

  const { t } = useTranslation();

  const queryParams = useQueryParams();

  const tags = flatQueryParams(queryParams);

  const clearAll = useFuncDebounce(() =>
    updateSearchTermInQueryParams("", queryParams, history)
  );

  const handleTagClose = (key, val) => {
    console.log({ key, val });
    removeTagFromQueryParams(queryParams, key, val, history);
  };

  return (
    <div className="space-y-2 border-b p-4">
      <div className="flex items-center">
        <div className="flex flex-1 items-center gap-4">
          <Typography className="font-bold" style="h1">
            {t("News Mode")}
          </Typography>
          <Sources />
          <Filter />
        </div>
        <SearchBar />
      </div>
      {!isEmpty(queryParams) && (
        <div className="flex items-center gap-4">
          <Typography className="font-medium" style="h5">
            {totalResults} results
          </Typography>
          <div className="flex items-center gap-2">
            {tags.map(obj =>
              Object.entries(obj)
                .filter(([_, val]) => Boolean(val))
                .map(([key, val]) => (
                  <Tag
                    className="capitalize"
                    data-query-key={key}
                    key={val}
                    label={val}
                    style="outline"
                    onClose={() => handleTagClose(key, val)}
                  />
                ))
            )}
            <Button
              className="py-1 text-xs text-gray-500"
              size="small"
              style="text"
              onClick={clearAll}
            >
              {t("news.clearAll")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
