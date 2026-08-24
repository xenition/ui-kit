import * as React from 'react';
import { Animated, Modal, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { useEnter } from '../primitives/internal/motion';
import { Avatar, Button } from '../primitives';
import type { MatchCelebrationProps } from './MatchCelebration';

/** Drop-in alternate design — identical props to `MatchCelebration`. */
export type MatchCelebrationV2Props = MatchCelebrationProps;

/**
 * MatchCelebration — design variant **V2**, an **immersive full-screen** moment.
 * Instead of a small centred dialog, the whole screen becomes a deep tinted
 * stage: two **overlapping ringed avatars** sit above a filled **celebratory
 * band** carrying the headline, with the CTAs anchored below. Same
 * `MatchCelebrationProps`; token-pure (the stage is `withAlpha` of the neutral
 * ramp); returns nothing when `visible` is false; announced as a modal alert.
 */
export function MatchCelebrationV2({
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
}: MatchCelebrationV2Props): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 12 });
  if (!visible) return null;

  const heading = title ?? (variant === 'superlike' ? 'Super Like sent!' : "It's a Match!");
  const subtitle =
    variant === 'superlike' ? `You super liked ${match.name}.` : `You and ${match.name} liked each other.`;
  const stage = tokens.ramps.neutral[900] ?? colors.onSurface;

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <View
        accessibilityViewIsModal
        accessibilityRole="alert"
        accessibilityLabel={`${heading} ${subtitle}`}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: tokens.spacing.xl,
          gap: tokens.spacing.lg,
          backgroundColor: withAlpha(stage, 0.9),
        }}
      >
        <Animated.View style={{ alignItems: 'center', gap: tokens.spacing.lg, opacity: enter.opacity, transform: enter.transform }}>
          {/* Overlapping ringed avatars. */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {you ? <Avatar src={you.photoUri} name={you.name} size="xl" ring /> : null}
            <Avatar src={match.photoUri} name={match.name} size="xl" ring style={{ marginLeft: you ? -18 : 0 }} />
          </View>

          {/* Celebratory band. */}
          <View
            style={{
              backgroundColor: colors.primary,
              borderRadius: tokens.radius.full,
              paddingVertical: tokens.spacing.sm,
              paddingHorizontal: tokens.spacing.xl,
            }}
          >
            <Text style={{ color: colors.onPrimary, fontSize: tokens.typography.scale['2xl'], fontWeight: '800', textAlign: 'center' }}>
              {heading}
            </Text>
          </View>

          <Text style={{ color: withAlpha(colors.surface, 0.92), fontSize: tokens.typography.scale.base, textAlign: 'center' }}>
            {subtitle}
          </Text>
        </Animated.View>

        <View style={{ width: '100%', maxWidth: 420, gap: tokens.spacing.sm }}>
          <Button variant="primary" onPress={onMessage}>
            {messageLabel}
          </Button>
          <Button variant="ghost" onPress={onKeepSwiping ?? onClose}>
            {keepSwipingLabel}
          </Button>
        </View>
      </View>
    </Modal>
  );
}
