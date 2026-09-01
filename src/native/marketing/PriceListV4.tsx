import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { Eyebrow } from '../primitives/Eyebrow';
import { OrnamentRule } from './OrnamentRule';
import type { PriceListProps, PriceRow } from './PriceList';

/** Drop-in for {@link PriceListProps} — same props, the V4 "showcase" design. */
export type PriceListV4Props = PriceListProps;

/** A single menu-style row (mirrors the web `PriceRowV4`). */
export interface PriceRowV4Props {
  row: PriceRow;
}

/**
 * PriceRow — **V4** "showcase" design (native mirror of the web V4). One
 * menu-style row: `name ········ price` — the leading name left, a spaced dotted
 * leader (a flex spacer with a thin soft-primary dotted bottom border, since RN
 * has no CSS `color-mix` leader), and an extra-bold `tabular-nums` price right,
 * with an optional description beneath. Token-only colors, no literals.
 */
export function PriceRowV4({ row }: PriceRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const leaderColor = withAlpha(tokens.ramps.primary[400], 0.4);

  return (
    <View testID="xen-price-row">
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
            color: colors.primary,
            fontSize: tokens.typography.scale.lg,
            fontWeight: '800',
            fontVariant: ['tabular-nums'],
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
  );
}

/**
 * PriceList — **V4** "showcase" design (native mirror of the web V4). A clean
 * menu-style price group: an optional ornamented rule, a small-caps group
 * heading, and dotted-leader `PriceRowV4`s from the base's `rows` data array
 * (the web V4 composes children). Same props/behavior as {@link PriceListProps};
 * token-only colors, no literals.
 */
export function PriceListV4({
  heading,
  rows,
  ornament = 'diamond',
  style,
}: PriceListV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();

  return (
    <View testID="xen-price-list" style={[{ gap: tokens.spacing.lg }, style]}>
      {ornament !== 'none' ? <OrnamentRule ornament={ornament} tone="primary" /> : null}
      {heading !== undefined ? (
        <Eyebrow align="center" tone="primary">
          {heading}
        </Eyebrow>
      ) : null}
      <View style={{ gap: tokens.spacing.lg }}>
        {rows.map((row, i) => (
          <PriceRowV4 key={i} row={row} />
        ))}
      </View>
    </View>
  );
}
