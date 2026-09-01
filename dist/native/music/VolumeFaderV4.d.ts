import * as React from 'react';
import type { VolumeFaderProps } from './VolumeFader';
/** Drop-in for {@link VolumeFaderProps} — same props, the V4 "session" design. */
export type VolumeFaderV4Props = VolumeFaderProps;
/**
 * VolumeFader — **V4** "session" design. The tactile DAW take on a fader: a
 * token well (`withAlpha(colors.primary, 0.15)`) wrapping the `Slider` primitive
 * so the track reads like a real mixing surface, with the name and a **bold
 * tabular read-out** framing it. `muted` is surfaced in both the dimming *and*
 * the a11y label plus a `(muted)` marker (never color alone). Honors both
 * `variant`s (`labeled` / `bare`) and mirrors the base's drop-in behavior
 * exactly: it owns no audio and reports drags through the same `onValueChange` /
 * `onChange` callbacks (the original spelling wins when both are passed).
 * Token-only colors via `useXenitionTheme()`.
 */
export declare function VolumeFaderV4({ value, min, max, step, label, variant, muted, unit, disabled, onValueChange, onChange, style, }: VolumeFaderV4Props): React.ReactElement;
//# sourceMappingURL=VolumeFaderV4.d.ts.map