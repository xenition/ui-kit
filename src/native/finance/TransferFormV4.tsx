import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CurrencyInputV4 } from '../primitives/CurrencyInputV4';
import { FieldV4 } from '../primitives/FieldV4';
import { InputV4 } from '../primitives/InputV4';
import { SelectV4 } from '../primitives/SelectV4';
import type { TransferFormProps, TransferValues } from './TransferForm';

export interface TransferFormV4Props extends TransferFormProps {
  /**
   * ISO 4217 code for the amount. Supplies the field's symbol and — more to
   * the point — travels with the emitted `amountCents`, which `currencySymbol`
   * never could.
   */
  currency?: string;
  /** The four field labels, which are also the controls' spoken names. */
  fieldLabels?: { from?: string; to?: string; amount?: string; note?: string };
  /** Shown when the same account is picked twice. */
  errorLabel?: string;
}

/** Minor units per major unit. Two, everywhere the kit carries money. */
const CENTS_DIGITS = 2;

/**
 * A major-unit amount as exact integer cents.
 *
 * `Math.round(value * 100)` is the one place a float touched a balance in a
 * module whose barrel promises "money is always carried as integer cents … so
 * printed values never drift" — and it drifts: `0.145 * 100` is
 * `14.499999999999998`, which rounds a cent short. `Number.prototype.toString`
 * gives the shortest decimal that round-trips, so moving the point in **text**
 * is exact where multiplying is not. Exponent notation is the one shape that
 * has no decimal point to move; nothing typed into a currency field reaches
 * it, and it falls back rather than mis-parsing.
 */
function toCents(value: number | null | undefined): number {
  if (value == null || !Number.isFinite(value)) return 0;
  const text = value.toString();
  if (text.includes('e') || text.includes('E')) return Math.round(value * 100);
  const negative = text.startsWith('-');
  const [whole, fraction = ''] = (negative ? text.slice(1) : text).split('.');
  const minor = Number(`${fraction}00`.slice(0, CENTS_DIGITS));
  const dropped = fraction.slice(CENTS_DIGITS);
  const carry = dropped !== '' && Number(dropped[0]) >= 5 ? 1 : 0;
  const cents = Number(whole) * 100 + minor + carry;
  return negative ? -cents : cents;
}

/** The currency's own glyph, from the code, rather than a loose `'$'`. */
function symbolOf(currency: string): string {
  try {
    const parts = new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
    }).formatToParts(0);
    return parts.find((part) => part.type === 'currency')?.value ?? currency;
  } catch {
    return currency;
  }
}

/**
 * **V4 transfer form** — same props as {@link TransferForm} plus `currency`,
 * `fieldLabels` and `errorLabel`.
 *
 * ## Five changes
 *
 * 1. **It works when it is dropped in.** Every value prop is optional with a
 *    default, the component held no state, and `onChange` is optional — so a
 *    form used the way its own barrel documents never moved: the selects did
 *    not change, the amount field did not accept a number, and `canSubmit`,
 *    which needs `amountCents > 0`, could never become true. **The submit
 *    button was permanently disabled.** V4 holds the four values itself when
 *    there is no `onChange`; the controlled path is untouched.
 * 2. **Money stops round-tripping through a float.** See {@link toCents}.
 * 3. **`currency` replaces the loose `currencySymbol`**, so the emitted
 *    `amountCents` carries a currency the caller can reconcile. The symbol is
 *    derived from it; an explicit `currencySymbol` still wins.
 * 4. **An amount of exactly zero is not an empty field.** `value={amountCents
 *    === 0 ? null : …}` erased a typed `0` on the next render, so the field
 *    fought anyone entering an amount that begins with one.
 * 5. **The validation message is announced and attached.** It was a silent
 *    `Text` beside the control, so a reader on the "To" select heard the label
 *    and nothing about what was wrong with it. It is now the field's own
 *    `error`, which announces on arrival and reaches the control as a hint.
 */
export function TransferFormV4({
  accounts,
  fromAccountId = '',
  toAccountId = '',
  amountCents = 0,
  note = '',
  currency = 'USD',
  currencySymbol,
  fieldLabels,
  errorLabel = 'Choose two different accounts.',
  onChange,
  onSubmit,
  submitLabel = 'Transfer',
  loading = false,
  style,
}: TransferFormV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();

  const labels = {
    from: fieldLabels?.from ?? 'From',
    to: fieldLabels?.to ?? 'To',
    amount: fieldLabels?.amount ?? 'Amount',
    note: fieldLabels?.note ?? 'Note',
  };

  // A form with no `onChange` is uncontrolled, and holds its own values —
  // otherwise nothing it renders can ever move.
  const controlled = onChange != null;
  const [own, setOwn] = React.useState<TransferValues>(() => ({
    fromAccountId,
    toAccountId,
    amountCents,
    note,
  }));
  const values = controlled ? { fromAccountId, toAccountId, amountCents, note } : own;

  // A typed `0` is a value. Without this the field clears itself the moment it
  // is entered, because zero and "empty" were the same state.
  const [zeroEntered, setZeroEntered] = React.useState(false);

  const emit = (patch: Partial<TransferValues>): void => {
    const next = { ...values, ...patch };
    if (!controlled) setOwn(next);
    onChange?.(next);
  };

  const options = React.useMemo(
    () => accounts.map((account) => ({ label: account.label, value: account.id })),
    [accounts]
  );
  const symbol = React.useMemo(
    () => currencySymbol ?? symbolOf(currency),
    [currencySymbol, currency]
  );

  const sameAccount = values.fromAccountId !== '' && values.fromAccountId === values.toAccountId;
  const canSubmit =
    values.fromAccountId !== '' &&
    values.toAccountId !== '' &&
    !sameAccount &&
    values.amountCents > 0;

  const amountValue =
    values.amountCents !== 0 ? values.amountCents / 100 : zeroEntered ? 0 : null;

  return (
    <View style={[{ gap: tokens.spacing.md }, style]}>
      <FieldV4 label={labels.from}>
        <SelectV4
          options={options}
          value={values.fromAccountId || undefined}
          placeholder="Select account"
          onValueChange={(value) => emit({ fromAccountId: value })}
          accessibilityLabel={labels.from}
        />
      </FieldV4>

      {/* The message belongs to the field it is about: `FieldV4` announces it
          on arrival and hands it to the control as a hint. */}
      <FieldV4 label={labels.to} error={sameAccount ? errorLabel : undefined}>
        <SelectV4
          options={options}
          value={values.toAccountId || undefined}
          placeholder="Select account"
          invalid={sameAccount}
          onValueChange={(value) => emit({ toAccountId: value })}
          accessibilityLabel={labels.to}
        />
      </FieldV4>

      <FieldV4 label={labels.amount}>
        <CurrencyInputV4
          value={amountValue}
          symbol={symbol}
          onChange={(major) => {
            setZeroEntered(major === 0);
            emit({ amountCents: toCents(major) });
          }}
          accessibilityLabel={labels.amount}
        />
      </FieldV4>

      <FieldV4 label={labels.note}>
        <InputV4
          value={values.note}
          placeholder="What's this for?"
          onChangeText={(text) => emit({ note: text })}
          accessibilityLabel={labels.note}
        />
      </FieldV4>

      <ButtonV4 onPress={() => onSubmit?.({ ...values })} disabled={!canSubmit} loading={loading}>
        {submitLabel}
      </ButtonV4>
    </View>
  );
}
