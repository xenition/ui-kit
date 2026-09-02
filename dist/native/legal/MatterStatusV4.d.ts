import * as React from 'react';
import type { MatterStatusProps } from './MatterStatus';
/** Drop-in for {@link MatterStatusProps} — same props, the V4 "chambers" design. */
export type MatterStatusV4Props = MatterStatusProps;
/**
 * MatterStatus — **V4** "chambers" design (native twin of the web V4), and the
 * ONE reserved gradient moment of the legal V4 "chambers" line: the header
 * (matter title, current stage glyph + word, and a frosted "Stage N of 6" chip)
 * rides a rounded, overflow-hidden `GradientSurface` on the brand gradient
 * (`chambersGradient`) in near-white ink (`chambersInk` / `chambersInkSoft`). The
 * body — the segmented **intake → active → discovery → trial → settlement →
 * closed** meter — stays on the plain surface: segments up to the current stage
 * fill with the stage tone token, the rest use the border token. Status is
 * carried by glyph + stage word, never color alone; exposes an ARIA
 * `progressbar`. Reuses the base `variant` (`default` / `compact`). Token-only
 * colors via `useXenitionTheme()` + the chambers ramp helpers, dark-mode safe.
 */
export declare function MatterStatusV4({ title, stage, progressPct, opened, attorney, variant, onPress, testID, style, }: MatterStatusV4Props): React.ReactElement;
//# sourceMappingURL=MatterStatusV4.d.ts.map