import { RatingFilled } from "neetoicons";
import { Typography } from "neetoui";
import { isEmpty } from "ramda";
import { Trans, useTranslation } from "react-i18next";
import useFavouriteMoviesStore from "stores/useFavouriteMoviesStore";
import withTitle from "utils/withTitle";

import Card from "./Card";

import { Header } from "../commons";

const Favourites = () => {
  const { t } = useTranslation();

  const favourites = useFavouriteMoviesStore.pickFrom();

  return (
    <div className="bg-background flex h-screen flex-col overflow-hidden">
      <Header />
      {isEmpty(favourites) ? (
        <div className="flex flex-1 items-center justify-center">
          <Typography className="text-center text-gray-500">
            {t("favourites.noFavorites")}
          </Typography>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mx-auto mb-2 flex max-w-5xl items-center gap-2 border-b pb-3">
            <RatingFilled className="text-yellow-400" size={24} />
            <Trans
              i18nKey="favourites.sectionHeading"
              components={{
                typography: <Typography style="h2" weight="bold" />,
              }}
              values={{
                count: favourites.length,
              }}
            />
          </div>
          <div className="mx-auto max-w-5xl space-y-2">
            {favourites.map(movie => (
              <Card key={movie.imdbID} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default withTitle(Favourites, "title.favourites");
