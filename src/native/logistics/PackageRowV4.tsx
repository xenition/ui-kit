import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { SHIPMENT_META, formatWeight } from './internal';
import type { PackageRowProps } from './PackageRow';

/** V4 layout choices for the "dispatch" design. */
export type PackageRowLayout = 'full' | 'compact';

/** Drop-in for {@link PackageRowProps} — same props, the V4 "dispatch" design. */
export interface PackageRowV4Props extends PackageRowProps {
  /** V4 layout: `full` (default) or `compact` (denser single line). */
  variant?: PackageRowLayout;
}

/**
 * PackageRow — **V4** "dispatch" design (native twin of the web V4). The
 * confident, operations-desk take on a parcel row: an elevated rounded row with
 * a soft shadow, a parcel glyph in a soft-primary well, the package-id headline,
 * a contents sub-line, a weight · dimensions metric chip, and a labelled glyph +
 * word status badge (never color alone). Selection shows a primary border;
 * tappable when `onPress` is set. Honors the V4 `variant` — `full` (default) and
 * `compact` (a denser single line). Token-only colors via `useXenitionTheme()`.
 */
export function PackageRowV4({
  packageId,
  contents,
  weight,
  weightUnit = 'kg',
  dimensions,
  status,
  selected = false,
  variant = 'full',
  onPress,
  testID,
  style,
}: PackageRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = status ? SHIPMENT_META[status] : undefined;
  const metric = [weight != null ? formatWeight(weight, weightUnit) : null, dimensions].filter(Boolean).join(' · ');
  const shell: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: selected ? colors.primary : colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };
  const a11y = `Package ${packageId}${meta ? `, ${meta.label}` : ''}`;
  const badge = meta ? (
    <Badge tone={meta.tone} variant="soft" size="sm">
      {`${meta.glyph} ${meta.label}`}
    </Badge>
  ) : null;

  const compact = variant === 'compact';
  const content = compact ? (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
      <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base }}>📦</Text>
      <Text numberOfLines={1} style={{ flexShrink: 1, fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onSurface }}>{packageId}</Text>
      {weight != null ? (
        <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.muted, fontVariant: ['tabular-nums'] }}>{formatWeight(weight, weightUnit)}</Text>
      ) : null}
      <View style={{ marginLeft: 'auto' }}>{badge}</View>
    </View>
  ) : (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
      <View style={{ width: 44, height: 44, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', backgroundColor: withAlpha(colors.primary, 0.1) }}>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>📦</Text>
      </View>
      <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
        <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.base, fontWeight: '600', color: colors.onSurface }}>{packageId}</Text>
        {contents ? <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>{contents}</Text> : null}
        {metric ? (
          <View style={{ alignSelf: 'flex-start', backgroundColor: withAlpha(colors.primary, 0.1), borderRadius: tokens.radius.sm, paddingHorizontal: tokens.spacing.xs }}>
            <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.xs, color: colors.muted, fontVariant: ['tabular-nums'] }}>{metric}</Text>
          </View>
        ) : null}
      </View>
      {badge}
    </View>
  );

  const layout: ViewStyle = compact
    ? { minHeight: 44, paddingVertical: tokens.spacing.sm, paddingHorizontal: tokens.spacing.md }
    : { minHeight: 56, paddingVertical: tokens.spacing.sm, paddingHorizontal: tokens.spacing.md };

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={a11y} accessibilityState={{ selected }} onPress={onPress} testID={testID} style={({ pressed }) => [shell, layout, { opacity: pressed ? 0.8 : 1 }, style]}>
        {content}
      </Pressable>
    );
  }
  return <View testID={testID} style={[shell, layout, style]}>{content}</View>;
}
