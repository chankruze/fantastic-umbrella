import { useCallback, useEffect, useRef, useState } from "react";

import { History } from "neetoicons";
import { Alert, Button, Typography } from "neetoui";
import { equals, isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import useViewHistoryStore from "stores/useViewHistoryStore";

import ListItem from "./ListItem";

const ViewHistory = () => {
  const [showAlert, setShowAlert] = useState(false);

  const containerRef = useRef(null);

  const { t } = useTranslation();

  const { clearHistory, history, lastSelected } = useViewHistoryStore.pick();

  // Extracted computation if history exists to re-use
  const hasHistory = !isEmpty(history);

  useEffect(() => {
    if (!lastSelected || !hasHistory || !containerRef.current) return;

    // Find the element using data-imdbid instead of index-based selection
    const itemElement = containerRef.current.querySelector(
      `[data-imdbid="${lastSelected.imdbID}"]`
    );

    itemElement?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [lastSelected, history, hasHistory]);

  const handleClearHistory = useCallback(() => setShowAlert(true), []);

  const confirmClearHistory = useCallback(() => {
    clearHistory();
    setShowAlert(false);
  }, [clearHistory]);

  return (
    <div className="hidden flex-col overflow-y-auto border-l md:flex">
      <div className="flex items-center justify-between border-b p-3">
        <div className="flex items-center gap-1">
          <History className="text-gray-500" />
          <Typography className="text-center" style="h4" weight="bold">
            {t("viewHistory.title")}
          </Typography>
        </div>
        {hasHistory && (
          <Button style="danger-text" onClick={handleClearHistory}>
            {t("viewHistory.clearHistory")}
          </Button>
        )}
      </div>
      {!hasHistory ? (
        <div className="flex flex-1 items-center justify-center p-3">
          <Typography className="text-center text-gray-500" style="body2">
            {t("viewHistory.noHistory")}
          </Typography>
        </div>
      ) : (
        <div
          className="flex-1 space-y-1 overflow-y-auto p-3"
          ref={containerRef}
        >
          {history.map(item => (
            <ListItem
              isLastSelected={equals(lastSelected?.imdbID, item.imdbID)}
              key={item.imdbID}
              movie={item}
            />
          ))}
        </div>
      )}
      <Alert
        isOpen={showAlert}
        message={t("viewHistory.clearHistoryAlertMessage")}
        title={t("viewHistory.clearHistoryAlertTitle")}
        onClose={() => setShowAlert(false)}
        onSubmit={confirmClearHistory}
      />
    </div>
  );
};

export default ViewHistory;
