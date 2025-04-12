import {
  NEWS_API_EVERYTHING_ENDPOINT,
  NEWS_API_TOP_HEADLINES_ENDPOINT,
} from "constants";

import axios from "axios";

const search = params => {
  if (params.category) {
    const { sources, ...rest } = params;
    console.log(sources);

    return axios.get(NEWS_API_TOP_HEADLINES_ENDPOINT, {
      params: { ...rest, pageSize: 4 },
    });
  }

  return axios.get(NEWS_API_EVERYTHING_ENDPOINT, {
    params: { ...params, pageSize: 4 },
  });
};

const moviesApi = { search };

export default moviesApi;
