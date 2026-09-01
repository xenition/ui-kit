import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon } from '../primitives';
import { formatMoney, type MoneyFormatter } from './internal/format';
import { GradientSurface } from './internal/GradientSurface';
import { brandGradient, brandInk, brandInkSoft, brandTile, brandBorder } from './internal/brand';

export interface PaymentConfirmationProps {
  /** Amount paid, in integer **cents**. */
  amountCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Confirmation / receipt number to display. */
  confirmationNumber?: string;
  /** Method the payment was made with (e.g. "Visa •••• 4242"). */
  method?: string;
  /** Localized payment date string. */
  date?: string;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
  /** Headline (default "Payment successful"). */
  title?: string;
  /** Fires on the primary "Done" action. */
  onDone?: () => void;
  /** Fires on the "View receipt" action. */
  onViewReceipt?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * The payment success surface — the module's peak moment and the one full
 * brand-gradient ground beyond the account header. A frosted check badge, the
 * headline, and the paid amount (integer cents via `formatMoney`) sit centered
 * in near-white ink over the gradient; the confirmation #, method, and date read
 * as frosted rows. "Done" (a near-white pill) and "View receipt" (a ghost
 * button) each appear only when their handler is set. Every color derives from
 * the brand ramp — no literals, light + dark.
 */
export function PaymentConfirmation({
  amountCents,
  currency = 'USD',
  confirmationNumber,
  method,
  date,
  formatMoney: format = formatMoney,
  title = 'Payment successful',
  onDone,
  onViewReceipt,
  style,
}: PaymentConfirmationProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = brandInk(r);
  const inkSoft = brandInkSoft(r);
  const amount = Math.max(0, Math.trunc(amountCents || 0));

  const Row = ({ label, value }: { label: string; value: string }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: tokens.spacing.md,
        paddingHorizontal: tokens.spacing.md,
        paddingVertical: tokens.spacing.sm,
        borderRadius: tokens.radius.md,
        backgroundColor: brandTile(r),
        borderWidth: 1,
        borderColor: brandBorder(r),
      }}
    >
      <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{label}</Text>
      <Text numberOfLines={1} style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700', flexShrink: 1, textAlign: 'right' }}>
        {value}
      </Text>
    </View>
  );

  return (
    <View style={[{ borderRadius: tokens.radius.lg }, style]}>
      <GradientSurface
        colors={brandGradient(r)}
        style={{ borderRadius: tokens.radius.lg, padding: tokens.spacing.xl, overflow: 'hidden', alignItems: 'center' }}
      >
        <View
          accessibilityRole="image"
          accessibilityLabel={title}
          style={{
            width: 64,
            height: 64,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: brandTile(r, 0.22),
            borderWidth: 1,
            borderColor: brandBorder(r),
          }}
        >
          <Icon glyph="✓" size="2xl" style={{ color: ink }} />
        </View>

        <Text
          accessibilityRole="header"
          style={{ color: ink, fontSize: tokens.typography.scale.xl, fontWeight: '800', marginTop: tokens.spacing.md, textAlign: 'center' }}
        >
          {title}
        </Text>

        <Text
          allowFontScaling={false}
          accessibilityLabel={`Paid ${format(amount, currency)}`}
          style={{ color: ink, fontSize: tokens.typography.scale['3xl'], fontWeight: '800', letterSpacing: -1, marginTop: tokens.spacing.xs }}
        >
          {format(amount, currency)}
        </Text>

        {confirmationNumber || method || date ? (
          <View style={{ alignSelf: 'stretch', gap: tokens.spacing.sm, marginTop: tokens.spacing.lg }}>
            {confirmationNumber ? <Row label="Confirmation" value={confirmationNumber} /> : null}
            {method ? <Row label="Method" value={method} /> : null}
            {date ? <Row label="Date" value={date} /> : null}
          </View>
        ) : null}

        {onDone || onViewReceipt ? (
          <View style={{ alignSelf: 'stretch', gap: tokens.spacing.sm, marginTop: tokens.spacing.lg }}>
            {onDone ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Done"
                onPress={onDone}
                style={({ pressed }) => ({
                  paddingVertical: tokens.spacing.md,
                  borderRadius: tokens.radius.md,
                  alignItems: 'center',
                  backgroundColor: ink,
                  opacity: pressed ? 0.9 : 1,
                })}
              >
                <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>Done</Text>
              </Pressable>
            ) : null}
            {onViewReceipt ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="View receipt"
                onPress={onViewReceipt}
                style={({ pressed }) => ({
                  paddingVertical: tokens.spacing.md,
                  borderRadius: tokens.radius.md,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: brandBorder(r),
                  opacity: pressed ? 0.85 : 1,
                })}
              >
                <Text style={{ color: ink, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>View receipt</Text>
              </Pressable>
            ) : null}
          </View>
        ) : null}
      </GradientSurface>
    </View>
  );
}
