import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { Eyebrow } from '../primitives/Eyebrow';
import { OrnamentRule, type OrnamentShape } from './OrnamentRule';

export interface PriceRow {
  /** Item name (left side of the leader). */
  name: string;
  /** Price, already formatted (right side of the leader — the kit never guesses currency). */
  price: string;
  /** Supporting line under the row. */
  description?: string;
}

export interface PriceListProps {
  /** Group heading (e.g. a menu course, a service tier family). */
  heading?: string;
  /** The rows to render (mirrors the web `PriceRow` children). */
  rows: PriceRow[];
  /** Ornament drawn above the heading (default `diamond`; `none` hides the rule). */
  ornament?: OrnamentShape;
  style?: StyleProp<ViewStyle>;
}

/**
 * Editorial price group — the native mirror of the web `PriceList` + `PriceRow`.
 * The web version composes children; native takes a `rows` data array (idiomatic
 * for RN lists). Each row is `name ········ price`: the label sits left, the price
 * right, and the web dotted leader is approximated with a flex spacer carrying a
 * thin low-opacity accent bottom border (RN has no CSS dotted `color-mix` leader).
 * Reuses the native `OrnamentRule` + `Eyebrow`. Token-only.
 */
export function PriceList({
  heading,
  rows,
  ornament = 'diamond',
  style,
}: PriceListProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const leaderColor = withAlpha(tokens.ramps.accent[400], 0.4);

  return (
    <View
      testID="xen-price-list"
      style={[{ gap: tokens.spacing.lg }, style]}
    >
      {ornament !== 'none' ? <OrnamentRule ornament={ornament} tone="accent" /> : null}
      {heading !== undefined ? (
        <Eyebrow align="center" tone="accent">
          {heading}
        </Eyebrow>
      ) : null}
      <View style={{ gap: tokens.spacing.lg }}>
        {rows.map((row, i) => (
          <View key={i} testID="xen-price-row">
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
              <Text
                style={{
                  color: colors.onSurface,
                  fontSize: tokens.typography.scale.xl,
                  fontWeight: '600',
                }}
              >
                {row.name}
              </Text>
              <View
                accessibilityElementsHidden
                importantForAccessibility="no"
                style={{
                  flex: 1,
                  minWidth: 32,
                  marginHorizontal: tokens.spacing.sm,
                  marginBottom: 6,
                  borderBottomWidth: 1,
                  borderStyle: 'dotted',
                  borderColor: leaderColor,
                }}
              />
              <Text
                style={{
                  color: colors.accent,
                  fontSize: tokens.typography.scale.lg,
                }}
              >
                {row.price}
              </Text>
            </View>
            {row.description !== undefined ? (
              <Text
                style={{
                  marginTop: tokens.spacing.xs,
                  color: colors.muted,
                  fontSize: tokens.typography.scale.sm,
                }}
              >
                {row.description}
              </Text>
            ) : null}
          </View>
        ))}
      </View>
    </View>
  );
}
