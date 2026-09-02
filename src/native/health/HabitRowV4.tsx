import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressFill } from '../primitives/internal/state-v4';
import { appearanceStyle } from '../primitives/internal/appearance';
import { rowContainerStyle, rowTextStyle } from '../dashboard/internal/row-v4';
import { pluralizeUnit } from '../../health/goal-v4';
import { spokenLine, toneInk, trackGround } from './internal/tone-v4';
import type { HabitRowProps } from './HabitRow';

export interface HabitRowV4Props extends HabitRowProps {
  /** Announced for a habit completed this period. Default `'done'`. */
  doneLabel?: string;
  /** Announced for one still outstanding. Default `'not done'`. */
  notDoneLabel?: string;
}

/** The check disc, as a fraction of the 44 target it sits in. */
const DISC_RATIO = 0.6;

/**
 * **V4 habit row** — same props as {@link HabitRow} plus `doneLabel` and
 * `notDoneLabel`.
 *
 * ## Five changes
 *
 * 1. **The check clears 44.** It was a 26px disc, and ticking a habit off is
 *    the single thing this row exists for.
 * 2. **The streak is a sibling of the toggle, not a descendant.** A
 *    `Pressable` is `accessible` by default and flattens everything under it,
 *    so the streak count was folded into the checkbox and could not be reached
 *    on its own. The row is a plain `View` now, the checkbox wraps the check
 *    and the habit's text, and the streak sits beside it with its own name.
 * 3. **The non-toggling branch is `accessible`**, so its label is no longer
 *    dead on iOS.
 * 4. **Press is a state layer**, where `opacity: pressed ? 0.7 : 1` dimmed the
 *    row's content into M3's disabled band.
 * 5. **The streak count is pluralised properly**, through the shared
 *    `pluralizeUnit`, rather than by appending `'s'` — and the flame is marked
 *    decorative so a reader hears "5 day streak" instead of "fire, 5".
 *
 * **Renders nothing without a `name`.**
 */
export function HabitRowV4({
  name,
  done,
  streak = 0,
  meta,
  doneLabel = 'done',
  notDoneLabel = 'not done',
  onToggle,
  appearance = 'classic',
  style,
}: HabitRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!name) return null;

  const safeStreak = Math.max(Math.floor(streak), 0);
  const spoken = spokenLine([name, done ? doneLabel : notDoneLabel, meta]);
  const streakName =
    safeStreak > 0 ? `${safeStreak} ${pluralizeUnit(safeStreak, 'day')} streak` : null;
  const tap = minTap(tokens.spacing);
  const disc = Math.round(tap * DISC_RATIO);

  const toggle = (pressed: boolean): React.ReactElement => (
    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, minWidth: 0 }}>
      <View style={{ width: tap, height: tap, alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={{
            width: disc,
            height: disc,
            borderRadius: tokens.radius.full,
            borderWidth: 2,
            borderColor: done ? colors.success : trackGround(theme),
            backgroundColor: done ? colors.success : pressed ? pressFill(theme) : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {done ? (
            <TextV4
              size="sm"
              weight="bold"
              allowFontScaling={false}
              style={{ color: colors.onSuccess }}
            >
              ✓
            </TextV4>
          ) : null}
        </View>
      </View>
      <View style={rowTextStyle(theme)}>
        <TextV4
          size="base"
          weight="semibold"
          tone={done ? 'mutedText' : 'onSurface'}
          numberOfLines={1}
          style={{ textDecorationLine: done ? 'line-through' : 'none' }}
        >
          {name}
        </TextV4>
        {meta ? (
          <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
            {meta}
          </TextV4>
        ) : null}
      </View>
    </View>
  );

  return (
    <View
      style={[
        appearance !== 'classic'
          ? { ...appearanceStyle(appearance, colors, tokens), borderRadius: tokens.radius.md }
          : null,
        rowContainerStyle(theme, { twoLine: meta != null && meta !== '' }),
        style,
      ]}
    >
      {onToggle ? (
        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: done }}
          accessibilityLabel={spoken}
          onPress={() => onToggle(!done)}
          style={{ flex: 1, minWidth: 0 }}
        >
          {({ pressed }) => toggle(pressed)}
        </Pressable>
      ) : (
        <View accessible accessibilityLabel={spoken} style={{ flex: 1, minWidth: 0 }}>
          {toggle(false)}
        </View>
      )}

      {streakName ? (
        <View
          accessible
          accessibilityLabel={streakName}
          style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}
        >
          <TextV4
            size="sm"
            allowFontScaling={false}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            🔥
          </TextV4>
          <TextV4
            size="sm"
            weight="bold"
            numeric="tabular"
            style={{ color: toneInk(theme, 'warn') }}
          >
            {safeStreak}
          </TextV4>
        </View>
      ) : null}
    </View>
  );
}
