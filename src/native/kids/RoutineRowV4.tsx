import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { pressOver } from '../primitives/internal/state-v4';
import { disabledOpacity } from '../primitives/internal/chrome-v4';
import { onPair, rowShellStyle, spokenLine, tapTargetStyle, toneFill } from './internal/tone-v4';
import type { RoutineRowProps, RoutineSlot } from './RoutineRow';

export interface RoutineRowV4Props extends RoutineRowProps {
  /** Open the step — separate from {@link RoutineRowV4Props.onToggle}. */
  onPress?: () => void;
  /** The word a completed step is announced with. Default `'done'`. */
  doneLabel?: string;
  /** The word an outstanding step is announced with. Default `'not done'`. */
  notDoneLabel?: string;
}

const SLOT_GLYPH: Record<RoutineSlot, string> = {
  morning: '🌅',
  afternoon: '☀️',
  evening: '🌆',
  bedtime: '🌙',
  anytime: '⏰',
};

/**
 * **V4 routine row** — same props as {@link RoutineRow} plus `onPress`,
 * `doneLabel` and `notDoneLabel`.
 *
 * ## Four changes
 *
 * 1. **A routine step can be opened.** The base made the *whole row* one
 *    `role="checkbox"`, which is the mirror image of `ChoreCard`'s defect: there
 *    was nowhere left to put "open this step", so a routine step could never be
 *    tapped into. The tick is now its own control — a real `checkbox` with its
 *    own name and a 44 target — and the label region is a `button` when
 *    `onPress` is supplied. Without `onPress` the label region stays inert and
 *    carries the row's spoken name, so the row still reads as one object.
 * 2. **The tick is a target, not a decoration.** It was a 24px circle with no
 *    floor under it; children aim worse than adults and it is the one thing on
 *    this row they touch every morning.
 * 3. **Disabled is 0.38, M3's band, not a hand-picked 0.5** — and it dims the
 *    *content* rather than the row's ground, so the row does not change colour
 *    when a step becomes unavailable.
 * 4. **Press is a state layer**, not `opacity: pressed ? 0.7 : 1`. An opacity
 *    that deep is what M3 spends on *disabled*, so a pressed row and a dead one
 *    looked alike. The row also paints `card`/`onCard` rather than the page's
 *    `surface`, so it reads as raised in dark mode.
 *
 * **Renders nothing without a `label`** (§4.5).
 */
export function RoutineRowV4({
  label,
  slot = 'anytime',
  icon,
  time,
  done = false,
  disabled = false,
  doneLabel = 'done',
  notDoneLabel = 'not done',
  onToggle,
  onPress,
  style,
}: RoutineRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!label) return null;

  const glyph = icon ?? SLOT_GLYPH[slot] ?? SLOT_GLYPH.anytime;
  const stateWord = done ? doneLabel : notDoneLabel;
  const name = spokenLine([label, time, stateWord]);
  const content = disabledOpacity(theme.state, disabled);

  const text = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        flex: 1,
        minWidth: 0,
        gap: tokens.spacing.xs,
        opacity: content,
        paddingVertical: tokens.spacing.xs,
        borderRadius: tokens.radius.sm,
        backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
      }}
    >
      <TextV4
        size="base"
        weight="semibold"
        tone="onCard"
        numberOfLines={1}
        style={{ textDecorationLine: done ? 'line-through' : 'none' }}
      >
        {label}
      </TextV4>
      {time ? (
        <TextV4 size="xs" tone="mutedText" numeric="tabular">
          {time}
        </TextV4>
      ) : null}
    </View>
  );

  const tick = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        tapTargetStyle(theme),
        {
          borderRadius: tokens.radius.full,
          opacity: content,
          backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
        },
      ]}
    >
      <View
        style={{
          width: tokens.spacing.lg,
          height: tokens.spacing.lg,
          borderRadius: tokens.radius.full,
          borderWidth: 1,
          borderColor: done ? toneFill(theme, 'success') : colors.border,
          backgroundColor: done ? toneFill(theme, 'success') : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {done ? (
          <TextV4
            size="xs"
            weight="bold"
            allowFontScaling={false}
            style={{ color: onPair(theme, 'success') }}
          >
            ✓
          </TextV4>
        ) : null}
      </View>
    </View>
  );

  return (
    <View style={[rowShellStyle(theme), style]}>
      <TextV4
        size="lg"
        allowFontScaling={false}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{ opacity: content }}
      >
        {glyph}
      </TextV4>

      {onPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={name}
          accessibilityState={{ disabled }}
          disabled={disabled}
          onPress={onPress}
          style={{ flex: 1, minWidth: 0 }}
        >
          {({ pressed }) => text(pressed)}
        </Pressable>
      ) : (
        <View accessible accessibilityLabel={name} style={{ flex: 1, minWidth: 0 }}>
          {text(false)}
        </View>
      )}

      {/* The toggle is a SIBLING of the activation. Inside the row-wide
          `Pressable` the base used, it had no name and no separate stop. */}
      {onToggle ? (
        <Pressable
          accessibilityRole="checkbox"
          accessibilityLabel={spokenLine([label, stateWord])}
          accessibilityState={{ checked: done, disabled }}
          disabled={disabled}
          onPress={() => onToggle(!done)}
        >
          {({ pressed }) => tick(pressed)}
        </Pressable>
      ) : (
        <View accessible accessibilityLabel={stateWord}>
          {tick(false)}
        </View>
      )}
    </View>
  );
}
