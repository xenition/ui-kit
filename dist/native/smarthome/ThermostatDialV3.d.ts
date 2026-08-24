import * as React from 'react';
import type { ThermostatDialProps } from './ThermostatDial';
/** Alternate design (V3) — identical prop contract to {@link ThermostatDialProps}. */
export type ThermostatDialV3Props = ThermostatDialProps;
/**
 * ThermostatDial — alternate design **V3**: a minimal +/- stepper card, no SVG.
 * A big center setpoint (with optional ambient sub-line) is flanked by large
 * `−`/`+` `Pressable`s, and the mode is announced by a text {@link Badge} so it
 * never rests on color alone. Drop-in replacement for `ThermostatDial` — same
 * props — for tight layouts where a full dial is too heavy. `span`/clamping
 * guard the setpoint math and `offline` dims + disables the steppers.
 */
export declare function ThermostatDialV3({ target, ambient, min, max, step, mode, unit, onTargetChange, offline, style, }: ThermostatDialV3Props): React.ReactElement;
//# sourceMappingURL=ThermostatDialV3.d.ts.map