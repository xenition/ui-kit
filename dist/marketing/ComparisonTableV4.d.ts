import * as React from 'react';
import type { ComparisonTableProps } from './ComparisonTable';
/** Drop-in for {@link ComparisonTableProps} — same props, the V4 "showcase" design. */
export type ComparisonTableV4Props = ComparisonTableProps;
/**
 * ComparisonTable — **V4** "showcase" design (web parity of the native V4). A
 * clean bordered feature-comparison grid: plan `columns` across the top ×
 * feature `rows` down the side. ✓ = success glyph, ✗ = muted glyph (never color
 * alone), text cells pass through, and the highlighted/recommended column gets a
 * soft-primary tint plus a soft-primary chip. Same props/behavior as
 * {@link ComparisonTableProps}; token-only colors, no literals.
 */
export declare const ComparisonTableV4: React.ForwardRefExoticComponent<ComparisonTableProps & React.RefAttributes<HTMLTableElement>>;
//# sourceMappingURL=ComparisonTableV4.d.ts.map