import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Badge, formatMoney } from '../primitives';

/** Sale state of a comparable ("comp"). */
export type ComparableStatus = 'active' | 'pending' | 'sold';

export interface ComparableRowProps {
  /** Comp address / headline. */
  address: string;
  /** Sale or list price in integer minor units (cents). */
  priceCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Interior area in square feet; drives the $/sqft figure. */
  sqft?: number;
  /** Bedroom count. */
  beds?: number;
  /** Bathroom count. */
  baths?: number;
  /** Distance label (e.g. "0.3 mi"). */
  distance?: string;
  /** Sale/list state chip. */
  status?: ComparableStatus;
  /** Fires when the row is pressed. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const STATUS_TONE = { active: 'success', pending: 'warn', sold: 'neutral' } as const;

/**
 * A comparable-sale ("comp") row for a valuation table — address, price, the
 * beds/baths/sqft facts, a derived $/sqft figure, distance, and a status chip.
 * The $/sqft is guarded against a missing or zero `sqft`. Data + `onPress`
 * only; nothing fetches. Reuses `Badge` and the shared `formatMoney`; token-only
 * colors and an a11y summary.
 */
export function ComparableRow({
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
}: ComparableRowProps): React.ReactElement {
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
          backgroundColor: colors.surface,
          paddingVertical: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.lg,
        },
        style,
      ]}
    >
      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Text
            numberOfLines={1}
            style={{ flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
          >
            {address}
          </Text>
          {status ? <Badge tone={STATUS_TONE[status]}>{status}</Badge> : null}
        </View>
        {facts.length > 0 || distance ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {[facts.join(' · '), distance].filter(Boolean).join(' · ')}
          </Text>
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
