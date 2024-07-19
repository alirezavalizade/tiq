/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useCallback, useMemo } from "react";
import { useStateCallback } from "./useStateCallback";

export type FormValues = Record<string, any>;

interface UseFormValuesOptions {
  isAutoSubmitEnabled?: boolean;
  autoSubmitGuard?: (params: FormValues) => boolean;
}

interface UseFormValuesReturn {
  register: (name: string) => {
    name: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    value: any;
  };
  handleSubmit: (submit: (values: FormValues) => void) => (e: FormEvent) => void;
  getFieldValue: (name: string) => any;
}

/**
 * This hook is extendable and it's easy to add other features such as handing required fields and showing error state etc.
 */

export function useFormValues(initialValue: FormValues = {}, options: UseFormValuesOptions = {}): UseFormValuesReturn {
  const [values, setValues, setValuesWithoutCallback] = useStateCallback<FormValues>(initialValue);

  const getFieldValue = useCallback(
    (name: string) => {
      return values[name];
    },
    [values],
  );

  const handleSubmit = useCallback(
    (submit: (params: FormValues) => void) => {
      return (e: FormEvent) => {
        e.preventDefault();

        submit(values);
      };
    },
    [values],
  );

  const register = useCallback(
    (name: string) => {
      return {
        name,
        value: getFieldValue(name),
        onChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
          setValues(
            (state: FormValues) => {
              return {
                ...state,
                [name]: event.target.value,
              };
            },
            () => {
              if (options.isAutoSubmitEnabled) {
                event.target.closest("form")?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
              }
            },
          );
        },
        unregister() {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          setValuesWithoutCallback(({ [name]: ignoreThisValue, ...values }) => {
            return { ...values };
          });
        },
      };
    },
    [getFieldValue, options, setValues, setValuesWithoutCallback],
  );

  return useMemo(() => {
    return {
      register,
      handleSubmit,
      getFieldValue,
    };
  }, [register, handleSubmit, getFieldValue]);
}
