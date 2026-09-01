import * as React from 'react';
import type { EquipmentRowProps } from './EquipmentRow';
/** Drop-in for {@link EquipmentRowProps} — same props, the V4 "studio" design. */
export type EquipmentRowV4Props = EquipmentRowProps;
/**
 * EquipmentRow — **V4** "studio" design (web parity of the native V4). The matted
 * take on a gear-inventory row: an elevated clean-surface row whose leading
 * `glyph` (default 📷) floats inside a thin neutral **mat**, a bold gear name, a
 * muted `category` line, the `meta` (qty / serial) as a small soft-primary chip,
 * and a trailing availability `Badge` carrying glyph + token tone + label (never
 * color alone). Identical props/behavior to {@link EquipmentRowProps}; passing
 * `onClick` makes the whole row a keyboard-operable `button`. All colors from
 * `--xen-*` token classes.
 */
export declare const EquipmentRowV4: React.ForwardRefExoticComponent<EquipmentRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EquipmentRowV4.d.ts.map