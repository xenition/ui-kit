import * as React from 'react';
import { Animated, Pressable, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

const TRACK_W = 44;
const TRACK_H = 24;
const KNOB = 20;
const PAD = 2;

/**
 * Themed on/off switch — the native mirror of the web `Switch` (`role="switch"`,
 * `checked` / `onCheckedChange` contract). A token-bound track with an animated
 * knob; built from `Pressable` (not RN's `Switch`) to stay fully theme-driven.
 * No literal colors.
 */
export function Switch({
  checked = false,
  onCheckedChange,
  disabled = false,
  accessibilityLabel,
  style,
}: SwitchProps): React.ReactElement {
  const { colors } = useXenitionTheme();
  const anim = React.useRef(new Animated.Value(checked ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(anim, {
      toValue: checked ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [checked, anim]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [PAD, TRACK_W - KNOB - PAD],
  });

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={() => onCheckedChange?.(!checked)}
      style={[
        {
          width: TRACK_W,
          height: TRACK_H,
          borderRadius: TRACK_H / 2,
          justifyContent: 'center',
          backgroundColor: checked ? colors.primary : colors.border,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <Animated.View
        style={{
          width: KNOB,
          height: KNOB,
          borderRadius: KNOB / 2,
          backgroundColor: colors.surface,
          transform: [{ translateX }],
        }}
      />
    </Pressable>
  );
}
