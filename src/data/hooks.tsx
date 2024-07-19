import type { Product, Location, Date, ProductsParams } from "@/api/types";
import { loadDates, loadLocations, loadProducts } from "@/api/products";

import { useData } from "@/data/swr";

export function useLocations() {
  return useData<Location[]>({
    key: "locations",
    fetcher: loadLocations,
  });
}

export function useProducts({ date, city_id }: ProductsParams) {
  return useData<Product[]>({
    key: `products_${date}_${city_id}`,
    fetcher: loadProducts,
    params: {
      date,
      city_id,
    },
  });
}

export function useDates() {
  return useData<Date[]>({
    key: "dates",
    fetcher: loadDates,
  });
}
