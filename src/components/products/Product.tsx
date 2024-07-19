import type { Product } from "@/api/types";
import { cx } from "class-variance-authority";
import { getValueIncludingPercentage } from "@/functions/math";

import { Box, Text, Heading, Imagix } from "@/components/ui";

interface Props {
  data: Product;
}

export default function Product({ data }: Props) {
  return (
    <Box
      as="article"
      className="flex flex-row md:flex-col rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 relative"
    >
      <Box as="section" className="shrink-0 min-w-[100px] h-auto md:aspect-[3/2] relative overflow-hidden">
        <Imagix
          src={data.image}
          className="absolute top-1/2 -translate-y-1/2 hidden md:block w-full h-full object-cover"
          width={700}
          ar="3:2"
        />
        <Imagix
          src={data.image}
          className="absolute top-1/2 -translate-y-1/2 block md:hidden w-full h-full object-cover"
          width={180}
          ar="3:4"
        />
      </Box>
      <Box as="section" className="basis-full p-3 md:p-4 space-y-4">
        <Heading as="h3" className="text-lg md:text-xl line-clamp-2">
          {data.title}
        </Heading>
        <Text as="a" className="text-xs md:text-sm line-clamp-2 full-link" href="https://tiqets.com" target="_blank">
          {data.summary}
        </Text>
        <Price data={data} />
      </Box>
    </Box>
  );
}

function Price({ data }: Props) {
  return (
    <Box className="flex items-center space-x-1 text-xl font-semibold">
      <Text
        className={cx({
          "text-red-700": data.discount_percentage,
        })}
      >
        €{data.discount_percentage ? getValueIncludingPercentage(data.price, data.discount_percentage) : data.price}
      </Text>
      {data.discount_percentage ? <Text className="text-gray-500 line-through">€{data.price}</Text> : null}
    </Box>
  );
}
