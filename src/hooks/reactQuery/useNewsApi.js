import { QUERY_KEYS } from "constants";

import newsApi from "apis/news";
import { useQuery } from "react-query";

export const useSearchNews = params => {
  const queryConfig = {
    queryKey: [QUERY_KEYS.NEWS_SEARCH, params],
    queryFn: async () => newsApi.search(params),
    keepPreviousData: true,
    enabled: !!params.q,
    retryDelay: 1000,
    retry: 1,
  };

  return useQuery(queryConfig);
};
