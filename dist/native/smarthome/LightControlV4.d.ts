import * as React from 'react';
import type { LightControlProps } from './LightControl';
/** Drop-in for {@link LightControlProps} — same props, the V4 "ambient" design. */
export type LightControlV4Props = LightControlProps;
/**
 * LightControl — **V4** "ambient" design. The control-panel take on a light: when
 * the bulb is lit the whole card glows — a soft warm-tinted wash
 * (`withAlpha(warn, 0.08)`), a `warn` border, and a glowing bulb disc; off/`offline`
 * stay calm on `card`. A big legible brightness {@link Slider} and an optional
 * warm→cool color-temperature row keep the base controls; a text
 * `On`/`Off`/`Offline` label carries the state so it never rests on color alone.
 * Sliders disable when off or `offline`. Guards keep the brightness readout in
 * `[0,100]`. Same props/behavior as {@link LightControlProps}; token-only colors
 * via `useXenitionTheme()` (+ `withAlpha`).
 */
export declare function LightControlV4({ name, on, brightness, colorTemp, offline, onToggle, onBrightnessChange, onColorTempChange, style, }: LightControlV4Props): React.ReactElement;
//# sourceMappingURL=LightControlV4.d.ts.map