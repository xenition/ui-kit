import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { formatMoney } from './internal/format';
import type { CoverageItemProps } from './CoverageItem';

/** Drop-in replacement for {@link CoverageItem} — identical props, distinct design. */
export type CoverageItemV3Props = CoverageItemProps;

/**
 * CoverageItem, alternate design **V3** — a compact list line. A bare leading
 * glyph (✓ included / ✕ excluded, colored by the success/muted slot but always
 * paired with the glyph and, for excluded, a struck label — never color-alone)
 * runs into the label and, on the right, the limit or an em-dash. No disc, no
 * card; the tightest possible benefits line. Same `CoverageItemProps` (integer
 * cents via `formatMoney`); drops in for `CoverageItem`. Token-pure.
 */
export function CoverageItemV3({
  label,
  included = true,
  limitCents,
  detail,
  currency = 'USD',
  formatMoney: format = formatMoney,
  style,
}: CoverageItemV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const markColor = included ? colors.successText : colors.muted;
  const limit = included && limitCents != null ? format(Math.max(0, Math.trunc(limitCents)), currency) : '—';

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.xs,
        },
        style,
      ]}
    >
      <Text
        accessibilityLabel={included ? 'Included' : 'Not included'}
        style={{ color: markColor, fontSize: tokens.typography.scale.sm, fontWeight: '700', width: 16, textAlign: 'center' }}
      >
        {included ? '✓' : '✕'}
      </Text>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
        <Text
          numberOfLines={1}
          style={{
            flexShrink: 1,
            color: included ? colors.onSurface : colors.muted,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '500',
            textDecorationLine: included ? 'none' : 'line-through',
          }}
        >
          {label}
        </Text>
        {detail != null ? (
          <Text numberOfLines={1} style={{ flexShrink: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {detail}
          </Text>
        ) : null}
      </View>
      <Text style={{ color: included ? colors.onSurface : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
        {limit}
      </Text>
    </View>
  );
}
