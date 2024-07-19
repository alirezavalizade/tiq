import { http } from "./http";
import type { Product, Location, Date, ProductsParams } from "./types";

export async function loadLocations(): Promise<Location[]> {
  const response = await http<Location[]>({
    url: "/locations",
  });

  if (response.error) {
    throw new Error(response.error);
  }

  return (response.data ?? []) as Location[];
}

export async function loadProducts({ date, city_id }: ProductsParams): Promise<Product[]> {
  const response = await http<Product[]>({
    url: "/products",
    params: {
      date,
      city_id,
    },
  });

  if (response.error) {
    throw new Error(response.error);
  }

  return (response.data ?? []) as Product[];
}

export async function loadDates(): Promise<Date[]> {
  const response = await http<Date[]>({
    url: "/available_dates",
  });

  if (response.error) {
    throw new Error(response.error);
  }

  return (response.data ?? []) as Date[];
}
