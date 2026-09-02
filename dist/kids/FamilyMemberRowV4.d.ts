import * as React from 'react';
import type { FamilyMemberRowProps, FamilyRole } from './FamilyMemberRow';
export interface FamilyMemberRowV4Props extends FamilyMemberRowProps {
    /** Replace the seven role words. They were hard-coded English. */
    roleLabels?: Partial<Record<FamilyRole, string>>;
    /** The word for a member who is present. Default `'Online'`. */
    onlineLabel?: string;
    /** The word for a member who is not. Default `'Offline'`. */
    offlineLabel?: string;
}
/**
 * **V4 family member row** — same props as {@link FamilyMemberRow} plus
 * `roleLabels`, `onlineLabel` and `offlineLabel`.
 *
 * ## Six changes
 *
 * 1. **A family role is not a status.** `caregiver → success` spent the kit's
 *    "this went well" colour on who somebody is. Every role now takes an
 *    identity tone — the two brand slots or neutral — and carries its word.
 * 2. **`child` and `sibling` are `accent` again**, matching the native twin.
 *    A comment in this file said the web `Badge` had no `accent` tone; it has
 *    had one for a while, and the note had quietly flattened two roles onto
 *    `primary` on one platform only.
 * 3. **The row's accessible name reached nobody.** It was an `aria-label` on a
 *    plain `div` for every non-interactive row, which browsers ignore. The
 *    name now belongs to a real `<button>`, and a static row is read from its
 *    visible text.
 * 4. **`{...rest}` is spread first.** It was spread after `onClick`, so a
 *    caller passing any handler through silently replaced the row's own.
 * 5. **It joins the shared row family** — one height, one 44 leading slot, one
 *    state layer — so a family roster, a settings list and a conversation list
 *    are visibly one product. Press is that state layer, not
 *    `hover:bg-neutral-50`, which paints a near-white slab on a dark page.
 * 6. **Presence is the avatar's own dot plus a word.** It was a hand-drawn
 *    `bg-neutral-300` circle — a ramp step that inverts under
 *    `[data-theme="dark"]` — beside text the row's name already carried.
 */
export declare const FamilyMemberRowV4: React.ForwardRefExoticComponent<FamilyMemberRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FamilyMemberRowV4.d.ts.map