import * as React from 'react';
import type { VolumeFaderProps } from './VolumeFader';
/** Drop-in for {@link VolumeFaderProps} — same props, the V4 "session" design. */
export type VolumeFaderV4Props = VolumeFaderProps;
/**
 * VolumeFader — **V4** "session" design (web parity of the native V4). The
 * tactile DAW take on a fader: a token well (`bg-primary/15`) wrapping the
 * `Slider` primitive so the track reads like a real mixing surface, with the
 * name and a **bold tabular-nums** read-out framing it. `muted` is surfaced in
 * both the dimming *and* the a11y label plus a `(muted)` marker (never color
 * alone). Honors both `variant`s (`labeled` / `bare`) and mirrors the base's
 * drop-in behavior exactly: it owns no audio and reports drags through the same
 * `onValueChange` / `onChange` callbacks (the original spelling wins when both
 * are passed). All colors from `--xen-*` token classes (no literals).
 */
export declare const VolumeFaderV4: React.ForwardRefExoticComponent<VolumeFaderProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VolumeFaderV4.d.ts.map