import * as React from 'react';
import type { BeforeAfterProps } from './BeforeAfter';
export interface BeforeAfterV4Props extends BeforeAfterProps {
    /** Let the divider be dragged. Default `true`. */
    draggable?: boolean;
    /** How far each nudge moves the divider, in percent. Default `10`. */
    step?: number;
    /** Accessible names for the two nudge controls. */
    lessLabel?: string;
    moreLabel?: string;
    /** Shown in the panel when a URL is missing. Default: the side's own label. */
    placeholderLabel?: string;
}
/**
 * **V4 before / after** — same props as {@link BeforeAfter} plus `draggable`,
 * `step`, `lessLabel`, `moreLabel` and `placeholderLabel`.
 *
 * ## The change this component exists for
 *
 * **The base could not be slid.** `variant="split"` drew a divider at
 * `position` and offered two −/+ buttons that stepped 10% at a time. There was
 * no drag. A before/after comparison is *the* gesture-first control in a
 * beauty app, and it shipped as a pair of nudge buttons.
 *
 * V4 adds a real drag — a `PanResponder` on a grab area wide enough for a
 * thumb, over a divider still drawn as a hairline — and **keeps the nudge
 * buttons**. They are the switch-control and assistive path, and trading one
 * group of users for another is not an upgrade.
 *
 * ## Three more
 *
 * 1. **The divider reports itself as a slider** with a real value, so a
 *    screen reader says "50 percent after" and an assistive pointer can move
 *    it.
 * 2. **The placeholder is `colors.muted`**, not a translucent wash of it that
 *    borrows whatever is behind the panel.
 * 3. **The tag chips use the scrim colour**, which is dark in both schemes —
 *    the base mixed `onSurface`, which inverts, so on a dark page the labels
 *    were dark text on a near-white chip over a photograph.
 */
export declare function BeforeAfterV4({ beforeUrl, afterUrl, position, variant, height, beforeLabel, afterLabel, draggable, step, lessLabel, moreLabel, placeholderLabel, onPositionChange, style, }: BeforeAfterV4Props): React.ReactElement;
//# sourceMappingURL=BeforeAfterV4.d.ts.map