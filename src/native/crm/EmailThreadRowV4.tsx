import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { BADGE_V4, spokenLine, TABULAR } from './internal/crm-v4';
import type { EmailThreadRowProps } from './EmailThreadRow';

export interface EmailThreadRowV4Props extends EmailThreadRowProps {
  /** Announced for an unread thread. Default `'Unread'`. */
  unreadLabel?: string;
  /** How the message count is spelled. Default `'4 messages'`. */
  formatMessageCount?: (count: number) => string;
}

/**
 * **V4 email thread row** — same props as {@link EmailThreadRow} plus
 * `unreadLabel` and `formatMessageCount`.
 *
 * ## Five changes
 *
 * 1. **Unread bolds the *subject*.** Both twins' docblocks always said
 *    "unread → bold subject"; both bolded the **sender**, so the one line a
 *    user scans an inbox for was the one line the state did not emphasise.
 * 2. **The unread wash is one colour on both twins.** Web painted
 *    `bg-primary-50` — a ramp step that ignores the seed — against native's
 *    `withAlpha(primary, .06)`, whose rendered colour depended on whatever was
 *    behind the row. Both now take `selected`/`onSelected`, the compiler's
 *    opaque pair for exactly this.
 * 3. **The message count carries a unit.** The badge printed a bare `4`, which
 *    a reader announces as the number four and nothing else.
 * 4. **The row is only a button when it is interactive.** Native set
 *    `accessibilityRole="button"` unconditionally with `disabled={!onPress}`,
 *    so a read-only row announced as a **disabled button**.
 * 5. **One spoken name** carrying sender, subject, snippet, time, unread and
 *    the count (rule A), a real press layer (rule B) and `BADGE_V4` (rule C).
 *
 * **Renders nothing without a `subject`.**
 */
export function EmailThreadRowV4({
  subject,
  from,
  snippet,
  avatarUrl,
  timestamp,
  unread = false,
  messageCount,
  hasAttachment = false,
  unreadLabel = 'Unread',
  formatMessageCount,
  onPress,
  testID,
  style,
}: EmailThreadRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!subject) return null;

  const showCount = messageCount != null && messageCount > 1;
  const countLabel = showCount
    ? (formatMessageCount ?? ((n: number) => `${n} messages`))(messageCount!)
    : null;
  const dot = tokens.spacing.sm;
  const ground = unread ? colors.selected : colors.surface;
  const ink = unread ? colors.onSelected : colors.onSurface;

  const name = spokenLine([
    unread ? unreadLabel : null,
    from,
    subject,
    snippet,
    timestamp,
    countLabel,
  ]);

  const content = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        {
          flexDirection: 'row',
          gap: tokens.spacing.sm,
          alignItems: 'center',
          minHeight: minTap(tokens.spacing),
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          backgroundColor: pressed ? pressOver(theme, ground, ink) : ground,
        },
        style,
      ]}
    >
      {/* The dot is redundant with the word in the name — decoration only. */}
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{
          width: dot,
          height: unread ? dot : undefined,
          borderRadius: tokens.radius.full,
          backgroundColor: unread ? colors.primary : 'transparent',
        }}
      />

      <AvatarV4 size="sm" name={from} src={avatarUrl} />

      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: tokens.spacing.xs,
          }}
        >
          <TextV4
            size="sm"
            weight="medium"
            numberOfLines={1}
            style={{ flex: 1, color: ink }}
          >
            {from}
          </TextV4>
          {timestamp ? (
            <TextV4 size="xs" tone="mutedText" style={TABULAR}>
              {timestamp}
            </TextV4>
          ) : null}
        </View>
        {/* The subject is the line that goes bold — see change 1. */}
        <TextV4
          size="sm"
          weight={unread ? 'bold' : 'semibold'}
          numberOfLines={1}
          style={{ color: ink }}
        >
          {subject}
        </TextV4>
        {snippet ? (
          <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
            {snippet}
          </TextV4>
        ) : null}
      </View>

      <View style={{ alignItems: 'flex-end', gap: tokens.spacing.xs / 2 }}>
        {hasAttachment ? (
          <TextV4 size="sm" tone="mutedText">
            📎
          </TextV4>
        ) : null}
        {showCount ? (
          <BadgeV4 {...BADGE_V4} tone="neutral">
            {`${messageCount}`}
          </BadgeV4>
        ) : null}
      </View>
    </View>
  );

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={name} testID={testID}>
        {content(false)}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={name}
      onPress={onPress}
      testID={testID}
      style={{ borderRadius: tokens.radius.md }}
    >
      {({ pressed }) => content(pressed)}
    </Pressable>
  );
}
