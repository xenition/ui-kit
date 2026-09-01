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
 * **V4 equipment status** — same props as {@link EquipmentStatus} plus
 * `stateLabels` and `lowFuelThreshold`.
 *
 * ## Four changes
 *
 * 1. **The low-fuel threshold is a prop.** 20% was a constant inside the
 *    component, and it is a fleet decision, not a design-system one.
 * 2. **Press is a state layer**, not `opacity: 0.85`.
 * 3. **The state's ink is the contrast-corrected slot** — `mutedText`,
 *    `successText`, `warnText`, `dangerText` — where the base put the *fill*
 *    slots (`muted`, `success`, …) directly on text.
 * 4. **Type comes from `TextV4`**, and the fuel and hours figures are tabular
 *    so a column of machines lines up.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export declare function EquipmentStatusV4({ name, type, icon, state, fuelPct, fuelLabel, hours, stateLabels, lowFuelThreshold, onPress, style, }: EquipmentStatusV4Props): React.ReactElement | null;
//# sourceMappingURL=EquipmentStatusV4.d.ts.map