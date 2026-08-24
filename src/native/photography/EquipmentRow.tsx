import * as React from 'react';
import {
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';

/** Availability of a piece of gear. */
export type EquipmentStatus = 'available' | 'in-use' | 'maintenance' | 'unavailable';

const STATUS: Record<EquipmentStatus, { label: string; tone: BadgeTone }> = {
  available: { label: 'Available', tone: 'success' },
  'in-use': { label: 'In use', tone: 'warn' },
  maintenance: { label: 'Maintenance', tone: 'primary' },
  unavailable: { label: 'Unavailable', tone: 'danger' },
};

export interface EquipmentRowProps {
  /** Gear name (e.g. "Canon R5"). */
  name: string;
  /** Category label (e.g. "Camera body", "Lens"). */
  category?: string;
  /** Leading icon glyph/emoji (e.g. "📷"). */
  glyph?: string;
  /** Availability status (default `available`). */
  status?: EquipmentStatus;
  /** Quantity / serial meta line. */
  meta?: string;
  /** Press handler for the row. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A gear-inventory row — an icon slot, the item name, an optional category /
 * serial meta line, and an availability `Badge`. Status is a labelled badge
 * (never color alone). Composes `Icon` and `Badge`; optional `onPress` exposes
 * the row as a `button`. Token-only colors.
 */
export function EquipmentRow({
  name,
  category,
  glyph = '📷',
  status = 'available',
  meta,
  onPress,
  style,
}: EquipmentRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const s = STATUS[status];

  const metaBits: string[] = [];
  if (category) metaBits.push(category);
  if (meta) metaBits.push(meta);

  const rowStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    style,
  ];

  const inner = (
    <>
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: tokens.radius.sm,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: tokens.ramps.neutral[100],
        }}
      >
        <Icon glyph={glyph} size="lg" color="onSurface" />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
        >
          {name}
        </Text>
        {metaBits.length > 0 ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {metaBits.join(' · ')}
          </Text>
        ) : null}
      </View>
      <Badge tone={s.tone} variant="soft" size="sm">
        {s.label}
      </Badge>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${name}, ${s.label}`}
        onPress={onPress}
        style={({ pressed }) => [rowStyle, { opacity: pressed ? 0.9 : 1 }]}
      >
        {inner}
      </Pressable>
    );
  }

  return <View style={rowStyle}>{inner}</View>;
}
