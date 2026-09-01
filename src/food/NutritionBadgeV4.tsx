import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { BADGE_V4, DIET_TONE, TABULAR_CLASS } from './internal/menu-v4';
import type { NutritionBadgeProps, NutritionKind } from './NutritionBadge';

export interface NutritionBadgeV4Props extends NutritionBadgeProps {
  /**
   * The figure a measured attribute carries — `'420'` for `calories`.
   *
   * The preset ships `calories` with the word "Calories" and nothing else, so
   * the number and its unit both had to be typed into `label` by hand and
   * nothing enforced that either arrived.
   */
  value?: string;
  /** The figure's unit. Defaults to `'cal'` for `calories`, otherwise none. */
  unit?: string;
}

/** Glyph per attribute — carried over from the base preset unchanged. */
const GLYPH: Record<NutritionKind, string> = {
  vegetarian: '🥬',
  vegan: '🌱',
  'gluten-free': '🌾',
  spicy: '🌶️',
  halal: '☪️',
  popular: '🔥',
  new: '✨',
  calories: '🔢',
};

/** Word per attribute — carried over from the base preset unchanged. */
const LABEL: Record<NutritionKind, string> = {
  vegetarian: 'Vegetarian',
  vegan: 'Vegan',
  'gluten-free': 'Gluten-free',
  spicy: 'Spicy',
  halal: 'Halal',
  popular: 'Popular',
  new: 'New',
  calories: 'Calories',
};

/** The one attribute that measures something, and the unit it measures in. */
const UNIT: Partial<Record<NutritionKind, string>> = { calories: 'cal' };

/**
 * **V4 nutrition badge** — the web twin of the native `NutritionBadgeV4`, same
 * props as {@link NutritionBadge} plus `value` and `unit`.
 *
 * ## Four changes
 *
 * 1. **A dietary marker is identity, not status.** The preset typed
 *    `vegetarian` and `vegan` as `success`, `spicy` as `danger` and `popular`
 *    as `warn` — so a menu row of dietary markers read as a row of alerts, and
 *    a genuine status badge standing beside them became indistinguishable from
 *    a lettuce leaf. `DIET_TONE` settles it: everything dietary is `neutral`,
 *    `spicy` keeps a warm tone as `accent` because heat is the one case where
 *    the colour conventionally carries meaning, and `popular`/`new` are
 *    `primary` because they are the menu's own emphasis.
 * 2. **`calories` can carry its figure.** `value` and `unit` render as
 *    `420 cal` — tabular, so a column of them lines up — instead of leaving
 *    the caller to hand-assemble the string into `label` and hoping.
 * 3. **It takes the module's one badge shape.** `BADGE_V4` — `soft`, `sm` —
 *    so a dietary marker, a delivery estimate pill and a reservation status
 *    are visibly one family, and `BadgeV4`'s soft tint is an opaque
 *    `color-mix` rather than the base's neutral ramp step.
 * 4. **The glyph is hidden from the reader.** It was an `Icon` beside the word
 *    it duplicates, which is a second stop announcing the same thing.
 */
export const NutritionBadgeV4 = React.forwardRef<HTMLSpanElement, NutritionBadgeV4Props>(
  function NutritionBadgeV4(
    { kind, label, tone, value, unit, hideGlyph = false, className },
    ref
  ) {
    const measured = [value, unit ?? UNIT[kind]].filter(Boolean).join(' ');
    const text = label ?? (measured !== '' ? measured : LABEL[kind]);
    // Identity first; an explicit `tone` still wins, and the preset's own tone
    // is the last resort so a kind DIET_TONE has never heard of still renders.
    const resolvedTone = tone ?? DIET_TONE[kind] ?? 'neutral';

    return (
      <BadgeV4
        ref={ref}
        {...BADGE_V4}
        tone={resolvedTone}
        className={cn(measured !== '' && !label && TABULAR_CLASS, className)}
      >
        {!hideGlyph ? (
          // The word is right beside it; a glyph that repeats the word is a
          // second reader stop saying nothing new.
          <span aria-hidden="true">{GLYPH[kind]}</span>
        ) : null}
        {text}
      </BadgeV4>
    );
  }
);
