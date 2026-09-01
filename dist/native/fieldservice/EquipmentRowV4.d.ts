import * as React from 'react';
import type { EquipmentRowProps, EquipmentStatus } from './EquipmentRow';
export interface EquipmentRowV4Props extends EquipmentRowProps {
    /** Override the four condition names — they lived inside the component. */
    statusLabels?: Partial<Record<EquipmentStatus, string>>;
}
/**
 * **V4 equipment row** — same props as {@link EquipmentRow} plus
 * `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **The row announces where the asset is and when it is next due.** Its
 *    name was `"${name}, ${tag}, ${status}"`, which replaces the subtree — so
 *    the location and the service date the row draws were spoken to nobody.
 * 2. **The row is a row from the shared row line**, with a leading slot that
 *    clears 44 and a press that is a state layer rather than `opacity: 0.7` —
 *    0.38 is M3's *disabled* band, so a pressed row read as a dead one.
 * 3. **The badge is the module's one shape** — this twin passed `soft`/`sm`
 *    while the web twin took `Badge`'s `solid`/`md` at all sixteen call sites
 *    in the module.
 * 4. **The caller's `style` lands on the root**, the element the web twin puts
 *    it on.
 *
 * **Renders nothing without a `name`.**
 */
export declare function EquipmentRowV4({ name, assetTag, status, glyph, nextService, location, statusLabels, onPress, style, }: EquipmentRowV4Props): React.ReactElement | null;
//# sourceMappingURL=EquipmentRowV4.d.ts.map