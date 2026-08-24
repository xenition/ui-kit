import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { clockLabel, withAlpha } from './format';
import type { AvailabilitySlot } from './types';
import type { AvailabilityPickerProps } from './AvailabilityPicker';

/** Same public contract as {@link AvailabilityPicker} — a drop-in alternate design. */
export type AvailabilityPickerV2Props = AvailabilityPickerProps;

function isSelected(value: AvailabilityPickerProps['value'], start: Date): boolean {
  if (value == null) return false;
  const list = Array.isArray(value) ? value : [value];
  return list.some((d) => d.getTime() === start.getTime());
}

type Period = 'Morning' | 'Afternoon' | 'Evening';
const PERIODS: readonly Period[] = ['Morning', 'Afternoon', 'Evening'];

function periodOf(date: Date): Period {
  const h = date.getHours();
  if (h < 12) return 'Morning';
  if (h < 17) return 'Afternoon';
  return 'Evening';
}

/**
 * AvailabilityPicker, redesigned (v2): **slot chips grouped by part of day**.
 * Open times wrap into rounded chips under Morning / Afternoon / Evening
 * headings; a selected chip fills (and is announced), blocked chips render
 * struck-through and inert. Empty + loading states included. Same props,
 * token-pure.
 */
export function AvailabilityPickerV2({
  slots = [],
  value = null,
  multiple = false,
  onSelect,
  loading = false,
  emptyLabel = 'No times available',
  style,
}: AvailabilityPickerV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (loading) {
    return (
      <View accessibilityRole="none" accessibilityLabel="Loading times" style={style}>
        {[0, 1].map((g) => (
          <View key={g} style={{ marginBottom: tokens.spacing.md }}>
            <View style={{ height: 10, width: tokens.spacing['2xl'], borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100], marginBottom: tokens.spacing.sm }} />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
              {[0, 1, 2, 3].map((i) => (
                <View key={i} style={{ height: tokens.spacing.xl, width: tokens.spacing['2xl'] + tokens.spacing.lg, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[100] }} />
              ))}
            </View>
          </View>
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

  const groups = PERIODS.map((period) => ({
    period,
    items: slots.filter((s) => periodOf(s.start) === period),
  })).filter((g) => g.items.length > 0);

  return (
    <View accessibilityRole="radiogroup" style={style}>
      {groups.map((group) => (
        <View key={group.period} style={{ marginBottom: tokens.spacing.md }}>
          <Text
            style={{
              color: colors.muted,
              fontSize: tokens.typography.scale.xs,
              fontWeight: '700',
              marginBottom: tokens.spacing.sm,
            }}
          >
            {group.period}
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
            {group.items.map((slot: AvailabilitySlot, i) => {
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
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                    borderRadius: tokens.radius.full,
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
                      fontWeight: selected ? '800' : '500',
                      textDecorationLine: disabled ? 'line-through' : 'none',
                    }}
                  >
                    {text}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
}
