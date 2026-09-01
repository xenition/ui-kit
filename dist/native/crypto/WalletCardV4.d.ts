import * as React from 'react';
import type { WalletCardProps } from './WalletCard';
export interface WalletCardV4Props extends WalletCardProps {
    /** Name of the copy control. Default `'Copy address'`. */
    copyLabel?: string;
    /** Announced once the address has been handed to `onCopy`. Default `'Address copied'`. */
    copiedLabel?: string;
    /**
     * Leading characters kept when the address is truncated. Default `8`.
     *
     * `truncateHash(h, 6, 4)` counts the `0x` prefix in its lead, so the base
     * showed **four** significant leading hex digits — and address verification
     * is exactly the task those digits exist for. Eight restores six.
     */
    addressLead?: number;
}
/**
 * **V4 wallet header** — same props as {@link WalletCard} plus `copyLabel`,
 * `copiedLabel` and `addressLead`.
 *
 * ## Four changes
 *
 * 1. **Copy does one thing.** The copy chip was a *descendant* of the card's
 *    own activation, so on the web twin one tap fired both `onCopy` and
 *    `onClick` — and native, where a nested `Pressable` swallows the touch,
 *    did not. Same tap, two behaviours, depending on the platform. The card's
 *    control now wraps the identity region only and the chip is its sibling,
 *    the restructure `ContactCardV4` already made.
 * 2. **The address shows enough of itself to verify.** See
 *    {@link WalletCardV4Props.addressLead}.
 * 3. **The card announces its balance.** `label` — `"Main Wallet"` — was the
 *    whole name and it replaced the subtree, so the fiat balance and the
 *    native amount were never spoken. They are one line now, with the custody
 *    kind; the 🔥/🔒/👁 mark stays out of it, as it already does on web.
 * 4. **A copy that lands says so.** `onCopy` is a handler the component cannot
 *    see the result of, so the acknowledgement is the one thing it can
 *    honestly give: `copiedLabel`, announced. The chip also clears 44, has a
 *    real disabled state, and presses as a state layer rather than
 *    `opacity: 0.7`.
 */
export declare function WalletCardV4({ address, label, balanceCents, currency, nativeAmount, nativeSymbol, nativeDecimals, kind, variant, loading, copyLabel, copiedLabel, addressLead, onCopy, onPress, style, }: WalletCardV4Props): React.ReactElement | null;
//# sourceMappingURL=WalletCardV4.d.ts.map