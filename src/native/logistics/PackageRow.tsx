import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives';
import { SHIPMENT_META, formatWeight, type ShipmentStatus } from './internal';

export interface PackageRowProps {
  /** Package / parcel id (headline). */
  packageId: string;
  /** Human contents description or SKU. */
  contents?: string;
  /** Weight amount in the given `weightUnit`. */
  weight?: number;
  /** Weight unit (default `kg`). */
  weightUnit?: 'kg' | 'lb' | 'g' | 'oz';
  /** Dimensions string (e.g. `30×20×15 cm`). */
  dimensions?: string;
  /** Lifecycle status — glyph + word badge, never color alone. */
  status?: ShipmentStatus;
  /** Selection state (adds a leading accent border). */
  selected?: boolean;
  /** Makes the row tappable. */
  onPress?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Dense list row for a single package: id headline, contents/SKU sub-line, a
 * weight + dimensions metric column, and an optional glyph + word status badge.
 * Tappable when `onPress` is given (button role + descriptive label). Selection
 * is shown by a primary border, not by color alone (the status still carries a
 * word). All colors are theme tokens.
 */
export function PackageRow({
  packageId,
  contents,
  weight,
  weightUnit = 'kg',
  dimensions,
  status,
  selected = false,
  onPress,
  testID,
  style,
}: PackageRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = status ? SHIPMENT_META[status] : undefined;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Package ${packageId}${meta ? `, ${meta.label}` : ''}`}
      accessibilityState={{ selected }}
      disabled={!onPress}
      onPress={onPress}
      testID={testID}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: selected ? colors.primary : colors.border,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: tokens.radius.sm,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: tokens.ramps.neutral[100],
        }}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base, color: colors.muted }}>
          📦
        </Text>
      </View>

      <View style={{ flex: 1, minWidth: 0, gap: 1 }}>
        <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onSurface }}>
          {packageId}
        </Text>
        {contents ? (
          <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>
            {contents}
          </Text>
        ) : null}
        {weight != null || dimensions ? (
          <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>
            {[weight != null ? formatWeight(weight, weightUnit) : null, dimensions]
              .filter(Boolean)
              .join(' · ')}
          </Text>
        ) : null}
      </View>

      {meta ? (
        <Badge tone={meta.tone} variant="soft" size="sm">
          {`${meta.glyph} ${meta.label}`}
        </Badge>
      ) : null}
    </Pressable>
  );
}
