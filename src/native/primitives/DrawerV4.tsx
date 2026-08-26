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
import type { DrawerProps, DrawerSide } from './Drawer';
import { easingOf } from './internal/chrome-v4';
import { SURFACE_MOTION, elevationStyle, panelSkin, scrimColor } from './internal/surface-v4';
import { useReducedMotion } from './internal/useReducedMotion';

export type { DrawerProps as DrawerV4Props, DrawerSide };

/**
 * `Drawer`, V4 — the same props, given the depth and the rhythm of a real
 * layer.
 *
 * ## What the depth is saying
 *
 * A side sheet is above the page and nothing is above it, so it takes
 * `elevation.sheet` — the same altitude as `ModalV4`, `BottomSheetV4` and
 * `MenuV4`, because all four are the same kind of object at different sizes and
 * a kit where they drift apart has four depth systems instead of one. The
 * content inside is flat: §8's "cards inside cards inside cards" is exactly
 * what a drawer becomes when every section in it gains a surface.
 *
 * The scrim is `scrimColor` — the shadow colour at a fixed alpha, shared with
 * every other V4 overlay. The base `Drawer` learned this the hard way: its
 * scrim was `colors.onSurface`, which INVERTS with the scheme (at the warm
 * seed, dark `onSurface` compiles to `#eeeded`) and painted a 50% white veil
 * over a dark page. It is fixed there now, and this keeps the fixed
 * convention rather than re-deriving it — a shadow does not invert, so a scrim
 * built from a shadow colour does not either.
 *
 * Glass applies only when the seed asked for `depth: 'glass'`, via `panelSkin`.
 * That is the one depth check in this file and it is necessary: `flatten()`
 * neutralises gradients and elevation and stops there, so glass is live even
 * under `depth: 'flat'`. Elevation is consumed unconditionally and a flat seed
 * falls out for free.
 *
 * ## Rhythm the caller does not have to supply
 *
 * The base drawer is one padded box with the title inside the scroll area, so a
 * long list scrolls its own heading off the screen. V4 splits a pinned header
 * from a scrolling body, separated by a hairline and each carrying its own
 * padding — §11: the container earns its existence by holding a structure, not
 * by drawing a box.
 *
 * The panel's measure comes off the spacing scale (`2xl × 7`) rather than the
 * base's literal 360. The point is not that 360 is wrong; it is that a number
 * written into a component cannot move when the theme's density does.
 *
 * ## Motion
 *
 * The panel travels the whole of itself, from the edge it is anchored to —
 * §36.5's spatial continuity, so the movement says where the drawer came from
 * and where dismissing it sends it back. `SURFACE_MOTION.sheet` (280ms) is
 * §36.2's band for a screen-sized transition, and the easing decelerates so the
 * sheet settles rather than stopping dead (§36.3). Under Reduce Motion the
 * travel is dropped and the scrim's fade carries the whole transition
 * (§36.10) — the panel still arrives, it simply does not slide.
 */
export function DrawerV4({
  open,
  onClose,
  side = 'right',
  title,
  children,
  style,
}: DrawerProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const { width, height } = useWindowDimensions();
  const reduced = useReducedMotion();
  const isHorizontal = side === 'left' || side === 'right';

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
      duration: SURFACE_MOTION.sheet,
      easing: easingOf(theme.motion.easingEnter),
      useNativeDriver: true,
    });
    anim.start();
    return () => anim.stop();
  }, [open, reduced, progress, theme.motion.easingEnter]);

  // Travel the full extent of the axis the panel entered on, then clamp: the
  // panel is narrower than the screen, so over-travelling costs nothing and
  // under-travelling would leave a sliver visible before the animation starts.
  const distance = isHorizontal ? width : height;
  const sign = side === 'left' || side === 'top' ? -1 : 1;
  const travel = reduced
    ? 0
    : progress.interpolate({ inputRange: [0, 1], outputRange: [sign * distance, 0] });

  /*
    A side sheet's measure, from the spacing scale rather than a literal 360:
    seven of the largest step. `85%` remains the cap on a narrow phone, because
    a drawer that covers the page is a screen, not a drawer — the strip of
    scrim left showing is what tells the user there is something behind it.
  */
  const panelWidth = tokens.spacing['2xl'] * 7;

  return (
    <RNModal visible={open} transparent animationType="none" onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          flexDirection: isHorizontal ? 'row' : 'column',
          justifyContent: side === 'right' || side === 'bottom' ? 'flex-end' : 'flex-start',
        }}
      >
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            // Black at a fixed alpha, shared with every other V4 overlay.
            // `onSurface` inverts and would paint a white veil over a dark page.
            backgroundColor: scrimColor(theme),
            opacity: progress,
          }}
        >
          <Pressable accessibilityLabel="Close" onPress={onClose} style={{ flex: 1 }} />
        </Animated.View>

        <Animated.View
          accessibilityViewIsModal
          style={[
            elevationStyle(theme.elevation.sheet),
            panelSkin(theme),
            isHorizontal
              ? { height: '100%', width: '85%', maxWidth: panelWidth }
              : { width: '100%', maxHeight: '85%' },
            {
              overflow: 'hidden',
              transform: isHorizontal ? [{ translateX: travel }] : [{ translateY: travel }],
            },
            style,
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
          <ScrollView contentContainerStyle={{ padding: tokens.spacing.lg }}>{children}</ScrollView>
        </Animated.View>
      </View>
    </RNModal>
  );
}
