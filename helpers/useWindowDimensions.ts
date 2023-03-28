import { useEffect } from "react";

export default function useWindowDimensions(callback: Function) {
  useEffect(() => {
    function handleResize() {
      callback();
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [callback]);
}
