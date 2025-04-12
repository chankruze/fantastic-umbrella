import { filterNonNull } from "neetocist";
import { assoc } from "ramda";
import routes from "routes";
import { buildUrl } from "utils/url";

export const updateSearchTermInQueryParams = (
  searchTerm,
  queryParams,
  history
) => {
  history.replace(
    buildUrl(
      routes.news.index,
      filterNonNull(
        assoc("searchTerm", searchTerm || null, searchTerm ? queryParams : {})
      )
    )
  );
};

export const flatQueryParams = obj =>
  Object.entries(obj).reduce((acc, [key, values]) => {
    const valueArray = values.split(",");

    return acc.concat(valueArray.map(value => ({ [key]: value })));
  }, []);

export const removeTagFromQueryParams = (queryParams, key, value, history) => {
  const updatedQueryParams = { ...queryParams };

  if (key in updatedQueryParams) {
    const currentValue = updatedQueryParams[key];
    const values = currentValue.split(",");

    const filteredValues = values.filter(val => val.trim() !== value.trim());

    if (filteredValues.length > 0) {
      updatedQueryParams[key] = filteredValues.join(",");
    } else {
      delete updatedQueryParams[key];
    }
  }

  return history.replace(buildUrl(routes.news.index, updatedQueryParams));
};
