import * as React from 'react';
import type { CameraTileProps } from './CameraTile';
/** Drop-in for {@link CameraTileProps} — same props, the V4 "ambient" design. */
export type CameraTileV4Props = CameraTileProps;
/**
 * CameraTile — **V4** "ambient" design (web parity of the native V4). The
 * immersive take on a feed tile: a **dark, rounded video frame** (drawn on the
 * `on-surface` token so it reads as a screen in both light and dark, with a
 * `surface`-toned scrim behind the overlays — no literal colors) fills the tile,
 * a **live pulse dot** rides beside the "LIVE"/"OFFLINE" chip when streaming, and
 * a `REC` chip appears while recording. The camera name + timestamp sit in a
 * scrim overlay along the bottom of the frame rather than a separate bar, so the
 * framing stays clean and immersive. Status is always text, never color alone.
 * The tile is a `<button>` firing `onClick`. Same props/behavior as
 * {@link CameraTileProps}; all colors from `--xen-*` token classes (no literals).
 */
export declare const CameraTileV4: React.ForwardRefExoticComponent<CameraTileProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=CameraTileV4.d.ts.map