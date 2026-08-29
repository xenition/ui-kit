import * as React from 'react';
import {
  Animated,
  Modal as RNModal,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import type { ModalProps } from './Modal';
import { useReducedMotion } from './internal/useReducedMotion';
import { SURFACE_MOTION, elevationStyle, panelSkin, scrimColor } from './internal/surface-v4';
import { EASING_ENTER } from './internal/motion-v4';

export type { ModalProps as ModalV4Props };

/**
 * `Modal`, V4 — the same props, lifted off the page and given its own rhythm.
 *
 * ## What the depth is saying
 *
 * A dialog is the one layer with nothing underneath it: it floats in the middle
 * of the screen, over a page that has been pushed back. So it takes
 * `elevation.sheet` — the widest, softest of the three — and the token's
 * negative offset turns out to be exactly right here. A drop shadow implies a
 * surface below to receive it; a dialog has none, so what it wants is a halo,
 * and a large radius with a near-zero offset is a halo.
 *
 * The scrim comes from the shadow colour rather than from `onSurface`, which
 * inverts with the scheme and paints a near-WHITE veil over a dark page — the
 * bug the base `Modal` has today (it reaches for `ramps.neutral[950]`, and the
 * ramps carry the LIGHT orientation in both schemes, so in dark mode that step
 * is the lightest one there is).
 *
 * Glass is applied only when the seed asked for `depth: 'glass'` — the single
 * depth check, and a necessary one: `flatten()` neutralises gradients and
 * elevation and stops there, so glass is live even under `depth: 'flat'`.
 * Elevation is consumed unconditionally and flat falls out for free.
 *
 * ## Rhythm the caller does not have to supply
 *
 * The base modal is one padded box: a title, then whatever you passed, with any
 * structure left to you. V4 has a header and a body, separated by a hairline
 * and each carrying its own padding — so a dialog reads as a dialog whether the
 * caller wrapped its content or not. The body scrolls at 80% of the viewport
 * height, which keeps the title pinned instead of pushing it off-screen when
 * the content is long. §11: the container earns its existence by holding a
 * structure, not by drawing a box.
 *
 * ## Motion
 *
 * A dialog has no origin to fly in from — it is not a tapped card expanding
 * (§36.5) — so it scales up very slightly and fades, over 200ms, which is
 * §36.2's band for a small transition. It is deliberately not a big travel:
 * distance should be proportional to how far the thing actually moved, and this
 * moved nowhere. Under Reduce Motion the scale is dropped and only the fade
 * remains (§36.10).
 */
export function ModalV4({ open, onClose, title, children }: ModalProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const { height } = useWindowDimensions();
  const reduced = useReducedMotion();

  const progress = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (!open) {
      progress.setValue(0);
      return;
    }
    if (reduced) {
      progress.setValue(1);
      return;
    }
    const anim = Animated.timing(progress, {
      toValue: 1,
      duration: SURFACE_MOTION.dialog,
      easing: EASING_ENTER,
      useNativeDriver: true,
    });
    anim.start();
    return () => anim.stop();
  }, [open, reduced, progress]);

  // Under Reduce Motion the scale never leaves 1 — the dialog simply fades.
  const scale = reduced
    ? 1
    : progress.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1] });

  /*
    A dialog's measure, from the spacing scale rather than a fixed 480: ten of
    the largest step. The point is not that 480 is wrong, it is that a number
    written into a component cannot move when the theme's density does.
  */
  const maxWidth = tokens.spacing['2xl'] * 10;

  return (
    <RNModal visible={open} transparent animationType="none" onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: tokens.spacing.lg,
        }}
      >
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: scrimColor(theme),
            opacity: progress,
          }}
        >
          <Pressable accessibilityLabel="Close" onPress={onClose} style={{ flex: 1 }} />
        </Animated.View>

        <Animated.View
          accessibilityViewIsModal
          accessibilityRole="alert"
          style={[
            elevationStyle(theme.elevation.sheet),
            panelSkin(theme),
            {
              width: '100%',
              maxWidth,
              maxHeight: height * 0.8,
              borderRadius: tokens.radius.lg,
              overflow: 'hidden',
              opacity: progress,
              transform: [{ scale }],
            },
          ]}
        >
          {title != null &&
            (typeof title === 'string' ? (
              <View
                style={{
                  paddingHorizontal: tokens.spacing.lg,
                  paddingTop: tokens.spacing.lg,
                  paddingBottom: tokens.spacing.md,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                }}
              >
                <Text
                  style={{
                    fontFamily: tokens.typography.fontHeading,
                    fontSize: tokens.typography.scale.xl,
                    fontWeight: '600',
                    // `onSurface`, never `muted` — over glass, `muted`
                    // measurably falls below AA.
                    color: colors.onSurface,
                  }}
                >
                  {title}
                </Text>
              </View>
            ) : (
              title
            ))}

          <ScrollView
            contentContainerStyle={{
              padding: tokens.spacing.lg,
            }}
          >
            {children}
          </ScrollView>
        </Animated.View>
      </View>
    </RNModal>
  );
}
