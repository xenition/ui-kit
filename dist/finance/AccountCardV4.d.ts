import * as React from 'react';
import type { AccountCardProps, AccountVariant } from './AccountCard';
export interface AccountCardV4Props extends AccountCardProps {
    /**
     * The word for each account kind. Defaults to `'Checking'`, `'Savings'` and
     * `'Credit'` — the three English strings the base had baked in.
     */
    typeLabels?: Partial<Record<AccountVariant, string>>;
}
/**
 * **V4 account card** — the web twin of the native `AccountCardV4`, same props
 * as {@link AccountCard} plus `typeLabels`.
 *
 * ## Six changes
 *
 * 1. **The card's name contains the balance.** `aria-label={`${name},
 *    ${label} account`}` on a `role="button"` root prunes everything under it,
 *    and what it pruned was the balance — the only number the tile exists to
 *    show. The name is now the account, its kind, the masked number and the
 *    figure.
 * 2. **An account kind is an identity, not a status** — see
 *    {@link VARIANT_META}.
 * 3. **The account number no longer replaces the account kind.** The base
 *    printed the mask *instead of* the type word, so a tile with a number on
 *    it stopped saying whether it was a credit card or a current account. Both
 *    lines are there.
 * 4. **Press is a state layer.** `hover:opacity-90` fades the card's own
 *    content, which is the signal M3 spends 0.38 on to mean *disabled* — so a
 *    hovered card and a dead one were the same gesture at two strengths.
 * 5. **Focus is `ring-ring`**, not `ring-primary-300`: a ramp step keeps its
 *    light-mode orientation under `[data-theme="dark"]`, while `--xen-ring` is
 *    `primary` already corrected to 3:1 against the page.
 * 6. **The card is on `card`, its captions on `muted-text`.** The tile painted
 *    `surface` — the page colour — so it read flat in dark mode, and its two
 *    captions used `muted`, a ramp step with no contrast promise, as an ink.
 */
export declare const AccountCardV4: React.ForwardRefExoticComponent<AccountCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AccountCardV4.d.ts.map