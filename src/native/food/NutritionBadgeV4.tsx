import * as React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { BADGE_V4, DIET_TONE, toneInk, type ToneV4 } from './internal/menu-v4';
import type { NutritionBadgeProps, NutritionKind } from './NutritionBadge';

/**
 * The tone union, spelled the same on both twins.
 *
 * The web `BadgeTone` carries a `muted` step and the native one does not, for a
 * prop whose doc comment is identical in both files — so `tone="muted"` is a
 * compile error on one platform and a valid badge on the other. V4 accepts the
 * union on both; native resolves `muted` to a neutral badge inked with
 * `mutedText`, which is what the web step draws.
 */
export type NutritionToneV4 = ToneV4 | 'muted';

/**
 * `tone` is widened rather than inherited, so the two twins take the same
 * union — an interface cannot broaden a property it extends.
 */
export interface NutritionBadgeV4Props extends Omit<NutritionBadgeProps, 'tone'> {
  /** Override the semantic tone. */
  tone?: NutritionToneV4;
  /**
   * The figure this badge reports — `'420'` for `calories`, `'12'` for grams
   * of protein. Composed with {@link NutritionBadgeV4Props.unit} into the
   * label and set in tabular figures, so a column of them lines up.
   */
  value?: string;
  /** The unit beside `value`. Defaults to `'cal'` for `calories`, otherwise none. */
  unit?: string;
  /** Style override — layout only, never size or colour. */
  style?: StyleProp<ViewStyle>;
}

const META: Record<NutritionKind, { label: string; glyph: string }> = {
  vegetarian: { label: 'Vegetarian', glyph: '🥬' },
  vegan: { label: 'Vegan', glyph: '🌱' },
  'gluten-free': { label: 'Gluten-free', glyph: '🌾' },
  spicy: { label: 'Spicy', glyph: '🌶️' },
  halal: { label: 'Halal', glyph: '☪️' },
  popular: { label: 'Popular', glyph: '🔥' },
  new: { label: 'New', glyph: '✨' },
  calories: { label: 'Calories', glyph: '🔢' },
};

/**
 * **V4 nutrition badge** — same props as {@link NutritionBadge} plus `value`,
 * `unit` and `style`, with a `tone` union that matches the web twin.
 *
 * ## Five changes
 *
 * 1. **A dietary marker is identity, not status.** The base typed `vegetarian`
 *    and `vegan` as `success`, `spicy` as `danger` and `popular` as `warn`. A
 *    row of dish markers therefore rendered as a row of alerts — vegan read as
 *    a passing check and spicy as a failure — and a genuine status badge next
 *    to them was indistinguishable from a diet chip. Tones now come from the
 *    shared `DIET_TONE` table, where the identity markers are neutral and only
 *    `spicy` keeps a warm tone: `accent`, because heat is the one case where
 *    the colour is conventional, and `accent` cannot be read as a failure.
 * 2. **`calories` can carry its figure.** The preset ships the label
 *    "Calories" with no number and no unit, so a caller had to type
 *    `label="420 cal"` by hand and nothing in the component knew 420 was a
 *    quantity. `value` and `unit` compose the label and set the figure in
 *    tabular numerals.
 * 3. **`tone` takes the same union on both platforms** — see
 *    {@link NutritionToneV4}.
 * 4. **The label is inked with the tone's text slot.** The base painted the
 *    label `onSurface` / `onPrimary` — colours the compiler guarantees against
 *    a *fill* that a soft badge never draws.
 * 5. **Native gains `style`**, which every other component in the module has
 *    and this one did not, so a badge could not be given a margin without a
 *    wrapper view around it.
 */
export function NutritionBadgeV4({
  kind,
  label,
  tone,
  hideGlyph = false,
  value,
  unit,
  style,
}: NutritionBadgeV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors } = theme;
  const meta = META[kind];

  // Identity, not status. An unknown kind falls back to neutral rather than to
  // a colour that would claim something about the dish.
  const resolved: NutritionToneV4 = tone ?? DIET_TONE[kind] ?? 'neutral';
  const isMuted = resolved === 'muted';
  const badgeTone: ToneV4 = isMuted ? 'neutral' : resolved;
  const ink = isMuted ? colors.mutedText : toneInk(theme, badgeTone);

  // `calories` is the one kind whose unit is not a caller's decision.
  const resolvedUnit = unit ?? (kind === 'calories' ? 'cal' : undefined);
  const figure =
    value != null && value !== '' ? [value, resolvedUnit].filter(Boolean).join(' ') : null;
  const text = label ?? figure ?? meta.label;
  // Only a figure gets tabular numerals; a word does not need them.
  const numeric = label == null && figure != null ? 'tabular' : 'proportional';

  return (
    <BadgeV4 tone={badgeTone} variant={BADGE_V4.variant} size={BADGE_V4.size} style={style}>
      {!hideGlyph ? <IconV4 glyph={meta.glyph} size="xs" /> : null}
      {/* Children are a fragment, so the badge will not auto-ink a string
          child — the tone's *text* slot is set here explicitly. */}
      <TextV4 size="xs" weight="semibold" numeric={numeric} style={{ color: ink }}>
        {text}
      </TextV4>
    </BadgeV4>
  );
}
