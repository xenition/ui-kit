import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { CarrierBadge } from './CarrierBadge';
import { SHIPMENT_META, toneColor } from './internal';
import type { ShipmentCardProps } from './ShipmentCard';

/**
 * Drop-in for {@link ShipmentCardProps} — same props, the V4 "dispatch" design.
 * Reuses the base `variant` (`default` = full card, `compact` = dense row).
 */
export type ShipmentCardV4Props = ShipmentCardProps;

/**
 * ShipmentCard — **V4** "dispatch" design (native twin of the web V4). The
 * confident, operations-desk take on a shipment: an elevated rounded card with a
 * soft shadow, the tracking-number headline, a labelled glyph + word status
 * badge (never color alone), a soft-primary meta strip carrying the
 * `CarrierBadge` + piece count, an origin→destination lane, and an ETA line.
 * Tappable when `onPress` is set. Honors the base `variant` — `default` (card)
 * and `compact` (a dense single row). Token-only colors via `useXenitionTheme()`.
 */
export function ShipmentCardV4({
  trackingNumber,
  recipient,
  origin,
  destination,
  status,
  carrier,
  service,
  eta,
  pieces,
  variant = 'default',
  loading = false,
  onPress,
  testID,
  style,
}: ShipmentCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = SHIPMENT_META[status] ?? SHIPMENT_META.draft;
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

  if (loading) {
    return (
      <View accessibilityLabel="Loading shipment" style={[shell, { padding: tokens.spacing.lg, gap: tokens.spacing.md }, style]}>
        <View style={{ height: 18, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
        <View style={{ height: 12, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
        <View style={{ height: 32, borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] }} />
      </View>
    );
  }

  const a11y = `Shipment ${trackingNumber}, ${meta.label}`;
  const badge = (
    <Badge tone={meta.tone} variant="soft" size="sm">
      {`${meta.glyph} ${meta.label}`}
    </Badge>
  );

  // ── compact: dense single row ──
  if (variant === 'compact') {
    const compact = (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <View style={{ width: 36, height: 36, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', backgroundColor: withAlpha(colors.primary, 0.1) }}>
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base }}>🚚</Text>
        </View>
        <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
          <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.sm, fontWeight: '700', color: colors.onSurface }}>{trackingNumber}</Text>
          {recipient ? <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>{recipient}</Text> : null}
        </View>
        {badge}
      </View>
    );
    if (onPress) {
      return (
        <Pressable accessibilityRole="button" accessibilityLabel={a11y} onPress={onPress} testID={testID} style={({ pressed }) => [shell, { padding: tokens.spacing.sm, opacity: pressed ? 0.9 : 1 }, style]}>
          {compact}
        </Pressable>
      );
    }
    return <View testID={testID} style={[shell, { padding: tokens.spacing.sm }, style]}>{compact}</View>;
  }

  const full = (
    <View style={{ gap: tokens.spacing.md }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.lg, fontWeight: '700', color: colors.onSurface, fontVariant: ['tabular-nums'] }}>{trackingNumber}</Text>
          {recipient ? <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>{recipient}</Text> : null}
        </View>
        {badge}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: tokens.spacing.sm, backgroundColor: withAlpha(colors.primary, 0.05), borderRadius: tokens.radius.md, paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs }}>
        <CarrierBadge carrier={carrier} service={service} size="sm" />
        {pieces != null ? (
          <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>{`${pieces} ${pieces === 1 ? 'piece' : 'pieces'}`}</Text>
        ) : null}
      </View>

      {origin || destination ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text numberOfLines={1} style={{ flex: 1, fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onSurface }}>{origin ?? '—'}</Text>
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm, color: toneColor(colors, meta.tone) }}>→</Text>
          <Text numberOfLines={1} style={{ flex: 1, textAlign: 'right', fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onSurface }}>{destination ?? '—'}</Text>
        </View>
      ) : null}

      {eta ? <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>{`ETA · ${eta}`}</Text> : null}
    </View>
  );

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={a11y} onPress={onPress} testID={testID} style={({ pressed }) => [shell, { padding: tokens.spacing.lg, opacity: pressed ? 0.9 : 1 }, style]}>
        {full}
      </Pressable>
    );
  }
  return <View testID={testID} style={[shell, { padding: tokens.spacing.lg }, style]}>{full}</View>;
}
