import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import { withAlpha } from '../primitives/internal/color';
import type { EquipmentRowProps, EquipmentStatus } from './EquipmentRow';

/** Drop-in for {@link EquipmentRowProps} — same props, the V4 "studio" design. */
export type EquipmentRowV4Props = EquipmentRowProps;

const STATUS: Record<EquipmentStatus, { label: string; tone: BadgeTone; glyph: string }> = {
  available: { label: 'Available', tone: 'success', glyph: '✅' },
  'in-use': { label: 'In use', tone: 'warn', glyph: '🎬' },
  maintenance: { label: 'Maintenance', tone: 'primary', glyph: '🛠' },
  unavailable: { label: 'Unavailable', tone: 'danger', glyph: '⛔' },
};

/**
 * EquipmentRow — **V4** "studio" design (native parity of the web V4). The matted
 * take on a gear-inventory row: an elevated clean-surface row whose leading
 * `glyph` (default 📷) floats inside a thin neutral **mat**, a bold gear name, a
 * muted `category` line, the `meta` (qty / serial) as a small soft-primary chip,
 * and a trailing availability `Badge` carrying glyph + token tone + label (never
 * color alone). Identical props/behavior to {@link EquipmentRowProps}; optional
 * `onPress` exposes the row as a `button`. Token-only colors via
 * `useXenitionTheme()`.
 */
export function EquipmentRowV4({
  name,
  category,
  glyph = '📷',
  status = 'available',
  meta,
  onPress,
  style,
}: EquipmentRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const s = STATUS[status];

  const rowStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.md,
      padding: tokens.spacing.md,
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      shadowColor: colors.onSurface,
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
    },
    style,
  ];

  const inner = (
    <>
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: tokens.radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: tokens.ramps.neutral[100],
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Icon glyph={glyph} size="lg" color="onSurface" />
      </View>
      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
        >
          {name}
        </Text>
        {category || meta ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.sm }}>
            {category ? (
              <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                {category}
              </Text>
            ) : null}
            {meta ? (
              <View
                style={{
                  paddingHorizontal: tokens.spacing.sm,
                  paddingVertical: 2,
                  borderRadius: tokens.radius.full,
                  backgroundColor: withAlpha(colors.primary, 0.1),
                }}
              >
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                  {meta}
                </Text>
              </View>
            ) : null}
          </View>
        ) : null}
      </View>
      <Badge tone={s.tone} variant="soft" size="sm">
        {`${s.glyph} ${s.label}`}
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
