import * as React from 'react';
import type { ContactCardProps } from './ContactCard';
export interface ContactCardV4Props extends ContactCardProps {
    /** Announced while the skeleton is up. Default `'Loading contact'`. */
    loadingLabel?: string;
}
/**
 * **V4 contact card** — same props as {@link ContactCard} plus `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **A quick action does one thing.** On web the pills were real buttons
 *    nested inside a root that `activate()` had turned into a `role="button"`
 *    with its own handler, and nothing stopped the event: tapping **Call**
 *    dialled *and* navigated. Native happened to escape it only because the
 *    inner `Pressable` consumed the touch — the same props, two behaviours.
 *    The card's own activation now wraps **only the identity region**, and the
 *    pills are its siblings inside the card, on both twins. That removes the
 *    double-fire and the invalid nesting in one move.
 * 2. **The card announces what it shows** — name, role, company and its tags.
 *    `Contact Ada` replaced the entire subtree (rule A).
 * 3. **A press is a state layer** (rule B), sized so the identity region
 *    itself clears 44.
 * 4. **The skeleton is the shared opaque placeholder.** It was `colors.border`
 *    — a hairline token spent as a fill — with a literal `20` for the avatar's
 *    radius.
 * 5. **The loading state is a real accessibility element.** `accessibilityLabel`
 *    sat on a plain `View`, which announces nothing.
 *
 * **Renders nothing without a `name`.**
 */
export declare function ContactCardV4({ name, title, company, avatarUrl, tags, actions, variant, loading, loadingLabel, onPress, testID, style, }: ContactCardV4Props): React.ReactElement | null;
//# sourceMappingURL=ContactCardV4.d.ts.map