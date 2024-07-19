import { ReactNode } from "react";
import { Box, Text } from "@/components/ui";

interface EmptyStateProps {
  children: ReactNode;
  className?: string;
}

const EmptyState = ({ className, children }: EmptyStateProps) => {
  return (
    <Box as="section" className={className}>
      <Text>{children}</Text>
    </Box>
  );
};

export default EmptyState;
