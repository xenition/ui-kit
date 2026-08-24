import * as React from 'react';
import { cn } from './cn';
import { DatePicker } from './DatePicker';

export interface DateRange {
  /** Range start as ISO `YYYY-MM-DD` (or null when unset). */
  start: string | null;
  /** Range end as ISO `YYYY-MM-DD` (or null when unset). */
  end: string | null;
}

export interface DateRangePickerProps {
  /** Controlled `{ start, end }` range. */
  value?: DateRange;
  /** Fires with the updated range whenever either end changes. */
  onChange?: (value: DateRange) => void;
  /** Earliest selectable date (ISO `YYYY-MM-DD`). */
  min?: string;
  /** Latest selectable date (ISO `YYYY-MM-DD`). */
  max?: string;
  /** Labels above each end. */
  startLabel?: string;
  endLabel?: string;
  /** Renders the danger border state on both ends. */
  invalid?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * Two-ended date range — composes two web {@link DatePicker}s (start + end) and
 * keeps them consistent: the start's `max` is bounded by the chosen end and the
 * end's `min` by the chosen start, so an invalid crossing can't be picked. Web
 * parity of the native `DateRangePicker`. No literal colors (kit lint rule).
 */
export function DateRangePicker({
  value = { start: null, end: null },
  onChange,
  min,
  max,
  startLabel = 'Start',
  endLabel = 'End',
  invalid = false,
  disabled = false,
  className,
}: DateRangePickerProps): React.ReactElement {
  const setStart = (start: string): void => {
    // Clear a now-invalid end (earlier than the new start).
    const end = value.end && start > value.end ? null : value.end;
    onChange?.({ start: start || null, end });
  };
  const setEnd = (end: string): void => {
    const start = value.start && end < value.start ? null : value.start;
    onChange?.({ start, end: end || null });
  };

  return (
    <div className={cn('flex flex-col gap-md', className)}>
      <label className="flex flex-col gap-xs">
        <span className="text-sm font-semibold text-on-surface">{startLabel}</span>
        <DatePicker
          value={value.start ?? ''}
          onChange={setStart}
          min={min}
          max={value.end ?? max}
          invalid={invalid}
          disabled={disabled}
        />
      </label>
      <label className="flex flex-col gap-xs">
        <span className="text-sm font-semibold text-on-surface">{endLabel}</span>
        <DatePicker
          value={value.end ?? ''}
          onChange={setEnd}
          min={value.start ?? min}
          max={max}
          invalid={invalid}
          disabled={disabled}
        />
      </label>
    </div>
  );
}
