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
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useXenitionTheme } from '../theme';
import { useReducedMotion } from './internal/useReducedMotion';

/**
 * The scrim.
 *
 * NOT a semantic token. `onSurface` inverts with the scheme — it is near-black
 * on a light page and near-WHITE on a dark one — so a scrim built from it
 * paints a 50% white veil over a dark app. Verified: at the warm-neutral seed,
 * dark `onSurface` compiles to `#eeeded`.
 *
 * A scrim is not "the text colour, faded". It is the absence of light, and
 * absence does not invert. Black at a fixed alpha in both schemes.
 */
const SCRIM = '#000000';
const SCRIM_OPACITY = 0.5;

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  /** Sheet height as a fraction of the screen (0–1). Default `0.5`. */
  snap?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Draggable bottom sheet — a bottom-anchored `Modal` panel with a top grabber
 * handle that the user can drag down to dismiss (release past a threshold calls
 * `onClose`). Distinct from the side `Drawer` by the grabber + drag gesture and
 * `snap` height. The panel is the `surface` token, the grabber the `border`
 * token, and the scrim the `onSurface` token faded via opacity. The entry slide
 * is skipped when the OS "Reduce Motion" setting is on. No literal colors.
 */
export function BottomSheet({
  open,
  onClose,
  title,
  children,
  snap = 0.5,
  style,
}: BottomSheetProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const { height } = useWindowDimensions();
  const reduced = useReducedMotion();
  // Pad the sheet body past the home indicator with the bottom safe-area inset.
  // Needs a `SafeAreaProvider` above it (Expo default).
  const insets = useSafeAreaInsets();
  const sheetHeight = Math.max(120, Math.min(1, snap) * height);
  const translateY = React.useRef(new Animated.Value(sheetHeight)).current;

  React.useEffect(() => {
    if (open) {
      if (reduced) {
        translateY.setValue(0);
      } else {
        Animated.timing(translateY, { toValue: 0, duration: 220, useNativeDriver: true }).start();
      }
    } else {
      translateY.setValue(sheetHeight);
    }
  }, [open, reduced, sheetHeight, translateY]);

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_e, g) => g.dy > 4,
        onPanResponderMove: (_e, g) => {
          if (g.dy > 0) translateY.setValue(g.dy);
        },
        onPanResponderRelease: (_e, g) => {
          if (g.dy > sheetHeight * 0.3 || g.vy > 0.8) {
            onClose();
          } else {
            Animated.timing(translateY, {
              toValue: 0,
              duration: reduced ? 0 : 160,
              useNativeDriver: true,
            }).start();
          }
        },
      }),
    [onClose, reduced, sheetHeight, translateY]
  );

  return (
    <RNModal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Pressable
          accessibilityLabel="Close"
          onPress={onClose}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: SCRIM, opacity: SCRIM_OPACITY }}
        />
        <Animated.View
          accessibilityViewIsModal
          style={[
            {
              height: sheetHeight,
              backgroundColor: colors.surface,
              borderTopLeftRadius: tokens.radius.lg,
              borderTopRightRadius: tokens.radius.lg,
              paddingHorizontal: tokens.spacing.lg,
              paddingBottom: tokens.spacing.lg + insets.bottom,
              transform: [{ translateY }],
            },
            style,
          ]}
        >
          <View {...panResponder.panHandlers} style={{ alignItems: 'center', paddingVertical: tokens.spacing.sm }}>
            <View
              accessibilityLabel="Drag to dismiss"
              style={{ width: 40, height: 4, borderRadius: tokens.radius.full, backgroundColor: colors.border }}
            />
          </View>
          {title != null &&
            (typeof title === 'string' ? (
              <Text
                style={{
                  fontSize: tokens.typography.scale.lg,
                  fontWeight: '600',
                  color: colors.onSurface,
                  marginBottom: tokens.spacing.md,
                }}
              >
                {title}
              </Text>
            ) : (
              title
            ))}
          <ScrollView>{children}</ScrollView>
        </Animated.View>
      </View>
    </RNModal>
  );
}
