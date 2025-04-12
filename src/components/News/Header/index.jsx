import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";

import Filter from "./Filter";
import SearchBar from "./SearchBar";
import Sources from "./Sources";

const Header = () => {
  const { t } = useTranslation();

  return (
    <div className="border-b p-4">
      <div className="flex">
        <div className="flex flex-1 items-center gap-4">
          <Typography className="font-bold" style="h1">
            {t("News Mode")}
          </Typography>
          <Sources />
          <Filter />
        </div>
        <SearchBar />
      </div>
    </div>
  );
};

export default Header;
