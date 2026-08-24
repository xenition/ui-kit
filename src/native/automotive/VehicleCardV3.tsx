import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import type { SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { VehicleCardProps, VehicleStatus } from './VehicleCard';

/** Status → semantic tone + spelled-out word + glyph (never color alone). */
const STATUS: Record<VehicleStatus, { tone: keyof SemanticColors; word: string; glyph: string }> = {
  available: { tone: 'success', word: 'Available', glyph: '●' },
  'in-use': { tone: 'primary', word: 'In use', glyph: '▶' },
  maintenance: { tone: 'warn', word: 'Maintenance', glyph: '🔧' },
  offline: { tone: 'muted', word: 'Offline', glyph: '○' },
};

/**
 * Alternate design (v3) of {@link VehicleCard} — a drop-in with the **same
 * props**. The *dense line*: a small vehicle glyph, the make/model with an
 * inline plate, and a trailing status glyph + word. Built for fleet lists. The
 * status is a glyph + spelled-out word + a11y label, so meaning never rests on
 * color. Token-pure: semantic slots + `withAlpha` tints only.
 */
export type VehicleCardV3Props = VehicleCardProps;

export function VehicleCardV3({
  name,
  plate,
  vehicleClass,
  color,
  year,
  status = 'available',
  onPress,
  loading = false,
  style,
}: VehicleCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const rowStyle = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: tokens.spacing.sm,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingVertical: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
  };

  if (loading) {
    return (
      <View accessibilityLabel="Loading vehicle" style={[rowStyle, style]}>
        <View style={{ flex: 1, height: 14, borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.muted, 0.18) }} />
      </View>
    );
  }

  const s = STATUS[status] ?? STATUS.available;
  const toneColor = (colors as unknown as Record<string, string>)[s.tone] ?? colors.muted;
  const subtitleParts = [year ? String(year) : null, color, vehicleClass].filter(Boolean) as string[];
  const a11y = `Vehicle ${name}${plate ? `, plate ${plate}` : ''}, ${s.word}`;

  const Container: React.ElementType = onPress ? Pressable : View;

  return (
    <Container
      accessible
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={a11y}
      onPress={onPress}
      style={onPress ? ({ pressed }: { pressed: boolean }) => [rowStyle, style, { opacity: pressed ? 0.92 : 1 }] : [rowStyle, style]}
    >
      <Text style={{ fontSize: tokens.typography.scale.lg }}>🚗</Text>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text numberOfLines={1} style={{ flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {name}
          </Text>
          {plate ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 1 }}>{plate}</Text>
          ) : null}
        </View>
        {subtitleParts.length ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {subtitleParts.join(' · ')}
          </Text>
        ) : null}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        <Text style={{ fontSize: tokens.typography.scale.xs, color: toneColor }}>{s.glyph}</Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{s.word}</Text>
      </View>
    </Container>
  );
}
