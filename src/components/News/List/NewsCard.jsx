import { memo } from "react";

import dayjs from "dayjs";
import { Typography } from "neetoui";

const NewsCard = ({
  title,
  description,
  publishedAt,
  author,
  url,
  urlToImage,
}) => {
  const publishDate = dayjs(publishedAt).format("DD	MMMM YYYY");

  return (
    <div className="neeto-ui-rounded-lg grid grid-cols-6 gap-4 bg-white p-3 shadow-sm sm:p-4 sm:shadow-lg">
      <div className="col-span-4 gap-4 space-y-2 lg:col-span-5">
        <Typography className="truncate font-medium" style="h3">
          {title}
        </Typography>
        <div>
          <Typography
            className="neeto-ui-text-gray-500 capitalize line-clamp-4"
            style="body2"
          >
            {description}
          </Typography>
          <a href={url} rel="noreferrer" target="_blank">
            Know more
          </a>
        </div>
        <Typography className="neeto-ui-text-gray-500" style="body2">
          {publishDate} . {author || "Anonymous"}
        </Typography>
      </div>
      <div className="col-span-2 overflow-hidden rounded-lg lg:col-span-1">
        <img
          alt={title}
          className="h-full w-full object-cover"
          src={urlToImage}
        />
      </div>
    </div>
  );
};

export default memo(NewsCard);
