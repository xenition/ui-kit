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
    /** Accessible name for the slider itself. Default `'Comparison position'`. */
    sliderLabel?: string;
    /** Shown in the panel when a URL is missing. Default: the side's own label. */
    placeholderLabel?: string;
}
/**
 * **V4 before / after** — the web twin of the native `BeforeAfterV4`, same
 * props as {@link BeforeAfter} plus five copy and behaviour hooks.
 *
 * ## The change this component exists for
 *
 * **The base could not be slid.** It drew a divider at `position` and offered
 * two −/+ buttons that stepped 10% at a time. V4 overlays a real
 * `<input type="range">`, which is the correct web answer and brings the whole
 * keyboard model with it for free: arrow keys, Home/End, PageUp/PageDown, a
 * spoken value, and pointer drag on desktop and touch alike. No custom
 * pointer-event handling, because the platform already has this control.
 *
 * The **nudge buttons stay**: they are a coarse, forgiving target for anyone
 * who finds a thin slider hard to hit, and adding a drag is not a reason to
 * take them away.
 *
 * ## Two more
 *
 * 1. **The placeholder is `bg-muted`**, not a translucent wash of it that
 *    borrows whatever is behind the panel.
 * 2. **The tag chips are built from the elevation colour**, which is dark in
 *    both schemes — the base mixed `on-surface`, which inverts, so on a dark
 *    page the labels became dark text on a near-white chip over a photo.
 */
export declare const BeforeAfterV4: React.ForwardRefExoticComponent<BeforeAfterV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BeforeAfterV4.d.ts.map