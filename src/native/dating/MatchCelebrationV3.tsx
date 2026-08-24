import * as React from 'react';
import { Animated, Modal, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { useEnter } from '../primitives/internal/motion';
import { Avatar, Button } from '../primitives';
import type { MatchCelebrationProps } from './MatchCelebration';

/** Drop-in alternate design — identical props to `MatchCelebration`. */
export type MatchCelebrationV3Props = MatchCelebrationProps;

/**
 * MatchCelebration — design variant **V3**, a **compact toast**. Rather than
 * taking over the screen, it slides a small horizontal card in from the top: two
 * tiny overlapping avatars, a two-line headline/subtitle, and an inline message
 * button, over a light dismissable scrim. Ideal when a full celebration would be
 * too heavy. Same `MatchCelebrationProps`; token-pure; returns nothing when not
 * visible; announced as a modal alert.
 */
export function MatchCelebrationV3({
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
}: MatchCelebrationV3Props): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: -12 });
  if (!visible) return null;

  const heading = title ?? (variant === 'superlike' ? 'Super Like sent!' : "It's a Match!");
  const subtitle =
    variant === 'superlike' ? `You super liked ${match.name}.` : `You and ${match.name} liked each other.`;
  const scrim = tokens.ramps.neutral[900] ?? colors.onSurface;

  return (
    <Modal visible transparent animationType="slide" onRequestClose={onClose}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={keepSwipingLabel}
        onPress={onKeepSwiping ?? onClose}
        style={{ flex: 1, padding: tokens.spacing.md, justifyContent: 'flex-start', backgroundColor: withAlpha(scrim, 0.28) }}
      >
        <Animated.View
          accessibilityViewIsModal
          accessibilityRole="alert"
          accessibilityLabel={`${heading} ${subtitle}`}
          style={{
            width: '100%',
            maxWidth: 520,
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            backgroundColor: colors.surface,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            padding: tokens.spacing.md,
            opacity: enter.opacity,
            transform: enter.transform,
            ...shadow('lg', tokens),
          }}
        >
          {/* Overlapping mini avatars. */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {you ? <Avatar src={you.photoUri} name={you.name} size="sm" ring /> : null}
            <Avatar src={match.photoUri} name={match.name} size="sm" ring style={{ marginLeft: you ? -10 : 0 }} />
          </View>

          <View style={{ flex: 1, gap: 2 }}>
            <Text numberOfLines={1} style={{ color: colors.primaryText, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
              {heading}
            </Text>
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {subtitle}
            </Text>
          </View>

          <Button variant="primary" size="sm" onPress={onMessage} accessibilityLabel={messageLabel}>
            {messageLabel}
          </Button>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
