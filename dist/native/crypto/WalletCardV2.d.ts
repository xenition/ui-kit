import * as React from 'react';
import type { WalletCardProps } from './WalletCard';
/** Same public contract as {@link WalletCard} — a drop-in alternate design. */
export type WalletCardV2Props = WalletCardProps;
/**
 * WalletCard, redesigned (v2): a **full gradient wallet-face**. The whole tile is
 * filled from a custody-mapped slot (hot → primary, hardware → success, watch →
 * accent) and lifted with a shadow; a translucent on-color sheen band reads as a
 * gradient without a literal color. The fiat balance is set large in the
 * guaranteed on-fill text slot, with the custody badge up top and a translucent
 * copyable address chip along the bottom. Distinct at a glance from v1's small
 * bordered card. Same props; balance stays integer cents (no float drift).
 */
export declare function WalletCardV2({ address, label, balanceCents, currency, nativeAmount, nativeSymbol, nativeDecimals, kind, loading, onCopy, onPress, style, }: WalletCardV2Props): React.ReactElement;
//# sourceMappingURL=WalletCardV2.d.ts.map