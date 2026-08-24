import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Input, Button, formatMoney } from '../primitives';

export interface MakeOfferFormProps {
  /** The listing's asking price in cents; shown as context when provided. */
  listPriceCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Minimum acceptable offer in cents; offers below are rejected inline. */
  minOfferCents?: number;
  /** Include a free-text message field. Default `false`. */
  withMessage?: boolean;
  /** Submit button label (default "Send offer"). */
  submitLabel?: string;
  /** Show a spinner and block submission. */
  loading?: boolean;
  /**
   * Fires with the parsed offer in integer cents (and the optional message)
   * once the input is a valid amount at/above `minOfferCents`.
   */
  onSubmit?: (offerCents: number, message?: string) => void;
  /** testID applied to the amount input (defaults to `xen-mkt-offer-amount`). */
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/** Parse a currency string ("1,250.50") into integer cents, or null. */
function parseCents(raw: string): number | null {
  const cleaned = raw.replace(/[^0-9.]/g, '');
  if (cleaned === '' || cleaned === '.') return null;
  const value = Number.parseFloat(cleaned);
  if (!Number.isFinite(value) || value <= 0) return null;
  return Math.round(value * 100);
}

/**
 * A make-an-offer form for a listing — an amount field (major units, parsed to
 * integer cents), an optional message, and a submit action. Self-contained
 * validation: empty/invalid amounts and amounts below `minOfferCents` disable
 * submit and surface an inline, token-styled error (state carried by text, not
 * color alone). Presentational: nothing is sent; a valid submit calls
 * `onSubmit(offerCents, message?)`. Reuses `Input`, `Button`, and the shared
 * `formatMoney`; token-only colors via `useXenitionTheme()`.
 */
export function MakeOfferForm({
  listPriceCents,
  currency = 'USD',
  minOfferCents,
  withMessage = false,
  submitLabel = 'Send offer',
  loading = false,
  onSubmit,
  testID = 'xen-mkt-offer-amount',
  style,
}: MakeOfferFormProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [amount, setAmount] = React.useState('');
  const [message, setMessage] = React.useState('');

  const cents = parseCents(amount);
  const belowMin = cents != null && typeof minOfferCents === 'number' && cents < minOfferCents;
  const valid = cents != null && !belowMin;
  const error = amount.length > 0 && cents == null
    ? 'Enter a valid amount'
    : belowMin
      ? `Offer must be at least ${formatMoney(minOfferCents as number, currency)}`
      : undefined;

  const submit = (): void => {
    if (!valid || loading) return;
    onSubmit?.(cents as number, withMessage && message.trim() ? message.trim() : undefined);
  };

  return (
    <View
      style={[
        {
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          padding: tokens.spacing.lg,
        },
        style,
      ]}
    >
      {typeof listPriceCents === 'number' ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {`Asking ${formatMoney(listPriceCents, currency)}`}
        </Text>
      ) : null}
      <Input
        testID={testID}
        label="Your offer"
        keyboardType="numeric"
        placeholder="0.00"
        value={amount}
        onChangeText={setAmount}
        invalid={error != null}
        accessibilityLabel="Offer amount"
      />
      {withMessage ? (
        <Input
          testID="xen-mkt-offer-message"
          label="Message (optional)"
          placeholder="Add a note to the seller"
          value={message}
          onChangeText={setMessage}
          multiline
        />
      ) : null}
      {error ? (
        <Text style={{ color: colors.danger, fontSize: tokens.typography.scale.sm }}>{error}</Text>
      ) : null}
      <Button variant="primary" onPress={submit} disabled={!valid} loading={loading}>
        {submitLabel}
      </Button>
    </View>
  );
}
