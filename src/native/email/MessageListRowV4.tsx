import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { pressLayer } from '../primitives/internal/state-v4';
import { rowContainerStyle, rowGround, rowMetrics } from '../dashboard/internal/row-v4';
import { StarButtonV4 } from './StarButtonV4';
import { MailLabelChipV4 } from './MailLabelChipV4';
import { spokenLine } from './internal/mail-v4';
import type { MessageListRowProps } from './MessageListRow';

export interface MessageListRowV4Props extends MessageListRowProps {
  /**
   * Turn `threadCount` into the words a reader hears and the pill a user sees.
   * Default `'4 messages'`.
   */
  formatThreadCount?: (count: number) => string;
  /** The word an unread row carries. Default `'Unread'`. */
  unreadLabel?: string;
}

/** Above this the pill shows `99+` rather than a number nobody reads. */
const COUNT_CAP = 99;

/**
 * **V4 message list row** — same props as {@link MessageListRow} plus
 * `formatThreadCount` and `unreadLabel`.
 *
 * ## Six changes
 *
 * 1. **The spoken name contains what the row shows.** `accessibilityRole`
 *    makes a row's children presentational, so the preview, the thread count
 *    and every label chip were removed from the accessibility tree outright —
 *    a reader got six fragments of a row whose whole job is to be skimmed.
 *    The name is built with `spokenLine` and carries all of it.
 * 2. **The star is reachable.** Nesting it inside the row's `accessible`
 *    Pressable made it presentational too, so on VoiceOver the only way to
 *    star a message was to open it. It is a sibling of the row's button now.
 * 3. **Selected and pressed are different grounds.** Both resolved to
 *    `colors.border` — a hairline token used as a fill — so in a split-view
 *    inbox the finger repainted every row it passed as "the selected one".
 * 4. **The thread count carries a unit and is the pill its prop doc
 *    promises.** It was a bare numeral in `colors.muted`, which is a ramp step
 *    with no contrast promise; it is a `BadgeV4`, and a reader hears
 *    "4 messages".
 * 5. **Unread is a word and a contrast-corrected ink.** The timestamp took
 *    `colors.primary` — the fill slot — and the state itself was carried by
 *    weight and a dot. `unreadLabel` puts it in the name.
 * 6. **Nothing renders without a sender**, rather than a row of empty boxes.
 */
export function MessageListRowV4({
  sender,
  subject,
  preview,
  timestamp,
  avatarUri,
  unread = false,
  starred = false,
  onToggleStar,
  hasAttachments = false,
  threadCount = 1,
  labels,
  selected = false,
  formatThreadCount = (n) => `${n} messages`,
  unreadLabel = 'Unread',
  onPress,
  onLongPress,
  style,
}: MessageListRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  if (!sender) return null;

  const safeLabels = labels ?? [];
  const count = threadCount > 1 ? threadCount : 0;
  const { padX } = rowMetrics(theme);

  const spoken = spokenLine([
    unread ? unreadLabel : 'Read',
    `from ${sender}`,
    subject,
    preview,
    count > 0 ? formatThreadCount(count) : null,
    hasAttachments ? 'has attachment' : null,
    starred ? 'starred' : null,
    ...safeLabels.map((l) => l.label),
    timestamp,
  ]);

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'flex-start',
          // The selected ground covers the whole row, star included; the press
          // layer belongs to whichever half the finger is actually on.
          backgroundColor: rowGround(theme, { selected }),
        },
        style,
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={spoken}
        accessibilityState={{ selected }}
        onPress={onPress}
        onLongPress={onLongPress}
        style={({ pressed }) => [
          rowContainerStyle(theme, { twoLine: true }),
          {
            flex: 1,
            alignItems: 'flex-start',
            paddingRight: onToggleStar ? 0 : padX,
            backgroundColor: pressed ? pressLayer(theme) : 'transparent',
          },
        ]}
      >
        {/* The unread mark: a graphic, hidden from the reader because the
            name already says the word. */}
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{
            width: tokens.spacing.sm,
            height: tokens.spacing.sm,
            borderRadius: tokens.radius.full,
            marginTop: tokens.spacing.sm,
            backgroundColor: unread ? theme.colors.primary : 'transparent',
          }}
        />
        <AvatarV4 size="md" src={avatarUri} name={sender} />

        <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <TextV4
              size="base"
              weight={unread ? 'bold' : 'medium'}
              tone="onSurface"
              numberOfLines={1}
              style={{ flex: 1 }}
            >
              {sender}
            </TextV4>
            {count > 0 ? (
              <BadgeV4 tone="neutral" variant="soft" size="sm" count={count} max={COUNT_CAP} />
            ) : null}
            {timestamp ? (
              <TextV4
                size="xs"
                weight={unread ? 'bold' : 'regular'}
                tone={unread ? 'primaryText' : 'mutedText'}
                numeric="tabular"
              >
                {timestamp}
              </TextV4>
            ) : null}
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            {hasAttachments ? <IconV4 glyph="📎" size="xs" color="mutedText" /> : null}
            <TextV4
              size="sm"
              weight={unread ? 'semibold' : 'regular'}
              tone="onSurface"
              numberOfLines={1}
              style={{ flex: 1 }}
            >
              {subject}
            </TextV4>
          </View>

          {preview ? (
            <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
              {preview}
            </TextV4>
          ) : null}

          {safeLabels.length > 0 ? (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: tokens.spacing.xs,
                marginTop: tokens.spacing.xs,
              }}
            >
              {safeLabels.map((l) => (
                <MailLabelChipV4 key={l.id} label={l.label} tone={l.tone ?? 'neutral'} />
              ))}
            </View>
          ) : null}
        </View>
      </Pressable>

      {/* A sibling, not a child: inside the row's `accessible` Pressable the
          only way to star a message was to open it. */}
      {onToggleStar ? (
        <View style={{ paddingRight: padX, paddingTop: tokens.spacing.sm }}>
          <StarButtonV4 starred={starred} onToggle={onToggleStar} size="base" />
        </View>
      ) : starred ? (
        <View style={{ paddingRight: padX, paddingTop: tokens.spacing.sm }}>
          <IconV4 glyph="★" size="base" color="accentText" accessibilityLabel="Starred" />
        </View>
      ) : null}
    </View>
  );
}
