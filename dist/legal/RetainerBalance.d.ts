import * as React from 'react';
import { type RetainerStatus } from './internal';
export type RetainerBalanceVariant = 'default' | 'compact';
export interface RetainerBalanceProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Current trust / retainer balance in integer **cents**. */
    balanceCents: number;
    /**
     * Original / target retainer in integer **cents** — the meter denominator.
     * When omitted the meter is hidden and only the balance is shown.
     */
    initialCents?: number;
    /**
     * Low-balance threshold in integer **cents**. At or below it the status is
     * derived as `low`; at/below zero, `depleted`.
     */
    lowThresholdCents?: number;
    /** ISO 4217 currency (default USD). */
    currency?: string;
    /** Explicit status override — otherwise derived from balance vs. threshold. */
    status?: RetainerStatus;
    /** Client / matter label. */
    label?: string;
    /** Render a placeholder skeleton instead of content. */
    loading?: boolean;
    /** Density. */
    variant?: RetainerBalanceVariant;
    /** Render a "Replenish" action (shown when low / depleted). */
    onReplenish?: () => void;
    testID?: string;
}
/**
 * Trust / retainer balance meter: the current balance carried as integer
 * **cents** and rendered through the shared `formatMoney`, a fill meter against
 * the initial retainer, and a health pill (glyph + word so status never rests on
 * color alone). Status is derived from the balance vs. a low-water threshold
 * unless explicitly overridden. A "Replenish" action surfaces when funds run
 * low. Exposes an ARIA `progressbar`. All colors are `--xen-*` token classes.
 */
export declare const RetainerBalance: React.ForwardRefExoticComponent<RetainerBalanceProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RetainerBalance.d.ts.map