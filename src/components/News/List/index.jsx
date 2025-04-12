import { useSearchNews } from "hooks/reactQuery/useNewsApi";
import useQueryParams from "hooks/useQueryParams";
import { keysToSnakeCase } from "neetocist";
import { NoData, Pagination, Spinner } from "neetoui";
import { isEmpty, mergeLeft, propOr } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "./constants";
import NewsCard from "./NewsCard";

const ListNews = () => {
  const history = useHistory();

  const queryParams = useQueryParams();

  const { t } = useTranslation();

  const searchParams = {
    q: propOr(null, "searchTerm", queryParams),
    page: Number(propOr(DEFAULT_PAGE_NUMBER, "page", queryParams)),
    from: propOr(null, "from", queryParams),
    to: propOr(null, "to", queryParams),
    sources: propOr(null, "sources", queryParams),
    category: propOr(null, "category", queryParams),
  };

  const { data: { articles = [], totalResults } = {}, isFetching } =
    useSearchNews(searchParams);

  const handlePageNavigation = page =>
    history.replace(
      buildUrl(routes.news.index, mergeLeft({ page }, queryParams))
    );

  const noNewsAvailable = isEmpty(articles);
  const currentPage = Number(propOr(DEFAULT_PAGE_NUMBER, "page", queryParams));

  return (
    <>
      {isFetching && (
        <div className="flex h-full flex-1 items-center justify-center">
          <Spinner />
        </div>
      )}
      {!isFetching && noNewsAvailable && (
        <NoData
          className="flex h-full flex-1 items-center justify-center"
          description={t("movies.noDataDescription")}
          title={t("movies.noDataTitle")}
        />
      )}
      {!isFetching && !noNewsAvailable && (
        <div className="mx-auto max-w-6xl space-y-3 pb-4">
          {articles.map(article => (
            <NewsCard key={keysToSnakeCase(article.title)} {...article} />
          ))}
        </div>
      )}
      {!noNewsAvailable && (
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

export default ListNews;
