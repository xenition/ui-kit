import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { clockLabel, withAlpha } from './format';
import type { AvailabilitySlot } from './types';

export interface AvailabilityPickerProps {
  /** The bookable slots to show. */
  slots?: AvailabilitySlot[];
  /** Selected slot start(s). A single `Date` or an array when `multiple`. */
  value?: Date | Date[] | null;
  /** Allow selecting more than one slot. */
  multiple?: boolean;
  /** Columns in the slot grid (default 3, clamped ≥ 1). */
  columns?: number;
  /** Fires with the tapped slot's start instant. */
  onSelect?: (start: Date, slot: AvailabilitySlot) => void;
  /** Renders skeleton tiles instead of content. */
  loading?: boolean;
  /** Message shown when there are no slots. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

function isSelected(value: AvailabilityPickerProps['value'], start: Date): boolean {
  if (value == null) return false;
  const list = Array.isArray(value) ? value : [value];
  return list.some((d) => d.getTime() === start.getTime());
}

/**
 * A tap-to-book availability grid — bookable time slots laid out in a wrapping
 * grid, with disabled (blocked) slots rendered but not selectable. Selection is
 * exposed via `accessibilityState.selected` and a filled tile (not color-alone).
 * Includes empty + loading states. Token colors only.
 */
export function AvailabilityPicker({
  slots = [],
  value = null,
  multiple = false,
  columns = 3,
  onSelect,
  loading = false,
  emptyLabel = 'No times available',
  style,
}: AvailabilityPickerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const cols = Math.max(1, Math.floor(columns));
  const widthPct = `${100 / cols}%` as const;

  if (loading) {
    return (
      <View accessibilityRole="none" accessibilityLabel="Loading times" style={[{ flexDirection: 'row', flexWrap: 'wrap' }, style]}>
        {Array.from({ length: cols * 2 }).map((_, i) => (
          <View key={i} style={{ width: widthPct, padding: tokens.spacing.xs }}>
            <View style={{ height: tokens.spacing.xl, borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
          </View>
        ))}
      </View>
    );
  }

  if (slots.length === 0) {
    return (
      <View accessibilityRole="summary" accessibilityLabel={emptyLabel} style={[{ paddingVertical: tokens.spacing.lg, alignItems: 'center' }, style]}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>{emptyLabel}</Text>
      </View>
    );
  }

  return (
    <View accessibilityRole="radiogroup" style={[{ flexDirection: 'row', flexWrap: 'wrap' }, style]}>
      {slots.map((slot, i) => {
        const selected = isSelected(value, slot.start);
        const disabled = slot.disabled === true;
        const text = slot.label ?? clockLabel(slot.start);
        return (
          <View key={slot.start.toISOString() + i} style={{ width: widthPct, padding: tokens.spacing.xs }}>
            <Pressable
              accessibilityRole={multiple ? 'checkbox' : 'radio'}
              accessibilityLabel={text}
              accessibilityState={{ selected, disabled }}
              disabled={disabled}
              onPress={() => onSelect?.(slot.start, slot)}
              style={({ pressed }) => ({
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: tokens.spacing.sm,
                borderRadius: tokens.radius.sm,
                borderWidth: 1,
                borderColor: selected ? colors.primary : colors.border,
                backgroundColor: disabled
                  ? tokens.ramps.neutral[100]
                  : selected
                    ? colors.primary
                    : pressed
                      ? withAlpha(colors.primary, 0.12)
                      : colors.surface,
                opacity: disabled ? 0.6 : 1,
              })}
            >
              <Text
                style={{
                  color: disabled ? colors.muted : selected ? colors.onPrimary : colors.onSurface,
                  fontSize: tokens.typography.scale.sm,
                  fontWeight: selected ? '700' : '500',
                  textDecorationLine: disabled ? 'line-through' : 'none',
                }}
              >
                {text}
              </Text>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}
