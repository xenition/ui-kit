import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { TextV4 } from '../primitives/TextV4';
import { pressFill } from '../primitives/internal/state-v4';
import { needsExplanation } from '../../kids/family-v4';
import {
  cardStyle,
  metaLine,
  skeletonBlockStyle,
  spokenLine,
  type ToneV4,
} from './internal/tone-v4';
import type { ChoreCardProps, ChoreStatus } from './ChoreCard';

export interface ChoreCardV4Props extends ChoreCardProps {
  /** A neutral explanation for a skipped or missed chore. */
  reason?: string;
  /** The word each status is printed and announced with. */
  statusLabels?: Partial<Record<ChoreStatus, string>>;
  /** The completion action's label. Default `'Mark done'`. */
  completeLabel?: string;
}

/** The glyph and chip tone each status wears. `skipped` is deliberately neutral. */
const STATUS_MARK: Record<ChoreStatus, { glyph: string; tone: ToneV4 }> = {
  todo: { glyph: '⬜', tone: 'neutral' },
  'in-progress': { glyph: '🔄', tone: 'primary' },
  done: { glyph: '✅', tone: 'success' },
  skipped: { glyph: '⏭️', tone: 'neutral' },
};

/** Default wording. Every one of them is overridable through `statusLabels`. */
const STATUS_LABEL: Record<ChoreStatus, string> = {
  todo: 'To do',
  'in-progress': 'In progress',
  done: 'Done',
  skipped: 'Skipped',
};

/**
 * **V4 chore card** — same props as {@link ChoreCard} plus `reason`,
 * `statusLabels` and `completeLabel`.
 *
 * ## Five changes
 *
 * 1. **"Mark done" is reachable.** The base wrapped the whole card in a
 *    `Pressable`, and a `Pressable` is `accessible` by default: VoiceOver
 *    flattened the card to one leaf carrying the card's own name, so the
 *    button, the points chip and the status chip were not reachable at all. A
 *    child could not complete a chore with a screen reader on. The fix is
 *    structural, not a guard — the container is a plain `View`, the activation
 *    wraps only the icon-and-text region, and every control sits beside it.
 * 2. **A skipped chore is not a warning.** `skipped → warn` put an amber chip
 *    on a child's card for a chore nobody may have expected them to do. It is
 *    neutral, with a glyph and a word, and `reason` carries the explanation the
 *    status had nowhere to put — `needsExplanation()` is what decides a status
 *    owes one.
 * 3. **The card is a card.** It painted `colors.surface`, the *page* colour, so
 *    it never read as raised and dark mode went flat; the skeleton painted
 *    `colors.border`, the hairline colour used as a fill.
 * 4. **Press is a state layer.** `opacity: pressed ? 0.85 : 1` sits inside M3's
 *    disabled band (0.38), so a pressed card read as an unavailable one.
 * 5. **Every string is a prop**, so a Spanish chore board is not four English
 *    words in the middle of it.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
export function ChoreCardV4({
  title,
  assignee,
  points,
  due,
  icon = '🧹',
  status = 'todo',
  loading = false,
  reason,
  statusLabels,
  completeLabel = 'Mark done',
  onComplete,
  onPress,
  style,
}: ChoreCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;

  const container = [cardStyle(theme), style];

  if (loading) {
    return (
      <View accessible accessibilityLabel="Loading chore" style={container}>
        <View
          style={skeletonBlockStyle(theme, { height: tokens.typography.scale.base, width: '60%' })}
        />
        <View
          style={skeletonBlockStyle(theme, { height: tokens.typography.scale.xs, width: '40%' })}
        />
      </View>
    );
  }

  if (!title) return null;

  const mark = STATUS_MARK[status] ?? STATUS_MARK.todo;
  const word = statusLabels?.[status] ?? STATUS_LABEL[status];
  const isDone = status === 'done';
  // A status that owes an explanation gets one, and it is an explanation
  // rather than a reprimand — see `needsExplanation`.
  const explanation = needsExplanation(status) ? reason : undefined;
  const caption = metaLine([assignee, due]);
  const name = spokenLine([title, assignee, due, word, explanation]);

  const heading = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.md,
        padding: tokens.spacing.xs,
        marginHorizontal: -tokens.spacing.xs,
        borderRadius: tokens.radius.md,
        backgroundColor: pressed ? pressFill(theme) : 'transparent',
      }}
    >
      <TextV4
        size="2xl"
        allowFontScaling={false}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        {icon}
      </TextV4>
      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
        <TextV4
          size="base"
          weight="bold"
          tone="onCard"
          numberOfLines={1}
          style={{ textDecorationLine: isDone ? 'line-through' : 'none' }}
        >
          {title}
        </TextV4>
        {caption ? (
          <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
            {caption}
          </TextV4>
        ) : null}
      </View>
    </View>
  );

  return (
    <View style={container}>
      {onPress ? (
        <Pressable accessibilityRole="button" accessibilityLabel={name} onPress={onPress}>
          {({ pressed }) => heading(pressed)}
        </Pressable>
      ) : (
        <View accessible accessibilityLabel={name}>
          {heading(false)}
        </View>
      )}

      {explanation ? (
        <TextV4 size="sm" tone="mutedText">
          {explanation}
        </TextV4>
      ) : null}

      {/* Siblings of the activation, never descendants of it: inside a
          `Pressable` none of these three has a name of its own. */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: tokens.spacing.sm,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <View accessible accessibilityLabel={word}>
            <BadgeV4 tone={mark.tone} variant="soft" size="sm">
              {`${mark.glyph} ${word}`}
            </BadgeV4>
          </View>
          {typeof points === 'number' && Number.isFinite(points) ? (
            <View accessible accessibilityLabel={`⭐ ${points}`}>
              <BadgeV4 tone="accent" variant="soft" size="sm">
                {`⭐ ${points}`}
              </BadgeV4>
            </View>
          ) : null}
        </View>
        {!isDone && onComplete ? (
          <ButtonV4 size="md" variant="soft" tone="success" onPress={onComplete}>
            {completeLabel}
          </ButtonV4>
        ) : null}
      </View>
    </View>
  );
}
