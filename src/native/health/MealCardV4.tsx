import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { pressFill } from '../primitives/internal/state-v4';
import { cardStyle, metaLine, spokenLine, trackGround } from './internal/tone-v4';
import type { MealCardProps, MealMacros, MealVariant } from './MealCard';

export type { MealVariant, MealMacros };

/** One of the three macronutrients a meal is broken down into. */
export type Macro = keyof MealMacros;

export interface MealCardV4Props extends MealCardProps {
  /** Wording for each macro. Defaults to `Protein` / `Carbs` / `Fat`. */
  macroLabels?: Partial<Record<Macro, string>>;
  /** Format the calorie readout. Default `'420 kcal'`. */
  formatCalories?: (kcal: number) => string;
}

const MEAL_GLYPH: Record<MealVariant, string> = {
  breakfast: '🍳',
  lunch: '🥗',
  dinner: '🍽️',
  snack: '🍎',
};

const MEAL_LABEL: Record<MealVariant, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snack',
};

const MACRO_LABEL: Record<Macro, string> = {
  protein: 'Protein',
  carbs: 'Carbs',
  fat: 'Fat',
};

/** Macro order, and the **shape** each one's key is drawn as. */
const MACRO_ORDER: ReadonlyArray<{ key: Macro; shape: 'circle' | 'square' | 'bar' }> = [
  { key: 'protein', shape: 'circle' },
  { key: 'carbs', shape: 'square' },
  { key: 'fat', shape: 'bar' },
];

/**
 * **V4 meal card** — same props as {@link MealCard} plus `macroLabels` and
 * `formatCalories`.
 *
 * ## Five changes
 *
 * 1. **Carbohydrate stops being a warning.** The base drew the macro key as
 *    `protein: primary`, `carbs: warn`, `fat: accent` — an amber dot beside
 *    the word "Carbs" on every meal anyone ever logged. A status colour has to
 *    mean status or it means nothing, so a macro is identified by its **shape**
 *    now — a disc, a square, a bar — in neutral ink.
 * 2. **The macro strip is a sibling of the card's activation.** A `Pressable`
 *    is `accessible` by default and flattens its subtree, so on iOS the whole
 *    breakdown was pruned and the card announced only its slot, name and
 *    calories.
 * 3. **The card announces its macros and its time**, which the base computed
 *    and drew but left out of the name that replaces them.
 * 4. **Press is a state layer**, not `opacity: pressed ? 0.85 : 1`, which sits
 *    inside M3's disabled band.
 * 5. **The non-pressable branch is `accessible`**, so its label is no longer
 *    dead on iOS.
 *
 * **Renders nothing without a `name`.**
 */
export function MealCardV4({
  name,
  variant,
  calories,
  macros,
  time,
  macroLabels,
  formatCalories,
  onPress,
  appearance = 'classic',
  style,
}: MealCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!name) return null;

  const slot = MEAL_LABEL[variant];
  const kcal = formatCalories ?? ((n: number) => `${n} kcal`);
  const shown = MACRO_ORDER.filter((macro) => macros?.[macro.key] != null).map((macro) => ({
    ...macro,
    label: macroLabels?.[macro.key] ?? MACRO_LABEL[macro.key],
    grams: macros?.[macro.key] as number,
  }));

  const macroLine = shown.map((macro) => `${macro.label} ${macro.grams}g`);
  const name_ = spokenLine([
    slot,
    name,
    time,
    calories != null ? kcal(calories) : null,
    ...macroLine,
  ]);

  const heading = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        gap: tokens.spacing.sm,
        borderRadius: tokens.radius.md,
        backgroundColor: pressed ? pressFill(theme) : 'transparent',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <TextV4
          size="lg"
          allowFontScaling={false}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          {MEAL_GLYPH[variant]}
        </TextV4>
        <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextV4 size="xs" weight="semibold" tone="mutedText">
              {slot}
            </TextV4>
            {time ? (
              <TextV4 size="xs" tone="mutedText" numeric="tabular">
                {time}
              </TextV4>
            ) : null}
          </View>
          <TextV4 size="base" weight="semibold" tone="onSurface" numberOfLines={1}>
            {name}
          </TextV4>
        </View>
      </View>

      {calories != null ? (
        <TextV4 size="lg" weight="bold" tone="onSurface" numeric="tabular">
          {kcal(calories)}
        </TextV4>
      ) : null}
    </View>
  );

  return (
    <View style={[cardStyle(theme, appearance), style]}>
      {onPress ? (
        <Pressable accessibilityRole="button" accessibilityLabel={name_} onPress={onPress}>
          {({ pressed }) => heading(pressed)}
        </Pressable>
      ) : (
        <View accessible accessibilityLabel={name_}>
          {heading(false)}
        </View>
      )}

      {shown.length > 0 ? (
        <View
          accessible
          accessibilityLabel={metaLine(macroLine)}
          style={{ flexDirection: 'row', gap: tokens.spacing.lg }}
        >
          {shown.map((macro) => (
            <View
              key={macro.key}
              style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}
            >
              {/* Shape, not tone: three macros are an identity, and identity
                  spends glyphs and silhouettes rather than status colours. */}
              <View
                style={{
                  width: tokens.spacing.sm,
                  height: macro.shape === 'bar' ? tokens.spacing.xs : tokens.spacing.sm,
                  borderRadius:
                    macro.shape === 'circle'
                      ? tokens.radius.full
                      : macro.shape === 'bar'
                        ? tokens.radius.full
                        : 0,
                  backgroundColor: macro.shape === 'square' ? colors.onSurface : trackGround(theme),
                  borderWidth: macro.shape === 'square' ? 0 : 1,
                  borderColor: colors.onSurface,
                }}
              />
              <TextV4 size="xs" tone="mutedText" numeric="tabular">
                {`${macro.label} ${macro.grams}g`}
              </TextV4>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}
