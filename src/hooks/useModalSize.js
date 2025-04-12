import { useMediaQuery } from "react-responsive";

const useModalSize = () => {
  const isSmall = useMediaQuery({ maxWidth: 639 });
  const isMedium = useMediaQuery({ minWidth: 640, maxWidth: 1023 });

  if (isSmall) return "small";

  if (isMedium) return "medium";

  return "large";
};

export default useModalSize;
