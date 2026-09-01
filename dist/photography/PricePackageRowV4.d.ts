import * as React from 'react';
import type { PricePackageRowProps } from './PricePackageRow';
/** Drop-in for {@link PricePackageRowProps} — same props, the V4 "studio" design. */
export type PricePackageRowV4Props = PricePackageRowProps;
/**
 * PricePackageRow — **V4** "studio" design (web parity of the native V4). The
 * clean à-la-carte price line: an elevated surface row (no gradient — pricing
 * stays a crisp, legible surface) with the label set semibold, a muted detail
 * line, and the {@link PriceTag} right-aligned. A `highlighted` row keeps the
 * clean surface but earns a primary ring, a leading ✓ glyph, and a labelled
 * soft-primary chip (`badgeLabel`) — a marker, never color alone. Identical
 * props/behavior to {@link PricePackageRowProps}: honors `formatMoney` and
 * `unitSuffix`; passing `onClick` exposes it as a keyboard-operable `button`
 * (≥44px target) for quote building. All colors from `--xen-*` token classes.
 */
export declare const PricePackageRowV4: React.ForwardRefExoticComponent<PricePackageRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PricePackageRowV4.d.ts.map