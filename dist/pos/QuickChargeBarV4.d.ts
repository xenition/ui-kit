import * as React from 'react';
import type { QuickChargeBarProps } from './QuickChargeBar';
/** Drop-in for {@link QuickChargeBarProps} — same props, the V4 "register" design. */
export type QuickChargeBarV4Props = QuickChargeBarProps;
/**
 * QuickChargeBar — **V4** "register" design (web parity of the native V4). The
 * checkout peak: the running **total is big and bold** in `tabular-nums` on the
 * crisp bar, and the large (≥44px) **Charge** button sits on the brand gradient
 * (`bg-gradient-to-br from-primary-500 to-primary-700`) with the total repeated
 * in near-white ink — the moment the counter is built around. An empty cart
 * (`itemCount === 0`) disables charging and swaps the total for the `emptyLabel`
 * hint, so the empty state reads by text + the button's `disabled` attribute,
 * never color alone. `loading` maps to `disabled` + an inline `Spinner`. Same
 * props/behavior as {@link QuickChargeBarProps}; all colors from `--xen-*` token
 * classes and the primary gradient utilities (no literals).
 */
export declare const QuickChargeBarV4: React.ForwardRefExoticComponent<QuickChargeBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=QuickChargeBarV4.d.ts.map