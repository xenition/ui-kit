import * as React from 'react';
import { cn } from '../primitives/cn';
import { ButtonV4 } from '../primitives/ButtonV4';
import { IconV4 } from '../primitives/IconV4';
import { SegmentedV4 } from '../primitives/SegmentedV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import type { CalendarViewMode } from './types';
import type { DateNavigatorProps } from './DateNavigator';

export interface DateNavigatorV4Props extends DateNavigatorProps {
  /** Accessible names for the two chevrons. */
  previousLabel?: string;
  nextLabel?: string;
  /** Copy on the today action. Default `'Today'`. */
  todayLabel?: string;
  /** Override the view-switcher words — three English words lived inside. */
  viewLabels?: Partial<Record<CalendarViewMode, string>>;
}

const VIEW_LABEL: Record<CalendarViewMode, string> = {
  month: 'Month',
  week: 'Week',
  day: 'Day',
};

/**
 * **V4 date navigator** — the web twin of the native `DateNavigatorV4`, same
 * props as {@link DateNavigator} plus four copy hooks.
 *
 * ## Four changes
 *
 * 1. **The chevrons clear 44 and carry names.** They were glyph-sized buttons
 *    with no accessible label, on the control a user hits most in a calendar.
 * 2. **The title is a real heading**, so a screen reader can jump to it.
 * 3. **The view switcher is `SegmentedV4`**, not three hand-rolled buttons, so
 *    it reports itself as one control with a selected option.
 * 4. **Hover and press are the shared chrome layers.**
 */
export const DateNavigatorV4 = React.forwardRef<HTMLDivElement, DateNavigatorV4Props>(
  function DateNavigatorV4(
    {
      title,
      onPrev,
      onNext,
      onToday,
      view,
      onViewChange,
      views = ['month', 'week', 'day'],
      previousLabel,
      nextLabel,
      todayLabel = 'Today',
      viewLabels,
      className,
      ...rest
    },
    ref
  ) {
    const unit = view ?? 'month';

    const chevron = (direction: -1 | 1): React.ReactElement => (
      <button
        type="button"
        aria-label={
          direction < 0
            ? (previousLabel ?? `Previous ${unit}`)
            : (nextLabel ?? `Next ${unit}`)
        }
        onClick={direction < 0 ? onPrev : onNext}
        data-xen-v4-chrome="on-surface"
        className={cn(
          'inline-flex w-11 shrink-0 items-center justify-center rounded-full text-on-surface',
          MIN_TAP_CLASS
        )}
      >
        <IconV4 name={direction < 0 ? 'chevron-left' : 'chevron-right'} size="lg" />
      </button>
    );

    return (
      <div
        ref={ref}
        data-xen-date-navigator={view}
        className={cn('flex items-center gap-sm', className)}
        {...rest}
      >
        {onPrev ? chevron(-1) : null}
        <h2 className="min-w-0 flex-1 truncate font-heading text-base font-bold text-on-surface">
          {title}
        </h2>
        {onNext ? chevron(1) : null}

        {onToday ? (
          <ButtonV4 variant="secondary" size="sm" onClick={onToday} aria-label={todayLabel}>
            {todayLabel}
          </ButtonV4>
        ) : null}

        {onViewChange && views.length > 1 ? (
          <SegmentedV4
            options={views.map((v) => ({ label: viewLabels?.[v] ?? VIEW_LABEL[v], value: v }))}
            value={view ?? views[0]!}
            onChange={(v) => onViewChange(v as CalendarViewMode)}
          />
        ) : null}
      </div>
    );
  }
);
