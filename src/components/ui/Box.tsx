import React, { forwardRef, ReactElement, ReactNode, ElementType, Ref } from "react";

// This component is a versatile Box container. (Inspired from Chakra-ui)
// The Box component is designed to allow for clean and extendable code.
// It can be used as a wrapper for any HTML element or React component,
// making it easy to apply consistent styling and structure across the application.
// - Clean code: Provides a clean and consistent way to define components with styling and other props.
// - Extendable: Easily extendable to include additional functionality like flex or grid helpers.
// - Reusable: Promotes reusability of code by abstracting common patterns.

export interface BoxProps {
  children?: ReactNode;
  as?: ElementType | ReactElement;
  [key: string]: any;
}

const Box = forwardRef<HTMLElement, BoxProps>(({ children, as, ...rest }, ref: Ref<HTMLElement>) => {
  if (React.isValidElement(as)) {
    return React.cloneElement(as, { ...rest, ref }, children);
  }

  if (as) {
    return React.createElement(as, { ...rest, ref }, children);
  }

  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
});

export default Box;
