import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { pressOver } from '../primitives/internal/state-v4';
import { placeholderGround, spokenLine } from './internal/arcade-v4';
import type { AchievementUnlockProps } from './AchievementUnlock';

export interface AchievementUnlockV4Props extends AchievementUnlockProps {
  /** Overline and spoken state while the trophy is locked. Default `'Locked'`. */
  lockedLabel?: string;
  /** Unit after the point value. Default `'G'` — the base's bare `" G"` suffix. */
  pointsUnit?: string;
}

/**
 * **V4 achievement unlock** — same props as {@link AchievementUnlock} plus
 * `lockedLabel` and `pointsUnit`.
 *
 * ## Five changes
 *
 * 1. **A locked achievement does not fire `onPress`.** The base set
 *    `accessibilityState={{ disabled: !unlocked }}` and left the `Pressable`
 *    live — the state is advisory, `disabled` is what actually blocks the
 *    press — so a locked trophy announced itself as unavailable and then
 *    opened anyway. (The web twin says `aria-disabled` and fires `onClick`,
 *    and its own docstring claims a real disabled `<button>`.) It is now
 *    genuinely disabled, and it dims to M3's 0.38 rather than staying at full
 *    strength.
 * 2. **The card announces its content.** The name was
 *    `` `${label}: ${title}` `` — the criteria and the point value, the two
 *    things that say what the trophy is *for*, were inside a subtree the label
 *    had already collapsed.
 * 3. **A trophy is identity, not a warning.** The medallion, its ring and the
 *    overline were all `warn` — a status slot spent on a decoration — and the
 *    overline used the `warn` *fill* as text. The medallion is the module's
 *    opaque neutral ground with the glyph as its ink, so it reads the same in
 *    both schemes and frees `warn` to mean warn.
 * 4. **`pointsUnit` replaces the bare `" G"`.** A gamerscore suffix is
 *    Xbox-specific copy hard-coded into a design system.
 * 5. **A press is a state layer**, not `opacity: 0.9`.
 */
export function AchievementUnlockV4({
  achievement,
  variant = 'toast',
  unlocked = true,
  label = 'Achievement unlocked',
  lockedLabel = 'Locked',
  pointsUnit = 'G',
  onPress,
  style,
}: AchievementUnlockV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens, state } = theme;
  const inline = variant === 'inline';
  const medallion = tokens.spacing['2xl'] + tokens.spacing.sm;
  const overline = unlocked ? label : lockedLabel;
  const points = achievement.points != null ? `${achievement.points} ${pointsUnit}` : null;

  const body = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        {
          padding: tokens.spacing.lg,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : colors.card,
          // A locked trophy is unavailable, so it wears M3's disabled band —
          // not the 0.6 the V2/V3 lines picked, which sits inside it and says
          // "disabled" about things that are not.
          opacity: unlocked ? 1 : state.disabledContent,
        },
        inline
          ? { alignItems: 'center', gap: tokens.spacing.sm }
          : { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md },
        style,
      ]}
    >
      <View
        style={{
          width: medallion,
          height: medallion,
          borderRadius: medallion / 2,
          backgroundColor: placeholderGround(theme),
          borderWidth: 2,
          borderColor: colors.border,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TextV4 size="2xl" tone="onCard">
          {unlocked ? (achievement.glyph ?? '🏆') : '🔒'}
        </TextV4>
      </View>

      <View
        style={{
          flex: inline ? undefined : 1,
          minWidth: 0,
          gap: tokens.spacing.xs / 2,
          alignItems: inline ? 'center' : 'flex-start',
        }}
      >
        <TextV4
          size="xs"
          weight="bold"
          tone="mutedText"
          align={inline ? 'center' : 'auto'}
          style={{ textTransform: 'uppercase' }}
        >
          {overline}
        </TextV4>
        <TextV4
          size="lg"
          weight="bold"
          tone="onCard"
          numberOfLines={2}
          align={inline ? 'center' : 'auto'}
        >
          {achievement.title}
        </TextV4>
        {achievement.description ? (
          <TextV4
            size="sm"
            tone="mutedText"
            numberOfLines={inline ? 3 : 2}
            align={inline ? 'center' : 'auto'}
          >
            {achievement.description}
          </TextV4>
        ) : null}
        {points ? (
          <TextV4 size="xs" weight="semibold" tone="mutedText" numeric="tabular">
            {points}
          </TextV4>
        ) : null}
      </View>
    </View>
  );

  const name = spokenLine([overline, achievement.title, achievement.description, points]);

  if (!onPress) {
    return (
      <View accessible accessibilityRole="summary" accessibilityLabel={name}>
        {body(false)}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={name}
      accessibilityState={{ disabled: !unlocked }}
      // Change 1: the state was set and the handler was left live.
      disabled={!unlocked}
      onPress={() => onPress(achievement)}
    >
      {({ pressed }) => body(pressed)}
    </Pressable>
  );
}
