import * as React from 'react';
import type { WalletCardProps } from './WalletCard';
/** Same public contract as {@link WalletCard} — a drop-in alternate design. */
export type WalletCardV2Props = WalletCardProps;
/**
 * WalletCard, redesigned (v2): a **full gradient wallet-face**. The whole tile is
 * filled from a custody-mapped slot (hot → primary, hardware → success, watch →
 * accent) and lifted with a shadow; a translucent on-color sheen disc reads as a
 * gradient without a literal color. The fiat balance is set large in the
 * guaranteed on-fill text slot (via `formatMoney`, integer cents — no drift),
 * with the custody badge up top and a translucent copyable address chip along the
 * bottom that hands the FULL address back through `onCopy`. Distinct at a glance
 * from the base's small bordered card. Same props.
 */
export declare const WalletCardV2: React.ForwardRefExoticComponent<WalletCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WalletCardV2.d.ts.map