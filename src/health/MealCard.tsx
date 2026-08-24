import * as React from 'react';
import { cn } from '../primitives/cn';
import { BG_CLASS, type HealthColor } from './internal';

export type MealVariant = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface MealMacros {
  /** Protein in grams. */
  protein?: number;
  /** Carbohydrates in grams. */
  carbs?: number;
  /** Fat in grams. */
  fat?: number;
}

interface MealMeta {
  glyph: string;
  label: string;
}

const MEAL_META: Record<MealVariant, MealMeta> = {
  breakfast: { glyph: '🍳', label: 'Breakfast' },
  lunch: { glyph: '🥗', label: 'Lunch' },
  dinner: { glyph: '🍽️', label: 'Dinner' },
  snack: { glyph: '🍎', label: 'Snack' },
};

const MACRO_META: { key: keyof MealMacros; label: string; color: HealthColor }[] = [
  { key: 'protein', label: 'Protein', color: 'primary' },
  { key: 'carbs', label: 'Carbs', color: 'warn' },
  { key: 'fat', label: 'Fat', color: 'accent' },
];

export interface MealCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Dish / entry name, e.g. "Greek yogurt bowl". */
  name: string;
  /** Which meal slot; drives the icon and tag label. */
  variant: MealVariant;
  /** Total calories. */
  calories?: number;
  /** Macro breakdown in grams. */
  macros?: MealMacros;
  /** Optional time label, e.g. "8:30 AM". */
  time?: string;
  onPress?: () => void;
}

/**
 * A logged-meal card: meal-slot icon + tag, dish name, calories, and a
 * color-coded protein / carbs / fat macro strip. Macros with no value are
 * omitted. Web parity of the native `MealCard`; clickable when `onPress` is set,
 * token-only colors.
 */
export const MealCard = React.forwardRef<HTMLDivElement, MealCardProps>(function MealCard(
  { name, variant, calories, macros, time, onPress, className, ...rest },
  ref
) {
  const meta = MEAL_META[variant];
  const shownMacros = MACRO_META.filter((m) => macros?.[m.key] != null);
  const a11y = `${meta.label}: ${name}${calories != null ? `, ${calories} calories` : ''}`;

  const body = (
    <>
      <div className="flex items-center gap-[var(--xen-space-sm)]">
        <span aria-hidden="true" className="text-lg leading-none">
          {meta.glyph}
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex justify-between">
            <span className="text-xs font-semibold text-muted">{meta.label}</span>
            {time ? <span className="text-xs text-muted">{time}</span> : null}
          </div>
          <span className="truncate text-base font-semibold text-on-surface">{name}</span>
        </div>
      </div>

      {calories != null ? (
        <span className="text-lg font-bold text-on-surface">
          {calories} <span className="text-sm font-normal text-muted">kcal</span>
        </span>
      ) : null}

      {shownMacros.length ? (
        <div className="flex gap-[var(--xen-space-lg)]">
          {shownMacros.map((m) => (
            <span key={m.key} className="flex items-center gap-[var(--xen-space-xs)]">
              <span className={cn('h-2 w-2 shrink-0 rounded-full', BG_CLASS[m.color])} />
              <span className="text-xs text-muted">
                {m.label} {macros?.[m.key]}g
              </span>
            </span>
          ))}
        </div>
      ) : null}
    </>
  );

  const shell = 'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]';

  if (!onPress) {
    return (
      <div ref={ref} aria-label={a11y} className={cn(shell, className)} {...rest}>
        {body}
      </div>
    );
  }
  return (
    <div
      ref={ref}
      role="button"
      aria-label={a11y}
      tabIndex={0}
      onClick={onPress}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onPress();
        }
      }}
      className={cn(
        shell,
        'cursor-pointer text-left transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      {body}
    </div>
  );
});
