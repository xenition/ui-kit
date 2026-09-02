import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { FieldV4 } from '../primitives/FieldV4';
import { InputV4 } from '../primitives/InputV4';
import { SelectV4 } from '../primitives/SelectV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { formatMoney, type MoneyFormatter } from '../../commerce/money';
import { POLICY_LINE_V4 } from './internal/tone-v4';
import type { QuoteFormProps, QuoteValues } from './QuoteForm';
import type { PolicyVariant } from './internal/status';
import type { SelectOption } from '../primitives/SelectV4';

export interface QuoteFormV4Props extends QuoteFormProps {
  /**
   * Format the deductible choices. Default: the kit-wide `formatMoney`, which
   * every other component in this module already funnels through.
   */
  formatMoney?: MoneyFormatter;
  /** BCP-47 locale for the default money formatter and the amount parser. */
  locale?: string;
  /**
   * Shown under the coverage field when what was typed is not an amount.
   *
   * Default `'Enter an amount, for example 25,000'`. The base read anything
   * unparseable as `0` and disabled the submit with no explanation, which is
   * indistinguishable from a form that has stopped working.
   */
  invalidAmountLabel?: string;
}

const DEFAULT_DEDUCTIBLES = [50000, 100000, 250000];

/**
 * Parse a typed amount into integer **cents**, honouring the locale's
 * separators. `null` when the text is not an amount at all — which the base had
 * no way to say, because it returned `0` for both "nothing typed yet" and
 * "this is not a number".
 *
 * The base did `Number.parseFloat(text.replace(/[^0-9.]/g, ''))`. In every
 * locale that groups with a dot and decimalises with a comma — most of Europe,
 * most of Latin America — a user typing `1000,50` had the comma stripped and
 * the digits run together, so `1000,50` became `100050` and the form submitted
 * a request for **$100,050 of cover** while the field read `1000,50`. A user
 * typing `1.000,50` fared worse still.
 *
 * The rule here is positional rather than locale-table-driven, because it has
 * to be right for a user who types the wrong separator too: whichever of `.`
 * and `,` appears **last** is the decimal point, unless it is followed by
 * exactly three digits and is the only separator of its kind, in which case it
 * is a thousands group. The locale only decides the tie when a single
 * separator has one or two digits after it and could be either.
 */
function parseAmountToCents(text: string, locale?: string): number | null {
  const cleaned = text.replace(/[^\d.,-]/g, '');
  // Something was typed and none of it was a digit: not an amount.
  if (!/\d/.test(cleaned)) return text.trim() === '' ? 0 : null;

  const lastDot = cleaned.lastIndexOf('.');
  const lastComma = cleaned.lastIndexOf(',');
  const cut = Math.max(lastDot, lastComma);

  let whole = cleaned;
  let fraction = '';
  if (cut >= 0) {
    const tail = cleaned.slice(cut + 1);
    const separator = cleaned[cut] as '.' | ',';
    const only = (separator === '.' ? lastComma : lastDot) === -1;
    const occurrences = cleaned.split(separator).length - 1;
    // Three trailing digits behind the only separator of its kind is a group,
    // not a fraction: `1.000` is a thousand, not one and a tenth.
    const grouping =
      only && occurrences >= 1 && tail.length === 3 && !isDecimalMark(separator, locale);
    if (!grouping && tail.length > 0 && tail.length <= 2) {
      whole = cleaned.slice(0, cut);
      fraction = tail;
    } else if (!grouping && tail.length > 2) {
      whole = cleaned.slice(0, cut);
      fraction = tail.slice(0, 2);
    }
  }

  const negative = whole.startsWith('-');
  const digits = whole.replace(/\D/g, '');
  const units = digits === '' ? 0 : Number.parseInt(digits, 10);
  const cents = units * 100 + Number.parseInt(fraction.padEnd(2, '0') || '0', 10);
  // A negative amount of cover is not a small amount of cover.
  return negative ? null : cents;
}

/** Whether this locale writes its decimal point with the given mark. */
function isDecimalMark(mark: '.' | ',', locale?: string): boolean {
  const formatted = new Intl.NumberFormat(locale).format(1.1);
  return formatted.includes(mark);
}

/** Render cents back into the text the input shows. */
function centsToText(cents: number, locale?: string): string {
  const value = (Number.isFinite(cents) ? cents : 0) / 100;
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
    useGrouping: false,
  }).format(value);
}

/**
 * **V4 quote form** — same props as {@link QuoteForm} plus `formatMoney`,
 * `locale` and `invalidAmountLabel`.
 *
 * ## Four changes
 *
 * 1. **`1000,50` no longer asks for $100,050 of cover.** `toCents` stripped
 *    everything but digits and dots and then `parseFloat`ed the remains, so a
 *    comma-decimal locale had its separator deleted and its digits
 *    concatenated. The parser is separator-aware now — see
 *    {@link parseAmountToCents} — and, where the base read anything
 *    unparseable as a silent `0`, it rejects and the field says so with
 *    `invalidAmountLabel`. It stays inside this file rather than moving to a
 *    shared pure module, so both twins land without a third file appearing
 *    under either of them mid-flight.
 * 2. **A prefill that arrives from a fetch reaches the field.** `coverageCents`
 *    seeded `React.useState` and was never read again, so the visible input
 *    kept the old text while `effCoverage` submitted the new number: the screen
 *    showed one figure and the request carried another. The text follows the
 *    controlled prop.
 * 3. **The deductible labels come from the module's money home.** They were
 *    built inline as `(c / 100).toLocaleString(undefined, { style: 'currency',
 *    currency })` — a second, private spelling of money in a module whose whole
 *    contract is that every amount goes through one formatter. With
 *    `currency="JPY"` that label and the `deductibleCents` payload beside it
 *    disagreed by 100×, and no `formatMoney` override existed to correct it.
 *    There is one now, and a `locale` for the default.
 * 4. **Every control clears 44** and the form is built from the V4 field line,
 *    so its focus ring, its error ink and its press layer are the ones the rest
 *    of the kit uses rather than the base primitives' own.
 *
 * The field labels stay English on both twins. They are not in the shared prop
 * table, and a `labels` bag on one twin only would be the parity break this
 * line exists to avoid.
 */
