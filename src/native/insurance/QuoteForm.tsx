import * as React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Card, Field, Select, Input, Button, type SelectOption } from '../primitives';
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

export interface QuoteFormProps {
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
  style?: StyleProp<ViewStyle>;
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
 * positive coverage are set. Composed from the native `Field`/`Select`/`Input`/
 * `Button` primitives — token-only, no literal colors.
 */
export function QuoteForm({
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
  style,
}: QuoteFormProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
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
    label: POLICY_VARIANT[v]?.label ?? v,
  }));
  const deductibleSelectOptions: SelectOption[] = deductibles.map((c) => ({
    value: String(c),
    label: (c / 100).toLocaleString(undefined, { style: 'currency', currency }),
  }));

  const isValid = effVariant != null && effCoverage > 0;

  const submit = (): void => {
    if (!isValid || loading) return;
    onSubmit?.({
      variant: effVariant!,
      coverageCents: effCoverage,
      deductibleCents: effDeductible,
    });
  };

  return (
    <Card style={style}>
      <View style={{ gap: tokens.spacing.md }}>
        <Field label="Insurance type" required>
          <Select
            options={variantOptions}
            value={effVariant}
            placeholder="Choose a policy type"
            onValueChange={(v) => {
              setVariant(v as PolicyVariant);
              emit({ variant: v as PolicyVariant });
            }}
          />
        </Field>

        <Field label="Coverage amount" required hint="Enter the benefit amount in dollars">
          <Input
            keyboardType="numeric"
            placeholder="0.00"
            value={coverageText}
            accessibilityLabel="Coverage amount"
            onChangeText={(t) => {
              setCoverageText(t);
              emit({ coverageCents: toCents(t) });
            }}
          />
        </Field>

        <Field label="Deductible">
          <Select
            options={deductibleSelectOptions}
            value={String(effDeductible)}
            onValueChange={(v) => {
              const c = Number.parseInt(v, 10) || 0;
              setDeductibleCents(c);
              emit({ deductibleCents: c });
            }}
          />
        </Field>

        <Button variant="primary" onPress={submit} disabled={!isValid} loading={loading}>
          {submitLabel}
        </Button>
      </View>
    </Card>
  );
}
