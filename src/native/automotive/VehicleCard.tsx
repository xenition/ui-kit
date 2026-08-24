import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Badge, type BadgeTone } from '../primitives';
import type { SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';

/** Presentation density for a {@link VehicleCard}. */
export type VehicleCardVariant = 'default' | 'compact';
/** Operational state of the vehicle. */
export type VehicleStatus = 'available' | 'in-use' | 'maintenance' | 'offline';

/** Status → semantic tone + spelled-out word (never color alone). */
const STATUS: Record<VehicleStatus, { tone: keyof SemanticColors; word: string; glyph: string }> = {
  available: { tone: 'success', word: 'Available', glyph: '●' },
  'in-use': { tone: 'primary', word: 'In use', glyph: '▶' },
  maintenance: { tone: 'warn', word: 'Maintenance', glyph: '🔧' },
  offline: { tone: 'muted', word: 'Offline', glyph: '○' },
};

export interface VehicleSpec {
  /** Spec label, e.g. `'Seats'`. */
  label: string;
  /** Spec value, e.g. `'4'`. */
  value: string;
}

export interface VehicleCardProps {
  /** Make + model, e.g. `'Tesla Model 3'`. */
  name: string;
  /** License plate. */
  plate?: string;
  /** Vehicle class, e.g. `'Sedan'` / `'SUV'`. */
  vehicleClass?: string;
  /** Color name, e.g. `'Midnight Blue'`. */
  color?: string;
  /** Year, e.g. `2023`. */
  year?: number;
  /** Operational status. */
  status?: VehicleStatus;
  /** Short spec chips (seats, range, etc.). */
  specs?: VehicleSpec[];
  /** Presentation variant. */
  variant?: VehicleCardVariant;
  /** Fires when the card is pressed. */
  onPress?: () => void;
  /** Placeholder skeleton while the vehicle loads. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A fleet vehicle summary — make/model, plate, class, color, year, an
 * operational status, and optional spec chips. The status is shown with a glyph
 * plus a spelled-out word and an a11y label, so meaning never rests on color.
 * Data + `onPress` only; nothing fetches. Colors come from semantic tokens and
 * `withAlpha` tints — no literal colors. `variant="compact"` renders a denser
 * list row. Spec indexing is guarded against a missing array.
 */
export function VehicleCard({
  name,
  plate,
  vehicleClass,
  color,
  year,
  status = 'available',
  specs,
  variant = 'default',
  onPress,
  loading = false,
  style,
}: VehicleCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const pad = compact ? tokens.spacing.md : tokens.spacing.lg;

  if (loading) {
    return (
      <View
        accessibilityLabel="Loading vehicle"
        style={[
          {
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
            padding: pad,
            gap: tokens.spacing.sm,
          },
          style,
        ]}
      >
        <View style={{ height: 18, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.muted, 0.25) }} />
        <View style={{ height: 14, width: '75%', borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.muted, 0.18) }} />
      </View>
    );
  }

  const s = STATUS[status] ?? STATUS.available;
  const subtitleParts = [year ? String(year) : null, color, vehicleClass].filter(Boolean) as string[];
  const specList = Array.isArray(specs) ? specs : [];

  const a11y = `Vehicle ${name}${plate ? `, plate ${plate}` : ''}, ${s.word}`;

  const body = (
    <View style={{ gap: compact ? tokens.spacing.sm : tokens.spacing.md }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            🚗 {name}
          </Text>
          {subtitleParts.length ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {subtitleParts.join(' · ')}
            </Text>
          ) : null}
        </View>
        <Badge tone={(s.tone === 'muted' ? 'neutral' : s.tone) as BadgeTone} variant="soft" size="sm" dot>
          {s.word}
        </Badge>
      </View>

      {plate ? (
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              borderRadius: tokens.radius.sm,
              borderWidth: 1,
              borderColor: colors.border,
              paddingVertical: 2,
              paddingHorizontal: tokens.spacing.sm,
              backgroundColor: withAlpha(colors.muted, 0.1),
            }}
          >
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '800', letterSpacing: 2 }}>
              {plate}
            </Text>
          </View>
        </View>
      ) : null}

      {specList.length && !compact ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
          {specList.map((spec, i) => (
            <View
              key={`${spec.label}-${i}`}
              style={{
                borderRadius: tokens.radius.sm,
                backgroundColor: withAlpha(colors.primary, 0.08),
                paddingVertical: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.sm,
              }}
            >
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{spec.label}</Text>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{spec.value}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );

  const containerStyle: ViewStyle = {
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: pad,
  };

  if (!onPress) {
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
      onPress={onPress}
      style={({ pressed }) => [containerStyle, style, { opacity: pressed ? 0.92 : 1 }]}
    >
      {body}
    </Pressable>
  );
}
