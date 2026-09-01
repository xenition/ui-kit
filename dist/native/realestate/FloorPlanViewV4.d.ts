import * as React from 'react';
import type { FloorPlanViewProps } from './FloorPlanView';
/** Drop-in for {@link FloorPlanViewProps} — same props, the V4 "listing" design. */
export type FloorPlanViewV4Props = FloorPlanViewProps;
/**
 * FloorPlanView — **V4** "listing" design. The image-forward, editorial take on
 * the schematic plan: a rounded elevated frame with a soft-primary gradient
 * "ground", the `title` shown as an active level tab, rooms drawn as soft-primary
 * tinted token rectangles, and a room-count area caption. STATIC and
 * dependency-free — no image, SVG, or native map dep; it renders anywhere. Same
 * props/behavior as {@link FloorPlanViewProps}; an empty `rooms` array shows a
 * labelled placeholder. Token-only colors via `useXenitionTheme()`; the frame
 * carries an a11y label.
 */
export declare function FloorPlanViewV4({ title, rooms, height, onPress, style, }: FloorPlanViewV4Props): React.ReactElement;
//# sourceMappingURL=FloorPlanViewV4.d.ts.map