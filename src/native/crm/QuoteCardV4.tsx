import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { formatMoney } from '../commerce/money';
import { QUOTE_META } from './internal';
import { BADGE_V4, metaLine, spokenLine, TABULAR } from './internal/crm-v4';
import type { QuoteCardProps } from './QuoteCard';

export interface QuoteCardV4Props extends QuoteCardProps {
  /** How the line-item count is spelled. Default `'3 items'` / `'1 item'`. */
  formatLineItems?: (count: number) => string;
  /** Unit for the lifecycle status. Default `'Status'`. */
  statusLabel?: string;
}

/**
 * **V4 quote card** — same props as {@link QuoteCard} plus `formatLineItems`
 * and `statusLabel`.
 *
 * ## Five changes
 *
 * 1. **The status is announced on native.** `accessibilityLabel` sat on a bare
 *    `View` with no `accessible` flag, so the label was silently dropped and
 *    the one thing a quote row exists to report — draft, sent, accepted — was
 *    never read out.
 * 2. **The action button is not nested inside a button.** The card's own
 *    activation wrapped the whole surface, action included; the web twin had
 *    to guard the identical nesting with `stopPropagation`. The activation now
 *    covers only the quote's summary and the action is its sibling.
 * 3. **The card announces everything it shows** — number, account, total,
 *    status, item count and validity (rule A).
 * 4. **The grand total is tabular**, so a stack of quotes lines up.
 * 5. **A press is a state layer** (rule B) and the badge is `BADGE_V4`
 *    (rule C).
 *
 * **Renders nothing without a `number`.**
 */
export function QuoteCardV4({
  number,
  company,
  totalCents,
  currency = 'USD',
  lineItems,
  status,
  validUntil,
  actionLabel,
  formatLineItems,
  statusLabel = 'Status',
  onAction,
  onPress,
  testID,
  style,
}: QuoteCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!number) return null;

  const meta = QUOTE_META[status];
  const tap = minTap(tokens.spacing);
  const total = formatMoney(totalCents, currency);
  const itemsLabel =
    lineItems != null && lineItems > 0
      ? (formatLineItems ?? ((n: number) => `${n} item${n === 1 ? '' : 's'}`))(lineItems)
      : undefined;
  const caption = metaLine([itemsLabel, validUntil]);

  const name = spokenLine([
    number,
    company,
    total,
    `${statusLabel} ${meta.label}`,
    itemsLabel,
    validUntil,
  ]);

  const summary = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        gap: tokens.spacing.sm,
        borderRadius: tokens.radius.md,
        backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: tokens.spacing.sm,
        }}
      >
        <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
          <TextV4 size="base" weight="bold" tone="onCard">
            {number}
          </TextV4>
          {company ? (
            <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
              {company}
            </TextV4>
          ) : null}
        </View>
        {/* `accessible`, or the label below is dropped — see change 1. */}
        <View accessible accessibilityLabel={`${statusLabel} ${meta.label}`}>
          <BadgeV4 {...BADGE_V4} tone={meta.tone}>
            {`${meta.glyph} ${meta.label}`}
          </BadgeV4>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: tokens.spacing.sm,
        }}
      >
        <TextV4 size="xl" weight="bold" tone="onCard" style={TABULAR}>
          {total}
        </TextV4>
        {caption ? (
          <TextV4 size="xs" tone="mutedText">
            {caption}
          </TextV4>
        ) : null}
      </View>
    </View>
  );

  return (
    <CardV4 padding="md" testID={testID} style={[{ gap: tokens.spacing.sm }, style]}>
      {onPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={name}
          onPress={onPress}
          style={{ borderRadius: tokens.radius.md }}
        >
          {({ pressed }) => summary(pressed)}
        </Pressable>
      ) : (
        <View accessible accessibilityLabel={name}>
          {summary(false)}
        </View>
      )}

      {/* A sibling of the card's activation, never a descendant of it. */}
      {actionLabel && onAction ? (
        <ButtonV4 variant="soft" size="sm" onPress={onAction} style={{ minHeight: tap }}>
          {actionLabel}
        </ButtonV4>
      ) : null}
    </CardV4>
  );
}
