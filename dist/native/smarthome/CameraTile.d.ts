import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
    /** Fires when the tile is pressed to open the stream. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A camera feed tile — a token-surface preview area (the kit ships no image
 * decoder, so an offline/placeholder frame is drawn with a `muted` glyph) topped
 * by status {@link Badge}s: a "LIVE" (success) / "OFFLINE" (danger) chip and a
 * "REC" chip when recording. Status is always text, never color alone. The name
 * and timestamp sit in a footer bar. Pressing opens the stream via `onPress`.
 * No literal colors.
 */
export declare function CameraTile({ name, online, recording, timestamp, previewHeight, onPress, style, }: CameraTileProps): React.ReactElement;
//# sourceMappingURL=CameraTile.d.ts.map