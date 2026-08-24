import * as React from 'react';
import { Text, type StyleProp, type TextStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { formatMoney, type MoneyFormatter } from '../commerce/money';

/**
 * Semantic tone for a monetary value.
 * - `auto` derives from the sign of `cents` (income → success, expense →
 *   danger, zero → on-surface).
 * - `income` / `expense` force the credit / debit tone.
 * - `neutral` reads on-surface; `muted` reads muted.
 */
export type MoneyTone = 'auto' | 'income' | 'expense' | 'neutral' | 'muted';

export type MoneyAmountSize = 'sm' | 'md' | 'lg' | 'xl';

/** How the +/− prefix is shown. `auto` shows `−` for negatives only. */
export type MoneySignDisplay = 'auto' | 'always' | 'never';

export interface MoneyAmountProps {
  /**
   * Signed integer **minor units (cents)** — the sign carries direction, so no
   * float ever reaches the display (mirrors the kit-wide cents contract).
   */
  cents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Tone → color mapping (default `auto`, derived from the sign). */
  tone?: MoneyTone;
  /** Visual scale (default `md`). */
  size?: MoneyAmountSize;
  /** Sign prefix behavior (default `auto` → `−` on negatives only). */
  signDisplay?: MoneySignDisplay;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  /** Announced label; defaults to the formatted value with a credit/debit hint. */
  accessibilityLabel?: string;
  style?: StyleProp<TextStyle>;
}

const SIZE_KEY: Record<MoneyAmountSize, keyof CompiledScale> = {
  sm: 'sm',
  md: 'base',
  lg: 'xl',
  xl: '3xl',
};

type CompiledScale = {
  xs: number;
  sm: number;
  base: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
};

function toneColorKey(tone: MoneyTone, cents: number): keyof SemanticColors {
  switch (tone) {
    case 'income':
      return 'success';
    case 'expense':
      return 'danger';
    case 'neutral':
      return 'onSurface';
    case 'muted':
      return 'muted';
    case 'auto':
    default:
      if (cents > 0) return 'success';
      if (cents < 0) return 'danger';
      return 'onSurface';
  }
}

/**
 * The finance module's canonical money display: a single signed, token-toned
 * `Text`. Amounts are integer cents so the printed value never drifts —
 * `formatMoney` renders exactly two decimals via `Intl.NumberFormat`, and the
 * magnitude is formatted from `Math.abs(cents)` with the sign applied
 * separately. Color traces to a `SemanticColors` slot (income = `success`,
 * expense = `danger`) — never a literal. Every other finance component funnels
 * its amounts through here.
 */
export function MoneyAmount({
  cents,
  currency = 'USD',
  tone = 'auto',
  size = 'md',
  signDisplay = 'auto',
  formatMoney: format = formatMoney,
  accessibilityLabel,
  style,
}: MoneyAmountProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const safeCents = Number.isFinite(cents) ? Math.trunc(cents) : 0;
  const magnitude = format(Math.abs(safeCents), currency);

  let sign = '';
  if (safeCents < 0) sign = signDisplay === 'never' ? '' : '−'; // minus sign
  else if (safeCents > 0 && signDisplay === 'always') sign = '+';

  const color = colors[toneColorKey(tone, safeCents)];
  const text = `${sign}${magnitude}`;

  return (
    <Text
      accessibilityLabel={
        accessibilityLabel ??
        `${safeCents < 0 ? 'debit' : safeCents > 0 ? 'credit' : ''} ${magnitude}`.trim()
      }
      style={[
        {
          color,
          fontSize: tokens.typography.scale[SIZE_KEY[size]],
          fontWeight: '700',
          fontVariant: ['tabular-nums'],
        },
        style,
      ]}
    >
      {text}
    </Text>
  );
}
