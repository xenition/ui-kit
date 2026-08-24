import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, Badge, Statistic, formatMoney } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import { useEnter } from '../primitives/internal/motion';
import type { ComparableRowProps } from './ComparableRow';

/** Drop-in alternate of {@link ComparableRowProps} — identical prop contract. */
export type ComparableRowV2Props = ComparableRowProps;

const STATUS_TONE = { active: 'success', pending: 'warn', sold: 'neutral' } as const;
const STATUS_LABEL = { active: 'Active', pending: 'Pending', sold: 'Sold' } as const;

/**
 * ComparableRow — design variant **V2**: a **stat-forward, elevated card**.
 * Where V1 is a single bordered line (facts left, price right), V2 leads with an
 * address + status header and a metric strip of three `Statistic` cells —
 * price, $/sq ft, and size — reading as a valuation summary block rather than a
 * table row. Same props as {@link ComparableRowProps}; the $/sq ft figure is
 * still guarded against a missing/zero `sqft`. Token-only.
 */
export function ComparableRowV2({
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
}: ComparableRowV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 6 });

  const perSqft = typeof sqft === 'number' && sqft > 0 ? Math.round(priceCents / sqft) : null;
  const sizeBits: string[] = [];
  if (typeof beds === 'number') sizeBits.push(`${beds} bd`);
  if (typeof baths === 'number') sizeBits.push(`${baths} ba`);
  const sizeValue = sizeBits.join(' · ') || (typeof sqft === 'number' ? `${sqft.toLocaleString()} sqft` : '—');
  const facts: string[] = [];
  if (typeof beds === 'number') facts.push(`${beds} bd`);
  if (typeof baths === 'number') facts.push(`${baths} ba`);
  if (typeof sqft === 'number') facts.push(`${sqft.toLocaleString()} sqft`);

  const body = (
    <View
      style={[
        {
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          borderWidth: 0,
          backgroundColor: colors.surface,
          padding: tokens.spacing.lg,
          ...shadow('sm', tokens),
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Text
          numberOfLines={1}
          style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
        >
          {address}
        </Text>
        {status ? <Badge tone={STATUS_TONE[status]}>{STATUS_LABEL[status]}</Badge> : null}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.md }}>
        <Statistic label="Price" value={formatMoney(priceCents, currency)} />
        <Statistic label="$/sq ft" value={perSqft != null ? formatMoney(perSqft, currency) : '—'} />
        <Statistic label={distance ? 'Distance' : 'Size'} value={distance ?? sizeValue} />
      </View>
    </View>
  );

  if (!onPress) {
    return <Animated.View style={{ opacity: enter.opacity, transform: enter.transform }}>{body}</Animated.View>;
  }

  return (
    <Animated.View style={{ opacity: enter.opacity, transform: enter.transform }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${address}, ${formatMoney(priceCents, currency)}${facts.length ? `, ${facts.join(', ')}` : ''}`}
        onPress={onPress}
        style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}
