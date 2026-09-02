import * as React from 'react';
import type { EmployeeCardProps } from './EmployeeCard';
export interface EmployeeCardV4Props extends EmployeeCardProps {
    /** Announced while the skeleton is up. Default `'Loading employee'`. */
    loadingLabel?: string;
    /** Render the hire date. Default `'Since 4 Mar 2024'`. */
    formatTenure?: (since: string) => string;
    /** Test hook. Every native `hr` component had one; no web one did. */
    testID?: string;
}
/**
 * **V4 employee card** — the web twin of the native `EmployeeCardV4`, same
 * props as {@link EmployeeCard} plus `loadingLabel`, `formatTenure` and
 * `testID`.
 *
 * ## Six changes
 *
 * 1. **Tabbing to "Email" and pressing Enter no longer opens the profile
 *    instead.** The quick-contact `<button>`s sat inside a card that `onClick`
 *    had turned into a `role="button"` with its own Enter/Space handler. The
 *    click was guarded; the keydown was not, and `preventDefault()` on the
 *    bubbled Enter cancels the button's own activation. So a keyboard user
 *    navigated away and mailed nobody. The card is now a plain container, the
 *    activation is a real `<button>` around the avatar and the identity block,
 *    and the action pills are its **siblings** — with no ancestor handler
 *    left, no guard is needed.
 * 2. **The card is one accessible name.** `Employee Ada Lovelace` replaced the
 *    subtree, so the title, the department and — the one that matters —
 *    whether she is *terminated* were never announced.
 * 3. **The skeleton is an opaque placeholder.** `bg-neutral-200` is a ramp
 *    step: it mirrors under `[data-theme="dark"]`, so the loading card was
 *    three pale slabs on a dark page. It also announced nothing while it was
 *    up, and the card stayed clickable through it.
 * 4. **Employment arrangement stops spending a status colour.**
 *    `contractor: warn` drew every contractor as a warning; the glyph already
 *    says which arrangement it is.
 * 5. **The action pills are real buttons at 44.** They were hand-rolled
 *    `bg-primary-50` / `hover:bg-primary-100` ramp steps at whatever height
 *    their padding produced; they are `ButtonV4` `soft` now, which is what the
 *    native twin already drew.
 * 6. **`Since …` is a prop.** `formatTenure` — the base concatenated an
 *    English preposition onto a date the caller had already formatted.
 */
export declare const EmployeeCardV4: React.ForwardRefExoticComponent<EmployeeCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EmployeeCardV4.d.ts.map