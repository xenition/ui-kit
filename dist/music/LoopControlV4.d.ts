import * as React from 'react';
import type { LoopControlProps } from './LoopControl';
/** Drop-in for {@link LoopControlProps} — same props, the V4 "session" design. */
export type LoopControlV4Props = LoopControlProps;
/**
 * LoopControl — **V4** "session" design (web parity of the native V4). The
 * tactile loop control: a rounded toggle whose on state reads through a
 * soft-primary fill **and** a `🔁` glyph + "On"/"Off" label (never color
 * alone), plus — in the `bar` variant — a chunky region strip over `totalBars`
 * with the `[start, end]` region lit, driven by ≥44px −/＋ steppers reporting
 * through `onRegionChange`. The `inline` variant collapses to a bold
 * tabular-nums `Bars s–e` readout. All bounds clamp/guard; `enabled`/`disabled`
 * honored. No gradient — clean/tactile. All colors from `--xen-*` token classes.
 */
export declare const LoopControlV4: React.ForwardRefExoticComponent<LoopControlProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LoopControlV4.d.ts.map