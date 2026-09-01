import * as React from 'react';
import type { QuickChargeBarProps } from './QuickChargeBar';
/** Drop-in for {@link QuickChargeBarProps} — same props, the V4 "register" design. */
export type QuickChargeBarV4Props = QuickChargeBarProps;
/**
 * QuickChargeBar — **V4** "register" design. The checkout peak: the running
 * **total is big and bold** (integer **cents** via `formatMoney`) on the crisp
 * bar, and the large (≥44px) **Charge** button sits on the brand gradient
 * (`registerGradient`) with the total repeated in near-white `registerInk` — the
 * moment the counter is built around. An empty cart (`itemCount === 0`) disables
 * charging and swaps the total for the `emptyLabel` hint, so the empty state
 * reads by text + the button's `accessibilityState.disabled`, never color alone.
 * `loading` shows a spinner and blocks the charge. Same props/behavior as
 * {@link QuickChargeBarProps}; token-only colors (bar surface via
 * `useXenitionTheme()`, gradient via `GradientSurface`).
 */
export declare function QuickChargeBarV4({ totalCents, currency, itemCount, onCharge, chargeLabel, loading, disabled, emptyLabel, secondaryAction, variant, testID, style, }: QuickChargeBarV4Props): React.ReactElement;
//# sourceMappingURL=QuickChargeBarV4.d.ts.map