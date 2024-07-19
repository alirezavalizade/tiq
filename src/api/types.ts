export interface Product {
  product_url: string;
  image: string;
  id: number;
  title: string;
  price: number;
  discount_percentage?: number;
  summary: string;
  city_id: number;
  available_dates: string[];
}

export type City = [number, string];

export interface Location {
  [country: string]: City[];
}

export type Date = string;

export interface ProductsParams {
  date: string;
  city_id: string;
}
