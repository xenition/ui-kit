import * as React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives/Badge';
import type { BookingSlot } from '../../booking/types';
import { formatTimeInTz } from '../../booking/datetime';
import { withAlpha } from '../primitives/internal/color';
import type { SlotPickerProps } from './SlotPicker';

/** Drop-in alternate of {@link SlotPickerProps} — identical prop contract. */
export type SlotPickerV3Props = SlotPickerProps;

const startOf = (s: SlotPickerProps['selected']): string | null =>
  s == null ? null : typeof s === 'string' ? s : s.startsAt;

/**
 * SlotPicker — design variant **V3**: a **vertical list of full-width time
 * rows**, each pairing the time with a capacity {@link Badge}. Where V1 is a
 * chip grid, V3 reads like a schedule — one row per slot, time on the left,
 * remaining-capacity badge on the right (success = open, warn = low, neutral =
 * `fullLabel`). A full slot is disabled and dimmed; the selected row is banded
 * with a primary-tinted fill and a leading primary rail (state shown by fill +
 * shape, never hue alone). Same
 * `slots`/`onPick`/`selected`/`formatTime`/`timeZone`/`lowSpotsThreshold`/
 * `fullLabel`/`scrollEnabled` contract as {@link SlotPickerProps}
 * (`columns` is accepted for drop-in parity). Token-only.
 */
export function SlotPickerV3({
  slots,
  onPick,
  selected,
  formatTime,
  timeZone,
  lowSpotsThreshold = 3,
  fullLabel = 'Full',
  style,
  scrollEnabled,
}: SlotPickerV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const format = formatTime ?? ((iso: string) => formatTimeInTz(iso, timeZone));
  const selectedStart = startOf(selected);

  return (
    <FlatList
      data={slots}
      scrollEnabled={scrollEnabled}
      keyExtractor={(slot) => slot.startsAt}
      contentContainerStyle={[{ gap: tokens.spacing.sm }, style]}
      renderItem={({ item: slot }) => {
        const full = slot.spotsLeft <= 0;
        const isSelected = selectedStart === slot.startsAt;
        const low = !full && slot.spotsLeft <= lowSpotsThreshold;
        const hint = full ? fullLabel : low ? `${slot.spotsLeft} left` : `${slot.spotsLeft} open`;
        const tone = full ? 'neutral' : low ? 'warn' : 'success';
        const timeLabel = format(slot.startsAt);

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${timeLabel}, ${hint}`}
            accessibilityState={{ selected: isSelected, disabled: full }}
            disabled={full}
            onPress={() => onPick?.(slot)}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: tokens.spacing.md,
              borderRadius: tokens.radius.md,
              borderWidth: 1,
              borderLeftWidth: isSelected ? 4 : 1,
              borderColor: isSelected ? colors.primary : colors.border,
              backgroundColor: isSelected
                ? withAlpha(colors.primary, 0.1)
                : pressed && !full
                  ? withAlpha(colors.primary, 0.06)
                  : colors.surface,
              paddingVertical: tokens.spacing.md,
              paddingHorizontal: tokens.spacing.md,
              opacity: full ? 0.55 : 1,
            })}
          >
            <Text
              style={{
                color: isSelected ? colors.primaryText : colors.onSurface,
                fontSize: tokens.typography.scale.base,
                fontWeight: isSelected ? '700' : '500',
              }}
            >
              {timeLabel}
            </Text>
            <Badge tone={tone} variant="soft" size="md">
              {hint}
            </Badge>
          </Pressable>
        );
      }}
      ListEmptyComponent={
        <View style={{ padding: tokens.spacing.md }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            No times available.
          </Text>
        </View>
      }
    />
  );
}
