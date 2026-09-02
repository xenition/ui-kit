import * as React from 'react';
import type { AgentContactCardProps } from './AgentContactCard';
export interface AgentContactCardV4Props extends AgentContactCardProps {
    /** Copy on the call action. Default `'Call'`. */
    callLabel?: string;
    /** Copy on the email action. Default `'Email'`. */
    emailLabel?: string;
    /** Shown when `available` is true. Default `'Available'`. */
    availableLabel?: string;
    /** Shown when `available` is false. Default `'Offline'`. */
    offlineLabel?: string;
}
/**
 * **V4 agent contact card** — same props as {@link AgentContactCard} plus
 * `callLabel`, `emailLabel`, `availableLabel` and `offlineLabel`.
 *
 * ## Four changes
 *
 * 1. **Two adjuster cards no longer offer two buttons called "Call".** A
 *    claims screen listing an agent and an adjuster gave a screen-reader user
 *    two identically-named actions and no way to tell which one dialled whom;
 *    the rotor listed "Call, Call, Email, Email". Each action's spoken name now
 *    carries the person and the number or address it will reach — the visible
 *    label stays the short word, because the button is 80px wide.
 * 2. **The phone number and the address are announced with the action that
 *    uses them.** The base drew them as inert text nodes (on the web twin,
 *    literally `<span>`s where a `tel:` and a `mailto:` belong), so the two
 *    facts the card exists to deliver were three separate stops away from the
 *    buttons that act on them. Native has no anchor: the platform's dialler is
 *    the host's to open with `Linking`, which is what `onCall` and `onEmail`
 *    are for. What the card owes is a named target, and it has one.
 * 3. **Availability is a word, and the word is a prop.** `'● Available'` and
 *    `'○ Offline'` were hard-coded English concatenated into a badge, in the
 *    one component a policyholder reads before deciding whether to phone
 *    someone at 9pm.
 * 4. **Both actions clear 44.** `size="sm"` buttons in a row is the pattern
 *    §8 sets a floor for, and neither of these had one.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export declare function AgentContactCardV4({ name, title, agency, phone, email, avatarUrl, available, callLabel, emailLabel, availableLabel, offlineLabel, onCall, onEmail, style, }: AgentContactCardV4Props): React.ReactElement | null;
//# sourceMappingURL=AgentContactCardV4.d.ts.map