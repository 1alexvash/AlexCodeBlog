// https://stackoverflow.com/a/66580539 | How to fix the "Warning: useLayoutEffect does nothing on the server"?
import { useEffect, useLayoutEffect } from "react";

const canUseDOM = typeof window !== "undefined";
const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
