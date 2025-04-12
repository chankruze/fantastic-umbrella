import { useSearchNews } from "hooks/reactQuery/useNewsApi";
import useQueryParams from "hooks/useQueryParams";
import { mergeLeft, propOr } from "ramda";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import { DEFAULT_PAGE_NUMBER } from "./constants";
import Header from "./Header";
import ListNews from "./List";

const News = () => {
  const history = useHistory();

  const queryParams = useQueryParams();

  const searchParams = {
    q: propOr(null, "searchTerm", queryParams),
    page: Number(propOr(DEFAULT_PAGE_NUMBER, "page", queryParams)),
    from: propOr(null, "from", queryParams),
    sources: propOr(null, "sources", queryParams),
    category: propOr(null, "category", queryParams),
  };

  const { data: { articles = [], totalResults } = {}, isFetching } =
    useSearchNews(searchParams);

  const handlePageNavigation = page =>
    history.replace(
      buildUrl(routes.news.index, mergeLeft({ page }, queryParams))
    );

  const currentPage = Number(propOr(DEFAULT_PAGE_NUMBER, "page", queryParams));

  return (
    <div className="flex h-screen flex-col">
      <Header totalResults={totalResults} />
      <main className="bg-background flex flex-1 flex-col space-y-4 overflow-y-auto p-4 md:col-span-2 lg:col-span-3">
        <ListNews
          articles={articles}
          currentPage={currentPage}
          handlePageNavigation={handlePageNavigation}
          isFetching={isFetching}
          totalResults={totalResults}
        />
      </main>
    </div>
  );
};

export default News;
