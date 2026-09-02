import * as React from 'react';
import type { AgentContactCardProps } from './AgentContactCard';
export interface AgentContactCardV4Props extends AgentContactCardProps {
    /** The call action's visible word. Default `'Call'`. */
    callLabel?: string;
    /** The email action's visible word. Default `'Email'`. */
    emailLabel?: string;
    /** Said when `available` is true. Default `'Available'`. */
    availableLabel?: string;
    /** Said when `available` is false. Default `'Offline'`. */
    offlineLabel?: string;
}
/**
 * **V4 agent contact card** — same props as {@link AgentContactCard} plus
 * `callLabel`, `emailLabel`, `availableLabel` and `offlineLabel`.
 *
 * ## Five changes
 *
 * 1. **The phone number and the email address are links.** They were inert
 *    `<span>`s. On a phone — where a policyholder opens this card in the
 *    middle of an accident — the number could be read and not dialled, and the
 *    address could not be copied by any gesture the platform offers for a
 *    link. They are now `tel:` and `mailto:` anchors, which also means the
 *    card still works with no `onCall` / `onEmail` handler at all, where the
 *    base rendered no action whatsoever.
 * 2. **Two adjuster cards no longer present two identical "Call" buttons.** A
 *    claim page lists the agent and the adjuster; a reader tabbing through
 *    heard "Call, button. Email, button. Call, button. Email, button." and had
 *    no way to tell whose. Each action's accessible name carries the person's
 *    name, and contains the visible word, so the visible label is still part
 *    of the name (WCAG 2.5.3).
 * 3. **Availability is a word, in the card's own reading order.** The pill was
 *    a `Badge` whose glyph — `●` against `○` — was its only non-colour signal
 *    at a glance, and `success`/`neutral` did the rest.
 * 4. **The card is one block of contact detail, not five stops.** Name, title,
 *    agency and availability are read together; the glyphs beside the number
 *    and the address are decorative rather than three more announced items.
 * 5. **Every control clears 44 and focuses with `ring-ring`.** Nothing in the
 *    module cleared the tap floor — a phone number was a line of text with no
 *    target at all.
 */
export declare const AgentContactCardV4: React.ForwardRefExoticComponent<AgentContactCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AgentContactCardV4.d.ts.map