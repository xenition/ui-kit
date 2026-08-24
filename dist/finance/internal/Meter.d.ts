import * as React from 'react';
/**
 * Token color slots a finance bar / glyph can take — the web mirror of the
 * native `keyof SemanticColors` accents actually used in this module, and a
 * superset-safe match for the chart `ChartColor` union.
 */
export type FinanceColor = 'primary' | 'accent' | 'success' | 'warn' | 'danger' | 'muted';
export interface MeterProps {
    /** Fill percentage `0`–`100` (clamped, NaN → 0). */
    value: number;
    /** Token color slot for the fill (default `primary`). */
    color?: FinanceColor;
    /** Announced label for the progress bar. */
    'aria-label'?: string;
    className?: string;
}
/**
 * A thin, token-bound horizontal progress bar — the DOM analog of the native
 * `MiniBar`. A `--xen-border` track holds a `bg-<color>` fill sized by `value`
 * (percent); every color traces to a token class, never a literal.
 */
export declare function Meter({ value, color, 'aria-label': ariaLabel, className, }: MeterProps): React.ReactElement;
//# sourceMappingURL=Meter.d.ts.map