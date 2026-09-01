import * as React from 'react';
import { Modal, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { TextV4 } from '../primitives/TextV4';
import { mixToken } from '../../primitives/internal/v4-depth';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { elevationStyle, scrimColor } from '../primitives/internal/surface-v4';
import { useReducedMotion } from '../primitives/internal/useReducedMotion';
import { ACTION_TONE, spokenLine, toneInk, type ToneV4 } from './internal/profile-v4';
import { toneFill } from '../primitives/internal/tone-v4';
import type { MatchCelebrationProps } from './MatchCelebration';

export interface MatchCelebrationV4Props extends MatchCelebrationProps {
  /** Name for the close control. Default `'Close'`. */
  closeLabel?: string;
}

/** The tint behind the connector disc between the two avatars. */
const DISC_TINT = 0.14;

/**
 * **V4 match celebration** — same props as {@link MatchCelebration} plus
 * `closeLabel`.
 *
 * ## Five changes
 *
 * 1. **It can be dismissed.** The backdrop was a plain `View`, so on iOS —
 *    where there is no hardware back button to reach `onRequestClose` — a
 *    caller who left `onKeepSwiping` unset had built a celebration with no way
 *    out of it. The backdrop is a `Pressable` now **and** there is an explicit
 *    ✕ in the corner, because tapping outside a dialog is a convention, not an
 *    affordance: nothing on screen says it is there.
 * 2. **The backdrop is dark in a dark theme.** It was
 *    `withAlpha(colors.onSurface, 0.6)` — the ink slot, which is *light* on a
 *    dark scheme, so the overlay meant to push the app back washed it white
 *    instead. `scrimColor` builds it from the elevation colour, which does not
 *    invert, because a shadow does not.
 * 3. **It is a dialog, not an alert.** `role="alert"` interrupts whatever a
 *    screen reader was saying, which is for the genuinely urgent; a match is
 *    delightful, not urgent. It is `role="dialog"` with
 *    `accessibilityViewIsModal`, and the headline is a real heading.
 * 4. **A match is not an error, and a super like looks like one.** The heart
 *    disc was `danger` — the error slot on the happiest moment in the product.
 *    It takes the action's identity tone now, and `variant="superlike"` gets
 *    its own mark and its own tone rather than only different words.
 * 5. **It fits the device.** The modal pays the safe-area insets, the close
 *    control clears 44 with a state layer rather than an opacity, and under
 *    Reduce Motion the fade is dropped instead of played.
 */
export function MatchCelebrationV4({
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
  closeLabel = 'Close',
}: MatchCelebrationV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  // Needs a `SafeAreaProvider` above it (Expo mounts one by default).
  const insets = useSafeAreaInsets();
  const reduced = useReducedMotion();

  if (!visible) return null;

  const superlike = variant === 'superlike';
  const heading = title ?? (superlike ? 'Super Like sent!' : "It's a Match!");
  const subtitle = superlike
    ? `You super liked ${match.name}.`
    : `You and ${match.name} liked each other.`;

  // The action's identity, not a status: `like` and `superlike` are ordinary
  // choices, and the base painted the connector with the error slot.
  const tone = (ACTION_TONE[superlike ? 'superlike' : 'like'] ?? 'primary') as ToneV4;
  const disc = mixToken(colors.surface, toneFill(theme, tone), DISC_TINT);
  const discInk = toneInk(theme, tone);

  return (
    <Modal
      visible
      transparent
      // Settled, not played: a celebration that cannot animate still appears.
      animationType={reduced ? 'none' : 'fade'}
      onRequestClose={onClose}
    >
      <Pressable
        // Not in the accessibility tree: a `Pressable` groups its subtree, and
        // a backdrop that announces itself would swallow the whole dialog.
        // Tapping outside is the convention; the ✕ is the affordance.
        accessible={false}
        onPress={onClose}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: tokens.spacing.xl,
          paddingTop: tokens.spacing.xl + insets.top,
          paddingBottom: tokens.spacing.xl + insets.bottom,
          backgroundColor: scrimColor(theme),
        }}
      >
        {/* Claims the touch so a press on the panel's own ground does not
            reach the backdrop and close the dialog. A `View`, not a second
            `Pressable`: a pressable panel would group its buttons away. */}
        <View
          accessibilityViewIsModal
          role="dialog"
          accessibilityLabel={spokenLine([heading, subtitle])}
          onStartShouldSetResponder={() => true}
          style={[
            {
              width: '100%',
              maxWidth: 400,
              alignItems: 'center',
              gap: tokens.spacing.md,
              backgroundColor: colors.surface,
              borderRadius: tokens.radius.lg,
              padding: tokens.spacing.xl,
            },
            elevationStyle(theme.elevation.sheet),
          ]}
        >
          <View style={{ alignSelf: 'stretch', alignItems: 'flex-end' }}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={closeLabel}
              onPress={onClose}
              style={({ pressed }) => ({
                width: minTap(tokens.spacing),
                height: minTap(tokens.spacing),
                marginTop: -tokens.spacing.md,
                marginRight: -tokens.spacing.md,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: minTap(tokens.spacing) / 2,
                backgroundColor: pressed
                  ? pressOver(theme, colors.surface, colors.onSurface)
                  : 'transparent',
              })}
            >
              <TextV4 size="lg" tone="mutedText" allowFontScaling={false}>
                ✕
              </TextV4>
            </Pressable>
          </View>

          <TextV4
            accessibilityRole="header"
            size="2xl"
            weight="bold"
            align="center"
            style={{ color: toneInk(theme, tone) }}
          >
            {heading}
          </TextV4>

          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}
          >
            {you ? <AvatarV4 src={you.photoUri} name={you.name} size="xl" ring /> : null}
            <View
              style={{
                width: tokens.spacing.xl,
                height: tokens.spacing.xl,
                borderRadius: tokens.spacing.xl / 2,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: disc,
              }}
            >
              {/* A super like has a shape of its own, not just other copy. */}
              <TextV4 size="lg" allowFontScaling={false} style={{ color: discInk }}>
                {superlike ? '★' : '♥'}
              </TextV4>
            </View>
            <AvatarV4 src={match.photoUri} name={match.name} size="xl" ring />
          </View>

          <TextV4 size="sm" tone="mutedText" align="center">
            {subtitle}
          </TextV4>

          <View style={{ width: '100%', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }}>
            <ButtonV4 variant="primary" onPress={onMessage}>
              {messageLabel}
            </ButtonV4>
            <ButtonV4 variant="ghost" onPress={onKeepSwiping ?? onClose}>
              {keepSwipingLabel}
            </ButtonV4>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}
