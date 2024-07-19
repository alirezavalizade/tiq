import type { Location } from "@/api/types";
import type { Option } from "@/components/ui/Select";
import type { FormValues } from "@/hooks/useFormValues";

export function getCountries({ data }: { data: Location[] }): Option[] {
  return [
    {
      name: "Choose the country",
      value: null,
    },
    ...Object.keys(data)
      .sort()
      .map((country) => {
        return {
          name: country,
          value: country,
        };
      }),
  ];
}

interface GetCitiesParams {
  data: Record<string, Location[]>;
  country: string;
}

export function getCities({ data, country }: GetCitiesParams): Option[] {
  const options = [
    {
      name: "Choose the city",
      value: null,
    },
  ];

  if (!country) {
    return options;
  }

  const cities: Option[] = (data[country] || []).map(([id, city]: Location): Option => {
    return {
      name: city,
      value: id,
    };
  });

  return [...options, ...cities];
}

export function isValidForm(values: FormValues): boolean {
  return values.countries && values.city_id && values.date;
}
