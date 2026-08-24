import * as React from 'react';
import { cn } from '../primitives/cn';
import { BG_CLASS, TEXT_CLASS } from './internal';
import type { MealCardProps, MealVariant, MealMacros } from './MealCard';

/** Drop-in for {@link MealCardProps} — same props, a different design. */
export type MealCardV3Props = MealCardProps;

type MacroTone = 'primary' | 'warn' | 'accent';

const MEAL_META: Record<MealVariant, { glyph: string; label: string }> = {
  breakfast: { glyph: '🍳', label: 'Breakfast' },
  lunch: { glyph: '🥗', label: 'Lunch' },
  dinner: { glyph: '🍽️', label: 'Dinner' },
  snack: { glyph: '🍎', label: 'Snack' },
};

const MACRO_META: { key: keyof MealMacros; label: string; tone: MacroTone }[] = [
  { key: 'protein', label: 'Protein', tone: 'primary' },
  { key: 'carbs', label: 'Carbs', tone: 'warn' },
  { key: 'fat', label: 'Fat', tone: 'accent' },
];

/**
 * MealCard — **dense macro-bar line** design (v3). A tight two-row entry: glyph,
 * dish name, and calories value-first on the top line; a single stacked
 * proportional macro bar (protein / carbs / fat, by grams) with `Ng` counts
 * beneath. Borderless and compact — ideal for long food logs. Same props as
 * {@link MealCardProps}; token-only colors.
 */
export const MealCardV3 = React.forwardRef<HTMLDivElement, MealCardV3Props>(function MealCardV3(
  { name, variant, calories, macros, time, onPress, className, ...rest },
  ref
) {
  const meta = MEAL_META[variant];
  const shownMacros = MACRO_META.filter((m) => macros?.[m.key] != null);
  const total = shownMacros.reduce((sum, m) => sum + Math.max(macros?.[m.key] ?? 0, 0), 0);
  const a11y = `${meta.label}: ${name}${calories != null ? `, ${calories} calories` : ''}`;

  const body = (
    <>
      <div className="flex items-center gap-[var(--xen-space-sm)]">
        <span aria-hidden="true" className="text-base leading-none">
          {meta.glyph}
        </span>
        <span className="min-w-0 flex-1 truncate text-base font-semibold text-on-surface">{name}</span>
        {calories != null ? (
          <span className="shrink-0 text-base font-extrabold text-on-surface">
            {calories}
            <span className="text-xs font-normal text-muted"> kcal</span>
          </span>
        ) : time ? (
          <span className="shrink-0 text-xs text-muted">{time}</span>
        ) : null}
      </div>

      {shownMacros.length && total > 0 ? (
        <>
          <div
            role="img"
            aria-label={`Macros: ${shownMacros.map((m) => `${m.label} ${macros?.[m.key]}g`).join(', ')}`}
            className="flex h-1.5 overflow-hidden rounded-full bg-border"
          >
            {shownMacros.map((m) => {
              const grams = Math.max(macros?.[m.key] ?? 0, 0);
              return <span key={m.key} className={BG_CLASS[m.tone]} style={{ flex: `${grams / total}` }} />;
            })}
          </div>
          <div className="flex gap-[var(--xen-space-md)]">
            {shownMacros.map((m) => (
              <span key={m.key} className={cn('text-xs font-semibold', TEXT_CLASS[m.tone])}>
                {m.label} {macros?.[m.key]}g
              </span>
            ))}
          </div>
        </>
      ) : null}
    </>
  );

  const shell =
    'flex flex-col gap-[var(--xen-space-xs)] py-[var(--xen-space-sm)] px-[var(--xen-space-sm)]';

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
        'cursor-pointer text-left transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      {body}
    </div>
  );
});
