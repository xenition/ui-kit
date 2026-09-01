import * as React from 'react';
import type { RatePlanCardProps } from './RatePlanCard';
/** Drop-in for {@link RatePlanCardProps} — same props, a different design. */
export type RatePlanCardV4Props = RatePlanCardProps;
/**
 * RatePlanCard — **V4** design. A clean, elevated rate-plan card: the
 * rate-structure glyph in the signature brand-gradient disc, a per-unit price
 * headline (integer cents via `formatMoney`, so it never drifts), an optional
 * feature list, and a select action. The `selected` state stays conveyed by a
 * badge + label + an accent ring (never color alone) and the CTA becomes inert.
 * Same props/variants as {@link RatePlanCardProps}; token-only colors.
 */
export declare function RatePlanCardV4({ name, variant, rateCents, unit, term, features, selected, currency, formatMoney: format, selectLabel, onSelect, style, }: RatePlanCardV4Props): React.ReactElement;
//# sourceMappingURL=RatePlanCardV4.d.ts.map