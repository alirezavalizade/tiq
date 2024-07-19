import type { Date } from "@/api/types";
import { Box, Text, Heading } from "@/components/ui";
import { getDayOfTheWeek, getDayOfTheMonth } from "@/functions/date";
import { cx } from "class-variance-authority";

interface DateItemProps {
  name: string;
  date: Date;
  value: Date;
  isDisabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DateItem({ name, date, onChange, value, isDisabled = false }: DateItemProps) {
  const isSelected = value === date;

  return (
    <Box
      key={date}
      as="label"
      htmlFor={date}
      className={cx(
        "flex items-center justify-center flex-col aspect-square transition-all duration-200 border rounded-lg",
        {
          "bg-purple-600 text-white": isSelected,
          "border-black": !isSelected,
          "opacity-30 cursor-not-allowed select-none": isDisabled,
          "hover:bg-purple-200 cursor-pointer": !isDisabled && !isSelected,
        },
      )}
    >
      <input
        id={date}
        name={name}
        className="sr-only"
        onChange={onChange}
        checked={isSelected}
        value={date}
        type="radio"
        disabled={isDisabled}
        aria-checked={isSelected}
        aria-disabled={isDisabled}
      />
      <Text className="text-sm md:text-xl">{getDayOfTheWeek(date)}</Text>
      <Heading as="h4" className="text-2xl md:text-4xl">
        {getDayOfTheMonth(date)}
      </Heading>
    </Box>
  );
}
