import * as React from 'react';
import type { LoopControlProps } from './LoopControl';
/** Drop-in for {@link LoopControlProps} — same props, the V4 "session" design. */
export type LoopControlV4Props = LoopControlProps;
/**
 * LoopControl — **V4** "session" design (native parity of the web V4). The
 * tactile loop control: a rounded toggle whose on state reads through a
 * soft-primary fill **and** a `🔁` glyph + "On"/"Off" label (never color
 * alone), plus — in the `bar` variant — a chunky region strip over `totalBars`
 * with the `[start, end]` region lit, driven by 44px −/＋ steppers reporting
 * through `onRegionChange`. The `inline` variant collapses to a bold tabular
 * `Bars s–e` readout. All bounds clamp/guard; `enabled`/`disabled` honored. No
 * gradient — clean/tactile. Token-only colors via `useXenitionTheme()`.
 */
export declare function LoopControlV4({ enabled, start, end, totalBars, variant, disabled, onToggle, onRegionChange, style, }: LoopControlV4Props): React.ReactElement;
//# sourceMappingURL=LoopControlV4.d.ts.map