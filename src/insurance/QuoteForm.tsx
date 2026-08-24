import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Field } from '../primitives/Field';
import { Select } from '../primitives/Select';
import { Input } from '../primitives/Input';
import { Button } from '../primitives/Button';
import { Spinner } from '../primitives/Spinner';
import { formatMoney } from './internal/format';
import { POLICY_VARIANT, type PolicyVariant } from './internal/status';

/** The value bag emitted by {@link QuoteForm}. Amounts are integer **cents**. */
export interface QuoteValues {
  /** Line of insurance being quoted. */
  variant: PolicyVariant;
  /** Requested coverage amount in integer **cents**. */
  coverageCents: number;
  /** Chosen deductible in integer **cents**. */
  deductibleCents: number;
}

export interface QuoteFormProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onChange' | 'onSubmit'> {
  /** Which insurance lines to offer (default: all four). */
  variants?: PolicyVariant[];
  /** Deductible choices in integer **cents** (default 500/1000/2500). */
  deductibleOptions?: number[];
  /** Controlled selected line. */
  variant?: PolicyVariant;
  /** Controlled coverage amount in integer **cents**. */
  coverageCents?: number;
  /** Controlled deductible in integer **cents**. */
  deductibleCents?: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Submit button label (default "Get quote"). */
  submitLabel?: string;
  /** Show a spinner and block the submit button. */
  loading?: boolean;
  /** Fires on every field edit with the current (partial-safe) value bag. */
  onChange?: (values: QuoteValues) => void;
  /** Fires with the value bag when the form is valid and submitted. */
  onSubmit?: (values: QuoteValues) => void;
}

/** Parse a decimal-dollars string into integer cents (guards NaN). */
function toCents(text: string): number {
  const n = Number.parseFloat(text.replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? Math.round(n * 100) : 0;
}

const DEFAULT_DEDUCTIBLES = [50000, 100000, 250000];

/**
 * A compact "get a quote" form: pick an insurance line, enter a coverage
 * amount, choose a deductible, and submit. Controlled via `variant`/
 * `coverageCents`/`deductibleCents` or self-managed from internal state.
 * Coverage is entered in dollars and emitted as integer **cents**, so the value
 * bag never carries a float. Submit is blocked (a no-op) until a line and a
 * positive coverage are set. Composed from the web `Field`/`Select`/`Input`/
 * `Button` primitives — token-only, no literal colors. Web parity of the native
 * `QuoteForm` (`loading` shows an inline `Spinner`, since the web `Button` has
 * no `loading` prop).
 */
export const QuoteForm = React.forwardRef<HTMLFormElement, QuoteFormProps>(function QuoteForm(
  {
    variants = ['auto', 'home', 'life', 'health'],
    deductibleOptions = DEFAULT_DEDUCTIBLES,
    variant: variantProp,
    coverageCents: coverageProp,
    deductibleCents: deductibleProp,
    currency = 'USD',
    submitLabel = 'Get quote',
    loading = false,
    onChange,
    onSubmit,
    className,
    ...rest
  },
  ref
) {
  const lines = variants.length > 0 ? variants : (['auto'] as PolicyVariant[]);
  const deductibles = deductibleOptions.length > 0 ? deductibleOptions : DEFAULT_DEDUCTIBLES;

  const [variant, setVariant] = React.useState<PolicyVariant | undefined>(variantProp);
  const [coverageText, setCoverageText] = React.useState<string>(
    coverageProp != null ? String(coverageProp / 100) : ''
  );
  const [deductibleCents, setDeductibleCents] = React.useState<number>(
    deductibleProp ?? deductibles[0] ?? 0
  );

  const effVariant = variantProp ?? variant;
  const effCoverage = coverageProp != null ? coverageProp : toCents(coverageText);
  const effDeductible = deductibleProp != null ? deductibleProp : deductibleCents;

  const emit = (next: Partial<QuoteValues>): void => {
    onChange?.({
      variant: next.variant ?? effVariant ?? lines[0]!,
      coverageCents: next.coverageCents ?? effCoverage,
      deductibleCents: next.deductibleCents ?? effDeductible,
    });
  };

  const isValid = effVariant != null && effCoverage > 0;

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
    <Card>
      <form
        ref={ref}
        className={cn('flex flex-col gap-[var(--xen-space-md)]', className)}
        onSubmit={submit}
        {...rest}
      >
        <Field label="Insurance type" required htmlFor="quote-variant">
          <Select
            id="quote-variant"
            value={effVariant ?? ''}
            aria-label="Insurance type"
            onChange={(event) => {
              const v = event.target.value as PolicyVariant;
              setVariant(v);
              emit({ variant: v });
            }}
          >
            <option value="" disabled>
              Choose a policy type
            </option>
            {lines.map((v) => (
              <option key={v} value={v}>
                {POLICY_VARIANT[v]?.label ?? v}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          label="Coverage amount"
          required
          hint="Enter the benefit amount in dollars"
          htmlFor="quote-coverage"
        >
          <Input
            id="quote-coverage"
            inputMode="decimal"
            placeholder="0.00"
            value={coverageText}
            aria-label="Coverage amount"
            onChange={(event) => {
              const t = event.target.value;
              setCoverageText(t);
              emit({ coverageCents: toCents(t) });
            }}
          />
        </Field>

        <Field label="Deductible" htmlFor="quote-deductible">
          <Select
            id="quote-deductible"
            value={String(effDeductible)}
            aria-label="Deductible"
            onChange={(event) => {
              const c = Number.parseInt(event.target.value, 10) || 0;
              setDeductibleCents(c);
              emit({ deductibleCents: c });
            }}
          >
            {deductibles.map((c) => (
              <option key={c} value={String(c)}>
                {formatMoney(c, currency)}
              </option>
            ))}
          </Select>
        </Field>

        <Button type="submit" variant="primary" disabled={!isValid || loading} aria-busy={loading || undefined}>
          {loading ? <Spinner size="sm" className="mr-2" /> : null}
          {submitLabel}
        </Button>
      </form>
    </Card>
  );
});
