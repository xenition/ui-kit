import * as React from 'react';
import type { ThermostatDialProps } from './ThermostatDial';
/** Drop-in for {@link ThermostatDialProps} — same props, the V4 "ambient" design. */
export type ThermostatDialV4Props = ThermostatDialProps;
/**
 * ThermostatDial — **V4** "ambient" design. A calm climate dial: the big target
 * numeral sits centered over an optional ambient reading inside a token-bound SVG
 * dial (drawn with the `react-native-svg` peer). A 270° track (`border`) carries a
 * value arc filled in the mode accent (`heat`→warn, `cool`→primary, `auto`→accent,
 * `off`→muted); when running, the dial disc lights with a soft accent wash so the
 * active mode glows. Framing `+`/`−` `Pressable`s step the target within
 * `[min,max]`, and a text label announces the mode (never color alone).
 * `max`/`min` guard the fraction math against divide-by-zero. `offline` dims the
 * dial and blocks changes. Same props/behavior as {@link ThermostatDialProps};
 * token-only colors via `useXenitionTheme()` (+ `withAlpha`).
 */
export declare function ThermostatDialV4({ target, ambient, min, max, step, mode, unit, size, onTargetChange, offline, style, }: ThermostatDialV4Props): React.ReactElement;
//# sourceMappingURL=ThermostatDialV4.d.ts.map