import * as React from 'react';
import type { ComparisonTableProps } from './ComparisonTable';
/** Drop-in for {@link ComparisonTableProps} — same props, the V4 "showcase" design. */
export type ComparisonTableV4Props = ComparisonTableProps;
/**
 * ComparisonTable — **V4** "showcase" design (native mirror of the web V4). A
 * clean bordered feature-comparison matrix in a horizontal `ScrollView`: plan
 * `columns` across the top × feature `rows` down the side. ✓ = success glyph,
 * ✗ = muted glyph (never color alone), text cells pass through, and the
 * highlighted/recommended column gets a soft-primary tint plus a soft-primary
 * chip. Same props/behavior as {@link ComparisonTableProps}; token-only colors,
 * no literals.
 */
export declare function ComparisonTableV4({ columns, rows, featureLabel, highlightLabel, style, }: ComparisonTableV4Props): React.ReactElement;
//# sourceMappingURL=ComparisonTableV4.d.ts.map