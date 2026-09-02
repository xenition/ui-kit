import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressFill } from '../primitives/internal/state-v4';
import { goalParts } from '../../health/goal-v4';
import { cardStyle, percentValue, spokenLine, toneInk, trackGround } from './internal/tone-v4';
import type { WaterTrackerProps } from './WaterTracker';

export interface WaterTrackerV4Props extends WaterTrackerProps {
  /** Shown when there is no usable goal. Default `'No hydration goal set'`. */
  noGoalLabel?: string;
  /** Format the volume total. Default `'2500 ml'`. */
  formatAmount?: (ml: number) => string;
  /** Name one glass. Default `'Glass 3, filled'`. */
  glassLabel?: (index: number, filled: boolean) => string;
}

/** The drawn glass, inside its 44 target. A tall rounded vessel, not a glyph. */
const GLASS_RATIO = 0.6;

/**
 * The card's own two English words.
 *
 * They are not props, deliberately: the health twins share one prop table, and
 * a prop that exists on only one platform is exactly the drift the V4 pass is
 * closing. Widening the table is a decision for both halves at once.
 */
const TITLE = 'Water';
const MET = 'goal reached';

/**
 * **V4 water tracker** — same props as {@link WaterTracker} plus
 * `noGoalLabel`, `formatAmount` and `glassLabel`.
 *
 * ## Six changes
 *
 * 1. **Ten glasses against a goal of eight now read as ten.** The base clamped
 *    the count into the goal, so someone who drank 2 500 ml saw "8 / 8 · 2000
 *    ml" — the overshoot, which is the only interesting thing about that day,
 *    was destroyed rather than merely not drawn. The extra glasses are drawn,
 *    counted and announced.
 * 2. **Filled and empty are different shapes, not different alphas.** The base
 *    wrote `{isFilled ? '🥛' : '🥛'}` — a dead ternary — and carried the whole
 *    distinction in `opacity: 0.3`, which is inside M3's disabled band and
 *    reads as "this glass is unavailable". A glass is now a drawn vessel with
 *    a real fill level.
 * 3. **A glass is a 44 target.** At roughly 20px they were the smallest
 *    controls in the module and the most tapped control on a hydration screen.
 * 4. **The readout is a real `progressbar`.** The base put an
 *    `accessibilityLabel` on a non-`accessible` `Animated.View`, where iOS
 *    ignores it, so the card had no spoken summary at all.
 * 5. **The "no goal" branch keeps `style` and `appearance`.** It returned a
 *    bare `<Text>` before either was applied.
 * 6. **Press is a state layer**, where `opacity: pressed ? 0.6 : 1` dimmed the
 *    glass into the same band that already meant "empty".
 */
export function WaterTrackerV4({
  count,
  goal,
  mlPerGlass,
  noGoalLabel = 'No hydration goal set',
  formatAmount,
  glassLabel,
  onChange,
  appearance = 'classic',
  style,
}: WaterTrackerV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const parts = goalParts(Math.floor(count), Math.floor(goal));
  const amount = formatAmount ?? ((ml: number) => `${ml} ml`);
  const nameGlass =
    glassLabel ??
    ((index: number, filled: boolean) => `Glass ${index + 1}, ${filled ? 'filled' : 'empty'}`);

  if (!parts.hasGoal) {
    return (
      <View style={[cardStyle(theme, appearance), style]}>
        <View accessible accessibilityLabel={noGoalLabel}>
          <TextV4 size="sm" tone="mutedText">
            {noGoalLabel}
          </TextV4>
        </View>
      </View>
    );
  }

  const target = parts.target ?? 0;
  const drunk = Math.max(0, Math.floor(parts.value));
  // Draw every glass that was actually logged, so a day past the goal looks
  // like a day past the goal rather than a day exactly on it.
  const slots = Math.max(target, drunk);
  const tap = minTap(tokens.spacing);
  const glassWidth = Math.round(tap * GLASS_RATIO);

  const readout = spokenLine([
    TITLE,
    `${drunk} of ${target}`,
    mlPerGlass != null ? amount(drunk * mlPerGlass) : null,
    parts.met ? MET : null,
    parts.over > 0 ? `+${parts.over}` : null,
  ]);

  const press = (index: number): void => {
    if (!onChange) return;
    const position = index + 1;
    onChange(position === drunk ? position - 1 : position);
  };

  return (
    <View style={[cardStyle(theme, appearance), style]}>
      <View
        accessible
        accessibilityRole="progressbar"
        accessibilityLabel={readout}
        accessibilityValue={percentValue(parts.percent)}
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <TextV4 size="base" weight="semibold" tone="onSurface">
          {`💧 ${TITLE}`}
        </TextV4>
        <TextV4
          size="sm"
          weight="semibold"
          numeric="tabular"
          style={{ color: parts.met ? toneInk(theme, 'success') : colors.mutedText }}
        >
          {`${drunk} / ${target}${mlPerGlass != null ? `  ·  ${amount(drunk * mlPerGlass)}` : ''}`}
        </TextV4>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {Array.from({ length: slots }, (_, i) => {
          const filled = i < drunk;
          // Past the goal is a status — the goal was beaten — so `success` is
          // spent on a status here rather than on an identity.
          const fill = filled ? (i >= target ? colors.success : colors.primary) : 'transparent';
          const glass = (pressed: boolean): React.ReactElement => (
            <View
              style={{
                width: tap,
                height: tap,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: tokens.radius.md,
                backgroundColor: pressed ? pressFill(theme) : 'transparent',
              }}
            >
              <View
                style={{
                  width: glassWidth,
                  height: glassWidth,
                  borderWidth: 2,
                  borderColor: filled ? fill : trackGround(theme),
                  backgroundColor: fill,
                  borderTopLeftRadius: tokens.radius.sm,
                  borderTopRightRadius: tokens.radius.sm,
                  borderBottomLeftRadius: tokens.radius.lg,
                  borderBottomRightRadius: tokens.radius.lg,
                }}
              />
            </View>
          );

          if (!onChange) {
            return (
              <View key={i} accessible accessibilityLabel={nameGlass(i, filled)}>
                {glass(false)}
              </View>
            );
          }
          return (
            <Pressable
              key={i}
              accessibilityRole="button"
              accessibilityState={{ selected: filled }}
              accessibilityLabel={nameGlass(i, filled)}
              onPress={() => press(i)}
            >
              {({ pressed }) => glass(pressed)}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
