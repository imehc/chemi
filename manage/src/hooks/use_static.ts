import { useRef } from "react";

export const useStatic = <T>(init: T) => {
  const ref = useRef(init);
  ref.current = init;
  return ref
}