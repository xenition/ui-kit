import * as React from 'react';
import { Modal, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { Avatar, Button } from '../primitives';

export type MatchCelebrationVariant = 'match' | 'superlike';

export interface MatchCelebrationPerson {
  name: string;
  photoUri?: string;
}

export interface MatchCelebrationProps {
  /** Controls the overlay. When false, nothing renders. */
  visible: boolean;
  /** The current user (left avatar). */
  you?: MatchCelebrationPerson;
  /** The matched person (right avatar). */
  match: MatchCelebrationPerson;
  /** `match` (default) or a `superlike` celebration. */
  variant?: MatchCelebrationVariant;
  /** Headline override. */
  title?: string;
  /** Fires the primary "send a message" CTA. */
  onMessage?: () => void;
  /** Fires "keep swiping" / dismiss. */
  onKeepSwiping?: () => void;
  /** Fires on backdrop/close. */
  onClose?: () => void;
  /** Message CTA label. */
  messageLabel?: string;
  /** Dismiss label. */
  keepSwipingLabel?: string;
}

/**
 * The "It's a Match!" celebration overlay — the native match modal. Presents the
 * two matched avatars with a heart between them and two clear next steps (message
 * / keep swiping). Rendered in a native `Modal` with a token-tinted scrim; the
 * dialog is announced via `accessibilityViewIsModal`. Colors derive from theme
 * tokens and `withAlpha` — no literal colors. Returns nothing when `visible` is
 * false.
 */
export function MatchCelebration({
  visible,
  you,
  match,
  variant = 'match',
  title,
  onMessage,
  onKeepSwiping,
  onClose,
  messageLabel = 'Send a message',
  keepSwipingLabel = 'Keep swiping',
}: MatchCelebrationProps): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();
  if (!visible) return null;

  const heading = title ?? (variant === 'superlike' ? 'Super Like sent!' : "It's a Match!");
  const subtitle =
    variant === 'superlike'
      ? `You super liked ${match.name}.`
      : `You and ${match.name} liked each other.`;

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: tokens.spacing.xl,
          backgroundColor: withAlpha(colors.onSurface, 0.6),
        }}
      >
        <View
          accessibilityViewIsModal
          accessibilityRole="alert"
          accessibilityLabel={`${heading} ${subtitle}`}
          style={{
            width: '100%',
            maxWidth: 400,
            alignItems: 'center',
            gap: tokens.spacing.md,
            backgroundColor: colors.surface,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            padding: tokens.spacing.xl,
          }}
        >
          <Text
            style={{
              color: colors.primary,
              fontSize: tokens.typography.scale['2xl'],
              fontWeight: '800',
              textAlign: 'center',
            }}
          >
            {heading}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
            {you ? <Avatar src={you.photoUri} name={you.name} size="xl" ring /> : null}
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: withAlpha(colors.danger, 0.14),
              }}
            >
              <Text style={{ color: colors.danger, fontSize: tokens.typography.scale.lg }}>♥</Text>
            </View>
            <Avatar src={match.photoUri} name={match.name} size="xl" ring />
          </View>

          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }}>
            {subtitle}
          </Text>

          <View style={{ width: '100%', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }}>
            <Button variant="primary" onPress={onMessage}>
              {messageLabel}
            </Button>
            <Button variant="ghost" onPress={onKeepSwiping ?? onClose}>
              {keepSwipingLabel}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}
