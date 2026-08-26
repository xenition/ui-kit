import * as React from 'react';
import {
  Animated,
  Modal as RNModal,
  PanResponder,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useXenitionTheme } from '../theme';
import type { BottomSheetProps } from './BottomSheet';
import { useReducedMotion } from './internal/useReducedMotion';
import { SURFACE_MOTION, elevationStyle, panelSkin, scrimColor } from './internal/surface-v4';
import { EASING_ENTER } from './internal/motion-v4';

export type { BottomSheetProps as BottomSheetV4Props };

/**
 * `BottomSheet`, V4 — the same props, designed as a real sheet.
 *
 * ## What the depth is saying
 *
 * A bottom sheet is not a panel that happens to be at the bottom of the screen;
 * it is a layer that has come up from below and is now sitting ON the page. V4
 * spends exactly three tokens to say that, and nothing on decoration:
 *
 *   - **`elevation.sheet`** — the shadow. Its offset is *negative*: the sheet
 *     casts upward, onto the content it has covered, which is where a real
 *     object's shadow would fall. That contact shadow is the whole reason the
 *     scrim can be lighter than the base component's flat 50% black and the
 *     sheet still reads as separated.
 *   - **The scrim**, from `elevation.sheet.color`. The base overlays scrim with
 *     `onSurface`, which inverts with the scheme and paints a WHITE veil over a
 *     dark page. A shadow colour does not invert, because a shadow does not.
 *   - **`glass`**, but only when the seed asked for `depth: 'glass'`. That is
 *     the one depth check in the file, and it is necessary: the compiler's
 *     `flatten()` neutralises gradients and elevation and stops there, so glass
 *     is live even under `depth: 'flat'`. Gradient and elevation are consumed
 *     unconditionally, and flat falls out for free.
 *
 * What does NOT get depth is anything inside the sheet. §8 bans "cards inside
 * cards inside cards", and a translucent panel inside a translucent sheet is
 * that same mistake with a blur on it. The sheet is the layer; its contents are
 * flat.
 *
 * ## Motion
 *
 * The sheet rises from the bottom because that explains where it came from
 * (§36.1), over `SURFACE_MOTION.sheet` — inside §36.2's 220–320ms band for a
 * sheet transition, on a decelerating curve so it settles rather than stops.
 * The scrim fades in alongside it, and, while the user drags, tracks the finger
 * continuously (§36.4) rather than replaying a canned animation: drag halfway
 * down and the page behind is half-revealed.
 *
 * Under the OS "Reduce Motion" setting the travel is dropped and the sheet is
 * simply there — but the scrim still fades, because an overlay that appears
 * with no transition at all reads as a glitch (§36.10).
 *
 * ## Layout
 *
 * The caller passes content, not padding. The grab handle, the title row and
 * the scrollable body each carry their own rhythm from the spacing scale, and
 * the body clears the home indicator with the bottom safe-area inset.
 */
export function BottomSheetV4({
  open,
  onClose,
  title,
  children,
  snap = 0.5,
  style,
}: BottomSheetProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const { height } = useWindowDimensions();
  const reduced = useReducedMotion();
  // Needs a `SafeAreaProvider` above it (Expo default).
  const insets = useSafeAreaInsets();

  const sheetHeight = Math.max(tokens.spacing['2xl'] * 2, Math.min(1, snap) * height);
  const translateY = React.useRef(new Animated.Value(sheetHeight)).current;

  React.useEffect(() => {
    if (!open) {
      translateY.setValue(sheetHeight);
      return;
    }
    if (reduced) {
      translateY.setValue(0);
      return;
    }
    const anim = Animated.timing(translateY, {
      toValue: 0,
      duration: SURFACE_MOTION.sheet,
      // Decelerate into place. §36.3: a sheet should settle, not stop.
      easing: EASING_ENTER,
      useNativeDriver: true,
    });
    anim.start();
    return () => anim.stop();
  }, [open, reduced, sheetHeight, translateY]);

  /*
    The scrim's opacity is derived from the sheet's own position rather than
    animated beside it, so the two can never disagree — including mid-drag,
    where the user is driving the sheet directly and no timing function is
    involved at all.
  */
  const scrimOpacity = translateY.interpolate({
    inputRange: [0, sheetHeight],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_e, g) => g.dy > 4,
        onPanResponderMove: (_e, g) => {
          if (g.dy > 0) translateY.setValue(g.dy);
        },
        onPanResponderRelease: (_e, g) => {
          // Past a third of the way down, or thrown downward, means dismiss.
          if (g.dy > sheetHeight * 0.3 || g.vy > 0.8) {
            onClose();
            return;
          }
          Animated.timing(translateY, {
            toValue: 0,
            duration: reduced ? 0 : SURFACE_MOTION.settle,
            easing: EASING_ENTER,
            useNativeDriver: true,
          }).start();
        },
      }),
    [onClose, reduced, sheetHeight, translateY]
  );

  const handleWidth = tokens.spacing.xl + tokens.spacing.sm;

  return (
    <RNModal visible={open} transparent animationType="none" onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: scrimColor(theme),
            opacity: scrimOpacity,
          }}
        >
          <Pressable accessibilityLabel="Close" onPress={onClose} style={{ flex: 1 }} />
        </Animated.View>

        <Animated.View
          accessibilityViewIsModal
          style={[
            elevationStyle(theme.elevation.sheet),
            panelSkin(theme),
            {
              height: sheetHeight,
              borderTopLeftRadius: tokens.radius.lg,
              borderTopRightRadius: tokens.radius.lg,
              // The hairline `panelSkin` adds on glass would otherwise run
              // around all four sides, including the one off-screen.
              borderBottomWidth: 0,
              overflow: 'hidden',
              transform: [{ translateY }],
            },
            style,
          ]}
        >
          <View
            {...panResponder.panHandlers}
            style={{ alignItems: 'center', paddingVertical: tokens.spacing.sm }}
          >
            <View
              accessibilityLabel="Drag to dismiss"
              style={{
                width: handleWidth,
                height: tokens.spacing.xs,
                borderRadius: tokens.radius.full,
                backgroundColor: colors.border,
              }}
            />
          </View>

          {title != null &&
            (typeof title === 'string' ? (
              <View
                style={{
                  paddingHorizontal: tokens.spacing.lg,
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
                    // `onSurface`, never `muted` — over glass, `muted` measurably
                    // falls below AA. See `theme/glass-legibility.spec.ts`.
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
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingHorizontal: tokens.spacing.lg,
              paddingTop: tokens.spacing.md,
              paddingBottom: tokens.spacing.lg + insets.bottom,
            }}
          >
            {children}
          </ScrollView>
        </Animated.View>
      </View>
    </RNModal>
  );
}
