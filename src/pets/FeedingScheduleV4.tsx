import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import type { FeedingScheduleProps, MealType } from './FeedingSchedule';

/** Drop-in for {@link FeedingScheduleProps} — same props, the V4 "companion" design. */
export type FeedingScheduleV4Props = FeedingScheduleProps;

const MEAL_GLYPH: Record<MealType, string> = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  snack: '🦴',
  treat: '🍬',
};

/**
 * FeedingSchedule — **V4** "companion" design (web parity of the native V4). The
 * warm, friendly take on a daily feeding checklist: an elevated rounded card with
 * a soft shadow, a title + fed/total summary, and one restyled row per meal — the
 * meal-time glyph in a soft-primary tinted well, food + time/portion meta, and a
 * tappable `role="checkbox"` control that toggles served/fed. Same props/behavior
 * as {@link FeedingScheduleProps}; every `meal.type` reads via a glyph and fed
 * state via a check glyph + `aria-checked` (never color alone). All colors from
 * `--xen-*` token classes (no literals); rows keep ≥44px tap targets.
 */
export const FeedingScheduleV4 = React.forwardRef<HTMLDivElement, FeedingScheduleV4Props>(function FeedingScheduleV4(
  { meals, title = 'Feeding schedule', onToggle, emptyLabel = 'No meals scheduled', className },
  ref
) {
  if (meals.length === 0) {
    return (
      <EmptyState
        ref={ref}
        aria-label={emptyLabel}
        icon={<span className="text-2xl">🍽️</span>}
        title={title}
        description={emptyLabel}
        className={className}
      />
    );
  }

  const fedCount = meals.filter((m) => m.fed).length;
  const allFed = fedCount === meals.length;

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface p-[var(--xen-space-lg)] shadow-md',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-base font-bold text-on-surface">{title}</p>
        <p className={cn('text-sm font-semibold', allFed ? 'text-success' : 'text-muted')}>
          {fedCount}/{meals.length} fed
        </p>
      </div>

      <div className="flex flex-col gap-[var(--xen-space-sm)]">
        {meals.map((meal, i) => {
          const fed = meal.fed ?? false;
          const row = (
            <div className="flex min-h-[44px] w-full items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] bg-primary/10 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface text-lg"
              >
                {MEAL_GLYPH[meal.type] ?? '🍽️'}
              </span>
              <div className="min-w-0 flex-1 text-left">
                <p className={cn('truncate text-base font-semibold text-on-surface', fed && 'line-through')}>{meal.food}</p>
                <p className="text-xs text-muted">
                  {meal.time}
                  {meal.amount ? ` · ${meal.amount}` : ''}
                </p>
              </div>
              <span
                aria-hidden="true"
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-full border',
                  fed ? 'border-success bg-success text-on-success' : 'border-border bg-surface'
                )}
              >
                {fed ? <span className="text-xs font-bold">✓</span> : null}
              </span>
            </div>
          );

          if (!onToggle) {
            return (
              <div key={meal.id ?? i} aria-label={`${meal.food}, ${meal.time}, ${fed ? 'fed' : 'not fed'}`}>
                {row}
              </div>
            );
          }
          return (
            <button
              key={meal.id ?? i}
              type="button"
              role="checkbox"
              aria-checked={fed}
              aria-label={`${meal.food}, ${meal.time}, ${fed ? 'fed' : 'not fed'}`}
              onClick={() => onToggle(i, !fed)}
              className="w-full rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {row}
            </button>
          );
        })}
      </div>
    </div>
  );
});
