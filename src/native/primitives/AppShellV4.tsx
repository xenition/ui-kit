import * as React from 'react';
import { Animated, Modal as RNModal, Pressable, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useXenitionTheme } from '../theme';
import type { AppShellProps } from './AppShell';
import { Icon } from './Icon';
import { easingOf, minTap } from './internal/chrome-v4';
import { pressFill } from './internal/state-v4';
import { SURFACE_MOTION, elevationStyle, scrimColor } from './internal/surface-v4';
import { useReducedMotion } from './internal/useReducedMotion';

export type { AppShellProps as AppShellV4Props };

/**
 * `AppShell`, V4 — the same props, and exactly one layer.
 *
 * ## Which container earns depth, and which does not
 *
 * §11 asks that a container earn its existence. This shell has three candidates
 * and gives depth to one of them:
 *
 * - The **top bar** is pinned, not raised. It stays flat with a hairline: a
 *   shadow under a bar is honest only once content is actually scrolling
 *   beneath it, and a shell cannot know that without owning the scroll position
 *   of a region the caller fills. A hairline is true in every state, which §14
 *   prefers to a decoration that is right half the time.
 * - The **content area** is the page. Pages do not float.
 * - The **slide-in drawer** genuinely is above the page, over a scrim, with the
 *   content still visible behind it. That one takes `elevation.sheet`, the same
 *   altitude as every other V4 overlay.
 *
 * The drawer is opaque rather than following the seed's glass setting, and that
 * is deliberate: it holds an opaque `Sidebar` that paints its own surface, so a
 * translucent wrapper would frost nothing. A component should not claim a
 * treatment it cannot deliver.
 *
 * ## The scrim
 *
 * The shadow colour at a fixed alpha, shared with `ModalV4`, `DrawerV4` and the
 * rest. The base painted `colors.onSurface` at 0.5, which INVERTS with the
 * scheme and lays a white veil over a dark page.
 *
 * ## Motion
 *
 * The base opens the drawer with `animationType="slide"`, which on React Native
 * means *up from the bottom* — a left-anchored rail arriving from underneath
 * the screen, which says something false about where it lives (§36.5). V4
 * drives the travel itself: the panel moves the width of itself, from the left
 * edge, at `SURFACE_MOTION.sheet`, with `motion.easingEnter` so it settles
 * rather than stopping dead. Under Reduce Motion the travel is dropped and the
 * scrim's fade carries the transition.
 *
 * ## The menu button
 *
 * It becomes a real 44pt target composed from the spacing scale — the base's
 * `padding: xs` around a glyph put it near 28, on the control that is the only
 * way into navigation on a phone — presses with the M3 state layer, and draws
 * its glyph through the kit's own `Icon` rather than a raw `≡` in a `<Text>`,
 * so the whole kit uses one symbol for one idea.
 */
export function AppShellV4({
  sidebar,
  header,
  children,
  menuLabel = 'Toggle navigation',
  sidebarWidth = 280,
  style,
}: AppShellProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const { width } = useWindowDimensions();
  const reduced = useReducedMotion();
  const [open, setOpen] = React.useState(false);
  // Push the top bar below the status bar / notch by adding the top safe-area
  // inset to its token padding. Needs a `SafeAreaProvider` above it.
  const insets = useSafeAreaInsets();

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

  const travel = reduced
    ? 0
    : progress.interpolate({ inputRange: [0, 1], outputRange: [-width, 0] });

  const tap = minTap(tokens.spacing);

  return (
    <View style={[{ flex: 1, backgroundColor: colors.surface }, style]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          borderBottomWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          paddingHorizontal: tokens.spacing.lg,
          paddingTop: tokens.spacing.md + insets.top,
          paddingBottom: tokens.spacing.md,
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={menuLabel}
          accessibilityState={{ expanded: open }}
          onPress={() => setOpen(true)}
          style={({ pressed }) => ({
            minWidth: tap,
            minHeight: tap,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? pressFill(theme) : 'transparent',
          })}
        >
          {/* The kit's own icon set, so one idea has one symbol kit-wide. */}
          <Icon name="menu" size="xl" color="onSurface" />
        </Pressable>
        <View style={{ flex: 1 }}>
          {typeof header === 'string' ? (
            <Text
              style={{
                color: colors.onSurface,
                fontFamily: tokens.typography.fontHeading,
                fontSize: tokens.typography.scale.lg,
                fontWeight: '600',
              }}
            >
              {header}
            </Text>
          ) : (
            header
          )}
        </View>
      </View>

      <View style={{ flex: 1, padding: tokens.spacing.lg }}>{children}</View>

      <RNModal
        visible={open}
        transparent
        animationType="none"
        onRequestClose={() => setOpen(false)}
      >
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              // Black at a fixed alpha. `onSurface` inverts and would paint a
              // white veil over a dark page.
              backgroundColor: scrimColor(theme),
              opacity: progress,
            }}
          >
            <Pressable
              accessibilityLabel="Close navigation"
              onPress={() => setOpen(false)}
              style={{ flex: 1 }}
            />
          </Animated.View>
          <Animated.View
            accessibilityViewIsModal
            style={[
              // The one container in this shell that is genuinely a layer.
              elevationStyle(theme.elevation.sheet),
              {
                width: sidebarWidth,
                maxWidth: '85%',
                transform: [{ translateX: travel }],
              },
            ]}
          >
            {sidebar}
          </Animated.View>
        </View>
      </RNModal>
    </View>
  );
}
