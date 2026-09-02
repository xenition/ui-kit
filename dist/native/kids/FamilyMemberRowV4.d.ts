import * as React from 'react';
import type { FamilyMemberRowProps, FamilyRole } from './FamilyMemberRow';
export interface FamilyMemberRowV4Props extends FamilyMemberRowProps {
    /** The word each role is printed and announced with. */
    roleLabels?: Partial<Record<FamilyRole, string>>;
    /** Announced and printed when the member is present. Default `'Online'`. */
    onlineLabel?: string;
    /** Announced and printed when the member is away. Default `'Offline'`. */
    offlineLabel?: string;
}
/**
 * **V4 family member row** — same props as {@link FamilyMemberRow} plus
 * `roleLabels`, `onlineLabel` and `offlineLabel`.
 *
 * ## Four changes
 *
 * 1. **A family role is identity, so it stops borrowing status colours.** The
 *    base drew `caregiver → success` and `parent → primary`, which says a
 *    caregiver is a *good outcome* and a grandparent is a neutral one. Every
 *    role now wears the same neutral chip and is told apart by its word — the
 *    only channel that survives greyscale, colour blindness and a reader.
 * 2. **Presence is a real status and keeps its colour**, plus the dot is
 *    accompanied by the word it always should have been, and the dot itself is
 *    hidden from the reader so "Online" is said once rather than twice.
 * 3. **The row's summary is not silently dropped.** The non-pressable branch
 *    set `accessibilityLabel` on a bare `View` with no `accessible` — which
 *    Android ignores outright, so the row read as four loose fragments there
 *    and as one name on iOS. Every such `View` in this file is now explicitly
 *    `accessible`.
 * 4. **`card`/`onCard` and a state layer.** The row painted `surface`, the page
 *    colour, and drew press as `opacity: pressed ? 0.85 : 1` — an opacity
 *    inside M3's *disabled* band.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export declare function FamilyMemberRowV4({ name, role, photoUrl, relationLabel, online, roleLabels, onlineLabel, offlineLabel, onPress, style, }: FamilyMemberRowV4Props): React.ReactElement | null;
//# sourceMappingURL=FamilyMemberRowV4.d.ts.map