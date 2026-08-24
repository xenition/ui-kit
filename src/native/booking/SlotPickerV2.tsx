import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { BookingSlot } from '../../booking/types';
import { formatTimeInTz } from '../../booking/datetime';
import { withAlpha } from '../primitives/internal/color';
import type { SlotPickerProps } from './SlotPicker';

/** Drop-in alternate of {@link SlotPickerProps} — identical prop contract. */
export type SlotPickerV2Props = SlotPickerProps;

const startOf = (s: SlotPickerProps['selected']): string | null =>
  s == null ? null : typeof s === 'string' ? s : s.startsAt;

type Period = 'morning' | 'afternoon' | 'evening';
const PERIOD_ORDER: Period[] = ['morning', 'afternoon', 'evening'];
const PERIOD_LABEL: Record<Period, string> = {
  morning: 'Morning',
  afternoon: 'Afternoon',
  evening: 'Evening',
};

/** Hour-of-day (0–23) for an ISO instant in the given IANA zone, or -1. */
function hourInTz(iso: string, tz?: string): number {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return -1;
  const s = new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: 'numeric', hour12: false }).format(d);
  const n = Number.parseInt(s, 10);
  return Number.isFinite(n) ? n % 24 : -1;
}

function periodOf(hour: number): Period {
  if (hour >= 17) return 'evening';
  if (hour >= 12) return 'afternoon';
  return 'morning'; // includes the -1 (unparseable) fallback
}

/**
 * SlotPicker — design variant **V2**: bookable times **grouped into Morning /
 * Afternoon / Evening**, each section a wrap-flowed set of time chips. Where V1
 * is one flat FlatList grid, V2 buckets slots by their local hour (in
 * `timeZone`) under labelled section headers, so a long day of availability
 * scans at a glance. A full slot (`spotsLeft === 0`) is disabled and shows the
 * `fullLabel`; low capacity surfaces a "{n} left" hint; the selected chip fills
 * with the primary token. Same
 * `slots`/`onPick`/`selected`/`formatTime`/`timeZone`/`lowSpotsThreshold`/
 * `fullLabel` contract as {@link SlotPickerProps} (`columns`/`scrollEnabled` are
 * accepted for drop-in parity; the wrap layout is fluid). Token-only.
 */
export function SlotPickerV2({
  slots,
  onPick,
  selected,
  formatTime,
  timeZone,
  lowSpotsThreshold = 3,
  fullLabel = 'Full',
  style,
}: SlotPickerV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const format = formatTime ?? ((iso: string) => formatTimeInTz(iso, timeZone));
  const selectedStart = startOf(selected);

  const groups = React.useMemo(() => {
    const map: Record<Period, BookingSlot[]> = { morning: [], afternoon: [], evening: [] };
    for (const slot of slots ?? []) {
      map[periodOf(hourInTz(slot.startsAt, timeZone))].push(slot);
    }
    return map;
  }, [slots, timeZone]);

  const hasAny = PERIOD_ORDER.some((p) => groups[p].length > 0);

  if (!hasAny) {
    return (
      <View style={[{ padding: tokens.spacing.md }, style]}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          No times available.
        </Text>
      </View>
    );
  }

  return (
    <View style={[{ gap: tokens.spacing.md }, style]}>
      {PERIOD_ORDER.map((period) => {
        const items = groups[period];
        if (items.length === 0) return null;
        return (
          <View key={period} style={{ gap: tokens.spacing.sm }}>
            <Text
              accessibilityRole="header"
              style={{
                color: colors.muted,
                fontSize: tokens.typography.scale.xs,
                fontWeight: '700',
                letterSpacing: 0.6,
              }}
            >
              {PERIOD_LABEL[period].toUpperCase()}
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
              {items.map((slot) => {
                const full = slot.spotsLeft <= 0;
                const isSelected = selectedStart === slot.startsAt;
                const low = !full && slot.spotsLeft <= lowSpotsThreshold;
                const hint = full ? fullLabel : low ? `${slot.spotsLeft} left` : `${slot.spotsLeft} open`;
                const timeLabel = format(slot.startsAt);
                const fg = isSelected ? colors.onPrimary : colors.onSurface;
                const hintColor = isSelected ? colors.onPrimary : colors.muted;

                return (
                  <Pressable
                    key={slot.startsAt}
                    accessibilityRole="button"
                    accessibilityLabel={`${timeLabel}, ${hint}`}
                    accessibilityState={{ selected: isSelected, disabled: full }}
                    disabled={full}
                    onPress={() => onPick?.(slot)}
                    style={({ pressed }) => ({
                      alignItems: 'center',
                      gap: 2,
                      minWidth: 88,
                      borderRadius: tokens.radius.full,
                      borderWidth: 1,
                      borderColor: isSelected ? colors.primary : colors.border,
                      backgroundColor: isSelected
                        ? colors.primary
                        : pressed && !full
                          ? withAlpha(colors.primary, 0.1)
                          : colors.surface,
                      paddingVertical: tokens.spacing.sm,
                      paddingHorizontal: tokens.spacing.md,
                      opacity: full ? 0.5 : 1,
                    })}
                  >
                    <Text style={{ color: fg, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
                      {timeLabel}
                    </Text>
                    <Text style={{ color: hintColor, fontSize: tokens.typography.scale.xs }}>{hint}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
  );
}
