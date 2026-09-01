import * as React from 'react';
import type { AccountCardProps, AccountVariant } from './AccountCard';
export interface AccountCardV4Props extends AccountCardProps {
    /** Override the account-type wording. Defaults to `Checking` / `Savings` / `Credit`. */
    typeLabels?: Partial<Record<AccountVariant, string>>;
}
/**
 * **V4 account card** — same props as {@link AccountCard} plus `typeLabels`.
 *
 * ## Four changes
 *
 * 1. **The card announces its balance.** `"Everyday Checking, Checking
 *    account"` on an `accessible` `Pressable` replaced the subtree, so a
 *    reader never heard the one number on the card. The name now carries the
 *    account, its type, the masked number and the balance.
 * 2. **An account type is identity, not status.** A savings account was drawn
 *    `success` and a credit account `accent` — a savings account is not
 *    "healthy", and the green sat directly beside a `MoneyAmount` whose green
 *    means income. The type is a glyph and a neutral chip; the accent ring is
 *    gone.
 * 3. **Press is a state layer**, not `opacity: 0.85`, which is inside M3's
 *    disabled band and made a held card read as an unavailable one.
 * 4. **The captions are `mutedText`** rather than `colors.muted`, a ramp step
 *    with no contrast promise at all.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export declare function AccountCardV4({ name, variant, balanceCents, currency, accountNumber, icon, typeLabels, onPress, appearance, style, }: AccountCardV4Props): React.ReactElement | null;
//# sourceMappingURL=AccountCardV4.d.ts.map