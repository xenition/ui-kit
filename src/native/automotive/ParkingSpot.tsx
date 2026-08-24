import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Badge } from '../primitives';
import type { SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';

/** Availability state of a parking spot. */
export type ParkingStatus = 'available' | 'occupied' | 'reserved' | 'disabled';
/** Presentation for a {@link ParkingSpot}. */
export type ParkingSpotVariant = 'tile' | 'row';

/** Status → tone + spelled-out word + glyph (never color alone). */
const STATUS: Record<ParkingStatus, { tone: keyof SemanticColors; word: string; glyph: string }> = {
  available: { tone: 'success', word: 'Available', glyph: 'P' },
  occupied: { tone: 'danger', word: 'Occupied', glyph: '✕' },
  reserved: { tone: 'warn', word: 'Reserved', glyph: '★' },
  disabled: { tone: 'muted', word: 'Out of service', glyph: '—' },
};

export interface ParkingSpotProps {
  /** Spot identifier, e.g. `'B-12'`. */
  spotId: string;
  /** Level / zone label, e.g. `'Level 2'`. */
  level?: string;
  /** Availability status. */
  status?: ParkingStatus;
  /** Price per hour in integer minor units (cents). */
  priceCentsPerHour?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Distance to the spot, pre-formatted (e.g. `'80 m'`). */
  distanceLabel?: string;
  /** Marks EV-charging capable. */
  evCharging?: boolean;
  /** Presentation variant. */
  variant?: ParkingSpotVariant;
  /** Fires when the spot is pressed (disabled for non-available spots). */
  onSelect?: () => void;
  style?: StyleProp<ViewStyle>;
}

function formatMoney(cents: number, currency: string): string {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(cents / 100);
  } catch {
    return `$${(cents / 100).toFixed(2)}`;
  }
}

/**
 * A single parking spot — its id, level, availability status, hourly price, and
 * an optional EV-charging marker. The status carries a glyph plus a spelled-out
 * word and an a11y label, so meaning never rests on color; only `available`
 * spots are selectable and non-selectable spots expose a disabled a11y state.
 * Data + `onSelect` only; nothing fetches. Colors come from semantic tokens and
 * `withAlpha` tints — no literal colors. `variant="row"` renders a list line.
 */
export function ParkingSpot({
  spotId,
  level,
  status = 'available',
  priceCentsPerHour,
  currency = 'USD',
  distanceLabel,
  evCharging = false,
  variant = 'tile',
  onSelect,
  style,
}: ParkingSpotProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const s = STATUS[status] ?? STATUS.available;
  const selectable = status === 'available' && Boolean(onSelect);
  const row = variant === 'row';

  const a11y = `Spot ${spotId}${level ? `, ${level}` : ''}, ${s.word}${
    typeof priceCentsPerHour === 'number' ? `, ${formatMoney(priceCentsPerHour, currency)} per hour` : ''
  }${evCharging ? ', EV charging' : ''}`;

  const badge = (
    <View
      style={{
        width: row ? 40 : 44,
        height: row ? 40 : 44,
        borderRadius: tokens.radius.md,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: withAlpha(colors[s.tone], 0.16),
        borderWidth: 1,
        borderColor: withAlpha(colors[s.tone], 0.4),
      }}
    >
      <Text style={{ color: colors[s.tone], fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>{s.glyph}</Text>
    </View>
  );

  const body = (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.sm,
      }}
    >
      {badge}
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{spotId}</Text>
          {evCharging ? (
            <Badge tone="primary" variant="soft" size="sm">⚡ EV</Badge>
          ) : null}
        </View>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {[level, s.word, distanceLabel].filter(Boolean).join(' · ')}
        </Text>
      </View>
      {typeof priceCentsPerHour === 'number' ? (
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {formatMoney(priceCentsPerHour, currency)}
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>/ hr</Text>
        </View>
      ) : null}
    </View>
  );

  const containerStyle: ViewStyle = {
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    borderColor: selectable ? withAlpha(colors.success, 0.5) : colors.border,
    backgroundColor: colors.surface,
    padding: tokens.spacing.md,
  };

  if (!onSelect) {
    return (
      <View accessible accessibilityLabel={a11y} style={[containerStyle, style]}>
        {body}
      </View>
    );
  }

  return (
    <Pressable
      accessible
      accessibilityRole="button"
      accessibilityLabel={a11y}
      accessibilityState={{ disabled: !selectable }}
      disabled={!selectable}
      onPress={selectable ? onSelect : undefined}
      style={({ pressed }) => [containerStyle, style, { opacity: !selectable ? 0.6 : pressed ? 0.9 : 1 }]}
    >
      {body}
    </Pressable>
  );
}
