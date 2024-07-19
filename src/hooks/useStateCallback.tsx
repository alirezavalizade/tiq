import { useState, useCallback, useEffect, useRef } from "react";

export function useStateCallback<T>(
  initialState: T,
): [T, (state: T, cb?: (state: T) => void) => void, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState(initialState);
  const cbRef = useRef<((state: T) => void) | null>(null);

  const setStateCallback = useCallback((newState: T, cb?: (state: T) => void) => {
    cbRef.current = cb || null;
    setState(newState);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (cbRef.current) {
        cbRef.current(state);
        cbRef.current = null;
      }
    }, 0);
  }, [state]);

  return [state, setStateCallback, setState];
}
