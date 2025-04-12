import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const withTitle = (Component, titleKey) => {
  const PageTitle = props => {
    /**
     * Note: You should avoid calling i18n.t outside of a React component because translations may not update properly when the language changes.
     * Instead, pass the translation key and resolve it inside the withTitle HOC using useTranslation().
     */
    const { t } = useTranslation();
    const translatedTitle = titleKey ? t(titleKey) : t("title.app");
    const pageTitle = t("title.page", { title: translatedTitle });

    return (
      <>
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>
        <Component {...props} />
      </>
    );
  };

  return PageTitle;
};

export default withTitle;
