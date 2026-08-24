import * as React from 'react';
import { type UtilityKind } from './internal/status';
export type { UtilityKind };
export interface UsageMeterProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Utility line — drives the leading glyph, label, and default unit. */
    kind: UtilityKind;
    /** Consumption so far this period, in `unit`s. */
    used: number;
    /** Allowance / plan cap for the period, in `unit`s (0 → no cap shown). */
    allowance?: number;
    /** Metered unit override (defaults to the utility's canonical unit). */
    unit?: string;
    /** Decimal places for the printed quantities (default `0`). */
    decimals?: number;
    /** Localized period label (e.g. "This month"). */
    period?: string;
    /** Warn threshold as a fraction of allowance (default `0.8`). */
    warnAt?: number;
    /** Loading skeleton flag — renders a placeholder instead of data. */
    loading?: boolean;
}
/**
 * A consumption gauge for one utility: current usage against an optional
 * allowance, drawn with the token-bound `Progress` bar. The fill tone escalates
 * by threshold (under `warnAt` → primary, over → warn, at/over cap → danger) and
 * the same escalation is echoed in a text percentage, so status is never
 * color-alone. Quantities run through `formatUsage` (fixed decimals, no `NaN`
 * leak) and a zero/absent allowance is guarded to avoid divide-by-zero. Every
 * color traces to a `--xen-*` token. Web parity of the native `UsageMeter`.
 */
export declare const UsageMeter: React.ForwardRefExoticComponent<UsageMeterProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=UsageMeter.d.ts.map