import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { usePressScale } from '../primitives/internal/motion';
import { GradientSurface } from './internal/GradientSurface';
import { journeyDisc, journeyInk } from './internal/journey';
import type { Seat, SeatStatus, SeatPickerProps } from './SeatPicker';

/** Drop-in for {@link SeatPickerProps} — same props, the V4 "journey" design. */
export type SeatPickerV4Props = SeatPickerProps;

/** Glyph reinforces status so it is never conveyed by color alone. */
const STATUS_GLYPH: Record<SeatStatus, string> = {
  available: '',
  occupied: '✕',
  selected: '✓',
};

/** Legend entries mirror the seat states below. */
const LEGEND: readonly { status: SeatStatus; label: string }[] = [
  { status: 'available', label: 'Available' },
  { status: 'selected', label: 'Selected' },
  { status: 'occupied', label: 'Taken' },
];

/**
 * SeatPicker — **V4** "journey" design. A refined cabin seat map for the
 * boarding-pass line: a grid of pressable seats where the chosen seat is filled
 * with the brand journey gradient (`journeyDisc`) and near-white glyph (the
 * signature V4 touch), available seats sit as clean `surface` tiles, and
 * occupied seats read muted and disabled. A legend row explains the states.
 * Same props/behavior as {@link SeatPickerProps}: each seat announces its label
 * and status via `accessibilityLabel`/`accessibilityState` and carries a glyph
 * (`✓` selected, `✕` occupied), so state never depends on color alone. Occupied
 * seats never fire `onSelect`. Selection is controlled via `selectedIds`.
 * Token-only colors via `useXenitionTheme()`.
 */
export function SeatPickerV4({
  rows,
  selectedIds = [],
  rowLabels,
  onSelect,
  maxSelectable,
  style,
}: SeatPickerV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const selected = React.useMemo(() => new Set(selectedIds), [selectedIds]);

  const statusOf = (seat: Seat): SeatStatus => {
    if (seat.occupied) return 'occupied';
    return selected.has(seat.id) ? 'selected' : 'available';
  };

  return (
    <View accessibilityRole="none" style={[{ gap: tokens.spacing.sm, alignSelf: 'flex-start' }, style]}>
      {rows.map((seats, r) => {
        const rowLabel = rowLabels && r < rowLabels.length ? rowLabels[r] : String(r + 1);
        return (
          <View key={`row-${r}`} style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Text
              style={{ width: 20, textAlign: 'center', color: colors.muted, fontSize: tokens.typography.scale.xs }}
            >
              {rowLabel}
            </Text>
            {seats.map((seat, c) => (
              <SeatButton
                key={seat.id || `seat-${r}-${c}`}
                seat={seat}
                status={statusOf(seat)}
                onSelect={onSelect}
              />
            ))}
          </View>
        );
      })}

      {/* Legend — the seat states, mirrored from the grid above. */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.md }}>
        {LEGEND.map(({ status, label }) => (
          <View key={status} style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <LegendSwatch status={status} />
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{label}</Text>
          </View>
        ))}
      </View>

      {typeof maxSelectable === 'number' ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {`Selected ${selected.size} of ${maxSelectable}`}
        </Text>
      ) : null}
    </View>
  );
}

/** A small non-interactive swatch echoing a seat state for the legend. */
function LegendSwatch({ status }: { status: SeatStatus }): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const base = {
    width: 16,
    height: 16,
    borderRadius: tokens.radius.sm,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  if (status === 'selected') {
    return (
      <GradientSurface colors={journeyDisc(r)} style={{ ...base, overflow: 'hidden' }}>
        <Text style={{ color: journeyInk(r), fontSize: 9 }}>{STATUS_GLYPH.selected}</Text>
      </GradientSurface>
    );
  }

  const bg = status === 'occupied' ? colors.muted : colors.surface;
  return (
    <View style={{ ...base, backgroundColor: bg, borderWidth: 1, borderColor: colors.border, opacity: status === 'occupied' ? 0.6 : 1 }}>
      <Text style={{ color: colors.muted, fontSize: 9 }}>{STATUS_GLYPH[status]}</Text>
    </View>
  );
}

interface SeatButtonProps {
  seat: Seat;
  status: SeatStatus;
  onSelect?: (seat: Seat) => void;
}

/**
 * A single seat. Selected seats render on the journey gradient with near-white
 * ink; available seats are clean `surface` tiles; occupied seats stay muted and
 * disabled (no press feedback). Its own `usePressScale` gives a live seat a
 * subtle tap scale, and all a11y — label, selected/disabled state, status glyph
 * — is preserved.
 */
function SeatButton({ seat, status, onSelect }: SeatButtonProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const press = usePressScale();
  const label = seat.label ?? seat.id;
  const disabled = status === 'occupied';
  const glyph = STATUS_GLYPH[status];
  const selected = status === 'selected';

  const inner = (
    <Text
      style={{
        color: selected ? journeyInk(r) : status === 'occupied' ? colors.muted : colors.onSurface,
        fontSize: tokens.typography.scale.xs,
        fontWeight: '600',
      }}
    >
      {glyph || label}
    </Text>
  );

  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Seat ${label}, ${status === 'selected' ? 'selected' : status}`}
        accessibilityState={{ selected, disabled }}
        disabled={disabled}
        onPress={disabled ? undefined : () => onSelect?.(seat)}
        onPressIn={disabled ? undefined : press.onPressIn}
        onPressOut={disabled ? undefined : press.onPressOut}
        style={({ pressed }) => ({ opacity: disabled ? 0.6 : pressed ? 0.85 : 1 })}
      >
        {selected ? (
          <GradientSurface
            colors={journeyDisc(r)}
            style={{
              width: 36,
              height: 36,
              borderRadius: tokens.radius.md,
              borderWidth: 1,
              borderColor: r.primary[600],
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {inner}
          </GradientSurface>
        ) : (
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: tokens.radius.md,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: status === 'occupied' ? colors.muted : colors.surface,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {inner}
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}
