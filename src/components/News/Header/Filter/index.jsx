import { memo, useCallback, useState } from "react";

import { Filter as FilterIcon } from "neetoicons";
import { Button } from "neetoui";

import FilterPane from "./FilterPane";

const Filter = () => {
  const [isFilterPaneOpen, setIsFilterPaneOpen] = useState(false);

  const toggleFilterPane = useCallback(() => {
    setIsFilterPaneOpen(prev => !prev);
  }, []);

  return (
    <div className="relative">
      <Button icon={FilterIcon} style="secondary" onClick={toggleFilterPane} />
      <FilterPane closePane={toggleFilterPane} isOpen={isFilterPaneOpen} />
    </div>
  );
};

export default memo(Filter);
