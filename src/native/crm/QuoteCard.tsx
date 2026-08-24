import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card, Badge, Button } from '../primitives';
import { formatMoney } from '../commerce/money';
import { QUOTE_META, type QuoteStatus } from './internal';

export interface QuoteCardProps {
  /** Quote / proposal number (e.g. "Q-1042"). */
  number: string;
  /** Account the quote is for. */
  company?: string;
  /** Grand total in integer **cents**. */
  totalCents: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Number of line items (rendered when > 0). */
  lineItems?: number;
  /** Lifecycle status — glyph + word + tone. */
  status: QuoteStatus;
  /** Pre-formatted validity / expiry date. */
  validUntil?: string;
  /** Optional primary action (e.g. "Send", "Convert"). */
  actionLabel?: string;
  onAction?: () => void;
  onPress?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Card for a sales quote / proposal: number, account, line-item count, grand
 * total (cents → `formatMoney`) and a lifecycle {@link Badge} whose glyph +
 * word carry the status (draft/sent/viewed/accepted/rejected/expired) so it is
 * never color-only. An optional inline action button (`onAction`) drives the
 * next step. All colors are theme tokens.
 */
export function QuoteCard({
  number,
  company,
  totalCents,
  currency = 'USD',
  lineItems,
  status,
  validUntil,
  actionLabel,
  onAction,
  onPress,
  testID,
  style,
}: QuoteCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = QUOTE_META[status];
  const itemsLabel =
    lineItems != null && lineItems > 0 ? `${lineItems} item${lineItems === 1 ? '' : 's'}` : undefined;

  const body = (
    <Card padding="md" style={[{ gap: tokens.spacing.sm }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <View style={{ flex: 1, gap: 1 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{number}</Text>
          {company ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {company}
            </Text>
          ) : null}
        </View>
        <View accessibilityLabel={`Status ${meta.label}`}>
          <Badge tone={meta.tone} variant="soft" size="sm">
            {`${meta.glyph} ${meta.label}`}
          </Badge>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>
          {formatMoney(totalCents, currency)}
        </Text>
        {itemsLabel || validUntil ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {[itemsLabel, validUntil].filter(Boolean).join(' · ')}
          </Text>
        ) : null}
      </View>

      {actionLabel && onAction ? (
        <Button variant="soft" size="sm" onPress={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </Card>
  );

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`Quote ${number}`} onPress={onPress} testID={testID}>
        {body}
      </Pressable>
    );
  }
  return <View testID={testID}>{body}</View>;
}
