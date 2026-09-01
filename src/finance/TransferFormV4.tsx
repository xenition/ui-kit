import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { ButtonV4 } from '../primitives/ButtonV4';
import { FieldV4 } from '../primitives/FieldV4';
import { InputV4 } from '../primitives/InputV4';
import { SelectV4 } from '../primitives/SelectV4';
import {
  FIELD_V4_CSS,
  FIELD_V4_SHELL,
  FIELD_V4_STYLE_ID,
  fieldBorderClass,
  fieldRingVars,
} from '../primitives/internal/field-v4';
import { TABULAR_CLASS } from './internal/ledger-v4';
import type { TransferFormProps, TransferValues } from './TransferForm';

export interface TransferFormV4Props extends TransferFormProps {
  /**
   * ISO 4217 code for the amount, replacing the loose `currencySymbol` — so
   * the `amountCents` the form emits carries a currency the caller can
   * reconcile rather than a glyph nobody can parse back. `currencySymbol`
   * still wins when it is given.
   */
  currency?: string;
  /** The four visible field labels. Defaults `'From'`, `'To'`, `'Amount'`, `'Note'`. */
  fieldLabels?: { from?: string; to?: string; amount?: string; note?: string };
  /** The validation line. Default `'Choose two different accounts.'`. */
  errorLabel?: string;
}

/** The placeholder inside an empty account picker. */
const SELECT_PLACEHOLDER = 'Select account';
/** The placeholder inside the note field. */
const NOTE_PLACEHOLDER = "What's this for?";

/**
 * The currency's glyph, from `Intl` rather than from a prop the caller has to
 * keep in step with the code the money is actually in.
 */
function symbolOf(currency: string): string {
  try {
    const parts = new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).formatToParts(0);
    return parts.find((part) => part.type === 'currency')?.value ?? currency;
  } catch {
    // An unknown code is the caller's bug, not a reason to blank the screen.
    return currency;
  }
}

/** Digits and at most one dot, with at most two decimals — as typed. */
function sanitizeAmount(raw: string): string {
  const cleaned = raw.replace(/[^0-9.]/g, '');
  const dot = cleaned.indexOf('.');
  if (dot === -1) return cleaned;
  return cleaned.slice(0, dot + 1) + cleaned.slice(dot + 1).replace(/\./g, '').slice(0, 2);
}

/**
 * Major-unit text → integer cents, **without a float**.
 *
 * The base did `Math.round(value * 100)` on a parsed float, in a module whose
 * barrel promises "money is always carried as integer cents … so printed
 * values never drift": `0.145 * 100` is `14.499999999999998`. The digits are
 * already there in the string, so the conversion is a shift, not an
 * arithmetic.
 */
