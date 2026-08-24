import * as React from 'react';
import type { RetainerBalanceProps } from './RetainerBalance';
/** Alternate design — identical Props to {@link RetainerBalance}, drop-in swap. */
export type RetainerBalanceV2Props = RetainerBalanceProps;
/** Alternate design — identical Props to {@link RetainerBalance}, drop-in swap. */
export type RetainerBalanceV3Props = RetainerBalanceProps;
/**
 * RetainerBalance, design v2 — an **elevated card** with a bold balance readout,
 * a health pill, a thick tinted **fill meter** with a percentage caption, and a
 * "Replenish" call to action when funds run low. Same Props as
 * {@link RetainerBalance}; a richer dashboard tile vs. the flat original.
 * Token-pure; status is a glyph + word, never color alone.
 */
export declare function RetainerBalanceV2({ balanceCents, initialCents, lowThresholdCents, currency, status, label, loading, variant, onReplenish, testID, style, }: RetainerBalanceV2Props): React.ReactElement;
/**
 * RetainerBalance, design v3 — a **minimal balance row**: label + balance on the
 * left, health pill on the right, above a thin token fill meter. Same Props as
 * {@link RetainerBalance}; no card chrome, for dense summaries. Token-pure;
 * status stays a glyph + word, never color alone.
 */
export declare function RetainerBalanceV3({ balanceCents, initialCents, lowThresholdCents, currency, status, label, loading, onReplenish, testID, style, }: RetainerBalanceV3Props): React.ReactElement;
//# sourceMappingURL=RetainerBalanceVariants.d.ts.map