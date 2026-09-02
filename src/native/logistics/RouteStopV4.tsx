import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives';
import { STOP_META, toneColor } from './internal';
import type { RouteStopProps } from './RouteStop';

/** V4 layout choices for the "dispatch" design. */
export type RouteStopLayout = 'full' | 'compact';

/** Drop-in for {@link RouteStopProps} — same props, the V4 "dispatch" design. */
export interface RouteStopV4Props extends RouteStopProps {
  /** V4 layout: `full` (card with a numbered marker, default) or `compact` (dense single row). */
  variant?: RouteStopLayout;
}

/**
 * RouteStop — **V4** "dispatch" design (native twin of the web V4). The
 * confident, operations-desk take on a delivery-route stop: an elevated rounded
 * card with a soft shadow, a numbered sequence marker (filled with the status
 * tone once completed), the address + recipient, an ETA/window, a package count,
 * and a labelled glyph + word status badge (never color alone). Tappable when
 * `onPress` is set. Honors the V4 `variant` — `full` (card, default) and
 * `compact` (a dense single row). Token-only colors via `useXenitionTheme()`.
 */
export function RouteStopV4({
  sequence,
  address,
  recipient,
  status,
  eta,
  packages,
  variant = 'full',
  onPress,
  testID,
  style,
}: RouteStopV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STOP_META[status] ?? STOP_META.pending;
  const accent = toneColor(colors, meta.tone);
  const done = status === 'completed';
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
  const a11y = `Stop ${sequence}, ${address}, ${meta.label}`;
  const compact = variant === 'compact';

  const marker = (size: number) => (
    <View style={{ width: size, height: size, borderRadius: tokens.radius.full, alignItems: 'center', justifyContent: 'center', backgroundColor: done ? accent : 'transparent', borderWidth: done ? 0 : 2, borderColor: accent }}>
      <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xs, fontWeight: '700', color: done ? colors.surface : accent, fontVariant: ['tabular-nums'] }}>
        {done ? '✓' : sequence}
      </Text>
    </View>
  );

  const badge = (
    <Badge tone={meta.tone} variant="soft" size="sm">
      {`${meta.glyph} ${meta.label}`}
    </Badge>
  );

  const content = compact ? (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
      {marker(24)}
      <Text numberOfLines={1} style={{ flex: 1, fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onSurface }}>{address}</Text>
      {eta ? <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.muted, fontVariant: ['tabular-nums'] }}>{eta}</Text> : null}
      {badge}
    </View>
  ) : (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
      {marker(36)}
      <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
          <Text numberOfLines={1} style={{ flex: 1, fontSize: tokens.typography.scale.base, fontWeight: '600', color: colors.onSurface }}>{address}</Text>
          {eta ? <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.muted, fontVariant: ['tabular-nums'] }}>{eta}</Text> : null}
        </View>
        {recipient ? <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>{recipient}</Text> : null}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, marginTop: 2 }}>
          {badge}
          {packages != null ? <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>{`${packages} pkg`}</Text> : null}
        </View>
      </View>
    </View>
  );

  const layout: ViewStyle = compact
    ? { minHeight: 44, paddingVertical: tokens.spacing.sm, paddingHorizontal: tokens.spacing.md }
    : { padding: tokens.spacing.md };

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={a11y} onPress={onPress} testID={testID} style={({ pressed }) => [shell, layout, { opacity: pressed ? 0.8 : 1 }, style]}>
        {content}
      </Pressable>
    );
  }
  return <View testID={testID} style={[shell, layout, style]}>{content}</View>;
}
