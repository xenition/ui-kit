import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Badge, type BadgeTone } from '../primitives';
import type { SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import type { VehicleCardProps, VehicleStatus } from './VehicleCard';

/** Status → semantic tone + spelled-out word + glyph (never color alone). */
const STATUS: Record<VehicleStatus, { tone: keyof SemanticColors; word: string; glyph: string }> = {
  available: { tone: 'success', word: 'Available', glyph: '●' },
  'in-use': { tone: 'primary', word: 'In use', glyph: '▶' },
  maintenance: { tone: 'warn', word: 'Maintenance', glyph: '🔧' },
  offline: { tone: 'muted', word: 'Offline', glyph: '○' },
};

/**
 * Alternate design (v2) of {@link VehicleCard} — a drop-in with the **same
 * props**. Where the original leads with a text title, V2 pairs a large tinted
 * **vehicle glyph tile** with the identity block: make/model, a status chip, a
 * bold plate, then full-width spec chips. Elevated (shadow, no border). The
 * status carries a glyph + spelled-out word + a11y label, so meaning never rests
 * on color. Spec indexing is guarded. Token-pure: semantic slots + `withAlpha`.
 */
export type VehicleCardV2Props = VehicleCardProps;

export function VehicleCardV2({
  name,
  plate,
  vehicleClass,
  color,
  year,
  status = 'available',
  specs,
  onPress,
  loading = false,
  style,
}: VehicleCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const surface = {
    borderRadius: tokens.radius.lg,
    backgroundColor: colors.surface,
    padding: tokens.spacing.lg,
    gap: tokens.spacing.md,
    ...shadow('md', tokens),
  };

  if (loading) {
    return (
      <View accessibilityLabel="Loading vehicle" style={[surface, style]}>
        <View style={{ height: 72, borderRadius: tokens.radius.lg, backgroundColor: withAlpha(colors.muted, 0.18) }} />
        <View style={{ height: 14, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.muted, 0.25) }} />
      </View>
    );
  }

  const s = STATUS[status] ?? STATUS.available;
  const toneColor = (colors as unknown as Record<string, string>)[s.tone] ?? colors.muted;
  const subtitleParts = [year ? String(year) : null, color, vehicleClass].filter(Boolean) as string[];
  const specList = Array.isArray(specs) ? specs : [];
  const a11y = `Vehicle ${name}${plate ? `, plate ${plate}` : ''}, ${s.word}`;

  const body = (
    <>
      <View style={{ flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'center' }}>
        <View
          style={{
            width: 72,
            height: 72,
            borderRadius: tokens.radius.lg,
            backgroundColor: withAlpha(toneColor, 0.12),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: tokens.typography.scale['3xl'] }}>🚗</Text>
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>
            {name}
          </Text>
          {subtitleParts.length ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {subtitleParts.join(' · ')}
            </Text>
          ) : null}
          <View style={{ flexDirection: 'row', marginTop: tokens.spacing.xs }}>
            <Badge tone={(s.tone === 'muted' ? 'neutral' : s.tone) as BadgeTone} variant="soft" size="sm" dot>
              {`${s.glyph} ${s.word}`}
            </Badge>
          </View>
        </View>
      </View>

      {plate ? (
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              borderRadius: tokens.radius.sm,
              borderWidth: 1.5,
              borderColor: colors.border,
              paddingVertical: tokens.spacing.xs,
              paddingHorizontal: tokens.spacing.md,
              backgroundColor: withAlpha(colors.muted, 0.1),
            }}
          >
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800', letterSpacing: 3 }}>{plate}</Text>
          </View>
        </View>
      ) : null}

      {specList.length ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
          {specList.map((spec, i) => (
            <View
              key={`${spec.label}-${i}`}
              style={{
                borderRadius: tokens.radius.md,
                backgroundColor: withAlpha(colors.primary, 0.08),
                paddingVertical: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.sm,
                minWidth: 64,
              }}
            >
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{spec.label}</Text>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{spec.value}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </>
  );

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={a11y} style={[surface, style]}>
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
      style={({ pressed }) => [surface, style, { opacity: pressed ? 0.92 : 1 }]}
    >
      {body}
    </Pressable>
  );
}