export function QuoteFormV4({
  variants = ['auto', 'home', 'life', 'health'],
  deductibleOptions = DEFAULT_DEDUCTIBLES,
  variant: variantProp,
  coverageCents: coverageProp,
  deductibleCents: deductibleProp,
  currency = 'USD',
  submitLabel = 'Get quote',
  loading = false,
  locale,
  invalidAmountLabel = 'Enter an amount, for example 25,000',
  formatMoney: format,
  onChange,
  onSubmit,
  style,
}: QuoteFormV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();

  const lines = variants.length > 0 ? variants : (['auto'] as PolicyVariant[]);
  const deductibles = deductibleOptions.length > 0 ? deductibleOptions : DEFAULT_DEDUCTIBLES;
  const money = React.useMemo<MoneyFormatter>(
    () => format ?? ((cents, code) => formatMoney(cents, code, locale)),
    [format, locale]
  );

  const [variant, setVariant] = React.useState<PolicyVariant | undefined>(variantProp);
  const [coverageText, setCoverageText] = React.useState<string>(
    coverageProp != null ? centsToText(coverageProp, locale) : ''
  );
  const [deductibleCents, setDeductibleCents] = React.useState<number>(
    deductibleProp ?? deductibles[0] ?? 0
  );

  const effVariant = variantProp ?? variant;
  const typed = parseAmountToCents(coverageText, locale);
  // Only a rejection the user can see: an empty field is not yet an error.
  const amountInvalid = coverageProp == null && coverageText.trim() !== '' && typed == null;
  const effCoverage = coverageProp != null ? coverageProp : (typed ?? 0);
  const effDeductible = deductibleProp != null ? deductibleProp : deductibleCents;

  /*
    Change 2. Only re-seeds when the controlled value actually differs from what
    the field currently parses to, so a user mid-keystroke is not fighting the
    effect: typing `12.` parses to 1200, matches, and the text is left alone.
  */
  React.useEffect(() => {
    if (coverageProp == null) return;
    setCoverageText((current) =>
      parseAmountToCents(current, locale) === coverageProp
        ? current
        : centsToText(coverageProp, locale)
    );
  }, [coverageProp, locale]);

  const emit = React.useCallback(
    (next: Partial<QuoteValues>): void => {
      onChange?.({
        variant: next.variant ?? effVariant ?? lines[0]!,
        coverageCents: next.coverageCents ?? effCoverage,
        deductibleCents: next.deductibleCents ?? effDeductible,
      });
    },
    [onChange, effVariant, effCoverage, effDeductible, lines]
  );

  const variantOptions: SelectOption[] = lines.map((v) => ({
    value: v,
    label: POLICY_LINE_V4[v]?.label ?? v,
  }));
  const deductibleSelectOptions: SelectOption[] = deductibles.map((c) => ({
    value: String(c),
    label: money(c, currency),
  }));

  const valid = effVariant != null && !amountInvalid && effCoverage > 0;
  const tap = minTap(tokens.spacing);

  const submit = (): void => {
    if (!valid || loading || effVariant == null) return;
    onSubmit?.({
      variant: effVariant,
      coverageCents: effCoverage,
      deductibleCents: effDeductible,
    });
  };

  return (
    <CardV4 style={style}>
      <View style={{ gap: tokens.spacing.md }}>
        <FieldV4 label="Insurance type" required>
          <SelectV4
            options={variantOptions}
            value={effVariant}
            placeholder="Choose a policy type"
            accessibilityLabel="Insurance type"
            onValueChange={(v) => {
              setVariant(v as PolicyVariant);
              emit({ variant: v as PolicyVariant });
            }}
          />
        </FieldV4>

        <FieldV4
          label="Coverage amount"
          required
          hint="Enter the benefit amount"
          error={amountInvalid ? invalidAmountLabel : undefined}
        >
          <InputV4
            keyboardType="numeric"
            placeholder="0.00"
            value={coverageText}
            invalid={amountInvalid}
            accessibilityLabel="Coverage amount"
            style={{ minHeight: tap }}
            onChangeText={(t) => {
              setCoverageText(t);
              emit({ coverageCents: parseAmountToCents(t, locale) ?? 0 });
            }}
          />
        </FieldV4>

        <FieldV4 label="Deductible">
          <SelectV4
            options={deductibleSelectOptions}
            value={String(effDeductible)}
            accessibilityLabel="Deductible"
            onValueChange={(v) => {
              const c = Number.parseInt(v, 10) || 0;
              setDeductibleCents(c);
              emit({ deductibleCents: c });
            }}
          />
        </FieldV4>

        <ButtonV4
          variant="primary"
          onPress={submit}
          disabled={!valid}
          loading={loading}
          accessibilityLabel={submitLabel}
          style={{ minHeight: tap }}
        >
          {submitLabel}
        </ButtonV4>
      </View>
    </CardV4>
  );
}
