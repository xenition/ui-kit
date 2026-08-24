import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { clampPct } from './internal';

export type BinState = 'empty' | 'partial' | 'full' | 'reserved' | 'blocked';

const BIN_META: Record<BinState, { glyph: string; label: string; slot: 'muted' | 'primary' | 'success' | 'accent' | 'danger' }> = {
  empty: { glyph: '▫', label: 'Empty', slot: 'muted' },
  partial: { glyph: '▤', label: 'Partial', slot: 'primary' },
  full: { glyph: '■', label: 'Full', slot: 'success' },
  reserved: { glyph: '⏳', label: 'Reserved', slot: 'accent' },
  blocked: { glyph: '⛔', label: 'Blocked', slot: 'danger' },
};

export interface WarehouseBinProps {
  /** Bin / location code (headline, e.g. `A-12-03`). */
  code: string;
  /** Zone / aisle sub-label. */
  zone?: string;
  /** Fill percentage 0–100 (clamped, NaN-safe) — drives the token fill bar. */
  fill?: number;
  /** Item / SKU count stored in the bin. */
  itemCount?: number;
  /** Occupancy state — glyph + word, never color alone. */
  state?: BinState;
  /** Selection highlight. */
  selected?: boolean;
  /** Makes the tile tappable (open the bin). */
  onPress?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A warehouse bin / storage-location tile: the bin code + zone, a token fill
 * bar sized to `fill`, an item count, and an occupancy chip carried by a
 * glyph + word. Exposes a `progressbar` role with `accessibilityValue` for the
 * fill so fullness is announced, not color-inferred. Tappable when `onPress` is
 * set. All colors are theme tokens.
 */
export function WarehouseBin({
  code,
  zone,
  fill,
  itemCount,
  state = 'partial',
  selected = false,
  onPress,
  testID,
  style,
}: WarehouseBinProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = BIN_META[state] ?? BIN_META.partial;
  const accent = colors[meta.slot];
  const pct = clampPct(fill);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Bin ${code}, ${meta.label}, ${pct}% full`}
      accessibilityValue={{ min: 0, max: 100, now: pct }}
      accessibilityState={{ selected }}
      disabled={!onPress}
      onPress={onPress}
      testID={testID}
      style={[
        {
          gap: tokens.spacing.xs,
          padding: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: selected ? colors.primary : colors.border,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.xs }}>
        <Text numberOfLines={1} style={{ flex: 1, fontSize: tokens.typography.scale.sm, fontWeight: '700', color: colors.onSurface }}>
          {code}
        </Text>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm, color: accent }}>
          {meta.glyph}
        </Text>
      </View>

      {zone ? (
        <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>
          {zone}
        </Text>
      ) : null}

      <View style={{ height: 6, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[100], overflow: 'hidden' }}>
        <View style={{ width: `${pct}%`, height: '100%', borderRadius: tokens.radius.full, backgroundColor: accent }} />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: tokens.typography.scale.xs, fontWeight: '600', color: accent }}>{meta.label}</Text>
        {itemCount != null ? (
          <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>
            {`${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}
