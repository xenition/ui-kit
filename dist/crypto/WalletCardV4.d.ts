import * as React from 'react';
import type { WalletCardProps } from './WalletCard';
export interface WalletCardV4Props extends WalletCardProps {
    /** Name for the copy control. Default `'Copy address'`. */
    copyLabel?: string;
    /** Announced once the address has been handed to `onCopy`. Default `'Address copied'`. */
    copiedLabel?: string;
    /**
     * Leading hex characters kept in the truncated address. Default `8`.
     *
     * `truncateHash(hash, 6, 4)` counts the `0x` prefix in its lead, so the base
     * left **four** significant leading digits — not enough to verify an address
     * against a hardware screen, which is the only reason the chip exists.
     */
    addressLead?: number;
}
/**
 * **V4 wallet card** — the web twin of the native `WalletCardV4`, same props as
 * {@link WalletCard} plus `copyLabel`, `copiedLabel` and `addressLead`.
 *
 * ## Five changes
 *
 * 1. **Copy does one thing.** The copy chip was a real `<button>` sitting
 *    *inside* a root that `pressableProps()` had turned into a
 *    `role="button"` with its own handler, so on the web one tap both copied
 *    the address and opened the wallet. Native's inner `Pressable` consumed
 *    the touch and did not, so the same props produced two behaviours. Fixed
 *    the way `ContactCardV4` fixed it: the card's activation is a real
 *    `<button>` around the identity region only, and the chip is its sibling.
 *    No `stopPropagation`, because there is no ancestor handler left.
 * 2. **`variant` reaches `Card` on the web too.** `elevated` is this
 *    component's own default and the web twin dropped it on the floor, so the
 *    default wallet card was raised on the phone and flat in the browser.
 * 3. **Eight leading hex digits, not four.** See `addressLead`.
 * 4. **The card announces its balance.** `aria-label={label}` replaced the
 *    subtree, so "Main Wallet" was all a reader got — never the fiat total,
 *    the native amount or the custody kind.
 * 5. **A press is a state layer, the skeleton is opaque, and the chip clears
 *    44.** The chip was a ~28px pill, the skeleton a `bg-neutral-100` ramp
 *    step, and a copy with no confirmation left the user guessing — the
 *    address is now confirmed in a polite live region.
 */
export declare const WalletCardV4: React.ForwardRefExoticComponent<WalletCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WalletCardV4.d.ts.map