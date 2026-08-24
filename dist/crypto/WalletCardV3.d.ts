import * as React from 'react';
import type { WalletCardProps } from './WalletCard';
/** Same public contract as {@link WalletCard} — a drop-in alternate design. */
export type WalletCardV3Props = WalletCardProps;
/**
 * WalletCard, redesigned (v3): a **minimal list row** built around a copyable
 * address chip. A single custody-tinted dot leads a label + address stack, where
 * the truncated address sits in a bordered chip that hands the FULL address back
 * through `onCopy`; the fiat balance is right-aligned through {@link MoneyAmount}
 * (integer cents — no drift) over the native amount. No card, just a hairline
 * base rule, so a stack reads as a lean wallet list. Distinct at a glance from
 * the base's card and v2's gradient face. Same props.
 */
export declare const WalletCardV3: React.ForwardRefExoticComponent<WalletCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WalletCardV3.d.ts.map