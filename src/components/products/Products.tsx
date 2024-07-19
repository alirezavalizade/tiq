import { useState } from "react";

import { EmptyState } from "@/components/states";

import ProductsFilterForm from "./ProductsFilterForm";
import ProductsGrid from "./ProductsGrid";

import { isValidForm } from "./functions";

export default function Products() {
  const [filters, onSubmit] = useState({ city_id: "", date: "" });

  return (
    <>
      <ProductsFilterForm onSubmit={onSubmit} />
      {isValidForm(filters) ? (
        <ProductsGrid filters={filters} />
      ) : (
        <EmptyState className="flex flex-1 items-center justify-center">Select filter first</EmptyState>
      )}
    </>
  );
}
