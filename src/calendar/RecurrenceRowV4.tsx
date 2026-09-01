import * as React from 'react';
import { cn } from '../primitives/cn';
import { IconV4 } from '../primitives/IconV4';
import { SegmentedV4 } from '../primitives/SegmentedV4';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowHeightClass,
} from '../dashboard/internal/row-v4';
import type { RecurrenceFreq, RecurrenceRowProps } from './RecurrenceRow';

export interface RecurrenceRowV4Props extends RecurrenceRowProps {
  /** Override the frequency words — five English words lived inside. */
  freqLabels?: Partial<Record<RecurrenceFreq, string>>;
}

const FREQ_LABEL: Record<RecurrenceFreq, string> = {
  none: 'Does not repeat',
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
  yearly: 'Yearly',
};

const FREQ_ORDER: readonly RecurrenceFreq[] = ['none', 'daily', 'weekly', 'monthly', 'yearly'];

/**
 * **V4 recurrence row** — the web twin of the native `RecurrenceRowV4`, same
 * props as {@link RecurrenceRow} plus `freqLabels`.
 *
 * ## Three changes
 *
 * 1. **The inline variant is `SegmentedV4`**, not five hand-rolled chips, so
 *    it announces itself as one control with a selection.
 * 2. **The summary variant is a row from the shared row line**, with a
 *    chevron that says it opens something.
 * 3. **All five words are props.**
 */
export const RecurrenceRowV4 = React.forwardRef<HTMLDivElement, RecurrenceRowV4Props>(
  function RecurrenceRowV4(
    { value, onChange, label = 'Repeats', variant = 'summary', onPress, options, freqLabels, className, ...rest },
    ref
  ) {
    const wordFor = (freq: RecurrenceFreq): string =>
      options?.find((o) => o.value === freq)?.label ?? freqLabels?.[freq] ?? FREQ_LABEL[freq];
    const choices = options?.map((o) => o.value) ?? FREQ_ORDER;
    const current = wordFor(value);

    if (variant === 'inline') {
      return (
        <div ref={ref} className={cn('flex flex-col gap-xs', className)} {...rest}>
          <span className="text-xs font-semibold text-muted-text">{label}</span>
          <SegmentedV4
            options={choices.map((f) => ({ label: wordFor(f), value: f }))}
            value={value}
            onChange={(v) => onChange?.(v as RecurrenceFreq)}
          />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        data-xen-recurrence-row={value}
        data-xen-v4-chrome={onPress ? 'on-surface' : undefined}
        role={onPress ? 'button' : undefined}
        onClick={onPress}
        aria-label={`${label}, ${current}`}
        className={cn(ROW_V4_BASE_CLASS, rowHeightClass(false), className)}
        {...rest}
      >
        <IconV4 name="refresh" size="lg" className="text-muted-text" />
        <div className={ROW_V4_TEXT_CLASS}>
          <span className="text-base font-semibold text-on-card">{label}</span>
        </div>
        <div className={ROW_V4_TRAILING_CLASS}>
          <span className="truncate text-sm text-muted-text">{current}</span>
          {onPress ? <IconV4 name="chevron-right" size="lg" className="text-muted-text" /> : null}
        </div>
      </div>
    );
  }
);
