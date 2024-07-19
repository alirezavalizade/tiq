import { SelectHTMLAttributes, useEffect } from "react";
import { ReactComponent as ArrowDownIcon } from "@/theme/vectors/arrow-down.svg";
import { ReactComponent as LoadingIcon } from "@/theme/vectors/loading1.svg";

import Box from "./Box";

import { cva, cx, type VariantProps } from "class-variance-authority";

const inputVariants = cva("appearance-none w-full outline-none transition-all duration-100 rounded-lg", {
  variants: {
    size: {
      xs: "text-xs px-2 h-6 focus:ring-p-1 placeholder:text-xs",
      sm: "text-sm px-3 h-8 focus:ring-p-1 placeholder:text-sm",
      md: "text-md px-4 h-10 focus:ring-p-1 placeholder:text-sm",
      lg: "text-lg px-4 h-12 focus:ring-p-2 placeholder:text-sm",
    },
    variant: {
      default:
        "border border-black focus:outline-none text-black placeholder:text-black/70 placeholder:font-semibold focus:border-th-highlight focus:ring-blue-500 focus:ring-4",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

type SizeType = "xs" | "sm" | "md" | "lg";

export interface Option {
  name: string;
  value: string | null;
}

interface InputProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size">, VariantProps<typeof inputVariants> {
  name?: string;
  label?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  size?: SizeType;
  options: Option[];
  unregister?: () => void;
}

const Select = ({
  options,
  label,
  name,
  className,
  variant,
  size = "lg",
  isDisabled,
  isLoading,
  unregister,
  ...props
}: InputProps) => {
  useEffect(() => {
    return () => {
      if (unregister) {
        unregister();
      }
    };
  }, []);

  return (
    <Box
      className={cx("space-y-1", {
        "opacity-30 cursor-not-allowed select-none": isDisabled,
      })}
    >
      {label && (
        <Box as="label" htmlFor={name} className="text-sm uppercase">
          {label}
        </Box>
      )}

      <Box className="relative">
        <select
          {...props}
          id={name}
          name={name}
          className={cx(inputVariants({ size: size, variant }), className)}
          disabled={isDisabled}
          aria-disabled={isDisabled}
          aria-busy={isLoading}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>

        <Box className="absolute top-1/2 right-2 transform -translate-y-1/2 pointer-events-none">
          {isLoading ? (
            <LoadingIcon className="w-6 h-6" aria-hidden="true" />
          ) : (
            <ArrowDownIcon className="w-6 h-6" aria-hidden="true" />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Select;
