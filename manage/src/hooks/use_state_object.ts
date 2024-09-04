import { useMemo, useRef, useState } from "react"

export const useStateObject = <T extends object>(init: T) => {
  const initialState = useRef(init).current;
  const [state, setState] = useState<T>(init);

  return useMemo(() => ({
    ...state,
    set: setState,
    setItem: <K extends keyof T>(key: K, value: any) => {
      setState((prev) => ({ ...prev, [key]: value }));
    },
    merge: (newState: Partial<T>) => {
      setState({ ...state, ...newState });
    },
    reset() {
      setState({ ...initialState });
    },
  }), [])
}

export type StateObject<T extends object> = ReturnType<typeof useStateObject<T>>