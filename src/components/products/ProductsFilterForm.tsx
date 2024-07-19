import type { ProductsParams } from "@/api/types";

import { useLocations, useDates } from "@/data/hooks";
import { useFormValues } from "@/hooks/useFormValues";

import { Box, Select, DatePicker } from "@/components/ui";

import { getCountries, getCities } from "./functions";

interface Props {
  onSubmit: (values: ProductsParams) => void;
}

export default function ProductsFilterForm({ onSubmit }: Props) {
  const { data: countries, isLoading: isLoadingCountries } = useLocations();
  const { data: dates } = useDates();
  const { handleSubmit, register, getFieldValue } = useFormValues({}, { isAutoSubmitEnabled: true });

  const countriesOptions = getCountries({ data: countries ?? [] });
  const citiesOptions = getCities({ country: getFieldValue("countries"), data: countries ?? [] });

  return (
    <Box
      as="section"
      className="border-b-2 border-gray-300 p-4 pb-8 md:p-6 md:pb-12"
      aria-label="Filter form to search products"
    >
      <Box as="form" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-y-4 container mx-auto">
        <Box className="grid grid-col-1 md:grid-cols-2 gap-x-4">
          <Select
            {...register("countries")}
            label="Countries"
            options={countriesOptions}
            isLoading={isLoadingCountries}
          />
          <Select
            {...register("city_id")}
            label="City"
            options={citiesOptions}
            isDisabled={!getFieldValue("countries")}
            isLoading={isLoadingCountries}
            key={getFieldValue("countries")}
          />
        </Box>
        <DatePicker
          {...register("date")}
          label="Date"
          dates={dates ?? []}
          isDisabled={!getFieldValue("city_id")}
          key={getFieldValue("city_id")}
        />
      </Box>
    </Box>
  );
}
