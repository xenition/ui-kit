import * as React from 'react';
import type { PricingToggleProps } from './PricingToggle';
/** Drop-in for {@link PricingToggleProps} — same props, the V4 "showcase" design. */
export type PricingToggleV4Props = PricingToggleProps;
/**
 * PricingToggle — **V4** "showcase" design (web parity of the native V4). A
 * tactile segmented control: a soft-neutral track with a pill-shaped selected
 * segment in `bg-primary text-on-primary` and an optional soft-primary "save X%"
 * chip per option. Reports the active key via `value`/`onChange`, ≥44px targets.
 * Same props/behavior as {@link PricingToggleProps}; token-only colors, no
 * literals.
 */
export declare const PricingToggleV4: React.ForwardRefExoticComponent<PricingToggleProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PricingToggleV4.d.ts.map