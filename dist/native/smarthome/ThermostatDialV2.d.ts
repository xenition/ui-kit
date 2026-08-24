import * as React from 'react';
import type { ThermostatDialProps } from './ThermostatDial';
/** Alternate design (V2) — identical prop contract to {@link ThermostatDialProps}. */
export type ThermostatDialV2Props = ThermostatDialProps;
/**
 * ThermostatDial — alternate design **V2**: a large circular SVG dial whose
 * value arc is painted with a cool→warm **temperature gradient** (a token-stop
 * `LinearGradient`: `primary`→`accent`→`danger`) instead of a single accent, so
 * the fill reads as a heat scale at a glance. The setpoint sits large in the
 * center over an optional ambient reading and a text mode label (never color
 * alone), and framing `−`/`+` `Pressable`s step the target within `[min,max]`.
 * Drop-in replacement for `ThermostatDial` — same props. The `span` is guarded
 * against divide-by-zero and `offline` dims + disables the dial.
 */
export declare function ThermostatDialV2({ target, ambient, min, max, step, mode, unit, size, onTargetChange, offline, style, }: ThermostatDialV2Props): React.ReactElement;
//# sourceMappingURL=ThermostatDialV2.d.ts.map