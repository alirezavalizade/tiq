import type { Date } from "@/api/types";
import { Box, Text } from "@/components/ui";

import DateItem from "./Date";
import { useEffect } from "react";

interface DatePickerProps {
  dates: Date[];
  name: string;
  label?: string;
  onChange: (date: Date) => void;
  unregister: () => void;
  value: Date;
  isDisabled?: boolean;
}

export default function DatePicker({
  dates,
  name,
  label,
  onChange,
  value,
  isDisabled = false,
  unregister,
}: DatePickerProps) {
  useEffect(() => {
    return () => {
      unregister();
    };
  }, []);

  return (
    <Box>
      {label ? <Text className="text-sm uppercase">{label}</Text> : null}
      <Box className="grid grid-cols-3 gap-x-2 sm:grid-cols-4 sm:gap-x-4 md:grid-cols-5 lg:grid-cols-7 grid-rows-1 auto-rows-[0] overflow-y-hidden overflow-x-auto">
        {dates.map((date) => (
          <DateItem key={date} name={name} date={date} onChange={onChange} value={value} isDisabled={isDisabled} />
        ))}
      </Box>
    </Box>
  );
}
