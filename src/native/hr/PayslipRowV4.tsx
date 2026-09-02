import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { rowContainerStyle, rowGround, rowTextStyle } from '../dashboard/internal/row-v4';
import { formatMoney as defaultFormatMoney, type MoneyFormatter } from '../../commerce/money';
import { deductionParts, isAdverse } from '../../hr/workforce-v4';
import { StatusPillV4 } from './StatusPillV4';
import { PAYSLIP_STATUS_V4, spokenLine } from './internal/tone-v4';
import type { PayslipStatus } from './internal';
import type { PayslipRowProps } from './PayslipRow';

export interface PayslipRowV4Props extends PayslipRowProps {
  /** Why the payment failed. Shown when the status is adverse. */
  failureReason?: string;
  /** What the date under the period is called, per status. */
  dateLabels?: Partial<Record<PayslipStatus, string>>;
  /** Money formatter, for a locale the default cannot reach. */
  formatMoney?: MoneyFormatter;
  /** Caption over the gross figure. Default `'Gross'`. */
  grossLabel?: string;
  /** Caption over the deductions figure. Default `'Deductions'`. */
  deductionsLabel?: string;
}

/*
  Only `paid` may say "Paid". The other three describe a date that has not
  happened, or one on which nothing landed, and the base used one word for all
  four — which is how a failed payment came to render "Paid 15 Aug".
*/
const DATE_WORD: Record<PayslipStatus, string> = {
  paid: 'Paid',
  processing: 'Expected',
  pending: 'Expected',
  failed: 'Attempted',
};

/**
 * **V4 payslip row** — same props as {@link PayslipRow} plus `failureReason`,
 * `dateLabels`, `formatMoney`, `grossLabel` and `deductionsLabel`.
 *
 * ## Five changes
 *
 * 1. **A failed payment does not say "Paid".** The base printed the literal
 *    word `Paid ` before `payDate` regardless of `status`, so a failed run
 *    rendered **"Paid 15 Aug"** directly above a red "✕ Failed" pill — the row
 *    told the employee their money had arrived and, an inch away, that it had
 *    not. The caption is now chosen by status through `dateLabels`, which is
 *    also where a caller replaces the English.
 * 2. **A failure says why.** `failed` was one of six adverse statuses in the
 *    module with nowhere to put a reason, and it is the one where the employee
 *    can do something about it — a closed account, a stale sort code.
 * 3. **A refunded deduction reads as a credit.** The base prepended a literal
 *    `−` to `formatMoney(deductionsCents)`, so `deductionsCents={-5000}` — how
 *    most payroll APIs sign a refund — rendered **"−-$50.00"**.
 *    `deductionParts()` formats the magnitude and picks the sign from the
 *    direction, so a refund is `+$50.00` and reads as money coming back.
 * 4. **Money takes a formatter**, and the captions are props: `formatMoney`'s
 *    third `locale` argument was unreachable, and "Gross" and "Deductions" were
 *    hard-coded English in a payroll component.
 * 5. **The row announces its whole state** — period, net, status, date, gross,
 *    deductions and the failure reason. The base named itself "Payslip Aug
 *    1–15, net $3,200.00" and dropped the status, so a reader was told the
 *    money arrived when it had not.
 *
 * **Renders nothing without a `period`.**
 */
export function PayslipRowV4({
  period,
  netCents,
  grossCents,
  deductionsCents,
  currency = 'USD',
  status,
  payDate,
  variant = 'default',
  failureReason,
  dateLabels,
  formatMoney = defaultFormatMoney,
  grossLabel = 'Gross',
  deductionsLabel = 'Deductions',
  onPress,
  testID,
  style,
}: PayslipRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!period) return null;

  const compact = variant === 'compact';
  const statusMeta = status ? PAYSLIP_STATUS_V4[status] : undefined;
  const net = formatMoney(netCents, currency);

  const dateWord = status ? (dateLabels?.[status] ?? DATE_WORD[status]) : null;
  const dateLine = payDate ? (dateWord ? `${dateWord} ${payDate}` : payDate) : null;

  const why = status && isAdverse(status) ? failureReason : undefined;

  const deduction = deductionsCents == null ? null : deductionParts(deductionsCents);
  const deductionText =
    deduction == null
      ? null
      : deduction.direction === 'credit'
        ? `+${formatMoney(deduction.magnitudeCents, currency)}`
        : deduction.direction === 'debit'
          ? `−${formatMoney(deduction.magnitudeCents, currency)}`
          : formatMoney(0, currency);

  const showBreakdown = !compact && (grossCents != null || deductionText != null);

  const spoken = spokenLine([
    period,
    net,
    statusMeta?.label,
    dateLine,
    grossCents != null ? `${grossLabel} ${formatMoney(grossCents, currency)}` : null,
    deductionText != null ? `${deductionsLabel} ${deductionText}` : null,
    why,
  ]);

  const body = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        gap: tokens.spacing.xs,
        borderRadius: tokens.radius.md,
        backgroundColor: rowGround(theme, { pressed }),
      }}
    >
      <View style={rowContainerStyle(theme, { twoLine: true })}>
        <View style={rowTextStyle(theme)}>
          <TextV4 size="sm" weight="bold" tone="onCard" numberOfLines={1}>
            {period}
          </TextV4>
          {dateLine ? (
            <TextV4 size="xs" tone="mutedText">
              {dateLine}
            </TextV4>
          ) : null}
          {why ? (
            <TextV4
              size="xs"
              weight="semibold"
              numberOfLines={2}
              style={{ color: colors.dangerText }}
            >
              {why}
            </TextV4>
          ) : null}
        </View>
        <View style={{ alignItems: 'flex-end', gap: tokens.spacing.xs / 2 }}>
          <TextV4 size="lg" weight="bold" tone="onCard" numeric="tabular">
            {net}
          </TextV4>
          {statusMeta ? (
            <StatusPillV4 meta={statusMeta} variant="inline" size="sm" decorative />
          ) : null}
        </View>
      </View>

      {showBreakdown ? (
        <View
          style={{
            flexDirection: 'row',
            gap: tokens.spacing.lg,
            paddingHorizontal: tokens.spacing.md,
            paddingBottom: tokens.spacing.sm,
          }}
        >
          {grossCents != null ? (
            <View>
              <TextV4 size="xs" tone="mutedText">
                {grossLabel}
              </TextV4>
              <TextV4 size="sm" weight="semibold" tone="onCard" numeric="tabular">
                {formatMoney(grossCents, currency)}
              </TextV4>
            </View>
          ) : null}
          {deductionText != null ? (
            <View>
              <TextV4 size="xs" tone="mutedText">
                {deductionsLabel}
              </TextV4>
              <TextV4 size="sm" weight="semibold" tone="onCard" numeric="tabular">
                {deductionText}
              </TextV4>
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={spoken} testID={testID} style={style}>
        {body(false)}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={spoken}
      onPress={onPress}
      testID={testID}
      style={[{ borderRadius: tokens.radius.md }, style]}
    >
      {({ pressed }) => body(pressed)}
    </Pressable>
  );
}
