import { keysToSnakeCase } from "neetocist";
import { NoData, Pagination, Spinner } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import NewsCard from "./NewsCard";

import { DEFAULT_PAGE_SIZE } from "../constants";

const ListNews = ({
  articles,
  isFetching,
  totalResults,
  handlePageNavigation,
  currentPage,
}) => {
  const { t } = useTranslation();

  const noNewsAvailable = isEmpty(articles);

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
