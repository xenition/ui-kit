import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon } from '../primitives';
import { formatMoney, type MoneyFormatter, withAlpha } from './internal/format';

export interface CoverageItemProps {
  /** Coverage name (e.g. "Collision", "Water damage"). */
  label: string;
  /** Whether this coverage is included in the policy (default `true`). */
  included?: boolean;
  /** Coverage limit / benefit in integer **cents** (omit for "no limit"). */
  limitCents?: number;
  /** Supporting detail line (e.g. "Up to actual cash value"). */
  detail?: string;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  style?: StyleProp<ViewStyle>;
}

/**
 * One coverage line in a benefits breakdown: an included/excluded marker
 * (glyph + color, never color alone), the coverage label with optional detail,
 * and a right-aligned limit. Included reads `success`, excluded reads `muted` —
 * both slots trace to `SemanticColors`. Limit is integer cents via
 * `formatMoney`; when omitted the line shows "—" rather than a fabricated value.
 */
export function CoverageItem({
  label,
  included = true,
  limitCents,
  detail,
  currency = 'USD',
  formatMoney: format = formatMoney,
  style,
}: CoverageItemProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const markColor = included ? colors.success : colors.muted;
  const glyph = included ? '✓' : '✕';

  return (
    <View
      style={[
        { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, paddingVertical: tokens.spacing.sm },
        style,
      ]}
    >
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(markColor, 0.14),
        }}
      >
        <Icon glyph={glyph} size="sm" accessibilityLabel={included ? 'Included' : 'Not included'} />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{
            color: included ? colors.onSurface : colors.muted,
            fontSize: tokens.typography.scale.base,
            fontWeight: '600',
            textDecorationLine: included ? 'none' : 'line-through',
          }}
        >
          {label}
        </Text>
        {detail != null ? (
          <Text numberOfLines={2} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {detail}
          </Text>
        ) : null}
      </View>
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
        {included && limitCents != null ? format(Math.max(0, Math.trunc(limitCents)), currency) : '—'}
      </Text>
    </View>
  );
}
