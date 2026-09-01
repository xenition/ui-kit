import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import {
  rowContainerStyle,
  rowGround,
  rowEdgeStyle,
  rowTextStyle,
} from '../dashboard/internal/row-v4';
import { PresenceDotV4 } from './PresenceDotV4';
import { PRESENCE_META } from './internal/thread-v4';
import type { ConversationRowProps } from './ConversationRow';

export interface ConversationRowV4Props extends ConversationRowProps {
  /** Copy shown while the other party types. Default `'typing…'`. */
  typingLabel?: string;
  /** Announced for a muted conversation. Default `'Muted'`. */
  mutedLabel?: string;
  /** Build the unread summary. Default `'3 unread'`. */
  formatUnread?: (count: number) => string;
  /** Draw the separator under the row. Default `false`. */
  last?: boolean;
}

/** Above this the badge shows `99+` rather than a number nobody reads. */
const UNREAD_CAP = 99;

/**
 * **V4 conversation row** — same props as {@link ConversationRow} plus three
 * copy hooks and `last`.
 *
 * ## Four changes
 *
 * 1. **The row announces its whole state** — name, presence, last message,
 *    time, unread count, muted. The base left six fragments a reader walked
 *    one at a time, which is the difference between scanning an inbox and
 *    reading it.
 * 2. **Unread is capped**, so a badge cannot stretch the row.
 * 3. **Muted is a glyph *and* a word**, where the base dimmed the row — an
 *    opacity a colour-blind user reads as "disabled" rather than "muted".
 * 4. **It is a row from the shared row line**, with the shared press fill.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export function ConversationRowV4({
  name,
  lastMessage,
  timestamp,
  avatarUri,
  presence,
  unreadCount,
  muted = false,
  typing = false,
  selected = false,
  typingLabel = 'typing…',
  mutedLabel = 'Muted',
  formatUnread,
  last = false,
  onPress,
  onLongPress,
  style,
}: ConversationRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  if (!name) return null;

  const unread = typeof unreadCount === 'number' && unreadCount > 0 ? unreadCount : 0;
  const badge = unread > UNREAD_CAP ? `${UNREAD_CAP}+` : String(unread);
  const preview = typing ? typingLabel : lastMessage;
  const presenceWord = presence ? PRESENCE_META[presence].label : null;

  // Commas, not `metaLine`'s middle dot: this is a spoken sentence, and a
  // reader either says "middle dot" out loud or swallows the pause entirely.
  const name_ = [
    name,
    presenceWord,
    preview,
    timestamp,
    unread > 0 ? (formatUnread ?? ((n: number) => `${n} unread`))(unread) : null,
    muted ? mutedLabel : null,
  ]
    .filter((part): part is string => part != null && part !== '')
    .join(', ');

  const content = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        rowContainerStyle(theme, { twoLine: true }),
        { backgroundColor: rowGround(theme, { pressed, selected }) },
        !last ? rowEdgeStyle(theme) : null,
        style,
      ]}
    >
      <View>
        <AvatarV4 src={avatarUri} name={name} size="md" />
        {presence ? (
          <View style={{ position: 'absolute', right: -2, bottom: -2 }}>
            <PresenceDotV4 status={presence} ring scale="sm" />
          </View>
        ) : null}
      </View>

      <View style={rowTextStyle(theme)}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <TextV4
            size="base"
            weight={unread > 0 ? 'bold' : 'semibold'}
            tone="onCard"
            numberOfLines={1}
            style={{ flexShrink: 1 }}
          >
            {name}
          </TextV4>
          {/* A glyph AND a word — the base dimmed the row, which reads as
              "disabled" rather than "muted". */}
          {muted ? <IconV4 name="mute" size="xs" color="mutedText" /> : null}
        </View>
        {preview ? (
          <TextV4
            size="sm"
            tone={typing ? 'primaryText' : 'mutedText'}
            numberOfLines={1}
          >
            {preview}
          </TextV4>
        ) : null}
      </View>

      <View style={{ alignItems: 'flex-end', gap: tokens.spacing.xs }}>
        {timestamp ? (
          <TextV4 size="xs" tone="mutedText" numeric="tabular">
            {timestamp}
          </TextV4>
        ) : null}
        {unread > 0 ? (
          <BadgeV4 tone={muted ? 'neutral' : 'primary'} size="sm">
            {badge}
          </BadgeV4>
        ) : null}
      </View>
    </View>
  );

  if (!onPress && !onLongPress) {
    return (
      <View accessible accessibilityLabel={name_}>
        {content(false)}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={name_}
      accessibilityState={{ selected }}
      onPress={onPress}
      onLongPress={onLongPress}
      style={{ borderRadius: tokens.radius.md }}
    >
      {({ pressed }) => content(pressed)}
    </Pressable>
  );
}
