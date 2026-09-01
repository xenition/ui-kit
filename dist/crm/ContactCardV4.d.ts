import * as React from 'react';
import type { ContactCardProps } from './ContactCard';
export interface ContactCardV4Props extends ContactCardProps {
    /** Announced while the skeleton is up. Default `'Loading contact'`. */
    loadingLabel?: string;
}
/**
 * **V4 contact card** — the web twin of the native `ContactCardV4`, same props
 * as {@link ContactCard} plus `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **Tapping "Call" no longer opens the contact as well.** This is the
 *    module's headline defect. The quick-action pills were real `<Button>`s
 *    sitting *inside* a root that `activate()` had turned into a
 *    `role="button"` with its own handler, and nothing stopped the event — so
 *    one tap dialled *and* navigated. The sibling `QuoteCard` guarded the
 *    identical nesting with `stopPropagation`, so the hazard was known; this
 *    card never got the guard, and native never had the bug at all because its
 *    inner `Pressable` consumed the touch. Same props, two behaviours.
 *
 *    The fix is structural rather than another `stopPropagation`: the card's
 *    own activation is a real `<button>` around **only the identity region**,
 *    and the pills are that button's **siblings**. A quick action does one
 *    thing, and the invalid nesting — interactive content inside
 *    `role="button"` — goes away with it.
 * 2. **`compact` actually densifies.** `padding` was passed on native only, so
 *    the web card dropped its tags and actions and kept its full `lg` inset.
 * 3. **One accessible name.** `Contact Ada` replaced the subtree, so the role
 *    and the company were never announced. Both join the name.
 * 4. **The skeleton is the shared placeholder**, not `bg-neutral-100` — a ramp
 *    step, and therefore a pale plate punched into a dark page — and the
 *    loading card is never clickable.
 * 5. **A press is a state layer**, and the pills and tags are drawn the same
 *    way on both twins: `soft` pills, `size="sm"` tags.
 */
export declare const ContactCardV4: React.ForwardRefExoticComponent<ContactCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ContactCardV4.d.ts.map