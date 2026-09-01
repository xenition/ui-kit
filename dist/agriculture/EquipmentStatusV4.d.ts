import * as React from 'react';
import type { EquipmentState, EquipmentStatusProps } from './EquipmentStatus';
export interface EquipmentStatusV4Props extends EquipmentStatusProps {
    /** Override the state names — four English words lived inside the component. */
    stateLabels?: Partial<Record<EquipmentState, string>>;
    /**
     * Below this fuel percentage the meter turns `warn`. Default `20`, which the
     * base hard-coded — and a threshold that is right for a tractor is not right
     * for a generator running a cold store.
     */
    lowFuelThreshold?: number;
}
/**
 * **V4 equipment status** — the web twin of the native `EquipmentStatusV4`,
 * same props as {@link EquipmentStatus} plus `stateLabels` and
 * `lowFuelThreshold`.
 *
 * ## Four changes
 *
 * 1. **The low-fuel threshold is a prop.** 20% was a constant inside the
 *    component, and it is a fleet decision, not a design-system one.
 * 2. **An interactive card is a `<button>`**, with the shared hover layer.
 * 3. **The state's ink is the contrast-corrected slot** — `*-text` — where the
 *    base put the fill slots directly on text.
 * 4. **The fuel and hours figures are tabular**, so a column of machines lines
 *    up.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export declare const EquipmentStatusV4: React.ForwardRefExoticComponent<EquipmentStatusV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EquipmentStatusV4.d.ts.map