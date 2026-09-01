import * as React from 'react';
import type { EquipmentRowProps, EquipmentStatus } from './EquipmentRow';
export interface EquipmentRowV4Props extends EquipmentRowProps {
    /** Override the status words — four English words lived inside. */
    statusLabels?: Partial<Record<EquipmentStatus, string>>;
}
/**
 * **V4 equipment row** — the web twin of the native `EquipmentRowV4`, same
 * props as {@link EquipmentRow} plus `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **The row's name carries the location and the service date.** A register
 *    is read to answer "where is it and when is it next due", and
 *    `` `${name}, ${tag}, ${status}` `` dropped both.
 * 2. **The asset disc is decorative.** It announced the bare word "Equipment"
 *    ahead of the asset's own name.
 * 3. **An interactive row is a real `<button>`** that clears 44 and answers
 *    with a state layer, rather than a `div` carrying `role="button"`, a
 *    `tabIndex` and a hand-written Enter/Space handler.
 * 4. **It joins the shared row family** and its badge takes the module's one
 *    badge shape — the web register was a wall of saturated pills where the
 *    phone showed soft tints.
 */
export declare const EquipmentRowV4: React.ForwardRefExoticComponent<EquipmentRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EquipmentRowV4.d.ts.map