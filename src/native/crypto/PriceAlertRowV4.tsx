import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { SwitchV4 } from '../primitives/SwitchV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { rowContainerStyle, rowTextStyle, rowTrailingStyle } from '../dashboard/internal/row-v4';
import { spokenLine } from './internal/market-v4';
import { formatPrice } from './internal/format';
import type { AlertCondition, PriceAlertRowProps } from './PriceAlertRow';

export interface PriceAlertRowV4Props extends PriceAlertRowProps {
  /** Wording for the trigger condition. Defaults `Above` / `Below`. */
  directionLabels?: { above?: string; below?: string };
}

/**
 * The condition's mark and its default word.
 *
 * The base's third field — `above → success`, `below → danger` — is gone.
 * "Alert me when BTC drops below $50,000" is a condition the holder chose, not
 * an error state, and the danger slot is the one colour in the theme that has
 * to keep meaning "something went wrong".
 */
const CONDITION_V4: Record<AlertCondition, { label: string; glyph: string }> = {
  above: { label: 'Above', glyph: '▲' },
  below: { label: 'Below', glyph: '▼' },
};

/**
 * **V4 price alert** — same props as {@link PriceAlertRow} plus
 * `directionLabels`.
 *
 * ## Four changes
 *
 * 1. **A disarmed alert is not drawn as an unavailable one.** The base put the
 *    whole row — the Switch included — at `opacity: 0.6`, which sits inside
 *    M3's disabled band: a live, toggleable control rendered as dead. The
 *    Switch already says on or off, in words, to everyone.
 * 2. **Direction is identity, not status.** See {@link CONDITION_V4}.
 * 3. **The Switch clears 44.** It carried `hitSlop` and a 24pt track; it now
 *    sits in a real target.
 * 4. **The row is two stops, not five.** The symbol, the condition, the target
 *    and the current price are one spoken line; the ▲/▼ mark is decoration
 *    beside a word and is hidden from the reader.
 */
export function PriceAlertRowV4({
  symbol,
  condition,
  targetPrice,
  currentPrice,
  currencySymbol = '$',
  decimals = 2,
  enabled = false,
  directionLabels,
  onToggle,
  style,
}: PriceAlertRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  if (!symbol) return null;

  const meta = CONDITION_V4[condition];
  const word =
    (condition === 'above' ? directionLabels?.above : directionLabels?.below) ?? meta.label;

  const targetText = formatPrice(targetPrice, { symbol: currencySymbol, decimals });
  const nowText =
    currentPrice != null
      ? `Now ${formatPrice(currentPrice, { symbol: currencySymbol, decimals })}`
      : null;

  const tap = minTap(tokens.spacing);

  return (
    <View style={[rowContainerStyle(theme, { twoLine: true }), style]}>
      {/* One stop for the whole readout. The Switch beside it keeps its own
          name and its own on/off state, which is the part a user acts on. */}
      <View
        accessible
        accessibilityLabel={spokenLine([symbol, word, targetText, nowText])}
        style={rowTextStyle(theme)}
      >
        <TextV4 size="base" weight="bold" tone="onSurface" numberOfLines={1}>
          {symbol}
        </TextV4>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <TextV4
            size="sm"
            tone="mutedText"
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            {meta.glyph}
          </TextV4>
          <TextV4 size="sm" tone="mutedText">
            {word}
          </TextV4>
          <TextV4 size="sm" weight="semibold" tone="onSurface" numeric="tabular">
            {targetText}
          </TextV4>
        </View>
        {nowText != null ? (
          <TextV4 size="xs" tone="mutedText" numeric="tabular">
            {nowText}
          </TextV4>
        ) : null}
      </View>

      <View
        style={[
          rowTrailingStyle(theme),
          { minWidth: tap, minHeight: tap, alignItems: 'center', justifyContent: 'center' },
        ]}
      >
        <SwitchV4
          checked={enabled}
          onCheckedChange={onToggle}
          accessibilityLabel={spokenLine([symbol, 'alert', word, targetText])}
        />
      </View>
    </View>
  );
}
