import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { placeholderGround, spokenLine, toneFill } from './internal/arcade-v4';
import { clamp, formatCount } from './types';
import type { LevelBarProps } from './LevelBar';

export type LevelBarV4Props = LevelBarProps;

/**
 * **V4 level bar** — the same props as {@link LevelBar}.
 *
 * ## Four changes
 *
 * 1. **The XP fraction is actually announced.** The base's docstring says "the
 *    bar carries an `accessibilityValue` so the fraction is announced" — and
 *    it does not. The `Progress` primitive supplies the value correctly, and
 *    then the wrapping `View` sets `accessible` with its own label, which
 *    collapses the subtree and drops the `progressbar` with it. A reader heard
 *    "Level 7, 40% to next level" and could never reach the meter. The bar is
 *    now the labelled `progressbar` itself, so the level, the XP and the value
 *    arrive together, in one stop, from the element that owns them.
 * 2. **`warn` means `warn`.** The base `Progress` routes a `warn` bar to the
 *    `accent` token — a brand colour standing in for a semantic one — with the
 *    comment that there is no warning slot. There is one, and the tone table
 *    hands it over.
 * 3. **The track is an opaque placeholder, not the `border` hairline used as a
 *    fill.** A rule between rows and the unfilled half of a meter are not the
 *    same object and should not share a token.
 * 4. **The readout is drawn, not read twice.** `12.3K / 20K XP` and `62%` sat
 *    beside a bar that says the same thing, as two more stops; they are hidden
 *    from the reader and the numerals are tabular so the percentage does not
 *    jitter as it climbs. The chip and the bar's geometry come off the spacing
 *    scale.
 */
export function LevelBarV4({
  level,
  xp,
  xpMax,
  variant = 'default',
  tone = 'primary',
  style,
}: LevelBarV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const compact = variant === 'compact';

  const max = Number.isFinite(xpMax) && xpMax > 0 ? xpMax : 0;
  const value = max > 0 ? clamp(xp, 0, max) : 0;
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;

  const chip = compact ? tokens.spacing.xl : minTap(tokens.spacing) - tokens.spacing.xs;
  const xpLine = `${formatCount(value)} / ${formatCount(max)} XP`;

  return (
    <View
      style={[
        { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md },
        style,
      ]}
    >
      {/* The number is repeated in the bar's name, so the chip is a mark. */}
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{
          width: chip,
          height: chip,
          borderRadius: chip / 2,
          backgroundColor: colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TextV4 size="sm" weight="bold" tone="onPrimary" numeric="tabular">
          {String(level)}
        </TextV4>
      </View>

      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
        {/* Change 1: the meter names itself, so nothing above it has to — and
            nothing above it may, because naming a container prunes this. */}
        <View
          accessibilityRole="progressbar"
          accessibilityLabel={spokenLine([`Level ${level}`, xpLine])}
          accessibilityValue={{ min: 0, max: max || 1, now: value }}
          style={{
            height: compact ? tokens.spacing.xs : tokens.spacing.sm,
            borderRadius: tokens.radius.full,
            backgroundColor: placeholderGround(theme),
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              width: `${pct}%`,
              height: '100%',
              borderRadius: tokens.radius.full,
              backgroundColor: toneFill(theme, tone),
            }}
          />
        </View>
        {!compact ? (
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <TextV4 size="xs" tone="mutedText" numeric="tabular">
              {xpLine}
            </TextV4>
            <TextV4 size="xs" weight="semibold" tone="mutedText" numeric="tabular">
              {`${pct}%`}
            </TextV4>
          </View>
        ) : null}
      </View>
    </View>
  );
}
