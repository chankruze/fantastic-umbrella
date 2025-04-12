import { useState } from "react";

import { MenuHorizontal } from "neetoicons";
import { Button } from "neetoui";

import SourcesModal from "./SourceModel";

const Sources = () => {
  const [isSourcesModalOpen, setIsSourcesModalOpen] = useState(false);

  const toggleModal = () => setIsSourcesModalOpen(prev => !prev);

  return (
    <>
      <Button icon={MenuHorizontal} style="text" onClick={toggleModal} />
      <SourcesModal closeModal={toggleModal} isOpenModal={isSourcesModalOpen} />
    </>
  );
};

export default Sources;
