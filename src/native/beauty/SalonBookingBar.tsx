import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button } from '../primitives';
import { formatMoney, type MoneyFormatter } from '../commerce/money';

export interface SalonBookingBarProps {
  /** Primary line — the selected service(s) summary. */
  serviceName?: string;
  /** Total price in integer cents. Hidden when omitted. */
  totalCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Secondary line (e.g. "with Ana · Today 3:00 PM · 45 min"). */
  detail?: string;
  /** Override the cents → string money formatter. */
  formatMoney?: MoneyFormatter;
  /** CTA label (default "Book now"). */
  ctaLabel?: string;
  /** Disables the CTA (e.g. nothing selected). */
  disabled?: boolean;
  /** Shows a spinner and blocks the CTA. */
  loading?: boolean;
  /** Empty-state copy shown when no service is selected. */
  emptyLabel?: string;
  /** Fires when the CTA is pressed. */
  onBook?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A sticky salon booking bar for the bottom of a service/stylist screen: a
 * two-line summary (service + price on the left, detail beneath) and a dominant
 * "Book now" CTA. With no `serviceName` it shows an empty prompt and disables
 * the CTA; `loading` shows a spinner. Prices are integer cents via
 * {@link formatMoney}. Token-only colors; the bar reads the `surface`/`border`
 * slots so it restyles with the theme (dark mode included).
 */
export function SalonBookingBar({
  serviceName,
  totalCents,
  currency = 'USD',
  detail,
  formatMoney: format = formatMoney,
  ctaLabel = 'Book now',
  disabled = false,
  loading = false,
  emptyLabel = 'Select a service to book',
  onBook,
  style,
}: SalonBookingBarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const hasSelection = !!serviceName;
  const priceText = totalCents != null ? format(totalCents, currency) : undefined;
  const isDisabled = disabled || loading || !hasSelection;

  return (
    <View
      accessibilityLabel={hasSelection ? `${serviceName}${priceText ? `, ${priceText}` : ''}${detail ? `, ${detail}` : ''}` : emptyLabel}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingHorizontal: tokens.spacing.lg,
          paddingVertical: tokens.spacing.md,
        },
        style,
      ]}
    >
      <View style={{ flex: 1, gap: 2 }}>
        {hasSelection ? (
          <>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }}>
              <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700', flexShrink: 1 }}>
                {serviceName}
              </Text>
              {priceText ? (
                <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>{priceText}</Text>
              ) : null}
            </View>
            {detail ? (
              <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                {detail}
              </Text>
            ) : null}
          </>
        ) : (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
        )}
      </View>

      <Button variant="primary" onPress={onBook} disabled={isDisabled} loading={loading}>
        {ctaLabel}
      </Button>
    </View>
  );
}
