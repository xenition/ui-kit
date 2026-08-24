import * as React from 'react';
import { type UtilityKind } from './internal/status';
export type { UtilityKind };
export interface MeterReadingProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Utility line — drives the leading glyph, label, and default unit. */
    kind: UtilityKind;
    /** Prior reading value (in `unit`s). */
    previous: number;
    /** Current reading value (in `unit`s). */
    current: number;
    /** Metered unit override (defaults to the utility's canonical unit). */
    unit?: string;
    /** Decimal places for the printed quantities (default `0`). */
    decimals?: number;
    /** Localized reading date (e.g. "Read Aug 1"). */
    date?: string;
    /** How the reading was captured. */
    source?: 'estimated' | 'actual' | 'customer';
}
/**
 * A meter reading entry: previous and current dial values with the derived
 * consumption between them. Consumption is `current − previous`, guarded to
 * never render negative (a rollover / correction clamps to 0) and always printed
 * via `formatUsage` (fixed decimals, no `NaN` leak). A "source" tag distinguishes
 * an estimated read from an actual one. Every color traces to a `--xen-*` token.
 * Web parity of the native `MeterReading`.
 */
export declare const MeterReading: React.ForwardRefExoticComponent<MeterReadingProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MeterReading.d.ts.map