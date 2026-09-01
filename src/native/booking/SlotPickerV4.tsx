import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { disabledOpacity, minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { formatTimeInTz } from '../../booking/datetime';
import { PERIOD_LABEL, groupSlotsByPeriod, type SlotPeriod } from '../../booking/schedule-v4';
import type { BookingSlot } from '../../booking/types';
import type { SlotPickerProps } from './SlotPicker';

export interface SlotPickerV4Props extends SlotPickerProps {
  /**
   * Group the slots under Morning / Afternoon / Evening headings. Default
   * `true`.
   *
   * A busy day is thirty chips in one undifferentiated wall, and a user
   * looking for "something after work" has to read all thirty. The buckets are
   * computed in the slot's **own** timezone, not the device's — a 9am
   * appointment in Lisbon is not an evening slot for a user in Tokyo.
   *
   * `false` restores the base's flat grid.
   */
  grouped?: boolean;
  /** Override the three bucket headings — they are English by default. */
  periodLabels?: Partial<Record<SlotPeriod, string>>;
  /**
   * Build the spots hint. Defaults to `'3 left'` under the threshold and
   * `'8 open'` above it; the base hard-coded both inside the component.
   */
  formatSpots?: (spotsLeft: number, low: boolean) => string;
  /** Copy for the empty state. Default `'No times available.'`. */
  emptyMessage?: string;
}

/**
 * **V4 slot picker** — same props as {@link SlotPicker} plus `grouped`,
 * `periodLabels`, `formatSpots` and `emptyMessage`.
 *
 * ## Five changes
 *
 * 1. **A day of slots has structure.** See `grouped`.
 * 2. **A full slot is disabled at M3's opacity, not at 0.5.** `0.38` is the
 *    number the whole kit uses for "you cannot have this"; 0.5 was this
 *    component's own guess and read as "dimmed for some reason".
 * 3. **Press is a state layer over the chip's own fill.** The base pressed to
 *    `tokens.ramps.primary[50]` — the light end of the ramp in both schemes,
 *    so on a dark page a pressed slot flashed near-white.
 * 4. **Chips clear 44 and their type comes from `TextV4`.** The base set
 *    `paddingVertical: spacing.sm` with no minimum height, so a compact seed
 *    produced a chip a finger could miss.
 * 5. **The copy is the host's** — `formatSpots`, `periodLabels`,
 *    `emptyMessage`, on top of the `fullLabel` the base already had.
 *
 * Still a controlled component: it computes nothing it does not display, and
 * an empty `slots` renders the message rather than a blank grid.
 */
export function SlotPickerV4({
  slots,
  onPick,
  selected,
  formatTime,
  timeZone,
  columns = 3,
  lowSpotsThreshold = 3,
  fullLabel = 'Full',
  grouped = true,
  periodLabels,
  formatSpots,
  emptyMessage = 'No times available.',
  style,
}: SlotPickerV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const tap = minTap(tokens.spacing);

  const format = formatTime ?? ((iso: string) => formatTimeInTz(iso, timeZone));
  const selectedStart = typeof selected === 'string' ? selected : (selected?.startsAt ?? null);
  const spots = formatSpots ?? ((n: number, low: boolean) => (low ? `${n} left` : `${n} open`));

  const list = slots ?? [];
  if (list.length === 0) {
    return (
      <View accessibilityRole="summary" style={[{ padding: tokens.spacing.md }, style]}>
        <TextV4 size="sm" tone="mutedText">
          {emptyMessage}
        </TextV4>
      </View>
    );
  }

  const groups = grouped
    ? groupSlotsByPeriod(list, timeZone)
    : [{ period: 'morning' as SlotPeriod, slots: list }];

  const chip = (slot: BookingSlot): React.ReactElement => {
    const full = slot.spotsLeft <= 0;
    const isSelected = selectedStart === slot.startsAt;
    const low = !full && slot.spotsLeft <= lowSpotsThreshold;
    const hint = full ? fullLabel : spots(slot.spotsLeft, low);
    const timeLabel = format(slot.startsAt);

    const fill = isSelected ? colors.primary : colors.card;
    const ink = isSelected ? colors.onPrimary : colors.onCard;

    return (
      <Pressable
        key={slot.startsAt}
        accessibilityRole="button"
        accessibilityLabel={`${timeLabel}, ${hint}`}
        accessibilityState={{ selected: isSelected, disabled: full }}
        disabled={full}
        onPress={() => onPick?.(slot)}
        style={({ pressed }) => ({
          flex: 1,
          minHeight: tap,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: isSelected ? colors.primary : colors.border,
          backgroundColor: pressed && !full ? pressOver(theme, fill, ink) : fill,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          opacity: disabledOpacity(theme.state, full),
        })}
      >
        <TextV4 size="sm" weight="semibold" numeric="tabular" style={{ color: ink }}>
          {timeLabel}
        </TextV4>
        <TextV4
          size="xs"
          // A low-spots hint is genuinely a caution — it is the fact that makes
          // a user hurry — so it keeps `warn`. A plain count does not.
          style={{
            color: isSelected
              ? colors.onPrimary
              : low && !full
                ? colors.warnText
                : colors.mutedText,
          }}
        >
          {hint}
        </TextV4>
      </Pressable>
    );
  };

  /** One bucket's chips, wrapped into rows of `columns` and never clipped. */
  const grid = (bucket: BookingSlot[]): React.ReactElement[] => {
    const rows: BookingSlot[][] = [];
    for (let i = 0; i < bucket.length; i += columns) rows.push(bucket.slice(i, i + columns));
    return rows.map((row, i) => (
      <View key={i} style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
        {row.map(chip)}
        {/* Keeps the last chip the same width as the others. */}
        {Array.from({ length: columns - row.length }, (_, k) => (
          <View key={`pad-${k}`} style={{ flex: 1 }} />
        ))}
      </View>
    ));
  };

  return (
    <View style={[{ gap: tokens.spacing.md }, style]}>
      {groups.map((group) => (
        <View key={group.period} style={{ gap: tokens.spacing.sm }}>
          {grouped ? (
            <TextV4 size="sm" weight="semibold" tone="mutedText">
              {periodLabels?.[group.period] ?? PERIOD_LABEL[group.period]}
            </TextV4>
          ) : null}
          {grid(group.slots)}
        </View>
      ))}
    </View>
  );
}
