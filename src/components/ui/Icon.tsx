import { cloneElement, ReactElement } from "react";
import { cx } from "class-variance-authority";

interface IconProps {
  children: ReactElement;
}

const Icon = ({ children }: IconProps) => {
  return cloneElement(children, {
    className: cx("flex-shrink-0 align-middle fill-current", children?.props?.className),
  });
};

export default Icon;
