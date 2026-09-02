import * as React from 'react';
import type { EmployeeCardProps } from './EmployeeCard';
export interface EmployeeCardV4Props extends EmployeeCardProps {
    /** Announced while the skeleton is up. Default `'Loading employee'`. */
    loadingLabel?: string;
    /** Build the tenure line from `startDate`. Default `` `Since ${since}` ``. */
    formatTenure?: (since: string) => string;
}
/**
 * **V4 employee card** — same props as {@link EmployeeCard} plus
 * `loadingLabel` and `formatTenure`.
 *
 * ## Six changes
 *
 * 1. **The contact actions are reachable.** Call, Email and Message were
 *    `Pressable`s inside the card's own `Pressable`, which is `accessible` by
 *    default and collapses its whole subtree into one leaf named "Employee
 *    Ada" — so on native the three actions were not focus stops at all, and a
 *    VoiceOver user could open the profile and could not phone anybody. The
 *    card is a plain `CardV4` now; the activation wraps only the avatar-and-text
 *    region, and the actions are its siblings.
 * 2. **The skeleton is a skeleton, not a hairline.** It painted three blocks in
 *    `colors.border` — the divider token spent as a fill, which on most seeds is
 *    a barely-visible line colour stretched over a 40pt square. `skeletonFill()`
 *    is the opaque state mix, and its avatar is composed from the spacing scale
 *    rather than the literal `40` the base wrote twice.
 * 3. **The loading state is announced.** `accessibilityLabel="Loading
 *    employee"` sat on a plain `View`, which announces nothing at all, and the
 *    string had no override.
 * 4. **A press is a state layer.** The action pills swapped
 *    `withAlpha(colors.primary, 0.1)` for `0.2` on press — a translucent tint
 *    that is a different colour on every ground — and each was about 30pt tall.
 *    They are `ButtonV4`s at `minTap`.
 * 5. **Employment arrangement stops being a warning.** `contractor` was toned
 *    `warn`, `fullTime` `primary` and `partTime` `accent`, so a directory of
 *    contractors rendered as a screen of amber alerts. Arrangement is identity:
 *    it gets a glyph and a word on a neutral chip, and `warn` goes back to
 *    meaning something is wrong.
 * 6. **The card announces what it shows** — name, title, department,
 *    arrangement, status, location and tenure as one sentence — instead of
 *    "Employee Ada" over a subtree the reader cannot enter.
 *
 * **Renders nothing without a `name`.**
 */
export declare function EmployeeCardV4({ name, title, department, avatarUrl, employmentType, status, location, startDate, actions, variant, loading, loadingLabel, formatTenure, onPress, testID, style, }: EmployeeCardV4Props): React.ReactElement | null;
//# sourceMappingURL=EmployeeCardV4.d.ts.map