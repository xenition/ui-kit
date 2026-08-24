import * as React from 'react';
export interface CameraTileProps {
    /** Camera name (e.g. "Front Door"). */
    name: string;
    /** Whether the camera is reachable / streaming. */
    online?: boolean;
    /** Whether the camera is actively recording. */
    recording?: boolean;
    /** Last-seen / timestamp caption (e.g. "Live", "2m ago"). */
    timestamp?: string;
    /** Preview aspect height in px. Default 140. */
    previewHeight?: number;
    /** Fires when the tile is clicked to open the stream. */
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * A camera feed tile — a token-surface preview area (the kit ships no image
 * decoder, so an offline/placeholder frame is drawn with a `muted` glyph) topped
 * by status {@link Badge}s: a "LIVE" (success) / "OFFLINE" (danger) chip and a
 * "REC" chip when recording. Status is always text, never color alone. The name
 * and timestamp sit in a footer bar. The tile is a `<button>` firing `onClick`.
 * No literal colors.
 */
export declare const CameraTile: React.ForwardRefExoticComponent<CameraTileProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=CameraTile.d.ts.map