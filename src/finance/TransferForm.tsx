import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import { Field } from '../primitives/Field';
import { Select } from '../primitives/Select';
import { Input } from '../primitives/Input';
import { CurrencyInput } from '../primitives/CurrencyInput';

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

export interface TransferFormProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onChange' | 'onSubmit'> {
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
  /** Disable the submit button (e.g. an in-flight request). */
  loading?: boolean;
}

/**
 * A controlled money-transfer form: from/to account {@link Select}s, a
 * {@link CurrencyInput} amount (major units on screen, integer **cents** in the
 * value bag — converted with a single round, no float drift), and an optional
 * note. Every edit emits the full {@link TransferValues} via `onChange`; submit
 * is blocked (and the button disabled) until both accounts differ and the
 * amount is positive. A `danger`-toned validation line appears when the same
 * account is picked twice. Token-bound throughout. Web parity of the native
 * `TransferForm`.
 */
export const TransferForm = React.forwardRef<HTMLFormElement, TransferFormProps>(function TransferForm(
  {
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
    className,
    ...rest
  },
  ref
) {
  const emit = (patch: Partial<TransferValues>): void => {
    onChange?.({ fromAccountId, toAccountId, amountCents, note, ...patch });
  };

  const sameAccount = fromAccountId !== '' && fromAccountId === toAccountId;
  const canSubmit = fromAccountId !== '' && toAccountId !== '' && !sameAccount && amountCents > 0;

  return (
    <form
      ref={ref}
      className={cn('flex flex-col gap-[var(--xen-space-md)]', className)}
      onSubmit={(event) => {
        event.preventDefault();
        if (canSubmit && !loading) onSubmit?.({ fromAccountId, toAccountId, amountCents, note });
      }}
      {...rest}
    >
      <Field label="From">
        <Select
          value={fromAccountId}
          onChange={(event) => emit({ fromAccountId: event.target.value })}
          aria-label="From account"
        >
          <option value="" disabled>
            Select account
          </option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.label}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="To">
        <Select
          value={toAccountId}
          invalid={sameAccount}
          onChange={(event) => emit({ toAccountId: event.target.value })}
          aria-label="To account"
        >
          <option value="" disabled>
            Select account
          </option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.label}
            </option>
          ))}
        </Select>
      </Field>

      {sameAccount ? (
        <p className="text-xs text-danger" role="alert">
          Choose two different accounts.
        </p>
      ) : null}

      <Field label="Amount">
        <CurrencyInput
          value={amountCents === 0 ? null : amountCents / 100}
          symbol={currencySymbol}
          onChange={(value) => emit({ amountCents: value == null ? 0 : Math.round(value * 100) })}
          accessibilityLabel="Transfer amount"
        />
      </Field>

      <Field label="Note">
        <Input
          value={note}
          placeholder="What's this for?"
          onChange={(event) => emit({ note: event.target.value })}
          aria-label="Transfer note"
        />
      </Field>

      <Button type="submit" disabled={!canSubmit || loading}>
        {submitLabel}
      </Button>
    </form>
  );
});
