import * as React from 'react';
import { type ShipmentStatus } from './internal';
export interface PackageRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Package / parcel id (headline). */
    packageId: string;
    /** Human contents description or SKU. */
    contents?: string;
    /** Weight amount in the given `weightUnit`. */
    weight?: number;
    /** Weight unit (default `kg`). */
    weightUnit?: 'kg' | 'lb' | 'g' | 'oz';
    /** Dimensions string (e.g. `30×20×15 cm`). */
    dimensions?: string;
    /** Lifecycle status — glyph + word badge, never color alone. */
    status?: ShipmentStatus;
    /** Selection state (adds a primary border + a11y selected state). */
    selected?: boolean;
    /** Makes the row clickable. */
    onClick?: () => void;
}
/**
 * Dense list row for a single package: id headline, contents/SKU sub-line, a
 * weight + dimensions metric line, and an optional glyph + word status badge.
 * Clickable when `onClick` is given (button role + descriptive label). Selection
 * is shown by a primary border plus `aria-selected`, not by color alone (the
 * status still carries a word). All colors are theme tokens. Web parity of the
 * native `PackageRow`.
 */
export declare const PackageRow: React.ForwardRefExoticComponent<PackageRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PackageRow.d.ts.map