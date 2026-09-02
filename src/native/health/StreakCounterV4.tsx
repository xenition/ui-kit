import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { pluralizeUnit } from '../../health/goal-v4';
import { looseCardStyle, spokenLine, toneInk } from './internal/tone-v4';
import type { StreakCounterProps, StreakCounterTone } from './StreakCounter';

export type { StreakCounterTone };

export interface StreakCounterV4Props extends StreakCounterProps {
  /** Plural form of `unit`. Default `unit + 's'` — pass it for any other language. */
  unitPlural?: string;
  /** Shown when there is no streak yet. Default `'Start your streak'`. */
  emptyLabel?: string;
  /** Caption for the record value. Default `'Best'`. */
  bestLabel?: string;
  /** Format the count. Default the number itself. */
  formatCount?: (count: number) => string;
}

/**
 * **V4 streak counter** — same props as {@link StreakCounter} plus
 * `unitPlural`, `emptyLabel`, `bestLabel` and `formatCount`.
 *
 * ## Four changes
 *
 * 1. **`unit="día"` no longer renders "díass".** The base appended `'s'`
 *    unconditionally, so every non-English unit this component was handed came
 *    out wrong. It goes through the shared `pluralizeUnit`, and `unitPlural`
 *    lets the caller's language be the caller's business.
 * 2. **The whole readout is `accessible`.** `accessibilityRole="summary"` and
 *    a computed label sat on a plain `Animated.View`, which is never an
 *    accessibility element on iOS — so the one component in the module whose
 *    entire content is a number announced nothing.
 * 3. **The record reaches the spoken name.** "Best: 42" was drawn and then
 *    left out of the label, which is the number a user checks the screen for.
 * 4. **Every English string is a prop**, and the flame is marked decorative so
 *    a reader hears "12 day streak" rather than "fire, 12".
 */
export function StreakCounterV4({
  count,
  unit = 'day',
  label = 'streak',
  tone = 'warn',
  best,
  unitPlural,
  emptyLabel = 'Start your streak',
  bestLabel = 'Best',
  formatCount,
  appearance = 'classic',
  style,
}: StreakCounterV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;

  const safe = Math.max(Math.floor(count), 0);
  const format = formatCount ?? ((n: number) => String(n));
  const unitWord = pluralizeUnit(safe, unit, unitPlural);
  const record = best != null && best > 0 ? Math.max(Math.floor(best), 0) : null;
  const recordLine = record != null ? `${bestLabel}: ${format(record)}` : null;

  const name = spokenLine([
    safe === 0 ? emptyLabel : `${format(safe)} ${unitWord} ${label}`,
    recordLine,
  ]);

  return (
    <View
      accessible
      accessibilityRole="summary"
      accessibilityLabel={name}
      style={[
        { alignItems: 'center', gap: tokens.spacing.xs },
        looseCardStyle(theme, appearance),
        style,
      ]}
    >
      <TextV4
        size="2xl"
        allowFontScaling={false}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        {safe === 0 ? '🌱' : '🔥'}
      </TextV4>
      {safe === 0 ? (
        <TextV4 size="sm" tone="mutedText">
          {emptyLabel}
        </TextV4>
      ) : (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
            <TextV4
              size="3xl"
              weight="bold"
              numeric="tabular"
              style={{ color: toneInk(theme, tone) }}
            >
              {format(safe)}
            </TextV4>
            <TextV4 size="base" tone="mutedText">
              {unitWord}
            </TextV4>
          </View>
          <TextV4 size="sm" tone="onSurface">
            {label}
          </TextV4>
        </>
      )}
      {recordLine ? (
        <TextV4 size="xs" tone="mutedText" numeric="tabular">
          {recordLine}
        </TextV4>
      ) : null}
    </View>
  );
}
