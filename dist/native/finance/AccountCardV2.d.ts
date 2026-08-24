import * as React from 'react';
import type { AccountCardProps } from './AccountCard';
/** Same public contract as {@link AccountCard} — a drop-in alternate design. */
export type AccountCardV2Props = AccountCardProps;
/**
 * AccountCard, redesigned (v2): a **full credit-card face**. The whole tile is
 * filled with the variant's fill slot (primary / success / accent) and lifted
 * with a shadow; a translucent sheen band suggests a gradient without a literal
 * color. The balance is set large in the guaranteed on-fill text slot, with the
 * name up top and the masked number along the bottom like an embossed PAN.
 * Distinct at a glance from v1's small glyph tile. Same props, integer cents.
 */
export declare function AccountCardV2({ name, variant, balanceCents, currency, accountNumber, icon, onPress, style, }: AccountCardV2Props): React.ReactElement;
//# sourceMappingURL=AccountCardV2.d.ts.map