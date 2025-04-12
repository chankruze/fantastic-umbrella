import { memo } from "react";

import { getPropWithFallback } from "components/Movies/List/Card/utils";
import { Typography } from "neetoui";
import { Trans } from "react-i18next";

const Card = ({ movie }) => {
  const title = getPropWithFallback("title", "Unknown Title", movie);
  const imdbRating = getPropWithFallback("imdbRating", 0, movie);

  return (
    <div className="flex items-center justify-between rounded-lg border border-l-4 border-gray-300 bg-white p-4 shadow transition-shadow duration-300 hover:shadow-md">
      <Trans
        i18nKey="favourites.movieTitle"
        values={{ title }}
        components={{
          typography: (
            <Typography className="font-bold text-gray-900" variant="h3" />
          ),
        }}
      />
      <p className="flex items-center gap-2">
        <Trans
          i18nKey="favourites.movieRating"
          values={{ imdbRating }}
          components={{
            span1: (
              <Typography
                className="font-bold text-gray-500"
                style="body3"
                variant="span"
              />
            ),
            span2: (
              <Typography
                className="font-medium"
                style="body2"
                variant="span"
              />
            ),
          }}
        />
      </p>
    </div>
  );
};

export default memo(Card);
