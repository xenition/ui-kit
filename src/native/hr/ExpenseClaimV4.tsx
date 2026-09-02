import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { formatMoney as defaultFormatMoney, type MoneyFormatter } from '../../commerce/money';
import { isAdverse } from '../../hr/workforce-v4';
import { StatusPillV4 } from './StatusPillV4';
import {
  EXPENSE_CATEGORY_V4,
  EXPENSE_STATUS_V4,
  chipStyle,
  metaLine,
  spokenLine,
} from './internal/tone-v4';
import type { ExpenseClaimProps } from './ExpenseClaim';

export interface ExpenseClaimV4Props extends ExpenseClaimProps {
  /** Why the claim was rejected. Shown when the status is adverse. */
  decisionReason?: string;
  /** Name of the approve action. Default `'Approve'`. */
  approveLabel?: string;
  /** Name of the reject action. Default `'Reject'`. */
  rejectLabel?: string;
  /** Money formatter, for a locale the default cannot reach. */
  formatMoney?: MoneyFormatter;
}

/**
 * **V4 expense claim** — same props as {@link ExpenseClaim} plus
 * `decisionReason`, `approveLabel`, `rejectLabel` and `formatMoney`.
 *
 * ## Six changes
 *
 * 1. **Approve and Reject are reachable.** They were `Button`s inside the
 *    card's own `Pressable`, which is `accessible` by default and flattens its
 *    whole subtree into one leaf named "Expense Hilton, $840.00, Submitted" —
 *    so the two decisions this card exists for were not focus stops at all, and
 *    an approver using VoiceOver could open the claim and could not act on it.
 *    The card is a plain `CardV4`; the activation wraps only the
 *    merchant-and-amount region and the buttons are its siblings.
 * 2. **A rejection says why.** An $840 lodging claim rendered a red "✕
 *    Rejected" directly above the claimant's own memo, with no field anywhere
 *    in the component for the approver's reason.
 * 3. **Category stops being a verdict.** `software` was toned `success` and
 *    `meals` `accent`, so a laptop purchase rendered green next to a genuinely
 *    approved claim. A category is identity: glyph, word, neutral chip.
 * 4. **"No receipt" is inked with ink.** It was `colors.danger`, the **fill**
 *    slot, used as a text colour — measured as low as 1.32:1 in the audit that
 *    produced the `*Text` tokens.
 * 5. **Money takes a formatter.** `formatMoney` has a third `locale` argument
 *    no caller could reach, so every claim in the module printed in the
 *    runtime's default locale regardless of the employee's.
 * 6. **The card announces the whole claim** — merchant, category, date, amount,
 *    status, receipt and the rejection reason.
 *
 * `rejectLabel`'s button keeps `variant="outline" tone="danger"` on **both**
 * twins; the web base spelled the destructive action as a filled
 * `variant="danger"`, giving it more weight on one platform than the other.
 *
 * **Renders nothing without a `merchant`.**
 */
export function ExpenseClaimV4({
  merchant,
  category,
  amountCents,
  currency = 'USD',
  date,
  status,
  description,
  hasReceipt,
  actionable = false,
  variant = 'default',
  decisionReason,
  approveLabel = 'Approve',
  rejectLabel = 'Reject',
  formatMoney = defaultFormatMoney,
  onApprove,
  onReject,
  onPress,
  testID,
  style,
}: ExpenseClaimV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!merchant) return null;

  const compact = variant === 'compact';
  const catMeta = EXPENSE_CATEGORY_V4[category];
  const statusMeta = EXPENSE_STATUS_V4[status];
  /*
    A status pill that sits BESIDE the activation is hidden from the reader when
    the row is interactive — the activation's own name already carries the
    status word, and hearing "Denied" twice in a row is worse than hearing it
    once. On a static row there is no activation to carry it, so the pill speaks
    for itself and the name leaves it out. Same rule on both twins.
  */
  const interactive = onPress != null;

  const showActions = actionable && status === 'submitted';
  const tap = minTap(tokens.spacing);
  const amount = formatMoney(amountCents, currency);

  const why = isAdverse(status) ? decisionReason : undefined;
  const receiptLabel =
    hasReceipt == null ? null : hasReceipt ? '📎 Receipt attached' : '⚠ No receipt';

  const spoken = spokenLine([
    merchant,
    catMeta.label,
    date,
    amount,
    interactive ? statusMeta.label : null,
    receiptLabel,
    why,
  ]);

  const identity = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: tokens.spacing.sm,
        minHeight: tap,
        borderRadius: tokens.radius.md,
        backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
      }}
    >
      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
        <TextV4 size="base" weight="bold" tone="onCard" numberOfLines={1}>
          {merchant}
        </TextV4>
        {/* A kind, not a state — see change 3. */}
        <View style={chipStyle(theme)}>
          <TextV4 size="xs" tone="onCard">
            {catMeta.glyph}
          </TextV4>
          <TextV4 size="xs" weight="semibold" tone="onCard">
            {metaLine([catMeta.label, date])}
          </TextV4>
        </View>
      </View>
      <TextV4 size="lg" weight="bold" tone="onCard" numeric="tabular">
        {amount}
      </TextV4>
    </View>
  );

  return (
    <CardV4
      variant="outlined"
      padding={compact ? 'sm' : 'md'}
      testID={testID}
      style={[{ gap: tokens.spacing.sm }, style]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}>
        {onPress ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={spoken}
            onPress={onPress}
            style={{ flex: 1, borderRadius: tokens.radius.md }}
          >
            {({ pressed }) => identity(pressed)}
          </Pressable>
        ) : (
          <View accessible accessibilityLabel={spoken} style={{ flex: 1 }}>
            {identity(false)}
          </View>
        )}
        <StatusPillV4 meta={statusMeta} size="sm" decorative={interactive} />
      </View>

      {!compact && description ? (
        <TextV4 size="xs" tone="mutedText" numberOfLines={2}>
          {description}
        </TextV4>
      ) : null}

      {receiptLabel ? (
        <TextV4
          size="xs"
          weight="semibold"
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          // `dangerText`, not `danger`: this is text, and `danger` is a fill.
          style={{ color: hasReceipt ? colors.mutedText : colors.dangerText }}
        >
          {receiptLabel}
        </TextV4>
      ) : null}

      {/* An adverse status owes the reader a reason — see change 2. */}
      {why ? (
        <TextV4
          size="xs"
          weight="semibold"
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{ color: colors.dangerText }}
        >
          {why}
        </TextV4>
      ) : null}

      {/* Siblings of the card's activation, never descendants — change 1. */}
      {showActions ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
          <ButtonV4
            size="sm"
            tone="success"
            onPress={onApprove}
            accessibilityLabel={approveLabel}
            style={{ flex: 1, minHeight: tap }}
          >
            {approveLabel}
          </ButtonV4>
          <ButtonV4
            size="sm"
            variant="outline"
            tone="danger"
            onPress={onReject}
            accessibilityLabel={rejectLabel}
            style={{ flex: 1, minHeight: tap }}
          >
            {rejectLabel}
          </ButtonV4>
        </View>
      ) : null}
    </CardV4>
  );
}
