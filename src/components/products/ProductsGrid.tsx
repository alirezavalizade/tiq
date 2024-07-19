import type { ProductsParams } from "@/api/types";
import { useProducts } from "@/data/hooks";

import { Box } from "@/components/ui";
import { LoadingState, EmptyState } from "@/components/states";

import Product from "./Product";

interface Props {
  filters: ProductsParams;
}

export default function ProductsGrid({ filters }: Props) {
  const { data, isLoading } = useProducts(filters);

  return (
    <Box as="section" className="flex flex-col flex-1 p-4 pt-8 md:p-6 md:pt-12" aria-label="List of products">
      <Box className="mx-auto container flex flex-col flex-1">
        {isLoading ? <LoadingState className="flex items-center justify-center flex-1" /> : null}
        {!isLoading && !data?.length ? (
          <EmptyState className="flex items-center justify-center flex-1">
            Nothing found, please try a different date
          </EmptyState>
        ) : null}

        <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(data || []).map((product) => {
            return <Product key={product.title} data={product} />;
          })}
        </Box>
      </Box>
    </Box>
  );
}
