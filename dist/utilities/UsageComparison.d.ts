import * as React from 'react';
import { type UtilityKind } from './internal/status';
export interface UsageComparisonProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Utility line — picks the glyph and the default unit. */
    kind: UtilityKind;
    /** This period's metered quantity. */
    current: number;
    /** The prior period's metered quantity. */
    previous: number;
    /** Unit label; defaults to the kind's meter unit (e.g. "kWh"). */
    unit?: string;
    /** Human label for the comparison window (default "last period"). */
    period?: string;
    /** Fixed decimals for the rendered quantities (default 0). */
    decimals?: number;
}
/**
 * This period vs last (web parity) — the clean, trust-first usage card: the
 * utility glyph in a small brand-gradient disc, the current quantity big
 * (`formatUsage`), and a delta chip that spells out the change in **words + an
 * arrow** (never color alone): more usage reads `warn` (⬆), less reads `success`
 * (⬇), equal is muted. Two thin bars compare current against previous by ratio.
 * Token-only colors.
 */
export declare const UsageComparison: React.ForwardRefExoticComponent<UsageComparisonProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=UsageComparison.d.ts.map