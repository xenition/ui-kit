import * as React from 'react';
import type { CompanyCardProps } from './CompanyCard';
export interface CompanyCardV4Props extends CompanyCardProps {
    /** Copy on the follow action. Default `'Follow'`. */
    followLabel?: string;
    /** Copy once followed. Default `'Following'`. */
    followingLabel?: string;
    /**
     * Render the headcount. Default `'51 employees'`.
     *
     * `Company.size` is a free-form string (`'51–200'`), so this is applied only
     * when it parses as a single finite number; a banded label is passed through
     * as written, because rewriting `'51–200'` into `formatEmployees(51)` would
     * throw away the upper bound.
     */
    formatEmployees?: (n: number) => string;
    /** Render the open-roles count. Default `'3 open roles'` / `'No open roles'`. */
    formatOpenRoles?: (n: number) => string;
}
/**
 * **V4 company card** — same props as {@link CompanyCard} plus `followLabel`,
 * `followingLabel`, `formatEmployees` and `formatOpenRoles`.
 *
 * ## Six changes
 *
 * 1. **Follow works from the keyboard.** It was a `<Button>` inside a
 *    `<div role="button">` carrying its own Enter/Space handler: the button's
 *    click was guarded with `stopPropagation`, its keydown was not, so the
 *    card caught the bubbled key, called `preventDefault()` — cancelling the
 *    button's own activation — and opened the company page instead. Tab to
 *    Follow, press Enter, follow nobody, navigate away. The card is a plain
 *    container now, the activation is a real `<button>` around the logo and
 *    the name, and Follow is its **sibling**.
 * 2. **`<CompanyCard company={c} following />` no longer renders a dead
 *    button.** The base showed Follow whenever *either* `following` or
 *    `onToggleFollow` was set, so a read-only card — a search result, a
 *    profile header — put a focusable control in the tab order that did
 *    nothing at all when pressed. The button exists only when there is a
 *    handler; the follow *state* without one is drawn as a chip and folded
 *    into the card's name.
 * 3. **Follow announces whether you are following.** There was no
 *    `aria-pressed` anywhere on either twin, so the only difference between
 *    the two states was the word inside the button and its variant colour —
 *    and a toggle that does not expose its state cannot be operated
 *    confidently by anyone who is not looking at it.
 * 4. **The card is one accessible name.** The base's `aria-label` sat on a
 *    `generic` element, which ARIA forbids naming, and it named only the
 *    company and industry — the headcount and the open-roles count, the two
 *    numbers a job seeker is actually scanning for, were separate stops or
 *    nothing.
 * 5. **"1 open roles" is fixed, and both counts are translatable.** The base
 *    interpolated the number into a hard-coded plural.
 * 6. **Press is a state layer and the meta line takes a text token.**
 *    `hover:opacity-95` fades the card's own content — M3's disabled signal —
 *    and `text-muted` is a fill slot with no contrast promise.
 */
export declare const CompanyCardV4: React.ForwardRefExoticComponent<CompanyCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CompanyCardV4.d.ts.map