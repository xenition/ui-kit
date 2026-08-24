import * as React from 'react';
import type { ThermostatDialProps } from './ThermostatDial';
/** Same public contract as {@link ThermostatDial} — a drop-in alternate design. */
export type ThermostatDialV2Props = ThermostatDialProps;
/**
 * ThermostatDial, redesigned (v2): a **bold progress dial**. The setpoint arc
 * sweeps a thick ring (mode-accented) around a large centered temperature with
 * the ambient reading and mode beneath, flanked by big −/+ controls. A punchier
 * dial than v1 — same arc/token approach. Same props, token-only.
 */
export declare const ThermostatDialV2: React.ForwardRefExoticComponent<ThermostatDialProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ThermostatDialV2.d.ts.map