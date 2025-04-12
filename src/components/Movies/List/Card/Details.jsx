import { memo, useMemo } from "react";

import classNames from "classnames";
import {
  getMovieDetails,
  getPropWithFallback,
  processGenres,
} from "components/Movies/List/Card/utils";
import { useShowMovie } from "hooks/reactQuery/useNewsApi";
import useModalSize from "hooks/useModalSize";
import { existsBy } from "neetocist";
import { RatingFilled } from "neetoicons";
import { Button, Modal, Spinner, Tag, Typography } from "neetoui";
import { Trans, useTranslation } from "react-i18next";
import useFavouriteMoviesStore from "stores/useFavouriteMoviesStore";

import { FALLBACK_IMAGE } from "../../constants";

const Details = ({ isOpen, onClose, imdbID }) => {
  const { t } = useTranslation();

  const modalSize = useModalSize();

  const { isFetching, data: movie = {} } = useShowMovie(imdbID);

  const { favourites, addMovie, removeMovie } = useFavouriteMoviesStore.pick();

  const title = useMemo(() => getPropWithFallback("title", "", movie), [movie]);

  const genre = useMemo(() => getPropWithFallback("genre", "", movie), [movie]);

  const poster = useMemo(
    () => getPropWithFallback("poster", FALLBACK_IMAGE, movie),
    [movie]
  );

  const plot = useMemo(
    () => getPropWithFallback("plot", "No description available.", movie),
    [movie]
  );

  const genres = useMemo(() => (genre ? processGenres(genre) : []), [genre]);

  const movieDetails = useMemo(() => getMovieDetails(movie), [movie]);

  const toggleFavorite = () => {
    if (isFavouritedMovie) {
      removeMovie(imdbID);
    } else {
      addMovie(movie);
    }
  };

  const isFavouritedMovie = existsBy({ imdbID }, favourites);

  return (
    <Modal isOpen={isOpen} size={modalSize} onClose={onClose}>
      <Modal.Header>
        <div className="flex items-center gap-2">
          <Typography style="h2" weight="bold">
            {title}
          </Typography>
          {!isFetching ? (
            <Button
              style="link"
              tooltipProps={{
                content: isFavouritedMovie
                  ? t("movieDetails.label.removeFromFavourites")
                  : t("movieDetails.label.addToFavourites"),
                position: "right",
              }}
              onClick={toggleFavorite}
            >
              <RatingFilled
                size={24}
                className={classNames(
                  "transition-colors duration-200",
                  isFavouritedMovie
                    ? "text-yellow-400"
                    : "text-gray-400 hover:text-gray-500"
                )}
              />
            </Button>
          ) : null}
        </div>
        {genres.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 py-2">
            {genres.map(genre => (
              <Tag key={genre} type="solid">
                {genre}
              </Tag>
            ))}
          </div>
        )}
      </Modal.Header>
      <Modal.Body>
        {isFetching ? (
          <div className="flex h-64 items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-3">
            <div className="col-span-1 flex justify-center md:block">
              <img
                alt={title}
                className="neeto-ui-rounded-lg w-full object-contain md:w-auto"
                src={poster}
              />
            </div>
            {/* Details: Full width on small screens */}
            <div className="col-span-2 space-y-4 p-2 md:p-4">
              <Typography component="i" style="body2">
                {plot}
              </Typography>
              <div className="space-y-2">
                {movieDetails.map(({ label, value }) => (
                  <div className="flex items-center gap-2" key={label}>
                    <Typography style="body2" weight="bold">
                      <Trans i18nKey={`movieDetails.label.${label}`} />
                    </Typography>
                    <Typography style="body2">{value}</Typography>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default memo(Details);
