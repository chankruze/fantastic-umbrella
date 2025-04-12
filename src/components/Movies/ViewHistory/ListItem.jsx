import { memo } from "react";

import classNames from "classnames";
import { Delete } from "neetoicons";
import { Button, Typography } from "neetoui";
import useViewHistoryStore from "stores/useViewHistoryStore";

const ListItem = ({ movie, isLastSelected }) => {
  const removeFromHistory = useViewHistoryStore.pickFrom();
  const { imdbID, Title } = movie;

  const handleRemove = () => removeFromHistory(imdbID);

  return (
    <div
      data-imdbid={imdbID}
      className={classNames(
        "flex cursor-pointer items-center justify-between rounded p-2",
        isLastSelected ? "bg-blue-500 text-white" : "bg-white"
      )}
    >
      <Typography className="truncate" style="body2">
        {Title}
      </Typography>
      <div>
        <Button icon={Delete} style="icon" onClick={handleRemove} />
      </div>
    </div>
  );
};

export default memo(ListItem);
