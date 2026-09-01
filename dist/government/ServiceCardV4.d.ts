import * as React from 'react';
import type { ServiceCardProps, ServiceCategory, ServiceChannel } from './ServiceCard';
export interface ServiceCardV4Props extends ServiceCardProps {
    /** Override the eight category words — `'Licensing'`, `'Permits'`, … */
    categoryLabels?: Partial<Record<ServiceCategory, string>>;
    /** Override the four channel words — `'Online'`, `'Unavailable'`, … */
    channelLabels?: Partial<Record<ServiceChannel, string>>;
}
/**
 * **V4 service card** — the web twin of the native `ServiceCardV4`, same props
 * as {@link ServiceCard} plus `categoryLabels` and `channelLabels`.
 *
 * ## Four changes
 *
 * 1. **Space on "Start" starts the service.** Today it starts nothing and
 *    navigates away. The Start button guarded only the *click* path with
 *    `e.stopPropagation()`; the card is a `div` with `role="button"` and a
 *    hand-written key handler, which catches the keydown bubbling out of the
 *    button and runs `e.preventDefault(); onClick()` — cancelling the button's
 *    own activation (Space fires on keyup, already cancelled) and firing the
 *    card. Enter fires *both*. The fix is structural and is the house rule:
 *    the card container is a plain `div`, the activation is a real `<button>`
 *    around the heading and description, and **Start is that button's
 *    sibling**. Nesting a control inside `role="button"` was invalid ARIA
 *    regardless of the propagation.
 * 2. **An unavailable service says so.** The name was a fixed
 *    `` `${title}, ${category}` ``, which omits the one field that decides
 *    whether the service can be used at all — so an unavailable service
 *    announced as an ordinary, startable one. Channel, description and
 *    turnaround join the name.
 * 3. **A category is identity, not status.** The leading disc was
 *    `bg-primary-50` — a ramp step, which mirrors under `[data-theme="dark"]`
 *    and paints a near-white plate on a dark card — and a category has no
 *    status to report. It takes the neutral identity tint, and the glyph takes
 *    the contrast-corrected ink rather than the `primary` fill.
 * 4. **Both controls clear 44 and press is a state layer.**
 *    `hover:opacity-90` dims the card's own content, which is M3's *disabled*
 *    signal, and `ring-primary-300` is a ramp step where the preset ships a
 *    dedicated `ring` colour that tracks the seed.
 */
export declare const ServiceCardV4: React.ForwardRefExoticComponent<ServiceCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ServiceCardV4.d.ts.map