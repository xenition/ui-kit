import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import type { MealCardProps, MealMacros, MealVariant } from './MealCard';
import {
  appearanceClass,
  appearanceStateVars,
  FOCUS_RING_CLASS,
  HEALTH_CARD_CLASS,
  spokenLine,
  type Appearance,
} from './internal/tone-v4';

/** The three macronutrients a logged meal breaks down into. */
export type Macro = keyof MealMacros;

export interface MealCardV4Props extends MealCardProps {
  /** Override the three macro words. */
  macroLabels?: Partial<Record<Macro, string>>;
  /** Render the calorie figure. Default `'420 kcal'`. */
  formatCalories?: (kcal: number) => string;
  /** Surface preset, matching the native twin. Default `'classic'`. */
  appearance?: Appearance;
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

/**
 * Macros in a fixed order, each with a **shape**.
 *
 * The base gave carbs `warn` and fat `accent`, which is a status colour spent
 * on a nutrient — see the docblock's change 1. A disc, a square and a diamond
 * separate the three for a quick scan without borrowing a vocabulary that is
 * supposed to mean "something is wrong", and they are decorative: the word is
 * beside every one of them.
 */
const MACROS: ReadonlyArray<{ key: Macro; label: string; shape: string }> = [
  { key: 'protein', label: 'Protein', shape: 'rounded-full' },
  { key: 'carbs', label: 'Carbs', shape: 'rounded-none' },
  { key: 'fat', label: 'Fat', shape: 'rotate-45 rounded-none' },
];

/**
 * **V4 meal card** — same props as {@link MealCard} plus `macroLabels`,
 * `formatCalories` and `appearance`.
 *
 * ## Five changes
 *
 * 1. **Carbohydrates stopped being a warning.** The macro strip painted carbs
 *    `warn` and `MealCardV2` painted breakfast `warn` — a status colour spent
 *    on *identity*, so a perfectly ordinary bowl of oats drew in the same hue
 *    the kit uses to say something is wrong. The three macros are told apart by
 *    shape and by their own word instead, and the status vocabulary is left
 *    free to mean status.
 * 2. **The calories and the macros were pruned from the reader.** The whole
 *    card was one `role="button"` whose `aria-label` named the meal and the
 *    dish and nothing else — and a button's name *replaces* its contents, so
 *    "420 kcal, Protein 30g, Carbs 45g, Fat 12g" reached nobody. The card is a
 *    plain container now, the activation wraps the dish, and the breakdown sits
 *    beside it where it can still be read.
 * 3. **The activation is a real `<button>` that clears 44.** `div` +
 *    `role="button"` + `tabIndex` + a hand-written Enter/Space handler is three
 *    approximations of a button.
 * 4. **Press is a state layer.** `hover:opacity-90` fades the card's own
 *    content, which is M3's *disabled* signal at close to the same strength.
 * 5. **"kcal" and the three macro words are props**, where a localised app
 *    previously had to fork the component to translate them.
 */
export const MealCardV4 = React.forwardRef<HTMLDivElement, MealCardV4Props>(function MealCardV4(
  {
    name,
    variant,
    calories,
    macros,
    time,
    onPress,
    macroLabels,
    formatCalories,
    appearance = 'classic',
    className,
    ...rest
  },
  ref
) {
  React.useEffect(() => {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
  }, []);

  const meta = MEAL_META[variant];
  const showCalories = formatCalories ?? ((kcal: number) => `${kcal} kcal`);
  const shown = MACROS.filter((macro) => macros?.[macro.key] != null);

  const head = (
    <>
      <span className="flex items-center gap-sm">
        <span aria-hidden className="text-lg leading-none">
          {meta.glyph}
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-xs">
          <span className="flex justify-between">
            <span className="text-xs font-semibold text-muted-text">{meta.label}</span>
            {time ? <span className="text-xs text-muted-text">{time}</span> : null}
          </span>
          <span className="truncate text-base font-semibold text-on-card">{name}</span>
        </span>
      </span>
      {calories != null ? (
        <span className="text-lg font-bold text-on-card">{showCalories(calories)}</span>
      ) : null}
    </>
  );

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-sm',
        HEALTH_CARD_CLASS,
        appearanceClass(appearance),
        className
      )}
      {...rest}
    >
      {onPress ? (
        <button
          type="button"
          aria-label={spokenLine([
            meta.label,
            name,
            calories != null ? showCalories(calories) : undefined,
            time,
          ])}
          onClick={onPress}
          data-xen-v4-state=""
          style={appearanceStateVars(appearance)}
          className={cn(
            'flex flex-col gap-sm rounded-[var(--xen-radius-md)] bg-transparent text-left',
            MIN_TAP_CLASS,
            FOCUS_RING_CLASS
          )}
        >
          {head}
        </button>
      ) : (
        <span className="flex flex-col gap-sm">{head}</span>
      )}

      {/* Beside the activation: a button's name replaces its contents. */}
      {shown.length ? (
        <ul className="flex flex-wrap gap-sm">
          {shown.map((macro) => (
            <li
              key={macro.key}
              className="flex items-center gap-xs rounded-[var(--xen-radius-full)] bg-[color-mix(in_srgb,var(--xen-on-card)_8%,var(--xen-card))] px-sm py-xs"
            >
              <span aria-hidden className={cn('h-2 w-2 shrink-0 bg-muted', macro.shape)} />
              <span className="text-xs text-on-card">
                {`${macroLabels?.[macro.key] ?? macro.label} ${macros?.[macro.key]}g`}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
});
