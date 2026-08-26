import * as React from 'react';
import { Animated, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { SURFACE_MOTION, elevationStyle, panelSkin, scrimColor } from './internal/surface-v4';
import { useReducedMotion } from './internal/useReducedMotion';
import { SpinnerV4 } from './SpinnerV4';
import type { LoadingOverlayProps } from './LoadingOverlay';
import { EASING_ENTER } from './internal/motion-v4';

export type { LoadingOverlayProps as LoadingOverlayV4Props };

/**
 * **V4 loading overlay** — same props as {@link LoadingOverlay}, a different
 * design line.
 *
 * ## The scrim was painting a white veil over dark apps
 *
 * The base built its dim from `colors.onSurface` at 40% opacity. `onSurface`
 * **inverts with the scheme** — near-black on a light page and near-WHITE on a
 * dark one — so on a dark app this overlay covered the screen in white haze and
 * then put a dark card in the middle of it. The kit found and fixed the same
 * bug in `Modal`; this is the same fix, from the same helper.
 *
 * A scrim is built from `elevation.sheet.color`, which does not invert, because
 * a shadow does not. As `Modal` puts it: a scrim is not "a dark colour from the
 * palette", it is the absence of light, and absence does not have a brand.
 *
 * ## This is the one component here that HAS a layer
 *
 * Everything else in the V4 feedback line refuses elevation, because an alert,
 * a banner, a callout and a progress bar are all *in* the page. An overlay is
 * genuinely above it — that is the entire point of the component — so it takes
 * `elevation.sheet`, the widest and softest of the three, the same token
 * `ModalV4` uses for the same reason. Depth here is not decoration; it is the
 * only honest way to say "the page underneath is not available right now".
 *
 * Glass follows the seed through `panelSkin`, the single depth check the V4
 * surfaces make: the compiler neutralises gradients and elevation for a flat
 * seed, but `glass.tint` stays live at every depth, so it has to be asked for
 * (§8's "glassmorphism without purpose").
 *
 * ## Motion and the spinner
 *
 * The scrim fades in over `SURFACE_MOTION.dialog` — an overlay that appears
 * with no transition at all reads as a glitch rather than as a layer arriving
 * (§36.10 asks for the fade to survive even when the travel does not). Under
 * Reduce Motion it is simply there.
 *
 * The spinner is `SpinnerV4`, so the blocking state honours the user's motion
 * setting; the base used the platform indicator, which cannot. The label is
 * `onSurface`, never `muted` — over glass, `muted` measurably falls below AA.
 */
export function LoadingOverlayV4({
  visible,
  label,
  style,
}: LoadingOverlayProps): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const reduced = useReducedMotion();
  const fade = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (!visible) {
      fade.setValue(0);
      return;
    }
    if (reduced) {
      fade.setValue(1);
      return;
    }
    const anim = Animated.timing(fade, {
      toValue: 1,
      duration: SURFACE_MOTION.dialog,
      easing: EASING_ENTER,
      useNativeDriver: true,
    });
    anim.start();
    return () => anim.stop();
  }, [visible, reduced, fade]);

  if (!visible) return null;

  return (
    <Animated.View
      accessibilityRole="progressbar"
      accessibilityLabel={label ?? 'Loading'}
      accessibilityLiveRegion="polite"
      style={[
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: fade,
        },
        style,
      ]}
    >
      <View
        testID="xen-v4-overlay-scrim"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          // Dark in both schemes, by construction — never `onSurface`.
          backgroundColor: scrimColor(theme),
        }}
      />
      <View
        testID="xen-v4-overlay-panel"
        style={[
          elevationStyle(theme.elevation.sheet),
          panelSkin(theme),
          {
            alignItems: 'center',
            gap: tokens.spacing.sm,
            borderRadius: tokens.radius.lg,
            paddingVertical: tokens.spacing.lg,
            paddingHorizontal: tokens.spacing.xl,
          },
        ]}
      >
        {/*
          The overlay itself is the busy announcement; the ring inside it is
          decoration to a screen reader.
        */}
        <View importantForAccessibility="no-hide-descendants">
          <SpinnerV4 size="lg" />
        </View>
        {label ? (
          <Text
            style={{
              fontFamily: tokens.typography.fontBody,
              fontSize: tokens.typography.scale.sm,
              // `onSurface`, never `muted` — over glass, `muted` falls below AA.
              color: colors.onSurface,
              textAlign: 'center',
            }}
          >
            {label}
          </Text>
        ) : null}
      </View>
    </Animated.View>
  );
}
