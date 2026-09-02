import * as React from 'react';
import type { CompanyCardProps } from './CompanyCard';
export interface CompanyCardV4Props extends CompanyCardProps {
    /** Copy on the follow action. Default `'Follow'`. */
    followLabel?: string;
    /** Copy once following. Default `'Following'`. */
    followingLabel?: string;
    /**
     * Render the headcount chip. Default `'200 employees'`. Only reached when
     * `company.size` is a plain number — see the note below.
     */
    formatEmployees?: (count: number) => string;
    /** Render the open-roles chip. Default `'12 open roles'` / `'No open roles'`. */
    formatOpenRoles?: (count: number) => string;
}
/**
 * **V4 company card** — same props as {@link CompanyCard} plus `followLabel`,
 * `followingLabel`, `formatEmployees` and `formatOpenRoles`.
 *
 * ## Five changes
 *
 * 1. **A dead Follow button is no longer drawn.**
 *    `<CompanyCard company={c} following />` rendered a focusable, pressable
 *    button wired to nothing — the worst kind of control, because it looks
 *    exactly like the working one. V4 draws the *button* only when
 *    `onToggleFollow` is given; a `following` flag with no handler is a fact,
 *    so it is drawn as a chip that states the fact and takes no focus.
 * 2. **The follow state is announced.** There was no `accessibilityState` (and
 *    no `aria-pressed` on the web twin) anywhere on it, so the reader heard
 *    "Following, button" and could not tell whether pressing would follow or
 *    unfollow. It is a toggle and now says so.
 * 3. **The button is a sibling of the card's activation**, not a child of it.
 *    A `Pressable` is `accessible` by default and flattens its subtree, so
 *    inside the card's own press the Follow button was not a focus stop at
 *    all — the same defect found in `PodcastRow`, `ContactCard`, `WalletCard`,
 *    `SessionCard` and `VenueCard` before it.
 * 4. **Both chips are localisable and neither is silent.** `${size} employees`
 *    and `${n} open roles` were hard-coded English inside a `View` nobody
 *    could read, and the card's name stopped at the industry — so the
 *    headcount and the open-roles count, the two facts a candidate is
 *    comparing, reached nobody. Both formatters are props and both strings are
 *    part of the card's name.
 * 5. **Tokens.** `muted` was inking the meta line — it is a fill with no
 *    contrast promise — and the card sat on `surface`, which is the page
 *    colour, so in dark mode a card was invisible against the page behind it.
 *    `card`/`onCard`, `mutedText`, and press as a state layer rather than
 *    `opacity: 0.9`.
 *
 * ## Why `formatEmployees` takes a number
 *
 * `Company.size` is documented as a **free-form** label — `'51–200'` — so a
 * numeric formatter can only be applied when an app happens to have stored a
 * plain count. It is, then; a range keeps the base's own wording rather than
 * being coerced into a number it is not. The prop's shape is fixed by the
 * spec's table and is identical on the web twin.
 *
 * **Renders nothing without a company name** (§4.5).
 */
export declare function CompanyCardV4({ company, following, onToggleFollow, onPress, followLabel, followingLabel, formatEmployees, formatOpenRoles, style, }: CompanyCardV4Props): React.ReactElement | null;
//# sourceMappingURL=CompanyCardV4.d.ts.map