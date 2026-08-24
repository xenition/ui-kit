import * as React from 'react';
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
export interface FloorPlanViewProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Heading (e.g. "Floor 1"). */
    title?: string;
    /**
     * Rooms to draw as token-styled rectangles. Empty renders a labelled
     * placeholder frame (still dependency-free).
     */
    rooms?: FloorPlanRoom[];
    /** Frame height in px (default 200). */
    height?: number;
}
/**
 * Web parity of the native `FloorPlanView`: a schematic floor plan — a STATIC,
 * dependency-free styled placeholder built from plain `div` rectangles positioned
 * as fractions of the frame. No image, SVG, or map dependency; it renders
 * anywhere. Rooms in, nothing fetches; an empty `rooms` array shows a labelled
 * placeholder. All colors come from the `--xen-*` tokens — no literal colors
 * (rooms tinted with the `border` fill and `on-surface` labels).
 */
export declare const FloorPlanView: React.ForwardRefExoticComponent<FloorPlanViewProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FloorPlanView.d.ts.map