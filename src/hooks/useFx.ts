import { useState, useCallback, useRef } from "react";

export const useFx = () => {
  const [active, setActive] = useState(false);

  const activate = useCallback(() => {
    setActive(true);
  }, []);

  return { active, activate };
};

export const useFxTrigger = (onActivate: () => void) => {
  const c = useRef(0);
  const t = useRef(0);

  const handleClick = useCallback(() => {
    const now = Date.now();
    if (now - t.current > 2000) {
      c.current = 0;
    }
    t.current = now;
    c.current += 1;

    if (c.current >= 10) {
      onActivate();
      c.current = 0;
    }
  }, [onActivate]);

  return handleClick;
};
