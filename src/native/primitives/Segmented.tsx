import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface SegmentedOption {
  label: React.ReactNode;
  value: string;
}

export interface SegmentedProps {
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * Segmented control (pill toggle group) — the native mirror of the web
 * `Segmented`. A token-bound track holds pressable pills; the active pill lifts
 * onto the surface color. No literal colors.
 */
export function Segmented({ options, value, onChange, style }: SegmentedProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View
      accessibilityRole="tablist"
      style={[
        {
          alignSelf: 'flex-start',
          flexDirection: 'row',
          backgroundColor: colors.border,
          borderRadius: tokens.radius.md,
          padding: tokens.spacing.xs,
          gap: tokens.spacing.xs,
        },
        style,
      ]}
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <Pressable
            key={o.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(o.value)}
            style={{
              paddingHorizontal: tokens.spacing.md,
              paddingVertical: tokens.spacing.xs,
              borderRadius: tokens.radius.sm,
              backgroundColor: active ? colors.surface : 'transparent',
            }}
          >
            {typeof o.label === 'string' ? (
              <Text
                style={{
                  color: active ? colors.onSurface : colors.muted,
                  fontSize: tokens.typography.scale.sm,
                  fontWeight: '500',
                }}
              >
                {o.label}
              </Text>
            ) : (
              o.label
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
