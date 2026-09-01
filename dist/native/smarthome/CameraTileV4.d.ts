import * as React from 'react';
import type { CameraTileProps } from './CameraTile';
/** Drop-in for {@link CameraTileProps} — same props, the V4 "ambient" design. */
export type CameraTileV4Props = CameraTileProps;
/**
 * CameraTile — **V4** "ambient" design. The immersive take on a feed tile: a
 * **dark, rounded video frame** (drawn on the `onSurface` token so it reads as a
 * screen in both light and dark, with an `onSurface`-alpha scrim behind the
 * overlays — no literal colors) fills the tile, a **live pulse dot** rides beside
 * the "LIVE"/"OFFLINE" chip when streaming, and a `REC` chip appears while
 * recording. The camera name + timestamp sit in a scrim overlay along the bottom
 * of the frame rather than a separate bar, so the framing stays clean and
 * immersive. Status is always text, never color alone. Pressing opens the stream
 * via `onPress`. Same props/behavior as {@link CameraTileProps}; token-only
 * colors via `useXenitionTheme()` + `withAlpha`.
 */
export declare function CameraTileV4({ name, online, recording, timestamp, previewHeight, onPress, style, }: CameraTileV4Props): React.ReactElement;
//# sourceMappingURL=CameraTileV4.d.ts.map