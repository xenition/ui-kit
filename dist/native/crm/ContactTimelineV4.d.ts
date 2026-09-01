import * as React from 'react';
import type { ContactTimelineProps } from './ContactTimeline';
export interface ContactTimelineV4Props extends ContactTimelineProps {
    /** Next-step sentence under `emptyLabel`. */
    emptyDescription?: string;
}
/**
 * **V4 contact timeline** — same props as {@link ContactTimeline} plus
 * `emptyDescription`.
 *
 * ## Six changes
 *
 * 1. **Making the timeline interactive no longer destroys its list.** On web
 *    the item set `role="listitem"` and then spread the interactive props,
 *    whose `role: 'button'` won the JSX merge — so the moment `onItemClick`
 *    arrived the list had zero list items and readers announced an empty list.
 *    The button now lives **inside** the list item on both twins.
 * 2. **Native has list semantics at all.** It exposed none, so the same
 *    timeline was a list on one platform and a pile of text on the other.
 * 3. **The last node clears 44.** Its bottom padding drops to `0`, which left
 *    a 28px target on the one entry a user most often taps — the newest.
 * 4. **The node chip is one object on both twins**, on the `selected` /
 *    `onSelected` pair, and an activity **kind** is identity rather than
 *    `success` (`ACTIVITY_META_V4`).
 * 5. **No literals.** The `14` radius and the `2` connector width come off
 *    `tokens.radius` and the spacing scale; the skeleton takes the shared
 *    opaque placeholder rather than `colors.border`.
 * 6. **One spoken name per entry** (rule A) and a real press layer (rule B).
 */
export declare function ContactTimelineV4({ items, onItemPress, loading, emptyLabel, emptyDescription, style, }: ContactTimelineV4Props): React.ReactElement;
//# sourceMappingURL=ContactTimelineV4.d.ts.map