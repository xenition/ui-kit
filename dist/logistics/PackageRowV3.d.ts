import * as React from 'react';
import type { PackageRowProps } from './PackageRow';
/** Drop-in for {@link PackageRow}: identical props, a distinct design. */
export type PackageRowV3Props = PackageRowProps;
/**
 * PackageRow, alternate design **V3** — an *ultra-dense single line*. A small
 * inline package glyph, the id, then `contents · weight · dims` collapsed into
 * one muted meta segment, and a trailing status glyph + word — all on one row
 * with no card chrome, tuned for long scannable manifests. Selection shows as a
 * leading token accent bar plus `aria-selected` (never color alone). Same props.
 */
export declare const PackageRowV3: React.ForwardRefExoticComponent<PackageRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PackageRowV3.d.ts.map