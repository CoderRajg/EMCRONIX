import { useEffect } from "react";

const useDocTitle = (title) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} - EMCRONIX`;
    } else {
      document.title = "EMCRONIX | The Perfect Audio Store";
    }
  }, [title]);

  return null;
};

export default useDocTitle;
