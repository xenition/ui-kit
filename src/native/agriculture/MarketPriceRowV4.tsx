import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import {
  rowContainerStyle,
  rowGround,
  rowEdgeStyle,
  rowTextStyle,
} from '../dashboard/internal/row-v4';
import { metaLine } from './internal/farm-v4';
import type { MarketPriceRowProps, PriceDirection } from './MarketPriceRow';

export interface MarketPriceRowV4Props extends MarketPriceRowProps {
  /**
   * Format the change. Default `'+2.4%'` / `'-1.1%'` / `'0.0%'`.
   *
   * The base built the string inline with a hard-coded `toFixed(1)` and a
   * hand-written sign, so a host could not localize the decimal separator or
   * choose a different precision for a thinly-traded commodity.
   */
  formatChange?: (changePct: number, direction: PriceDirection) => string;
  /** Announced after the change, so direction is never colour alone. */
  directionLabels?: Partial<Record<PriceDirection, string>>;
}

/**
 * Direction → glyph and default spoken label.
 *
 * The colours are **not** here: a price movement genuinely is good or bad news
 * to the person reading it, so `up` keeps `successText` and `down` keeps
 * `dangerText` — but the glyph and the word carry it too, because a
 * red-green-only signal is the single most common accessibility defect in a
 * markets table.
 */
const DIR_META: Record<PriceDirection, { glyph: string; label: string; sign: string }> = {
  up: { glyph: '▲', label: 'up', sign: '+' },
  down: { glyph: '▼', label: 'down', sign: '' },
  flat: { glyph: '▪', label: 'unchanged', sign: '' },
};

/**
 * **V4 market price row** — same props as {@link MarketPriceRow} plus
 * `formatChange` and `directionLabels`.
 *
 * ## Four changes
 *
 * 1. **Direction is not carried by colour alone.** The glyph was already
 *    there; the spoken label is new, so a screen reader says "up 2.4 percent"
 *    rather than reading a triangle.
 * 2. **The change is formattable** — see `formatChange`.
 * 3. **It is a row from the shared row line**, and press is a state layer
 *    rather than `opacity: 0.85`.
 * 4. **The price and the change are tabular**, which is the whole point of a
 *    column of prices: with proportional figures `9.99` and `11.11` are
 *    different widths and the column has no edge to scan down.
 *
 * **Renders nothing without a `commodity`** (§4.5).
 */
export function MarketPriceRowV4({
  commodity,
  price,
  unit,
  changePct,
  direction,
  icon = '🌽',
  market,
  formatChange,
  directionLabels,
  last = false,
  onPress,
  style,
}: MarketPriceRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!commodity) return null;

  const dir: PriceDirection =
    direction ??
    (typeof changePct === 'number' ? (changePct > 0 ? 'up' : changePct < 0 ? 'down' : 'flat') : 'flat');
  const meta = DIR_META[dir];
  const dirLabel = directionLabels?.[dir] ?? meta.label;

  const hasChange = typeof changePct === 'number' && Number.isFinite(changePct);
  const changeText = hasChange
    ? (formatChange ?? ((n: number, d: PriceDirection) => `${DIR_META[d].sign}${n.toFixed(1)}%`))(
        changePct as number,
        dir
      )
    : null;

  const changeInk =
    dir === 'up' ? colors.successText : dir === 'down' ? colors.dangerText : colors.mutedText;

  const caption = metaLine([market, unit]);

  const content = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        rowContainerStyle(theme, { twoLine: Boolean(caption) }),
        { backgroundColor: rowGround(theme, { pressed }) },
        !last ? rowEdgeStyle(theme) : null,
        style,
      ]}
    >
      <IconV4 glyph={icon} size="lg" />

      <View style={rowTextStyle(theme)}>
        <TextV4 size="base" weight="semibold" tone="onCard" numberOfLines={1}>
          {commodity}
        </TextV4>
        {caption ? (
          <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
            {caption}
          </TextV4>
        ) : null}
      </View>

      <View style={{ alignItems: 'flex-end' }}>
        <TextV4 face="heading" size="base" weight="bold" tone="onCard" numeric="tabular">
          {String(price)}
        </TextV4>
        {changeText ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <TextV4 size="xs" style={{ color: changeInk }}>
              {meta.glyph}
            </TextV4>
            <TextV4 size="xs" weight="semibold" numeric="tabular" style={{ color: changeInk }}>
              {changeText}
            </TextV4>
          </View>
        ) : null}
      </View>
    </View>
  );

  const name = [commodity, String(price), unit, changeText ? `${dirLabel} ${changeText}` : null]
    .filter(Boolean)
    .join(', ');

  if (!onPress) {
    // Not pressable, but still one announced object rather than five loose
    // strings a screen reader reads in isolation.
    return (
      <View accessible accessibilityLabel={name}>
        {content(false)}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={name}
      onPress={onPress}
      style={{ borderRadius: tokens.radius.md }}
    >
      {({ pressed }) => content(pressed)}
    </Pressable>
  );
}
