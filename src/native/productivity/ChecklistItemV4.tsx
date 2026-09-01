import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { usePressScale } from '../primitives/internal/motion';
import type { ChecklistItemProps } from './ChecklistItem';

/** Drop-in for {@link ChecklistItemProps} — same props, the V4 "flow" design. */
export type ChecklistItemV4Props = ChecklistItemProps;

/**
 * ChecklistItem — **V4** "flow" design. The focused-workspace take on a checklist
 * line: a big ≥44px tap target, a round toggle, and a bigger, more legible label.
 * Checking the item is the satisfying moment — the row settles into a
 * **soft-success glow** with the label struck through. Same props/behavior as
 * {@link ChecklistItemProps} (both `onChange` and `onCheckedChange` spellings,
 * the original winning); token-only colors via `useXenitionTheme()`.
 */
export function ChecklistItemV4({
  label,
  checked = false,
  onCheckedChange,
  onChange,
  disabled = false,
  style,
}: ChecklistItemV4Props): React.ReactElement {
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
            gap: tokens.spacing.md,
            minHeight: 44,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.sm,
            borderRadius: tokens.radius.md,
            backgroundColor: checked ? withAlpha(colors.success, 0.08) : 'transparent',
            opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
          },
          style,
        ]}
      >
        <View
          style={{
            width: 24,
            height: 24,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.full,
            borderWidth: 1,
            borderColor: checked ? colors.success : colors.border,
            backgroundColor: checked ? colors.success : colors.surface,
          }}
        >
          {checked ? (
            <Text style={{ color: colors.onSuccess, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>✓</Text>
          ) : null}
        </View>
        <Text
          style={{
            flex: 1,
            color: checked ? colors.muted : colors.onSurface,
            fontSize: tokens.typography.scale.base,
            fontWeight: '500',
            lineHeight: tokens.typography.scale.base * 1.4,
            textDecorationLine: checked ? 'line-through' : 'none',
          }}
        >
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
