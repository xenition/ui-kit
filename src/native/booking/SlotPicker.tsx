import * as React from 'react';
import { FlatList, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { BookingSlot } from '../../booking/types';
import { formatTimeInTz } from '../../booking/datetime';

export interface SlotPickerProps {
  /** Bookable time slots for the chosen day. */
  slots: BookingSlot[];
  /** Called with the slot when a bookable time is picked. */
  onPick?: (slot: BookingSlot) => void;
  /** Currently selected slot (or its `startsAt` for matching). */
  selected?: BookingSlot | string | null;
  /** Render a slot's local time. Defaults to a timezone-aware `h:mm a`. */
  formatTime?: (iso: string) => string;
  /** IANA timezone used by the default `formatTime`. */
  timeZone?: string;
  /** Columns of time chips (default 3). */
  columns?: 2 | 3 | 4;
  /** Show the remaining-spots hint only when `spotsLeft <= this` (default 3). */
  lowSpotsThreshold?: number;
  /** Label shown on a full (spotsLeft === 0) slot (default `Full`). */
  fullLabel?: string;
  /** Container style override. */
  style?: StyleProp<ViewStyle>;
  /** Passed through to the underlying FlatList (e.g. `scrollEnabled`). */
  scrollEnabled?: boolean;
}

const startOf = (s: SlotPickerProps['selected']): string | null =>
  s == null ? null : typeof s === 'string' ? s : s.startsAt;

/**
 * Grid of bookable times for one day — the native mirror of the web
 * `SlotPicker`. Same `slots`/`onPick`/`selected`/`formatTime`/`timeZone`/
 * `columns`/`fullLabel` contract (`onPick` is the native idiom for the web
 * click). A `FlatList` of `Pressable` time chips: a full slot
 * (`spotsLeft === 0`) is disabled and shows the `fullLabel`, low remaining
 * capacity surfaces a "{n} left" hint, and the selected chip fills with the
 * primary token. Accessible: each chip is a `button` with
 * `accessibilityState={{ selected, disabled }}`. Token-only.
 */
export function SlotPicker({
  slots,
  onPick,
  selected,
  formatTime,
  timeZone,
  columns = 3,
  lowSpotsThreshold = 3,
  fullLabel = 'Full',
  style,
  scrollEnabled,
}: SlotPickerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const format = formatTime ?? ((iso: string) => formatTimeInTz(iso, timeZone));
  const selectedStart = startOf(selected);
  const gap = tokens.spacing.sm;

  return (
    <FlatList
      data={slots}
      // `key` forces a fresh list when the column count changes (RN requirement).
      key={`cols-${columns}`}
      numColumns={columns}
      scrollEnabled={scrollEnabled}
      keyExtractor={(slot) => slot.startsAt}
      columnWrapperStyle={{ gap }}
      contentContainerStyle={[{ gap }, style]}
      renderItem={({ item: slot }) => {
        const full = slot.spotsLeft <= 0;
        const isSelected = selectedStart === slot.startsAt;
        const low = !full && slot.spotsLeft <= lowSpotsThreshold;

        const hint = full ? fullLabel : low ? `${slot.spotsLeft} left` : `${slot.spotsLeft} open`;
        const timeLabel = format(slot.startsAt);
        const fg = isSelected ? colors.onPrimary : colors.onSurface;
        const hintColor = isSelected ? colors.onPrimary : colors.muted;

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${timeLabel}, ${hint}`}
            accessibilityState={{ selected: isSelected, disabled: full }}
            disabled={full}
            onPress={() => onPick?.(slot)}
            style={({ pressed }) => ({
              flex: 1,
              alignItems: 'center',
              gap: 2,
              borderRadius: tokens.radius.md,
              borderWidth: 1,
              borderColor: isSelected ? colors.primary : colors.border,
              backgroundColor: isSelected
                ? colors.primary
                : pressed && !full
                  ? tokens.ramps.primary[50]
                  : colors.surface,
              paddingVertical: tokens.spacing.sm,
              paddingHorizontal: tokens.spacing.sm,
              opacity: full ? 0.5 : 1,
            })}
          >
            <Text style={{ color: fg, fontSize: tokens.typography.scale.sm, fontWeight: '500' }}>
              {timeLabel}
            </Text>
            <Text style={{ color: hintColor, fontSize: tokens.typography.scale.xs }}>{hint}</Text>
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
