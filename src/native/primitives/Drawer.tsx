import * as React from 'react';
import {
  Animated,
  Modal as RNModal,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  /** Which edge the sheet slides in from (default `right`). */
  side?: DrawerSide;
  title?: React.ReactNode;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Themed side sheet — the native mirror of the web `Drawer`. RN has no DOM
 * portal, so this is a full-screen `Modal` with the panel anchored to `side`
 * over a translucent backdrop (tap to dismiss). The panel slides in with
 * `Animated`; the scrim is the `onSurface` token faded via `opacity` so every
 * rendered color stays a pure theme token. No literal colors.
 */
export function Drawer({
  open,
  onClose,
  side = 'right',
  title,
  children,
  style,
}: DrawerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const { width, height } = useWindowDimensions();
  const isHorizontal = side === 'left' || side === 'right';
  const progress = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(progress, {
      toValue: open ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [open, progress]);

  const offset = isHorizontal ? width : height;
  const sign = side === 'left' || side === 'top' ? -1 : 1;
  const translate = progress.interpolate({ inputRange: [0, 1], outputRange: [sign * offset, 0] });

  return (
    <RNModal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          flexDirection: isHorizontal ? 'row' : 'column',
          justifyContent: side === 'right' || side === 'bottom' ? 'flex-end' : 'flex-start',
        }}
      >
        <Pressable
          accessibilityLabel="Close"
          onPress={onClose}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: colors.onSurface,
            opacity: 0.5,
          }}
        />
        <Animated.View
          accessibilityViewIsModal
          style={[
            {
              backgroundColor: colors.surface,
              padding: tokens.spacing.lg,
              transform: isHorizontal ? [{ translateX: translate }] : [{ translateY: translate }],
            },
            isHorizontal
              ? { height: '100%', width: '85%', maxWidth: 360 }
              : { width: '100%', maxHeight: '85%' },
            style,
          ]}
        >
          {title != null &&
            (typeof title === 'string' ? (
              <Text
                style={{
                  fontSize: 18,
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
