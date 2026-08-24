import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'treat';

const MEAL_GLYPH: Record<MealType, string> = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  snack: '🦴',
  treat: '🍬',
};

export interface FeedingMeal {
  id?: string | number;
  /** Meal slot; drives the icon. */
  type: MealType;
  /** Scheduled time (already formatted), e.g. "7:30 AM". */
  time: string;
  /** Food name / description. */
  food: string;
  /** Portion label, e.g. "1 cup" or "150 g". */
  amount?: string;
  /** Whether this meal has been fed. */
  fed?: boolean;
}

export interface FeedingScheduleProps {
  /** Meals for the day, in order. */
  meals: FeedingMeal[];
  /** Optional section title. */
  title?: string;
  /** Toggle a meal's fed state. */
  onToggle?: (index: number, next: boolean) => void;
  /** Copy shown when there are no meals scheduled. */
  emptyLabel?: string;
  /** Extra classes on the root. */
  className?: string;
}

/**
 * A daily feeding checklist: each row is a meal-time icon, food + portion, and a
 * tappable fed/not-fed control (a real `role="checkbox"` `<button>`). A summary
 * chip counts fed vs. total. Renders a shared empty state. Fed state is conveyed
 * by a check glyph + `aria-checked` (not color alone). Token-only colors.
 */
export const FeedingSchedule = React.forwardRef<HTMLDivElement, FeedingScheduleProps>(function FeedingSchedule(
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
        'flex flex-col gap-[var(--xen-space-md)] bg-surface text-on-surface border border-border rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)]',
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
            <div className="flex w-full items-center gap-[var(--xen-space-sm)]">
              <span className="text-lg" aria-hidden="true">
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
                  fed ? 'border-success bg-success text-on-success' : 'border-border bg-transparent'
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
              className="w-full rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
            >
              {row}
            </button>
          );
        })}
      </div>
    </div>
  );
});
