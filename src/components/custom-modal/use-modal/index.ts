import { useState } from "react";

export const useCustomModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
  };
};
