import { Typography } from "neetoui";
import { isEmpty } from "ramda";
import { Trans, useTranslation } from "react-i18next";
import routes from "routes";

import NavLinkItem from "./NavLinkItem";
import { extractNavLinks } from "./utils";

const Header = () => {
  const { t } = useTranslation();

  const navLinks = extractNavLinks(routes);

  return (
    <header className="sticky flex w-full items-center justify-between bg-white px-4 py-1 shadow">
      <div className="flex items-center gap-6">
        <div className="flex items-center">
          <img
            alt={t("title.app")}
            className="h-12 w-12"
            src="https://cdn.pixabay.com/photo/2022/07/24/19/40/movie-7342374_640.png"
          />
          <Typography style="h2" weight="bold">
            <Trans i18nKey="header.brand">
              <span className="text-blue-600">First</span>
              <span className="text-gray-800">Second</span>
            </Trans>
          </Typography>
        </div>
        {!isEmpty(navLinks) ? (
          <nav>
            <ul className="flex items-center gap-4">
              {navLinks.map(link => (
                <NavLinkItem key={link.to} {...link} />
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
