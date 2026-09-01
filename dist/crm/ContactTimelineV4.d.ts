import * as React from 'react';
import type { ContactTimelineProps } from './ContactTimeline';
export interface ContactTimelineV4Props extends ContactTimelineProps {
    /** A sentence under the empty title — an empty timeline needs a next step. */
    emptyDescription?: string;
}
/**
 * **V4 contact timeline** — the web twin of the native `ContactTimelineV4`,
 * same props as {@link ContactTimeline} plus `emptyDescription`.
 *
 * ## Six changes
 *
 * 1. **Making the timeline interactive no longer destroys the list.** The item
 *    set `role="listitem"` and then spread `activate()`, whose `role: 'button'`
 *    wins because a JSX spread after an explicit prop wins — so the moment
 *    `onItemClick` was supplied, the `role="list"` had zero list items and a
 *    reader announced an empty list. The button now lives **inside** the list
 *    item, which is where it always belonged.
 * 2. **The list is a real `<ul>`/`<li>`**, so the semantics survive without a
 *    `role` at all and cannot be overwritten by a spread.
 * 3. **The last node is still a target.** The row's bottom padding dropped to
 *    `0` on the last item, leaving a 28px tap area at the end of every
 *    timeline. Every node clears 44.
 * 4. **The node chip is the same object on both twins** — the compiler's
 *    opaque `selected` container under the tone's contrast-corrected ink, in
 *    place of web's flat `bg-neutral-100` ramp step. The kind goes neutral,
 *    because a kind is identity and `success` has to keep meaning "went well".
 * 5. **Literal radii and rail widths come from the tokens.** A `14` radius and
 *    a hand-typed `2` do not follow a re-scaled seed.
 * 6. **One accessible name per node, and a press is a state layer.**
 *
 * Empty is a real {@link EmptyStateV4} with a title and a sentence, not a lone
 * grey line centred in the void.
 */
export declare const ContactTimelineV4: React.ForwardRefExoticComponent<ContactTimelineV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ContactTimelineV4.d.ts.map