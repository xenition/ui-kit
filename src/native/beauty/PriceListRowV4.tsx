import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { rowSeparatorStyle } from '../dashboard/internal/row-v4';
import { formatMoney as defaultFormatMoney } from '../commerce/money';
import { compareAtCents, metaLine } from './internal/salon-v4';
import type { PriceListRowProps } from './PriceListRow';

export interface PriceListRowV4Props extends PriceListRowProps {
  /** Prefix on an open-ended price. Default `'from'`. */
  fromLabel?: string;
  /** Format the duration. Default `'45 min'`. */
  formatDuration?: (minutes: number) => string;
  /** Draw the separator under the row. Default `false`. */
  last?: boolean;
}

/**
 * **V4 price list row** — same props as {@link PriceListRow} plus
 * `fromLabel`, `formatDuration` and `last`.
 *
 * ## Four changes
 *
 * 1. **The compare-at price is finally drawn.** The base has carried
 *    `compareAtCents` since it was written and never rendered it. It is now a
 *    struck figure beside the price, **announced** as `Was …` so a reader
 *    handed two numbers knows which is which — and a compare-at that is not
 *    higher than the price is refused rather than drawn, because a fabricated
 *    discount is a dark pattern.
 * 2. **Prices are tabular.** A price list is *the* column-of-money component
 *    in the kit; with proportional figures it has no edge to scan down, which
 *    is the entire job.
 * 3. **The leader is a real dotted rule**, not the space between two
 *    right-floated strings, so the eye can travel from a service to its price.
 * 4. **The `section` variant is a heading**, announced as one.
 *
 * **Renders nothing without a `label`** (§4.5).
 */
export function PriceListRowV4({
  label,
  priceCents,
  currency = 'USD',
  fromPrice = false,
  note,
  durationMin,
  compareAtCents: compareAt,
  variant = 'default',
  formatMoney = defaultFormatMoney,
  fromLabel = 'from',
  formatDuration,
  last = false,
  style,
}: PriceListRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!label) return null;

  if (variant === 'section') {
    return (
      <TextV4
        accessibilityRole="header"
        size="sm"
        weight="bold"
        tone="mutedText"
        style={[{ paddingTop: tokens.spacing.md, paddingBottom: tokens.spacing.xs }, style]}
      >
        {label}
      </TextV4>
    );
  }

  const hasPrice = typeof priceCents === 'number' && Number.isFinite(priceCents);
  const price = hasPrice ? formatMoney(priceCents as number, currency) : null;
  const wasCents = compareAtCents(priceCents, compareAt);
  const was = wasCents != null ? formatMoney(wasCents, currency) : null;
  const duration =
    typeof durationMin === 'number'
      ? (formatDuration ?? ((m: number) => `${m} min`))(durationMin)
      : null;
  const caption = metaLine([duration, note]);

  return (
    <View
      accessible
      accessibilityLabel={metaLine([
        label,
        caption,
        was ? `was ${was}` : null,
        price ? (fromPrice ? `${fromLabel} ${price}` : price) : null,
      ])}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'baseline',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
        },
        !last ? rowSeparatorStyle(theme, {}) : null,
        style,
      ]}
    >
      <View style={{ flexShrink: 1 }}>
        <TextV4 size="base" weight="semibold" tone="onSurface" numberOfLines={2}>
          {label}
        </TextV4>
        {caption ? (
          <TextV4 size="xs" tone="mutedText" numeric="tabular">
            {caption}
          </TextV4>
        ) : null}
      </View>

      {/*
        A dotted leader, so the eye can travel from a service to its price.
        The base left the gap empty and relied on the two ends being far apart.
      */}
      <View
        aria-hidden
        style={{
          flex: 1,
          minWidth: tokens.spacing.lg,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          borderStyle: 'dotted',
          transform: [{ translateY: -tokens.spacing.xs / 2 }],
        }}
      />

      {price ? (
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
          {was ? (
            <TextV4
              size="xs"
              tone="mutedText"
              numeric="tabular"
              accessibilityLabel={`Was ${was}`}
              style={{ textDecorationLine: 'line-through' }}
            >
              {was}
            </TextV4>
          ) : null}
          {fromPrice ? (
            <TextV4 size="xs" tone="mutedText">
              {fromLabel}
            </TextV4>
          ) : null}
          <TextV4 size="base" weight="bold" tone="onSurface" numeric="tabular">
            {price}
          </TextV4>
        </View>
      ) : null}
    </View>
  );
}
