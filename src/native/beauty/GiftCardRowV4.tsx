import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ProgressV4 } from '../primitives/ProgressV4';
import { TextV4 } from '../primitives/TextV4';
import {
  rowContainerStyle,
  rowGround,
  rowEdgeStyle,
  rowTextStyle,
} from '../dashboard/internal/row-v4';
import { formatMoney as defaultFormatMoney } from '../commerce/money';
import { metaLine, type ToneV4 } from './internal/salon-v4';
import type { GiftCardRowProps, GiftCardStatus } from './GiftCardRow';

export interface GiftCardRowV4Props extends GiftCardRowProps {
  /** Override the status words — four English words lived inside. */
  statusLabels?: Partial<Record<GiftCardStatus, string>>;
  /** Label on the remaining-balance meter. Default `'Remaining'`. */
  balanceLabel?: string;
  /** Draw the separator under the row. Default `false`. */
  last?: boolean;
}

/** Status → tone and default word. Genuinely a status, so the tones stay. */
const STATUS_META: Record<GiftCardStatus, { label: string; tone: ToneV4 }> = {
  active: { label: 'Active', tone: 'success' },
  redeemed: { label: 'Redeemed', tone: 'neutral' },
  expired: { label: 'Expired', tone: 'danger' },
  pending: { label: 'Pending', tone: 'warn' },
};

/**
 * **V4 gift card row** — same props as {@link GiftCardRow} plus
 * `statusLabels`, `balanceLabel` and `last`.
 *
 * ## Four changes
 *
 * 1. **The balance is shown against the face value.** The base printed two
 *    money figures side by side and left the reader to do the division; a
 *    meter says "most of it is gone" at a glance, which is the only question
 *    anyone asks of a gift card.
 * 2. **The code is tabular and monospaced by figures.** A redemption code is
 *    read aloud character by character and typed into a field — proportional
 *    digits make that harder for no reason.
 * 3. **It is a row from the shared row line**, with the shared press fill.
 * 4. **Status is a word beside the tone**, and all four words are props.
 *
 * **Renders nothing without an `amountCents`** (§4.5).
 */
export function GiftCardRowV4({
  amountCents,
  balanceCents,
  currency = 'USD',
  code,
  status = 'active',
  expires,
  note,
  formatMoney = defaultFormatMoney,
  statusLabels,
  balanceLabel = 'Remaining',
  last = false,
  onPress,
  style,
}: GiftCardRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  if (typeof amountCents !== 'number' || !Number.isFinite(amountCents)) return null;

  const meta = STATUS_META[status];
  const word = statusLabels?.[status] ?? meta.label;
  const face = formatMoney(amountCents, currency);
  const hasBalance =
    typeof balanceCents === 'number' && Number.isFinite(balanceCents) && amountCents > 0;
  const balance = hasBalance ? formatMoney(balanceCents as number, currency) : null;
  const pct = hasBalance ? Math.max(0, Math.min(100, ((balanceCents as number) / amountCents) * 100)) : null;
  const caption = metaLine([code, expires, note]);

  const content = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        rowContainerStyle(theme, { twoLine: true }),
        { backgroundColor: rowGround(theme, { pressed }) },
        !last ? rowEdgeStyle(theme) : null,
        style,
      ]}
    >
      <View style={rowTextStyle(theme)}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }}>
          <TextV4 face="heading" size="base" weight="bold" tone="onCard" numeric="tabular">
            {balance ?? face}
          </TextV4>
          {balance ? (
            <TextV4 size="xs" tone="mutedText" numeric="tabular">
              / {face}
            </TextV4>
          ) : null}
        </View>
        {caption ? (
          <TextV4 size="xs" tone="mutedText" numeric="tabular" numberOfLines={1}>
            {caption}
          </TextV4>
        ) : null}
        {pct != null ? (
          <View style={{ gap: tokens.spacing.xs / 2, marginTop: tokens.spacing.xs }}>
            <ProgressV4 value={pct} tone={meta.tone === 'danger' ? 'danger' : 'primary'} />
            <TextV4 size="xs" tone="mutedText">
              {balanceLabel}
            </TextV4>
          </View>
        ) : null}
      </View>

      <BadgeV4 tone={meta.tone} variant="soft" size="sm">
        {word}
      </BadgeV4>
    </View>
  );

  const name = metaLine([balance ?? face, balance ? `of ${face}` : null, word, caption]);

  if (!onPress) {
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
