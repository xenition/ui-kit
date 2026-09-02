import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { SCAN_META } from './internal';
import type { ScanRowProps } from './ScanRow';

/** V4 layout choices for the "dispatch" design. */
export type ScanRowLayout = 'full' | 'compact';

/** Drop-in for {@link ScanRowProps} — same props, the V4 "dispatch" design. */
export interface ScanRowV4Props extends ScanRowProps {
  /** V4 layout: `full` (default) or `compact` (denser single line). */
  variant?: ScanRowLayout;
}

/**
 * ScanRow — **V4** "dispatch" design (native twin of the web V4). The confident,
 * operations-desk take on a scan event: an elevated rounded row with a soft
 * shadow, a decorative token-bar "barcode" placeholder (no scan dependency,
 * hidden from a11y), the code headline, a labelled glyph + word scan kind (never
 * color alone), a location line, and the time / operator at the trailing edge.
 * Tappable when `onPress` is set. Honors the V4 `variant` — `full` (default) and
 * `compact` (a denser single line). Token-only colors via `useXenitionTheme()`.
 */
export function ScanRowV4({
  code,
  kind,
  location,
  time,
  operator,
  variant = 'full',
  onPress,
  testID,
  style,
}: ScanRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = SCAN_META[kind] ?? SCAN_META.inbound;
  const shell: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };
  const a11y = `${meta.label} scan ${code}${location ? ` at ${location}` : ''}`;
  const compact = variant === 'compact';

  const bars = React.useMemo(() => {
    const out: number[] = [];
    for (let i = 0; i < 14; i += 1) {
      const ch = code.charCodeAt(i % Math.max(code.length, 1)) || 1;
      out.push((ch % 3) + 1);
    }
    return out;
  }, [code]);

  const barcode = (w: number, h: number) => (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={{ width: w, height: h, flexDirection: 'row', alignItems: 'center', gap: 1, paddingHorizontal: 3, borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.primary, 0.1) }}
    >
      {bars.map((bw, i) => (
        <View key={i} style={{ width: bw, height: '70%', backgroundColor: colors.onSurface }} />
      ))}
    </View>
  );

  const badge = (
    <Badge tone={meta.tone} variant="soft" size="sm">
      {`${meta.glyph} ${meta.label}`}
    </Badge>
  );

  const content = compact ? (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
      {barcode(32, 24)}
      <Text numberOfLines={1} style={{ flexShrink: 1, fontSize: tokens.typography.scale.sm, fontWeight: '700', color: colors.onSurface, fontVariant: ['tabular-nums'] }}>{code}</Text>
      <View style={{ marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        {badge}
        {time ? <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.muted, fontVariant: ['tabular-nums'] }}>{time}</Text> : null}
      </View>
    </View>
  ) : (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
      {barcode(48, 36)}
      <View style={{ flex: 1, minWidth: 0, gap: 4 }}>
        <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.base, fontWeight: '700', color: colors.onSurface, fontVariant: ['tabular-nums'] }}>{code}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          {badge}
          {location ? <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>{location}</Text> : null}
        </View>
      </View>
      <View style={{ alignItems: 'flex-end', gap: 2 }}>
        {time ? <Text style={{ fontSize: tokens.typography.scale.xs, fontWeight: '600', color: colors.onSurface, fontVariant: ['tabular-nums'] }}>{time}</Text> : null}
        {operator ? <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>{operator}</Text> : null}
      </View>
    </View>
  );

  const layout: ViewStyle = compact
    ? { minHeight: 44, paddingVertical: tokens.spacing.sm, paddingHorizontal: tokens.spacing.md }
    : { minHeight: 56, paddingVertical: tokens.spacing.sm, paddingHorizontal: tokens.spacing.md };

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={a11y} onPress={onPress} testID={testID} style={({ pressed }) => [shell, layout, { opacity: pressed ? 0.8 : 1 }, style]}>
        {content}
      </Pressable>
    );
  }
  return <View testID={testID} style={[shell, layout, style]}>{content}</View>;
}
