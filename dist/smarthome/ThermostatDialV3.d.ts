import * as React from 'react';
import type { ThermostatDialProps } from './ThermostatDial';
/** Same public contract as {@link ThermostatDial} — a drop-in alternate design. */
export type ThermostatDialV3Props = ThermostatDialProps;
/**
 * ThermostatDial, redesigned (v3): a **compact stepper row**. No dial — a −/+ pair
 * flanks the large setpoint, with the mode + ambient reading beneath, sized for a
 * device list row. The minimal counterpart to v2's dial. Same props (`size` is
 * accepted for parity), token-only.
 */
export declare const ThermostatDialV3: React.ForwardRefExoticComponent<ThermostatDialProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ThermostatDialV3.d.ts.map