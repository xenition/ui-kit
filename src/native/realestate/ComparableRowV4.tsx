import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, Badge, formatMoney } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { ComparableRowProps } from './ComparableRow';

/** Drop-in for {@link ComparableRowProps} — same props, the V4 "listing" design. */
export type ComparableRowV4Props = ComparableRowProps;

const STATUS_TONE = { active: 'success', pending: 'warn', sold: 'neutral' } as const;

/**
 * ComparableRow — **V4** "listing" design. The image-forward, editorial take on a
 * comparable-sale ("comp") row: a small rounded thumbnail, the address, the
 * price-forward sold figure, beds/baths/sqft facts as soft-primary chips, and a
 * derived $/sqft indicator. The row itself stays clean surface (no gradient).
 * The $/sqft is guarded against a missing or zero `sqft`. Same props/behavior as
 * {@link ComparableRowProps}. Token-only colors via `useXenitionTheme()`.
 */
export function ComparableRowV4({
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
}: ComparableRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const perSqft = typeof sqft === 'number' && sqft > 0 ? Math.round(priceCents / sqft) : null;
  const facts: string[] = [];
  if (typeof beds === 'number') facts.push(`${beds} bd`);
  if (typeof baths === 'number') facts.push(`${baths} ba`);
  if (typeof sqft === 'number') facts.push(`${sqft.toLocaleString()} sqft`);

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
          paddingVertical: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.lg,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        },
        style,
      ]}
    >
      {/* Small rounded thumbnail placeholder — image-forward even for a comp. */}
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: tokens.radius.md,
          backgroundColor: withAlpha(colors.primary, 0.1),
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: tokens.typography.scale.base }}>🏠</Text>
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Text
            numberOfLines={1}
            style={{ flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}
          >
            {address}
          </Text>
          {status ? (
            <Badge tone={STATUS_TONE[status]} variant="soft">
              {status}
            </Badge>
          ) : null}
        </View>
        {facts.length > 0 || distance ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.xs, marginTop: 2 }}>
            {facts.map((f) => (
              <View
                key={f}
                style={{
                  paddingHorizontal: tokens.spacing.sm,
                  paddingVertical: 2,
                  borderRadius: tokens.radius.full,
                  backgroundColor: withAlpha(colors.primary, 0.1),
                }}
              >
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{f}</Text>
              </View>
            ))}
            {distance ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{distance}</Text>
            ) : null}
          </View>
        ) : null}
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
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
