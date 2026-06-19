import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function DateRangeFilter({
  range,
  setRange,
  onApply,
  onReset,
}) {
  const today = new Date();

  today.setHours(23, 59, 59, 999);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* FROM */}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[150px] justify-start rounded-xl"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />

            {range.from
              ? format(new Date(range.from), "dd MMM yyyy")
              : "From Date"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={
              range.from
                ? new Date(range.from)
                : undefined
            }
            onSelect={(date) =>
              setRange({
                from: date
                  ? format(date, "yyyy-MM-dd")
                  : "",
                to: "",
              })
            }
            disabled={(date) =>
              date > today
            }
          />
        </PopoverContent>
      </Popover>

      {/* TO */}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={!range.from}
            className="w-[150px] justify-start rounded-xl"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />

            {range.to
              ? format(new Date(range.to), "dd MMM yyyy")
              : "To Date"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={
              range.to
                ? new Date(range.to)
                : undefined
            }
            onSelect={(date) =>
              setRange((prev) => ({
                ...prev,
                to: date
                  ? format(date, "yyyy-MM-dd")
                  : "",
              }))
            }
            disabled={(date) =>
              date > today ||
              (range.from &&
                date <
                  new Date(range.from))
            }
          />
        </PopoverContent>
      </Popover>

      <Button
        onClick={onApply}
        disabled={
          !range.from || !range.to
        }
      >
        Apply
      </Button>

      <Button
        variant="outline"
        onClick={onReset}
      >
        Reset
      </Button>
    </div>
  );
}