function centsFromText(text: string): number {
  const cleaned = sanitizeAmount(text);
  if (cleaned === '' || cleaned === '.') return 0;
  const dot = cleaned.indexOf('.');
  const whole = dot === -1 ? cleaned : cleaned.slice(0, dot);
  const frac = dot === -1 ? '' : cleaned.slice(dot + 1);
  const minor = `${frac}00`.slice(0, 2);
  const parsed = Number.parseInt(`${whole === '' ? '0' : whole}${minor}`, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

/** Integer cents → major-unit text, by the same shift in reverse. */
function textFromCents(cents: number): string {
  const safe = Math.abs(Number.isFinite(cents) ? Math.trunc(cents) : 0);
  return `${Math.trunc(safe / 100)}.${String(safe % 100).padStart(2, '0')}`;
}

/**
 * **V4 transfer form** — the web twin of the native `TransferFormV4`, same
 * props as {@link TransferForm} plus `currency`, `fieldLabels` and
 * `errorLabel`.
 *
 * ## Five changes
 *
 * 1. **It works when it is dropped in.** Every value prop is optional with a
 *    default, the component held no state, and `onChange` was optional — so
 *    used the way its own barrel documents, the selects never moved, the
 *    amount field never accepted a digit, and `canSubmit`, which requires
 *    `amountCents > 0`, could never become true. The submit button was
 *    **permanently disabled**. It now holds the four values itself when
 *    `onChange` is absent; the controlled path is unchanged.
 * 2. **Money stops round-tripping through a float** — see
 *    {@link centsFromText}.
 * 3. **A typed `0` is not an empty field.** `value={amountCents === 0 ? null
 *    : amountCents / 100}` fed the zero straight back as "cleared", so typing
 *    the `0` of `0.50` wiped the box under the user's fingers and the amount
 *    could not be entered at all. The text the user typed is what the field
 *    shows.
 * 4. **`currency` replaces the loose `currencySymbol`** — see the prop.
 * 5. **The validation line reaches the control.** It was a `<p role="alert">`
 *    floating between two fields, related to the invalid select by proximity
 *    only. `FieldV4` gives it an id, points the select's `aria-describedby` at
 *    it, marks the select invalid and leads it with a glyph, so the state has
 *    a shape as well as a hue.
 */
export const TransferFormV4 = React.forwardRef<HTMLFormElement, TransferFormV4Props>(
  function TransferFormV4(
    {
      accounts,
      fromAccountId = '',
      toAccountId = '',
      amountCents = 0,
      note = '',
      currencySymbol,
      currency = 'USD',
      fieldLabels,
      errorLabel = 'Choose two different accounts.',
      onChange,
      onSubmit,
      submitLabel = 'Transfer',
      loading = false,
      className,
      ...rest
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(FIELD_V4_STYLE_ID, FIELD_V4_CSS);
    }, []);

    const ids = React.useId();
    const fromId = `${ids}-from`;
    const toId = `${ids}-to`;
    const amountId = `${ids}-amount`;
    const noteId = `${ids}-note`;

    // A caller who listens is driving; a caller who does not gets a form that
    // works on its own.
    const controlled = onChange != null;
    const [own, setOwn] = React.useState<TransferValues>({
      fromAccountId,
      toAccountId,
      amountCents,
      note,
    });
    const values: TransferValues = controlled
      ? { fromAccountId, toAccountId, amountCents, note }
      : own;

    // The buffer is what the field shows, so a trailing "." or a leading "0"
    // survives being typed.
    const [amountText, setAmountText] = React.useState(() =>
      amountCents > 0 ? textFromCents(amountCents) : ''
    );
    React.useEffect(() => {
      if (controlled && amountCents !== centsFromText(amountText)) {
        setAmountText(amountCents > 0 ? textFromCents(amountCents) : '');
      }
      // Only an incoming value re-seeds the buffer; the buffer re-seeding
      // itself is the loop that wiped the field.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [controlled, amountCents]);

    const commit = (patch: Partial<TransferValues>): void => {
      const next: TransferValues = { ...values, ...patch };
      if (controlled) onChange?.(next);
      else setOwn(next);
    };

    const sameAccount = values.fromAccountId !== '' && values.fromAccountId === values.toAccountId;
    const canSubmit =
      values.fromAccountId !== '' &&
      values.toAccountId !== '' &&
      !sameAccount &&
      values.amountCents > 0;

    const symbol = currencySymbol ?? symbolOf(currency);
    const labels = {
      from: fieldLabels?.from ?? 'From',
      to: fieldLabels?.to ?? 'To',
      amount: fieldLabels?.amount ?? 'Amount',
      note: fieldLabels?.note ?? 'Note',
    };

    const options = (
      <>
        <option value="" disabled>
          {SELECT_PLACEHOLDER}
        </option>
        {accounts.map((account) => (
          <option key={account.id} value={account.id}>
            {account.label}
          </option>
        ))}
      </>
    );

    return (
      <form
        ref={ref}
        className={cn('flex flex-col gap-md', className)}
        onSubmit={(event) => {
          event.preventDefault();
          if (canSubmit && !loading) onSubmit?.({ ...values });
        }}
        {...rest}
      >
        <FieldV4 label={labels.from} htmlFor={fromId}>
          <SelectV4
            id={fromId}
            value={values.fromAccountId}
            onChange={(event) => commit({ fromAccountId: event.target.value })}
          >
            {options}
          </SelectV4>
        </FieldV4>

        <FieldV4 label={labels.to} htmlFor={toId} error={sameAccount ? errorLabel : undefined}>
          <SelectV4
            id={toId}
            value={values.toAccountId}
            invalid={sameAccount}
            onChange={(event) => commit({ toAccountId: event.target.value })}
          >
            {options}
          </SelectV4>
        </FieldV4>

        <FieldV4 label={labels.amount} htmlFor={amountId}>
          {/*
            The shell carries the ring, so focusing the amount rings the symbol
            with it — the symbol is part of the control. `CurrencyInput` is
            deliberately not used: its value is a major-unit float, which is
            the one thing this form must not carry.
          */}
          <div
            data-xen-v4-shell=""
            style={fieldRingVars(false)}
            className={cn(
              FIELD_V4_SHELL,
              fieldBorderClass(false),
              'flex items-center gap-sm py-sm'
            )}
          >
            <span aria-hidden="true" className="text-base font-semibold text-muted-text">
              {symbol}
            </span>
            <input
              id={amountId}
              type="text"
              inputMode="decimal"
              placeholder="0.00"
              value={amountText}
              onChange={(event) => {
                const next = sanitizeAmount(event.target.value);
                setAmountText(next);
                commit({ amountCents: centsFromText(next) });
              }}
              className={cn(
                'min-w-0 flex-1 border-0 bg-transparent text-right text-base text-on-surface',
                'outline-none placeholder:text-muted-text',
                TABULAR_CLASS
              )}
            />
          </div>
        </FieldV4>

        <FieldV4 label={labels.note} htmlFor={noteId}>
          <InputV4
            id={noteId}
            value={values.note}
            placeholder={NOTE_PLACEHOLDER}
            onChange={(event) => commit({ note: event.target.value })}
          />
        </FieldV4>

        <ButtonV4 type="submit" variant="primary" disabled={!canSubmit || loading}>
          {submitLabel}
        </ButtonV4>
      </form>
    );
  }
);
