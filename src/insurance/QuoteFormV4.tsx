import * as React from 'react';
import { cn } from '../primitives/cn';
import { CardV4 } from '../primitives/CardV4';
import { FieldV4 } from '../primitives/FieldV4';
import { SelectV4 } from '../primitives/SelectV4';
import { InputV4 } from '../primitives/InputV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { SpinnerV4 } from '../primitives/SpinnerV4';
import { formatMoney as formatMoneyBase } from '../commerce/money';
import { POLICY_VARIANT, type PolicyVariant } from './internal/status';
import { MIN_TAP_CLASS } from './internal/tone-v4';
import type { MoneyFormatter } from './internal/format';
import type { QuoteFormProps, QuoteValues } from './QuoteForm';

const DEFAULT_DEDUCTIBLES = [50000, 100000, 250000];

/** What this locale writes between the units and the cents. */
function decimalMark(locale?: string): string {
  const parts = new Intl.NumberFormat(locale).formatToParts(1.1);
  return parts.find((part) => part.type === 'decimal')?.value ?? '.';
}

/** A parsed amount, and whether the text was an amount at all. */
interface ParsedAmount {
  cents: number;
  /** `false` when the field holds characters that are not a number. */
  valid: boolean;
}

/**
 * Read a typed amount as integer cents.
 *
 * The base stripped everything but digits and dots and `parseFloat`ed what was
 * left, so `1000,50` — how most of Europe writes a thousand and a half —
 * became `100050`, and the form submitted a quote for **$100,050** against a
 * field reading `1000,50`. Off by a hundred, silently, on the number the
 * premium is priced from.
 *
 * The rule here is the one every payment field ends up at: the **last**
 * separator is the decimal mark when both kinds appear, because grouping never
 * follows the decimal; a lone separator with exactly three digits behind it is
 * grouping unless it is this locale's own decimal mark; anything else is the
 * decimal mark. That reads `1,000.50`, `1.000,50`, `1000,50` and `1,000` the
 * way the person typing them meant them.
 */
function parseAmountCents(text: string, locale?: string): ParsedAmount {
  const trimmed = text.trim();
  if (trimmed === '') return { cents: 0, valid: true };

  const negative = trimmed.startsWith('-');
  const kept: string[] = [];
  for (const char of trimmed) {
    if ((char >= '0' && char <= '9') || char === '.' || char === ',') kept.push(char);
  }
  const cleaned = kept.join('');
  if (!/[0-9]/.test(cleaned)) return { cents: 0, valid: false };

  const lastDot = cleaned.lastIndexOf('.');
  const lastComma = cleaned.lastIndexOf(',');
  const lastMark = Math.max(lastDot, lastComma);

  let whole = cleaned;
  let fraction = '';
  if (lastMark >= 0) {
    const bothKinds = lastDot >= 0 && lastComma >= 0;
    const mark = lastDot > lastComma ? '.' : ',';
    const tail = cleaned.slice(lastMark + 1);
    const onlyOne = cleaned.split(mark).length === 2;
    const isDecimal =
      bothKinds || (onlyOne && (tail.length !== 3 || mark === decimalMark(locale)));
    if (isDecimal) {
      whole = cleaned.slice(0, lastMark);
      fraction = tail;
    }
  }

  const digits = `${whole.replace(/[.,]/g, '')}.${fraction.replace(/[.,]/g, '')}`;
  const value = Number.parseFloat(digits);
  if (!Number.isFinite(value)) return { cents: 0, valid: false };
  return { cents: Math.round(value * 100) * (negative ? -1 : 1), valid: true };
}

export interface QuoteFormV4Props extends QuoteFormProps {
  /** Override the cents → string formatter used in the deductible options. */
  formatMoney?: MoneyFormatter;
  /**
   * BCP-47 locale. Decides how a typed amount is read as well as how the
   * deductible options are printed — the two were allowed to disagree.
   */
  locale?: string;
  /** Shown when the coverage field holds something that is not an amount. */
  invalidAmountLabel?: string;
}

/**
 * **V4 quote form** — same props as {@link QuoteForm} plus `formatMoney`,
 * `locale` and `invalidAmountLabel`.
 *
 * ## Four changes
 *
 * 1. **`1000,50` no longer quotes $100,050.** `toCents` stripped everything
 *    but digits and dots and `parseFloat`ed the remainder, so a comma decimal
 *    mark — the majority of the world — multiplied the coverage by a hundred,
 *    and the form submitted that number while the field on screen still read
 *    `1000,50`. The parse is now separator-aware and takes the caller's
 *    `locale`; text that is not an amount is reported rather than silently
 *    read as `0`.
 * 2. **A prefill that arrives after mount reaches the field.** `coverageCents`
 *    seeded `useState` once and was never read again, so a quote fetched into
 *    a controlled form left the input showing the old text while submitting
 *    the new number — the two most important values on the screen disagreeing
 *    with nobody able to see it. The displayed text is now derived: the
 *    typist's own keystrokes while they agree with the prop, the prop's value
 *    the moment it does not.
 * 3. **A blocked submit says why.** The button went `disabled` with no message
 *    — the base's own comment called it "a no-op" — so a user who typed a
 *    coverage the parse rejected saw a dead button and no reason. The field
 *    now carries the error, and the button's `aria-describedby` points at it.
 * 4. **The controls clear 44 and focus with `ring-ring`.** Nothing in the
 *    module cleared the tap floor, and the ring was `ring-primary-300` — a
 *    ramp step that ignores the seed and mirrors under `[data-theme="dark"]`.
 */
