import { useCallback, useState } from "react";

type UseInputReturn<T> = [
  T,
  (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void,
];

export const useInputValue = <T,>(initialState: T): UseInputReturn<T> => {
  const [value, setValue] = useState<T>(initialState);

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setValue(event.target.value as unknown as T);
    },
    [],
  );

  return [value, onChange];
};
