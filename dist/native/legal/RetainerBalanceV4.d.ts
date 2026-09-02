import * as React from 'react';
import type { RetainerBalanceProps } from './RetainerBalance';
/** Drop-in for {@link RetainerBalanceProps} — same props, the V4 "chambers" design. */
export type RetainerBalanceV4Props = RetainerBalanceProps;
/**
 * RetainerBalance — **V4** "chambers" design (native twin of the web V4). An
 * elevated rounded card with a soft shadow, a big legible **tabular-nums**
 * balance (money carried as integer cents through the shared `formatMoney`), a
 * labelled glyph + word health pill (never color alone), a fill meter against the
 * initial retainer, and a "Replenish" action when funds run low. Exposes an ARIA
 * `progressbar`. Reuses the base `variant` (`default` / `compact`). Token-only
 * colors via `useXenitionTheme()`.
 */
export declare function RetainerBalanceV4({ balanceCents, initialCents, lowThresholdCents, currency, status, label, loading, variant, onReplenish, testID, style, }: RetainerBalanceV4Props): React.ReactElement;
//# sourceMappingURL=RetainerBalanceV4.d.ts.map