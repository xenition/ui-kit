import * as React from 'react';
import type { AccountCardProps } from './AccountCard';
/** Same public contract as {@link AccountCard} — a drop-in alternate design. */
export type AccountCardV3Props = AccountCardProps;
/**
 * AccountCard, redesigned (v3): a **minimal list row**. A single colored account
 * dot (the variant accent) leads a name / type stack, with the balance right-
 * aligned through {@link MoneyAmount}. No card, no glyph tile — a hairline base
 * rule is the only separation, so a stack of these reads as a lean account list.
 * Distinct at a glance from the base's bordered card and v2's card face. Same props.
 */
export declare const AccountCardV3: React.ForwardRefExoticComponent<AccountCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AccountCardV3.d.ts.map