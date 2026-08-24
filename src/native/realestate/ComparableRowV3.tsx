import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, formatMoney } from '../primitives';
import type { ComparableRowProps, ComparableStatus } from './ComparableRow';

/** Drop-in alternate of {@link ComparableRowProps} — identical prop contract. */
export type ComparableRowV3Props = ComparableRowProps;

const STATUS_COLOR: Record<ComparableStatus, 'success' | 'warn' | 'muted'> = {
  active: 'success',
  pending: 'warn',
  sold: 'muted',
};

/**
 * ComparableRow — design variant **V3**: an **ultra-compact leaderboard line**.
 * Where V1 is a bordered card row, V3 is borderless with a leading status dot,
 * the address in the middle, and price + $/sq ft stacked tight on the right —
 * built to stack many comps with hairline separation. Same props as
 * {@link ComparableRowProps}; the $/sq ft figure is guarded against a
 * missing/zero `sqft`. Token-only: the status dot reads a semantic color slot.
 */
export function ComparableRowV3({
  address,
  priceCents,
  currency = 'USD',
  sqft,
  beds,
  baths,
  distance,
  status,
  onPress,
  style,
}: ComparableRowV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const perSqft = typeof sqft === 'number' && sqft > 0 ? Math.round(priceCents / sqft) : null;
  const facts: string[] = [];
  if (typeof beds === 'number') facts.push(`${beds} bd`);
  if (typeof baths === 'number') facts.push(`${baths} ba`);
  if (typeof sqft === 'number') facts.push(`${sqft.toLocaleString()} sqft`);
  const sub = [facts.join(' · '), distance].filter(Boolean).join(' · ');

  const dotColor = status ? colors[STATUS_COLOR[status]] : colors.border;

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          backgroundColor: 'transparent',
          borderWidth: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.xs,
        },
        style,
      ]}
    >
      <View style={{ width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: dotColor }} />
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {address}
        </Text>
        {sub ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {sub}
          </Text>
        ) : null}
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {formatMoney(priceCents, currency)}
        </Text>
        {perSqft != null ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {`${formatMoney(perSqft, currency)}/sqft`}
          </Text>
        ) : null}
      </View>
    </View>
  );

  if (!onPress) return body;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${address}, ${formatMoney(priceCents, currency)}${facts.length ? `, ${facts.join(', ')}` : ''}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {body}
    </Pressable>
  );
}
