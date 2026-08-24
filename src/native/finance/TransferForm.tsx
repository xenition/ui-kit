import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button, Field, Select, Input, CurrencyInput } from '../primitives';

/** An account the money can move between. */
export interface TransferAccount {
  id: string;
  label: string;
}

/** The controlled value bag emitted by {@link TransferForm}. */
export interface TransferValues {
  fromAccountId: string;
  toAccountId: string;
  /** Amount in integer **cents**. */
  amountCents: number;
  note: string;
}

export interface TransferFormProps {
  /** Selectable accounts for the from/to pickers. */
  accounts: TransferAccount[];
  /** Currently selected source account id. */
  fromAccountId?: string;
  /** Currently selected destination account id. */
  toAccountId?: string;
  /** Amount in integer **cents** (converted to/from major units for the field). */
  amountCents?: number;
  /** Free-text note. */
  note?: string;
  /** Leading currency glyph for the amount field (default `$`). */
  currencySymbol?: string;
  /** Fires on every field change with the merged {@link TransferValues}. */
  onChange?: (values: TransferValues) => void;
  /** Fires on a valid submit with the merged {@link TransferValues}. */
  onSubmit?: (values: TransferValues) => void;
  /** Submit button label (default `Transfer`). */
  submitLabel?: string;
  /** Show the submit button in its loading state. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A controlled money-transfer form: from/to account {@link Select}s, a
 * {@link CurrencyInput} amount (major units on screen, integer **cents** in the
 * value bag — converted with a single round, no float drift), and an optional
 * note. Every edit emits the full {@link TransferValues} via `onChange`; submit
 * is blocked (and the button disabled) until both accounts differ and the
 * amount is positive. A `danger`-toned validation line appears when the same
 * account is picked twice. Token-bound throughout.
 */
export function TransferForm({
  accounts,
  fromAccountId = '',
  toAccountId = '',
  amountCents = 0,
  note = '',
  currencySymbol = '$',
  onChange,
  onSubmit,
  submitLabel = 'Transfer',
  loading = false,
  style,
}: TransferFormProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const options = accounts.map((a) => ({ label: a.label, value: a.id }));

  const emit = (patch: Partial<TransferValues>): void => {
    onChange?.({ fromAccountId, toAccountId, amountCents, note, ...patch });
  };

  const sameAccount = fromAccountId !== '' && fromAccountId === toAccountId;
  const canSubmit = fromAccountId !== '' && toAccountId !== '' && !sameAccount && amountCents > 0;

  return (
    <View style={[{ gap: tokens.spacing.md }, style]}>
      <Field label="From">
        <Select
          options={options}
          value={fromAccountId || undefined}
          placeholder="Select account"
          onValueChange={(v) => emit({ fromAccountId: v })}
          accessibilityLabel="From account"
        />
      </Field>

      <Field label="To">
        <Select
          options={options}
          value={toAccountId || undefined}
          placeholder="Select account"
          invalid={sameAccount}
          onValueChange={(v) => emit({ toAccountId: v })}
          accessibilityLabel="To account"
        />
      </Field>

      {sameAccount ? (
        <Text style={{ color: colors.dangerText, fontSize: tokens.typography.scale.xs }}>
          Choose two different accounts.
        </Text>
      ) : null}

      <Field label="Amount">
        <CurrencyInput
          value={amountCents === 0 ? null : amountCents / 100}
          symbol={currencySymbol}
          onChange={(n) => emit({ amountCents: n == null ? 0 : Math.round(n * 100) })}
          accessibilityLabel="Transfer amount"
        />
      </Field>

      <Field label="Note">
        <Input
          value={note}
          placeholder="What's this for?"
          onChangeText={(t) => emit({ note: t })}
          accessibilityLabel="Transfer note"
        />
      </Field>

      <Button
        onPress={() => onSubmit?.({ fromAccountId, toAccountId, amountCents, note })}
        disabled={!canSubmit}
        loading={loading}
      >
        {submitLabel}
      </Button>
    </View>
  );
}
