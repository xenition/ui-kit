import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface ChecklistItemProps {
  /** Item text. */
  label: string;
  /** Controlled checked state. */
  checked?: boolean;
  /** Fires with the next checked value on press. */
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single checklist line — a round toggle + label. Unlike the square primitive
 * `Checkbox`, a checked item fills with the **success** token (done = success)
 * and strikes through its label. Exposes the `checkbox` a11y role/state. No
 * literal colors.
 */
export function ChecklistItem({
  label,
  checked = false,
  onCheckedChange,
  disabled = false,
  style,
}: ChecklistItemProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={label}
      disabled={disabled}
      onPress={() => onCheckedChange?.(!checked)}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.xs,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 20,
          height: 20,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: tokens.radius.full,
          borderWidth: 1,
          borderColor: checked ? colors.success : colors.border,
          backgroundColor: checked ? colors.success : colors.surface,
        }}
      >
        {checked ? (
          <Text style={{ color: colors.onSuccess, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>✓</Text>
        ) : null}
      </View>
      <Text
        style={{
          flex: 1,
          color: checked ? colors.muted : colors.onSurface,
          fontSize: tokens.typography.scale.sm,
          textDecorationLine: checked ? 'line-through' : 'none',
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
