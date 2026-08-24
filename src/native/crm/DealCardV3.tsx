import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { formatMoney } from '../commerce/money';
import type { DealCardProps } from './DealCard';

/** V3 accepts the exact same props as {@link DealCard} — a drop-in replacement. */
export type DealCardV3Props = DealCardProps;

/**
 * DealCard **design V3** — a *minimal single line*: a small stage/outcome dot,
 * the deal name + account stacked, and the value pushed hard to the right.
 * No card chrome, no meter — a scannable roster row for long deal lists. Same
 * props as {@link DealCard}, same integer-cents money. The dot is reinforced by
 * an outcome word for screen readers, so meaning never rests on color alone.
 * Token-pure; won reads `successText`, lost `dangerText`.
 */
export function DealCardV3({
  name,
  company,
  valueCents,
  currency = 'USD',
  stage,
  probability,
  outcome = 'open',
  loading = false,
  onPress,
  testID,
  style,
}: DealCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const dotColor =
    outcome === 'won' ? colors.success : outcome === 'lost' ? colors.danger : outcome === 'pending' ? colors.warn : colors.primary;
  const valueColor = outcome === 'won' ? colors.successText : outcome === 'lost' ? colors.dangerText : colors.onSurface;
  const outcomeWord = outcome === 'won' ? 'Won' : outcome === 'lost' ? 'Lost' : outcome === 'pending' ? 'Pending' : 'Open';

  const row: React.ReactElement = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.xs,
        },
        style,
      ]}
    >
      {loading ? (
        <View accessibilityLabel="Loading deal" style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <View style={{ width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: colors.border }} />
          <View style={{ flex: 1, height: tokens.typography.scale.sm, borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          <View style={{ width: 64, height: tokens.typography.scale.sm, borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        </View>
      ) : (
        <>
          <View
            accessibilityRole="image"
            accessibilityLabel={`${outcomeWord}`}
            style={{ width: 10, height: 10, borderRadius: tokens.radius.full, backgroundColor: dotColor }}
          />
          <View style={{ flex: 1, gap: 1 }}>
            <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
              {name}
            </Text>
            {company || stage ? (
              <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                {[company, stage].filter(Boolean).join(' · ')}
              </Text>
            ) : null}
          </View>
          <View style={{ alignItems: 'flex-end', gap: 1 }}>
            <Text style={{ color: valueColor, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
              {formatMoney(valueCents, currency)}
            </Text>
            {probability != null ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{`${Math.round(probability)}%`}</Text>
            ) : null}
          </View>
        </>
      )}
    </View>
  );

  if (onPress && !loading) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Deal ${name}${company ? `, ${company}` : ''}`}
        onPress={onPress}
        testID={testID}
      >
        {row}
      </Pressable>
    );
  }
  return <View testID={testID}>{row}</View>;
}
