import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import {
  rowContainerStyle,
  rowEdgeStyle,
  rowLeadingStyle,
  rowTextStyle,
  rowTrailingStyle,
} from '../dashboard/internal/row-v4';
import { relativeLabel, spokenName } from './internal/tone-v4';
import type { RecruiterMessageProps } from './RecruiterMessage';

export interface RecruiterMessageV4Props extends RecruiterMessageProps {
  /** Copy on the reply action. Default `'Reply'`. */
  replyLabel?: string;
  /** Re-word the sent age. Default `'2d ago'`. */
  formatRelative?: (iso: string) => string;
  /** The last row in a list — drops the separator that would hang off the end. */
  last?: boolean;
}

/** Said first, so unread is a word and not only a dot. */
const UNREAD = 'Unread';

/**
 * **V4 recruiter message** — same props as {@link RecruiterMessage} plus
 * `replyLabel`, `formatRelative` and `last`.
 *
 * ## Four changes
 *
 * 1. **Reply is reachable.** It was a `Pressable` inside the row's own
 *    `Pressable`, which is `accessible` by default and flattens everything
 *    under it — so on native the reply affordance was not a focus stop at all,
 *    and on the web twin Enter on it bubbled to the row and opened the thread
 *    instead of replying. It is now a sibling of the row's activation, a real
 *    button with its own name and a 44 target, where it had `hitSlop={6}` —
 *    about 26 points of target on the one control in the row a candidate
 *    actually presses.
 * 2. **The message is announced whole.** The name stopped at "Unread. Message
 *    from Dana at Acme": no preview, no age. A reader had to open a thread to
 *    find out what it was about, which is the difference between scanning an
 *    inbox and reading it.
 * 3. **`muted` stopped inking text.** The company, the age and a read
 *    message's whole preview were drawn in `muted` — a ramp step with no
 *    contrast promise — which is exactly the "read messages are unreadable"
 *    failure. `mutedText` is that colour corrected against the surface.
 * 4. **It is a row from the shared row line**, with the state layer instead of
 *    `opacity: 0.9`.
 *
 * Unread stays a dot **and** a weight **and** a word, as the base intended;
 * only the word was missing from anywhere a reader could hear it.
 *
 * **Renders nothing without a sender name** (§4.5).
 */
export function RecruiterMessageV4({
  message,
  onPress,
  onReply,
  replyLabel = 'Reply',
  formatRelative,
  last = false,
  style,
}: RecruiterMessageV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!message?.senderName) return null;

  const sent = relativeLabel(message.sentAt, formatRelative);
  const unread = message.unread === true;

  const name = spokenName([
    unread ? UNREAD : null,
    `Message from ${message.senderName}`,
    message.company ? `at ${message.company}` : null,
    message.preview,
    sent,
  ]);

  const body = (
    <>
      <View style={rowLeadingStyle(theme)}>
        <AvatarV4 src={message.senderAvatarUrl} name={message.senderName} size="md" />
        {unread ? (
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: tokens.spacing.sm,
              height: tokens.spacing.sm,
              borderRadius: tokens.radius.full,
              backgroundColor: colors.primary,
              borderWidth: 2,
              borderColor: colors.card,
            }}
          />
        ) : null}
      </View>

      <View style={rowTextStyle(theme)}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: tokens.spacing.sm,
          }}
        >
          <TextV4
            size="sm"
            weight={unread ? 'bold' : 'semibold'}
            tone="onCard"
            numberOfLines={1}
            style={{ flex: 1 }}
          >
            {message.company
              ? `${message.senderName}  ·  ${message.company}`
              : message.senderName}
          </TextV4>
          {sent ? (
            <TextV4 size="xs" tone="mutedText">
              {sent}
            </TextV4>
          ) : null}
        </View>

        <TextV4
          size="sm"
          weight={unread ? 'medium' : 'regular'}
          tone={unread ? 'onCard' : 'mutedText'}
          numberOfLines={2}
        >
          {message.preview}
        </TextV4>
      </View>
    </>
  );

  return (
    <View
      style={[
        rowContainerStyle(theme, { twoLine: true }),
        { alignItems: 'flex-start' },
        !last ? rowEdgeStyle(theme) : null,
        style,
      ]}
    >
      {onPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={name}
          onPress={() => onPress(message)}
          style={({ pressed }) => ({
            flex: 1,
            minWidth: 0,
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
          })}
        >
          {body}
        </Pressable>
      ) : (
        <View
          accessible
          accessibilityLabel={name}
          style={{
            flex: 1,
            minWidth: 0,
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: tokens.spacing.md,
          }}
        >
          {body}
        </View>
      )}

      {/* A sibling of the row's activation — see change 1. */}
      {onReply ? (
        <View style={rowTrailingStyle(theme)}>
          <ButtonV4
            variant="ghost"
            size="sm"
            onPress={() => onReply(message)}
            accessibilityLabel={spokenName([replyLabel, message.senderName])}
            style={{ minHeight: minTap(tokens.spacing) }}
          >
            {replyLabel}
          </ButtonV4>
        </View>
      ) : null}
    </View>
  );
}
