import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { clampPct } from './internal';
import type { WarehouseBinProps, BinState } from './WarehouseBin';

/** Drop-in for {@link WarehouseBinProps} — same props, the V4 "dispatch" design. */
export type WarehouseBinV4Props = WarehouseBinProps;

const BIN_META: Record<BinState, { glyph: string; label: string; slot: 'muted' | 'primary' | 'success' | 'accent' | 'danger' }> = {
  empty: { glyph: '▫', label: 'Empty', slot: 'muted' },
  partial: { glyph: '▤', label: 'Partial', slot: 'primary' },
  full: { glyph: '■', label: 'Full', slot: 'success' },
  reserved: { glyph: '⏳', label: 'Reserved', slot: 'accent' },
  blocked: { glyph: '⛔', label: 'Blocked', slot: 'danger' },
};

/**
 * WarehouseBin — **V4** "dispatch" design (native twin of the web V4). The
 * confident, operations-desk take on a storage-location tile: an elevated
 * rounded card with a soft shadow, the bin code + zone, a big legible
 * **tabular-nums** fill percentage, a token fill bar sized to `fill`, an item
 * count, and an occupancy chip carried by a glyph + word (never color alone).
 * Exposes a `progressbar` role with `accessibilityValue` so fullness is
 * announced, not color-inferred. Tappable when `onPress` is set. Token-only
 * colors via `useXenitionTheme()`.
 */
export function WarehouseBinV4({
  code,
  zone,
  fill,
  itemCount,
  state = 'partial',
  selected = false,
  onPress,
  testID,
  style,
}: WarehouseBinV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = BIN_META[state] ?? BIN_META.partial;
  const accent = colors[meta.slot];
  const pct = clampPct(fill);
  const shell: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: selected ? colors.primary : colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.md,
    gap: tokens.spacing.sm,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  const body = (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.xs }}>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.base, fontWeight: '700', color: colors.onSurface }}>{code}</Text>
          {zone ? <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>{zone}</Text> : null}
        </View>
        <Text style={{ fontSize: tokens.typography.scale.xl, fontWeight: '700', color: accent, fontVariant: ['tabular-nums'] }}>{pct}%</Text>
      </View>

      <View style={{ height: 8, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[100], overflow: 'hidden' }}>
        <View style={{ width: `${pct}%`, height: '100%', borderRadius: tokens.radius.full, backgroundColor: accent }} />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs, borderRadius: tokens.radius.full, backgroundColor: withAlpha(colors.primary, 0.1) }}>
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xs, color: accent }}>{meta.glyph}</Text>
          <Text style={{ fontSize: tokens.typography.scale.xs, fontWeight: '700', color: accent }}>{meta.label}</Text>
        </View>
        {itemCount != null ? (
          <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.muted, fontVariant: ['tabular-nums'] }}>{`${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}</Text>
        ) : null}
      </View>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Bin ${code}, ${meta.label}, ${pct}% full`}
        accessibilityValue={{ min: 0, max: 100, now: pct }}
        accessibilityState={{ selected }}
        onPress={onPress}
        testID={testID}
        style={({ pressed }) => [shell, { opacity: pressed ? 0.9 : 1 }, style]}
      >
        {body}
      </Pressable>
    );
  }
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={`Bin ${code}, ${meta.label}, ${pct}% full`}
      accessibilityValue={{ min: 0, max: 100, now: pct }}
      accessibilityState={{ selected }}
      testID={testID}
      style={[shell, style]}
    >
      {body}
    </View>
  );
}
