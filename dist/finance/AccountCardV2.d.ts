import * as React from 'react';
import type { AccountCardProps } from './AccountCard';
/** Same public contract as {@link AccountCard} — a drop-in alternate design. */
export type AccountCardV2Props = AccountCardProps;
/**
 * AccountCard, redesigned (v2): a **full credit-card face**. The whole tile is
 * filled with the variant's fill slot (primary / success / accent) and lifted
 * with a shadow; a translucent on-color sheen disc suggests a gradient without a
 * literal color. The balance is set large in the guaranteed on-fill text slot,
 * the name up top, and the masked number along the bottom like an embossed PAN.
 * Distinct at a glance from the base's small glyph tile. Same props, cents.
 */
export declare const AccountCardV2: React.ForwardRefExoticComponent<AccountCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AccountCardV2.d.ts.map