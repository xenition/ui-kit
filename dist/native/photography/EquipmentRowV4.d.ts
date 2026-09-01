import * as React from 'react';
import type { EquipmentRowProps } from './EquipmentRow';
/** Drop-in for {@link EquipmentRowProps} — same props, the V4 "studio" design. */
export type EquipmentRowV4Props = EquipmentRowProps;
/**
 * EquipmentRow — **V4** "studio" design (native parity of the web V4). The matted
 * take on a gear-inventory row: an elevated clean-surface row whose leading
 * `glyph` (default 📷) floats inside a thin neutral **mat**, a bold gear name, a
 * muted `category` line, the `meta` (qty / serial) as a small soft-primary chip,
 * and a trailing availability `Badge` carrying glyph + token tone + label (never
 * color alone). Identical props/behavior to {@link EquipmentRowProps}; optional
 * `onPress` exposes the row as a `button`. Token-only colors via
 * `useXenitionTheme()`.
 */
export declare function EquipmentRowV4({ name, category, glyph, status, meta, onPress, style, }: EquipmentRowV4Props): React.ReactElement;
//# sourceMappingURL=EquipmentRowV4.d.ts.map