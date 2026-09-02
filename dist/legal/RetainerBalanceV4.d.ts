import * as React from 'react';
import type { RetainerBalanceProps } from './RetainerBalance';
/** Drop-in for {@link RetainerBalanceProps} — same props, the V4 "chambers" design. */
export type RetainerBalanceV4Props = RetainerBalanceProps;
/**
 * RetainerBalance — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on a trust / retainer meter: an elevated rounded
 * card with a soft shadow, a big legible **tabular-nums** balance (money carried
 * as integer cents through the shared `formatMoney`), a labelled glyph + word
 * health pill (never color alone), a fill meter against the initial retainer, and
 * a "Replenish" action when funds run low. Status is derived from the balance vs.
 * a low-water threshold unless overridden. Exposes an ARIA `progressbar`. Reuses
 * the base `variant` (`default` / `compact`). All colors from `--xen-*` token
 * classes (no literals).
 */
export declare const RetainerBalanceV4: React.ForwardRefExoticComponent<RetainerBalanceProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RetainerBalanceV4.d.ts.map