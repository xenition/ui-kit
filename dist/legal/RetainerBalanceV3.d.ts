import * as React from 'react';
import type { RetainerBalanceProps } from './RetainerBalance';
/** Same public contract as {@link RetainerBalance} — a drop-in alternate design. */
export type RetainerBalanceV3Props = RetainerBalanceProps;
/**
 * RetainerBalance, redesigned (v3): a **compact trust row**. The matter label over
 * the balance, an inline status word, and a small Replenish when low — hairline-
 * bordered for a matter list. The opposite of v2's card. Same props, token-only.
 */
export declare const RetainerBalanceV3: React.ForwardRefExoticComponent<RetainerBalanceProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RetainerBalanceV3.d.ts.map