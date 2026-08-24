import * as React from 'react';
import { cn } from '../primitives/cn';
import { BG_CLASS, TEXT_CLASS } from './internal';
import type { MealCardProps, MealVariant, MealMacros } from './MealCard';

/** Drop-in for {@link MealCardProps} — same props, a different design. */
export type MealCardV2Props = MealCardProps;

type MacroTone = 'primary' | 'warn' | 'accent';

const MEAL_META: Record<MealVariant, { glyph: string; label: string; tintBg: string }> = {
  breakfast: { glyph: '🍳', label: 'Breakfast', tintBg: 'bg-warn/10' },
  lunch: { glyph: '🥗', label: 'Lunch', tintBg: 'bg-success/10' },
  dinner: { glyph: '🍽️', label: 'Dinner', tintBg: 'bg-primary/10' },
  snack: { glyph: '🍎', label: 'Snack', tintBg: 'bg-accent/10' },
};

const MACRO_META: { key: keyof MealMacros; label: string; tone: MacroTone }[] = [
  { key: 'protein', label: 'P', tone: 'primary' },
  { key: 'carbs', label: 'C', tone: 'warn' },
  { key: 'fat', label: 'F', tone: 'accent' },
];

/**
 * MealCard — **image-hero** design (v2). A tall tinted hero banner (standing in
 * for a dish photo) carries the meal glyph large and centered, with the meal tag
 * top-left and a calories chip top-right; macro chips (P/C/F) overlay the bottom
 * of the hero. The dish name sits below. Elevated surface that lifts on hover.
 * Same props as {@link MealCardProps}; token-only colors.
 */
export const MealCardV2 = React.forwardRef<HTMLDivElement, MealCardV2Props>(function MealCardV2(
  { name, variant, calories, macros, time, onPress, className, ...rest },
  ref
) {
  const meta = MEAL_META[variant];
  const shownMacros = MACRO_META.filter((m) => macros?.[m.key] != null);
  const a11y = `${meta.label}: ${name}${calories != null ? `, ${calories} calories` : ''}`;

  const body = (
    <>
      <div className={cn('relative flex h-28 items-center justify-center p-[var(--xen-space-sm)]', meta.tintBg)}>
        <span aria-hidden="true" className="text-5xl leading-none">
          {meta.glyph}
        </span>
        <span className="absolute left-[var(--xen-space-sm)] top-[var(--xen-space-sm)] rounded-full bg-surface px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-semibold text-on-surface">
          {meta.label}
        </span>
        {calories != null ? (
          <span className="absolute right-[var(--xen-space-sm)] top-[var(--xen-space-sm)] rounded-full bg-on-surface px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-bold text-surface">
            {calories} kcal
          </span>
        ) : null}
        {shownMacros.length ? (
          <div className="absolute bottom-[var(--xen-space-sm)] left-[var(--xen-space-sm)] flex gap-[var(--xen-space-xs)]">
            {shownMacros.map((m) => (
              <span
                key={m.key}
                className={cn(
                  'flex items-center gap-[var(--xen-space-xs)] rounded-full bg-surface px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-semibold',
                  TEXT_CLASS[m.tone]
                )}
              >
                <span className={cn('h-1.5 w-1.5 rounded-full', BG_CLASS[m.tone])} />
                {m.label} {macros?.[m.key]}g
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <div className="flex items-center gap-[var(--xen-space-sm)] p-[var(--xen-space-md)]">
        <span className="min-w-0 flex-1 truncate text-base font-bold text-on-surface">{name}</span>
        {time ? <span className="shrink-0 text-xs text-muted">{time}</span> : null}
      </div>
    </>
  );

  const shell = 'flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] bg-surface shadow-md';

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
        'cursor-pointer text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none motion-reduce:hover:transform-none',
        className
      )}
      {...rest}
    >
      {body}
    </div>
  );
});
