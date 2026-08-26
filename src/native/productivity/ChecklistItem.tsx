import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { usePressScale } from '../primitives/internal/motion';

export interface ChecklistItemProps {
  /** Item text. */
  label: string;
  /** Controlled checked state. */
  checked?: boolean;
  /**
   * Fires with the next checked value on press. Prefer `onChange` — that is the
   * kit's one canonical name for "the value changed". `onCheckedChange` is this
   * component's original spelling, kept so existing callers keep working; if
   * both are passed this one wins.
   */
  onCheckedChange?: (checked: boolean) => void;
  /** Canonical spelling of `onCheckedChange` (see it for the precedence rule). */
  onChange?: (checked: boolean) => void;
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
  onChange,
  disabled = false,
  style,
}: ChecklistItemProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  // Two spellings, one callback: the original wins when both are passed, so a
  // caller who has migrated half a file never gets the change reported twice.
  const emit = onCheckedChange ?? onChange;

  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked, disabled }}
        accessibilityLabel={label}
        disabled={disabled}
        onPress={() => emit?.(!checked)}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
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
    </Animated.View>
  );
}
