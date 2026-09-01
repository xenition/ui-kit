import * as React from 'react';
import type { EnergyTipProps } from './EnergyTip';
/** Drop-in for {@link EnergyTipProps} — same props, a different design. */
export type EnergyTipV4Props = EnergyTipProps;
/**
 * EnergyTip — **V4** design. A clean, elevated tip card: the category glyph in
 * the signature brand-gradient disc, a category eyebrow + optional effort tag, a
 * headline + body, and an optional estimated monthly saving badge (integer cents
 * via `formatMoney`, so the figure never drifts). Becomes a `role="button"`
 * surface only when `onClick` is supplied. Same props/categories/behavior as
 * {@link EnergyTipProps}; token-only colors.
 */
export declare const EnergyTipV4: React.ForwardRefExoticComponent<EnergyTipProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EnergyTipV4.d.ts.map