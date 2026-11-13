import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const yearPages = Array.from({ length: 4 }, (_, page) =>
  Array.from({ length: 12 }, (_, index) => 1980 + page * 12 + index)
);

export function YearPicker({ value, onChange, disabled, invalid }: {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(3);
  const visibleYears = yearPages[page] || [];
  return <Popover open={open} onOpenChange={next => {
    if (next) setPage(value ? Math.max(0, Math.min(3, Math.floor((Number(value) - 1980) / 12))) : 3);
    setOpen(next);
  }}>
    <PopoverTrigger asChild>
      <Button id="passed_out_year" type="button" variant="outline" disabled={disabled} aria-invalid={invalid} className="w-full justify-between font-normal">
        <span className={value ? "text-foreground" : "text-muted-foreground"}>{value || "Select year"}</span><CalendarDays />
      </Button>
    </PopoverTrigger>
    <PopoverContent align="start" aria-label="Choose passed out year" className="w-72 max-w-[calc(100vw-2rem)]">
      <div className="mb-3 flex items-center justify-between">
        <Button type="button" variant="ghost" size="icon" aria-label="Earlier years" title="Earlier years" disabled={page === 0} onClick={() => setPage(p => p - 1)}><ChevronLeft /></Button>
        <span aria-live="polite" className="text-sm">{visibleYears[0]}–{visibleYears[11]}</span>
        <Button type="button" variant="ghost" size="icon" aria-label="Later years" title="Later years" disabled={page === 3} onClick={() => setPage(p => p + 1)}><ChevronRight /></Button>
      </div>
      <div className="grid grid-cols-3 gap-2" role="group" aria-label="Years">
        {visibleYears.map(year => <Button key={year} type="button" variant={value === String(year) ? "default" : "ghost"} aria-pressed={value === String(year)} className="h-10 font-normal" onClick={() => { onChange(String(year)); setOpen(false); }}>{year}</Button>)}
      </div>
    </PopoverContent>
  </Popover>;
}