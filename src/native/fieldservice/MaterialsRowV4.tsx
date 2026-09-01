import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import {
  rowContainerStyle,
  rowGround,
  rowLeadingStyle,
  rowTextStyle,
  rowTrailingStyle,
} from '../dashboard/internal/row-v4';
import { metaLine } from '../primitives/internal/tone-v4';
import { formatMoney as defaultFormatMoney } from '../../commerce/money';
import { BADGE_V4, discGround, spokenLine, type ToneV4 } from './internal/job-v4';
import type { MaterialStock, MaterialsRowProps } from './MaterialsRow';

export interface MaterialsRowV4Props extends MaterialsRowProps {
  /** Leading glyph for the material disc, as every sibling row already has. Default `'📦'`. */
  glyph?: string;
  /** Override the three stock names — they lived inside the component. */
  stockLabels?: Partial<Record<MaterialStock, string>>;
}

const STOCK_META: Record<MaterialStock, { label: string; glyph: string; tone: ToneV4 }> = {
  'in-stock': { label: 'In stock', glyph: '✓', tone: 'success' },
  low: { label: 'Low', glyph: '▲', tone: 'warn' },
  'back-ordered': { label: 'Back-ordered', glyph: '⋯', tone: 'danger' },
};

/**
 * **V4 materials row** — same props as {@link MaterialsRow} plus `glyph` and
 * `stockLabels`.
 *
 * ## Four changes
 *
 * 1. **The stock state is announced.** The row's name was
 *    `"${name}, ${qty} ${unit}, ${total}"`, which replaces the subtree — and
 *    on a parts list "back-ordered" is the single field that changes what the
 *    technician does next. It was the one field the label left out.
 * 2. **It takes a `glyph`**, like every sibling row in the module; the box
 *    emoji was hard-coded, and its disc was labelled "Material", which made a
 *    decorative mark a reader stop.
 * 3. **The row is a row from the shared row line**, clearing 44, with a press
 *    that is a state layer instead of `opacity: 0.7`.
 * 4. **The money column is tabular**, so a parts list's totals line up
 *    digit-for-digit down the page instead of drifting.
 *
 * **Renders nothing without a `name`.**
 */
export function MaterialsRowV4({
  name,
  sku,
  quantity,
  unit = 'ea',
  unitCents,
  stock,
  currency = 'USD',
  formatMoney = defaultFormatMoney,
  glyph = '📦',
  stockLabels,
  onPress,
  style,
}: MaterialsRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  if (!name) return null;

  const meta = stock ? STOCK_META[stock] : undefined;
  const stockWord = stock ? (stockLabels?.[stock] ?? meta?.label) : undefined;
  const qty = Number.isFinite(quantity) ? Math.max(0, quantity) : 0;
  const unitSafe = Math.max(0, Math.trunc(unitCents || 0));
  const totalCents = Math.round(qty * unitSafe);
  const total = formatMoney(totalCents, currency);

  const breakdown = `${qty} ${unit} × ${formatMoney(unitSafe, currency)}`;
  const caption = metaLine([breakdown, sku]);
  const spoken = spokenLine([name, breakdown, sku, total, stockWord]);

  const content = (
    <>
      {/* Decorative: the disc names a category, and the stock state it used to
          stand in for is now spoken by the row itself. */}
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[
          rowLeadingStyle(theme),
          { borderRadius: tokens.radius.md, backgroundColor: discGround(theme, 'primary') },
        ]}
      >
        <IconV4 glyph={glyph} />
      </View>
      <View style={rowTextStyle(theme)}>
        <TextV4 size="base" weight="semibold" tone="onCard" numberOfLines={1}>
          {name}
        </TextV4>
        <TextV4 size="xs" tone="mutedText" numberOfLines={1} numeric="tabular">
          {caption}
        </TextV4>
      </View>
      <View style={[rowTrailingStyle(theme), { flexDirection: 'column', alignItems: 'flex-end' }]}>
        <TextV4 size="base" weight="bold" tone="onCard" numeric="tabular">
          {total}
        </TextV4>
        {meta && stockWord != null ? (
          <BadgeV4 tone={meta.tone} {...BADGE_V4}>
            {`${meta.glyph} ${stockWord}`}
          </BadgeV4>
        ) : null}
      </View>
    </>
  );

  if (!onPress) {
    return (
      <View
        accessible
        accessibilityLabel={spoken}
        style={[rowContainerStyle(theme, { twoLine: true }), style]}
      >
        {content}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={spoken}
      onPress={onPress}
      style={[{ borderRadius: tokens.radius.md }, style]}
    >
      {({ pressed }) => (
        <View
          style={[
            rowContainerStyle(theme, { twoLine: true }),
            { borderRadius: tokens.radius.md, backgroundColor: rowGround(theme, { pressed }) },
          ]}
        >
          {content}
        </View>
      )}
    </Pressable>
  );
}
