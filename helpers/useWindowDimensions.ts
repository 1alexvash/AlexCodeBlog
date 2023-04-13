import { useEffect, useState } from "react";

export default function useWindowDimensions(callback: Function) {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    function handleResize() {
      callback();
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [callback, width]);

  return { width };
}