export const QuoteFormV4 = React.forwardRef<HTMLFormElement, QuoteFormV4Props>(
  function QuoteFormV4(
    {
      variants = ['auto', 'home', 'life', 'health'],
      deductibleOptions = DEFAULT_DEDUCTIBLES,
      variant: variantProp,
      coverageCents: coverageProp,
      deductibleCents: deductibleProp,
      currency = 'USD',
      submitLabel = 'Get quote',
      loading = false,
      formatMoney: format,
      locale,
      invalidAmountLabel = 'Enter an amount, for example 25,000',
      onChange,
      onSubmit,
      className,
      ...rest
    },
    ref
  ) {
    const lines = variants.length > 0 ? variants : (['auto'] as PolicyVariant[]);
    const deductibles = deductibleOptions.length > 0 ? deductibleOptions : DEFAULT_DEDUCTIBLES;
    const money: MoneyFormatter =
      format ?? ((cents, code) => formatMoneyBase(cents, code ?? currency, locale));

    const [variant, setVariant] = React.useState<PolicyVariant | undefined>(variantProp);
    const [coverageText, setCoverageText] = React.useState<string>(
      coverageProp != null ? String(coverageProp / 100) : ''
    );
    const [deductibleCents, setDeductibleCents] = React.useState<number>(
      deductibleProp ?? deductibles[0] ?? 0
    );
    const errorId = React.useId();

    const typed = parseAmountCents(coverageText, locale);
    // Derived, not synced: the typist's own text while it still means what the
    // prop says, and the prop the instant a fetch moves it somewhere else.
    const displayText =
      coverageProp != null && coverageProp !== typed.cents
        ? String(coverageProp / 100)
        : coverageText;

    const effVariant = variantProp ?? variant;
    const effCoverage = coverageProp != null ? coverageProp : typed.cents;
    const effDeductible = deductibleProp != null ? deductibleProp : deductibleCents;

    const emit = (next: Partial<QuoteValues>): void => {
      onChange?.({
        variant: next.variant ?? effVariant ?? lines[0]!,
        coverageCents: next.coverageCents ?? effCoverage,
        deductibleCents: next.deductibleCents ?? effDeductible,
      });
    };

    const amountError = !typed.valid && coverageProp == null ? invalidAmountLabel : undefined;
    const isValid = effVariant != null && effCoverage > 0 && amountError == null;

    const submit = (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      if (!isValid || loading) return;
      onSubmit?.({
        variant: effVariant!,
        coverageCents: effCoverage,
        deductibleCents: effDeductible,
      });
    };

    return (
      <CardV4>
        <form ref={ref} className={cn('flex flex-col gap-md', className)} onSubmit={submit} {...rest}>
          <FieldV4 label="Insurance type" required htmlFor="quote-variant">
            <SelectV4
              id="quote-variant"
              value={effVariant ?? ''}
              className={MIN_TAP_CLASS}
              onChange={(event) => {
                const value = event.target.value as PolicyVariant;
                setVariant(value);
                emit({ variant: value });
              }}
            >
              <option value="" disabled>
                Choose a policy type
              </option>
              {lines.map((line) => (
                <option key={line} value={line}>
                  {POLICY_VARIANT[line]?.label ?? line}
                </option>
              ))}
            </SelectV4>
          </FieldV4>

          <FieldV4
            label="Coverage amount"
            required
            error={amountError}
            hint="Enter the benefit amount in dollars"
            htmlFor="quote-coverage"
          >
            <InputV4
              id="quote-coverage"
              inputMode="decimal"
              placeholder="0.00"
              value={displayText}
              invalid={amountError != null}
              aria-describedby={amountError != null ? errorId : undefined}
              className={MIN_TAP_CLASS}
              onChange={(event) => {
                const text = event.target.value;
                setCoverageText(text);
                emit({ coverageCents: parseAmountCents(text, locale).cents });
              }}
            />
          </FieldV4>

          <FieldV4 label="Deductible" htmlFor="quote-deductible">
            <SelectV4
              id="quote-deductible"
              value={String(effDeductible)}
              className={MIN_TAP_CLASS}
              onChange={(event) => {
                const cents = Number.parseInt(event.target.value, 10) || 0;
                setDeductibleCents(cents);
                emit({ deductibleCents: cents });
              }}
            >
              {deductibles.map((cents) => (
                <option key={cents} value={String(cents)}>
                  {money(cents, currency)}
                </option>
              ))}
            </SelectV4>
          </FieldV4>

          {/*
            The reason the button is dead, in text, next to the button. A
            disabled control with no message is the base's "no-op".
          */}
          {amountError != null ? (
            <p id={errorId} className="text-xs font-semibold text-danger-text">
              {amountError}
            </p>
          ) : null}

          <ButtonV4
            type="submit"
            variant="primary"
            disabled={!isValid || loading}
            aria-busy={loading || undefined}
            aria-describedby={amountError != null ? errorId : undefined}
            className={MIN_TAP_CLASS}
          >
            {loading ? <SpinnerV4 size="sm" className="mr-xs" /> : null}
            {submitLabel}
          </ButtonV4>
        </form>
      </CardV4>
    );
  }
);
