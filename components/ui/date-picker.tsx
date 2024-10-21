"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
  onSelect,
}: {
  onSelect: (date: Date | undefined) => void;
}) {
  const [date, setDate] = React.useState<Date>();
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);

  function handleSelect(date: Date | undefined) {
    onSelect(date);
    setDate(date);
    setIsCalendarOpen(false);
  }

  function handleClean(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setDate(undefined);
  }

  return (
    <Popover open={isCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            " justify-between text-left font-normal",
            !date && "text-muted-foreground"
          )}
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        >
          <div className="flex items-center justify-start">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "yyyy-MM-dd") : <span>Escolha uma data</span>}
          </div>

          {date && (
            <Button variant="ghost" onClick={handleClean}>
              <X className="ml-auto h-4 w-4 relative -right-6" />
            </Button>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
