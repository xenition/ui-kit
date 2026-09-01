import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { TextV4 } from '../primitives/TextV4';
import { MoneyAmount } from '../finance/MoneyAmount';
import { rowContainerStyle, rowGround, rowTextStyle } from '../dashboard/internal/row-v4';
import { formatMoney } from '../../commerce/money';
import { BADGE_V4, spokenLine, toneInk, type ToneV4 } from './internal/market-v4';
import { formatToken, truncateHash } from './internal/format';
import type { TxDirection, TxRowProps, TxStatus } from './TxRow';

export interface TxRowV4Props extends TxRowProps {
  /**
   * Ticker used when the row has no `symbol` of its own.
   *
   * Defaults to `''`, which is the base's behaviour: a send with no symbol
   * renders as a bare `−0.5`, a number whose denomination the reader has to
   * guess. A feed that knows its chain's native token should pass it.
   */
  fallbackSymbol?: string;
}

const STATUS_META: Record<TxStatus, { label: string; glyph: string; tone: ToneV4 }> = {
  pending: { label: 'Pending', glyph: '◷', tone: 'warn' },
  confirmed: { label: 'Confirmed', glyph: '✓', tone: 'success' },
  failed: { label: 'Failed', glyph: '✕', tone: 'danger' },
};

/** The word that carries the direction, so the sign is never the only cue. */
const DIRECTION_WORD: Record<TxDirection, string> = {
  send: 'Sent',
  receive: 'Received',
};

/**
 * **V4 transaction row** — same props as {@link TxRow} plus `fallbackSymbol`.
 *
 * ## Four changes
 *
 * 1. **The row announces the transaction.** `"Transaction 0x12…cdef,
 *    Confirmed"` was the whole name and it replaced the subtree, so the amount
 *    — the thing a user is scanning a history for — was never spoken. Hash,
 *    status, direction, amount, fiat value and time are one line now.
 * 2. **The amount can carry a unit.** `symbol` is optional and the base had no
 *    fallback, so a send rendered as `−0.5`. See
 *    {@link TxRowV4Props.fallbackSymbol}.
 * 3. **Direction is a word, not a hue.** Send read `danger` and receive read
 *    `success` with nothing but a `+`/`−` beside them; the announced name now
 *    says "Sent" or "Received", and the amount takes the readable `*Text` ink
 *    rather than the raw fill slot.
 * 4. **Press is a state layer** on the shared row recipe, the status chip is
 *    the module's one badge shape, and its glyph — decoration beside a word —
 *    is out of the reader's way.
 */
export function TxRowV4({
  hash,
  status = 'confirmed',
  direction,
  amount,
  symbol,
  fallbackSymbol = '',
  decimals = 4,
  valueCents,
  currency = 'USD',
  timestamp,
  hashLead = 6,
  hashTail = 4,
  onPress,
  style,
}: TxRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!hash) return null;

  const meta = STATUS_META[status];
  const short = truncateHash(hash, hashLead, hashTail);
  const unit = symbol ?? fallbackSymbol;

  const signed =
    direction && amount != null
      ? direction === 'send'
        ? -Math.abs(amount)
        : Math.abs(amount)
      : amount;
  const prefix = direction === 'send' ? '−' : direction === 'receive' ? '+' : '';
  const amountInk =
    direction === 'send'
      ? toneInk(theme, 'danger')
      : direction === 'receive'
        ? toneInk(theme, 'success')
        : colors.onSurface;

  const amountText =
    signed != null
      ? `${prefix}${formatToken(Math.abs(signed), {
          decimals,
          ...(unit !== '' ? { symbol: unit } : {}),
        })}`
      : null;

  const spoken = spokenLine([
    `Transaction ${short}`,
    meta.label,
    direction != null ? DIRECTION_WORD[direction] : null,
    amountText,
    valueCents != null ? formatMoney(valueCents, currency) : null,
    timestamp,
  ]);

  const body = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        rowContainerStyle(theme, { twoLine: timestamp != null }),
        { backgroundColor: rowGround(theme, { pressed }) },
        style,
      ]}
    >
      <BadgeV4 tone={meta.tone} {...BADGE_V4}>
        {`${meta.glyph} ${meta.label}`}
      </BadgeV4>

      <View style={rowTextStyle(theme)}>
        <TextV4 size="sm" weight="semibold" tone="onSurface" numeric="tabular" numberOfLines={1}>
          {short}
        </TextV4>
        {timestamp != null ? (
          <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
            {timestamp}
          </TextV4>
        ) : null}
      </View>

      {amountText != null ? (
        <View style={{ alignItems: 'flex-end', gap: tokens.spacing.xs }}>
          <TextV4 size="base" weight="bold" numeric="tabular" style={{ color: amountInk }}>
            {amountText}
          </TextV4>
          {valueCents != null ? (
            <MoneyAmount cents={valueCents} currency={currency} tone="muted" size="sm" />
          ) : null}
        </View>
      ) : null}
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
