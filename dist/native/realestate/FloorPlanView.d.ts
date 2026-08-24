import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** A single room rectangle, positioned as fractions (0–1) of the frame. */
export interface FloorPlanRoom {
    /** Room label (e.g. "Bedroom", "Kitchen"). */
    label: string;
    /** Left edge, 0–1 of frame width. */
    x: number;
    /** Top edge, 0–1 of frame height. */
    y: number;
    /** Width, 0–1 of frame width. */
    w: number;
    /** Height, 0–1 of frame height. */
    h: number;
}
export interface FloorPlanViewProps {
    /** Heading (e.g. "Floor 1"). */
    title?: string;
    /**
     * Rooms to draw as token-styled rectangles. Empty renders a labelled
     * placeholder frame (still dependency-free).
     */
    rooms?: FloorPlanRoom[];
    /** Frame height in px (default 200). */
    height?: number;
    /** Fires when a room rectangle is not needed; the whole frame press. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A schematic floor plan — a STATIC, dependency-free styled placeholder built
 * from plain `View` rectangles positioned as fractions of the frame. No image,
 * SVG, or native dependency; it renders anywhere. Rooms in, nothing fetches;
 * an empty `rooms` array shows a labelled placeholder. Token-only colors
 * (rooms tinted with the `border` fill and `onSurface` labels).
 */
export declare function FloorPlanView({ title, rooms, height, onPress, style, }: FloorPlanViewProps): React.ReactElement;
//# sourceMappingURL=FloorPlanView.d.ts.map