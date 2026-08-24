import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Icon, Badge, type BadgeTone } from '../primitives';
import { withAlpha } from './internal/format';

/** Asset condition — text + glyph + color (never color-alone). */
export type EquipmentStatus = 'operational' | 'maintenance' | 'down' | 'retired';

interface StatusDescriptor {
  label: string;
  glyph: string;
  tone: BadgeTone;
  /** Semantic slot used for the tinted disc + icon; `neutral` maps to `muted`. */
  slot: 'success' | 'warn' | 'danger' | 'muted';
}

const EQUIPMENT_STATUS: Record<EquipmentStatus, StatusDescriptor> = {
  operational: { label: 'Operational', glyph: '✓', tone: 'success', slot: 'success' },
  maintenance: { label: 'Maintenance', glyph: '⚙', tone: 'warn', slot: 'warn' },
  down: { label: 'Down', glyph: '✕', tone: 'danger', slot: 'danger' },
  retired: { label: 'Retired', glyph: '⏻', tone: 'neutral', slot: 'muted' },
};

export interface EquipmentRowProps {
  /** Equipment / asset name (e.g. "Bobcat S650"). */
  name: string;
  /** Asset tag / serial (e.g. "AST-3391"). */
  assetTag: string;
  /** Operating condition — text + glyph + color. */
  status: EquipmentStatus;
  /** Leading glyph for the asset disc (emoji or symbol). */
  glyph?: string;
  /** Localized next-service date, shown as a meta line. */
  nextService?: string;
  /** Current site / location, shown as a meta line. */
  location?: string;
  /** Fires on row press (e.g. open the asset detail). */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * One line in an equipment / asset register: a tinted status glyph disc, a
 * name/tag stack, meta (location, next service), and a status pill. The status
 * is conveyed redundantly (glyph + label + a color that traces to a
 * `SemanticColors` slot: operational → success, down → danger) so it is never
 * color-alone. Becomes a button only when `onPress` is supplied. No literals.
 */
export function EquipmentRow({
  name,
  assetTag,
  status,
  glyph = '🚜',
  nextService,
  location,
  onPress,
  style,
}: EquipmentRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sd = EQUIPMENT_STATUS[status] ?? EQUIPMENT_STATUS.operational;
  const tint = sd.slot === 'muted' ? colors.muted : colors[sd.slot];
  const meta = [location, nextService != null ? `Service ${nextService}` : null]
    .filter((v): v is string => v != null)
    .join(' · ');

  const row = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: tokens.radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(tint, 0.14),
        }}
      >
        <Icon glyph={glyph} accessibilityLabel="Equipment" />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
        >
          {name}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{assetTag}</Text>
          {meta !== '' ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>· {meta}</Text>
          ) : null}
        </View>
      </View>
      <Badge tone={sd.tone} variant="soft" size="sm">{`${sd.glyph} ${sd.label}`}</Badge>
    </View>
  );

  if (!onPress) return row;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${assetTag}, ${sd.label}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
    >
      {row}
    </Pressable>
  );
}
