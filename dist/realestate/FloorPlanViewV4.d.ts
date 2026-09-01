import * as React from 'react';
import type { FloorPlanViewProps } from './FloorPlanView';
/** Drop-in for {@link FloorPlanViewProps} — same props, the V4 "listing" design. */
export type FloorPlanViewV4Props = FloorPlanViewProps;
/**
 * FloorPlanView — **V4** "listing" design (web parity of the native V4). The
 * image-forward, editorial take on the schematic plan: a rounded elevated frame
 * with a soft-primary gradient "ground", the `title` shown as an active level tab,
 * rooms drawn as soft-primary tinted token rectangles, and a room-count area
 * caption. STATIC and dependency-free — no image, SVG, or map dep; it renders
 * anywhere. Same props/behavior as {@link FloorPlanViewProps}; an empty `rooms`
 * array shows a labelled placeholder. All colors come from the `--xen-*` tokens
 * (no literals). When `onClick` is set the frame is keyboard-activatable.
 */
export declare const FloorPlanViewV4: React.ForwardRefExoticComponent<FloorPlanViewProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FloorPlanViewV4.d.ts.map