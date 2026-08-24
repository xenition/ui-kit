import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { clockLabel, withAlpha } from './format';
import type { AvailabilitySlot } from './types';
import type { AvailabilityPickerProps } from './AvailabilityPicker';

/** Same public contract as {@link AvailabilityPicker} — a drop-in alternate design. */
export type AvailabilityPickerV3Props = AvailabilityPickerProps;

function isSelected(value: AvailabilityPickerProps['value'], start: Date): boolean {
  if (value == null) return false;
  const list = Array.isArray(value) ? value : [value];
  return list.some((d) => d.getTime() === start.getTime());
}

/**
 * AvailabilityPicker, redesigned (v3): **full-width vertical time rows**. Each
 * bookable window is its own tappable line — time on the left, a check/radio
 * indicator on the right — so the list scans top-to-bottom like a booking sheet.
 * The selected row fills and shows a check (never color-alone); blocked rows are
 * struck-through and inert. Empty + loading states included. Same props,
 * token-pure.
 */
export function AvailabilityPickerV3({
  slots = [],
  value = null,
  multiple = false,
  onSelect,
  loading = false,
  emptyLabel = 'No times available',
  style,
}: AvailabilityPickerV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (loading) {
    return (
      <View accessibilityRole="none" accessibilityLabel="Loading times" style={style}>
        {[0, 1, 2, 3].map((i) => (
          <View
            key={i}
            style={{ height: tokens.spacing['2xl'], borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100], marginBottom: tokens.spacing.sm }}
          />
        ))}
      </View>
    );
  }

  if (slots.length === 0) {
    return (
      <View
        accessibilityRole="summary"
        accessibilityLabel={emptyLabel}
        style={[{ paddingVertical: tokens.spacing.lg, alignItems: 'center' }, style]}
      >
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>{emptyLabel}</Text>
      </View>
    );
  }

  return (
    <View accessibilityRole="radiogroup" style={[{ gap: tokens.spacing.sm }, style]}>
      {slots.map((slot: AvailabilitySlot, i) => {
        const selected = isSelected(value, slot.start);
        const disabled = slot.disabled === true;
        const text = slot.label ?? clockLabel(slot.start);
        return (
          <Pressable
            key={slot.start.toISOString() + i}
            accessibilityRole={multiple ? 'checkbox' : 'radio'}
            accessibilityLabel={text}
            accessibilityState={{ selected, disabled }}
            disabled={disabled}
            onPress={() => onSelect?.(slot.start, slot)}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: tokens.spacing.sm,
              paddingHorizontal: tokens.spacing.md,
              borderRadius: tokens.radius.md,
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
                fontSize: tokens.typography.scale.base,
                fontWeight: selected ? '800' : '500',
                textDecorationLine: disabled ? 'line-through' : 'none',
              }}
            >
              {text}
            </Text>
            {/* Trailing indicator: a check when chosen, "Booked" when blocked. */}
            {disabled ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>Booked</Text>
            ) : (
              <View
                style={{
                  width: tokens.spacing.lg,
                  height: tokens.spacing.lg,
                  borderRadius: tokens.radius.full,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: selected ? 0 : 1.5,
                  borderColor: colors.border,
                  backgroundColor: selected ? colors.onPrimary : 'transparent',
                }}
              >
                {selected ? (
                  <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '800' }}>✓</Text>
                ) : null}
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
