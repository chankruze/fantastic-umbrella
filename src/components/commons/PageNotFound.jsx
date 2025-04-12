import { NoData } from "neetoui";
import { useTranslation } from "react-i18next";
import routes from "routes";

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center py-64">
      <NoData
        title={t("pageNotFound.noDataTitle")}
        primaryButtonProps={{
          label: t("pageNotFound.btnPrimaryLabel"),
          className: "bg-neutral-800 hover:bg-neutral-950",
          to: routes.root,
        }}
      />
    </div>
  );
};

export default PageNotFound;
