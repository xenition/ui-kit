import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { metaLine } from '../primitives/internal/tone-v4';
import {
  BADGE_V4,
  CARD_V4,
  IDENTITY_TONE,
  isAdverse,
  spokenLine,
  tintGround,
  tintInk,
  type ToneV4,
} from './internal/civic-v4';
import { formatMoney } from './internal/format';
import type { TaxStatus, TaxSummaryCardProps } from './TaxSummaryCard';

export interface TaxSummaryCardV4Props extends TaxSummaryCardProps {
  /** Override the five status words (`'Balance due'`, `'Overdue'`, …). */
  statusLabels?: Partial<Record<TaxStatus, string>>;
  /** What the due date is called. Default `'Due'`. */
  dueLabel?: string;
  /** What the pay button says once it is armed. Default `'Confirm payment'`. */
  confirmPayLabel?: string;
}

const STATUS_V4: Record<TaxStatus, { label: string; glyph: string; tone: ToneV4 }> = {
  owed: { label: 'Balance due', glyph: '💳', tone: 'warn' },
  refund: { label: 'Refund', glyph: '💵', tone: 'success' },
  paid: { label: 'Paid', glyph: '✓', tone: 'success' },
  overdue: { label: 'Overdue', glyph: '!', tone: 'danger' },
  filed: { label: 'Filed', glyph: '📄', tone: IDENTITY_TONE },
};

/**
 * **V4 tax summary** — same props as {@link TaxSummaryCard} plus
 * `statusLabels`, `dueLabel` and `confirmPayLabel`.
 *
 * ## Five changes
 *
 * 1. **The due date is not an afterthought.** It was a muted `xs` line — the
 *    same size and colour as the "Paid" caption — with nothing linking it to
 *    `overdue`, on a card whose entire consequence is that date. It joins the
 *    spoken name, and on an overdue account it takes the danger ink and a
 *    weight that matches what missing it costs.
 * 2. **Overdue announces.** `isAdverse('overdue')` is true and the base said
 *    it only by tinting a pill; the status line is an assertive live region
 *    now, so an account that goes overdue while the screen is open is heard.
 * 3. **Paying takes a confirming press**, and the button clears 44 —
 *    "Pay now" was one tap on a ~34pt target with no confirm and no pending
 *    state.
 * 4. **The amounts take the contrast-corrected ink.** `colors.success` and
 *    `colors.danger` are *fill* slots with no contrast promise as text, and
 *    the headline balance was drawn in them at `xl`. The card's summary is
 *    also one announced object, which it could not be before without
 *    swallowing the Pay button — so the name sits on the text region and the
 *    button is its sibling.
 * 5. **Having filed is not an outcome.** `filed` was `primary` — a brand
 *    colour on a record of what you did, sitting beside `overdue`, which is a
 *    warning about what you owe. It is `IDENTITY_TONE`, and the disc it tints
 *    follows it.
 */
export function TaxSummaryCardV4({
  taxYear,
  taxType,
  status = 'owed',
  amountCents,
  paidCents,
  dueDate,
  currency = 'USD',
  formatMoney: format = formatMoney,
  statusLabels,
  dueLabel = 'Due',
  confirmPayLabel = 'Confirm payment',
  onPay,
  style,
}: TaxSummaryCardV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const [armed, setArmed] = React.useState(false);

  const sd = STATUS_V4[status] ?? STATUS_V4.owed;
  const statusWord = statusLabels?.[status] ?? sd.label;
  const overdue = isAdverse(status);
  const amount = Math.max(0, Math.trunc(amountCents || 0));
  const amountText = format(amount, currency);
  const paidText = paidCents != null ? format(Math.max(0, Math.trunc(paidCents)), currency) : undefined;
  const isPayable = status === 'owed' || status === 'overdue';

  const heading = metaLine([taxType ?? 'Tax', taxYear]);
  const balanceLabel = status === 'refund' ? 'Refund' : 'Balance';
  const dueLine = dueDate ? `${dueLabel} ${dueDate}` : undefined;
  const tap = minTap(tokens.spacing);
  const disc = tokens.spacing['2xl'];

  // The amount is a numeral, so it takes the tone's *ink*. Only an outcome —
  // a refund, a settled account, an overdue one — is toned at all; a balance
  // that is simply owed is body copy.
  const amountTone: ToneV4 | null =
    status === 'refund' || status === 'paid' ? 'success' : overdue ? 'danger' : null;

  const spoken = spokenLine([
    heading,
    statusWord,
    `${balanceLabel} ${amountText}`,
    paidText != null ? `Paid ${paidText}` : null,
    dueLine,
  ]);

  return (
    <CardV4 variant={CARD_V4} style={style}>
      <View
        accessible
        accessibilityLiveRegion={overdue ? 'assertive' : 'none'}
        accessibilityLabel={spoken}
        style={{ gap: tokens.spacing.md }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
          <View
            style={{
              width: disc,
              height: disc,
              borderRadius: tokens.radius.md,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: tintGround(theme, sd.tone),
            }}
          >
            {/* Decorative: the card's name already says what it is. */}
            <IconV4 glyph="🧾" size="xl" />
          </View>
          <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
            <TextV4 size="base" weight="bold" tone="onSurface" numberOfLines={1}>
              {heading}
            </TextV4>
            <View style={{ flexDirection: 'row' }}>
              <BadgeV4 tone={sd.tone} {...BADGE_V4}>
                {`${sd.glyph} ${statusWord}`}
              </BadgeV4>
            </View>
          </View>
        </View>

        <View
          style={{
            paddingTop: tokens.spacing.md,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: tokens.spacing.sm,
          }}
        >
          <View style={{ gap: tokens.spacing.xs / 2 }}>
            <TextV4 size="xs" tone="mutedText">
              {balanceLabel}
            </TextV4>
            <TextV4
              size="xl"
              weight="bold"
              numeric="tabular"
              tone={amountTone === null ? 'onSurface' : undefined}
              style={amountTone === null ? undefined : { color: tintInk(theme, amountTone) }}
            >
              {amountText}
            </TextV4>
          </View>
          {paidText != null ? (
            <View style={{ alignItems: 'flex-end', gap: tokens.spacing.xs / 2 }}>
              <TextV4 size="xs" tone="mutedText">
                Paid
              </TextV4>
              <TextV4 size="base" weight="semibold" numeric="tabular" tone="onSurface">
                {paidText}
              </TextV4>
            </View>
          ) : null}
        </View>

        {dueLine != null ? (
          // The date the account turns on. It is not a caption.
          <TextV4
            size={overdue ? 'sm' : 'xs'}
            weight={overdue ? 'semibold' : 'regular'}
            tone={overdue ? undefined : 'mutedText'}
            style={overdue ? { color: tintInk(theme, 'danger') } : undefined}
          >
            {dueLine}
          </TextV4>
        ) : null}
      </View>

      {isPayable && onPay != null && amount > 0 ? (
        <View style={{ marginTop: tokens.spacing.md, alignItems: 'flex-end' }}>
          <ButtonV4
            size="md"
            tone={overdue ? 'danger' : 'default'}
            accessibilityLabel={armed ? confirmPayLabel : 'Pay now'}
            onPress={() => {
              // A payment is irreversible; the first press only arms it.
              if (!armed) {
                setArmed(true);
                return;
              }
              setArmed(false);
              onPay();
            }}
            style={{ minHeight: tap }}
          >
            {armed ? confirmPayLabel : 'Pay now'}
          </ButtonV4>
        </View>
      ) : null}
    </CardV4>
  );
}
