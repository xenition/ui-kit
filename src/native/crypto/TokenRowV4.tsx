import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { MoneyAmount } from '../finance/MoneyAmount';
import { mixToken } from '../../primitives/internal/v4-depth';
import { ensureContrast } from '../../theme/color';
import { MIN_CONTRAST } from '../../theme/compile';
import {
  rowContainerStyle,
  rowGround,
  rowLeadingStyle,
  rowTextStyle,
} from '../dashboard/internal/row-v4';
import { formatMoney } from '../../commerce/money';
import { changeInk, changeParts, spokenLine } from './internal/market-v4';
import { formatPct, formatToken } from './internal/format';
import type { TokenRowProps } from './TokenRow';

export interface TokenRowV4Props extends TokenRowProps {
  /** Wording for the movement. Defaults `up` / `down` / `unchanged`. */
  directionLabels?: { up?: string; down?: string; flat?: string };
}

/**
 * How much of the token's own colour the disc carries — `BadgeV4`'s and
 * `IconV4`'s 14%, so a token disc and a soft badge beside it are one wash
 * rather than two neighbouring shades of nearly the same.
 */
const DISC_MIX = 0.14;

/**
 * **V4 holding row** — same props as {@link TokenRow} plus `directionLabels`.
 *
 * ## Four changes
 *
 * 1. **A loss is announced as a loss.** The base built the change's spoken
 *    label as `` `${pct >= 0 ? 'up' : 'down'} ${formatPct(Math.abs(pct))}` ``
 *    — and `formatPct` re-applies the sign, so a fall announced as **"down
 *    +3.20%"**. `>= 0` also sent a flat `0` down the "up" branch while the
 *    glyph drawn beside it was `•`.
 * 2. **The row announces the holding.** `"ETH holding"` was the whole name,
 *    and it replaced everything under it — so the quantity, the fiat value and
 *    the change, which is all the row is for, were never spoken.
 * 3. **`iconColor` is drawn on a ground it is paired with.** The base painted
 *    `colors[iconColor]` — `on-primary` by default — onto a neutral ramp step
 *    and hoped. The disc now composites its own ground from that colour and
 *    re-measures the mark against it, so a token's accent is legible whatever
 *    the seed. The mark also stops being a silent `slice(0, 3)`: the full
 *    ticker is set in the disc and ellipsised if it does not fit, and the
 *    row's title carries it whole.
 * 4. **The change reads as text**, not as `colors[changeToneKey(pct)]` — a
 *    fill slot with no contrast promise — and press is a state layer on the
 *    shared row recipe rather than `opacity: 0.7`.
 */
export function TokenRowV4({
  symbol,
  name,
  amount,
  decimals = 4,
  valueCents,
  currency = 'USD',
  changePct,
  icon,
  iconColor = 'primary',
  directionLabels,
  onPress,
  style,
}: TokenRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!symbol) return null;

  const hasChange = changePct != null;
  const change = changeParts(changePct, directionLabels);
  const ink = changeInk(theme, change.tone);

  const amountText = formatToken(amount, { decimals, symbol });
  const pctText = hasChange ? formatPct(changePct) : null;

  // The disc owns its ground, so the accent can be measured against it. Both
  // are derived from the one colour the caller named.
  const discGround = mixToken(colors.surface, colors[iconColor], DISC_MIX);
  const discInk = ensureContrast(colors[iconColor], discGround, MIN_CONTRAST);
  const mark = icon ?? symbol.toUpperCase();

  const spoken = spokenLine([
    symbol,
    name,
    amountText,
    valueCents != null ? formatMoney(valueCents, currency) : null,
    hasChange ? change.word : null,
    pctText,
  ]);

  const body = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        rowContainerStyle(theme, { twoLine: name != null }),
        { backgroundColor: rowGround(theme, { pressed }) },
        style,
      ]}
    >
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[
          rowLeadingStyle(theme),
          {
            borderRadius: tokens.radius.full,
            backgroundColor: discGround,
            paddingHorizontal: tokens.spacing.xs,
          },
        ]}
      >
        <TextV4
          size={icon != null ? 'lg' : 'xs'}
          weight="bold"
          numberOfLines={1}
          style={{ color: discInk }}
        >
          {mark}
        </TextV4>
      </View>

      <View style={rowTextStyle(theme)}>
        <TextV4 size="base" weight="semibold" tone="onSurface" numberOfLines={1}>
          {symbol}
        </TextV4>
        {name != null ? (
          <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
            {name}
          </TextV4>
        ) : null}
      </View>

      <View style={{ alignItems: 'flex-end', gap: tokens.spacing.xs }}>
        <TextV4 size="base" weight="semibold" tone="onSurface" numeric="tabular">
          {amountText}
        </TextV4>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          {valueCents != null ? (
            <MoneyAmount cents={valueCents} currency={currency} tone="neutral" size="sm" />
          ) : null}
          {hasChange ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
              <TextV4
                size="xs"
                style={{ color: ink }}
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
              >
                {change.glyph}
              </TextV4>
              <TextV4 size="xs" weight="semibold" numeric="tabular" style={{ color: ink }}>
                {pctText}
              </TextV4>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={spoken}>
        {body(false)}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={spoken}
      onPress={onPress}
      style={{ borderRadius: tokens.radius.md }}
    >
      {({ pressed }) => body(pressed)}
    </Pressable>
  );
}
