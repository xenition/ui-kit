import * as React from 'react';
import type { RetainerBalanceProps } from './RetainerBalance';
/** Same public contract as {@link RetainerBalance} — a drop-in alternate design. */
export type RetainerBalanceV2Props = RetainerBalanceProps;
/**
 * RetainerBalance, redesigned (v2): an **elevated trust card**. The matter label
 * and a status pill head a big balance figure, a fill meter against the initial
 * retainer, and a Replenish CTA when low/depleted. Distinct from v1. Same props,
 * token-only.
 */
export declare const RetainerBalanceV2: React.ForwardRefExoticComponent<RetainerBalanceProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RetainerBalanceV2.d.ts.map