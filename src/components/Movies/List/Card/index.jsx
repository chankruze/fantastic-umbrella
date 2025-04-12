import { memo, useCallback, useMemo, useState } from "react";

import { TooltipWrapper } from "components/commons";
import { getPropWithFallback } from "components/Movies/List/Card/utils";
import { Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import useViewHistoryStore from "stores/useViewHistoryStore";

import Details from "./Details";

import { FALLBACK_IMAGE } from "../../constants";

const MovieCard = ({ movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { t } = useTranslation();

  const addToHistory = useViewHistoryStore.pickFrom();

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    addToHistory(movie);
  }, [movie, addToHistory]);

  const title = useMemo(
    () => getPropWithFallback("Title", "Unknown title", movie),
    [movie]
  );

  const year = useMemo(
    () => getPropWithFallback("Year", "N/A", movie),
    [movie]
  );

  const poster = useMemo(
    () => getPropWithFallback("Poster", FALLBACK_IMAGE, movie),
    [movie]
  );

  const type = useMemo(() => getPropWithFallback("Type", "", movie), [movie]);

  return (
    <>
      <div className="neeto-ui-rounded-lg flex w-40 flex-col gap-4 bg-white p-3 shadow-sm sm:w-60 sm:p-4 sm:shadow-lg lg:w-64">
        <div className="flex-1 space-y-1.5">
          <img
            alt={title}
            className="h-40 w-full rounded object-cover sm:h-64 md:h-72 lg:h-80"
            src={poster}
          />
          <TooltipWrapper showTooltip content={title} position="top">
            <Typography className="truncate text-sm font-medium sm:text-base">
              {title}
            </Typography>
          </TooltipWrapper>
          <Typography
            className="neeto-ui-text-gray-500 capitalize"
            style="body2"
          >
            {type} • {year}
          </Typography>
        </div>
        <Button
          fullWidth
          className="rounded bg-blue-100 px-4 py-2 text-center text-xs font-bold underline transition-all duration-200 ease-in-out hover:bg-blue-200 sm:text-sm"
          label={t("movieCard.button")}
          style="link"
          onClick={openModal}
        />
      </div>
      {isModalOpen ? (
        <Details
          imdbID={movie.imdbID}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      ) : null}
    </>
  );
};

export default memo(MovieCard);
