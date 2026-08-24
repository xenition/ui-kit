import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../primitives';

/** Availability of a single seat. */
export type SeatStatus = 'available' | 'occupied' | 'selected';

/** A seat in the cabin map. */
export interface Seat {
  /** Stable id, typically the seat label, e.g. `'12A'`. */
  id: string;
  /** Visible/announced label (defaults to `id`). */
  label?: string;
  /** Whether the seat can be booked. Occupied seats are never selectable. */
  occupied?: boolean;
}

export interface SeatPickerProps {
  /** Rows of seats; each inner array is one row across the aisle. */
  rows: readonly (readonly Seat[])[];
  /** Ids of the currently selected seats. */
  selectedIds?: readonly string[];
  /** Row-label letters/numbers shown on the left gutter (optional, per row). */
  rowLabels?: readonly string[];
  /** Fires with the pressed seat when an available seat is toggled. */
  onSelect?: (seat: Seat) => void;
  /** Max simultaneously selectable seats (informational; enforcement is caller-side). */
  maxSelectable?: number;
  style?: StyleProp<ViewStyle>;
}

/** [background, foreground, border] token slots per resolved status. */
const STATUS_SLOTS: Record<SeatStatus, [keyof SemanticColors, keyof SemanticColors, keyof SemanticColors]> = {
  available: ['surface', 'onSurface', 'border'],
  occupied: ['border', 'muted', 'border'],
  selected: ['primary', 'onPrimary', 'primary'],
};

/** Glyph reinforces status so it is never conveyed by color alone. */
const STATUS_GLYPH: Record<SeatStatus, string> = {
  available: '',
  occupied: '✕',
  selected: '✓',
};

/**
 * A cabin seat map — a grid of pressable seats. Each seat announces its label
 * and status via `accessibilityLabel`/`accessibilityState` and carries a glyph
 * (`✓` selected, `✕` occupied), so state never depends on color alone.
 * Occupied seats are disabled and never fire `onSelect`. Selection is
 * controlled via `selectedIds`. Token-only colors.
 */
export function SeatPicker({
  rows,
  selectedIds = [],
  rowLabels,
  onSelect,
  maxSelectable,
  style,
}: SeatPickerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const selected = React.useMemo(() => new Set(selectedIds), [selectedIds]);

  const statusOf = (seat: Seat): SeatStatus => {
    if (seat.occupied) return 'occupied';
    return selected.has(seat.id) ? 'selected' : 'available';
  };

  return (
    <View
      accessibilityRole="none"
      style={[{ gap: tokens.spacing.sm, alignSelf: 'flex-start' }, style]}
    >
      {rows.map((seats, r) => {
        const rowLabel = rowLabels && r < rowLabels.length ? rowLabels[r] : String(r + 1);
        return (
          <View key={`row-${r}`} style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Text
              style={{ width: 20, textAlign: 'center', color: colors.muted, fontSize: tokens.typography.scale.xs }}
            >
              {rowLabel}
            </Text>
            {seats.map((seat, c) => {
              const status = statusOf(seat);
              const [bg, fg, bd] = STATUS_SLOTS[status];
              const label = seat.label ?? seat.id;
              const disabled = status === 'occupied';
              const glyph = STATUS_GLYPH[status];
              return (
                <Pressable
                  key={seat.id || `seat-${r}-${c}`}
                  accessibilityRole="button"
                  accessibilityLabel={`Seat ${label}, ${status === 'selected' ? 'selected' : status}`}
                  accessibilityState={{ selected: status === 'selected', disabled }}
                  disabled={disabled}
                  onPress={disabled ? undefined : () => onSelect?.(seat)}
                  style={({ pressed }) => ({
                    width: 36,
                    height: 36,
                    borderRadius: tokens.radius.sm,
                    borderWidth: 1,
                    borderColor: colors[bd],
                    backgroundColor: colors[bg],
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: disabled ? 0.6 : pressed ? 0.85 : 1,
                  })}
                >
                  <Text style={{ color: colors[fg], fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                    {glyph || label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        );
      })}
      {typeof maxSelectable === 'number' ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {`Selected ${selected.size} of ${maxSelectable}`}
        </Text>
      ) : null}
    </View>
  );
}
