import * as React from 'react';
import type { PackageRowProps } from './PackageRow';
/** V4 layout choices for the "dispatch" design. */
export type PackageRowLayout = 'full' | 'compact';
/** Drop-in for {@link PackageRowProps} — same props, the V4 "dispatch" design. */
export interface PackageRowV4Props extends PackageRowProps {
    /** V4 layout: `full` (default) or `compact` (denser single line). */
    variant?: PackageRowLayout;
}
/**
 * PackageRow — **V4** "dispatch" design (native twin of the web V4). The
 * confident, operations-desk take on a parcel row: an elevated rounded row with
 * a soft shadow, a parcel glyph in a soft-primary well, the package-id headline,
 * a contents sub-line, a weight · dimensions metric chip, and a labelled glyph +
 * word status badge (never color alone). Selection shows a primary border;
 * tappable when `onPress` is set. Honors the V4 `variant` — `full` (default) and
 * `compact` (a denser single line). Token-only colors via `useXenitionTheme()`.
 */
export declare function PackageRowV4({ packageId, contents, weight, weightUnit, dimensions, status, selected, variant, onPress, testID, style, }: PackageRowV4Props): React.ReactElement;
//# sourceMappingURL=PackageRowV4.d.ts.map