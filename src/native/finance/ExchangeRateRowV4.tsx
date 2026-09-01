import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { appearanceStyle } from '../primitives/internal/appearance';
import { rowContainerStyle, rowGround, rowTextStyle } from '../dashboard/internal/row-v4';
import { TABULAR, moneyInk, pctText, ratePrecision, signParts, spokenLine } from './internal/ledger-v4';
import type { ExchangeRateRowProps } from './ExchangeRateRow';

export interface ExchangeRateRowV4Props extends ExchangeRateRowProps {
  /** BCP-47 locale for the rate and the change. Defaults to the runtime's. */
  locale?: string;
}

/** The words the move is announced with — the arrow's shape said in speech. */
const CHANGE_WORDS = { credit: 'up', debit: 'down' };

/**
 * **V4 exchange rate row** — same props as {@link ExchangeRateRow} plus
 * `locale`.
 *
 * ## Four changes
 *
 * 1. **A large `precision` no longer throws.** `Math.max(0, precision)`
 *    clamped the bottom and left the top open, so anything above 100 was a
 *    `RangeError` out of `toFixed` — an uncaught throw from a display row.
 *    `ratePrecision()` clamps both ends.
 * 2. **The rate is formatted through `Intl`.** `toFixed` hard-locks the
 *    decimal mark to `.`, so a de-DE app showed "1.234,56 EUR" beside
 *    "0.9184" — two number systems in one row.
 * 3. **A zero change is not a green gain.** `(changePct ?? 0) >= 0` painted a
 *    flat 0.00% in `success` with an up arrow. Zero has its own branch, no
 *    arrow and a neutral ink.
 * 4. **The row announces the change**, clears 44 from the shared row family,
 *    and draws its press as a state layer rather than `opacity: 0.7` — which
 *    dims content and so reads as *disabled*.
 */
export function ExchangeRateRowV4({
  baseCurrency,
  quoteCurrency,
  rate,
  changePct,
  precision = 4,
  locale,
  onPress,
  appearance = 'classic',
  style,
}: ExchangeRateRowV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const safeRate = Number.isFinite(rate) ? rate : 0;
  const digits = ratePrecision(precision);
  const rateText = new Intl.NumberFormat(locale, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(safeRate);

  const hasChange = typeof changePct === 'number' && Number.isFinite(changePct);
  const change = signParts(changePct ?? 0, undefined, CHANGE_WORDS);
  const changeText = hasChange ? `${pctText(changePct as number, locale)}%` : null;
  const arrow = change.direction === 'credit' ? '▲' : change.direction === 'debit' ? '▼' : '';

  const surface = appearance === 'classic' ? undefined : appearanceStyle(appearance, colors, tokens);

  const name = spokenLine([
    `${baseCurrency} to ${quoteCurrency}`,
    rateText,
    hasChange ? change.word : null,
    changeText,
  ]);

  const body = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        surface,
        rowContainerStyle(theme),
        { backgroundColor: rowGround(theme, { pressed }) },
        style,
      ]}
    >
      <View style={rowTextStyle(theme)}>
        <TextV4 size="base" weight="semibold" tone="onSurface" numberOfLines={1}>
          {baseCurrency}
          <TextV4 size="base" tone="mutedText">
            {' → '}
          </TextV4>
          {quoteCurrency}
        </TextV4>
      </View>
      <TextV4 size="base" weight="bold" tone="onSurface" numeric="tabular">
        {rateText}
      </TextV4>
      {hasChange ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          {arrow !== '' ? (
            <TextV4 size="xs" style={{ color: moneyInk(theme, change.tone) }}>
              {arrow}
            </TextV4>
          ) : null}
          <TextV4
            size="xs"
            weight="semibold"
            style={[{ color: moneyInk(theme, change.tone) }, TABULAR]}
          >
            {changeText}
          </TextV4>
        </View>
      ) : null}
    </View>
  );

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={name}>
        {body(false)}
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
      {({ pressed }) => body(pressed)}
    </Pressable>
  );
}
