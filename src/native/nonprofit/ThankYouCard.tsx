import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { formatMoney, withAlpha } from './internal';

/** Visual treatment of a {@link ThankYouCard}. */
export type ThankYouCardVariant = 'default' | 'celebratory';

export interface ThankYouCardProps {
  /** Recipient of the thanks; omit for an anonymous gift. */
  donorName?: string;
  /** The gift amount, integer **cents** (rendered when provided). */
  amountCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Custom headline (defaults to a thank-you built from the name). */
  headline?: string;
  /** Supporting message / mission line. */
  message?: string;
  /** Optional concrete impact line, e.g. `Funds 40 meals`. */
  impactLabel?: string;
  /** Visual treatment. `celebratory` adds a tinted accent panel. */
  variant?: ThankYouCardVariant;
  /** Fires when the share action is pressed (rendered when provided). */
  onShare?: () => void;
  /** Fires when the receipt action is pressed (rendered when provided). */
  onViewReceipt?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A post-donation confirmation card: a celebratory glyph, a thank-you headline
 * (optionally naming the donor and their gift amount in integer cents), a
 * mission message, an optional concrete impact line, and share / receipt
 * actions. `celebratory` renders on a tinted accent panel (`withAlpha`). All
 * colors come from the compiled theme tokens — no literal colors.
 */
export function ThankYouCard({
  donorName,
  amountCents,
  currency = 'USD',
  headline,
  message,
  impactLabel,
  variant = 'default',
  onShare,
  onViewReceipt,
  style,
}: ThankYouCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const celebratory = variant === 'celebratory';

  const resolvedHeadline = headline ?? (donorName ? `Thank you, ${donorName}!` : 'Thank you for your gift!');

  return (
    <View
      accessibilityRole="summary"
      accessibilityLabel={resolvedHeadline}
      style={[
        {
          alignItems: 'center',
          gap: tokens.spacing.sm,
          padding: tokens.spacing.lg,
          borderRadius: tokens.radius.lg,
          borderWidth: celebratory ? 0 : 1,
          borderColor: colors.border,
          backgroundColor: celebratory ? withAlpha(colors.primary, 0.1) : colors.surface,
        },
        style,
      ]}
    >
      <View
        style={{
          width: tokens.spacing['2xl'],
          height: tokens.spacing['2xl'],
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(colors.success, 0.16),
        }}
      >
        <Icon glyph="🎉" size="xl" />
      </View>

      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800', textAlign: 'center' }}>
        {resolvedHeadline}
      </Text>

      {typeof amountCents === 'number' ? (
        <Text style={{ color: colors.primary, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>
          {formatMoney(amountCents, currency)}
        </Text>
      ) : null}

      {message ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }}>{message}</Text>
      ) : null}

      {impactLabel ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, paddingVertical: tokens.spacing.xs, paddingHorizontal: tokens.spacing.md, borderRadius: tokens.radius.full, backgroundColor: withAlpha(colors.success, 0.12) }}>
          <Icon glyph="🌱" size="sm" />
          <Text style={{ color: colors.success, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{impactLabel}</Text>
        </View>
      ) : null}

      {onShare || onViewReceipt ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }}>
          {onShare ? (
            <Button variant="primary" onPress={onShare}>Share</Button>
          ) : null}
          {onViewReceipt ? (
            <Button variant="outline" onPress={onViewReceipt}>View receipt</Button>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
