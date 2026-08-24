import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type PolicyVariant } from './internal/status';
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
/**
 * A compact "get a quote" form: pick an insurance line, enter a coverage
 * amount, choose a deductible, and submit. Controlled via `variant`/
 * `coverageCents`/`deductibleCents` or self-managed from internal state.
 * Coverage is entered in dollars and emitted as integer **cents**, so the value
 * bag never carries a float. Submit is blocked (a no-op) until a line and a
 * positive coverage are set. Composed from the native `Field`/`Select`/`Input`/
 * `Button` primitives — token-only, no literal colors.
 */
export declare function QuoteForm({ variants, deductibleOptions, variant: variantProp, coverageCents: coverageProp, deductibleCents: deductibleProp, currency, submitLabel, loading, onChange, onSubmit, style, }: QuoteFormProps): React.ReactElement;
//# sourceMappingURL=QuoteForm.d.ts.map