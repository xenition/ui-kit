import * as React from 'react';
import type { BPMControlProps } from './BPMControl';
/** Drop-in for {@link BPMControlProps} — same props, the V4 "session" design. */
export type BPMControlV4Props = BPMControlProps;
/**
 * BPMControl — **V4** "session" design (native parity of the web V4). The
 * tactile take on a tempo control: big **bold tabular numerals** on a rounded
 * token surface, flanked by satisfying ≥44px round −/＋ steppers. Honors every
 * `variant` — `stepper` (readout + steppers), `inline` (compact single-row),
 * and `tap` (adds a soft-primary "Tap" tempo button firing `onTap`). Steps
 * clamp to `[min, max]` via `clamp` and render through `formatBpm`; `playing`
 * lights a non-color `♪` marker. No gradient — transport controls stay
 * clean/tactile. Token-only colors via `useXenitionTheme()`.
 */
export declare function BPMControlV4({ value, min, max, step, variant, playing, disabled, onChange, onTap, style, }: BPMControlV4Props): React.ReactElement;
//# sourceMappingURL=BPMControlV4.d.ts.map