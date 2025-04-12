import { useSearchMovies } from "hooks/reactQuery/useNewsApi";
import useQueryParams from "hooks/useQueryParams";
import { NoData, Pagination, Spinner } from "neetoui";
import { isEmpty, mergeLeft, propOr } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import Card from "./Card";

import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "../constants";

const List = () => {
  const history = useHistory();

  const queryParams = useQueryParams();

  const { t } = useTranslation();

  const searchParams = {
    s: propOr(null, "searchTerm", queryParams),
    page: Number(propOr(DEFAULT_PAGE_NUMBER, "page", queryParams)),
    y: propOr(null, "year", queryParams),
    type: propOr(null, "type", queryParams),
  };

  const { data: { search: movies = [], totalResults } = {}, isFetching } =
    useSearchMovies(searchParams);

  const handlePageNavigation = page =>
    history.replace(
      buildUrl(routes.movies.index, mergeLeft({ page }, queryParams))
    );

  const noMoviesAvailable = isEmpty(movies);
  const currentPage = Number(propOr(DEFAULT_PAGE_NUMBER, "page", queryParams));

  return (
    <>
      {isFetching && (
        <div className="flex h-full flex-1 items-center justify-center">
          <Spinner />
        </div>
      )}
      {!isFetching && noMoviesAvailable && (
        <NoData
          className="flex h-full flex-1 items-center justify-center"
          description={t("movies.noDataDescription")}
          title={t("movies.noDataTitle")}
        />
      )}
      {!isFetching && !noMoviesAvailable && (
        <div className="grid grid-cols-2 justify-items-center gap-2 overflow-y-auto pb-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4">
          {movies.map(movie => (
            <Card key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
      {!noMoviesAvailable && (
        <div className="flex justify-center py-2">
          <Pagination
            count={totalResults}
            navigate={handlePageNavigation}
            pageNo={currentPage}
            pageSize={DEFAULT_PAGE_SIZE}
          />
        </div>
      )}
    </>
  );
};

export default List;
